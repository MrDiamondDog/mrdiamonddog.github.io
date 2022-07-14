var AllBodies = [];
var SelectedBodies = [];
let CurrentBody;

window.addEventListener('load', function () {
    // spawner
    var shapechooser = document.querySelector("#bottom select[name='shape']");
    var submit = document.querySelector("#bottom #spawn");
    var random = document.querySelector("#bottom #random");
    var clear = document.querySelector("#bottom #clear");
    var amount = document.querySelector("#bottom input[name='amount']");
    var color = document.querySelector("#bottom select[name='color']");
    var error = document.querySelector("#bottom #error");
    var file = document.querySelector("#bottom #image");

    // settings
    var wireframe = document.querySelector("#bottom input[name='wireframe']");
    var showDebug = document.querySelector("#bottom input[name='showDebug']");
    var showPositions = document.querySelector("#bottom input[name='showPositions']");
    var showBounds = document.querySelector("#bottom input[name='showBounds']");
    var showVel = document.querySelector("#bottom input[name='showVel']");
    var showColl = document.querySelector("#bottom input[name='showColl']");
    var showAxes = document.querySelector("#bottom input[name='showAxes']");
    var showAngle = document.querySelector("#bottom input[name='showAngle']");
    var showIds = document.querySelector("#bottom input[name='showIds']");
    var showVert = document.querySelector("#bottom input[name='showVert']");
    var showMouse = document.querySelector("#bottom input[name='showMouse']");
    var allOptions = [wireframe, showDebug, showPositions, showBounds, showVel, showColl, showAxes, showAngle, showIds, showVert];
    var all = document.querySelector("#bottom #all");
    var none = document.querySelector("#bottom #none");

    // pointer
    var pointerx = document.querySelector("#bottom #X");
    var pointery = document.querySelector("#bottom #Y");
    var pointerenabled = document.querySelector("#bottom #pointer-check");

    // body editor
    var id = document.querySelector("#bottom input[name='id']");
    var find = document.querySelector("#bottom button[name='find']");
    var info = document.querySelector("#bottom #info");
    var editsubmit = document.querySelector("#bottom #edit-submit");

    var keep = document.querySelector("#bottom input[name='keep']");
    var explode = document.querySelector("#bottom #explode");

    InitiateSpawner(shapechooser, submit, random, error);
    InitiateSettings(wireframe, showDebug, showPositions, showBounds, showVel, showColl, showAxes, showAngle, showIds, showVert, showMouse, allOptions, all, none, clear);
    InitiatePointer(pointerx, pointery, pointerenabled);
    InitiateEditor(id, find, info, editsubmit);
    InitiateOther(keep, explode);

    for (var i = 0; i < Prefabs.length; i++) {
        InitiatePrefabs(document.getElementById('prefabs'), i);
    }
});

function InitiateSpawner(shapechooser, submit, random, error){
    var elements = document.querySelectorAll("#bottom #selections *:not(br):not(option)");
    
    shapechooser.onchange = function() {
        var shape = shapechooser.value;

        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];

            if (element.getAttribute("name").includes(shape + "-sel")){
                element.hidden = false;
            } else {
                element.hidden = true;
            }
        }
    };

    submit.onclick = function() {
        var shapes = [];

        var shape = shapechooser.value;
        var amount = document.querySelector("#bottom #selections #amount").value
        var x = document.querySelector("#bottom #selections #x").value;
        var y = document.querySelector("#bottom #selections #y").value;
        var rectwidth = document.querySelector("#bottom #selections #rectwidth").value;
        var rectheight = document.querySelector("#bottom #selections #rectheight").value;
        var rows = document.querySelector("#bottom #selections #rows").value;
        var columns = document.querySelector("#bottom #selections #columns").value;
        var radius = document.querySelector("#bottom #selections #radius").value;
        var sides = document.querySelector("#bottom #selections #sides").value;
        var color = document.querySelector("#bottom #selections #color").value;
        var file = document.querySelector("#bottom #selections #file").value;

        var current_amount = 0;
        if (amount <= 0) current_amount = 1;
        else current_amount = amount;

        var xx, yy;
        if (x == '') xx = 400;
        else xx = parseInt(x);
        if (y == '') yy = 300;
        else yy = parseInt(y);

        for (var i = 0; i < current_amount; i++) {
            if (shape == 'rect'){
                if (rectwidth == '' || rectheight == ''){
                    rectwidth = rectwidth == '' ? 40 : rectwidth;
                    rectheight = rectheight == '' ? 40 : rectheight;
                    return;
                } else if (rectwidth <= 0 || rectheight <= 0){
                    error.innerHTML = "Width and height must be above 0!";
                    return;
                }

                shapes.push(Bodies.rectangle(xx, yy, rectwidth, rectheight, {render: {fillStyle: color.value}}));
            }
            else if (shape == 'circle'){
                if (radius == ''){
                    radius = 40;
                    return;
                } else if (radius <= 0){
                    error.innerHTML = "Radius must be above 0!";
                    return;
                }

                shapes.push(Bodies.circle(xx, yy, radius, {render: {fillStyle: color.value}}));
            }
            else if (shape == 'poly'){
                if (sides == '' || radius == ''){
                    sides = sides == '' ? 5 : sides;
                    radius = radius == '' ? 40 : radius;
                    return;
                } else if (sides < 3){
                    error.innerHTML = "Please enter at least 3 sides!";
                    return;
                } else if (radius <= 0){
                    error.innerHTML = "Radius must be above 0!";
                    return;
                }

                shapes.push(Bodies.polygon(xx, yy, sides, radius, {render: {fillStyle: color.value}}));
            } else if (shape == 'cloth'){
                var cloth = Cloth(xx, yy, 20, 12, 5, 5, false, 8);

                for (var i = 0; i < 20; i++) {
                    cloth.bodies[i].isStatic = true;
                }

                shapes.push(cloth);
            } else if (shape == 'ragdoll'){
                var ragdoll = Ragdoll(xx, yy, 0.7);

                shapes.push(ragdoll);
            } else if (shape == 'stack'){
                var stack = Composites.stack(xx, yy, columns, rows, 0, 0, function(x, y) {
                    return Bodies.rectangle(x, y, rectwidth, rectheight, {render: {fillStyle: color}});
                });

                shapes.push(stack);
            } else if (shape == 'image'){
                if (file.value == ''){
                    error.innerHTML = "Please enter an image!";
                    return;
                }

                var reader = new FileReader();

                reader.onloadend = function(e){
                    console.log(reader.result);
                    var body = Bodies.rectangle(xx, yy, file.files[0].width, file.files[0].height, {render: {fillStyle: color.value, sprite: {texture: reader.result}}});
                    shapes.push(body);
                }

                reader.readAsDataURL(file.files[0]);
            }
        }

        Composite.add(engine.world, shapes);
        for (var i = 0; i < shapes.length; i++) {
            AllBodies.push(shapes[i]);
        }
        error.innerHTML = "";
    };

    random.onclick = function() {
        var shapes = [];

        var current_amount = 0;
        if (amount <= 0) current_amount = 1;
        else current_amount = amount;

        if (shape == 'rect'){
            for (var i = 0; i < current_amount; i++) {
                shapes.push(Bodies.rectangle(400, 300, getRandomInt(20, 130), getRandomInt(20, 130), {render: {fillStyle: color.value}}));
            }
        }
        else if (shape == 'circle'){
            for (var i = 0; i < current_amount; i++) {
                shapes.push(Bodies.circle(400, 300, getRandomInt(20, 50), {render: {fillStyle: color.value}}));
            }
        }
        else if (shape == 'poly'){
            for (var i = 0; i < current_amount; i++) {
                shapes.push(Bodies.polygon(400, 300, getRandomInt(3, 10), getRandomInt(20, 50), {render: {fillStyle: color.value}}));
            }
        }

        Composite.add(engine.world, shapes);
        for (var i = 0; i < shapes.length; i++) {
            AllBodies.push(shapes[i]);
        }
    };
}

function InitiateSettings(wireframe, showDebug, showPositions, showBounds, showVel, showColl, showAxes, showAngle, showIds, showVert, showMouse, allOptions, all, none){
    // thank you copilot, give yourself a pat on the back
    wireframe.onchange = function() {
        render.options.wireframes = wireframe.checked;
    }
    showDebug.onchange = function() {
        render.options.showDebug = showDebug.checked;
    }
    showPositions.onchange = function() {
        render.options.showPositions = showPositions.checked;
    }
    showBounds.onchange = function() {
        render.options.showBounds = showBounds.checked;
    }
    showVel.onchange = function() {
        render.options.showVelocity = showVel.checked;
    }
    showColl.onchange = function() {
        render.options.showCollisions = showColl.checked;
    }
    showAxes.onchange = function() {
        render.options.showAxes = showAxes.checked;
    }
    showAngle.onchange = function() {
        render.options.showAngleIndicator = showAngle.checked;
    }
    showIds.onchange = function() {
        render.options.showIds = showIds.checked;
    }
    showVert.onchange = function() {
        render.options.showVertices = showVert.checked;
    }
    showMouse.onchange = function() {
        clear.click();
    }

    all.onclick = function() {
        for (var i = 0; i < allOptions.length; i++){
            allOptions[i].checked = true;
        }
        UpdateRenderSettings(wireframe, showDebug, showPositions, showBounds, showVel, showColl, showAxes, showAngle, showIds, showVert);
    };

    none.onclick = function() {
        for (var i = 0; i < allOptions.length; i++){
            allOptions[i].checked = false;
        }
        UpdateRenderSettings(wireframe, showDebug, showPositions, showBounds, showVel, showColl, showAxes, showAngle, showIds, showVert);
    }

    clear.onclick = function() {
        Composite.clear(engine.world, true);

        var mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.1,
                render: {
                    visible: showMouse.checked
                }
            }
        });
        
        Composite.add(world, mouseConstraint);
    };
}

function InitiatePointer(pointerx, pointery, pointerenabled){
    pointerenabled.onchange = function() {
        if (!pointerenabled.checked) {
            pointerx.disabled = true;
            pointery.disabled = true;
            Body.setPosition(pointer, Vector.create(-10, -10));
        } else{
            pointerx.disabled = false;
            pointery.disabled = false;
            if (pointerx.value == '' || pointerx.value == '') return;
            Body.setPosition(pointer, Vector.create(pointerx.value, pointery.value));
        }
    }

    pointerx.onchange = function() {
        Body.setPosition(pointer, Vector.create(pointerx.value, pointery.value));
    }
    pointery.onchange = function() {
        Body.setPosition(pointer, Vector.create(pointerx.value, pointery.value));
    }

    Events.on(mouseConstraint, "mousedown", function(event){
        if (pointerenabled.checked) {
            pointerx.value = event.mouse.position.x;
            pointery.value = event.mouse.position.y;
            Body.setPosition(pointer, Vector.create(pointerx.value, pointery.value));
        }
    });
}

function InitiateEditor(id, find, info, editsubmit){
    find.onclick = function() {
        info.innerHTML = GetBodyInformation(GetBodyFromID(id.value));
        CurrentBody = GetBodyFromID(id.value);
    }

    Events.on(mouseConstraint, "startdrag", function(event){
        info.innerHTML = GetBodyInformation(event.body);
        CurrentBody = event.body;
        MatterTools.Inspector.SetSelectedObjects(inspector, [event.body]);
    });

    editsubmit.onclick = function() {
        SetBody(info.innerHTML);
    }
}

function InitiateOther(keep, explode){
    window.addEventListener('resize', function() {
        render.canvas.width = document.documentElement.clientWidth + 35;
        Body.setPosition(wallR, Vector.create(document.documentElement.clientWidth + 52, 300))
    });

    keep.onchange = function() {
        if (keep.checked) {
            render.canvas.style.position = 'sticky';
        }
        else {
            render.canvas.style.position = 'static';
        }
    }

    explode.onclick = function(){
        if (SelectedBodies.length > 0) {
            Explosion(engine, SelectedBodies, true, true);
        }
        else {
            Explosion(engine, Composite.allBodies(engine.world), false, false);
        }
    }

    $('.ins-container')[0].setAttribute("name", 'show-inspectorcontent');
    $('.ins-container')[0].style.display = 'none';
}

function InitiatePrefabs(prefabs, i){
    var prefab = Prefabs[i];
    var prefabButton = document.createElement('button');
    prefabButton.innerHTML = prefab.name;
    prefabButton.onclick = function(){
        MatterTools.Inspector.importCompositeFromString(inspector, prefab.data);
    }
    prefabs.appendChild(prefabButton);
    prefabs.appendChild(document.createElement('br'));
}







function Explosion(engine, bodies, dataList, bypassStatic) {
    for (let i = 0; i < bodies.length; ++i) {
        var body;
        if (dataList) body = bodies[i].data;
        else body = bodies[i];

        if (!body.isStatic || bypassStatic) {
            if (bypassStatic) Body.setStatic(body, false);

            const forceMagnitude = 0.025 * body.mass;

            Body.applyForce(body, body.position, {
                x:
                (forceMagnitude + Common.random() * forceMagnitude) *
                Common.choose([1, -1]),
                y: -forceMagnitude + Common.random() * -forceMagnitude
            });
        }
    }
}

function SetBody(newvalue){
    var values = JSON.parse(newvalue);

    const previousBody = JSON.parse(GetBodyInformation(CurrentBody));

    for (variable in CurrentBody){
        if (variable == 'parent' || variable == "parts") {
            continue;
        }
        if (variable == 'position') {
            CurrentBody.position = CurrentBody.position;
        }
        if (previousBody[variable] != values[variable]){
            Body.set(CurrentBody, variable, values[variable]);
        }
    }

    info.innerHTML = GetBodyInformation(CurrentBody);
}

function GetBodyInformation(body){
    var str = JSON.safeStringify(body);
    return str;
}

function CheckBodyVariable(body, variable){
    var str = JSON.safeStringify(body[variable], 4);
    return str;
}

JSON.safeStringify = (obj, indent = 2) => {
    let cache = [];
    const retVal = JSON.stringify(
        obj,
        (key, value) =>
        typeof value === "object" && value !== null
            ? cache.includes(value)
            ? undefined // Duplicate reference found, discard key
            : cache.push(value) && value // Store value in our collection
            : value,
        indent
    );
    cache = null;

    return retVal;
};

function UpdateRenderSettings(wireframe, showDebug, showPositions, showBounds, showVel, showColl, showAxes, showAngle, showIds, showVert) {
    render.options.wireframes = wireframe.checked;
    render.options.showDebug = showDebug.checked;
    render.options.showPositions = showPositions.checked;
    render.options.showBounds = showBounds.checked;
    render.options.showVelocity = showVel.checked;
    render.options.showCollisions = showColl.checked;
    render.options.showAxes = showAxes.checked;
    render.options.showAngleIndicator = showAngle.checked;
    render.options.showIds = showIds.checked;
    render.options.showVertices = showVert.checked;
}

function OnSelectInspector(selected){
    SelectedBodies = selected;

    if (SelectedBodies.length > 1){
        info.innerHTML = "Multiple bodies selected";
        return;
    }
}

function OnImport(composite){
    Composite.add(engine.world, composite);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function GetBodyFromID(id) {
    for (var i = 0; i < AllBodies.length; i++) {
        if (AllBodies[i].id == id) return AllBodies[i];
    }
    return null;
}

// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Events = Matter.Events,
    Composites = Matter.Composites,
    Common = Matter.Common,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Composite = Matter.Composite,
    Vector = Matter.Vector,
    Bounds = Matter.Bounds,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Gui = MatterTools.Gui;

// create an engine
var engine = Engine.create(),
        world = engine.world;

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: document.documentElement.clientWidth,
        height: 700,
        wireframes: false,
    }
});

render.canvas.style.margin = '-12px';
render.canvas.style.marginBottom = '0px';

var inspector = MatterTools.Inspector.create(engine, render, {})
var serializer = MatterTools.Serializer.create();

//                           xx, yy, columns, rows, columnGap, rowGap, callback
var stack = Composites.stack(200, 320, 5, 5, 0, 0, function(x, y) {
    return Bodies.rectangle(x, y, 40, 40);
});

var pointer = Bodies.circle(-10, -10, 5, { isStatic: true, render: { fillStyle: 'red' } });
pointer.collisionFilter = {
    'group': -1,
    'category': 2,
    'mask': 0,
};

var ground = Bodies.rectangle(400, 700 + 49, document.documentElement.clientWidth + 5000, 100, { isStatic: true, render: {fillStyle: '#454545'}, label: 'ground' });
var wallL = Bodies.rectangle(-45, 300, 100, 1000, { isStatic: true, render: {fillStyle: '#14151f'}, label: 'wallL' });
var wallR = Bodies.rectangle(document.documentElement.clientWidth + 35, 300, 100, 1000, { isStatic: true, render: {fillStyle: '#14151f'}, label: 'wallR' });
var ceiling = Bodies.rectangle(400, -43, document.documentElement.clientWidth + 5000, 100, { isStatic: true, render: {fillStyle: '#14151f'}, label: 'ceiling' });

// add all of the bodies to the world
Composite.add(engine.world, [pointer, stack, ground, wallL, wallR, ceiling]);
for (var i = 0; i < stack.bodies.length; i++) {
    AllBodies.push(stack.bodies[i]);
}
AllBodies.push(ground, wallL, wallR, ceiling);

var wallRid = wallR.id;

// add mouse control
var mouse = Mouse.create(render.canvas),
mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.1,
        render: {
            visible: true
        }
    }
});

Composite.add(world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);  

var isMobile = false;
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
    isMobile = true;
}

if (isMobile) alert("Please rotate your phone for the best experience.");

// console messages
console.log("%cHey!", "color:red;font-size:50px")
console.log("%cIt's nice to see you. Want a little insight about the code?", "font-size:20px")
console.log("%cGo check out the GitHub repo. " + "%chttps://www.github.com/MrDiamondDog/mrdiamonddog.github.io", "font-size:20px", "font-size:10px;color:blue")
console.log("%cAnyways, there are some pretty advanced things you can do here. Some functions may not be able to be used properly. Also, be careful. You can crash yourself pretty easily.", "font-size:20px")
console.log("%cYou can type " + "%cHelp()" + "%c for help.", "font-size:20px;", "font-size:20px;background-color:rgb(0,0,0);border-radius:5px;padding:3px", "font-size:20px")

function Cloth(xx, yy, columns, rows, columnGap, rowGap, crossBrace, particleRadius, particleOptions, constraintOptions) {
    var Body = Matter.Body,
        Bodies = Matter.Bodies,
        Common = Matter.Common,
        Composites = Matter.Composites;

    var group = Body.nextGroup(true);
    particleOptions = Common.extend({ inertia: Infinity, friction: 0.00001, collisionFilter: { group: group }, render: { visible: false }}, particleOptions);
    constraintOptions = Common.extend({ stiffness: 0.06, render: { type: 'line', anchors: false } }, constraintOptions);

    var cloth = Composites.stack(xx, yy, columns, rows, columnGap, rowGap, function(x, y) {
        return Bodies.circle(x, y, particleRadius, particleOptions);
    });

    Composites.mesh(cloth, columns, rows, crossBrace, constraintOptions);

    cloth.label = 'Cloth Body';

    return cloth;
};

function Ragdoll(x, y, scale, options) {
    scale = typeof scale === 'undefined' ? 1 : scale;

    var Body = Matter.Body,
        Bodies = Matter.Bodies,
        Constraint = Matter.Constraint,
        Composite = Matter.Composite,
        Common = Matter.Common;

    var headOptions = Common.extend({
        label: 'head',
        collisionFilter: {
            group: Body.nextGroup(true)
        },
        chamfer: {
            radius: [15 * scale, 15 * scale, 15 * scale, 15 * scale]
        },
        render: {
            fillStyle: '#FFBC42'
        }
    }, options);

    var chestOptions = Common.extend({
        label: 'chest',
        collisionFilter: {
            group: Body.nextGroup(true)
        },
        chamfer: {
            radius: [20 * scale, 20 * scale, 26 * scale, 26 * scale]
        },
        render: {
            fillStyle: '#E0A423'
        }
    }, options);

    var leftArmOptions = Common.extend({
        label: 'left-arm',
        collisionFilter: {
            group: Body.nextGroup(true)
        },
        chamfer: {
            radius: 10 * scale
        },
        render: {
            fillStyle: '#FFBC42'
        }
    }, options);

    var leftLowerArmOptions = Common.extend({}, leftArmOptions, {
        render: {
            fillStyle: '#E59B12'
        }
    });

    var rightArmOptions = Common.extend({
        label: 'right-arm',
        collisionFilter: {
            group: Body.nextGroup(true)
        },
        chamfer: {
            radius: 10 * scale
        },
        render: {
            fillStyle: '#FFBC42'
        }
    }, options);

    var rightLowerArmOptions = Common.extend({}, rightArmOptions, {
        render: {
            fillStyle: '#E59B12'
        }
    });

    var leftLegOptions = Common.extend({
        label: 'left-leg',
        collisionFilter: {
            group: Body.nextGroup(true)
        },
        chamfer: {
            radius: 10 * scale
        },
        render: {
            fillStyle: '#FFBC42'
        }
    }, options);

    var leftLowerLegOptions = Common.extend({}, leftLegOptions, {
        render: {
            fillStyle: '#E59B12'
        }
    });

    var rightLegOptions = Common.extend({
        label: 'right-leg',
        collisionFilter: {
            group: Body.nextGroup(true)
        },
        chamfer: {
            radius: 10 * scale
        },
        render: {
            fillStyle: '#FFBC42'
        }
    }, options);

    var rightLowerLegOptions = Common.extend({}, rightLegOptions, {
        render: {
            fillStyle: '#E59B12'
        }
    });

    var head = Bodies.rectangle(x, y - 60 * scale, 34 * scale, 40 * scale, headOptions);
    var chest = Bodies.rectangle(x, y, 55 * scale, 80 * scale, chestOptions);
    var rightUpperArm = Bodies.rectangle(x + 39 * scale, y - 15 * scale, 20 * scale, 40 * scale, rightArmOptions);
    var rightLowerArm = Bodies.rectangle(x + 39 * scale, y + 25 * scale, 20 * scale, 60 * scale, rightLowerArmOptions);
    var leftUpperArm = Bodies.rectangle(x - 39 * scale, y - 15 * scale, 20 * scale, 40 * scale, leftArmOptions);
    var leftLowerArm = Bodies.rectangle(x - 39 * scale, y + 25 * scale, 20 * scale, 60 * scale, leftLowerArmOptions);
    var leftUpperLeg = Bodies.rectangle(x - 20 * scale, y + 57 * scale, 20 * scale, 40 * scale, leftLegOptions);
    var leftLowerLeg = Bodies.rectangle(x - 20 * scale, y + 97 * scale, 20 * scale, 60 * scale, leftLowerLegOptions);
    var rightUpperLeg = Bodies.rectangle(x + 20 * scale, y + 57 * scale, 20 * scale, 40 * scale, rightLegOptions);
    var rightLowerLeg = Bodies.rectangle(x + 20 * scale, y + 97 * scale, 20 * scale, 60 * scale, rightLowerLegOptions);

    var chestToRightUpperArm = Constraint.create({
        bodyA: chest,
        pointA: {
            x: 24 * scale,
            y: -23 * scale
        },
        pointB: {
            x: 0,
            y: -8 * scale
        },
        bodyB: rightUpperArm,
        stiffness: 0.6,
        render: {
            visible: false
        }
    });

    var chestToLeftUpperArm = Constraint.create({
        bodyA: chest,
        pointA: {
            x: -24 * scale,
            y: -23 * scale
        },
        pointB: {
            x: 0,
            y: -8 * scale
        },
        bodyB: leftUpperArm,
        stiffness: 0.6,
        render: {
            visible: false
        }
    });

    var chestToLeftUpperLeg = Constraint.create({
        bodyA: chest,
        pointA: {
            x: -10 * scale,
            y: 30 * scale
        },
        pointB: {
            x: 0,
            y: -10 * scale
        },
        bodyB: leftUpperLeg,
        stiffness: 0.6,
        render: {
            visible: false
        }
    });

    var chestToRightUpperLeg = Constraint.create({
        bodyA: chest,
        pointA: {
            x: 10 * scale,
            y: 30 * scale
        },
        pointB: {
            x: 0,
            y: -10 * scale
        },
        bodyB: rightUpperLeg,
        stiffness: 0.6,
        render: {
            visible: false
        }
    });

    var upperToLowerRightArm = Constraint.create({
        bodyA: rightUpperArm,
        bodyB: rightLowerArm,
        pointA: {
            x: 0,
            y: 15 * scale
        },
        pointB: {
            x: 0,
            y: -25 * scale
        },
        stiffness: 0.6,
        render: {
            visible: false
        }
    });

    var upperToLowerLeftArm = Constraint.create({
        bodyA: leftUpperArm,
        bodyB: leftLowerArm,
        pointA: {
            x: 0,
            y: 15 * scale
        },
        pointB: {
            x: 0,
            y: -25 * scale
        },
        stiffness: 0.6,
        render: {
            visible: false
        }
    });

    var upperToLowerLeftLeg = Constraint.create({
        bodyA: leftUpperLeg,
        bodyB: leftLowerLeg,
        pointA: {
            x: 0,
            y: 20 * scale
        },
        pointB: {
            x: 0,
            y: -20 * scale
        },
        stiffness: 0.6,
        render: {
            visible: false
        }
    });

    var upperToLowerRightLeg = Constraint.create({
        bodyA: rightUpperLeg,
        bodyB: rightLowerLeg,
        pointA: {
            x: 0,
            y: 20 * scale
        },
        pointB: {
            x: 0,
            y: -20 * scale
        },
        stiffness: 0.6,
        render: {
            visible: false
        }
    });

    var headContraint = Constraint.create({
        bodyA: head,
        pointA: {
            x: 0,
            y: 25 * scale
        },
        pointB: {
            x: 0,
            y: -35 * scale
        },
        bodyB: chest,
        stiffness: 0.6,
        render: {
            visible: false
        }
    });

    var legToLeg = Constraint.create({
        bodyA: leftLowerLeg,
        bodyB: rightLowerLeg,
        stiffness: 0.01,
        render: {
            visible: false
        }
    });

    var person = Composite.create({
        bodies: [
            chest, head, leftLowerArm, leftUpperArm, 
            rightLowerArm, rightUpperArm, leftLowerLeg, 
            rightLowerLeg, leftUpperLeg, rightUpperLeg
        ],
        constraints: [
            upperToLowerLeftArm, upperToLowerRightArm, chestToLeftUpperArm, 
            chestToRightUpperArm, headContraint, upperToLowerLeftLeg, 
            upperToLowerRightLeg, chestToLeftUpperLeg, chestToRightUpperLeg,
            legToLeg
        ]
    });

    return person;
};

function Help(){
    console.log("%cHere are some functions you can use. They are complicated, so good luck." + "%c\n* = HTML formatted string", "font-size:20px", "font-size:9px")
    console.log("%cCloth(xx, yy, columns, rows, columnGap, rowGap, crossBrace, particleRadius, particleOptions, constraintOptions) : Composite", "font-size:14px;background-color:rgb(0,0,0);border-radius:5px;padding:3px")
    console.log("%cRagdoll(x, y, scale, options) : Composite", "font-size:14px;background-color:rgb(0,0,0);border-radius:5px;padding:3px")
    console.log("%cGetBodyFromID(id) : Body", "font-size:14px;background-color:rgb(0,0,0);border-radius:5px;padding:3px")
    console.log("%cSetBody(newvalue) : Void", "font-size:14px;background-color:rgb(0,0,0);border-radius:5px;padding:3px")
    console.log("%cCheckBodyVariable(body, variable) : String", "font-size:14px;background-color:rgb(0,0,0);border-radius:5px;padding:3px")
    console.log("%cUpdateRenderSettings(wireframe, showDebug, showPositions, showBounds, showVel, showColl, showAxes, showAngle, showIds, showVert) : Void", "font-size:14px;background-color:rgb(0,0,0);border-radius:5px;padding:3px")
    console.log("%cGetBodyInformation(body) : String", "font-size:14px;background-color:rgb(0,0,0);border-radius:5px;padding:3px")
    console.log("%cFunctions that create bodies or composites must be added to the world using " + "%cComposite.add(world, body) : Void", "font-size:20px;color:red", "font-size:14px;background-color:rgb(0,0,0);border-radius:5px;padding:3px")
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
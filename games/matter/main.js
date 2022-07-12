var AllBodies = []
let currentBody;

window.addEventListener('load', function () {
    // spawner
    var shapechooser = document.querySelector("#bottom select[name='shape']");
    var rectwidth = document.querySelector("#bottom input[name='width']");
    var rectheight = document.querySelector("#bottom input[name='height']");
    var radius = document.querySelector("#bottom input[name='radius']");
    var sides = document.querySelector("#bottom input[name='sides']");
    var submit = document.querySelector("#bottom #spawn");
    var random = document.querySelector("#bottom #random");
    var clear = document.querySelector("#bottom #clear");
    var amount = document.querySelector("#bottom input[name='amount']");
    var color = document.querySelector("#bottom select[name='color']");

    var error = document.querySelector("#bottom #error");

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

    var options = [wireframe, showDebug, showPositions, showBounds, showVel, showColl, showAxes, showAngle, showIds, showVert];

    var all = document.querySelector("#bottom #all");
    var none = document.querySelector("#bottom #none");

    // pointer
    var pointerx = document.querySelector("#bottom #x");
    var pointery = document.querySelector("#bottom #y");
    var pointerenabled = document.querySelector("#bottom #pointer-check");

    // body editor
    var id = document.querySelector("#bottom input[name='id']");
    var find = document.querySelector("#bottom button[name='find']");
    var info = document.querySelector("#bottom #info");
    var toedit = document.querySelector("#bottom #edit-toedit");
    var editsubmit = document.querySelector("#bottom #edit-submit");
    var editpreview = document.querySelector("#bottom #edit-prev");
    var editid = document.querySelector("#bottom #edit-id");
    var editerr = document.querySelector("#bottom #edit-err");
    var editvalue = document.querySelector("#bottom #edit-value");

    var keep = document.querySelector("#bottom input[name='keep']");

    shapechooser.onchange = function() {
        if (shapechooser.value == 'rect'){
            rectwidth.hidden = false;
            rectheight.hidden = false;
            radius.hidden = true;
            sides.hidden = true;
            amount.hidden = false;
            color.hidden = false;
        }
        else if (shapechooser.value == 'circle'){
            rectwidth.hidden = true;
            rectheight.hidden = true;
            radius.hidden = false;
            sides.hidden = true;
            amount.hidden = false;
            color.hidden = false;
        }
        else if (shapechooser.value == 'poly'){
            rectwidth.hidden = true;
            rectheight.hidden = true;
            radius.hidden = false;
            sides.hidden = false;
            amount.hidden = false;
            color.hidden = false;
        }
        else if (shapechooser.value == 'cloth'){
            rectwidth.hidden = true;
            rectheight.hidden = true;
            radius.hidden = true;
            sides.hidden = true;
            amount.hidden = true;
            color.hidden = true;
        }
        else if (shapechooser.value == 'ragdoll'){
            rectwidth.hidden = true;
            rectheight.hidden = true;
            radius.hidden = true;
            sides.hidden = true;
            amount.hidden = true;
            color.hidden = true;
        }
    };

    submit.onclick = function() {
        var shapes = [];

        var current_amount = 0;
        if (amount.value <= 0) current_amount = 1;
        else current_amount = amount.value;

        if (shapechooser.value == 'rect'){
            if (rectwidth.value == '' || rectheight.value == ''){
                error.innerHTML = "Please enter a width and height!";
                return;
            } else if (rectwidth.value <= 0 || rectheight.value <= 0){
                error.innerHTML = "Width and height must be above 0!";
                return;
            }
            
            for (var i = 0; i < current_amount; i++) {
                shapes.push(Bodies.rectangle(387, 287, rectwidth.value, rectheight.value, {render: {fillStyle: color.value}}));
            }
        }
        else if (shapechooser.value == 'circle'){
            if (radius.value == ''){
                error.innerHTML = "Please enter a radius!";
                return;
            } else if (radius.value <= 0){
                error.innerHTML = "Radius must be above 0!";
                return;
            }

            for (var i = 0; i < current_amount; i++) {
                shapes.push(Bodies.circle(387, 287, radius.value, {render: {fillStyle: color.value}}));
            }
        }
        else if (shapechooser.value == 'poly'){
            if (sides.value == '' || radius.value == ''){
                error.innerHTML = "Please enter a radius and number of sides!";
                return;
            } else if (sides.value < 3){
                error.innerHTML = "Please enter at least 3 sides!";
                return;
            } else if (radius.value <= 0){
                error.innerHTML = "Radius must be above 0!";
                return;
            }

            for (var i = 0; i < current_amount; i++) {
                shapes.push(Bodies.polygon(387, 287, sides.value, radius.value, {render: {fillStyle: color.value}}));
            }
        } else if (shapechooser.value == 'cloth'){
            var cloth = Cloth(200, 200, 20, 12, 5, 5, false, 8);

            for (var i = 0; i < 20; i++) {
                cloth.bodies[i].isStatic = true;
            }

            shapes.push(cloth);
        } else if (shapechooser.value == 'ragdoll'){
            var ragdoll = Ragdoll(387, 287, 0.7);

            shapes.push(ragdoll);
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
        if (amount.value <= 0) current_amount = 1;
        else current_amount = amount.value;

        if (shapechooser.value == 'rect'){
            for (var i = 0; i < current_amount; i++) {
                shapes.push(Bodies.rectangle(387, 287, getRandomInt(20, 130), getRandomInt(20, 130), {render: {fillStyle: color.value}}));
            }
        }
        else if (shapechooser.value == 'circle'){
            for (var i = 0; i < current_amount; i++) {
                shapes.push(Bodies.circle(387, 287, getRandomInt(20, 50), {render: {fillStyle: color.value}}));
            }
        }
        else if (shapechooser.value == 'poly'){
            for (var i = 0; i < current_amount; i++) {
                shapes.push(Bodies.polygon(387, 287, getRandomInt(3, 10), getRandomInt(20, 50), {render: {fillStyle: color.value}}));
            }
        }

        Composite.add(engine.world, shapes);
        for (var i = 0; i < shapes.length; i++) {
            AllBodies.push(shapes[i]);
        }
    };

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
        for (var i = 0; i < options.length; i++){
            options[i].checked = true;
        }
        UpdateRenderSettings(wireframe, showDebug, showPositions, showBounds, showVel, showColl, showAxes, showAngle, showIds, showVert);
    };

    none.onclick = function() {
        for (var i = 0; i < options.length; i++){
            options[i].checked = false;
        }
        UpdateRenderSettings(wireframe, showDebug, showPositions, showBounds, showVel, showColl, showAxes, showAngle, showIds, showVert);
    }

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

    find.onclick = function() {
        info.innerHTML = GetBodyInformation(GetBodyFromID(id.value));
        currentBody = GetBodyFromID(id.value);
    }

    Events.on(mouseConstraint, "startdrag", function(event){
        info.innerHTML = GetBodyInformation(event.body);
        currentBody = event.body;
    });

    editsubmit.onclick = function() {
        SetBody(info.innerHTML);
    }

    window.addEventListener('resize', function() {
        render.canvas.width = document.documentElement.clientWidth - 35;
        Body.setPosition(wallR, Vector.create(document.documentElement.clientWidth - 35 + 45, 300))
    });

    keep.onchange = function() {
        if (keep.checked) {
            render.canvas.style.position = 'sticky';
        }
        else {
            render.canvas.style.position = 'static';
        }
    }
});

function SetBody(newvalue){
    var values = JSON.parse(newvalue);

    const previousBody = JSON.parse(GetBodyInformation(currentBody));

    console.log(previousBody);

    for (variable in currentBody){
        console.log(variable);
        if (variable == 'parent' || variable == "parts") {
            console.log("continuing")
            continue;
        }
        if (variable == 'position') {
            currentBody.position = currentBody.position;
        }
        console.log(previousBody[variable] == values[variable])
        if (previousBody[variable] != values[variable]){
            Body.set(currentBody, variable, values[variable]);
            console.log("setting " + variable + " to %O", values[variable]);
        }
    }

    console.log(currentBody);
    info.innerHTML = GetBodyInformation(currentBody);
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
        width: document.documentElement.clientWidth - 35,
        height: 525,
        wireframes: false,
    }
});

var inspector = MatterTools.Inspector.create(engine, render, {})

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

var ground = Bodies.rectangle(400, 550 + 20, document.documentElement.clientWidth + 5000, 100, { isStatic: true, render: {fillStyle: 'gray'} });
var wallL = Bodies.rectangle(-45, 300, 100, 600, { isStatic: true, render: {fillStyle: 'gray'}  });
var wallR = Bodies.rectangle(document.documentElement.clientWidth - 35 + 45, 300, 100, 600, { isStatic: true, render: {fillStyle: 'gray'}  });
var ceiling = Bodies.rectangle(400, -45, document.documentElement.clientWidth + 5000, 100, { isStatic: true, render: {fillStyle: 'gray'}  });

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
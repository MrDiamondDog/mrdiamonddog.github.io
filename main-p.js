window.addEventListener('load', function () {
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
        }

        Composite.add(engine.world, shapes);
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
});

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

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
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
        Bodies = Matter.Bodies;

// create an engine
var engine = Engine.create(),
        world = engine.world;

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 770,
        height: 525,
        wireframes: false,
    }
});

// create two boxes and a ground
var boxA = Bodies.rectangle(400, 200, 40, 40);
var boxB = Bodies.rectangle(450, 50, 40, 40);
var ground = Bodies.rectangle(400, 550, 810, 60, { isStatic: true, render: {fillStyle: 'gray'} });
var wallL = Bodies.rectangle(0, 300, 10, 600, { isStatic: true, render: {fillStyle: 'gray'}  });
var wallR = Bodies.rectangle(770, 300, 10, 600, { isStatic: true, render: {fillStyle: 'gray'}  });
var ceiling = Bodies.rectangle(400, 0, 810, 10, { isStatic: true, render: {fillStyle: 'gray'}  });

// add all of the bodies to the world
Composite.add(engine.world, [boxA, boxB, ground, wallL, wallR, ceiling]);

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
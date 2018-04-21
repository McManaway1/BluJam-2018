/**
 * Andrew McManaway (mcmanaway1)
 * Liam Byrne (byrneliam2)
 * BluJam-2018
 */

function Arena(width, height) {
    this.width = width;
    this.height = height;

    this.canvas = document.createElement("canvas");

    this.start = function () {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frame = 0;
        this.interval = setInterval(onTick, 20);
    }

    this.clear = function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function Player(x, y, width, height) {
    const VELOCITY = 5;

    this.inputs = [];
    var fallSpeed = 0;

    this.tick = function () {
        g2 = arena.context;

        this.handleInputs();
        this.handleCollisions();

        g2.fillStyle = "black";
        g2.fillRect(x, y, width, height);
    }

    this.handleInputs = function () {
        for (var key = 0; key < this.inputs.length; key++) {
            if (this.inputs[key]) {
                switch (key) {
                    case 65:
                        x -= VELOCITY;
                        break;
                    case 68:
                        x += VELOCITY;
                        break;
                    case 87:
                        if (fallSpeed == 0) fallSpeed -= VELOCITY;
                        break;
                }
            }
        }
    }


    this.handleCollisions = function () {
        var leftWall = 0;
        var rightWall = arena.width - width;
        var roof = 0;
        var floor = arena.height - height;

        // Floor Collision + Gravity
        var g = gravity(y, floor, fallSpeed);
        y = g.y;
        fallSpeed = g.fallSpeed;

        // Roof Collision
        if (y < roof) y = roof;

        // Wall Collision
        if (x < leftWall) x = leftWall;
        else if (x > rightWall) x = rightWall;
    }
}

function Layer(x1, x2) {
    const HEIGHT = 15;

    var fallSpeed = 0;
    var gap = 200;

    this.x1 = x1;
    this.x2 = x2;
    this.y = 0 - HEIGHT;

    this.tick = function () {
        g2 = arena.context;

        var floor = arena.height - HEIGHT;
        var g = gravity(this.y, floor, fallSpeed);
        y = g.y;
        fallSpeed = g.fallSpeed;

        g2.fillStyle = "grey";
        g2.fillRect(0, y, arena.canvas.width, HEIGHT);
    }

    this.isOnGround = function () {
        //
    }
}

function gravity(y, floor, fallSpeed) {
    const GRAVITY = 0.2;

    if (y > floor) {
        y = floor;
        fallSpeed = 0;
    } else {
        fallSpeed += GRAVITY;
        y += fallSpeed;
    }
    return {
        y: y,
        fallSpeed: fallSpeed
    };
}
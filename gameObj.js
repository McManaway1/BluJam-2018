var gravity = 0.1;

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

function Player(name, x, y, width, height) {
    this.inputs = [];
    var fallSpeed = 0;
    var velocity = 4;

    this.tick = function () {
        g2 = arena.context;

        this.handleInputs();
        this.handleCollisions();

        g2.fillRect(x, y, width, height);
        g2.fillText(name, x - 2, y - 2);
    }

    this.handleInputs = function () {
        for (var key = 0; key < this.inputs.length; key++) {
            if (this.inputs[key]) {
                switch (key) {
                    case 37: case 65:
                        x -= velocity;
                        break;
                    case 39: case 68:
                        x += velocity;
                        break;
                    case 32: case 87:
                        if (fallSpeed == 0) fallSpeed -= velocity;
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

        //Floor Collision + Gravity
        if (y > floor) {
            y = floor;
            fallSpeed = 0;
        } else {
            fallSpeed += gravity;
            y += fallSpeed;
        }

        //Roof Collision
        if (y < roof) y = roof;

        //Wall Collision
        if(x < leftWall) x = leftWall;
        else if (x > rightWall) x = rightWall;
    }
}

function Layer(x1, x2) {
    const HEIGHT = 20;

    this.x1 = x1;
    this.x2 = x2;
    this.y = 0;

    this.tick = function () {
        //
    }

    this.isOnGround = function () {
        //
    }
}
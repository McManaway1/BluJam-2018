var gravity = 0.098;

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
    var inputs = [];
    var fallSpeed = 0;
    var velocity = 2;

    this.tick = function () {
        g2 = arena.context;

        this.handleInputs();
        this.handleGravity();

        g2.fillRect(x, y, width, height);
        g2.fillText(name, x - 2, y - 2);
    }

    this.handleInputs = function () {
        for (const keyCode of inputs) {
            switch (event.keyCode) {
                case 37:
                    x -= velocity;
                    break;
                case 39:
                    x += velocity;
                    break;
                case 32:
                    if (fallSpeed == 0) fallSpeed -= velocity;
                    break;
            }
        }
    }


    this.handleGravity = function () {
        var floor = arena.height - height;

        if (y > floor) {
            y = floor;
            fallSpeed = 0;
        } else {
            fallSpeed += gravity;
            y += fallSpeed;
        }
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
function Arena(width, height) {
    this.width = width;
    this.height = height;

    this.canvas = document.createElement("canvas");

    this.start = function() {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);

        this.frame = 0;
        this.interval = setInterval(onTick, 20);
    }

    this.clear = function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function Player(name, x, y, width, height) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.tick = function () {
        g2 = arena.context;
        g2.fillRect(x, y, width, height);
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

    this.isOnGround = function() {
        //
    }
}
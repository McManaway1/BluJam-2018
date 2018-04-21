function player(name, x, y, width, height) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

function arena() {
    this.canvas = document.createElement("canvas");

    this.start =  function() {
        this.canvas.width = 400;
        this.canvas.height = 400;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);

        this.frame = 0;
        this.interval = setInterval(doTick, 20);
    }

    this.clear = function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
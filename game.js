var arena;
var player;
var platforms = [];

function init() {
    this.arena = new arena();
    this.player = new player("Sid", 200, 0, 10, 20);

    this.arena.start();
}

function doTick() {
    arena.frame++;
}

init();
var arena;
var player;
var platforms = [];

function init() {
    this.arena = new Arena(600, 400);
    this.player = new Player(200, (400 - 20), 10, 20);

    this.arena.start();
}

function onTick() {
    arena.clear();

    //Handle User input
    document.onkeydown = onKeyPress
    document.onkeyup = onKeyRelease
    //TODO: document.onmousedown = onMousePress

    player.tick();
}

init();
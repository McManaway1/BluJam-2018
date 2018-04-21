var arena;
var player;
var platforms = [];

function init() {
    this.arena = new Arena(400, 400);
    this.player = new Player("Sid", 200, (400 - 20), 10, 20);

    this.arena.start();
}

function onTick() {
    arena.clear();

    //Handle User input
    document.onkeydown = onKeyPress
    //TODO: document.onmousedown = onMousePress

    arena.frame++;
    player.tick();
}

init();
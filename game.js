/**
 * Andrew McManaway (mcmanaway1)
 * Liam Byrne (byrneliam2)
 * BluJam-2018
 */

var arena;
var player;
var layers = [];

function init() {
    this.arena = new Arena(400, 400);
    this.player = new Player("Sid", 200, (400 - 20), 10, 20);

    this.arena.start();
}

function onTick() {
    arena.clear();

    //Handle User input
    document.onkeydown = onKeyPress
    document.onkeyup = onKeyRelease
    //TODO: document.onmousedown = onMousePress

    if (arena.frame == 1 || arena.frame % 100 == 0) {
        layers.push(new Layer(250, 350));
    }

    for (i = 0; i < layers.length; i++) {
        layers[i].x -= 1.8;
        layers[i].tick();
    }

    arena.frame++;
    player.tick();
}

init();
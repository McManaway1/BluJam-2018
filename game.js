/**
 * Andrew McManaway (mcmanaway1)
 * Liam Byrne (byrneliam2)
 * BluJam-2018
 */

var arena;
var player;
var layers = [];

// Difficulty
var speed = 1;
var gap = 200;

function init() {
    this.arena = new Arena(600, 400);
    this.player = new Player(200, (400 - 20), 12, 24);

    this.arena.start();
}

function onTick() {
    arena.clear();

    //Handle User input
    document.onkeydown = onKeyPress
    document.onkeyup = onKeyRelease
    //TODO: document.onmousedown = onMousePress

    if (arena.frame == 1 || arena.frame % 200 == 0) {
        layers.push(new Layer(Math.random() * (arena.canvas.width - gap) + gap, gap));
    }

    for (i = 0; i < layers.length; i++) {
        layers[i].y += speed;
        layers[i].tick();
    }

    arena.frame++;
    player.tick();
}

init();
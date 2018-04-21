/**
 * Andrew McManaway (mcmanaway1)
 * Liam Byrne (byrneliam2)
 * BluJam-2018
 */

function onMousePress (event) {
    event = event || window.event;

}

function onKeyPress (event) {
    event = event || window.event;
    player.inputs[event.keyCode] = true;
}

function onKeyRelease (event) {
    event = event || window.event;
    player.inputs[event.keyCode] = false;
}
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
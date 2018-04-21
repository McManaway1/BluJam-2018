function onMousePress (event) {
    event = event || window.event;

}

function onKeyPress (event) {
    event = event || window.event;

    switch (event.keyCode) {
        case 37:
            player.moveLeft();
            break;
        case 39:
            player.moveRight();
            break;
        case 32:
            player.jump();
            break;
    }
}
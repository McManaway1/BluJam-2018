/**
 * Andrew McManaway (mcmanaway1)
 * Liam Byrne (byrneliam2)
 * BluJam-2018
 */

var gamePiece;
var obstacles = [];
var score;

/*
 * This block creates the object myGameArea and adds methods to it with the colon operator.
 * Remember the notation is var object = {property1 : value1, property2: function() { method1 }}
*/
var gameArea = {
    canvas: document.createElement("canvas"), // create element node
    start: function () {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 15); // call updateGameArea every 15ms
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function startGame() {
    gamePiece = new component(30, 30, "green", (window.innerWidth / 2 - 15), 120, "player");
    gamePiece.gravity = 0.08;
    score = new component("28px", "Consolas", "red", window.innerWidth - 200, 25, "text");
    gameArea.start();
}

function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;

    for (i = 0; i < obstacles.length; i += 1) {
        if (gamePiece.crashWith(obstacles[i])) {
            return;
        }
    }

    document.onkeydown = keyDown;

    gameArea.clear();
    gameArea.frameNo += 1;

    if (gameArea.frameNo == 1 || everyinterval(150)) {
        x = gameArea.canvas.width;
        minHeight = 30;
        maxHeight = window.innerHeight * 0.75;
        height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
        minGap = 70;
        maxGap = 130;
        gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
        obstacles.push(new component(10, height, "grey", x, 0));
        obstacles.push(new component(10, x - height - gap, "grey", x, height + gap));
    }

    for (i = 0; i < obstacles.length; i += 1) {
        obstacles[i].x += -1.8;
        obstacles[i].update();
    }

    score.text = "SCORE: " + gameArea.frameNo;
    score.update();

    gamePiece.newPos();
    gamePiece.update();
}

function keyDown(e) {
    e = e || window.event;
    if (e.keyCode == '87' || e.keyCode == '119' || e.keyCode == '32') {
        gamePiece.gravitySpeed = -3.5;
    } else if (e.keyCode == '82') {
        gameArea.clear();
        gameArea.frameNo = 0;
        gamePiece.y = 120;
        gamePiece.gravitySpeed = 0;
        obstacles = [];
    }
}

function everyinterval(n) {
    if ((gameArea.frameNo / n) % 1 == 0) {
        return true;
    } return false;
}
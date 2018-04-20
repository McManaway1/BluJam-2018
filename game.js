var myGamePiece;
var myObstacles = [];
var myScore;

// This block creates the object myGameArea and adds methods to it with the colon operator.
// Remember the notation is var object = {property1 : value1, property2: function() { method1 }}
var myGameArea = {
    canvas : document.createElement("canvas"), // create element node
    start : function() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 15); // call updateGameArea every 15ms
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function startGame() {
    myGamePiece = new component(30, 30, "green", (window.innerWidth / 2 - 15), 120);
    myGamePiece.gravity = 0.08;
    myScore = new component("28px", "Consolas", "red", window.innerWidth - 200 , 25, "text");
    myGameArea.start();
}

function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;

    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            return;
        } 
    }

    document.onkeydown = keyDown;

    myGameArea.clear();
    myGameArea.frameNo += 1;

    if (myGameArea.frameNo == 1 || everyinterval(150)) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        myObstacles.push(new component(10, height, "grey", x, 0));
        myObstacles.push(new component(10, x - height - gap, "grey", x, height + gap));
    }

    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -1.8;
        myObstacles[i].update();
    }

    myScore.text="SCORE: " + myGameArea.frameNo;
    myScore.update();
    myGamePiece.newPos();
    myGamePiece.update();
}

function keyDown(e) {
    e = e || window.event;
    if (e.keyCode == '87' || e.keyCode == '119' || e.keyCode == '32') {
        console.log("REEE");
        myGamePiece.gravitySpeed = -3.5;
    }
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {
        return true;
    } return false;
}
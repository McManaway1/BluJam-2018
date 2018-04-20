var myGamePiece;
var myObstacles = [];
var myScore;
var multipler = 1.0;

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
        this.interval = setInterval(updateGameArea, 20); // call updateGameArea every 20ms
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}



function startGame() {
    window.addEventListener('resize', resizeCanvas, false);

    myGamePiece = new component(30, 30, "green", (window.innerWidth / 2 - 15), 120);
    myGamePiece.gravity = 0.05;
    myScore = new component("28px", "Consolas", "red", window.innerWidth - 200 , 25, "text");
    myGameArea.start();
}

function resizeCanvas() {
    console.log(window.innerWidth);

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
}

function component(width, height, color, x, y, type) {
    this.type = type;
    this.score = 0;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;
    this.gravity = 0;
    this.gravitySpeed = 0;

    this.update = function() {
        ctx = myGameArea.context;
        
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
        this.hitSky();
    }

    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;

        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = 0;
        }
    }

    this.hitSky = function() {
        var theSky = 0;

        if (this.y < theSky) {
            this.y = theSky;
            myGamePiece.gravitySpeed = 0;
        }
    }

    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;

        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }

        return crash;
    }
}

function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;

    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            return;
        } 
    }

    document.onkeydown = keyDown;
    document.onkeyup = keyUp;

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

        this.multipler += 0.05;
    }

    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -1 * multipler;
        myObstacles[i].update();
    }

    myScore.text="SCORE: " + myGameArea.frameNo;
    myScore.update();
    myGamePiece.newPos();
    myGamePiece.update();
}

function keyDown(e) {
    e = e || window.event;
    if (e.keyCode == '87' || e.keyCode == '119' || e.keyCode == '32') accelerate(-0.2);
}

function keyUp(e) {
    e = e || window.event;
    if (e.keyCode == '87' || e.keyCode == '119' || e.keyCode == '32') accelerate(0.07);
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {
        return true;
    } return false;
}

function accelerate(n) {
    myGamePiece.gravity = n * multipler;
}
/**
 * Andrew McManaway (mcmanaway1)
 * Liam Byrne (byrneliam2)
 * BluJam-2018
 */

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

    this.update = function () {
        ctx = gameArea.context;

        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else if (this.type == "player") {
            ctx.beginPath();
            ctx.fillStyle = color
            ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, 0, 2 * Math.PI);
            ctx.fill();
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    this.newPos = function () {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
        this.hitSky();
    }

    this.hitBottom = function () {
        var rockbottom = gameArea.canvas.height - this.height;

        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = 0;
        }
    }

    this.hitSky = function () {
        var theSky = 0;

        if (this.y < theSky) {
            this.y = theSky;
            gamePiece.gravitySpeed = 0;
        }
    }

    this.crashWith = function (otherobj) {
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
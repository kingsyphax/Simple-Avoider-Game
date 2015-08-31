var background = new Raster("images/berkeley.jpg", [480, 300]);

var player = new Raster("images/gilbert_right.png", [40 + Math.random() * 880, 40 + Math.random() * 520]);
player.visible = true;
player.alive = true;

player.onFrame = function(event){
    if(Key.isDown('left') && player.position.x > 40)
    {
        player.rotate(180 - player.rotation);
        
        player.translate(-8, 0);

        //player.source = "images/gilbert_left.png";
    }

    if(Key.isDown('right') && player.position.x < 920)
    {
        player.rotate(0 - player.rotation);
        
        player.translate(8, 0);
        
        //player.source = "images/gilbert_right.png";
    }
    
    if(Key.isDown('up') && player.position.y > 40)
    {
        player.rotate(270 - player.rotation);
        
        player.translate(0, -8);

        //player.source = "images/gilbert_up.png";
    }

    if(Key.isDown('down') && player.position.y < 560)
    {
        player.rotate(90 - player.rotation);
        
        player.translate(0, 8);
        
        //player.source = "images/gilbert_down.png";
    }
}

function BT(xPosition, yPosition) {
    this.beetee = new Raster("images/BT.png", (xPosition, yPosition));
    
    this.beetee.reposition = function() {
        this.position.x = Math.random() * 960;
        this.position.y = Math.random() * 600;
    };
    
    this.beetee.onFrame = function(event) {
        var xDifference = player.position.x - this.position.x;
        var xDirection = xDifference / Math.abs(xDifference);
        
        xDirection = xDirection / Math.abs(xDirection) * Math.min(Math.abs(xDirection), 3);
        
        var yDifference = player.position.y - this.position.y;
        yDirection = yDifference / Math.abs(xDifference);
        
        yDirection = yDirection / Math.abs(yDirection) * Math.min(Math.abs(yDirection), 3);
        
        this.translate(xDirection, yDirection);
    };
}

var BTs = [];

setTimeout(function() {
    var firstBT = new BT(Math.random() * 960, Math.random() * 600);
    BTs.push(firstBT);
}, 1000);

var time = 3000;
var newBTsInterval = setInterval( function() {
    if (time > 500) {
        time -= 100;
    }
    
    var xPosition = Math.random() * 960;
    while (Math.abs(xPosition - player.position.x) < 100) {
        var xPosition = Math.random() * 960;
    }
    var yPosition = Math.random() * 600;
    while (Math.abs(yPosition - player.position.y) < 100) {
        var yPosition = Math.random() * 600;
    }
    
    var tempBT = new BT(xPosition, yPosition);
    BTs.push(tempBT);
    
}, time);

var score = 0;

var scoreText = new PointText(new Point(46, 18));
scoreText.fillColor = "black";
scoreText.fontSize = 18;
scoreText.content = "Score: " + score;

function onFrame(event) {
    if (player.alive) {
        score += 1;
        scoreText.content = "Score: " + score;

        for (var i = 0; i < BTs.length; i++) {
            if (BTs[i].beetee.bounds.intersects(player.bounds)) {
                gameOver();
            }
        }
    }
}

var playAgainButton = new Raster("images/Button.png", [480, 300]);
playAgainButton.visible = false;

playAgainButton.onMouseEnter = function(event) {
    playAgainButton.source = "images/Button2.png";
};

playAgainButton.onMouseLeave = function(event) {
    playAgainButton.source = "images/Button.png";
};

playAgainButton.onMouseDown = function(event) {
    playAgainButton.source = "images/Button3.png";
};

playAgainButton.onMouseUp = function(event) {
    playAgainButton.source = "images/Button2.png";
    playAgain();
};

function gameOver() {
    player.visible = false;
    player.alive = false;
    
    for (var i = 0; i < BTs.length; i++) {
        BTs[i].beetee.visible = false;
    }
    BTs = [];
    
    clearInterval(newBTsInterval);
    
    playAgainButton.visible = true;
}

function playAgain() {
    playAgainButton.visible = false;
    
    player.position.x = 40 + Math.random() * 880;
    player.position.y = 40 + Math.random() * 520;
    player.visible = true;
    player.alive = true;
    
    score = 0;
    scoreText.content = "Score: " + score;
    
    BTs = [];

    setTimeout(function() {
        var firstBT = new BT(Math.random() * 960, Math.random() * 600);
        BTs.push(firstBT);
    }, 1000);

    var time = 3000;
    newBTsInterval = setInterval( function() {
        if (time > 500) {
            time -= 100;
        }

        var xPosition = Math.random() * 960;
        while (Math.abs(xPosition - player.position.x) < 100) {
            var xPosition = Math.random() * 960;
        }
        var yPosition = Math.random() * 600;
        while (Math.abs(yPosition - player.position.y) < 100) {
            var yPosition = Math.random() * 600;
        }

        var tempBT = new BT(xPosition, yPosition);
        BTs.push(tempBT);
    }, time);
}
// ------------------------ General Variables & Arrays --------------------------- //

let canvas = document.getElementById("canvas1");
let ctx = canvas.getContext("2d");

let tileCount = 20;
let tileSize = 18;
let headX = 10;
let headY = 10;

let xVelocity = 0;
let yVelocity = 0;

let appleX = 5;
let appleY = 5;

let speed = 10;
let score;

let snakeBoolean = false;
let difficultyBoolean = false;
let gameOverBoolean = false;

let snakeArrayX = [];
let snakeArrayY = [];
let snakeTail = ["S"];
const highScores = [];

// ------------------------ Functions --------------------------- //

function drawGame() {
    if (headX < 0 || headY < 0){
        document.getElementById("text").style = "visibility: visible;";
        document.getElementById("text").innerHTML = "GAME OVER, PLEASE RESTART";
        document.getElementById("restart").style = "visibility: visible;";
        snakeBoolean = true;
    }
    else if ((headX * tileCount)> 380 || (headY * tileCount)> 380){
        document.getElementById("text").style = "visibility: visible;";
        document.getElementById("text").innerHTML = "GAME OVER, PLEASE RESTART";
        document.getElementById("restart").style = "visibility: visible;";
        snakeBoolean = true;
    }
    else if (gameOverBoolean == true) {
        document.getElementById("text").style = "visibility: visible;";
        document.getElementById("text").innerHTML = "GAME OVER, PLEASE RESTART";
        document.getElementById("restart").style = "visibility: visible;";
        snakeBoolean = true;
        gameOverBoolean = false;
    }
    else {
        setTimeout(drawGame, 1000/speed);
        clearScreen();
        drawSnake();
        changeSnakePosition();
        checkCollision();
        drawApple();
        checkCollisionWithHead();
    }
};

function clearScreen() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
};

function drawSnake(){
    ctx.fillStyle = "white";
    ctx.fillRect((headX * tileCount), (headY * tileCount), tileSize, tileSize);
    for (i=0; i < (snakeTail.length -1); i++) {
        drawTail(i);
    }
};

function drawApple() {
    ctx.fillStyle = "red";
    ctx.fillRect((appleX * tileCount), (appleY * tileCount), tileSize, tileSize);
};

function checkCollisionWithHead () {
    for (i=0; i<(snakeTail.length - 1); i++){
        let headPositionX = headX * tileCount;
        let headPositionY = headY * tileCount;
        if (headPositionX == snakeArrayX[(snakeArrayX.length - 1) -i] && headPositionY == snakeArrayY[(snakeArrayY.length - 1) -i]){
            gameOverBoolean = true;
        }
    }
};

function checkAppleInTail () {
    for (i=0; i<(snakeTail.length - 1); i++){
        let applePositionX = appleX * tileCount;
        let applePositionY = appleY * tileCount;
        if (applePositionX == snakeArrayX[(snakeArrayX.length - 1) -i] && applePositionY == snakeArrayY[(snakeArrayY.length - 1) -i]){
            appleX = Math.floor(Math.random() * tileCount);
            appleY = Math.floor(Math.random() * tileCount);
            checkAppleInTail();
        }
    }
}

function changeSnakePosition() {
    snakeArrayX.push(headX * tileCount);
    snakeArrayY.push(headY * tileCount);
    headX = headX + xVelocity;
    headY = headY + yVelocity;
};

function checkCollision() {
    if (appleX == headX && appleY == headY){
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        snakeTail.push("S");
        score = (snakeTail.length -1) * (speed/5);
        document.getElementById("score").innerHTML = "Score: " + score;
        checkAppleInTail();
    }
};

function drawTail(position) {
    ctx.fillStyle = "yellow";
    ctx.fillRect(snakeArrayX[(snakeArrayX.length - 1) - position], snakeArrayY[(snakeArrayY.length - 1) - position], tileSize, tileSize);
};

function highScore() {
    highScores.sort(function(a, b){return b-a});
    document.getElementsByTagName("li")[0].innerHTML = highScores[0];
    document.getElementsByTagName("li")[1].innerHTML = highScores[1];
    document.getElementsByTagName("li")[2].innerHTML = highScores[2];
};

function resetValues() {
    highScores.push(score);
    console.log(highScores);
    headX = 10;
    headY = 10;
    xVelocity = 0;
    yVelocity = 0;
    appleX = 5;
    appleY = 5;
    snakeArrayX = [];
    snakeArrayY = [];
    snakeTail = ["S"];
    snakeBoolean = false;
    difficultyBoolean = false;
    document.getElementById("text").innerHTML = "Press Key To Start";
    document.getElementById("restart").style = "visibility: hidden;";
    document.getElementById("restart").classList.remove("btnPress");
    document.getElementById("score").innerHTML = "Score: 0"

    drawGame();
    highScore();
};

drawGame();


// ------------------------ Keypress events --------------------------- //

document.addEventListener('keydown', function(event){

    switch (event.key) {
        case "w":
            if(snakeBoolean == false) {
                document.getElementsByClassName("btn")[0].classList.add("btnPress");
                document.getElementById("text").style = "visibility: hidden;";
                difficultyBoolean = true;
                if (yVelocity < 1) {
                    yVelocity = -1;
                    xVelocity = 0;
                }
            };
            break;
        case "a":
            if(snakeBoolean == false) {
                document.getElementsByClassName("btn")[1].classList.add("btnPress");
                document.getElementById("text").style = "visibility: hidden;";
                difficultyBoolean = true;
                if (xVelocity < 1){
                    yVelocity = 0;
                    xVelocity = -1;
                }
            };
            break;
        case "s":
            if(snakeBoolean == false) {
                document.getElementsByClassName("btn")[2].classList.add("btnPress");
                document.getElementById("text").style = "visibility: hidden;";
                difficultyBoolean = true;
                if (yVelocity >= 0) {
                    yVelocity = 1;
                    xVelocity = 0;
                }
            };
            break;
        case "d":
            if(snakeBoolean == false) {
                document.getElementsByClassName("btn")[3].classList.add("btnPress");
                document.getElementById("text").style = "visibility: hidden;";
                difficultyBoolean = true;
                if (xVelocity >= 0) {
                    yVelocity = 0;
                    xVelocity = 1;
                }
            };
            break;
        default:
            break;
    }
});

document.addEventListener('keyup', function(event){
    switch (event.key) {
        case "w":
            document.getElementsByClassName("btn")[0].classList.remove("btnPress");
            break;
        case "a":
            document.getElementsByClassName("btn")[1].classList.remove("btnPress");
            break;
        case "s":
            document.getElementsByClassName("btn")[2].classList.remove("btnPress");
            break;
        case "d":
            document.getElementsByClassName("btn")[3].classList.remove("btnPress");
            break;
        default:
            break;
    }
});


// ------------------------ Mouse events --------------------------- //


document.getElementsByClassName("difficulty")[0].addEventListener('mousedown', function(){
    if (difficultyBoolean == false) {
        this.classList.add("btnPress");
        document.getElementsByClassName("difficulty")[1].classList.remove("btnPress");
        document.getElementsByClassName("difficulty")[2].classList.remove("btnPress");
        speed = 5;
    }
});
document.getElementsByClassName("difficulty")[1].addEventListener('mousedown', function(){
    if (difficultyBoolean == false) {
        this.classList.add("btnPress");
        document.getElementsByClassName("difficulty")[0].classList.remove("btnPress");
        document.getElementsByClassName("difficulty")[2].classList.remove("btnPress");
        speed = 10;
    }
});
document.getElementsByClassName("difficulty")[2].addEventListener('mousedown', function(){
    if (difficultyBoolean == false) {
        this.classList.add("btnPress");
        document.getElementsByClassName("difficulty")[0].classList.remove("btnPress");
        document.getElementsByClassName("difficulty")[1].classList.remove("btnPress");
        speed = 15;
    }
});

document.getElementById("restart").addEventListener('mousedown', function(){
    if (difficultyBoolean == true) {
        resetValues();
    };
});
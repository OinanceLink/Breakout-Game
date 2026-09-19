==
// BRICK SETTINGS
// ===============================

const brickRowCount = 5;
const brickColumnCount = 6;

const brickWidth = 70;
const brickHeight = 20;

const brickPadding = 10;

const brickOffsetTop = 45;
const brickOffsetLeft = 30;

let bricks = [];


// ===============================
// CREATE BRICKS
// ===============================

function createBricks() {

    bricks = [];

    for (let c = 0; c < brickColumnCount; c++) {

        bricks[c] = [];

        for (let r = 0; r < brickRowCount; r++) {

            bricks[c][r] = {

                x: 0,
                y: 0,

                status: 1
            };
        }
    }
}


// ===============================
// RESET BALL
// ===============================

function resetBall() {

    x = canvas.width / 2;

    y = canvas.height - 50;

    dx = 3;

    dy = -3;
}


// ===============================
// RESET GAME
// ===============================

function resetGame() {

    score = 0;

    lives = 3;

    paddleX =
        (canvas.width - paddleWidth) / 2;

    paused = false;

    gameRunning = true;

    document.getElementById("score").textContent = score;

    document.getElementById("lives").textContent = lives;

    createBricks();

    resetBall();
}


// ===============================
// DRAW BALL
// ===============================

function drawBall() {

    ctx.beginPath();

    ctx.arc(
        x,
        y,
        ballRadius,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = "#0095DD";

    ctx.fill();

    ctx.closePath();
}


// ===============================
// DRAW PADDLE
// ===============================

function drawPaddle() {

    ctx.beginPath();

    ctx.roundRect(
        paddleX,
        canvas.height - paddleHeight - 15,
        paddleWidth,
        paddleHeight,
        5
    );

    ctx.fillStyle = "#0095DD";

    ctx.fill();

    ctx.closePath();
}


// ===============================
// DRAW BRICKS
// ===============================

function drawBricks() {

    for (
        let c = 0;
        c < brickColumnCount;
        c++
    ) {

        for (
            let r = 0;
            r < brickRowCount;
            r++
        ) {

            const brick = bricks[c][r];

            if (brick.status === 1) {

                const brickX =
                    c *
                    (brickWidth + brickPadding)
                    + brickOffsetLeft;

                const brickY =
                    r *
                    (brickHeight + brickPadding)
                    + brickOffsetTop;

                brick.x = brickX;

                brick.y = brickY;


                ctx.beginPath();

                ctx.roundRect(
                    brickX,
                    brickY,
                    brickWidth,
                    brickHeight,
                    4
                );

                ctx.fillStyle = "#0095DD";

                ctx.fill();

                ctx.closePath();
            }
        }
    }
}


// ===============================
// DRAW SCORE
// ===============================

function drawScore() {

    document.getElementById("score").textContent =
        score;
}


// ===============================
// COLLISION DETECTION
// ===============================

function collisionDetection() {

    for (
        let c = 0;
        c < brickColumnCount;
        c++
    ) {

        for (
            let r = 0;
            r < brickRowCount;
            r++
        ) {

            const brick = bricks[c][r];

            if (brick.status === 1) {

                if (
                    x > brick.x &&
                    x < brick.x + brickWidth &&
                    y > brick.y &&
                    y < brick.y + brickHeight
                ) {

                    dy = -dy;

                    brick.status = 0;

                    score++;

                    drawScore();

                    checkWin();
                }
            }
        }
    }
}


// ===============================
// CHECK WIN
// ===============================

function checkWin() {

    let remaining = 0;

    for (
        let c = 0;
        c < brickColumnCount;
        c++
    ) {

        for (
            let r = 0;
            r < brickRowCount;
            r++
        ) {

            if (bricks[c][r].status === 1) {

                remaining++;
            }
        }
    }


    if (remaining === 0) {

        gameRunning = false;

        setTimeout(() => {

            alert(
                "🎉 Congratulations! You Win!"
            );

            resetGame();

        }, 100);
    }
}


// ===============================
// LOSE LIFE
// ===============================

function loseLife() {

    lives--;

    document.getElementById("lives").textContent =
        lives;


    if (lives <= 0) {

        gameRunning = false;

        setTimeout(() => {

            alert(
                "💀 Game Over!"
            );

        }, 100);

    }
    else {

        resetBall();

    }
}


// ===============================
// KEYBOARD DOWN
// ===============================

document.addEventListener(
    "keydown",
    keyDownHandler
);

function keyDownHandler(e) {

    if (
        e.key === "ArrowRight" ||
        e.key === "Right"
    ) {

        rightPressed = true;
    }

    else if (
        e.key === "ArrowLeft" ||
        e.key === "Left"
    ) {

        leftPressed = true;
    }

    else if (
        e.key === " " ||
        e.key === "Spacebar"
    ) {

        togglePause();
    }
}


// ===============================
// KEYBOARD UP
// ===============================

document.addEventListener(
    "keyup",
    keyUpHandler
);

function keyUpHandler(e) {

    if (
        e.key === "ArrowRight" ||
        e.key === "Right"
    ) {

        rightPressed = false;
    }

    else if (
        e.key === "ArrowLeft" ||
        e.key === "Left"
    ) {

        leftPressed = false;
    }
}


// ===============================
// TOUCH / MOBILE CONTROLS
// ===============================

const leftBtn =
    document.getElementById("leftBtn");

const rightBtn =
    document.getElementById("rightBtn");


// LEFT BUTTON

leftBtn.addEventListener(
    "touchstart",
    function(e) {

        e.preventDefault();

        leftPressed = true;
    }
);

leftBtn.addEventListener(
    "touchend",
    function(e) {

        e.preventDefault();

        leftPressed = false;
    }
);


// RIGHT BUTTON

rightBtn.addEventListener(
    "touchstart",
    function(e) {

        e.preventDefault();

        rightPressed = true;
    }
);

rightBtn.addEventListener(
    "touchend",
    function(e) {

        e.preventDefault();

        rightPressed = false;
    }
);


// Mouse controls

leftBtn.addEventListener(
    "mousedown",
    () => leftPressed = true
);

leftBtn.addEventListener(
    "mouseup",
    () => leftPressed = false
);

rightBtn.addEventListener(
    "mousedown",
    () => rightPressed = true
);

rightBtn.addEventListener(
    "mouseup",
    () => rightPressed = false
);


// ===============================
// PAUSE
// ===============================

const pauseBtn =
    document.getElementById("pauseBtn");

pauseBtn.addEventListener(
    "click",
    togglePause
);


function togglePause() {

    if (!gameRunning) {
        return;
    }

    paused = !paused;

    pauseBtn.textContent =
        paused ? "▶" : "⏸";
}


// ===============================
// RESTART
// ===============================

const restartBtn =
    document.getElementById("restartBtn");

restartBtn.addEventListener(
    "click",
    resetGame
);


// ===============================
// MAIN GAME LOOP
// ===============================

function draw() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // Draw everything

    drawBricks();

    drawBall();

    drawPaddle();


    // Don't update game when paused

    if (
        paused ||
        !gameRunning
    ) {

        requestAnimationFrame(draw);

        return;
    }


    // ===========================
    // WALL COLLISION
    // ===========================

    if (
        x + dx >
        canvas.width - ballRadius ||

        x + dx <
        ballRadius
    ) {

        dx = -dx;
    }


    if (
        y + dy <
        ballRadius
    ) {

        dy = -dy;
    }


    // ===========================
    // PADDLE / BOTTOM
    // ===========================

    else if (
        y + dy >
        canvas.height - ballRadius
    ) {

        const paddleY =
            canvas.height -
            paddleHeight -
            15;


        if (
            x >= paddleX &&
            x <= paddleX + paddleWidth &&
            y + ballRadius >= paddleY
        ) {

            // Change ball direction

            dy = -Math.abs(dy);


            // Change angle depending
            // on where ball hits paddle

            const hitPosition =
                (x - paddleX) /
                paddleWidth;

            dx =
                (hitPosition - 0.5) * 6;
        }

        else {

            loseLife();

            requestAnimationFrame(draw);

            return;
        }
    }


    // ===========================
    // MOVE PADDLE
    // ===========================

    if (
        rightPressed &&
        paddleX <
        canvas.width - paddleWidth
    ) {

        paddleX += 7;
    }

    else if (
        leftPressed &&
        paddleX > 0
    ) {

        paddleX -= 7;
    }


    // ===========================
    // MOVE BALL
    // ===========================

    x += dx;

    y += dy;


    // ===========================
    // BRICK COLLISION
    // ===========================

    collisionDetection();


    // Continue game

    requestAnimationFrame(draw);
}


// ===============================
// START GAME
// ===============================

resetGame();

draw();

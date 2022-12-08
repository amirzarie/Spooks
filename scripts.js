// Capturing the main elements for ease of access.
const bird = document.querySelector("#bird")
const gameDisplay = document.querySelector("#game")
const ground = document.querySelector("#ground")

// Setting the parameters for the game dynamics.
let birdBottom = 40
let gravity = 2
const jumpHeight = 7
const obstacleHeight = 50
const maxObstacleHeight = 62
const minObstacleHeight = 45
const obstacleMove = 2
let obstaclePos = -10
const obstacleStart = -10
let topOrBottom = 0;

// The main function that runs the game.
function main() {
    birdBottom -= gravity
    bird.style.bottom = birdBottom + "vh"
}

let gameTimerId = setInterval(main, 100)

function jump(e) {
    if (e.code === "Space") {
        birdBottom += jumpHeight
        bird.style.bottom = birdBottom + "vh"
    }
}

document.addEventListener("keyup", jump)

function createObstacle() {
    obstaclePos = -10
    let newObstacle = document.createElement("div")
    newObstacle.style.width = "10vw"
    newObstacle.style.height = Math.floor(Math.random() * (maxObstacleHeight - minObstacleHeight + 1)) + minObstacleHeight + "vh"
    newObstacle.style.backgroundColor = "green"
    newObstacle.style.position = "absolute"
    newObstacle.style.right = obstacleStart + "vw"
    topOrBottom = Math.floor(Math.random() * 2)
    if (topOrBottom == 0) {
        newObstacle.style.bottom = 20 + "vh"
    } else {
        newObstacle.style.top = 0 + "vh"
    }
    gameDisplay.appendChild(newObstacle)
}


function moveObstacle() {
    obstaclePos += obstacleMove
    gameDisplay.lastElementChild.style.right = obstaclePos + "vw"
    if (gameDisplay.lastElementChild.style.right == "100vw") {
        gameDisplay.removeChild(gameDisplay.lastElementChild)
        createObstacle()
    }

    
}


createObstacle()
let timerId = setInterval(moveObstacle, 80)
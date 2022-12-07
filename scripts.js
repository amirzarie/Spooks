// Capturing the main elements for ease of access.
const bird = document.querySelector("#bird")
const gameDisplay = document.querySelector("#game")
const ground = document.querySelector("#ground")

// Setting the parameters for the game dynamics.
let birdBottom = 40
let gravity = 1
const jumpHeight = 10
const obstacleHeight = 50
const maxObstacleHeight = 60
const minObstacleHeight = 50

// The main function that runs the game.
function main() {
    birdBottom -= gravity
    bird.style.bottom = birdBottom + "vh"
}

let gameTimerId = setInterval(main, 100)

function jump(e) {
    if (e.code === "Space") {
        birdBottom += jumpHeight
        bird.style.bottom += birdBottom + "vh"
    }
}

document.addEventListener("keyup", jump)

function createObstacle() {
    let newObstacle = document.createElement("div")
    newObstacle.style.width = "10vw"
    newObstacle.style.height = Math.floor(Math.random() * (maxObstacleHeight - minObstacleHeight + 1)) + minObstacleHeight + "vh"
    newObstacle.style.backgroundColor = "green"
    newObstacle.style.position = "absolute"
    newObstacle.style.right = "10vw"
    gameDisplay.appendChild(newObstacle)
}

function moveObstacle() {
    
}

let timerId = setInterval(moveObstacle, 100)
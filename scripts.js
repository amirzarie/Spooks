// Capturing the main elements for ease of access.
const player = document.querySelector("#player")
const gameDisplay = document.querySelector("#game")
const ground = document.querySelector("#ground")

// Setting the parameters for the game dynamics.
let playerBottom = 40
let gravity = 2
const jumpHeight = 6
let obstacleHeight = 0
const maxObstacleHeight = 55
const minObstacleHeight = 45
const maxObstacleWidth = 25
const minObstacleWidth = 5
const obstacleMove = 2
let obstaclePos = -10
const obstacleStart = -10
let topOrBottom = 0
let points = 0

// The main function that runs the game.
function main() {
    playerBottom -= gravity
    player.style.bottom = playerBottom + "vh"
    player.style.right = "74vw"
}

let gameTimerId = setInterval(main, 100)

// The function that binds the spacebar key to make the bird jump.
function jump(e) {
    if (e.code === "Space") {
        playerBottom += jumpHeight
        player.style.bottom = playerBottom + "vh"
    }
}

document.addEventListener("keyup", jump)

// This is the function that creates the obstacle with some randomized features.
function createObstacle() {
    obstaclePos = -10
    let newObstacle = document.createElement("div")
    newObstacle.style.width =  "10vw" // Math.floor(Math.random() * (maxObstacleWidth - minObstacleWidth + 1)) + minObstacleWidth + "vh"
    obstacleHeight = Math.floor(Math.random() * (maxObstacleHeight - minObstacleHeight + 1)) + minObstacleHeight
    newObstacle.style.height = obstacleHeight + "vh"
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

    collide()
    countPoints()   
}

function collide() {
    if ((parseInt(gameDisplay.lastElementChild.style.right.replace("vw", "")) >= 64 && parseInt(gameDisplay.lastElementChild.style.right.replace("vw", "")) <= 74) && (parseInt(player.style.bottom.replace("vh", "")) <= obstacleHeight && topOrBottom == 0) || (parseInt(gameDisplay.lastElementChild.style.right.replace("vw", "")) >= 64 && parseInt(gameDisplay.lastElementChild.style.right.replace("vw", "")) <= 74) && (parseInt(player.style.bottom.replace("vh", "")) + 26 >= 100 - obstacleHeight && topOrBottom == 1) || parseInt(player.style.bottom.replace("vh", "")) <= 0) {
        console.log("game over!")
        clearInterval(gameTimerId)
        clearInterval(timerId)
        document.removeEventListener("keyup", jump)
        tryAgain()
        // document.body.style.filter = "blur(5px)"
    }
}

function countPoints() {
    if (parseInt(gameDisplay.lastElementChild.style.right.replace("vw", "")) >= 98) {
        points += 1
        document.getElementById("points-div").innerText = "POINTS: " + points.toString()
    }
}

function tryAgain() {
    let start = document.createElement("button")
    start.style.height = "10vh"
    start.style.width = "auto"
    start.style.backgroundColor = "blue"
    start.style.position = "absolute"
    start.style.left = "50%"
    start.style.top = "50%"
    start.style.transform = "translate(-50%, -50%)"
    start.style.borderRadius = "5vw"
    start.innerHTML = "PLAY (points: " + points.toString() + ")"
    start.style.color = "white"
    start.style.display = "flex"
    start.style.justifyContent = "center"
    start.style.alignItems = "center"
    start.style.fontSize = "3vw"
    document.body.appendChild(start);
}


createObstacle()
let timerId = setInterval(moveObstacle, 80)
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
let difficulty = 80

// The render function that runs the game.
function render() {
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
        newObstacle.style.width =  "7vw"
        obstacleHeight = Math.floor(Math.random() * (maxObstacleHeight - minObstacleHeight + 1)) + minObstacleHeight
        newObstacle.style.height = obstacleHeight + "vh"
        newObstacle.style.position = "absolute"
        newObstacle.style.right = obstacleStart + "vw"
        topOrBottom = Math.floor(Math.random() * 2)
        if (topOrBottom == 0) {
            newObstacle.style.bottom = 2 + "vh"
        } else {
            newObstacle.style.top = -1 + "vh"
        }

        newObstacle.style.backgroundImage = "url('assets/spiked_obstacle.png')"
        newObstacle.style.backgroundSize = "contain"
        newObstacle.style.backgroundRepeat = "round"
        newObstacle.style.position = "center"

        gameDisplay.appendChild(newObstacle)
    }

    function moveObstacle() {
        obstaclePos += obstacleMove
        gameDisplay.lastElementChild.style.right = obstaclePos + "vw"

        if (points%3 == 0 && gameDisplay.lastElementChild.style.right == "98vw" && difficulty >=25) {
            difficulty -= 5
            clearInterval(timerId)
            timerId = setInterval(moveObstacle, difficulty)
            console.log(difficulty)
        }

        if (gameDisplay.lastElementChild.style.right == "98vw") {
            countPoints()
            gameDisplay.removeChild(gameDisplay.lastElementChild)
            createObstacle()
        }

        collide()       
    }

    function collide() {
        if ((parseInt(gameDisplay.lastElementChild.style.right.replace("vw", "")) >= 69 && parseInt(gameDisplay.lastElementChild.style.right.replace("vw", "")) <= 77) && (parseInt(player.style.bottom.replace("vh", "")) + 5 <= obstacleHeight && topOrBottom == 0) || (parseInt(gameDisplay.lastElementChild.style.right.replace("vw", "")) >= 69 && parseInt(gameDisplay.lastElementChild.style.right.replace("vw", "")) <= 74) && (parseInt(player.style.bottom.replace("vh", "")) + 15 >= 98 - obstacleHeight && topOrBottom == 1) || parseInt(player.style.bottom.replace("vh", "")) <= -1) {
            console.log("game over!")
            clearInterval(gameTimerId)
            clearInterval(timerId)
            document.removeEventListener("keyup", jump)
            let end = document.createElement("div")
            end.style.height = "35vh"
            end.style.width = "35vw"
            end.style.position = "absolute"
            end.style.left = "50%"
            end.style.top = "50%"
            end.style.transform = "translate(-50%, -50%)"
            end.style.borderRadius = "2vw"
            end.innerText = points.toString() + " SPOOKS AVOIDED!"
            end.style.color = "crimson"
            end.style.display = "flex"
            end.style.justifyContent = "center"
            end.style.alignItems = "center"
            end.style.fontSize = "4vw"
            end.style.backgroundImage = "url('assets/plank_3.png')"
            end.style.backgroundSize = "100% 100%"
            end.style.position = "center"
            document.body.appendChild(end);
        }

        document.addEventListener('keyup', event => {
            if (event.code === 'Enter') {
                document.location.reload()
            }
        })
    }

    function countPoints() {
        if (parseInt(gameDisplay.lastElementChild.style.right.replace("vw", "")) >= 98) {
            points += 1
        }

        return points
    }

    createObstacle()
    let timerId = setInterval(moveObstacle, difficulty)
}

let refresh = document.createElement("div")
refresh.style.left = "50%"
refresh.style.top = "50%"
refresh.style.transform = "translate(-50%, -50%)"
refresh.style.height = "35vh"
refresh.style.width = "35vw"
refresh.style.color = "crimson"
refresh.style.position = "absolute"
refresh.innerHTML = 'Try your best to avoid the spikes by pressing the spacebar. Press enter to start and restart the game!'
refresh.style.fontSize = "3vw"
refresh.style.textAlign = "center"
gameDisplay.prepend(refresh)

document.addEventListener('keyup', event => {
    if (event.code === 'Enter') {
        refresh.remove()
        render()
    }
})
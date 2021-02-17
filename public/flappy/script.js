document.addEventListener("DOMContentLoaded", () => {
    const bird = document.querySelector('.bird')
    const gameDisplay = document.querySelector('.game-container') 
    const ground = document.querySelector('.ground')

    let birdLeft = 220
    let birdBottom = 300
    let gravity = 2
    let isGameOver = false
    let gap = 430

    function startGame() {
        birdBottom -= gravity
        bird.style.bottom = birdBottom + 'px'
        bird.style.left = birdLeft + 'px'
    }
    let gameTimerId = setInterval(startGame, 20)

    function control(event) {
        /* .keyCode == 32 represents the spacebar*/
        if (event.keyCode == 32) {
            jump()
        }
    }

    function jump() {
        if (birdBottom < 465) birdBottom += 50
        bird.style.bottom = birdBottom + 'px'
        console.log(birdBottom)
    }

    document.addEventListener('keyup', control)

    function generateObstacle () {
        /* this creates a div obstacle in the HTML game container*/
        let obstacleLeft = 500
        let randomHeight = Math.random() * 70
        let obstacleBottom = randomHeight
        const obstacle = document.createElement('div')
        const topObstacle = document.createElement('div')
        if (!isGameOver) {
            obstacle.classList.add('obstacle')
            topObstacle.classList.add('topObstacle')
        }
        gameDisplay.appendChild(obstacle) 
        gameDisplay.appendChild(topObstacle) 
        obstacle.style.left = obstacleLeft + 'px'
        topObstacle.style.left = obstacleLeft + 'px'
        obstacle.style.bottom = obstacleBottom + 'px'
        topObstacle.style.bottom = obstacleBottom + gap + 'px'
    
        function moveObstacle() {
            obstacleLeft -= 2
            obstacle.style.left = obstacleLeft + 'px'
            topObstacle.style.left = obstacleLeft + 'px'

            if (obstacleLeft === -60) {
                clearInterval(timerId)
                gameDisplay.removeChild(obstacle)
                gameDisplay.removeChild(topObstacle)
            }
            if (
                obstacleLeft > 190 && obstacleLeft < 270 && birdLeft === 220 &&
                (birdBottom < obstacleBottom + 300|| birdBottom > obstacleBottom + gap - 53) ||
                birdBottom === 0
                ) {
                gameOver()
                clearInterval(timerId)
            }
        }
        let timerId = setInterval(moveObstacle, 15)
        if (!isGameOver) setTimeout(generateObstacle, 2500)
    }
    generateObstacle()

    function gameOver() {
        clearInterval(gameTimerId)
        console.log("Game over!")
        isGameOver = true
        document.removeEventListener('keyup', control)
    }

})




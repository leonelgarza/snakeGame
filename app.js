document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector('span')
    const startRestBtn = document.querySelector('.start')
  
    const width = 50
    let currentIndex = 0
    let orangeIndex = 0 
    let currentSnake = [2,1,0] 
    let direction = 1
    let score = 0
    let speed = 0.9
    let intervalTime = 0
    let interval = 0

    //assign functions to keycodes
    function control(e) {
        squares[currentIndex].classList.remove('snake')
    
        if(e.keyCode === 39) {
            direction = 1 //Right arrow, Snake will go one div to the right 
        } else if (e.keyCode === 38) {
            direction = -width //Up arrow, Snake will return the number of width back(50 divs) in order to appearing to go up
        } else if (e.keyCode === 37) {
            direction = -1 //Left arrow, Snake will go one div to the left
        } else if (e.keyCode === 40) {
            direction = +width //Down arrow, Snake will go the number of width forward (50 divs) in order to appearing to go down
        }
      }
  
    //to start or restart the game
    function startRestartGame() {
      currentSnake.forEach(index => squares[index].classList.remove('snake'))
      currentSnake = [2,1,0]
      currentIndex = 0
      currentSnake.forEach(index => squares[index].classList.add('snake'))
      squares[orangeIndex].classList.remove('orange')
      clearInterval(interval)
      score = 0
      randomOrange()
      direction = 1
      scoreDisplay.innerText = score
      intervalTime = 250
      interval = setInterval(snakeMoves, intervalTime)
    }

    //Creates a orange in a random place wherever is not the snake
    function randomOrange() {
        do
        {
          orangeIndex = Math.floor(Math.random() * squares.length)
        }
        while(squares[orangeIndex].classList.contains('snake')) 
        
        squares[orangeIndex].classList.add('orange')
      }
  
  
    //Function in which we indicate what happens when the snake move 
    function snakeMoves() {
  
      //Loss scenario (touching a wall or hitting itself)
      if (
          (currentSnake[0] - width < 0 && direction === -width) ||  //Hits the top wall
          (currentSnake[0] % width === width -1 && direction === 1) || //Hits the right wall
          (currentSnake[0] + width >= (width * width) && direction === width ) || //Hits the bottom wall
          (currentSnake[0] % width === 0 && direction === -1) || //if snake hits left wall
          squares[currentSnake[0] + direction].classList.contains('snake') //hit itself
      ) {
          alert("You lose, try again!");
          return clearInterval(interval)
      }
  
      const tail = currentSnake.pop() //removes last item of the array and shows it
      squares[tail].classList.remove('snake')  //removes class of snake from the TAIL
      currentSnake.unshift(currentSnake[0] + direction) //gives direction to the head of the array
  
      //Snake eating an orange
      if(squares[currentSnake[0]].classList.contains('orange')) {
          squares[currentSnake[0]].classList.remove('orange')
          squares[tail].classList.add('snake')
          currentSnake.push(tail)
          randomOrange()
          score++
          scoreDisplay.textContent = score
          clearInterval(interval)
          intervalTime = intervalTime * speed  //increase the speed
          interval = setInterval(snakeMoves, intervalTime)
      }
      squares[currentSnake[0]].classList.add('snake')
    }
  
    document.addEventListener('keyup', control)
    startRestBtn.addEventListener('click', startRestartGame)
  })
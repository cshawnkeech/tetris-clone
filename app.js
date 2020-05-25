document.addEventListener('DOMContentLoaded', () => {
  // code goes here
  const grid = document.querySelector('.grid');
  let squares = Array.from(document.querySelectorAll('.grid div'));
  const scoreDisplay = document.querySelector('#score');
  const startBtn = document.querySelector('#start-button');
  const tileWidth = 10; // tileWidth of title
  let nextRandom = 0;
  let timerId
  let howFast = 500; // determines speed of setInterval
  let score = 0;

  const colors =  ['#305252', '#436262', '#547070', '#8A9F9F', '#603896', '#414361', '#2A2D43'];//give colors to tetrominoes


  /*
  '#547070',
  '#647D7D',
  '#728989',
  ,

  */
  //The Terominoes--around 36:00 in the tutorial

  const lTetromino = [
    [1, tileWidth + 1, tileWidth*2 + 1, 2],
    [tileWidth, tileWidth+1, tileWidth+2, tileWidth*2+2],
    [1, tileWidth + 1, tileWidth*2, tileWidth*2+1],
    [tileWidth, tileWidth*2, tileWidth*2+1, tileWidth*2+2]
  ];
  const zTetromino = [
    [1, 2, tileWidth, tileWidth+1],
    [0, tileWidth, tileWidth+1, tileWidth*2 + 1],
    [1, 2, tileWidth, tileWidth+1],
    [0, tileWidth, tileWidth+1, tileWidth*2 + 1]
  ];
  const tTetromino = [
    [tileWidth, tileWidth+1, tileWidth+2, 1],
    [1, tileWidth+1, tileWidth*2+1, tileWidth+2],
    [tileWidth, tileWidth+1, tileWidth+2, tileWidth*2+1],
    [1, tileWidth+1, tileWidth*2+1, tileWidth]
  ];
  const iTetromino = [
    [1, tileWidth+1, tileWidth*2 + 1, tileWidth*3 + 1],
    [tileWidth, tileWidth+1, tileWidth+2, tileWidth+3],
    [1, tileWidth+1, tileWidth*2 + 1, tileWidth*3 + 1],
    [tileWidth, tileWidth+1, tileWidth+2, tileWidth+3]
  ];
  const oTetromino = [
    [0,1, tileWidth, tileWidth+1],
    [0,1, tileWidth, tileWidth+1],
    [0,1, tileWidth, tileWidth+1],
    [0,1, tileWidth, tileWidth+1]
  ];
  //added these two
  //other missing tetrominos: mirror z & mirror l
  //these were not in the tutorial
  const mzTetrominio = [
    [0, 1, tileWidth + 1, tileWidth + 2],
    [2, tileWidth+1, tileWidth+2, tileWidth*2+1],
    [0, 1, tileWidth + 1, tileWidth + 2],
    [2, tileWidth+1, tileWidth+2, tileWidth*2+1]
  ];
  const mlTetromino = [
    [0, 1, tileWidth+1, tileWidth*2 + 1],
    [tileWidth, tileWidth+1, tileWidth+2, 2],
    [1, tileWidth+1, tileWidth*2+1, tileWidth*2+2],
    [tileWidth, tileWidth+1, tileWidth+2, tileWidth*2]
  ];

  const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino, mzTetrominio, mlTetromino];

  let currentPosition = 4;
  let currentRotation = 0;
  let random = Math.floor(Math.random()*theTetrominoes.length);
  let current = theTetrominoes[random][currentRotation];

  //draw the tetromino
  //about 40
  function draw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.add('tetromino');
      squares[currentPosition + index].style.backgroundColor = colors[random];
    })
  }

  //draw();
  //undraw the tetromino
  function undraw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.remove('tetromino');
      squares[currentPosition + index].style.backgroundColor = '';
    })
  }

  //tetromino moves down each second

  //timerId = setInterval(moveDown, howFast);//when invoked, starts moving when browser loads

  //assign functions to keycodes

  function control(e) {
    if (!gameOver() && timerId !== null) { //ensures controls are not available if paused or game over
      if (e.keyCode === 37) {
        moveLeft();
      } else if (e.keyCode === 39) {
        moveRight();
      } else if (e.keyCode === 38) {
        rotate();
      } else if (e.keyCode === 40) {
        moveDown();
      }
    }

  }

  document.addEventListener('keydown', control);

  function moveDown() {
    undraw();
    currentPosition += tileWidth;
    draw();
    freeze();
  }
  //freeze function
  //50:42
  function freeze() {
    if (current.some(index => squares[currentPosition + index + tileWidth].classList.contains('taken'))) {
      current.forEach(index => squares[currentPosition + index].classList.add('taken'));
      //start a new teromino falling
      random = nextRandom;
      nextRandom = Math.floor(Math.random()*theTetrominoes.length);
      current = theTetrominoes[random][currentRotation];
      currentPosition = 4;
      draw();
      displayShape();
      addScore();
      gameOver();
    }
  }
  //move left unless at the edge or there is a tetromino in the way
  //52:14
  function moveLeft() {
    undraw();
    //use modulo to check if at left edge
    const isAtLeftEdge = current.some(index => (currentPosition + index) % tileWidth === 0);
    if (!isAtLeftEdge) {
      currentPosition -= 1;
    }
    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition += 1;
    }
    draw();
  }
  //keycodes 58:15
  function moveRight() {
    undraw();
    const isAtRightEdge = current.some(index => (currentPosition + index) % tileWidth === tileWidth - 1);

    if (!isAtRightEdge) {
      currentPosition += 1;
    }
    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition -= 1;
    }

    draw();
  }

  //rotate the tetromino
  function rotate() {
    undraw();
    currentRotation++;
    if(currentRotation === current.length) { // if we reach max rotations
      currentRotation = 0;
    }
    current = theTetrominoes[random][currentRotation];
    draw();
  }

  // show up-next teromino in the mini-grid
  const displaySquares = document.querySelectorAll('.mini-grid div');
  const upNextWidth = 4;
  let displayIndex = 0;

  // the tetrominos without rotations
  const upNextTetrominoes = [
    [1, upNextWidth + 1, upNextWidth*2 + 1, 2], // lTetromino
    [1, 2, upNextWidth, upNextWidth+1], // zTetromino
    [upNextWidth, upNextWidth+1, upNextWidth+2, 1], // tTetromino
    [0,1, upNextWidth, upNextWidth+1], // oTetromino
    [1, upNextWidth+1, upNextWidth*2 + 1, upNextWidth*3 + 1], // iTetromino
    [0, 1, upNextWidth + 1, upNextWidth + 2], // mzTetrominio
    [0, 1, upNextWidth+1, upNextWidth*2 + 1] // mlTetromino
  ]; // indexes based on mini-grid display

  //display the shape in the mini-grid display
  function displayShape() {
    //remove any trace of a tetromino from the entire grid
    //console.log(upNextTetrominoes[nextRandom]);

    displaySquares.forEach(square => {
      square.classList.remove('tetromino');
      square.style.backgroundColor = '';
    })

    upNextTetrominoes[nextRandom].forEach( index => {
      displaySquares[displayIndex + index].classList.add('tetromino');
      displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom]; //temp color
    })
  }

  startBtn.addEventListener('click', () => {
    if(timerId) {
      clearInterval(timerId);
      timerId = null;
    } else {
      draw();
      timerId = setInterval(moveDown, howFast);
      nextRandom = Math.floor(Math.random()*theTetrominoes.length);
      displayShape();
    }
  })

  //add score
  function addScore() {
    for (let i = 0; i < 199; i+=tileWidth) {
      const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9];

      if(row.every(index => squares[index].classList.contains('taken'))) {
        score += 10;
        scoreDisplay.innerHTML = score;
        row.forEach(index => {
          squares[index].classList.remove('taken');
          squares[index].classList.remove('tetromino');
          squares[index].style.backgroundColor = '';

        })
        const squaresRemoved = squares.splice(i, tileWidth);
        squares = squaresRemoved.concat(squares);
        squares.forEach(cell => grid.appendChild(cell))
      }
    }
  }

  //game over
  function gameOver() {
    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      scoreDisplay.innerHTML = score + '    Game Over';
      clearInterval(timerId);
      return true;
    }
  }


  //ends above this line
})

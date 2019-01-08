const map = [
  'WWWWWWWWWWWWWWWWWWWWW',
  'W   W     W     W W W',
  'W W W WWW WWWWW W W W',
  'W W W   W     W W   W',
  'W WWWWWWW W WWW W W W',
  'W         W     W W W',
  'W WWW WWWWW WWWWW W W',
  'W W   W   W W     W W',
  'W WWWWW W W W WWW W F',
  'S     W W W W W W WWW',
  'WWWWW W W W W W W W W',
  'W     W W W   W W W W',
  'W WWWWWWW WWWWW W W W',
  'W       W       W   W',
  'WWWWWWWWWWWWWWWWWWWWW'
]

let body = document.querySelector('body')
let elWidth = 20 + 'px'
let cellFinishCoord

for (let i = 0; i < map.length; i++) {
  let rowDiv = document.createElement('div')
  rowDiv.style.display = 'flex'
  rowDiv.style.justifyContent = 'center'
  let playerDiv = document.createElement('div')
  playerDiv.id = 'player'
  playerDiv.innerHTML = 'X'
  playerDiv.style.position = 'absolute'
  playerDiv.style.width = elWidth
  playerDiv.style.height = elWidth
  playerDiv.style.textAlign = 'center'
  playerDiv.style.verticalAlign = 'center'
  rowDiv.className = 'row'
  for (let j = 0; j < map[i].length; j++) {
    let cellDiv = document.createElement('div')
    cellDiv.id = i + '-' + j
    cellDiv.style.width = elWidth
    cellDiv.style.height = elWidth

    const curMapCell = map[i][j]
    if (curMapCell == 'W') {
      cellDiv.style.backgroundColor = 'black'
      cellDiv.dataset.cellType = 'wall'
      rowDiv.appendChild(cellDiv)
    } else if (curMapCell == ' ') {
      cellDiv.style.backgroundColor = 'white'
      cellDiv.dataset.cellType = 'empty'
      rowDiv.appendChild(cellDiv)
    } else if (curMapCell == 'S') {
      cellDiv.style.backgroundColor = 'green'
      playerDiv.dataset.y = parseInt(i)
      playerDiv.dataset.x = parseInt(j)
      rowDiv.appendChild(cellDiv)
      cellDiv.appendChild(playerDiv)
    } else if (curMapCell == 'F') {
      cellDiv.style.backgroundColor = 'blue'
      cellDiv.dataset.cellType = 'finish'
      cellFinishCoord = [j, i]
      rowDiv.appendChild(cellDiv)
    }
  }
  body.appendChild(rowDiv)
}
// get start element position
let playerDiv = document.getElementById('player')
let playerStyle = window.getComputedStyle(playerDiv)
let playerTop = playerStyle.getPropertyValue('top')
let playerLeft = playerStyle.getPropertyValue('left')
playerTop = parseInt(playerTop)
playerLeft = parseInt(playerLeft)

// controls
let moveCount = 0
let boxTop = playerTop
let boxLeft = playerLeft
document.addEventListener('keydown', function keyDown (event) {
  const keyName = event.key
  let cellAbovePlayerCoord = (parseInt(playerDiv.dataset.y) - 1) + '-' + playerDiv.dataset.x
  let cellBelowPlayerCoord = (parseInt(playerDiv.dataset.y) + 1) + '-' + playerDiv.dataset.x
  let cellRightPlayerCoord = playerDiv.dataset.y + '-' + (parseInt(playerDiv.dataset.x) + 1)
  let cellLeftPlayerCoord = playerDiv.dataset.y + '-' + (parseInt(playerDiv.dataset.x) - 1)

  if (document.getElementById(cellBelowPlayerCoord) != null) {
    var cellBelowType = document.getElementById(cellBelowPlayerCoord).dataset.cellType
  }
  if (document.getElementById(cellAbovePlayerCoord) != null) {
    var cellAboveType = document.getElementById(cellAbovePlayerCoord).dataset.cellType
  }
  if (document.getElementById(cellRightPlayerCoord) != null) {
    var cellRightType = document.getElementById(cellRightPlayerCoord).dataset.cellType
  }
  if (document.getElementById(cellLeftPlayerCoord) != null) {
    var cellLeftType = document.getElementById(cellLeftPlayerCoord).dataset.cellType
  }

  let moveUp = parseInt(playerDiv.dataset.y) - 1
  let moveDown = parseInt(playerDiv.dataset.y) + 1
  let moveRight = parseInt(playerDiv.dataset.x) + 1
  let moveLeft = parseInt(playerDiv.dataset.x) - 1
  // let document.getElementById()
  if (keyName == 'ArrowDown') {
    if (cellBelowType == 'empty' || cellBelowType == 'finish') {
      boxTop += parseInt(elWidth)
      playerDiv.dataset.y = moveDown
      moveCount++
    }
  } else if (keyName == 'ArrowUp') {
    if (cellAboveType == 'empty' || cellAboveType == 'finish') {
      boxTop -= parseInt(elWidth)
      playerDiv.dataset.y = moveUp
      moveCount++
    }
  } else if (keyName == 'ArrowLeft') {
    if (cellLeftType == 'empty' && moveCount != 0 || cellLeftType == 'finish') {
      boxLeft -= parseInt(elWidth)
      playerDiv.dataset.x = moveLeft
      moveCount++
    }
  } else if (keyName == 'ArrowRight') {
    if (cellRightType == 'empty' || cellRightType == 'finish') {
      boxLeft += parseInt(elWidth)
      playerDiv.dataset.x = moveRight
      moveCount++
    }
  }
  document.getElementById('player').style.top = boxTop + 'px'
  document.getElementById('player').style.left = boxLeft + 'px'
  let playerCurrentCoord = [parseInt(playerDiv.dataset.x), parseInt(playerDiv.dataset.y)]
  if (playerCurrentCoord[0] === cellFinishCoord[0] && playerCurrentCoord[1] === cellFinishCoord[1]) {
    let winDiv = document.createElement('div')
    winDiv.style.textAlign = 'center'
    let winText = document.createTextNode('WINNER')
    winDiv.appendChild(winText)
    body.appendChild(winDiv)
    document.removeEventListener('keydown', keyDown)
  }
})

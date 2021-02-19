"use strict";

/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let BOARD = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  //2d array to generate the BOARD H x W
  for (let i = 0; i < HEIGHT; i++) {
    let rows = [];
    for (let j = 0; j < WIDTH; j++) {
      rows.push(undefined);
    }
    BOARD.push(rows);
  } 
  console.log(BOARD);
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  let htmlBoard = document.querySelector('#board');

  // TODO: add comment for this code
  // generate top row that user will select move on
  let top = document.createElement("tr");
 
  // addid to element + add event to same element
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  // TODO: add comment for this code
  // using 'top' variable append a table data element 'width' amount of times
  for (let x = 0; x < WIDTH; x++) {
    //define data cell
    let headCell = document.createElement("td");

    // apply id to data cell
    headCell.setAttribute("id", x);

    //append data cell to 'top' row
    top.append(headCell);
  }
  // append this row to the DOM
  htmlBoard.append(top);

  // dynamically creates the main part of html board
  // uses HEIGHT to create table rows
  // uses WIDTH to create table cells for each row
  for (let y = 0; y < HEIGHT; y++) {
    // TODO: Create a table row element and assign to a "row" variable
    // generate row 
    let gameRow = document.createElement("tr");

    for (let x = 0; x < WIDTH; x++) {
      // TODO: Create a table cell element and assign to a "cell" variable
      // generate gameCell
      let gameCell = document.createElement('td');
      
      // TODO: add an id, y-x, to the above table cell element
      // you'll use this later, so make sure you use y-x
      gameCell.setAttribute("id", `${y}-${x}`);// check

      // TODO: append the table cell to the table row
      gameRow.append(gameCell);
    }
    // TODO: append the row to the html board
    htmlBoard.append(gameRow)
  }
 

}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  // return null if none available;
  // starts at x, height is 6
  // access BOARD [height][x], if the coordinate is equal to null, return current height
  for (let y = HEIGHT-1; y >= 0; y--) {
    if (!BOARD[y][x]) {
      return y;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  let circle = document.createElement('div');
  circle.classList.add("piece", `p${currPlayer}`);
  
  // somhow access td id, then append circle to this td
  let square = document.getElementById(`${y}-${x}`);
  square.append(circle);

}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  BOARD[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (BOARD[0].every(ele => ele)) {
    return endGame('Tie game!')
  }
  

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  (currPlayer === 1) ? currPlayer = 2 : currPlayer = 1;
}



function checkForWin() {

  /** _win:
   * takes input array of 4 cell coordinates [ [y, x], [y, x], [y, x], [y, x] ]
   * returns true if all are legal coordinates for a cell & all cells match
   * currPlayer
   */
  function _win(cells) {
Í
    // TODO: Check four cells to see if they're all legal & all color of current
    // player
    // if given cell coordinates are all same value (1 or 2 from BOARD) return true

    for ( let cell of cells) {
      // console.log(`cell 0 is ${cell[0]}\ncell 1 is ${cell[1]}`)
      // BOARD[cell[0]][cell[1]]
      let y = cell[0];
      let x = cell[1];
      if (y < 0 || y >= HEIGHT || x < 0 || x >= WIDTH || BOARD[y][x] !== currPlayer) {
          return false;  
      }
    }
    return true;  
    }

  // using HEIGHT and WIDTH, generate "check list" of coordinates
  // for 4 cells (starting here) for each of the different
  // ways to win: horizontal, vertical, diagonalDownRight, diagonalDownLeft
  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      // TODO: assign values to the below variables for each of the ways to win
      // horizontal has been assigned for you
      // each should be an array of 4 cell coordinates:
      // [ [y, x], [y, x], [y, x], [y, x] ]

      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDL = [[y, x], [y - 1, x - 1], [y - 2, x - 2], [y - 3, x - 3]];
      let diagDR = [[y, x], [y - 1, x + 1], [y - 2, x +2], [y - 3, x + 3]];

      // find winner (only checking each win-possibility as needed)
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
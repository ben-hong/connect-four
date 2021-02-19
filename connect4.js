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
const BOARD = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  // for loop going through height
    // another for loop going through width
      // populate inner array with null
    // push inner array into board
  for (let i = 0; i < HEIGHT; i++) {
    let rows = [];
    for (let j = 0; j < WIDTH; j++) {
      rows.push(null);
    }
    BOARD.push(rows);
  } 
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  let htmlBoard = document.querySelector('#board');

  // TODO: add comment for this code
  // generate top row that user will select move on
  // adds id to element, adds event to same element
  let top = document.createElement("tr");
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
  for (let i = HEIGHT-1; i >= 0; i--) {
    if (BOARD[i][x] === null) {
      return i;
    }
  }
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  let circle = document.createElement('div');
  circle.classList.add("piece", `p${currPlayer}`);
  // somhow access td id, then append circle to this td
  let square = document.getElementById(`${y}-${x}`);
  square.append(circle);

  BOARD[y][x] = currPlayer;
  // cant get y axis point
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
  var y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  
  // loop board with every method, 
  // if every element is not equal to null return true, game is a tie
  // make a tie function? 
  if (isTie()) {
    return endGame('Tie game!')
  }
  

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  (currPlayer === 1) ? currPlayer = 2 : currPlayer = 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {

  /** _win:
   * takes input array of 4 cell coordinates [ [y, x], [y, x], [y, x], [y, x] ]
   * returns true if all are legal coordinates for a cell & all cells match
   * currPlayer
   */
  function _win(cells) {

    // TODO: Check four cells to see if they're all legal & all color of current
    // player

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
      let vert;
      let diagDL;
      let diagDR;

      // find winner (only checking each win-possibility as needed)
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

function isTie(){
  for (let i =0; i < HEIGHT; i++) {
    for (let j = 0; j < WIDTH; j++) {
      if (BOARD[i][j] === null){
        return false;
    }
  }
}
return true
}

makeBoard();
makeHtmlBoard();
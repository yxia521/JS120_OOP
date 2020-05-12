let readline = require('readline-sync');

class Square {
  static UNUSED_SQUARE = " ";
  static HUMAN_MARKER = "X";
  static COMPUTER_MARKER = "O";

  constructor(marker = Square.UNUSED_SQUARE) {
    this.marker = marker;
  }

  toString() {  // override the default toString method with customization
    return this.marker;
  }

  setMarker(marker) {
    this.marker = marker;
  }

  isUnused() {
    return this.marker === Square.UNUSED_SQUARE;
  }

  getMarker() {
    return this.marker;
  }
}

// -----------------------------------
class Board {
  constructor() {
    this.initialize();
  }

  initialize() {
    this.squares = {};
    for (let counter = 1; counter <= 9; ++counter) {
      this.squares[counter] = new Square();
    }
  }

  displayWithClear() {
    console.clear();
    this.display();
  }

  display() {
    console.log("");
    console.log("     |     |");
    console.log(`  ${this.squares["1"]}  |  ${this.squares["2"]}  |  ${this.squares["3"]}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares["4"]}  |  ${this.squares["5"]}  |  ${this.squares["6"]}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares["7"]}  |  ${this.squares["8"]}  |  ${this.squares["9"]}`);
    console.log("     |     |");
    console.log("");
  }

  markSquareAt(key, marker) {
    this.squares[key].setMarker(marker);
  }

  unusedSquares() {
    let keys = Object.keys(this.squares);
    return keys.filter(key => this.squares[key].isUnused());
  }

  isUnusedSquare(key) {
    return this.squares[key].isUnused();
  }

  isFull() {
    return this.unusedSquares().length === 0;
  }

  countMarkerFor(player, keys) {
    let marker = keys.filter(key => {
      return this.squares[key].getMarker() === player.marker;
    });

    return marker.length;
  }
}

// -----------------------------------
class Player {
  constructor(marker) {
    this.marker = marker;
  }

  getMarker() {
    return this.marker;
  }
}

// -----------------------------------
class Human extends Player {
  constructor() {
    super(Square.HUMAN_MARKER);
  }
}

// -----------------------------------
class Computer extends Player {
  constructor() {
    super(Square.COMPUTER_MARKER);
  }
}

// -----------------------------------
class TTTGame {
  static POSSIBLE_WINNING_ROWS = [
    [ "1", "2", "3" ],
    [ "4", "5", "6" ],
    [ "7", "8", "9" ],
    [ "1", "4", "7" ],
    [ "2", "5", "8" ],
    [ "3", "6", "9" ],
    [ "1", "5", "9" ],
    [ "3", "5", "7" ],
  ];

  static joinOr(array, delimiter = ', ', conjunction = 'or') {
    if (array.length < 3) return array.join(conjunction);
    return `${array.slice(0, array.length - 1).join(delimiter)} ${conjunction} ${array.slice(-1)}`;
  }

  constructor() {
    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();
  }

  playOneGame() {
    this.board.initialize();
    this.board.display();
    while (true) {
      this.humanMoves();
      if (this.gameOver()) break;

      if (this.atRiskSquares()) this.computerDefense(); // seperate regular and defensive move, don't have to change computerMoves
      this.computerMoves();
      if (this.gameOver()) break;

      this.board.displayWithClear();
    }

    this.board.displayWithClear();
    this.displayResult();
  }

  play() {
    this.displayWelcomeMessage();

    while (true) {
      this.playOneGame();
      if (!this.playAgain()) break;
    }

    this.displayGoodbyeMessage();
  }

  displayWelcomeMessage() {
    console.clear();
    console.log("Welcome to Tic Tac Toe!");
    console.log("");
  }

  displayGoodbyeMessage() {
    console.log("Thanks for playing Tic Tac Toe! Bye!");
  }

  displayResult() {
    if (this.isWinner(this.human)) {
      console.log("Congrats! You won!");
    } else if (this.isWinner(this.computer)) {
      console.log("I won! I won! Take that, human!");
    } else {
      console.log("A tie game. How boring.");
    }
  }
  // determines whether a specified player won the game
  isWinner(player) {
    return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
      return this.board.countMarkerFor(player, row) === 3;
    });
  }

  humanMoves() {
    let choice; // human choose

    while (true) {
      let validChoice = this.board.unusedSquares();
      choice = readline.question(`Choose a square from (${TTTGame.joinOr(validChoice)}): `);
      if (validChoice.includes(choice)) break;

      console.log("Sorry, invalid choice.");
      console.log("");
    }

    // mark the selected square with human's marker
    this.board.markSquareAt(choice, this.human.getMarker());
  }

  computerMoves() {
    let validChoice = this.board.unusedSquares();
    let choice;

    do {
      choice = Math.floor((Math.random() * 9) + 1).toString();
    } while (!validChoice.includes(choice));

    this.board.markSquareAt(choice, this.computer.getMarker());
  }

  atRiskSquares() {
    let riskyRows = TTTGame.POSSIBLE_WINNING_ROWS.filter(row => {
      return this.board.countMarkerFor(this.human, row) === 2;
    });

    return riskyRows.length;
  }

  computerDefense() {
    // first filter out these risky rows: human marks 2 already
    // then iterate thru risky rows, let computer mark the last unused of each risky row
    let riskyRows = TTTGame.POSSIBLE_WINNING_ROWS.filter(row => {
      return this.board.countMarkerFor(this.human, row) === 2;
    });

    let lastUnusedSquare;
    riskyRows.forEach(row => {
      let index = row.findIndex(key => this.board.isUnusedSquare(key));
      if (index >= 0) lastUnusedSquare = row[index];
    });

    this.board.markSquareAt(lastUnusedSquare, this.computer.getMarker());
  }

  someoneWon() {
    return this.isWinner(this.human) || this.isWinner(this.computer);
  }

  gameOver() {
    return this.board.isFull() || this.someoneWon();
  }

  playAgain() {
    console.log('Would you like to play this game again (y for YES, n for NO)?');
    let answer;
    while (true) {
      answer = (readline.question()).toLowerCase();
      if (['y', 'n'].includes(answer)) break;
      console.log('Sorry, invalid choice. Enter y or n:');
    }

    console.clear();
    return answer === 'y';
  }
}

// -----------------------------------
let game = new TTTGame();
game.play();

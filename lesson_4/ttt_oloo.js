// rewrite OO TTT with constructors and prototypes

let readline = require('readline-sync');

let Square = {
  UNUSED_SQUARE:   " ",
  HUMAN_MARKER:    "X",
  COMPUTER_MARKER: "O",

  init(marker = Square.UNUSED_SQUARE) {
    this.marker = marker;
    return this;
  },

  toString() {
    return this.marker;
  },

  setMarker(marker) {
    this.marker = marker;
  },

  isUnused() {
    return this.marker === Square.UNUSED_SQUARE;
  },

  getMarker() {
    return this.marker;
  },
};

// ----------------------------
let Board = {
  init() {
    this.squares = {};
    for (let counter = 1; counter <= 9; ++counter) { // D.R.Y.
      this.squares[counter] = Object.create(Square).init();
    }

    return this;
  },

  displayWithClear() {
    console.clear();
    console.log("");
    this.display();
  },

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
  },

  markSquareAt(key, marker) {
    this.squares[key].setMarker(marker);
  },

  unusedSquares() {
    let keys = Object.keys(this.squares);
    return keys.filter(key => this.squares[key].isUnused());
  },

  isFull() {
    return this.unusedSquares().length === 0;
  },

  countMarkerFor(player, keys) {
    let markers = keys.filter(key => {
      return this.squares[key].getMarker() === player.marker;
    });

    return markers.length;
  },
};

// ----------------------------
const Player = {
  initialize(marker) {
    this.marker = marker;
    return this;
  },

  getMarker() {
    return this.marker;
  },
};

// ----------------------------
let Human = Object.create(Player);
Human.init = function() {
  return this.initialize(Square.HUMAN_MARKER);
};

// ----------------------------
let Computer = Object.create(Player);
Computer.init = function() {
  return this.initialize(Square.COMPUTER_MARKER);
};

// ----------------------------
let TTTGame = {
  POSSIBLE_WINNING_ROWS: [
    [ "1", "2", "3" ],
    [ "4", "5", "6" ],
    [ "7", "8", "9" ],
    [ "1", "4", "7" ],
    [ "2", "5", "8" ],
    [ "3", "6", "9" ],
    [ "1", "5", "9" ],
    [ "3", "5", "7" ],
  ],

  init() {
    this.board = Object.create(Board).init();
    this.human = Object.create(Human).init();
    this.computer = Object.create(Computer).init();
    return this;
  },

  play() {
    this.displayWelcomeMessage();

    this.board.display();
    while (true) {
      this.humanMoves();
      if (this.gameOver()) break;

      this.computerMoves();
      if (this.gameOver()) break;

      this.board.displayWithClear();
    }

    this.board.displayWithClear();
    this.displayResult();
    this.displayGoodbyeMessage();
  },

  displayWelcomeMessage() {
    console.clear();
    console.log("Welcome to Tic Tac Toe!");
    console.log("");
  },

  displayGoodbyeMessage() {
    console.log("Thanks for playing Tic Tac Toe! Bye!");
  },

  displayResult() {
    if (this.isWinner(this.human)) {
      console.log("Congrats! You won!");
    } else if (this.isWinner(this.computer)) {
      console.log("I won! I won! Take that, human!");
    } else {
      console.log("A tie game. How boring.");
    }
  },

  isWinner(player) {
    return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
      return this.board.countMarkerFor(player, row) === 3;
    });
  },

  humanMoves() {
    let choice; // human choose

    while (true) {
      let validChoice = this.board.unusedSquares();
      choice = readline.question(`Choose a square from (${validChoice.join(', ')}): `);
      if (validChoice.includes(choice)) break;

      console.log("Sorry, invalid choice.");
      console.log("");
    }

    // mark the selected square with human's marker
    this.board.markSquareAt(choice, this.human.getMarker());
  },

  computerMoves() {
    let validChoice = this.board.unusedSquares();
    let choice;

    do {
      choice = Math.floor((Math.random() * 9) + 1).toString();
    } while (!validChoice.includes(choice));

    this.board.markSquareAt(choice, this.computer.getMarker());
  },

  someoneWon() {
    return this.isWinner(this.human) || this.isWinner(this.computer);
  },

  gameOver() {
    return this.board.isFull() || this.someoneWon();
  },
};

// ----------------------------
let game = Object.create(TTTGame).init();
game.play();

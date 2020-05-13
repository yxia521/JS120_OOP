let readline = require('readline-sync');

class Square {
  static UNUSED_SQUARE =   " ";
  static HUMAN_MARKER =    "X";
  static COMPUTER_MARKER = "O";

  constructor(marker = Square.UNUSED_SQUARE) {
    this.marker = marker;
  }

  getMarker() {
    return this.marker;
  }

  setMarker(marker) {
    this.marker = marker;
  }

  toString() {
    return this.marker;
  }

  isUnused() {
    return this.marker === Square.UNUSED_SQUARE;
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

  isFull() {
    return this.unusedSquares().length === 0;
  }

  isUnusedSquare(key) {
    return this.squares[key].isUnused();
  }

  unusedSquares() {
    let keys = Object.keys(this.squares);
    return keys.filter(key => this.squares[key].isUnused());
  }

  countMarkerFor(player, keys) {
    let marker = keys.filter(key => {
      return this.squares[key].getMarker() === player.marker;
    });

    return marker.length;
  }

  markSquareAt(key, marker) {
    this.squares[key].setMarker(marker);
  }
}

// -----------------------------------
class Player {
  constructor(marker) {
    this.marker = marker;
    this.score = 0;
  }

  getMarker() {
    return this.marker;
  }

  getScore() {
    return this.score;
  }

  incrementScore() {
    this.score += 1;
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
  static CENTER_KEY = "5";
  static GRAND_WINNING_GOAL = 3;
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

  constructor() {
    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();
    this.firstPlayer = this.human;
  }

  play() {
    this.displayWelcomeMessage();
    this.playMatch();
    this.displayGoodbyeMessage();
  }

  playMatch() {
     while (true) {
      this.playOneGame();
      if (this.isGrandWinner()) break;
      if (!this.playNextRound()) break;
      this.firstPlayer = this.togglePlayer(this.firstPlayer);
    }

    if (this.isGrandWinner()) this.displayGrandWinner();
  }

  playOneGame() {
    let currentPlayer = this.goFirst();

    this.board.initialize();
    this.board.display();

    while (true) {
      this.playerMoves(currentPlayer);
      if (this.gameOver()) break;

      this.board.displayWithClear();
      currentPlayer = this.togglePlayer(currentPlayer);
    }

    this.board.displayWithClear();
    this.displayResult();
    this.displayScore();
  }

  playNextRound() {
    console.log("");
    console.log('Would you like to play next round? (y for YES, n for NO)');
    return this.validAnswer();
  }

  validAnswer() {
    let answer;
    while (true) {
      answer = (readline.question()).toLowerCase();
      if (['y', 'n'].includes(answer)) break;
      console.log('Sorry, invalid choice. Enter y or n:');
    }

    console.clear();
    return answer === 'y';
  }

  displayWelcomeMessage() {
    console.clear();
    console.log("Welcome to Tic Tac Toe!");
    console.log(`First player to reach ${TTTGame.GRAND_WINNING_GOAL} wins is the grand winner!`);
    console.log("");
  }

  displayGoodbyeMessage() {
    console.log("Thanks for playing Tic Tac Toe! See you next time!");
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

  displayGrandWinner() {
    if (this.human.getScore() === TTTGame.GRAND_WINNING_GOAL) {
      console.log("");
      console.log("Wooo! You're the grand winner!");
      console.log("");
    } else {
      console.log("");
      console.log("Oops...The computer is the grand winner!");
      console.log("");
    }
  }

  isGrandWinner() {
    return this.human.getScore() === TTTGame.GRAND_WINNING_GOAL || this.computer.getScore() === TTTGame.GRAND_WINNING_GOAL;
  }

  displayScore() {
    this.updateScore();
    console.log("------ Score -------");
    console.log(`You: ${this.human.getScore()} | Computer: ${this.computer.getScore()}`);
    console.log("--------------------");
  }

  updateScore() {
    if (this.isWinner(this.human)) {
      this.human.incrementScore();
    } else if (this.isWinner(this.computer)) {
      this.computer.incrementScore();
    }
  }

  togglePlayer(player) {
    return player === this.human ? this.computer : this.human;
  }

  playerMoves(currentPlayer) {
    if (currentPlayer === this.human) {
      this.humanMoves();
    } else {
      this.computerAIMoves();
    }
  }

  humanMoves() {
    let choice;

    while (true) {
      let validChoice = this.board.unusedSquares();
      choice = readline.question(`Now choose a square from (${TTTGame.joinOr(validChoice)}): `);
      if (validChoice.includes(choice)) break;

      console.log("Sorry, invalid choice.");
      console.log("");
    }

    // mark the selected square with human's marker
    this.board.markSquareAt(choice, this.human.getMarker());
  }

  computerAIMoves() {
    if (this.potentialWin()) {
      this.computerOffense();
    } else if (this.atRiskSquares()) {
      this.computerDefense();
    } else if (this.centerSquareIsAvailable()) {
      this.pickCenterSquare();
    } else {
     this.computerRandomMoves();
    }
  }

  computerRandomMoves() {
    let validChoice = this.board.unusedSquares();
    let choice;

    do {
      choice = Math.floor((Math.random() * 9) + 1).toString();
    } while (!validChoice.includes(choice));

    this.board.markSquareAt(choice, this.computer.getMarker());
  }

  computerDefense() {
    let squareToMark = this.findLastSquareToBeMarked(this.human, this.computer);
    this.board.markSquareAt(squareToMark, this.computer.getMarker());
  }

  computerOffense() {
    let squareToMark = this.findLastSquareToBeMarked(this.computer, this.human);
    this.board.markSquareAt(squareToMark, this.computer.getMarker());
  }

  critialRowsCondition(player1, player2, singleRow) {
    let forBrevity = [
      this.board.countMarkerFor(player1, singleRow) === 2,
      this.board.countMarkerFor(player2, singleRow) === 0
    ];

    return forBrevity[0] && forBrevity[1];
  }

  whetherCritialSquare(player1, player2) {
    let crucialRows = TTTGame.POSSIBLE_WINNING_ROWS.filter(row => {
      return this.critialRowsCondition(player1, player2, row);
    });

    return crucialRows.length;
  }

  atRiskSquares() {
    return this.whetherCritialSquare(this.human, this.computer);
  }

  potentialWin() {
    return this.whetherCritialSquare(this.computer, this.human);
  }

  findLastSquareToBeMarked(player1, player2) {
    let crucialRows = TTTGame.POSSIBLE_WINNING_ROWS.filter(row => {
      return this.critialRowsCondition(player1, player2, row);
    });

    let lastSquareToBeMarked;
    crucialRows.forEach(row => {
      let index = row.findIndex(key => this.board.isUnusedSquare(key));
      if (index !== -1) lastSquareToBeMarked = row[index];
    });

    return lastSquareToBeMarked;
  }

  centerSquareIsAvailable() {
    return this.board.isUnusedSquare(TTTGame.CENTER_KEY);
  }

  pickCenterSquare() {
    this.board.markSquareAt(TTTGame.CENTER_KEY, this.computer.getMarker());
  }

  gameOver() {
    return this.board.isFull() || this.someoneWon();
  }

  goFirst() {
    console.log('Would you like to choose first? (y for YES, n for NO)');
    return this.validAnswer() ? this.human : this.computer;
  }

  someoneWon() {
    return this.isWinner(this.human) || this.isWinner(this.computer);
  }

  // determines whether a specified player won the game
  isWinner(player) {
    return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
      return this.board.countMarkerFor(player, row) === 3;
    });
  }

  static joinOr(array, delimiter = ', ', conjunction = 'or') {
    if (array.length < 3) return array.join(conjunction);
    return `${array.slice(0, array.length - 1).join(delimiter)} ${conjunction} ${array.slice(-1)}`;
  }
}

// -----------------------------------
let game = new TTTGame();
game.play();

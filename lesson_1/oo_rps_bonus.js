// OO Rock Paper Scissors Bonus Features

const readline = require('readline-sync');
const MAX_POINT = 5;

let clearScreen = () => console.clear();

const RPSGame = {
  human: createHuman(),
  computer: createComputer(),
  score: createScore(),
  currentWinner: null,
  history: createHistory(),

  displayWelcomeMessage() {
    clearScreen();
    console.log('Welcome to Rock, Paper, Scissors!');
  },

  displayRules() {
    console.log('Whoever reaches 5 points first is the grand winner.');
    console.log('---------------------------------------------------');
    this.enterToChoose();
  },

  displayGoodbyeMessage() {
    console.log('Thanks for playing Rock, Paper, Scissors. Goodbye!');
  },

  enterToChoose() {
    console.log('Please hit ENTER to choose.');
    readline.question();
    clearScreen();
  },

  displayWinner() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;

    console.log(`You chose: ${this.human.move}`);
    console.log(`The computer chose: ${this.computer.move}`);

    if ((humanMove === 'rock' && computerMove === 'scissors') ||
       (humanMove === 'paper' && computerMove === 'rock') ||
       (humanMove === 'scissors' && computerMove === 'paper')) {
      console.log('You win!');
      this.currentWinner = 'human'; // could be improved
    } else if ((humanMove === 'scissors' && computerMove === 'rock') ||
              (humanMove === 'rock' && computerMove === 'paper') ||
              (humanMove === 'paper' && computerMove === 'scissors')) {
      console.log('Computer wins!');
      this.currentWinner = 'computer';
    } else {
      console.log("It's a tie!");
      this.currentWinner = 'tie';
    }
  },

  displayGrandWinner() {
    if (this.score.currentScore.human === MAX_POINT) {
      console.log("Congrats! You're the grand winner!");
    } else if (this.score.currentScore.computer === MAX_POINT) {
      console.log('Oops...The computer is the grand winner!');
    }
  },
  // could be shorter
  displayHistory() {
    clearScreen();
    console.log("Below is a snapshot of history choices:");
    console.log();

    this.history.allRecords.forEach(subarr => {
      if (subarr[3] === 'human') {
        console.log(`Round ${subarr[2]}: You chose ${subarr[0]}, the computer chose ${subarr[1]}. You won!`);
      } else if (subarr[3] === 'computer') {
        console.log(`Round ${subarr[2]}: You chose ${subarr[0]}, the computer chose ${subarr[1]}. The computer won!`);
      } else {
        console.log(`Round ${subarr[2]}: You both chose ${subarr[0]}. It's a tie!`);
      }
    });
    console.log();
  },

  playAgain() {
    console.log('Would you like to play this game again? (Y for yes/ N for no)');
    return this.validAnswer();
  },

  askUserToDisplayHistory() {
    console.log('Would you like to check a history of your choices? (Y for yes/ N for no)');
    return this.validAnswer();
  },

  validAnswer() {
    let answer;
    while (true) {
      answer = readline.question();
      if (['y', 'n'].includes(answer.toLowerCase()[0])) break;
      console.log('Sorry, invalid choice. Enter Y or N.');
    }

    return answer.toLowerCase()[0] === 'y';
  },

  playAllRounds() {
    while (true) {
      clearScreen();
      this.human.choose();
      this.computer.choose();
      this.displayWinner();
      this.score.updateScore(this.currentWinner);
      this.score.displayScore();
      this.history.addCurrentRound(this.human.move, this.computer.move, this.currentWinner);
      if (this.gameOver()) break;
      this.enterToChoose();
    }
  },

  gameOver() {
    return this.score.currentScore.computer === MAX_POINT || this.score.currentScore.human === MAX_POINT;
  },

  play() {
    this.displayWelcomeMessage();
    this.displayRules();
    while (true) {
      this.score = createScore();
      this.playAllRounds();
      this.displayGrandWinner();
      if (this.askUserToDisplayHistory()) this.displayHistory();
      if (!this.playAgain()) break;
    }

    this.displayGoodbyeMessage();
  },
};

function createPlayer() {
  return {
    move: null,
  };
}

function createComputer() {
  let playerObject = createPlayer();

  let computerObject = {
    choose() {
      const choices = ['rock', 'paper', 'scissors'];
      let randomIndex = Math.floor(Math.random() * choices.length);
      this.move = choices[randomIndex];
    },
  };

  return Object.assign(playerObject, computerObject);
}

function createHuman() {
  let playerObject = createPlayer();

  let humanObject = {
    choose() {
      let choice;

      while (true) {
        console.log('Please choose rock, paper, or scissors:');
        choice = readline.question();
        if (['rock', 'paper', 'scissors'].includes(choice)) break;
        console.log('Sorry, invalid choice.');
      }

      clearScreen();
      this.move = choice;
    },
  };

  return Object.assign(playerObject, humanObject);
}

function createScore() {
  return {
    currentScore: {human: 0, computer: 0},

    updateScore(winner) {
      if (winner !== 'tie') this.currentScore[winner] += 1;
    },

    displayScore() {
      console.log('');
      console.log('------- Score ------');
      console.log(`You: ${this.currentScore.human} | Computer: ${this.currentScore.computer}`);
      console.log('--------------------');
    },
  };
}

function createHistory() {
  return {
    allRecords: [],
    round: 1,

    addCurrentRound(humanMove, computerMove, winner) {
      this.allRecords.push([humanMove, computerMove, this.round, winner]);
      this.round += 1;
    },
  };
}

RPSGame.play();

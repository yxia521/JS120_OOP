/*

noun: game, player, computer, participant, turn, card, suit, rank, deck, points, score
verb: start, deal, hit, stay, bust, win, lose, tie, hide, reveal

organize relationship:
- game
  - start

- deck
  - deal ?

- card
- participant
  - player
    - hit
    - stay
    - bust (state)
    - score (state)
  - dealer
    - hit
    - stay
    - bust (state)
    - deal ?
    - score (state)

*/
const readline = require('readline-sync');
const shuffle = require('shuffle-array');

class Card {
  static SUITS = ['♥', '♦', '♠', '♣'];
  static RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;
    this.hidden = false;
  }

  toString() {
    if (this.isHidden()) return '?';
    return `${this.getRank()} of ${this.getSuit()}`;
  }

  getRank() {
    return this.rank;
  }

  getSuit() {
    return this.suit;
  }

  isAce() {
    return this.getRank() === 'A';
  }

  isKing() {
    return this.getRank() === 'K';
  }

  isQueen() {
    return this.getRank() === 'Q';
  }

  isJack() {
    return this.getRank() === 'J';
  }

  isFaceCard() {
    return this.isKing() || this.isQueen() || this.isJack();
  }

  hide() {
    this.hidden = true;
  }

  reveal() {
    this.hidden = false;
  }

  isHidden() {
    return this.hidden;
  }
}

class Deck {
  constructor() {
    this.cards = []; // all 52 cards
    Card.SUITS.forEach(suit => {
      Card.RANKS.forEach(rank => {
        this.cards.push(new Card(suit, rank));
      });
    });

    this.shuffleCards();
  }

  shuffleCards() {
    shuffle(this.cards);
  }

  dealCardFaceUp() { // avoid duplicate, get the last card, while at the same time remove it
    return this.cards.pop();
  }

  dealCardFaceDown() {
    let card = this.dealCardFaceUp();
    card.hide();
    return card;
  }
}
// mix-in
let Hand = {
  addToHand(newCard) {
    this.cards.push(newCard);
  },

  resetHand() {
    this.cards = [];
  },

  showHand(caption) {
    console.log(caption);
    console.log("");

    this.cards.forEach(card => console.log(`  ${card}`));
    console.log("");
  },

  getCards() {
    return this.cards;
  },

  revealAllCards() {
    this.cards.forEach(card => card.reveal());
  },

  numberOfCards() {
    return this.cards.length;
  },
};

class Human {
  static INITIAL_PURSE = 5;
  static WINNING_PURSE = 10;
  static BANKRUPT_PURSE = 0;

  constructor() {
    this.money = Human.INITIAL_PURSE;
    this.resetHand();
  }

  winBet() {
    this.money += 1;
  }

  loseBet() {
    this.money -= 1;
  }

  isBankrupt() {
    return this.money <= Human.BANKRUPT_PURSE;
  }

  isRich() {
    return this.money >= Human.WINNING_PURSE;
  }

  showPurse() {
    console.log("$----------------$");
    console.log(`  Your purse: $${this.money}`);
    console.log("$----------------$");
  }
}

class Dealer {
  constructor() {
    this.resetHand();
  }
}
// add methods of mix-in to the Human and Dealer classes
Object.assign(Human.prototype, Hand);
Object.assign(Dealer.prototype, Hand);

class TwentyOneGame {
  static WINNING_POINT = 21;
  static HIT = 'h';
  static STAY = 's';
  static DEALER_MUST_STAY_SCORE = 17;

  constructor() {
    this.dealer = new Dealer();
    this.human = new Human();
    this.deck = new Deck();
  }

  start() {
    this.displayWelcomeMessage();

    while (true) {
      this.playOneGame();
      if (this.human.isBankrupt() || this.human.isRich()) break;
      if (!this.playAgain()) break;
    }

    if (this.human.isBankrupt()) {
      console.log("You're bankrupt!");
    } else if (this.human.isRich()) {
      console.log("You're rich!");
    }

    this.displayGoodbyeMessage();
  }

  playOneGame() {
    this.dealCards();
    this.showCards();
    this.human.showPurse();
    this.humanTurn();

    if (!this.isBusted(this.human)) {
      this.dealerTurn();
    }

    console.clear();
    this.showCards();
    this.displayResults();

    this.updatePurse();
    this.human.showPurse();
  }

  playAgain() {
    let answer;

    while (true) {
      answer = readline.question('Play again? (y for YES, n for NO) ').toLowerCase();
      if (['y', 'n'].includes(answer)) break;
      console.log('Sorry, invalid choice.');
      console.log("");
    }

    console.clear();
    return answer === 'y';
  }

  hit(hand) {
    hand.addToHand(this.deck.dealCardFaceUp());
    if (this.isBusted(hand)) return;

    console.clear();
    this.showCards();
  }


  humanTurn() {
    while (this.hitOrStay() === TwentyOneGame.HIT) {
      this.hit(this.human);
      if (this.isBusted(this.human)) break;
    }
  }

  dealerContinue() {
    readline.question("Hit ENTER to continue...");
  }

  dealerTurn() {
    this.dealer.revealAllCards();

    console.clear();
    this.showCards();

    while (true) {
      let score = this.computeScoreFor(this.dealer);
      if (score >= TwentyOneGame.DEALER_MUST_STAY_SCORE) break;
      this.dealerContinue();
      this.hit(this.dealer);
    }
  }

  dealInitTwoCards() {
    this.human.addToHand(this.deck.dealCardFaceUp());
    this.dealer.addToHand(this.deck.dealCardFaceUp());
    this.human.addToHand(this.deck.dealCardFaceUp());
    this.dealer.addToHand(this.deck.dealCardFaceDown());
  }

  dealCards() {
    this.human.resetHand();
    this.dealer.resetHand();
    this.dealInitTwoCards();
  }

  showCards() {
    this.dealer.showHand("----- Dealer has: ----- ");
    this.showScoreFor(this.dealer);

    this.human.showHand('------ You have: ------ ');
    this.showScoreFor(this.human);
  }

  whoWon() {
    if (this.isBusted(this.human)) {
      return this.dealer;
    } else if (this.isBusted(this.dealer)) {
      return this.human;
    } else {
      let humanScore = this.computeScoreFor(this.human);
      let dealerScore = this.computeScoreFor(this.dealer);

      if (humanScore > dealerScore) {
        return this.human;
      } else if (humanScore < dealerScore) {
        return this.dealer;
      } else {
        return null; // tie
      }
    }
  }

  displayResults() {
    if (this.isBusted(this.human)) {
      console.log("You busted! Dealer wins.");
    } else if (this.isBusted(this.dealer)) {
      console.log("Dealer busted! You win!");
    } else {
      let humanScore = this.computeScoreFor(this.human);
      let dealerScore = this.computeScoreFor(this.dealer);

      if (humanScore > dealerScore) {
        console.log('You win!');
      } else if (humanScore < dealerScore) {
        console.log('Dealer wins.');
      } else {
        console.log("It's tie.");
      }
    }

    console.log("");
  }

  hitOrStay() {
    let answer;

    while (true) {
      answer = readline.question("Hit or Stay? (h for HIT, s for STAY) ").toLowerCase();
      if ([TwentyOneGame.HIT, TwentyOneGame.STAY].includes(answer)) break;
      console.log('Sorry, invalid choice.');
      console.log("");
    }

    return answer;
  }

  computeScoreFor(hand) {
    let cards = hand.getCards();
    let score = cards.reduce((sum, card) => sum + this.valueOf(card), 0);

    cards.filter(card => card.isAce() && !card.isHidden())
         .forEach(() => {
          if (score > TwentyOneGame.WINNING_POINT) {
            score -= 10;
          }
         });

    return score;
  }

  isBusted(hand) {
    return this.computeScoreFor(hand) > TwentyOneGame.WINNING_POINT;
  }

  updatePurse() {
    switch (this.whoWon()) {
      case this.human:
        this.human.winBet();
        break;
      case this.dealer:
        this.human.loseBet();
        break;
      default:
        break;
    }
  }

  valueOf(card) {
    if (card.isHidden()) {
      return 0;
    } else if (card.isAce()) {
      return 11;
    } else if (card.isFaceCard()) {
      return 10;
    } else {
      return parseInt(card.getRank(), 10);
    }
  }

  showScoreFor(hand) {
    console.log(` Total points: ${this.computeScoreFor(hand)}`);
    console.log("");
  }

  displayWelcomeMessage() {
    console.clear();
    console.log("Welcome to Twenty-One!");
    console.log("");
    console.log(`- Player reaches the closet to ${TwentyOneGame.WINNING_POINT} points wins the game.`);
    console.log('- Game over if you go over.');
    console.log("");
  }

  displayGoodbyeMessage() {
    console.log("Thanks for playing Twenty-One! Bye!");
  }
}

let game = new TwentyOneGame();
game.start();

var express = require('express'),
    responses = express.Router();

function Card(rank, suit) {
  this.rank = rank;
  this.suit = suit;
  this.cardString = cardString;

}

function cardString() {
  var rank,
      suit;
  switch(this.rank) {
    case 1:
      rank = "Ace";
      break;
    case 2:
      rank = "Two";
      break;
    case 3:
      rank = "Three";
      break;
    case 4:
      rank = "Four";
      break;
    case 5:
      rank = "Five";
      break;
    case 6:
      rank = "Six";
      break;
    case 7:
      rank = "Seven";
      break;
    case 8:
      rank = "Eight";
      break;
    case 9:
      rank = "Nine";
      break;
    case 10:
      rank = "Ten";
      break;
    case 11:
      rank = "Jack";
      break;
    case 12:
      rank = "Queen";
      break;
    case 13:
      rank = "King";
      break;
    default:
      rank = null;
      break;
  }

  switch (this.suit) {
    case 1:
      suit = "Hearts";
      break;
    case 2:
      suit = "Diamonds";
      break;
    case 3:
      suit = "Clubs";
      break;
    case 4:
      suit = "Spades";
      break;
    default:
      suit = null;
      break;
  }
  return rank + " " + suit;
}

// Routes
// ========================
responses.get('/', function(req, res, next) {
  var card = new Card( , );
  res.send(card.cardString());
})


module.exports = responses;

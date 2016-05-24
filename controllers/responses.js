// Require Dependencies
// ========================
var express   = require('express'),
    responses = express.Router(),
    Promise   = require('bluebird');
    http      = require('http'),
    DBSchema  = require('../model/schema');

// Setup a Bluebird Promise loop to ensure the HTTP.GET is complete
// ========================
var promiseWhile = function(condition, action) {
  return new Promise(function(resolve, reject) {
    var loop = function() {
      if (!condition()) return resolve();
      return Promise.cast(action())
        .then(loop)
        .catch(function(e) {
          reject(e);
        });
    };
    process.nextTick(loop);
  });
};

// Setup Card Selection for Each Card in a Deck
// ========================
var cardChoices = {
  1:"Ace of Hearts",
  2:"Two of Hearts",
  3:"Three of Hearts",
  4:"Four of Hearts",
  5:"Five of Hearts",
  6:"Six of Hearts",
  7:"Seven of Hearts",
  8:"Eight of Hearts",
  9:"Nine of Hearts",
  10:"Ten of Hearts",
  11:"Jack of Hearts",
  12:"Queen of Hearts",
  13:"King of Hearts",
  14:"Ace of Diamonds",
  15:"Two of Diamonds",
  16:"Three of Diamonds",
  17:"Four of Diamonds",
  18:"Five of Diamonds",
  19:"Six of Diamonds",
  20:"Seven of Diamonds",
  21:"Eight of Diamonds",
  22:"Nine of Diamonds",
  23:"Ten of Diamonds",
  24:"Jack of Diamonds",
  25:"Queen of Diamonds",
  26:"King of Diamonds",
  27:"Ace of Clubs",
  28:"Two of Clubs",
  29:"Three of Clubs",
  30:"Four of Clubs",
  31:"Five of Clubs",
  32:"Six of Clubs",
  33:"Seven of Clubs",
  34:"Eight of Clubs",
  35:"Nine of Clubs",
  36:"Ten of Clubs",
  37:"Jack of Clubs",
  38:"Queen of Clubs",
  39:"King of Clubs",
  40:"Ace of Spades",
  41:"Two of Spades",
  42:"Three of Spades",
  43:"Four of Spades",
  44:"Five of Spades",
  45:"Six of Spades",
  46:"Seven of Spades",
  47:"Eight of Spades",
  48:"Nine of Spades",
  49:"Ten of Spades",
  50:"Jack of Spades",
  51:"Queen of Spades",
  52:"King of Spades",
}

// Setup Function to Determine Cards in Array
// ========================
function isInArray(value, array) {
  return array.indexOf(value) > -1;
}

// Routes
// ========================

// Get Route to setup Shuffled Deck
// ------------------------
responses.get('/', function(req, res, next) {

  var shuffledArray = [];
  var finalArray = [];
  var deck = 52;
  var url = 'http://applicant.pointsource.us/api/random/573f5d0b7e3d61136595a182?min=1&max=52&num=1'

promiseWhile(function() {
    return shuffledArray.length < deck;
  }, function() {
    return new Promise(function(resolve, reject) {
      var request = http.get(url, function(response) {
        var card;
        var body = '';
        response.on('data', function(chunk) {
          body += chunk;
        });
        response.on('end', function() {
          var parsed = JSON.parse(body);
          card = parsed.numbers[0];
          if (isInArray(card, shuffledArray) === false) {
            shuffledArray.push(card);
          }
          resolve(card);
        });
      });
    });
  }).then(function(){
    shuffledArray.forEach(function(x) {
      finalArray.push(cardChoices[x]);
    });
    var storeInfo = {
      finalDeck: finalArray,
      length: finalArray.length
    }
    var myDeck = new DBSchema.Deck(storeInfo)
    myDeck.save(function(err) {
      if (err) {
        return console.log(err);
      } else {
        res.json(storeInfo)
      }
    });
  });
});


// Get All Created Decks from MongoDB
// ------------------------
responses.get('/getdecks/', function(req, res, next) {
  DBSchema.Deck.find({}, function(err, deck) {
    res.json(deck);
  });
});

// Get Deck by using ID assigned by MongoDB
// ------------------------
responses.get('/:id', function(req, res, next) {
  var id = req.params.id;
  DBSchema.Deck.find({_id: id}, function(err, deck) {
    res.json(deck);
  });
});


module.exports = responses;

var mongoose = require('mongoose');
// deckSchema

var deckSchema = new mongoose.Schema({
  length: Number,
  finalDeck: [],
});

var Deck = mongoose.model('Deck', deckSchema);

module.exports = {
  Deck: Deck
};

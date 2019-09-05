const ALPHABET = require('./data/alphabet');
var dashbot = require('./lib/dashbot-lib');
var console = require('console');

module.exports.function = function natoAlphabet ($vivContext) {
  dashbot.logIncoming("show alphabet", "show.alphabet", $vivContext);
  dashbot.logOutgoing("*Sent Full NATO Alphabet*", "show.alphabet", $vivContext, ALPHABET);
  var result = ALPHABET;
  return result;
}
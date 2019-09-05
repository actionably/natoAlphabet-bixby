// NatoSpell
// NatoSpell Spells the word using the NATO Alphabet

// Main entry point
var http = require('http')
var console = require('console')
var config = require('config')
var secret = require('secret')
var dashbot = require('./lib/dashbot-lib');

module.exports.function = function natoSpell(textToSpell, $vivContext) {

  // dashbot integration 
  dashbot.logIncoming(textToSpell, "SpellWord", $vivContext);

  // convert textToSpell to NATO
  var natoSpelling = 'NATO'
  var natoUrl = "https://subdued-rook.glitch.me/nato-spell/?word=" + encodeURI(textToSpell)
  var natoResponse = http.getUrl(natoUrl)
  var natoJSON = JSON.parse(natoResponse)
  console.log('natoResponse: ', natoJSON)
  natoSpelling = natoJSON.phonetic.codewords
  
  // dashbot outgoing message integration
  dashbot.logOutgoing(natoSpelling, "NatoSpell", $vivContext, natoJSON);

  // NatoSpellResult
  return {
    textToSpell: textToSpell,
    natoSpelling: natoSpelling
  }
}
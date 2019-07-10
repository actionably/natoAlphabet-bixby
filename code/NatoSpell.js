// NatoSpell
// NatoSpell Spells the word using the NATO Alphabet

// Main entry point
var http = require('http')
var console = require('console')
var config = require('config')
var secret = require('secret')

module.exports.function = function natoSpell(textToSpell, $vivContext) {

  // dashbot integration
  var dashbotApiKey = secret.get('dashbotApiKey')
  var dashbotIncomingUrl = config.get('dashbotIncomingUrl') + dashbotApiKey
  var dashbotIncomingJson = {
    userId: $vivContext.userId ? $vivContext.userId : 'no-id',
    text: textToSpell,
    intent: {
      name: "SpellWord"
    },
    platformUserJson: $vivContext
  }
  console.log('dashbotIncomingJson', dashbotIncomingJson)
  var options = {
    passAsJson: true, 
    returnHeaders: true,
    headers: { "Content-Type": "application/json"},
    format: 'json'
  }
  var response = http.postUrl(dashbotIncomingUrl, dashbotIncomingJson, options);

  // convert textToSpell to NATO
  var natoSpelling = 'NATO'
  var natoUrl = "https://subdued-rook.glitch.me/nato-spell/?word=" + encodeURI(textToSpell)
  var natoResponse = http.getUrl(natoUrl)
  var natoJSON = JSON.parse(natoResponse)
  console.log('natoResponse: ', natoJSON)
  natoSpelling = natoJSON.phonetic.codewords
  
  // dashbot integration
  var dashbotOutgoingUrl = config.get('dashbotOutgoingUrl') + dashbotApiKey;
  var dashbotOutgoingJson = {
    userId: $vivContext.userId ? $vivContext.userId : 'no-id',
    text: natoSpelling,
    intent: {
      name: "NatoSpell"
    },
    platformUserJson: $vivContext
  }
  console.log('dashbotOutgoingUrl' + dashbotOutgoingUrl)
  var response = http.postUrl(dashbotOutgoingUrl, dashbotOutgoingJson, options);


  // NatoSpellResult
  return {
    textToSpell: textToSpell,
    natoSpelling: natoSpelling
  }
}
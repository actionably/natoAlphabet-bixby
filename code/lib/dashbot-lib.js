var http = require('http');
var console = require('console');
var config = require('config');
var secret = require('secret');
const dashbotApiKey = secret.get('dashbotApiKey');
var options = {
  passAsJson: true, 
  returnHeaders: true,
  headers: { "Content-Type": "application/json"},
  format: 'json'
}

module.exports = {  
  "logIncoming": function(text, intent, $vivContext, platformJson) {

    // dashbot integration
    var dashbotIncomingUrl = config.get('dashbotIncomingUrl') + dashbotApiKey;
    var dashbotIncomingJson = {
      userId: $vivContext.userId ? $vivContext.userId : 'no-id',
      text: text,
      intent: {
        name: intent
      },
      platformUserJson: $vivContext,
      platformJson: platformJson
    }
    // console.log('dashbotIncomingJson', dashbotIncomingJson);
    var response = http.postUrl(dashbotIncomingUrl, dashbotIncomingJson, options);
  },

  "logOutgoing": function(text, intent, $vivContext, platformJson) {
    // dashbot integration
    var dashbotOutgoingUrl = config.get('dashbotOutgoingUrl') + dashbotApiKey;
    var dashbotOutgoingJson = {
      userId: $vivContext.userId ? $vivContext.userId : 'no-id',
      text: text,
      intent: {
        name: intent
      },
      platformUserJson: $vivContext,
      platformJson: platformJson
    }
    // console.log('dashbotOutgoingUrl' + dashbotOutgoingUrl);
    var response = http.postUrl(dashbotOutgoingUrl, dashbotOutgoingJson, options);
  }
}
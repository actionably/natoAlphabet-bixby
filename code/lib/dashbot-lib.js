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
    var dashbotIncomingUrl = 'https://tracker.dashbot.io/track?platform=universal&v=10.1.1-rest&type=incoming&apiKey=' + dashbotApiKey;
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
    var dashbotOutgoingUrl = 'https://tracker.dashbot.io/track?platform=universal&v=10.1.1-rest&type=outgoing&apiKey=' + dashbotApiKey;
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
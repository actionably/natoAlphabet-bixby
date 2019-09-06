var http = require('http');
var console = require('console');
var config = require('config');
var secret = require('secret');
const dashbotApiKey = secret.get('dashbotApiKey');
var baseDashbotUrl = "https://tracker.dashbot.io/track?platform=universal&v=10.1.1-rest";
var options = {
  passAsJson: true, 
  returnHeaders: true,
  headers: { "Content-Type": "application/json"},
  format: 'json'
}

module.exports = {  
  "logIncoming": function(
      text, // string: required. this should be what the user says, but since we don't have the actual utterance...
      intent, // string: the name of your intent. optional, but very helpful
      $vivContext, // vivContext will be stored in the user object at Dashbot
      platformJson // object. optional, you can pass anything you want here that you find useful to see in dashbot
    ) {

    var dashbotIncomingUrl = baseDashbotUrl + '&type=incoming&apiKey=' + dashbotApiKey;
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

  "logOutgoing": function(
    text, // string: required. this should be a text version of what your capsule responds with
    intent, // string: the name of the outbound intent, useful for rolling up reporting when the text is different
    $vivContext, // vivContext will be stored in the user object at Dashbot
    platformJson // object. optional. Useful to pass the action response here.
    ) {

    var dashbotOutgoingUrl = baseDashbotUrl + '&type=outgoing&apiKey=' + dashbotApiKey;
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
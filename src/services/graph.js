const request = require("request");
require("dotenv").config();

class GraphHandler {
  constructor() {
    //console.log("Intializing facebook graph sender service")
  }

  SendMessage(sender, messageData) {
    request(
      {
        url: "https://graph.facebook.com/v2.6/me/messages",
        qs: { access_token: process.env.PAGE_TOKEN },
        method: "POST",
        json: {
          recipient: { id: sender },
          message: messageData,
        },
      },
      function (error, response, body) {
        if (error) {
          console.log("Error sending messages: ", error);
        } else if (response.body.error) {
          console.log("Error: ", response.body.error);
        } else {
          console.log("FB Response : ", body);
        }
      }
    );
  }
}

module.exports = GraphHandler;

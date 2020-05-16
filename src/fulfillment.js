// Put dependencies here
const GraphHandler = require("./services/graph");
const templateMaker = require("./template");

module.exports = async function (witResponse, sender) {
  // Add additional parsing here
  const graphHandler = new GraphHandler();

  console.log("WitAI Response to work with : ", witResponse);
  let intentName = witResponse.intents[0].name;
  if (intentName == "WelcomeIntent") {
    console.log("Welcome Intent Triggered!");

    //Do fulfullment

    //Make response message, and decide template to send via
    return new Promise((resolve, reject) => {
    //   graphHandler.SendMessage(
    //     sender,
    //     templateMaker.TextTemplate("Pourab, it works!")
    //   );

        graphHandler.SendMessage(
            sender,
            templateMaker.QuickRepliesTemplate()
        );
            
      resolve("success");
    });
  }
};

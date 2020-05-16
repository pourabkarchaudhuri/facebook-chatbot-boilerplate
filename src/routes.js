const routes = require("express").Router();
const request = require("request");

const WitHandler = require("./services/witAi");
const FulfilmentHandler = require("./fulfillment.js");

require("dotenv").config();

//Health Check
routes.get("/health", (req, res) => {
  res.status(200).json({ message: "Connected!" });
});

// For facebook verification
routes.get("/webhook", function (req, res) {
  console.log("Getting Verification");
  if (req.query["hub.verify_token"] === "wolfpack") {
    res.status(200).send(req.query["hub.challenge"]);
  } else {
    res.status(403).send("Error, wrong token");
  }
});

// For Computational Linguistics
routes.post("/webhook", async function (req, res) {
  let messaging_events = req.body.entry[0].messaging;

  // console.log("MESSAGE EVENTS" + JSON.stringify(messaging_events))

  let event = req.body.entry[0].messaging[0];
  let sender = event.sender.id;

  // console.log("EVENT" + JSON.stringify(event))

  var text = "";

  if (event.postback) {
    //This is the bound button payload from messenger card button pressed
    text = JSON.stringify(event.payload);
  }
  if (event.message && event.message.text) {
    //This is the user typed text from messenger
    text = event.message.text;
  }

  //Pass to Wit.AI to fetch results
  var witResponse = await WitHandler(text);

  //Now to do stuff based on Intent, and create a response string.
  //Write logic here, and then pass on formatted message based on template
  var intentFulfillment = await FulfilmentHandler(witResponse, sender);
  console.log(intentFulfillment);

  // graphHandler.SendMessage(sender, templateMaker.GenericTemplate())

  res.sendStatus(200);
});

module.exports = routes;

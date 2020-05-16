const request = require("request");
require("dotenv").config();

module.exports = async function (message) {
  var options = {
    method: "GET",
    url: "https://api.wit.ai/message",
    qs: { v: "20200516", q: message },
    headers: {
      "postman-token": "cdf3f2b9-69b1-7bc6-6e13-c3220474dc06",
      "cache-control": "no-cache",
      authorization: "Bearer Y32FBTTHLB35YPY6P5K4ZEASNM3NJN5Q",
    },
  };

  return new Promise((resolve, reject) => {
    request(options, function (error, response, body) {
      if (error) {
        console.log("Wit service error: ", error);
        reject(new Error("Wit service failure"));
      }
      resolve(JSON.parse(body));
    });
  });
};

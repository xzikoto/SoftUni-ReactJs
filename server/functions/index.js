const server = require("./server");

const { onRequest } = require("firebase-functions/v2/https");
const { setGlobalOption } = require("firebase-functions/v2");
const logger = require("firebase-functions/logger");

// setGlobalOption({
//   region: "europe-west1",
// });

exports.api = onRequest((req, res) => {
  server.emit("request", req, res);
});

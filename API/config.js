const express = require("express");
const cors = require("cors");
const expressWs = require("express-ws");

const app = express();
app.use(cors());
expressWs(app);

module.exports = app;

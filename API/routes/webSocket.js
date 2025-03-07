const express = require("express");
const router = express.Router();
require("express-ws")(router);

router.ws("/", (ws, req) => {
  
});

module.exports = router;

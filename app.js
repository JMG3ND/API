const express = require("express");
const cors = require("cors");
const dataRoutes = require("./routes/data");
const collectRoutes = require("./routes/collect");

const app = express();
app.use(cors());

app.use("/data", dataRoutes);
app.use("/collect", collectRoutes);

// Se utiliza para comprobar que el servidor esté encendido
app.get("/", async (req, res) => {
  res.status(200).send("Server On");
});

module.exports = app;



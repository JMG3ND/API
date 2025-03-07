const app = require("./config");
const dataRoutes = require("./routes/data");
const collectRoutes = require("./routes/collect");
const WebSocket = require("./routes/webSocket");

app.use("/data", dataRoutes);
app.use("/collect", collectRoutes);

// Ruta WebSocket
app.use("/ws", WebSocket);

// Se utiliza para comprobar que el servidor esté encendido
app.get("/", async (req, res) => {
  res.status(200).send("Server On");
});

module.exports = app;

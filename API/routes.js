const app = require("./config");
const dataRoutes = require("./routes/data");
const collectRoutes = require("./routes/collect");

app.use("/data", dataRoutes);
app.use("/collect", collectRoutes);

// Se utiliza para comprobar que el servidor esté encendido
app.get("/", async (req, res) => {
  res.status(200).send("Server On");
});

module.exports = app;

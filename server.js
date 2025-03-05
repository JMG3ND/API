const express = require("express");
const { DBFFile } = require("dbffile");
const cors = require("cors");

const app = express();
const port = 3000;
app.use(cors());

app.get("/data/:serial", async (req, res) => {
  const serial = req.params.serial;
  try {
    const dbf = await DBFFile.open("C:/Simbat/ALL2025.DBF");
    const rows = await dbf.readRecords();
    const carton = rows.find((val) => val.CARTON == serial);
    res.json(carton);
  } catch (error) {
    console.error("Error leyendo el archivo DBF:", error);
    res.status(500).send("Error leyendo el archivo DBF");
  }
});

app.get("/collect", async (req, res) => {
  try {
    // Leemos los datos de la tabla colect
    const dbf = await DBFFile.open("C:/Simbat/collect.DBF");
    const rows = await dbf.readRecords();

    const response = {
      count: rows.length,
      products: rows.map((v) => v.CARTON),
    };
    // Extraemos algunos datos de la tabla colect
    res.status(200).json(response);
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
});

// Se utiliza para comprobar que el servidor esté encendido
app.get("/", async (req, res) => {
  res.status(200).send("Server On");
});

app.listen(port, () => {
  console.log(`
    API escuchando en http://localhost:${port}
    
    No cerrar esta ventana ya que se encarga de exponer los datos del
    simba producción para los sistemas que están en desarrollo por José.

    Favor de minimizar.
  `);
});

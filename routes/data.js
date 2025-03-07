const express = require("express");
const router = express.Router();
const { DBFFile } = require("dbffile");

router.get("/:serial", async (req, res) => {
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

module.exports = router;

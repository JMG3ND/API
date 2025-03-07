const express = require("express");
const router = express.Router();
const { DBFFile } = require("dbffile");

router.get("/", async (req, res) => {
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

module.exports = router;

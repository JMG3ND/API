const express = require("express");
const router = express.Router();
const { DBFFile } = require("dbffile");

router.get("/", async (req, res) => {
  try {
    // Recibimos los seriales mediante el body, un array de seriales
    const serials = req.query.serials.split(",");
    console.log(serials.join("|"));
    if (!Array.isArray(serials))
      throw new Error("No se recibió un array de seriales");
    if (!serials.every((s) => /^\d{7}$/g.test(s)))
      throw new Error("Uno más seriales enviados en el array no son válidos");

    // Creamos una expresión regular para filtrar los datos
    const serialsRegExp = new RegExp(serials.join("|"), "g");

    const ALL2025 = await DBFFile.open("C:/Simbat/ALL2026.DBF");
    const depth = await DBFFile.open("C:/Simbat/depth.DBF");

    // Leemos los archivos de las tablas
    const ALL2025rows = await ALL2025.readRecords();
    const depthrows = await depth.readRecords();

    const filterALL2025rows = ALL2025rows.filter((row) => {
      serialsRegExp.lastIndex = 0;
      return serialsRegExp.test(row.CARTON);
    });

    const filterdepthrows = depthrows.filter((row) => {
      serialsRegExp.lastIndex = 0;
      return serialsRegExp.test(row.YEARCARTON);
    });

    const newDepth = filterdepthrows.map((row) => {
      const [YEAR] = row.YEARCARTON.split(serialsRegExp);
      const [CARTON] = row.YEARCARTON.match(serialsRegExp);
      delete row.YEARCARTON;
      return {
        YEAR: YEAR,
        CARTON: CARTON,
        ...row,
      };
    });

    res.json({
      stock: filterALL2025rows,
      depth: newDepth,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

module.exports = router;

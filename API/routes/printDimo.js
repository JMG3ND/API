const express = require("express");
const router = express.Router();
const printHTML = require("../../functions/printHTML")

router.get("/", async (req, res) => {
  try {
    await printHTML()
    res.status(200).send("Impresión exitosa")
  } catch (error) {
    res.status(500).send("Error en la impresión")
  }
});

module.exports = router;

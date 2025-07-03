const express = require("express");
const router = express.Router();
const { findProcess, killProcess } = require("../../functions/checkProcess");

const svrProcess = "SvrProcessor.exe";

router.get("/", async (req, res) => {
  try {
    if (await findProcess(svrProcess)) await killProcess(svrProcess);
    res.status(200).send("Estación Reiniciada");
  } catch (error) {
    res.status(500).send("Error al reiniciar la estación");
  }
});

module.exports = router;

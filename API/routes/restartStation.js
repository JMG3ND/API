const express = require("express");
const router = express.Router();
const {
  findProcess,
  killProcess,
  startProcess,
} = require("../../functions/checkProcess");

const simbaProcess = "Simbat.exe";
const simbaPath = "C:\\Proyecto web\\API\\simbat.bat";
const svrProcess = "SvrProcessor.exe";
const svrPath = "C:\\Simbat\\Comm\\SvrProcessor.exe";

router.get("/", async (req, res) => {
  try {
    if (await findProcess(simbaProcess)) {
      await killProcess(simbaProcess);

      if (await findProcess(svrProcess)) await killProcess(svrProcess);
    }
    await startProcess(simbaPath, simbaProcess);
    res.status(200).send("Estación Reiniciada");
  } catch (error) {
    res.status(500).send("Error al reiniciar la estación");
  }
});

module.exports = router;

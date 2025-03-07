const express = require("express");
const router = express.Router();
require("express-ws")(router);
const chokidar = require("chokidar");
const readCollect = require("../../functions/readCollect");

// Ruta absoluta al archivo
const filePath = "C:/Simbat/collect.DBF";

// Crear un único watcher para el archivo
const watcher = chokidar.watch(filePath, {
  persistent: true, // Mantener el proceso activo
  ignoreInitial: true, // Ignorar el evento inicial al iniciar el watcher
});

router.ws("/", async (ws, req) => {
  console.log("Cliente WebSocket conectado");
  // Escuchar eventos del watcher y enviar mensajes al cliente
  const sendMessage = (message) => {
    if (ws.readyState === ws.OPEN) {
      ws.send(JSON.stringify(message));
    }
  };

  const onChange = async (path) => {
    console.log(`Archivo ${path} ha sido modificado.`);
    sendMessage(await readCollect(filePath));
  };

  // Agregar listeners al watcher
  watcher.on("change", onChange);

  // Escuchar el cierre de la conexión WebSocket
  ws.on("close", () => {
    console.log("Cliente WebSocket desconectado");
    // Remover listeners específicos de este WebSocket
    watcher.off("change", onChange);
  });
});

module.exports = router;

const chokidar = require("chokidar");

// Ruta del archivo que quieres monitorear
const filePath = "./observar.txt";

// Crear un watcher para el archivo
const watcher = chokidar.watch(filePath, {
  persistent: true, // Mantener el proceso activo
  ignoreInitial: true, // Ignorar el evento inicial al iniciar el watcher
});

// Escuchar eventos
watcher
  .on("add", (path) => {
    console.log(`Archivo ${path} ha sido añadido.`);
  })
  .on("change", (path) => {
    console.log(`Archivo ${path} ha sido modificado.`);
  })
  .on("unlink", (path) => {
    console.log(`Archivo ${path} ha sido eliminado.`);
  })
  .on("error", (error) => {
    console.error(`Error: ${error}`);
  });

console.log(`Escuchando cambios en ${filePath}...`);

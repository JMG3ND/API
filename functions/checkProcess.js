const { exec } = require("child_process");

const findProcess = (processName) =>
  new Promise((resolve) => {
    exec(
      `tasklist /FI "IMAGENAME eq ${processName}"`,
      (error, stdout, stderr) => {
        if (error) {
          return resolve(false);
        }

        // Si el output contiene el nombre del proceso, está corriendo
        resolve(stdout.toLowerCase().includes(processName.toLowerCase()));
      }
    );
  });

const killProcess = (processName) =>
  new Promise((resolve, rejects) => {
    exec(`taskkill /f /im ${processName}`, (error, stdout, stderr) => {
      if (error) {
        rejects(`Error al cerrar ${processName}: ${error.message}`);
        return;
      }
      if (stderr) {
        rejects(`Stderr: ${stderr}`);
        return;
      }
      setTimeout(() => {
        resolve(`${processName} cerrado correctamente: ${stdout}`);
      }, 3000);
    });
  });

const startProcess = (pathProcess, processName) => {
  return new Promise((resolve, reject) => {
    // Usamos 'start' para aplicaciones GUI y agregamos timeout
    const command =
      process.platform === "win32"
        ? `start "" "${pathProcess}"`
        : `"${pathProcess}"`;

    const child = exec(command, { windowsHide: true }, (error) => {
      if (error) {
        return reject(`Error al abrir ${processName}: ${error.message}`);
      }
    });

    // Forzar resolución después de un tiempo razonable
    const timeout = setTimeout(() => {
      resolve(`${processName} iniciado (verificación asíncrona)`);
    }, 2000);

    // Opcional: manejar cierre inesperado
    child.on("exit", (code) => {
      clearTimeout(timeout);
      if (code === 0) {
        resolve(`${processName} iniciado y cerró la terminal`);
      } else {
        reject(`${processName} falló con código ${code}`);
      }
    });
  });
};

module.exports = { findProcess, killProcess, startProcess };

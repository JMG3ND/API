const { DBFFile } = require("dbffile");

async function readCollect(path) {
  try {
    // Leemos los datos de la tabla colect
    const dbf = await DBFFile.open(path);
    const rows = await dbf.readRecords();

    // Extraemos algunos datos de la tabla colect
    return rows.length;
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = readCollect;

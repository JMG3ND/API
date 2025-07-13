const { DBFFile } = require("dbffile");

async function readDdepth(path, serials = ["5005221", "5005380"]) {
  try {
    // Leemos los datos de la tabla colect
    const dbf = await DBFFile.open(path);
    const rows = await dbf.readRecords();

    const regSerials = new RegExp(serials.join("|"), "g");

    const filter = rows.filter((row) => regSerials.test(row.YEARCARTON));

    const transform = filter.map((row) => ({
      SERIAL: row.YEARCARTON.match(regSerials),
      FIELD: row.FIELD,
      DATA: row.DATA,
      WEIGHT: row.WEIGHT,
    }));
    console.log(transform);

    // Extraemos algunos datos de la tabla colect
    return rows.length;
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = readDdepth;

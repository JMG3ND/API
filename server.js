const appListen = require("./content/appListen");
const app = require("./API/routes");
require("dotenv").config()

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(appListen(port)));

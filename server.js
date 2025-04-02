const appListen = require("./content/appListen");
const app = require("./API/routes");

const port = 3005;
app.listen(port, () => console.log(appListen(port)));

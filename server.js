const appListen = require("./content/appListen");
const app = require("./app");

const port = 3001;
app.listen(port, () => console.log(appListen(port)));

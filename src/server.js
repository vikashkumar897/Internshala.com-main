const app = require("./index");
const connect = require("./configs/db");

app.listen(5004, async () => {
  try {
    connect();
    console.log("listening on port 5004");
  } catch (e) {
    console.log(e.message);
  }
});

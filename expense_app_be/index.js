const express = require("express");
const cors = require("cors");
const configureDb = require("./configure/database");
const router = require("./configure/roters");
const app = express();
app.use("/uploads", express.static("uploads"));

const port = 3015;
app.use(cors());
configureDb();

app.use(express.json());
app.use("/", router);

app.listen(port, () => {
  console.log("port is connected in port number", port);
});

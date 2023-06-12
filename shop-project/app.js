//important------> import packages
const express = require("express");

const adminRouter = require("./routes/admin");
//important-----> Initialize application
const app = express();

//important-----> middlewares
app.use("/admin", adminRouter);
//important-----> Listen to the server
const start = () => {
  app.listen(5000, () => {
    console.log("Server is listening at port 5000");
  });
};

//important-----> Start server
start();

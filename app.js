const express = require("express");

const creatError = require("http-errors");

const app = express();
app.use(express.json());

// intializing database

require("./init.DB")();

const productRoute = require("./Routes/product.route");
app.use("/products", productRoute);

// 404  handler ans pass to error handler
app.use((req, res, next) => {
  //   const err = new Error("not found");
  //   err.status = 404;
  //   next(err);
  next(creatError(404, "notfound"));
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status,
      message: err.message,
    },
  });
});
app.listen(3000, () => {
  console.log(" app is listing on port 3000");
});

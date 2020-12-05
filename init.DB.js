const mongoose = require("mongoose");

module.exports = () => {
  mongoose
    .connect("mongodb://localhost:27017/Rest_Api", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log("mongodb connected");
    })
    .catch((err) => {
      console.log(err.message);
    });

  mongoose.connection.on("connected", () => {
    console.log("mongoose connected to the data base");
  });

  mongoose.connection.on("error", (err) => {
    console.log(err.message);
  });
  mongoose.connection.on("disconnected", () => {
    console.log("mongoose connection disconnected");
  });

  process.on("SIGINT", () => {
    mongoose.connection.close(() => {
      console.log("mongoose connection disconnected due to app termination");
      process.exit(0);
    });
  });
};

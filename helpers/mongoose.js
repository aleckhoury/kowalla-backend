const mongoose = require("mongoose");

module.exports = {
  async mongooseConnect() {
    // setup mongodb connection
    const uri =
      process.env.NODE_ENV === "production"
        ? process.env.MONGO_URI_PRD
        : process.env.MONGO_URI_SND;
    const connection = await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    mongoose.connection
      .once("open", () => {
        console.log("mongoose connection is good to go");
      })
      .on("error", error => {
        console.log("this is the warning to the warning!");
        console.warn("Warning", error);
      });

    return connection;
  }
};

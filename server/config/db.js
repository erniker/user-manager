const mongoose = require("mongoose");
require("dotenv").config({ path: "var.env" });

const dbConect = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log(`DB conected`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = dbConect;

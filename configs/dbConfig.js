const mongoose = require("mongoose");

const uri =
  process.env.NODE_ENV === "development"
    ? process.env.DATABASE_LOCAL
    : process.env.DATABASE_PRODUCTION;

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(uri, connectionParams)
  .then(() => {
    console.log("Database connected successfully");
  })

  .catch((error) => {
    console.log("Error connecting database connection", error);
  });

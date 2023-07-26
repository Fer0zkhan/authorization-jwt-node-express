require("dotenv").config();
require("./configs/dbConfig");

const express = require("express");
const app = express();
const cors = require("cors");
const createError = require("http-errors");

app.use(cors("*"));
app.use(express.json());
app.use("/assets", express.static(__dirname + "/assets"));

app.use("/api/auth", require("./routes/authRoutes/auth"));
app.use("/api/book", require("./routes/bookRoutes/bookRoutes"));

app.use(function (err, req, res, next) {
  res.status(err.status || 500).send({
    status: err.status,
    message: err.message,
    data: {},
  });
});

app.all("*", (req, res, next) => {
  next(createError(404, `can't find ${req.originalUrl} on this server`));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));

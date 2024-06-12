require("module-alias/register");
const express = require("express");
const routes = require("@/routes");
const app = express();
const mongoose = require("mongoose");
const { config } = require("dotenv");
const cors = require("cors");

config();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded());

api.use("/", (req, res) => {
  res.send("Hello");
});
app.use("/api", routes);

app.use((req, res, next) => {
  return next({
    message: "URL not found....",
    status: 404,
  });
});

app.use((err, req, res, next) => {
  res.status(err.status || 400);
  res.send({
    message: err.message || "Problem while processing request",
    errors: err.errors,
  });
});

app.listen(process.env.API_PORT, async () => {
  console.log(`Server running at http://localhost:${process.env.API_PORT}`);
  console.log("Press Ctrl+C to stop server...");

  await mongoose.connect(process.env.MONGO_URL);
});

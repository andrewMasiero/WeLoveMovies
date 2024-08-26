if (process.env.USER) require("dotenv").config();

const express = require("express");
const app = express();
const moviesRouter = require("./movies/movies.router");
const theatersRouter = require("./theaters/theaters.router");
const reviewsRouter = require("./reviews/reviews.router");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.use("/movies", moviesRouter);
app.use("/theaters", theatersRouter);
app.use("/reviews", reviewsRouter);

app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
});

app.use((err, req, res, next) => {
  console.error(err);
  const { status = 500, message = "Something broke!" } = err;
  res.status(status).json({ error: message });
});

module.exports = app;

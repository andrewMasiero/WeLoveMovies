const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
  const { movieId } = req.params;
  const movie = await service.read(movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  return next({ status: 404, message: "Movie cannot be found." });
}

async function read(req, res, next) {
  res.json({ data: res.locals.movie });
}

async function list(req, res) {
  const is_showing = !!req.query.is_showing;
  const data = await service.list(is_showing);
  res.json({ data: data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), read],
  movieExists,
};

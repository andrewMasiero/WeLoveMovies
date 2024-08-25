const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
  console.log("theaters controller list debug");
  const movie_id = req.params.movieId ? parseInt(req.params.movieId) : null;
  const theaters = await service.list();
  const filteredTheaters = movie_id
    ? theaters
        .filter((theater) =>
          theater.movies.some((movie) => movie.movie_id === movie_id)
        )
        .map((theater) => ({
          ...theater,
          movie_id,
          movies: undefined,
        }))
    : theaters;
  res.json({
    data: filteredTheaters,
  });
}

module.exports = {
  list: asyncErrorBoundary(list),
};

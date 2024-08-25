const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const methodNotAllowed = require("../errors/methodNotAllowed");

async function reviewExists(req, res, next) {
  const { reviewId } = req.params;
  const review = await service.read(reviewId);
  if (review) {
    res.locals.review = review;
    return next();
  }
  return next({ status: 404, message: "Review cannot be found." });
}

async function destroy(req, res) {
  await service.destroy(res.locals.review.review_id);
  res.sendStatus(204);
}

// should not include critics anywhere for the path
// `/movies/:movieId/critics`
async function list(req, res) {
  const { movieId } = req.params;
  const data = await service.list(movieId);
  res.json({ data });
}

function hasMovieIdInPath(req, res, next) {
  if (req.params.movieId) {
    return next();
  }
  methodNotAllowed(req, res, next);
}

function noMovieIdInPath(req, res, next) {
  if (req.params.movieId) {
    return methodNotAllowed(req, res, next);
  }
  next();
}

async function update(req, res) {
  const updatedReview = {
    ...res.locals.review,
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };
  const data = await service.update(updatedReview);
  res.json({ data });
}

async function read(req, res) {
  const { review } = res.locals;
  res.json({ data: review });
}

module.exports = {
  destroy: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
  list: [hasMovieIdInPath, asyncErrorBoundary(list)],
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
  read: [asyncErrorBoundary(reviewExists), read],
};

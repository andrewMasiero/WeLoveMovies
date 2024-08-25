function logRequest(req, res, next) {
  console.log(`Request Method: ${req.method}, Request URL: ${req.originalUrl}`);
  next();
}

module.exports = logRequest;

// wrapper function for catching async errors
exports.catchErrors = function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
};

exports.showError = (err, req, res, next) => {
  err.stack = err.stack || '';
  const errorDetails = {
    message: err.message,
    status: err.status,
    stack: err.stack,
  };
  res.status(err.status || 500);
  res.json({
    error: errorDetails,
  });
};

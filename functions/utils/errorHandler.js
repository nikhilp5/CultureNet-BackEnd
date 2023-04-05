const errorHandler = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status);
  } else {
    res.status(500);
  }
  res.json({ success: false, message: err.message });
};

module.exports = errorHandler;

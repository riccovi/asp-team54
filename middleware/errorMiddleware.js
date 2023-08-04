// errorMiddleware.js
module.exports = (err, req, res, next) => {
    console.error(err.message); //Logs error message to console
    if (!err.statusCode) {
      err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
    }
    res.status(err.statusCode).send(err.message); // send error message to client
  };
  
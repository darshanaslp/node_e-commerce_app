// Function to handle not found errors (404)
exports.notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
  };
  
  // Function to handle errors in the development environment
  exports.devErrors = (error, req, res) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // Set the status code to 500 if it's not already set
    res.status(statusCode);
    res.json({
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : 'Hidden in production',
    });
  };
  
  // Function to handle errors in the production environment
  exports.prodErrors = (error, req, res) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // Set the status code to 500 if it's not already set
    res.status(statusCode);
    res.json({ error: 'Internal Server Error' });
  };
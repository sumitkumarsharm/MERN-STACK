export const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500;

  return res.status(status).json({
    success: false,
    statusCode: status,
    message: err.message || "Internal server error",
    errors: err.errors || null,
  });
};

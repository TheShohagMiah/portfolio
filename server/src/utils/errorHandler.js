export const errorHandler = async (err, req, res, next) => {
  const status = err.status || 400;
  const message = err.message || "Internal server error";

  return res.status(status).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack,
      error: err,
    }),
  });
};

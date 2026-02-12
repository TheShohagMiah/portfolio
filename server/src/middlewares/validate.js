// middleware/validate.js
export const validate = (schema) => (req, res, next) => {
  // safeParse returns an object instead of throwing an error
  const result = schema.safeParse(req.body);

  if (!result.success) {
    // result.error.issues is the official Zod array of errors
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors: result.error.issues.map((issue) => ({
        // Use the first item in the path array (the field name)
        field: issue.path[0],
        message: issue.message,
      })),
    });
  }

  req.body = result.data;
  next();
};

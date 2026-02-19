const { ZodError } = require("zod");

const validate = (schemas) => {
  return (req, res, next) => {
    try {
      // Validate body
      if (schemas.body) {
        req.body = schemas.body.parse(req.body);
      }

      // Validate params
      if (schemas.params) {
        req.params = schemas.params.parse(req.params);
      }

      // Validate query
      if (schemas.query) {
        req.query = schemas.query.parse(req.query);
      }

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Validation Failed",
          errors: error.issues.map((err) => ({
            field: err.path.join("."),
            message: err.message
          }))
          
        });
      }

      next(error);
    }
  };
};

module.exports = validate;

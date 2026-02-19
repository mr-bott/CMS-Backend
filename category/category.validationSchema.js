const { z } = require("zod");

const addCategorySchema = z.object({
  name: z.string("Invalid category"),
  employee_id: z.uuid("Invalid UUID format")
});

const  deletingCategorySchame = z.object({
  id: z.uuid("Invalid UUID format"),
});

module.exports = {
  addCategorySchema,
  deletingCategorySchame
};

const { z } = require("zod");

const signupSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  age: z.number().int().positive().optional(),
  phone: z.string().regex(/^[0-9]{10}$/, "Phone must be exactly 10 digits"),
});

const loginSchema = z.object({
  email: z.email("Invalid email format"),
  password: z.string().min(6),
});

const userIdSchema = z.object({
  id: z.uuid("Invalid UUID format"),
});

const paginationSchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().optional(),
});

module.exports = {
  signupSchema,
  userIdSchema,
  loginSchema,
  paginationSchema,
};

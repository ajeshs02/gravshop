import { z } from 'zod'
// user/store registration schema
export const RegistrationSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, 'Name must be at least 3 characters long')
      .regex(/^[a-zA-Z\s]+$/, 'Name must only contain letters'),
    email: z.string().email().trim(),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters long')
      .regex(
        /^(?=.*\d)[a-zA-Z\d]+$/,
        'Password must contain at least one digit'
      ),
    confirmPassword: z.string(),
    mobile: z
      .string()
      .regex(/^[0-9]{10}$/, 'Enter a valid mobile number')
      .trim(),
    description: z
      .string()
      .max(300, 'Description must be less than 300 characters')
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

// user/store login schema
export const LoginSchema = z.object({
  email: z.string().email().trim(),
  password: z
    .string()
    .min(1, 'Password is required')
    .max(12, 'enter a valid password')
    .trim(),
})

// store product schema
export const productSchema = z.object({
  name: z.string().min(1, 'Product name required'),
  category: z.string().min(3, 'Product category required'),
  brand: z.string().min(3, 'Product brand required').optional(),
  description: z.string().min(1, 'Product description required'),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Enter a valid product price'),
  discount: z
    .string()
    .regex(
      /^(100(\.0{1,2})?|[1-9]?\d(\.\d{1,2})?)$/,
      'Valid discount required (0 to 100)'
    )
    .default('0'),
  stock: z
    .string()
    .regex(
      /^[1-9]\d{0,3}$/,
      "Stock should be positive and shouldn't exceed 4 digits"
    )
    .default('1'),
})

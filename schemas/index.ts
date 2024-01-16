import * as z from 'zod'

// sign-in schema
export const AuthCredentialsValidator = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least characters long' }),
  code: z.optional(z.string()),
})

// sign-up schema
export const AuthCredentialsCreation = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least characters long' }),
  name: z.string().min(5, {
    message: 'Name is required',
  }),
})

// product schema
export const ProductSchemaValidator = z.object({
  name: z.string().min(5, {
    message: 'name is required',
  }),
  price: z.coerce.number(),
  size: z.number().min(35, 'size is required').max(50),
  description: z.string().min(10, {
    message: 'product desscritpion is required',
  }),
  categoryId: z.string().min(1, {
    message: 'Product category is required',
  }),
})

export type TAuthCredentialsValidator = z.infer<typeof AuthCredentialsValidator>
export type TAuthCredentialsCreation = z.infer<typeof AuthCredentialsCreation>
export type TProductSchemaValidator = z.infer<typeof ProductSchemaValidator>

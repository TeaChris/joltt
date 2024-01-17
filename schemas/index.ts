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
    message: 'Produuct name is required',
  }),
  price: z.coerce.number(),
  size: z.coerce.number().min(35, {
    message: 'Product size is required',
  }),
  description: z.string().min(10, {
    message: 'Product desscritpion is required',
  }),
  categoryId: z.string(),
})

export type TAuthCredentialsValidator = z.infer<typeof AuthCredentialsValidator>
export type TAuthCredentialsCreation = z.infer<typeof AuthCredentialsCreation>
export type TProductSchemaValidator = z.infer<typeof ProductSchemaValidator>

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

export type TAuthCredentialsValidator = z.infer<typeof AuthCredentialsValidator>
export type TAuthCredentialsCreation = z.infer<typeof AuthCredentialsCreation>

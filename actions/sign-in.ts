'use server'

import { AuthCredentialsValidator, TAuthCredentialsValidator } from '@/schemas'

export const signIn = async (values: TAuthCredentialsValidator) => {
  const validatedFields = AuthCredentialsValidator.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields' }
  }

  return { success: 'Email sent!' }
}

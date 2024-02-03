'use server'

import { AuthCredentialsValidator, TAuthCredentialsValidator } from '@/schemas'

import { signIn } from '@/auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { getUserByEmail } from '@/data/user'
import { AuthError } from 'next-auth'

export const logIn = async (
  values: TAuthCredentialsValidator
  // callbackUrl?: string | null
) => {
  const validatedFields = AuthCredentialsValidator.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields' }
  }

  const { email, password } = validatedFields.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: 'Email does not exist!' } // return error if user attempt to sign-in without an account
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT, //callbackUrl ||
    })

    return { success: 'Signed in successfully' }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials!' }
        default:
          return { error: 'Something went wrong!' }
      }
    }

    throw error
  }
}

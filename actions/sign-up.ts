'use server'

import * as z from 'zod'

import { AuthCredentialsCreation, TAuthCredentialsCreation } from '@/schemas'

export const signUp = async (values: TAuthCredentialsCreation) => {
  const validatedFields = AuthCredentialsCreation.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Something went wrong' }
  }

  return { success: 'Sign in' }
}

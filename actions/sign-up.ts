'use server'

import * as z from 'zod'
import bcrypt from 'bcryptjs'

import { AuthCredentialsCreation, TAuthCredentialsCreation } from '@/schemas'
import { db } from '@/lib/db'
import { getUserByEmail } from '@/data/user'

export const signUp = async (values: TAuthCredentialsCreation) => {
  const validatedFields = AuthCredentialsCreation.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Something went wrong' }
  }

  const { email, password, name } = validatedFields.data

  // encrypt password
  const hashedPassword = await bcrypt.hash(password, 10)

  // check if email is already taken
  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    return { error: 'Email taken by another user' }
  }

  // if email is not taken, create new user
  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  })

  // TODO: CREATED VERIFICATION

  return { success: 'Account Created' }
}

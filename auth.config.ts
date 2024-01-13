import type { NextAuthConfig } from 'next-auth'

import Credentials from 'next-auth/providers/credentials'

import { AuthCredentialsValidator } from '@/schemas'
import { getUserByEmail } from '@/data/user'
import bcrypt from 'bcryptjs'

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = AuthCredentialsValidator.safeParse(credentials)

        if (validatedFields.success) {
          const { email, password } = validatedFields.data

          const user = await getUserByEmail(email) // check if email exists
          if (!user || !user.password) return null

          const passwordsMatch = await bcrypt.compare(password, user.password) // check if password match

          if (passwordsMatch) return user
        }

        return null
      },
    }),
  ],
} satisfies NextAuthConfig

import NextAuth from 'next-auth'
import Github from 'next-auth/providers/github'

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  // @ts-ignore
  providers: [Github],
})

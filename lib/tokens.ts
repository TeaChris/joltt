import crypto from 'crypto'
import { v4 as uuidv4 } from 'uuid'

import { db } from '@/lib/db'
import { getVerificationTokenByEmail } from '@/data/varification-token'

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4()
  const expires = new Date(new Date().getTime() + 3600 * 1000) //expires token in one hour

  const existingToken = await getVerificationTokenByEmail(email) //is there an existing token

  if (existingToken) {
    await db.verificationToken.delete({
      //remove existing token
      where: {
        id: existingToken.id,
      },
    })
  }

  const verificationToken = await db.verificationToken.create({
    //generate new token
    data: {
      email,
      token,
      expires,
    },
  })

  return verificationToken
}
function getPasswordResetTokenByEmail(email: string) {
  throw new Error('Function not implemented.')
}

import { encoder } from "../utils"
import { prisma } from "../lib/prisma"
import { SignUp } from "../interface"

const signUp = async (user: SignUp) => {
  const encryptedPassword = await encoder.codify(user.password)

  user.password = encryptedPassword

  const result = await prisma.user.create({ data: user })

  return result
}


export const AuthService = {
  signUp
}
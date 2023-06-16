import { prisma } from './../lib/prisma';
import { CreateToken } from "../interface"


const createToken = async (params: CreateToken) => {
  const { token, userId } = params
  const response = await prisma.sessionToken.create({
    data: {
      token,
      userId
    }
  })

  return response
}

const findValidToken = async ({ token, userId }: CreateToken) => {
  const foundedToken = await prisma.sessionToken.findFirst({
    where: {
      token: token,
      userId: userId,
      isValid: true
    }
  })
  if (!foundedToken)
    throw new Error("Faça login e tente novamente")

  return foundedToken
}


const deleteToken = async (props: CreateToken) => {
  const { id } = await findValidToken(props)

  const response = await prisma.sessionToken.delete({
    where: { id }
  })

  return !!response
}


export const SessionTokenService = {
  createToken,
  deleteToken
}
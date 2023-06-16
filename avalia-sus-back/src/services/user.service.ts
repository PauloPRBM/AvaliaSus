import { prisma } from "../lib/prisma"


const getUserByCpf = async (cpf: string) => {
  const user = await prisma.user.findFirst({
    where: { cpf }
  })
  return user
}

export const UserService = {
  getUserByCpf
}
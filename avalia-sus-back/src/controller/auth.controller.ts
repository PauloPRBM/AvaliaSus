import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { AuthService, SessionTokenService, UserService } from "../services"
import { encoder } from "../utils"



const signUp = async (request: FastifyRequest, reply: FastifyReply) => {
  const bodySchema = z.object({
    name: z.string(),
    cpf: z.string(),
    password: z.string(),
    confirmPassword: z.string(),
  })

  const { confirmPassword, ...rest } = await bodySchema.parseAsync(request.body)
    .catch(() => {
      return reply.status(400).send({ message: "Dados invalidos" })
    })

  if (rest.password !== confirmPassword)
    return reply.status(400).send({ message: "Senhas invalidas" })

  try {
    const result = await AuthService.signUp(rest)

    return reply.status(200).send(result)
  } catch (error: any) { 
    console.log(error)
    if (error.code === "P2002") {
      return reply.status(400).send({ message: "Usuario já cadastrado" })
    }
    return reply.status(500).send({ message: "Erro desconhecido" })
  }
}


const login = async (request: FastifyRequest, reply: FastifyReply, app: FastifyInstance) => {
  const bodySchema = z.object({
    cpf: z.string(),
    password: z.string(),
  })

  const { cpf, password } = await bodySchema.parseAsync(request.body)
    .catch(() => {
      return reply.status(400).send({ message: "Dados invalidos" })
    })

  const user = await UserService.getUserByCpf(cpf)

  if (!user)
    return reply.status(404).send({ message: "Usuario não encontrado" })


  const isValid = await encoder.verifyPassword(password, user.password)

  if (!isValid)
    return reply.status(404).send({ message: "Login ou senha invalido" })


  const createdToken = app.jwt.sign({ name: user.name, }, { sub: user.id, expiresIn: "10 days" })

  const { token } = await SessionTokenService.createToken({ token: createdToken, userId: user.id })

  const { password: _password, ...rest } = user

  return reply.status(200).send({ token, ...rest })
}

export const AuthController = {
  signUp,
  login
}
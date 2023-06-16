import { FastifyInstance } from "fastify";
import { AuthController } from "../controller";
import { SessionTokenService } from "../services";


export const authRoutes = async (app: FastifyInstance) => {
  app.post("/auth/sign-up", AuthController.signUp)

  app.post("/auth/login", async (request, reply) => {
    return AuthController.login(request, reply, app)
  })

  app.delete("/auth/logout", async (request, reply) => {
    await request.jwtVerify()
      .catch(() => {
        reply.status(401).send({ message: "Faça login e tente novamente" })
      })

    const { authorization } = request.headers


    if (!authorization)
      return reply.status(401).send({ message: "Não autorizado" })

    const [, token] = authorization?.split(" ")

    const { sub: userId } = request.user

    try {
      await SessionTokenService.deleteToken({ token, userId })

      return reply.status(200).send({ message: "Usuario deslogado" })
    } catch (error) {
      return reply.status(404).send({ message: "Token não encontrado" })
    }
  })
}
import { FastifyInstance } from "fastify";
import { EvaluateController } from "../controller";



export const evaluateRoutes = async (app: FastifyInstance) => {
  app.addHook("preHandler", async (request, reply) => {
    await request.jwtVerify()
      .catch(() => {
        reply.status(401).send({ message: "Faça login e tente novamente" })
      })
  })

  app.put("/evaluate", EvaluateController.updateComment)

  app.delete("/evaluate/:id", EvaluateController.deleteComment)

}
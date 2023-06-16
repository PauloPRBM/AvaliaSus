import { FastifyInstance } from "fastify";
import { HospitalController } from "../controller";


export const hospitalRoutes = async (app: FastifyInstance) => {

  app.addHook("preHandler", async (request, reply) => {
    await request.jwtVerify()
      .catch(() => {
        reply.status(401).send({ message: "Faça login e tente novamente" })
      })
  })

  app.get("/hospital", HospitalController.getAllHospitals)

  app.get("/hospital/:id", HospitalController.getHospitalById)

  app.post("/hospital/evaluate", HospitalController.evaluate)
}
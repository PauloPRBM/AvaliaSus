import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import { authRoutes } from "./router/auth";
import { hospitalRoutes } from "./router/hospital";
import { evaluateRoutes } from "./router/evaluate";

const app = fastify()

app.register(fastifyJwt, { secret: "b4d secr3T!123@@" })

app.register(authRoutes)
app.register(hospitalRoutes)
app.register(evaluateRoutes)




app.listen({
  port: 3333,
  host: "0.0.0.0"
}).then(console.log)
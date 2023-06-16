import { FastifyReply, FastifyRequest } from "fastify"
import { EvaluateService } from "../services/evaluate.service"
import { z } from "zod"



const deleteComment = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as any

  const response = await EvaluateService.deleteEvaluation(id)
  return reply.status(200).send(response)
}

const updateComment = async (request: FastifyRequest, reply: FastifyReply) => {
  const bodySchema = z.object({
    id: z.string(),
    comment: z.string(),
    rate: z.number()
  })

  const { sub: userId } = request.user

  const { rate, comment, id } = await bodySchema.parseAsync(request.body)
    .catch(() => {
      return reply.status(400).send({ message: "Dados invalidos" })
    })

  try {
    await EvaluateService.getUserEvaluation(id, userId)

    await EvaluateService.updateEvaluation(id, { userId, rate, comment })
    return reply.status(200).send()
  } catch (error: any) {
    return reply.status(400).send({ message: error.message })
  }
}


export const EvaluateController = {
  deleteComment,
  updateComment
}
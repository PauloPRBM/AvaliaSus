import { prisma } from "../lib/prisma"
import { Evaluate } from "../interface"
import { UpdateEvaluate } from "../interface/Evaluate.interface"



const deleteEvaluation = async (id: string) => {
  const response = await prisma.evaluation.delete({
    where: { id }
  })

  return !!response
}

const getUserEvaluation = async (id: string, userId: string) => {
  const result = await prisma.evaluation.findFirst({
    where: { id, userId, }
  })

  if (!result)
    throw new Error("Avaliacao não encontrada")

  return result
}

const updateEvaluation = async (id: string, params: UpdateEvaluate) => {
  const { rate, comment } = params
  const response = await prisma.evaluation.update({
    where: { id },
    data: {
      date: new Date(),
      rate: rate,
      comment: comment
    }
  })

  return response
}

export const EvaluateService = {
  deleteEvaluation,
  updateEvaluation,
  getUserEvaluation
}
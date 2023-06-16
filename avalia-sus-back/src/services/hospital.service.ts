import { Evaluate } from "../interface"
import { prisma } from "../lib/prisma"


const getAllHospitals = async () => {
  const hospitals = await prisma.hospital.findMany({
    include: {
      address: true,
      evaluations: true
    },
  })

  return hospitals
}

const getHospitalById = async (id: string) => {
  const hospital = await prisma.hospital.findFirst({
    where: { id },
    include: {
      evaluations: {
        select: {
          user: {
            select: {
              name: true
            }
          },
          id: true,
          comment: true,
          rate: true,
          hospitalId: true,
          userId: true,
          date: true,
        },
        orderBy: {
          date: "desc"
        }
      },
      address: true,
    }
  })

  return hospital
}

const evaluate = async (params: Evaluate) => {
  const { userId, hospitalId, rate, comment } = params
  const response = await prisma.evaluation.create({
    data: {
      rate,
      comment,
      hospitalId,
      userId,
    }
  })

  return response
}

export const HospitalService = {
  evaluate,
  getAllHospitals,
  getHospitalById
}
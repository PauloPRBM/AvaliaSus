import { FastifyReply, FastifyRequest } from "fastify"
import { Address } from "prisma/prisma-client"
import { z } from "zod"
import { HospitalService } from "../services"


const dividerRate = (value: number, divider: number) => {
  if (value) return Number((value / divider).toFixed(1))
  return value
}

interface Rating {
  rate: number
}

const calculateRate = (accumulator: number, { rate }: Rating) => accumulator + rate


const formatAddress = (address: Address) => {
  const { state, city, neighborhood, street, } = address
  const fullAddress = `${street}, ${neighborhood}, ${city}, ${state}`
  return fullAddress
}


const getAllHospitals = async (_request: FastifyRequest, reply: FastifyReply) => {
  const hospitals = await HospitalService.getAllHospitals()


  const mappedHospitals = hospitals.map((hospital) => {
    const { addressId, address: addressData, evaluations, ...rest } = hospital
    const address = formatAddress(addressData)

    const totalRate = evaluations.reduce(calculateRate, 0)

    const rate = dividerRate(totalRate, evaluations.length)

    return {
      ...rest,
      rate,
      address
    }
  })

  return reply.status(200).send(mappedHospitals)
}

const getHospitalById = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as any

  const hospital = await HospitalService.getHospitalById(id)

  if (!hospital)
    return reply.status(404).send({ message: "Hospital não encontrado" })

  const { evaluations, address: addressData, addressId, ...rest } = hospital

  const address = formatAddress(addressData)
  const totalRate = evaluations.reduce(calculateRate, 0)
  const rate = dividerRate(totalRate, evaluations.length)


  const comments = evaluations.map((evaluation) => {
    const { user, comment, ...rest } = evaluation
    const { name } = user
    return {
      userName: name,
      message: comment,
      ...rest
    }
  })

  const formattedHospital = {
    ...rest,
    rate,
    address,
    comments,
  }

  return reply.status(200).send(formattedHospital)

}

const evaluate = async (request: FastifyRequest, reply: FastifyReply) => {
  const bodySchema = z.object({
    hospitalId: z.string(),
    comment: z.string(),
    rate: z.number()
  })

  const { sub: userId } = request.user

  const { rate, comment, hospitalId } = await bodySchema.parseAsync(request.body)
    .catch(() => {
      return reply.status(400).send({ message: "Dados invalidos" })
    })

  const response = await HospitalService.evaluate({
    userId,
    hospitalId,
    comment,
    rate
  })

  return reply.status(200).send({ response })
}


export const HospitalController = {
  evaluate,
  getAllHospitals,
  getHospitalById
}
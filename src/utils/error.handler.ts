import { FastifyInstance } from "fastify"
import { BadRquest } from "../routes/_errors/bad-request"
import { ZodError } from "zod"

type FatifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FatifyErrorHandler  = (error, request, reply) => {
    

    if(error instanceof ZodError){
        return reply.status(400).send({
            message: 'Error durind validation',
            errors: error.flatten().fieldErrors,
        })
    }

    if (error instanceof BadRquest) {
        return reply.status(400).send({ message: error.message })
    }
    return reply.status(500).send({ message: 'Internal server error' })
}
import { FastifyInstance } from 'fastify'
import { formatZodError } from '../lib/format-zod.erros.js'
import { ClientError } from './client-error.js'

type FastifyErrorHandler = FastifyInstance["errorHandler"]

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
    const err = error as Record<string, unknown>

    if (err.code === "FST_ERR_VALIDATION") {
        return reply.status(400).send(formatZodError({ error: err as never }))
    }

    if (error instanceof ClientError) {
        return reply.status(400).send({
            message: error.message
        })
    }

    console.error(error)

    return reply.status(500).send({
        message: 'Internal Server Error'
    })
}
import { FastifyInstance } from "fastify";
import { ICreateUser } from "../interfaces/user.interface";
import { UserUseCase } from "../use-cases/user.use-case";

async function userRoutes(fastify: FastifyInstance) {
  const userUseCase = new UserUseCase()

  fastify.post<{ Body: ICreateUser }>('/', async (request, reply) => {
    try {
      const { email, fullname, password } = request.body

      const result = await userUseCase.create({ email, fullname, password })

      reply.send({ result, message: 'Usuário criado com sucesso!' })

    } catch (error) {

      reply.send(error)
    }
  })

  fastify.get('/', async (request, reply) => {
    try {
      const result = await userUseCase.findAll()

      reply.send({ result })
    } catch (error) {
      reply.send(error)
    }
  })
}

export {
  userRoutes
}
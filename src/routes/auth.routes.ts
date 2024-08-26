import { FastifyInstance } from "fastify";
import { AuthUseCase } from "../use-cases/auth-use-case";
import { IAuth } from "../interfaces/auth.interface";

async function authRoutes(fastify: FastifyInstance) {
  const authUseCase = new AuthUseCase()

  fastify.post<{ Body: IAuth }>('/', async (request, reply) => {
    try {
      const { email, password } = request.body

      const result = await authUseCase.auth({ email, password })

      reply.send({ result, message: 'Usuário autenticado com sucesso!' })
    } catch (error) {
      reply.send(error)
    }
  })
}
export {
  authRoutes
}
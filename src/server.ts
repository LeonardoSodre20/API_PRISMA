

import Fastify from 'fastify'
import { userRoutes } from './routes/user.routes'
import { authRoutes } from './routes/auth.routes'

const app = Fastify({
  logger: true
})

app.register(userRoutes, {
  prefix: '/users'
})

app.register(authRoutes, {
  prefix: '/auth'
})

app.listen({ port: 3333 }, (err) => {
  if (err) {
    return console.log(err)
  }
  return console.log('Server is running on port 3333')
})
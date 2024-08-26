import { compare } from "bcrypt";
import { IAuth } from "../interfaces/auth.interface";
import { UserRepositoryPrisma } from "../repositories/user.repository";

import jwt from 'jsonwebtoken'

class AuthUseCase {
  private readonly userRepository: UserRepositoryPrisma

  constructor() {
    this.userRepository = new UserRepositoryPrisma()
  }

  async auth(credentials: IAuth) {

    const user = await this.userRepository.findByEmail(credentials.email)

    if (user && !await compare(credentials.password, user.password)) {
      throw new Error('Invalid Credentials!')
    }

    const token = jwt.sign({}, process.env.SECRET_KEY as string, {
      algorithm: 'HS512',
      expiresIn: '1d'
    })

    return {
      user,
      token
    }

  }
}

export {
  AuthUseCase
}

import { ICreateUser, IUser, IUserRepository } from '../interfaces/user.interface'
import { prismaClient } from '../database';
import PasswordEncriptor from '../helpers/password-encryptor';

class UserRepositoryPrisma implements IUserRepository {
  async create(data: ICreateUser): Promise<IUser> {
    const result = await prismaClient.user.create({ data: { ...data, password: PasswordEncriptor(data.password) } })
    return result

  }

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await prismaClient.user.findFirst({
      where: { email }, select: {
        id: true,
        email: true,
        fullname: true,
        createdAt: true,
        updatedAt: true,
        password: true
      }
    })
    return user ?? null
  }

  async findAll() {
    const result = await prismaClient.user.findMany()
    return result
  }
}

export {
  UserRepositoryPrisma
}
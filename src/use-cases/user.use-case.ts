import PasswordEncriptor from "../helpers/password-encryptor";
import { ICreateUser, IUser } from "../interfaces/user.interface";
import { UserRepositoryPrisma } from "../repositories/user.repository";


class UserUseCase {

  private readonly userRepository: UserRepositoryPrisma

  constructor() {
    this.userRepository = new UserRepositoryPrisma()
  }

  async create(data: ICreateUser): Promise<IUser> {

    const user = await this.userRepository.findByEmail(data.email)

    if (user) {
      throw new Error('E-mail is already exist!')
    }

    const result = await this.userRepository.create(data)
    return result
  }

  async findAll(): Promise<IUser[]> {
    const result = await this.userRepository.findAll()
    return result
  }
}

export {
  UserUseCase
}
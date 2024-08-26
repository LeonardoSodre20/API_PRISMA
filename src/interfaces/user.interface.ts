
export interface ICreateUser {
  fullname: string
  email: string
  password: string
}

export interface IUser {
  id: string
  fullname: string
  password: string
  email: string
  createdAt: Date
  updatedAt: Date
}

export interface IUserRepository {
  create: (data: ICreateUser) => Promise<IUser>
  findByEmail: (email: string) => Promise<IUser | null>
  findAll: () => Promise<IUser[]>
}
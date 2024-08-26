import { genSaltSync, hashSync } from 'bcrypt'

export default function PasswordEncriptor(password: string): string {
  let hashedPassword = ''

  if (password) {
    const saltRounds = genSaltSync(15)
    hashedPassword = hashSync(password, saltRounds)
  }

  return hashedPassword
}
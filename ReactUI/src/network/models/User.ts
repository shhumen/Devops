import { IBaseEntity } from './core/IBaseEntity'

interface User extends IBaseEntity {
  username: string
  password: string
  firstname: string
  lastname: string
  email: string
}

export default User

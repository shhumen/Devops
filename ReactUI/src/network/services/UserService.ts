import User from '../models/User'
import { BaseService } from '../services/core/BaseService'

export class UserService extends BaseService<User> {
  constructor() {
    super('/auth')
  }
}

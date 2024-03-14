import Users from "../models/Users";
import { BaseService } from "./core/BaseService";

export class UserService extends BaseService<Users> {
  constructor() {
    super("/auth");
  }
}

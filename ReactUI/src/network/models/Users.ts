import { IBaseEntity } from "./core/IBaseEntity";

interface Product extends IBaseEntity {
    username: string,
    password: string,
    firstname: string,
    lastname: string,
    email: string,
}

export default Product;
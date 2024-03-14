import Users from "../../network/models/Users";


export interface UserState {
  list: Users[] | any[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  selected: Users | null;
}

export interface UserType {
  _id: string;
  key: string;
  username?: string,
  password?: string,
  firstname?: string,
  lastname?: string,
  email?: string,
  settings?: React.ReactNode;
}

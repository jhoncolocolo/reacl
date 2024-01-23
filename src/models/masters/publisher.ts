import { User } from "./user";

export interface Publisher {
  id: number;
  user_id: number;
  gender: string;
  names: string;
  last_names: string;
  baptism_date: string;
  user: User
}

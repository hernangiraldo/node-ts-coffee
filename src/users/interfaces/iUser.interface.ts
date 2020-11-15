import { eRole } from "../enums/eRole.enum";

export interface iUser {
  fullName: string,
  email: string;
  password: string;
  role: eRole;
  img?: string;
  status?: boolean;
  google?: boolean;
  active?: boolean;
}
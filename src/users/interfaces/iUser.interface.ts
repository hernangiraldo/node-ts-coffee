import { eRole } from "../enums/eRole.enum";

export interface iUser {
  fullName: string,
  email: string;
  password: string;
  img?: string;
  role?: eRole;
  status?: boolean;
  google?: boolean;
  active?: boolean;
}
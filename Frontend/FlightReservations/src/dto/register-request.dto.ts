import { UserRole } from "../enums/roles.enum";

export interface RegisterRequestDTO {
  name: string;
  username: string;
  email: string;
  password: string;
  phoneNumber?: number;
  role: UserRole; 
}
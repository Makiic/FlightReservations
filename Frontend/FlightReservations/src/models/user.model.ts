import { UserRole } from "../enums/roles.enum";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  password?: string; 
  phoneNumber: number;
  role: UserRole;
}
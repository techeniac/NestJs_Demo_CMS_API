import { AuthRoles } from './role.type';

export interface Payload {
  id: string;
  role: AuthRoles;
}

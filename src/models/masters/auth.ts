import { RolePermissionAuth } from "../general/role-permissions-auth";

export interface RequestAuth {
  email: string;
  name: string;
  role: number;
  permissions: RolePermissionAuth[];
  api_token?: string
}

import { CongregationPublisher } from "../dependents/congregation-publisher";
import { Publisher } from "./publisher";
import { RolePermissionAuth } from "../general/role-permissions-auth";

export interface RequestAuth {
  email: string;
  name: string;
  role: number;
  congregation: CongregationPublisher;
  permissions: RolePermissionAuth[];
  api_token?: string;
  publisher: Publisher,
  group_publisher: number
}

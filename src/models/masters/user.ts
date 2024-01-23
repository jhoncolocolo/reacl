import { Permission } from "./permission";

export interface User {
    id: number;
    name: string;
    email: string;
    permissions?: Permission[];
}
import GenericModel from "./generic-model";
import { ModulePermission } from "../models/dependents/module-permission";
import { Permission } from "../models/masters/permission";
import { Module } from "../models/masters/module";
const createApiInstance = <T>(endpoint: string) => new GenericModel<T>(endpoint);

export const modulePermissionApi = createApiInstance<ModulePermission>('api/module_permissions');
export const permissionApi = createApiInstance<Permission>('api/permissions');
export const moduleApi = createApiInstance<Module>('api/modules');
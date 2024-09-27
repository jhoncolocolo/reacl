import React from "react";
import { ModulePermission } from "../../../models/dependents/module-permission";
import { Permission } from "../../../models/masters/permission";
import { Module } from "../../../models/masters/module";
import { modulePermissionApi, permissionApi, moduleApi } from "../../../http/api";
import ModulePermissionsUI from "./indexUI";

const ModulePermissions : React.FC = () =>{
    const [modulePermissions, setModulePermissions] = React.useState<ModulePermission[]>([]);
    const [permissions, setPermissions] = React.useState<Permission[]>([]);
    const [modules, setModules] = React.useState<Module[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [hasFetched, setHasFetched] = React.useState<boolean>(false);

    const api = React.useMemo(() => modulePermissionApi, []);
    
    const getMainData = React.useCallback(() => {
        api.getAll().then((data) => {
            setModulePermissions(data);
            setLoading(false);
        });
    }, [api]);

    const getData = React.useCallback(async () => {
        setLoading(true);

        try {
            const [permissionsData, moduleData] = await Promise.all([
                permissionApi.getAll(),
                moduleApi.getAll(),
            ]);

            setPermissions(permissionsData);
            setModules(moduleData);
            getMainData();
        } catch (error) {
            // Handle error if needed
        } finally {
            setLoading(false);
        }
    }, [getMainData]);

    React.useEffect(() => {
        if (!loading && !hasFetched) {
            getData();
            setHasFetched(true);
        }
    }, [loading, hasFetched, getData]);

    const deletePermission = (id: number) => {
        // Implementa la lógica para eliminar un permiso según el ID
        alert(`Deleting permission with ID ${id}`);
    };
    
    return (
        <div className="table-list-5-columns">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ModulePermissionsUI modules={modules} permissions={permissions} modulePermissions={modulePermissions} deletePermission={deletePermission} />
          )}
        </div>
    );
}

export {ModulePermissions};
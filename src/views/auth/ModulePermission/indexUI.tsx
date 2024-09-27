import React from 'react';
import { ModulePermission } from '../../../models/dependents/module-permission';
import { Permission } from '../../../models/masters/permission';
import { Module } from '../../../models/masters/module';
import "./index.css";

interface Props {
  modules: Module[];
  permissions: Permission[];
  modulePermissions: ModulePermission[];
  deletePermission: (id: number) => void;
}

const ModulePermissionsUI : React.FC<Props> = ({ modules, permissions, modulePermissions, deletePermission }) => {
  return (
    <div>
      {modules.map((module) => (
        <div  key={module.id}>
          <div>
            <div className="module__container">
              <div className="module__data_main">
                <div><label>{module.name}</label></div>
                <div><button>Add</button></div>
              </div>
              <div className="module__data_permission">
                {modulePermissions
                  .filter((mp) => mp.module_id === module.id)
                  .map((modulePermission) => {
                    const permission = permissions.find((p) => p.id === modulePermission.permission_id);
                    return (
                      <div className='module__data_permission_container' key={modulePermission.id}>
                        <div className="module__data_permission_name">{permission?.name}</div>
                        <div className="module__data_permission_delete" onClick={() => deletePermission(modulePermission.id)}>Delete</div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ModulePermissionsUI;
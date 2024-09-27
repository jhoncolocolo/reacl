import React, { useCallback, useEffect, useMemo, useState } from "react";
import GenericModel from "../../../http/generic-model";
import { Permission } from "../../../models/masters/permission";
import './index.css';
import { useAuth } from "../../../services/auth";
import { Modal } from "../../../components/Global/Modal";
import './index.css';
import { Form } from "./form";

const Permissions: React.FC = () =>{
    console.log("Estoy en el Index de Permissions");
    const auth = useAuth();
    const api = useMemo(() => new GenericModel<Permission>('api/permissions'), []); // para evitar que la referencia a 'api' cambie en cada render.
    const [permissions,setPermissions] = useState<Permission[]>([]);
    const [selectedPermission,setSelectedPermission] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    const [hasFetched, setHasFetched] = useState(false);
    
    const getPermissions = useCallback(() => {
        console.log("getPermissions called");
        setLoading(true);
        api.getAll().then(data => {
            setPermissions(data);
            setLoading(false);
        });
    }, [api, setPermissions]);

    const closeModal = (shouldGetPermissions: boolean) => {
        auth.setOpenModal(false);
        setSelectedPermission(0);
        if (shouldGetPermissions) {
            getPermissions(); // Llamada cuando se cierra el modal
        }
    };
    
    useEffect(() => {
        console.log("useEffect called");
        if (!loading && !hasFetched) {
            getPermissions();
            setHasFetched(true);
        }
    }, [loading, getPermissions, hasFetched]);

    const remove = (id:number) =>{
        api.remove(id.toString()).then(() => {
            const updatedPermissions = permissions.filter(permission => permission.id !== id);
            setPermissions(updatedPermissions);
        });
    }

    const openForm = (id:number) =>{
        setSelectedPermission(id);
        auth.setOpenModal(!auth.openModal);
    }
    return (
        <div className="table-list-5-columns">
        <div className="col-12">
            <div>
            <table className="resp">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Route</th>
                    <th>Path</th>
                    <th>Description</th>
                    <th>
                        <button onClick={() => openForm(selectedPermission)}
                                    className="navbar-brand" type="button" >  Create </button>
                    </th>
                </tr>
                </thead>
                <tbody>
                {permissions.map((permission: Permission, index: number) => (
                    <tr key={index}>
                        <td>{permission.name}</td>
                        <td>{permission.route}</td>
                        <td>{permission.path}</td>
                        <td>{permission.description}</td>
                        <td>
                            <div className="btn-actions">
                                <div className="btn edit-action">
                                    <button onClick={() => openForm(permission.id)}
                                    className="navbar-brand" type="button" >  &#9997;  </button>
                                </div>
                                <div className="btn delete-action">
                                    <button  onClick={() => remove(permission.id)}
                                     className="navbar-brand" type="button"> &#9940; </button>
                                </div>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
        <div>
        {
                auth.openModal && (
                    <Modal title="Título personalizado" onClose={() => closeModal(true)}>
                        <Form id={selectedPermission} closeModal={(shouldGetPermissions) => closeModal(shouldGetPermissions)} ></Form>
                    </Modal>
                )
            }
        </div>
        </div>
        
)
}
export {Permissions};
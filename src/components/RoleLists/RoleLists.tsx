import React, { useEffect, useState } from "react";
import { RequestAuth } from "../../models/masters/auth";
import './index.css';
import { RolePermissionAuth } from "../../models/general/role-permissions-auth";
import { useAuth } from "../../services/auth";
import { Modal } from "../Global/Modal";
import { Form } from "./Form";

const RoleLists: React.FC = () =>{
    const auth = useAuth();
    const [permissions,setPermissions] = useState<RolePermissionAuth[]>([]);
    useEffect(()=>{
        console.log("Estoy en la Lista de Roles");
        const userString = localStorage.getItem('user_info');
        const user: RequestAuth | null = userString ? JSON.parse(userString) : null;
        if(user){
            setPermissions(user.permissions);
        }
    },[]);

    const Create = () =>{
        auth.setOpenModal(!auth.openModal);
    }

    const closeModal = () => {
        auth.setOpenModal(false);
    };

    return (
            <div className="table-list-8-columns">
            <div className="col-12">
                <div>
                <table className="resp">
                    <thead>
                    <tr>
                        <th>Route</th>
                        <th>Role</th>
                        <th>Path</th>
                        <th>Description</th>
                        <th>
                            <button onClick={Create}>Crear</button>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {permissions.map((permission: RolePermissionAuth, index: number) => (
                        <tr key={index}>
                            <td>{permission.route}</td>
                            <td>{permission.role}</td>
                            <td>{permission.path}</td>
                            <td>{permission.description}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            </div>
            <div>
                {
                    auth.openModal && (
                        <Modal title="Título personalizado" onClose={closeModal}>
                            <Form></Form>
                        </Modal>
                    )
                }
            </div>
            </div>
            
    )
}
export {RoleLists};
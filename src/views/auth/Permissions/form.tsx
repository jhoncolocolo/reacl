import React, { useEffect } from "react";
import GenericModel from "../../../http/generic-model";
import { Permission } from "../../../models/masters/permission";


interface FormProps {
    id: number; // El id es opcional para manejar creación o edición
    closeModal: (prop:boolean) => void; // Prop para cerrar el modal
}

const Form: React.FC<FormProps> = ({ id,closeModal  }) => {
    const api = new GenericModel<Permission>('api/permissions');
    const [permission, setPermission] = React.useState<Permission>({
        id: 0,
        name: "",
        description: "",
        route: "",
        path: ""
    });

    useEffect(() => {
        // Si hay un id, cargar datos para editar
        if (id) {
            api.find(id.toString()).then(data => setPermission(data));
        }
    }, [id]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPermission(prevPermission => ({
            ...prevPermission,
            [name]: value
        }));
    };

    
    const onSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        // Si hay un id, realizar una actualización, de lo contrario, crear uno nuevo
        if (id) {
            api.update(id.toString(), permission).then(data => {
                closeModal(true); 
            });
        } else {
            api.save(permission).then(data => {
                closeModal(true); 
            });
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="row">
                <div className="col-12 mb-2">
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            name="name"
                            value={permission.name}
                            onChange={onChange}
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="col-12 mb-2">
                    <div className="form-group">
                        <label>Route</label>
                        <input
                            name="route"
                            value={permission.route}
                            onChange={onChange}
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="col-12 mb-2">
                    <div className="form-group">
                        <label>Path</label>
                        <input
                            name="path"
                            value={permission.path}
                            onChange={onChange}
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="col-12 mb-2">
                    <div className="form-floating">
                        <textarea
                            name="description"
                            value={permission.description}
                            onChange={onChange}
                            className="form-control"
                            id="floatingTextarea2"
                            style={{ height: "100px" }}
                        ></textarea>
                        <label htmlFor="floatingTextarea2">Description</label>
                    </div>
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">
                        Save
                    </button>
                </div>
            </div>
        </form>
    );
};

export { Form };
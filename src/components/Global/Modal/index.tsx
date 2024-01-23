import React from "react";
import  ReactDOM  from "react-dom";
import './Modal.css';
import { useAuth } from "../../../services/auth";

interface ModalProps {
    children: React.ReactNode;
    title?:string;
    bottomFooter?:boolean;
    onClose: () => void; // Función de retorno para cerrar el modal en Permissions
}

const Modal : React.FC<ModalProps> = ({ children, title = "Your Dialog",bottomFooter=false, onClose}) => {
    const auth = useAuth();
    const closeModal = () =>{
        onClose(); // Llama a la función onClose pasada desde Permissions
        auth.setOpenModal(false);
    }
    return ReactDOM.createPortal(
        <>
            <div className="modal fade show" tabIndex={-1} role="dialog" style={{ display: 'block' }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">{title}</h4>
                            <button
                            className="close"
                            aria-label="close"
                            type="button"
                            onClick={closeModal}
                            >
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">{children}</div>
                        <div className="modal-footer">
                            {
                                bottomFooter && (
                                    <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={closeModal}
                                    >
                                    Ok!
                                    </button>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show"></div>
        </>,
      document.getElementById('modal') as HTMLElement
    );
    
}

export {Modal};
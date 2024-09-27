import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../services/auth";

function Menu(){
    const auth = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        auth.logout(); // Este método ahora solo actualiza el estado y no realiza redirección
        navigate('/login'); // Realizamos la redirección directamente en el componente
      };
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
            <div className="container-fluid">
                <Link to="/home" className="navbar-brand">Home</Link>
                <Link to="/roles" className="navbar-brand">Roles</Link>
                <Link to="/operation_types" className="navbar-brand">Operation Types</Link>
                <Link to="/permissions" className="navbar-brand">Permissions</Link>
                <Link to="/modules" className="navbar-brand">Modules</Link>
                <Link to="/module_permissions" className="navbar-brand">Permission By Modules</Link>
                <Link to="/login" className="navbar-brand">Login</Link>
                <Link to="/login" className="navbar-brand" 
                onClick={handleLogout}
                >Logout</Link>
            </div>
        </nav>
    );
}

export {Menu};
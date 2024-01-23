import React, { SyntheticEvent, useEffect } from "react";
import './index.css';
import { useAuth } from "../../../services/auth";
import { Navigate } from "react-router-dom";

function Login(){

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    /*
    * Call to Service Auth
    */
    const auth = useAuth();

    useEffect(()=>{
        console.log("I am in Login");
    },[]);

    const sendCredentials = async (e :SyntheticEvent) => {
        e.preventDefault();
        await fetch('http://127.0.0.1:8000/api/login', {
            method:"POST",
            credentials:'include',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({email,password})
        })
        .then((response) => {
            if (response.status !== 200) {
                throw new Error(response.statusText);
            }    
            return response.json();
        })
        .then(data => {
            console.log("Me autentique en el loigin");
            auth.login(data.message);
        })
        .catch((error) => {
            console.error('Error:', error);

            if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
            // Este error indica que la conexión al backend no pudo establecerse
            alert('Backend is down');
            // Puedes manejarlo de otras maneras, como mostrar una notificación, redireccionar, etc.
            } else {
            // Otro tipo de error, puedes manejarlo según tus necesidades
            }
        });
    };

    if(auth.user){
        return <Navigate to="/home" />;
    }

    return(
        <div className="auth-form">
            <form onSubmit={sendCredentials}>
                <h1 className="h3 mb-3 fw-normal">Login</h1>
                <input type="text" className="form-control" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email"/>
                <input type="password" className="form-control" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter your password"/>
                <button type="submit" className="w-100 btn btn-lg btn-primary">Sing in</button>
            </form>
        </div>
    )
}

export {Login}
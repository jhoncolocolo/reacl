import React, { useEffect } from "react";
import { useAuth } from "../../../services/auth";

const Home: React.FC = () => {
    console.log("Estoy en la vista del Home");
    const auth = useAuth();
    useEffect(()=>{
  },[]);
    return (
      <p>I am in Home {auth.user?.name}</p>
    );
  };

export {Home};
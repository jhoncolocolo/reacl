import React, { useEffect } from "react";
import { useAuth } from "../../../services/auth";

const Home: React.FC = () => {
    const auth = useAuth();
    useEffect(()=>{
  },[]);
    return (
      <p>I am in Home {auth.user?.name}</p>
    );
  };

export {Home};
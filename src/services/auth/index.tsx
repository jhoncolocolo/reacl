import React, { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RequestAuth } from "../../models/masters/auth";
import { PermissionAuth } from "../../models/masters/permission-auth";


interface AuthContextProps {
  user: RequestAuth | null;
  assignUserAuth: (response: RequestAuth, redirect: boolean) => void;
  logout: () => void;
  login: (token: string) => void;
  callPermissionsByUser: () => void;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();
  const [user, setUser] = useState<RequestAuth | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const assignUserAuth = (response: RequestAuth, redirect: boolean) => {
    setUser(response);
    if (redirect) {
      navigate("/home");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user_info");
    setOpenModal(false);
  };

  const login = (token: string) => {
    localStorage.setItem("token", token);
    callPermissionsByUser();
  };

  const callPermissionsByUser = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_API_BASE_URL+"/api/user", {
        headers: { authorization: "Bearer " + localStorage.getItem("token") },
      });

      if (!response.ok) {
        handleErrorResponse(response);
        return;
      }

      const content = await response.json();
      const convertedContent: RequestAuth = { ...content };
      localStorage.setItem("user_info", JSON.stringify(convertedContent));
      assignUserAuth(convertedContent, true);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleErrorResponse = (response: Response) => {
    if (response.status === 401) {
      // Handle Unauthenticated case
      localStorage.removeItem("token");
      navigate("/login");
    } else {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
  };

  const auth: AuthContextProps = {
    user,
    assignUserAuth,
    logout,
    login,
    callPermissionsByUser,
    openModal,
    setOpenModal,
  };

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const auth = React.useContext(AuthContext);

  if (!auth) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return auth;
}

function AuthRoute({
  children,
  route,
}: {
  children: ReactNode;
  route: string;
}) {
  const auth = useAuth();
  const navigate = useNavigate();
  const infoCookie: RequestAuth | null  = React.useMemo(() => getPermissionsStorage(), []);
  const [isLoading, setIsLoading] = useState(true);  // Añadir estado para controlar el renderizado

  console.log("Info from cookie:", infoCookie);
  useEffect(() => {
    if (infoCookie && infoCookie.permissions && infoCookie.permissions.length > 0) {
  
        // Agrega el siguiente log aquí para asegurarte de que la ruta es correcta
        console.log("Evaluando permisos para la ruta:", route);
  
        // Agrega también el siguiente log para verificar si la función IsAllow está devolviendo el valor correcto
        if (!IsAllow(infoCookie.permissions, route)) {
          navigate("/unauthorized");
        }

      if (!auth.user) {
        auth.assignUserAuth(infoCookie, false);
      }

      // Una vez que se hace la validación, se deja de cargar
      setIsLoading(false);
    } else {
      navigate("/login");
    }
  }, [auth, infoCookie, route, navigate]);

  // Mostrar un mensaje o spinner mientras se valida el permiso
  if (isLoading) {
    return <div>Loading...</div>;  // Puedes personalizar esto
  }

  return <>{children}</>;
}


const IsAllow = (permissions: PermissionAuth[], route: string): boolean => {
  const sanitizedRoute = route.trim().toLowerCase();

  const hasPermission = permissions.some(
    (permission) => permission.route.trim().toLowerCase() === sanitizedRoute
  );

  console.log(`Has permission for ${sanitizedRoute}:`, hasPermission);
  return hasPermission;
};


/*
*Get Permissions in current Cookie
*/
const getPermissionsStorage = () :RequestAuth | null => {
  const userString = localStorage.getItem('user_info');
  const user: RequestAuth | null = userString ? JSON.parse(userString) : null;
  return user;
}


export { AuthProvider, useAuth, AuthRoute, IsAllow };
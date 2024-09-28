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
  children: React.ReactNode;
  route: string;
}) {
  const auth = useAuth();
  const navigate = useNavigate();
  const infoCookie: RequestAuth | null = getPermissionsStorage();
  const [isLoading, setIsLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  useEffect(() => {

    const evaluatePermissions = () => {
      // Reinicia el estado de permisos
      setHasPermission(false);
      setIsLoading(true);

      if (infoCookie && infoCookie.permissions && infoCookie.permissions.length > 0) {
        console.log("Evaluando permisos para la ruta:", route);

        const isAllowed = IsAllow(infoCookie.permissions, route);
        console.log(`Tiene permiso para ${route}:`, isAllowed);

        // Si no tiene permisos, redirige inmediatamente
        if (!isAllowed) {
          console.log("Sin permiso, redirigiendo a /unauthorized");
          navigate("/unauthorized");
          return; // Evita continuar ejecutando si no tiene permiso
        }

        // Si tiene permiso, lo permite
        setHasPermission(true);

        // Asigna al usuario autenticado si no está en el contexto
        if (!auth.user) {
          auth.assignUserAuth(infoCookie, false);
        }
      } else {
        // Si no hay sesión válida, redirige al login
        console.log("Sin sesión válida, redirigiendo a /login");
        navigate("/login");
      }

      setIsLoading(false);
    };
    evaluatePermissions();

    // Función de limpieza para restablecer el estado cuando el componente se desmonta
    return () => {
      setHasPermission(false);
      setIsLoading(false);
    };

  }, [auth, infoCookie, route, navigate]);

  
  // Mostrar pantalla de carga si aún no se han evaluado los permisos
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // No renderizar el contenido si no tiene permiso
  if (!hasPermission) {
    return null; // Evita el renderizado si no tiene permiso
  }else{
    if (infoCookie && infoCookie.permissions && infoCookie.permissions.length > 0) {
      if (!IsAllow(infoCookie.permissions, route)) {
        return null; // Evita el renderizado si no tiene permiso
      }
    }
  }

  // Renderiza el componente hijo si todo está en orden
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
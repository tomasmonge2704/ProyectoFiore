import { useEffect, useContext } from "react";
import { UserContext } from "./context/userContext";
import { verify } from "jsonwebtoken";
import Router from "next/router";
import { useRouter } from "next/router";

const secretKey = process.env.CLAVE_TOKEN;

function validateToken(token) {
  try {
    return verify(token, secretKey);
  } catch (err) {
    return undefined;
  }
}

export function CheckAuth({ children }) {
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (router.pathname === "/signup" || router.pathname === "/login") {
      // Si la ruta es /signup o /login, no se ejecuta ninguna función adicional
      return;
    } else {
      if (!token) {
        // Si no hay token almacenado, se redirige al usuario a la página de login
        Router.push("/login");
      } else {
        const decoded = validateToken(token);
        if (!decoded) {
          // Si el token no es válido, se redirige al usuario a la página de login
          Router.push("/login");
        } else {
          decoded.user.token = token;
          setUser(decoded.user);
        }
      }
    }
  }, [router.pathname]);

  return <>{children}</>;
}

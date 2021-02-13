import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/authentication/authContext";

const Bar = () => {
  // Extract authentication information
  const authsContext = useContext(AuthContext);
  const { authenticatedUser, user, closeSession } = authsContext;

  useEffect(() => {
    authenticatedUser();
    // eslint-disable-next-line
  }, []);

  return (
    <header className="app-header">
      {user ? (
        <p className="nombre-usuario">
          Hola <span>{user.name}</span>
        </p>
      ) : null}

      <nav className="nav-principal">
        <button
          className="btn btn-blank cerrar-sesion"
          onClick={() => closeSession()}
        >
          Cerrar Sesión
        </button>
      </nav>
    </header>
  );
};

export default Bar;

import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Bar from "../layout/Bar";
import UserList from "../users/UserList";
import AuthContext from "../../context/authentication/authContext";

const Users = () => {
  // Extract authentication information
  const authsContext = useContext(AuthContext);
  const { authenticatedUser } = authsContext;

  useEffect(() => {
    authenticatedUser();
    // eslint-disable-next-line
  }, []);

  // Function to Update User
  const onClickCreateUser = () => {};

  return (
    <div className="contenedor-app">
      <div className="seccion-principal">
        <Bar />
        <main>
          <div className="contenedor-tareas">
            <UserList />
          </div>
          <div className="contenedor-tareas">
            <Link className="btn btn-primario" to={"/create-user"}>
              Crear nuevo
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Users;

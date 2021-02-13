import React, { useState, useEffect, useContext } from "react";
import userContext from "../../context/users/userContext";
import alertContext from "../../context/alerts/alertContext";
import User from "./User";

const UserList = () => {
  // Get Project from initial state
  const usersContext = useContext(userContext);
  const { message, users, getUsers } = usersContext;

  const alertsContext = useContext(alertContext);
  const { alert, showAlert } = alertsContext;

  // Get Users when componet load
  useEffect(() => {
    // If there is an error
    if (message) {
      showAlert(message.msg, message.category);
    }
    getUsers();
    //eslint-disable-next-line
  }, [message]);

  // check if there is any project
  if (users.length === 0) return <p>No hay users, comienza creando uno</p>;

  return (
    <>
      <ul className="listado-proyectos">
        {alert ? (
          <div className={`alerta ${alert.category}`}> {alert.msg} </div>
        ) : null}
        {users.map((user) => (
          <User user={user} />
        ))}
      </ul>
    </>
  );
};

export default UserList;

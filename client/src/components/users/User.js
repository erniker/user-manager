import React, { useContext } from "react";
import userContext from "../../context/users/userContext";

const Proyect = ({ user }) => {
  // Get functions fron User Context
  const usersContext = useContext(userContext);
  const { deleteUser, getUsers, updateUser, getActualUser } = usersContext;

  // Function to eliminate User when user click on "Eliminar" button
  const onClickDeleteUser = (userId) => {
    deleteUser(userId);
    getUsers();
  };

  // Function to Update User
  const onClickUpdateUser = (user) => {
    updateUser(user);
  };

  const onClickCreateUser = (user) => {};

  // Get a selected User when user want edit it
  const selectUser = (user) => {
    getActualUser(user);
  };
  return (
    <li className="tarea sombra">
      <p>{user.name}</p>
      <p>{user.email}</p>
      <p>{user.password}</p>
      <div className="acciones">
        <button
          className="btn btn-primario"
          type="button"
          onClick={() => selectUser(user)}
        >
          Editar
        </button>
        <button
          className="btn btn-secundario"
          type="button"
          onClick={() => onClickDeleteUser(user._id)}
        >
          Eliminar
        </button>
      </div>
    </li>
  );
};

export default Proyect;

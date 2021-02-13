import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertContext from "../../context/alerts/alertContext";
import AuthContext from "../../context/authentication/authContext";

const SingUp = (props) => {
  // Extract values from alert context
  const alertsContext = useContext(AlertContext);
  const { alert, showAlert } = alertsContext;

  // Extract values from authentication context
  const authsContext = useContext(AuthContext);
  const { signUpUser, authenticated, message } = authsContext;

  // if user is already authenticated, is registered or is a duplicate register
  useEffect(() => {
    if (authenticated) {
      props.history.push("/users");
    }
    if (message) {
      showAlert(message.msg, message.category);
    }
    // eslint-disable-next-line
  }, [message, authenticated, props.history]); //porps.history para poder acceder a las redirecciones

  // SingUp State
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  // SingUp extract
  const { name, email, password, confirm } = user;

  const onChangeSingUp = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const hasNumber = (value) => {
    return new RegExp(/[0-9]/).test(value);
  };
  const hasMixed = (value) => {
    return new RegExp(/[a-z]/).test(value) && new RegExp(/[A-Z]/).test(value);
  };
  const hasSpecial = (value) => {
    return new RegExp(/[!#@$%^&*)(+=._-]/).test(value);
  };

  //SingUp Button
  const onSubmit = (e) => {
    e.preventDefault();
    // Empty field validation
    if (
      name.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirm.trim() === ""
    ) {
      showAlert("All fields are required", "alerta-error");
      return;
    }
    // Check if is a strong password
    if (
      password.length < 8 ||
      !hasNumber(password) ||
      !hasMixed(password) ||
      !hasSpecial(password)
    ) {
      showAlert(
        "Please enter a password with at least 8 character and contain at least one uppercase, one lower case and one special character.",
        "alerta-error"
      );
      return;
    }

    // Check password and confirmPassword are equal
    if (password !== confirm) {
      showAlert("Pasword and Confirm password must be equal", "alerta-error");
      return;
    }

    // Send to action
    signUpUser({ name, email, password });
  };

  return (
    <div className="form-usuario">
      {alert ? (
        <div className={`alerta ${alert.category}`}>{alert.msg}</div>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Crear cuenta</h1>
        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Tu Nombre"
              value={name}
              onChange={onChangeSingUp}
            ></input>
          </div>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Tu Email"
              value={email}
              onChange={onChangeSingUp}
            ></input>
          </div>
          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Tu Password"
              value={password}
              onChange={onChangeSingUp}
            ></input>
          </div>
          <div className="campo-form">
            <label htmlFor="confirm">Confirmar Password</label>
            <input
              type="password"
              id="confirm"
              name="confirm"
              placeholder="Repite tu Password"
              value={confirm}
              onChange={onChangeSingUp}
            ></input>
          </div>
          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Registrarme"
            />
          </div>
        </form>
        <Link className="enlace-cuenta" to={"/"}>
          Login
        </Link>
      </div>
    </div>
  );
};

export default SingUp;

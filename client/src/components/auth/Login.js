import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertContext from "../../context/alerts/alertContext";
import AuthContext from "../../context/authentication/authContext";

const Login = (props) => {
  // Extract values from alert context
  const alertsContext = useContext(AlertContext);
  const { alert, showAlert } = alertsContext;

  // Extract values from authentication context
  const authsContext = useContext(AuthContext);
  const { login, authenticated, message } = authsContext;

  // if password or user do not exists
  useEffect(() => {
    if (authenticated) {
      props.history.push("/users");
    }
    if (message) {
      showAlert(message.msg, message.category);
    }
    // eslint-disable-next-line
  }, [message, authenticated, props.history]); //porps.history para poder acceder a las redirecciones

  // Login State
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // User extract
  const { email, password } = user;

  const onChangeLogin = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  //Login Button
  const onSubmit = (e) => {
    e.preventDefault();
    // Empty field validation
    if (email.trim() === "" || password.trim() === "") {
      showAlert("All fields are required", "alerta-error");
      return;
    }
    // Send to action
    login({ email, password });
  };

  return (
    <div className="form-usuario">
      {alert ? (
        <div className={`alerta ${alert.category}`}>{alert.msg}</div>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Iniciar Sesión</h1>
        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Tu Email"
              value={email}
              onChange={onChangeLogin}
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
              onChange={onChangeLogin}
            ></input>
          </div>
          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Iniciar Sesión"
            />
          </div>
        </form>
        <Link className="enlace-cuenta" to={"/sing-up"}>
          Crear cuenta
        </Link>
      </div>
    </div>
  );
};

export default Login;

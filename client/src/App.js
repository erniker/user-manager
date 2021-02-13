import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import SingUp from "./components/auth/SingUp";
import Users from "./components/users/Users";
import CreateUser from "./components/users/CreateUser";

import UserState from "./context/users/userState";
import AlertState from "./context/alerts/alertState";
import AuthState from "./context/authentication/authState";
import authToken from "./config/authToken";

import PrivateRoute from "./components/routes/PrivateRoute";

// Check if we have token
const token = localStorage.getItem("token");
if (token) {
  authToken(token);
}

function App() {
  return (
    <UserState>
      <AlertState>
        <AuthState>
          <Router>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/sing-up" component={SingUp} />
              <PrivateRoute exact path="/users" component={Users} />
              <PrivateRoute exact path="/create-user" component={CreateUser} />
            </Switch>
          </Router>
        </AuthState>
      </AlertState>
    </UserState>
  );
}

export default App;

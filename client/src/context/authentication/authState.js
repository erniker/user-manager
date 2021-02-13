import React, { useReducer } from "react";
import AuthContext from "../authentication/authContext";
import AuthReducer from "../authentication/authReducer";
import {
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  GET_USER,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  CLOSE_SESSION,
} from "../../types";
import axiosClient from "../../config/axios";
import authToken from "../../config/authToken";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    authenticated: null,
    user: null,
    message: null,
    loading: true,
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Functions
  // User register
  const signUpUser = async (data) => {
    try {
      const response = await axiosClient.post("api/users", data);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data,
      });
      // Get user
      authenticatedUser();
    } catch (error) {
      const alert = {
        msg: error.response.data.msg,
        category: "alerta-error",
      };
      dispatch({
        type: REGISTER_ERROR,
        payload: alert,
      });
    }
  };

  // Return authenticated user
  const authenticatedUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      authToken(token);
    }
    try {
      const response = await axiosClient.get("/api/auth");
      //console.log(response);
      dispatch({
        type: GET_USER,
        payload: response.data.user,
      });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: LOGIN_ERROR,
      });
    }
  };

  // login user
  const login = async (data) => {
    try {
      const response = await axiosClient.post("/api/auth/login", data);
      //console.log(response);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data,
      });
      // Get user
      authenticatedUser();
    } catch (error) {
      console.log(error.response.data.msg);
      const alert = {
        msg: error.response.data.msg,
        category: "alerta-error",
      };
      dispatch({
        type: LOGIN_ERROR,
        payload: alert,
      });
    }
  };
  // Close user sessionç
  const closeSession = () => {
    dispatch({
      type: CLOSE_SESSION,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        authenticated: state.authenticated,
        user: state.user,
        message: state.message,
        loading: state.loading,
        signUpUser,
        login,
        authenticatedUser,
        closeSession,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;

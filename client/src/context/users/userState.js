import React, { useReducer } from "react";
import UserReducer from "./userReducer";
import userContext from "./userContext";
import {
  GET_USERS,
  ADD_USER,
  VALDATE_USER,
  DELETE_USER,
  ACTUAL_USER,
  UPDATE_USER,
  CLEAN_USER,
  CREATE_USER_SUCCESS,
} from "../../types";
import axiosClient from "../../config/axios";

const UserState = (props) => {
  const initialState = {
    // define initial state
    users: [],
    userError: false,
    selectedUser: null,
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  // Validate an show error
  const validateUser = () => {
    dispatch({
      type: VALDATE_USER,
    });
  };

  const createUser = async (data) => {
    try {
      const response = await axiosClient.post("api/users", data);
      dispatch({
        type: CREATE_USER_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Get Users
  const getUsers = async () => {
    try {
      const result = await axiosClient.get("/api/users");
      //console.log(result.data);
      dispatch({
        type: GET_USERS,
        payload: result.data.users,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Add User
  const addUser = async (user) => {
    try {
      const result = await axiosClient.post("/api/users", user);
      dispatch({
        type: ADD_USER,
        payload: result,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Delete User
  const deleteUser = async (userId) => {
    await axiosClient.delete(`/api/users/${userId}`);
    try {
      dispatch({
        type: DELETE_USER,
        payload: userId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Update User
  const updateUser = async (user) => {
    try {
      const result = await axiosClient.put(`api/users/${user._id}`, user);
      dispatch({
        type: UPDATE_USER,
        payload: result.data.user,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Extract User  for edit
  const getActualUser = (user) => {
    dispatch({
      type: ACTUAL_USER,
      payload: user,
    });
  };

  // Clean selected User from state
  const cleanUser = () => {
    dispatch({ type: CLEAN_USER });
  };

  return (
    <userContext.Provider
      value={{
        users: state.users,
        userError: state.userError,
        selectedUser: state.selectedUser,
        validateUser,
        createUser,
        getUsers,
        addUser,
        deleteUser,
        updateUser,
        getActualUser,
        cleanUser,
      }}
    >
      {props.children}
    </userContext.Provider>
  );
};

export default UserState;

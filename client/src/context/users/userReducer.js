/* eslint-disable import/no-anonymous-default-export */

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

export default (state, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
        errorForm: false,
      };
    case VALDATE_USER:
      return {
        ...state,
        userError: true,
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload),
        selectedUser: null,
      };
    case UPDATE_USER:
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        ),
      };
    case ACTUAL_USER: {
      return {
        ...state,
        selectedUser: action.payload,
      };
    }

    case CLEAN_USER:
      return {
        ...state,
        selectedUser: null,
      };

    case CREATE_USER_SUCCESS:
      return {
        ...state,
      };
    default:
      return state;
  }
};

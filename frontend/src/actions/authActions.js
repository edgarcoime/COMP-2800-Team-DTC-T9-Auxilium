import axios from "axios";
import * as actions from "../actions/types";
import { returnErrors } from "./errorActions";

// Check token and load user
export const loadUser = () => async (dispatch, getState) => {
  try {
    // User loading
    dispatch({ type: actions.USER_LOADING });

    // Fetch user
    const response = await axios.get(
      "/api/auth/user",
      tokenConfig(getState)
    );
    dispatch({
      type: actions.USER_LOADED,
      payload: response.data,
    });
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
    dispatch({
      type: actions.AUTH_ERROR,
    });
  }
};

// Register User
export const register = ({
  email,
  firstName,
  lastName,
  username,
  password,
  confirmPassword,
}) => async (dispatch) => {
  try {
    // Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Request body
    const body = JSON.stringify({
      name: username,
      email,
      firstName,
      lastName,
      password,
      confirmPassword
    });
    const response = await axios.post(
      "/api/users",
      body,
      config
    );
    dispatch({
      type: actions.REGISTER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch(
      returnErrors(error.response.data, error.response.status, "REGISTER_FAIL")
    );
    dispatch({
      type: actions.REGISTER_FAIL,
    });
  }
};

// Login User
export const login = ({
  email,
  password,
}) => async (dispatch) => {
  try {
    // Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Request body
    const body = JSON.stringify({
      email,
      password
    });
    const response = await axios.post(
      "/api/auth",
      body,
      config
    );
    dispatch({
      type: actions.LOGIN_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch(
      returnErrors(error.response.data, error.response.status, "LOGIN_FAIL")
    );
    dispatch({
      type: actions.LOGIN_FAIL,
    });
  }
};

// Logout User
export const logout = () => {
  return {
    type: actions.LOGOUT_SUCCESS
  }
}

// Setup config/headers and token
export const tokenConfig = (getState) => {
  // Get token from localstorage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};

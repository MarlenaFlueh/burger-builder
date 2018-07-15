import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = authData => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const auth = (email, password) => {
  return async dispatch => {
    dispatch(authStart());
    try {
      const res = await axios.get("/user.json");
      const fetchedUser = [];
    } catch (error) {
      dispatch(authFail(error));
    }
  };
};

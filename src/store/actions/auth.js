import * as actionTypes from "./actionTypes";
import axios from "axios";

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
      const authData = {
        email: email,
        password: password,
        returnSecureToken: true
      };
      const res = await axios.post(
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCgOyUXPFtXeHGI7Ttcjbh9BaMPQqu5PRE",
        authData
      );
      dispatch(authSuccess(res.data));
      console.log(res);
    } catch (error) {
      console.log(error);
      dispatch(authFail(error));
    }
  };
};

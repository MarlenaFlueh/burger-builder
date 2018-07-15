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

export const auth = (email, password, isSignup) => {
  return async dispatch => {
    dispatch(authStart());
    try {
      const authData = {
        email: email,
        password: password,
        returnSecureToken: true
      };
      let url =
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCgOyUXPFtXeHGI7Ttcjbh9BaMPQqu5PRE";
      if (!isSignup) {
        url =
          "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCgOyUXPFtXeHGI7Ttcjbh9BaMPQqu5PRE";
      }
      const res = await axios.post(url, authData);
      dispatch(authSuccess(res.data));
      console.log(res);
    } catch (error) {
      console.log(error);
      dispatch(authFail(error));
    }
  };
};

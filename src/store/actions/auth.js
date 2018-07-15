import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken,
    userId
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
      dispatch(authSuccess(res.data.idToken, res.data.localId));
      console.log(res);
    } catch (error) {
      dispatch(authFail(error.response.data.error));
    }
  };
};

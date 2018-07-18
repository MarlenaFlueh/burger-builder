import reducer from "./auth";
import * as actionTypes from "../actions/actionTypes";

describe("auth reduce", () => {
  it("should equal the initialState", () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: "/"
    });
  });

  it("should store the token login data", () => {
    expect(
      reducer(
        {
          token: null,
          userId: null,
          error: null,
          loading: false,
          authRedirectPath: "/"
        },
        {
          type: actionTypes.AUTH_SUCCESS,
          idToken: "some id",
          userId: "some userid"
        }
      )
    ).toEqual({
      token: "some id",
      userId: "some userid",
      error: null,
      loading: false,
      authRedirectPath: "/"
    });
  });
});

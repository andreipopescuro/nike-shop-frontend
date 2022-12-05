import { publicRequest, userRequest } from "../lib/requestMethods";
import { loginFailure, loginStart, loginSucces } from "./userSlice";
import {
  importCartStart,
  importCartSuccess,
  importCartFail,
} from "./cartSlice";
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const resp = await publicRequest.post("/auth/login", user);
    dispatch(loginSucces(resp.data));
  } catch (error) {
    dispatch(loginFailure(error.response.data));
  }
};

export const getCart = async (dispatch, userId) => {
  dispatch(importCartStart());
  try {
    const resp = await userRequest.get(`/cart/find/${userId}`);
    dispatch(importCartSuccess(resp.data));
  } catch (error) {
    dispatch(importCartFail(error));
  }
};

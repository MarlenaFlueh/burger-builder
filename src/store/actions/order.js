import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};

export const purchaseBurgerFail = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
};

export const purchaseBurger = orderData => {
  return async dispatch => {
    dispatch(purchaseBurgerStart);
    try {
      const res = await axios.post("/orders.json", orderData);
      dispatch(purchaseBurgerSuccess(res.data.name, orderData));
    } catch (e) {
      dispatch(purchaseBurgerFail(e));
    }
  };
};

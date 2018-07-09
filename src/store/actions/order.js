import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    id: id,
    orderData: orderData
  };
};

export const purchaseBurgerFail = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  };
};

export const purchaseBurgerStart = orderData => {
  return async dispatch => {
    try {
      const res = await axios.post("/orders.json", orderData);
      dispatch(purchaseBurgerSuccess(res.data, orderData));
    } catch (e) {
      dispatch(purchaseBurgerFail(e));
    }
  };
};

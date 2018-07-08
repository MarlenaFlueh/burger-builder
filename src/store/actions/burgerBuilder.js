import * as actionTypes from "./actionTypes";

export const add = food => {
  return { type: actionTypes.ADD_INGREDIENT, foodType: food };
};

export const remove = food => {
  return { type: actionTypes.REMOVE_INGREDIENT, foodType: food };
};

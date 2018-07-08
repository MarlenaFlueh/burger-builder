import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const add = food => {
  return { type: actionTypes.ADD_INGREDIENT, foodType: food };
};

export const remove = food => {
  return { type: actionTypes.REMOVE_INGREDIENT, foodType: food };
};

export const fetchIngredientsFailed = ingr => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
    ingredients: ingr
  };
};

export const setIngredients = ingr => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingr
  };
};

export const initIngredients = () => {
  return async dispatch => {
    try {
      const res = await axios.get("/ingredients.json");
      dispatch(setIngredients(res.data));
    } catch (e) {
      dispatch(fetchIngredientsFailed());
    }
  };
};

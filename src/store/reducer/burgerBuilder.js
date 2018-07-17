import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utils";

const initialState = {
  ingredients: null,
  totalPrice: 8,
  error: false,
  building: false
};

const ingredientPrices = {
  bacon: 1.2,
  cheese: 0.8,
  meat: 1,
  salad: 0.5
};

// in my opinion ugly to use the updateObject function
const addIngredient = (state, action) => {
  const updatedIngredient = {
    [action.foodType]: state.ingredients[action.foodType] + 1
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + ingredientPrices[action.foodType],
    building: true
  };
  return updateObject(state, updatedState);
};

// it's shorter without updateObject and it's less complicate to reads
const removeIngredient = (state, action) => {
  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      [action.foodType]: state.ingredients[action.foodType] - 1
    },
    totalPrice: state.totalPrice - ingredientPrices[action.foodType],
    building: true
  };
};

const setIngredients = (state, action) => {
  return {
    ...state,
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat
    },
    totalPrice: 4,
    error: false,
    building: false
  };
};

const fetchIngridientsFailed = state => {
  return {
    ...state,
    error: true
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);

    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);

    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngridientsFailed(state);
    default:
      return state;
  }
};

export default reducer;

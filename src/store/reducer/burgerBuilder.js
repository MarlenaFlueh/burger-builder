import * as actionTypes from "../actions/actionTypes";

const initialState = {
  ingredients: {
    bacon: 0,
    cheese: 0,
    meat: 0,
    salad: 0
  },
  totalPrice: 8
};

const ingredientPrices = {
  bacon: 1.2,
  cheese: 0.8,
  meat: 1,
  salad: 0.5
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.foodType]: state.ingredients[action.foodType] + 1
        },
        totalPrice: state.totalPrice + ingredientPrices[action.foodType]
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.foodType]: state.ingredients[action.foodType] - 1
        },
        totalPrice: state.totalPrice - ingredientPrices[action.foodType]
      };
    default:
      return state;
  }
};

export default reducer;

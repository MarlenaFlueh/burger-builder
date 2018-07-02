import * as actionTypes from "./actions";

const initialState = {
  ingredients: {
    bacon: 0,
    cheese: 0,
    meat: 0,
    salad: 0
  },
  totalPrice: 8
};

const reducer = (state = initialState, action) => {
  switch (action.foodType) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.foodType]: state.ingredients[action.foodType] + 1
        }
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state
      };
    default:
      return state;
  }
};

export default reducer;

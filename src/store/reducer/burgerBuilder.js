import * as actionTypes from "../actions/actionTypes";

const initialState = {
  ingredients: null,
  totalPrice: 8,
  error: false
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
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat
        },
        totalPrice: 4,
        error: false
      };
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true
      };
    default:
      return state;
  }
};

export default reducer;

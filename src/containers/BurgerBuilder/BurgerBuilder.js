import React, { Component } from "react";
import { connect } from "react-redux";

import * as actionTypes from "../../store/actions";
import Aut from "../../hoc/Aut/Aut";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const ingredientPrices = {
  bacon: 1.2,
  cheese: 0.8,
  meat: 1,
  salad: 0.5
};

class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  // async componentDidMount() {
  //   try {
  //     const res = await axios.get("/ingredients.json");
  //     this.setState({ ingredients: res.data });
  //   } catch (e) {
  //     return this.setState({ error: true });
  //   }
  // }

  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(key => ingredients[key])
      .reduce((arr, currentValue) => {
        return arr + currentValue;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  };

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const newCount = oldCount + 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = newCount;
    const priceAddition = ingredientPrices[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const newCount = oldCount - 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = newCount;
    const priceDeduction = ingredientPrices[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () => this.setState({ purchasing: true });

  purchaseCancelHandler = () => this.setState({ purchasing: false });

  purchaseContinueHandler = async () => {
    const queryParams = [];
    const ingredients = this.state.ingredients;
    for (let i in ingredients) {
      queryParams.push(
        encodeURIComponent(i) + "=" + encodeURIComponent(ingredients[i])
      );
    }
    queryParams.push("price=" + this.state.totalPrice);
    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString
    });
  };

  render() {
    const disabledInfo = { ...this.props.ingr };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.state.error ? (
      <p>Ingredients can't be found.</p>
    ) : (
      <Spinner />
    );

    if (this.props.ingr) {
      burger = (
        <Aut>
          <Burger ingredients={this.props.ingr} />
          <BuildControls
            ingredientAdded={this.props.onAddIngredientHandler}
            ingredientRemoved={this.props.onRemoveIngredientHandler}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            price={this.props.totPrice}
            ordered={this.purchaseHandler}
          />
        </Aut>
      );
      orderSummary = (
        <OrderSummary
          price={this.props.totPrice.toFixed(2)}
          ingredients={this.props.ingr}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aut>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aut>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingr: state.ingredients,
    totPrice: state.totalPrice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredientHandler: food =>
      dispatch({ type: actionTypes.ADD_INGREDIENT, foodType: food }),
    onRemoveIngredientHandler: food =>
      dispatch({ type: actionTypes.REMOVE_INGREDIENT, foodType: food })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));

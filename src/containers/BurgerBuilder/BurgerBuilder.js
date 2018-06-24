import React, { Component } from "react";
import { withRouter } from "react-router-dom";

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
    ingredients: null,
    totalPrice: 8,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  async componentDidMount() {
    try {
      const res = await axios.get("/ingredients.json");
      this.setState({ ingredients: res.data });
    } catch (e) {
      return this.setState({ error: true });
    }
  }

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
    this.setState({ loading: true });
    try {
      const order = {
        ingredients: this.state.ingredients,
        totalPrice: this.state.totalPrice,
        costumer: {
          name: "Marlena",
          address: {
            street: "Hamburger Straße 4",
            zipCode: 21339,
            country: "Germany"
          },
          email: "m.test@gmail.com"
        },
        deliveryMethod: "fastest"
      };

      await axios.post("/orders.json", order);
      this.setState({ loading: false, purchasing: false });
      this.props.history.push("/checkout");
    } catch (e) {
      this.setState({ loading: false, purchasing: false });
      console.log(e);
    }
  };

  render() {
    const disabledInfo = { ...this.state.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.state.error ? (
      <p>Ingredients can't be found.</p>
    ) : (
      <Spinner />
    );

    if (this.state.ingredients) {
      burger = (
        <Aut>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            price={this.state.totalPrice}
            ordered={this.purchaseHandler}
          />
        </Aut>
      );
      orderSummary = (
        <OrderSummary
          price={this.state.totalPrice.toFixed(2)}
          ingredients={this.state.ingredients}
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

export default withRouter(withErrorHandler(BurgerBuilder, axios));

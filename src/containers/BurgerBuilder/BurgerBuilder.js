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

class BurgerBuilder extends Component {
  state = {
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

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(key => ingredients[key])
      .reduce((arr, currentValue) => {
        return arr + currentValue;
      }, 0);
    return sum > 0;
  }

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
            purchasable={this.updatePurchaseState(this.props.ingr)}
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

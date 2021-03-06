import React, { Component } from "react";
import { connect } from "react-redux";

import Aut from "../../hoc/Aut/Aut";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";

export class BurgerBuilder extends Component {
  state = {
    purchasing: false
  };

  componentDidMount() {
    this.props.onInitIngredientsHandler();
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(key => ingredients[key])
      .reduce((arr, currentValue) => {
        return arr + currentValue;
      }, 0);
    return sum > 0;
  }

  purchaseHandler = () => {
    if (this.props.isAuth) {
      this.setState({ purchasing: true });
    } else {
      this.props.onAuthRedirectHandler("/checkout");
      this.props.history.push("/auth");
    }
  };

  purchaseCancelHandler = () => this.setState({ purchasing: false });

  purchaseContinueHandler = async () => {
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  };

  render() {
    const disabledInfo = { ...this.props.ingr };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.props.error ? (
      <p>Ingredients can't be found.</p>
    ) : (
      <Spinner />
    );

    if (this.props.ingr) {
      burger = (
        <Aut>
          <Burger ingredients={this.props.ingr} />
          <BuildControls
            isAuth={this.props.isAuth}
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
    ingr: state.burgerBuilder.ingredients,
    totPrice: state.burgerBuilder.totalPrice,
    err: state.burgerBuilder.error,
    isAuth: state.auth.token != null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredientHandler: food => dispatch(actions.add(food)),
    onRemoveIngredientHandler: food => dispatch(actions.remove(food)),
    onInitIngredientsHandler: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onAuthRedirectHandler: path => dispatch(actions.authRedirect(path))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));

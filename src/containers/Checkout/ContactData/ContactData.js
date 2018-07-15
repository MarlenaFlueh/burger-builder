import React, { Component } from "react";
import { connect } from "react-redux";

import axios from "../../../axios-orders";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./ContactData.css";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actionCreators from "../../../store/actions/index";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code"
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-Mail"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        value: "fastest",
        validation: {},
        valid: true
      }
    },
    formIsValid: false
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  }

  orderHandler = event => {
    event.preventDefault();

    const formData = {};
    for (let key in this.state.orderForm) {
      formData[key] = this.state.orderForm[key].value;
    }

    const order = {
      ingredients: this.props.ingr,
      price: this.props.totPrice,
      orderData: formData
    };

    this.props.onOrderBurger(order, this.props.token);
  };

  inputChangeHandler = (event, key) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormItem = { ...updatedOrderForm[key] };
    updatedFormItem.value = event.target.value;
    updatedFormItem.valid = this.checkValidity(
      updatedFormItem.value,
      updatedFormItem.validation
    );
    updatedFormItem.touched = true;
    updatedOrderForm[key] = updatedFormItem;

    let formIsValid = true;
    for (let key in updatedOrderForm) {
      formIsValid = updatedOrderForm[key].valid && formIsValid;
    }

    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  render() {
    const formEleArray = [];

    for (let key in this.state.orderForm) {
      formEleArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    const input = formEleArray.map(eleItem => (
      <Input
        key={eleItem.id}
        elementType={eleItem.config.elementType}
        elementConfig={eleItem.config.elementConfig}
        value={eleItem.config.value}
        changed={event => this.inputChangeHandler(event, eleItem.id)}
        invalid={!eleItem.config.valid}
        shouldValidate={eleItem.config.validation}
        touched={eleItem.config.touched}
      />
    ));

    let form = (
      <form onSubmit={this.orderHandler}>
        {input}
        <Button
          btnType="Success"
          clicked={this.orderHandler}
          disabled={!this.state.formIsValid}
        >
          ORDER
        </Button>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingr: state.burgerBuilder.ingredients,
    totPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actionCreators.purchaseBurger(orderData, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));

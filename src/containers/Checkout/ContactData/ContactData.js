import React, { Component } from "react";

import axios from "../../../axios-orders";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./ContactData.css";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your name"
        },
        value: ""
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: ""
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code"
        },
        value: ""
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: ""
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-Mail"
        },
        value: ""
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        value: ""
      }
    },
    loading: false
  };

  orderHandler = async event => {
    event.preventDefault();

    this.setState({ loading: true });
    try {
      const order = {
        ingredients: this.props.ingredients,
        totalPrice: this.props.price,
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
      this.setState({ loading: false });
      this.props.history.push("/");
    } catch (e) {
      this.setState({ loading: false });
      console.log(e);
    }
  };

  inputChangeHandler = (event, key) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormItem = { ...updatedOrderForm[key] };
    updatedFormItem.value = event.target.value;
    updatedOrderForm[key] = updatedFormItem;
    this.setState({ orderForm: updatedOrderForm });
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
      />
    ));

    let form = (
      <form>
        {input}
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );

    if (this.state.loading) {
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

export default ContactData;

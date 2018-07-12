import React, { Component } from "react";

import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import classes from "./Auth.css";

class Auth extends Component {
  state = {
    loginForm: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-Mail"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },

      password: {
        elementType: "password",
        elementConfig: {
          type: "password",
          placeholder: "Your Password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    }
  };

  render() {
    const loginFormArray = [];
    for (let key in this.state.loginForm) {
      loginFormArray.push({
        id: key,
        config: this.state.loginForm[key]
      });
    }

    const input = loginFormArray.map(input => (
      <Input
        key={input.id}
        elementType={input.config.elementType}
        elementConfig={input.config.elementConfig}
        value={input.config.value}
        changed={event => this.inputChangeHandler(event, input.id)}
        invalid={!input.config.valid}
        shouldValidate={input.config.validation}
        touched={input.config.touched}
      />
    ));

    return (
      <form className={classes.LoginData}>
        {input}
        <Button btnType="Success">Submit</Button>
      </form>
    );
  }
}

export default Auth;

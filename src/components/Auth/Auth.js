import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import classes from "./Auth.css";
import * as actions from "../../store/actions/index";
import Spinner from "../UI/Spinner/Spinner";

class Auth extends Component {
  state = {
    controls: {
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
    },
    isSignup: false
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

  inputChangeHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true
      }
    };
    this.setState({ controls: updatedControls });
  };

  submitHandler = event => {
    event.preventDefault();
    this.props.onAuthentification(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };

  switchIsSignupHandler = () => {
    this.setState(prevState => ({ isSignup: !prevState.isSignup }));
  };

  render() {
    const loginFormArray = [];
    for (let key in this.state.controls) {
      loginFormArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    let input = loginFormArray.map(input => (
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
    if (this.props.loading) {
      input = <Spinner />;
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    let authRedirect = null;
    if (this.props.isAuth) {
      authRedirect = <Redirect to="/" />;
    }

    return (
      <div className={classes.LoginData}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {input}
          <Button btnType="Success">Submit</Button>
        </form>
        <Button btnType="Danger" clicked={this.switchIsSignupHandler}>
          SWITCH TO {this.state.isSignup ? "SIGNIN" : "SIGNUP"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuthentification: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);

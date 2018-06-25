import React from "react";

import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.css";

const checkoutSummary = props => (
  <div className={classes.checkoutSummary}>
    <div style={{ width: "100%", margin: "auto" }}>
      <h1>We hope it tast's well!</h1>
      <Burger ingredients={props.ingredients} />
    </div>
    <Button btnType="Danger" clicked={props.checkoutCanceled}>
      CANCEL
    </Button>
    <Button btnType="Success" clicked={props.checkoutContinued}>
      CONTINUE
    </Button>
  </div>
);

export default checkoutSummary;

import React from "react";

import Button from "../../UI/Button/Button";
import Aut from "../../../hoc/Aut";

const orderSummary = props => {
  const ingredientsSummary = Object.keys(props.ingredients).map(
    ingredientsKey => (
      <li key={ingredientsKey}>
        <span style={{ textTransform: "capitalize" }}>{ingredientsKey}</span> :{" "}
        {props.ingredients[ingredientsKey]}
      </li>
    )
  );
  return (
    <Aut>
      <h3>Your order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientsSummary}</ul>
      <p>
        <strong>Total Price: {props.price}</strong>
      </p>
      <p>Continue to checkout?</p>
      <Button btnType="Danger" clicked={props.purchaseCancelled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.purchaseContinued}>
        CONTINUE
      </Button>
    </Aut>
  );
};

export default orderSummary;

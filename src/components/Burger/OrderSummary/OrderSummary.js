import React from "react";
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
      <p>Continue to checkout?</p>
    </Aut>
  );
};

export default orderSummary;

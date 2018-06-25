import React from "react";

import classes from "./Order.css";

const order = props => {
  let ingredients = [];
  for (let i in props.ingredients) {
    ingredients.push({ name: i, amount: props.ingredients[i] });
  }

  const ingredientOutput = ingredients.map(ingr => (
    <span
      style={{
        textTransform: "capitalize",
        display: "inline-block",
        margin: "0 8px",
        border: "1px solid #ccc",
        padding: "5 px"
      }}
      key={ingr.name}
    >
      {ingr.name} ({ingr.amount})
    </span>
  ));

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>
        Price: <strong>{Number.parseFloat(props.price).toFixed(2)}€</strong>
      </p>
    </div>
  );
};

export default order;

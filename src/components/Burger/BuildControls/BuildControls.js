import React from "react";

import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.css";

const controls = [
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
  { label: "Salad", type: "salad" }
];

const buildControls = props => (
  <div className={classes.BuildControls}>
    {controls.map(control => (
      <BuildControl key={control.label} label={control.label} />
    ))}
  </div>
);

export default buildControls;

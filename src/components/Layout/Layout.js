import React from "react";

import Aut from "../../hoc/Aut";
import classes from "./Layout.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";

const layout = props => (
  <Aut>
    <Toolbar />
    <main className={classes.Content}>{props.children}</main>
  </Aut>
);

export default layout;

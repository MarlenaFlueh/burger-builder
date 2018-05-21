import React from "react";

import Aut from "../../hoc/Aut";
import classes from "./Layout.css";

const layout = props => (
  <Aut>
    <div>Toolbar, SideDrawer, Backdrop</div>
    <main className={classes.Content}>{props.children}</main>
  </Aut>
);

export default layout;

import React from "react";

import classes from "./Toolbar.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/Navigationitems";
import Backdrop from "../../UI/Backdrop/Backdrop";

const toolbar = props => (
  <header className={classes.Toolbar}>
    <Backdrop />
    <div>MENU</div>
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>
);

export default toolbar;

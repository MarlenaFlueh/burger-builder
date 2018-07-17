import React from "react";

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/Navigationitems";
import classes from "./SideDrawer.css";
import Aut from "../../../hoc/Aut/Aut";
import Backdrop from "../../UI/Backdrop/Backdrop";

const sideDrawer = props => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <Aut>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(" ")} onClick={props.closed}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuth={props.isAuth} />
        </nav>
      </div>
    </Aut>
  );
};

export default sideDrawer;

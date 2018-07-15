import React from "react";

import NavigationItem from "../NavigationItem/NavigationItem";
import classes from "./NavigationItems.css";

const navigationItems = props => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/">Burger Builder</NavigationItem>
    <NavigationItem link="/orders">Orders</NavigationItem>
    {props.isAuth ? (
      <NavigationItem link="/auth">Logout</NavigationItem>
    ) : (
      <NavigationItem link="/auth">Authentification</NavigationItem>
    )}
  </ul>
);

export default navigationItems;

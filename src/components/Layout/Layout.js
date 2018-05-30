import React, { Component } from "react";

import Aut from "../../hoc/Aut";
import classes from "./Layout.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: true
  };

  sideDrawerClosedHandler = () => this.setState({ showSideDrawer: false });

  render() {
    return (
      <Aut>
        <Toolbar />
        <SideDrawer
          closed={this.sideDrawerClosedHandler}
          open={this.state.showSideDrawer}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aut>
    );
  }
}

export default Layout;

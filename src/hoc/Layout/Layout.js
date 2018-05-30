import React, { Component } from "react";

import Aut from "../Aut/Aut";
import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  sideDrawerClosedHandler = () => this.setState({ showSideDrawer: false });

  sideDrawerOpenedHandler = prevState =>
    this.setState({ showSideDrawer: !prevState.showSideDrawer });

  render() {
    return (
      <Aut>
        <Toolbar openedDrawer={this.sideDrawerOpenedHandler} />
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

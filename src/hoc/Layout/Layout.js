import React, { Component } from "react";
import { connect } from "react-redux";

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
        <Toolbar
          isAuth={this.props.isAuthenticated}
          openedDrawer={this.sideDrawerOpenedHandler}
        />
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          closed={this.sideDrawerClosedHandler}
          open={this.state.showSideDrawer}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aut>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token != null
  };
};

export default connect(mapStateToProps)(Layout);

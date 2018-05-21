import React, { Component } from "react";

import Aut from "../../hoc/Aut";
import Burger from "../../components/Burger/Burger";

class BurgerBuilder extends Component {
  render() {
    return (
      <Aut>
        <Burger />
        <div>Build Controls</div>
      </Aut>
    );
  }
}

export default BurgerBuilder;

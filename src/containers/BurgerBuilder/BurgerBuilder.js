import React, { Component } from "react";

import Aut from "../../hoc/Aut";
import Burger from "../../components/Burger/Burger";

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      bacon: 0,
      cheese: 0,
      meat: 0,
      salad: 0
    }
  };

  render() {
    return (
      <Aut>
        <Burger ingredients={this.state.ingredients} />
        <div>Build Controls</div>
      </Aut>
    );
  }
}

export default BurgerBuilder;

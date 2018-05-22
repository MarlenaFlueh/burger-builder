import React, { Component } from "react";

import Aut from "../../hoc/Aut";
import Burger from "../../components/Burger/Burger";

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      bacon: 1,
      cheese: 1,
      meat: 2,
      salad: 2
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

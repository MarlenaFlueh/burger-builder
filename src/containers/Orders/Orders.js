import React, { Component } from "react";

import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withError from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };

  async componentDidMount() {
    try {
      const res = await axios.get("/orders.json");
      const fetchedOrders = [];
      for (let key in res.data) {
        fetchedOrders.push({ ...res.data[key], id: key });
      }
      this.setState({ loading: false, orders: fetchedOrders });
      console.log(res.data);
    } catch (e) {
      this.setState({ loading: false });
    }
  }
  render() {
    return (
      <div>
        <Order />
        <Order />
      </div>
    );
  }
}

export default withError(Orders, axios);

import React, { Component } from "react";
import { connect } from "react-redux";

import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withError from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
  async componentDidMount() {
    this.props.onFetchOrders();
  }

  render() {
    let orderForm = <Spinner />;
    if (!this.props.loading) {
      orderForm = (
        <div>
          {this.props.orders.map(order => (
            <Order
              key={order.id}
              ingredients={order.ingredients}
              price={+order.price}
            />
          ))}
        </div>
      );
    }
    return orderForm;
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => dispatch(actions.fetchOrders())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withError(Orders, axios));

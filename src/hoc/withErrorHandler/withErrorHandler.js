import React, { Component } from "react";

import Aut from "../Aut/Aut";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    };

    componentDidMount() {
      axios.interceptors.request.use(this.setState({ error: null }));
      axios.interceptors.response.use(null, error =>
        this.setState({ error: error })
      );
    }

    render() {
      return (
        <Aut>
          <Modal show={this.state.error}>{this.state.errorMessage}</Modal>
          <WrappedComponent {...this.props} />
        </Aut>
      );
    }
  };
};

export default withErrorHandler;

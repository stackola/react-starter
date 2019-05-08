import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "redux/actions";
import { bindActionCreators } from "redux";

import InputField from "components/InputField";
import style from "./AppContainer.less";

import { Route, Link, withRouter, Switch, Redirect } from "react-router-dom";

@withRouter
@connect(
  mapStateToProps,
  mapDispatchToProps
)
class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0, akal: { name: "test", count: 12 } };
  }
  componentDidMount() {}

  clicked() {
    console.log("clicked");
    this.setState({ count: this.state.count + 1 });
  }
  render() {
    return (
      <div styleName={"main"}>
        {this.state.count}
        <div
          onClick={() => {
            this.clicked();
          }}
        >
          Button!
        </div>
        <Test
          onClick={() => {
            this.clicked();
          }}
          count={this.state.count}
        >
          Hallo
        </Test>
        <Test count={this.state.count * 2}>Tschüss</Test>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default AppContainer;

class Test extends Component {
  render() {
    return (
      <div
        onClick={() => {
          this.props.onClick && this.props.onClick();
        }}
      >
        {this.props.count} {this.props.children}
      </div>
    );
  }
}

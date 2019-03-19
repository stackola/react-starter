import React, { Component } from "react";


//Needed redux imports:
import { connect } from "react-redux";
import { ActionCreators } from "redux/actions";
import { bindActionCreators } from "redux";

import InputField from "components/InputField";
import style from "./AppContainer.less";

import { Route, Link, withRouter, Switch, Redirect } from "react-router-dom";


//Decorator is the same as export default connect(...)(AppContainer)
@withRouter
@connect(
  mapStateToProps,
  mapDispatchToProps
)
class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}

  render() {
    return (
      <div styleName={"main"}>
        Current username: {this.props.user.username}
        <br />
        <button onClick={() => this.props.setUsername("Normal username")}>
          Set username (normal)
        </button>
        <br />
        <button onClick={() => this.props.asnycDemo("Asny username")}>
          Set username (async)
        </button>
        <br />
        <button onClick={() => this.props.setUserObject({})}>Clear user</button>
      </div>
    );
  }
}



//connect redux. All actions available
function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default AppContainer;

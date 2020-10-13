import React from "react";
import "./AppContainer.less";
import "./Global.less";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../../screens/Home";

export default class AppContainer extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" component={Home}></Route>
        </Switch>
      </Router>
    );
  }
}

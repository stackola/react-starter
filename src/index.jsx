import React, { Component } from "react";
import ReactDOM from "react-dom";

import AppContainer from "./containers/AppContainer";
import { HashRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./redux/store";

const render = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <Component />
      </Router>
    </Provider>,
    document.getElementById("app")
  );
};

render(AppContainer);

if (module.hot) {
  module.hot.accept("./containers/AppContainer", () => {
    var NextRootContainer = require("./containers/AppContainer").default;
    render(NextRootContainer);
  });
}

import React from "react";
import ReactDOM from "react-dom";
import { store, persistor } from "./redux/store";

import AppContainer from "./containers/AppContainer";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

const render = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router>
          <Component />
        </Router>
      </PersistGate>
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

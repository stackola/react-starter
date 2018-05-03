import React, { Component } from "react";
import ReactDOM from "react-dom";
import AppContainer from "./containers/appContainer";

const render = Component => {
	ReactDOM.render(<Component />, document.getElementById("app"));
};

render(AppContainer);

if (module.hot) {
	module.hot.accept("./containers/appContainer", () => {
		var NextRootContainer = require("./containers/appContainer").default;
		render(NextRootContainer);
	});
}

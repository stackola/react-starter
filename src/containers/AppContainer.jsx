import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "../actions";
import { bindActionCreators } from "redux";

import InputField from "../components/inputField";

class AppContainer extends Component {
	constructor(props) {
		super(props);
		//initialize local state
		this.state = { input: " " };
	}
	componentDidMount() {}

	changeInput(i) {
		console.log(i);
		this.setState({ ...this.state, input: i });
	}
	setUsername() {
		//push new username currently held in local state to redux store
		this.props.setUsername(this.state.input);
		//Alternatively, you can use
		//this.props.setUserObject({username:input});
		//check actions/user.js
		//Clear input field
		this.setState({ ...this.state, input: "" });
	}
	render() {
		//We can access the redux store via our props. The available variables are defined in mapStateToProps() in this file
		return (
			<div>
				Current Redux Store Username: {this.props.user.username}
				<br />
				Current local state.input: {this.state.input}
				<br />
				<InputField
					value={this.state.input}
					onChange={e => {
						this.changeInput(e.target.value);
					}}
				/>
				<br />
				<button
					onClick={() => {
						this.setUsername();
					}}
				>
					Set Username
				</button>
			</div>
		);
	}
}

//Make state available as props
function mapStateToProps(state) {
	return {
		user: state.user
	};
}

//Make actions available as functions in props
function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}

//Connect to navigation, redux and export
export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);

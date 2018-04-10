import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from 'actions';
import { bindActionCreators } from 'redux';
import CSSModules from 'react-css-modules';

import InputField from 'components/inputField';
import style from './style.less';

import {
	Route,
	Link,
	withRouter,
	Switch,
	Redirect
} from 'react-router-dom';

const Home = () => (
	<div>
		<h2>Home</h2>
	</div>
);
const KING = () => (
	<div>
		<h2>KING</h2>
	</div>
);


const About = (props) => (
			<div>
				<h2>About</h2>
				<Link to={props.match.path + '/child'}><h2>Show child element</h2></Link>
				<Route path={props.match.path + '/child'} component={KING} />
			</div>
		);

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(style, { allowMultiple: true, handleNotFoundStyleName: 'log' })
class AppContainer extends Component {
	constructor(props) {
		super(props);
		//initialize local state
		this.state = { input: '' };
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
		this.setState({ ...this.state, input: '' });
	}
	render() {
		//We can access the redux store via our props. The available variables are defined in mapStateToProps() in this file
		return (
			<div styleName={'main'}>
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
				<div>
					<ul>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/about">About</Link>
						</li>
						<li>
							<Link to="/topics">Topics</Link>
						</li>
					</ul>
				</div>
				<div>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/about" component={About} />
						<Route path="/test" component={About} />
						<Redirect to="/" />
					</Switch>
				</div>
			</div>
		);
	}
}

//Make state available as props
function mapStateToProps(state) {
	return {
		user: state.user,
	};
}

//Make actions available as functions in props
function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}

//Connect to navigation, redux and export
export default AppContainer;

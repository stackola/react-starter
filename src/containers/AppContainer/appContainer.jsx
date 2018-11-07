import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from 'actions';
import { bindActionCreators } from 'redux';
import CSSModules from 'react-css-modules';

import Configurator from 'components/configurator';
import style from './appContainer.less';


@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(style, { allowMultiple: true, handleNotFoundStyleName: 'log' })
class AppContainer extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {}


	render() {
		//We can access the redux store via our props. The available variables are defined in mapStateToProps() in this file
		return (
			<div styleName={'main'}>
				<Configurator/>
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

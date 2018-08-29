import React from 'react';
import CSSModules from 'react-css-modules';
import style from './<%= slug %>.less';

import { connect } from 'react-redux';
import { ActionCreators } from 'actions';
import { bindActionCreators } from 'redux';

@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(style, {allowMultiple:true, handleNotFoundStyleName:'ignore'})
class <%= name %> extends React.Component{
	render(){
		return (<div styleName="<%= slug %>"><%= name %></div>);
	}
}


//Make state available as props
function mapStateToProps(state) {
	return {

	};
}

//Make actions available as functions in props
function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}

//Connect to navigation, redux and export
export default <%= name %>;

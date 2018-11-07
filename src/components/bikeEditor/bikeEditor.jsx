import React from 'react';
import CSSModules from 'react-css-modules';
import style from './bikeEditor.less';

import { connect } from "react-redux";
import { ActionCreators } from "actions";
import { bindActionCreators } from "redux";

import ColorPicker from "components/colorPicker";

@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(style, {allowMultiple:true, handleNotFoundStyleName:'log'})
class BikeEditor extends React.Component{
	render(){
		return (<div styleName="bikeEditor">
				<div styleName="optionRow">
					<div styleName="optionTitle">Choose a color</div>
					<div styleName="optionText">Lorem ipsum</div>
					<div><ColorPicker setColor={(c)=>{this.props.setColor(c)}} color={this.props.build.color}/></div>
				</div>
			</div>);
	}
}

function mapStateToProps(state) {
	return {
		build: state.build,
		settings: state.settings
	};
}

//Make actions available as functions in props
function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}

//Connect to navigation, redux and export
export default BikeEditor;


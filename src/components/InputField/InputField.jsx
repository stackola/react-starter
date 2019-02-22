import React from 'react';
import CSSModules from 'react-css-modules';
import style from './InputField.less';

@CSSModules(style, {allowMultiple:true, handleNotFoundStyleName:'log'})
export default class InputField extends React.Component{
	render(){
		return (<div styleName="InputField">InputField</div>);
	}
}

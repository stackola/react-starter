import React from 'react';
import CSSModules from 'react-css-modules';
import style from './style.less';

@CSSModules(style, {allowMultiple:true, handleNotFoundStyleName:'log'})
export default class ComponentName extends React.Component{
	render(){
		return (<div styleName="componentName"/>);
	}
}
import React from 'react';
import CSSModules from 'react-css-modules';
import style from './draggable.less';

@CSSModules(style, {allowMultiple:true, handleNotFoundStyleName:'log'})
export default class Draggable extends React.Component{
	render(){
		return (<div styleName="draggable">Draggable</div>);
	}
}

import React from 'react';
import CSSModules from 'react-css-modules';
import style from './textComponent.less';

@CSSModules(style, {allowMultiple:true, handleNotFoundStyleName:'log'})
export default class TextComponent extends React.Component{
	render() {
		var fontScaling = 1000;
		var data = this.props.text;
		var fontSize =
			this.props.containerWidth / fontScaling * data.size + "px";
		return (
			<div
				styleName="textComponent"
				style={{
					fontSize: fontSize,
					lineHeight: fontSize,
					left: data.position.x + "%",
					top: data.position.y + "%",
					color: data.color,
					fontFamily: data.font
				}}
			>
				{data.text}
			</div>
		);
	}
}

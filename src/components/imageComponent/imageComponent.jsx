import React from "react";
import CSSModules from "react-css-modules";
import style from "./imageComponent.less";

@CSSModules(style, { allowMultiple: true, handleNotFoundStyleName: "log" })
export default class ImageComponent extends React.Component {
	render() {
		return (
			<div
				styleName="imageComponent"
				style={{
					left: this.props.data.position.left + "%",
					top: this.props.data.position.top + "%",
					width: this.props.data.size + "%"
				}}
			>
				{this.props.data.url && <img style={{ width: "100%" }} src={this.props.data.url} />
				}
			</div>
		);
	}
}

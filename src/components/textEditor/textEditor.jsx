import React from "react";
import CSSModules from "react-css-modules";
import style from "./textEditor.less";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";



import FontPicker from "components/fontPicker";
import FA from "react-fontawesome";
import ColorPicker from "components/colorPicker";

@CSSModules(style, { allowMultiple: true, handleNotFoundStyleName: "log" })
export default class TextEditor extends React.Component {
	changeInput(v) {
		this.props.setText(v);
	}
	render() {
		return (
			<div styleName="textEditor">
				<div styleName="inputWrapper">
					<textarea
						placeholder="Ihr Text hier..."
						type="text"
						styleName="input"
						onChange={e => {
							this.changeInput(e.target.value);
						}}
						value={this.props.build.text.text}
					/>
				</div>
				<div styleName="controlContainer slider">

					<div styleName="label"><FA name="expand-arrows-alt"/></div>

					<Slider
						min={0}
						max={100}
						value={this.props.build.text.size}
						onChange={v => {
							this.props.setTextSize(v);
						}}
					/>
				</div>
				<div styleName="controlContainer slider">
					<div styleName="label"><FA name="arrows-alt-h"/></div>
					<Slider
						min={0}
						max={100}
						value={this.props.build.text.position.x}
						onChange={v => {
							this.props.setTextPosition({
								x: v,
								y: this.props.build.text.position.y
							});
						}}
					/>
				</div>
				<div styleName="controlContainer slider">

					<div styleName="label"><FA name="arrows-alt-v"/></div>

					<Slider
						min={0}
						max={100}
						value={this.props.build.text.position.y}
						onChange={v => {
							this.props.setTextPosition({
								x: this.props.build.text.position.x,
								y: v
							});
						}}
					/>
				</div>
				<div styleName="controlContainer">
					<div styleName="label">Font</div>
					<FontPicker
						previewText={this.props.build.text.text}
						font={this.props.build.text.font}
						setFont={f => {
							this.props.setFont(f);
						}}
					/>
				</div>
				<div styleName="controlContainer">
					<div styleName="label">Farbe</div>
					<ColorPicker
						setColor={c => {
							this.props.setTextColor(c)
						}}
						condensed={true}
						color={this.props.build.text.color}
					/>
				</div>
			</div>
		);
	}
}

import React from "react";
import CSSModules from "react-css-modules";
import style from "./bikeEditor.less";

import { connect } from "react-redux";
import { ActionCreators } from "actions";
import { bindActionCreators } from "redux";

import ColorPicker from "components/colorPicker";
import TextEditor from "components/textEditor";
import ImageEditor from "components/imageEditor";

@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(style, { allowMultiple: true, handleNotFoundStyleName: "log" })
class BikeEditor extends React.Component {
	render() {
		return (
			<div styleName="bikeEditor">
				<div styleName="optionRow">
					<div styleName="optionTitle">Farbe wählen</div>
					<div styleName="optionText">Lorem ipsum</div>
					<div>
						<ColorPicker
							setColor={c => {
								this.props.setColor(c);
							}}
							color={this.props.build.color}
						/>
					</div>
				</div>
				<div styleName="optionRow">
					<div styleName="optionTitle">Bild hinzufügen</div>
					<div styleName="optionText">Lorem ipsum</div>
					<div>
						<ImageEditor
							image={this.props.build.image}
							setImagePosition={p => {
								this.props.setImagePosition(p);
							}}
							setImageSize={s => this.props.setImageSize(s)}
							setImageUrl={u => this.props.setImageUrl(u)}
						/>
					</div>
				</div>
				<div styleName="optionRow">
					<div styleName="optionTitle">Text hinzufügen</div>
					<div styleName="optionText">Lorem ipsum</div>
					<div>
						<TextEditor
							build={this.props.build}
							setFont={f => this.props.setFont(f)}
							setText={t => this.props.setText(t)}
							setTextSize={s => this.props.setTextSize(s)}
							setTextPosition={p => this.props.setTextPosition(p)}
							setTextColor={c => this.props.setTextColor(c)}
						/>
					</div>
				</div>
			</div>
		);
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

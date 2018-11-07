import React from "react";
import CSSModules from "react-css-modules";
import style from "./optionsEditor.less";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import FA from "react-fontawesome";
import { connect } from "react-redux";
import { ActionCreators } from "actions";
import { bindActionCreators } from "redux";

import Toggle from "react-toggle";
import "react-toggle/style.css";

import MonthSelector from "components/monthSelector";

@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(style, { allowMultiple: true, handleNotFoundStyleName: "log" })
class OptionsEditor extends React.Component {
	render() {
		let s = this.props.settings;
		let b = this.props.build;
		return (
			<div styleName="optionsEditor">
				<div styleName="optionRow">
					<div styleName="optionTitle">How many bikes?</div>
					<div styleName="optionText">
						Base price - {s.options.basePrice}€ per bike per month.
					</div>
					<div styleName="slider">
						<div styleName="sliderWrapper">
							<Slider
								min={s.options.orderVolume.min}
								max={s.options.orderVolume.max}
								value={b.volume}
								onChange={v => {
									this.props.setVolume(v);
								}}
								marks={{
									[s.options.orderVolume.min]:
										s.options.orderVolume.min,
									[s.options.orderVolume.max]:
										s.options.orderVolume.max
								}}
							/>
						</div>
						<div styleName="numberContainer">
							<FA name="bicycle" styleName="bikeIcon" />
							<input
								type=""
								value={b.volume}
								onChange={e => {
									this.props.setVolume(
										parseInt(e.target.value)
									);
								}}
							/>
						</div>
					</div>
				</div>
				{s.options.addons.map(a => {
					return (
						<div styleName="optionRow split">
							<div styleName="left">
								<div styleName="optionTitle">{a.name}</div>
								<div styleName="optionText">{a.info}</div>
							</div>
							<div styleName="right">
								<Toggle
									checked={b.addons[a.id] == true}
									onChange={() => {
										this.props.toggleAddon(a.id);
									}}
								/>
							</div>
						</div>
					);
				})}
				<div styleName="optionRow">
					<div styleName="optionTitle">Booking period</div>
					<div styleName="optionText">
						Select when your campaign will start and end
					</div>
					<div styleName="monthSelector">
						<MonthSelector
							setStartMonth={i => {
								this.props.setStartMonth(i);
							}}
							startMonth={this.props.build.startMonth}
							setEndMonth={i => {
								this.props.setEndMonth(i);
							}}
							endMonth={this.props.build.endMonth}
						/>
					</div>
				</div>
			</div>
		);
	}
}

//Make state available as props
function mapStateToProps(state) {
	return {
		build: state.build
	};
}

//Make actions available as functions in props
function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}

export default OptionsEditor;

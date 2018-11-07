import React from "react";
import CSSModules from "react-css-modules";
import style from "./cityDropdown.less";
import FA from "react-fontawesome";

@CSSModules(style, { allowMultiple: true, handleNotFoundStyleName: "log" })
export default class CityDropdown extends React.Component {
	constructor(p) {
		super(p);
		this.state = { open: false, adding: false };
	}
	open() {
		this.setState({ open: true });
	}
	close() {
		this.setState({ open: false });
	}
	toggle() {
		this.setState({ open: !this.state.open });
	}
	selectCity(city) {
		this.props.selectCity(city);
		this.setState({ open: false, adding: false });
	}
	render() {
		if (!this.props.selected || this.props.selected.length == 0) {
			return (
				<div styleName="cityDropdown">
					<div
						styleName="button"
						onClick={() => {
							this.toggle();
						}}
					>
						Choose City
						<div styleName="downArrow">
							<FA name="sort-down" />
						</div>
					</div>
					{this.state.open && (
						<div styleName="options">
							{this.props.available.map(c => {
								return (
									<div
										onClick={() => {
											this.selectCity(c);
										}}
										styleName="option"
									>
										{c}
									</div>
								);
							})}
						</div>
					)}
				</div>
			);
		} else {
			return (
				<div styleName="selectedCities">
					{this.props.selected.map(c => {
						return (
							<div styleName="button">
								<div
									styleName="deleteButton"
									onClick={() => {
										this.props.removeCity(c);
									}}
								>
									<FA name="times" />
								</div>
								<div styleName="cityName">
								{c}
								</div>
							</div>
						);
					})}
					{!this.state.adding && (
						<div
							styleName="addCityButton"
							onClick={() => {
								this.setState({ adding: true });
							}}
						>
							Add city <div styleName="plus"><FA name="plus"/></div>
						</div>
					)}
					{this.state.adding && (
						<div styleName="adding">
							<div styleName="options">
								{this.props.available.map(c => {
									return (
										<div
											onClick={() => {
												this.selectCity(c);
											}}
											styleName="option"
										>
											{c}
										</div>
									);
								})}
							</div>
						</div>
					)}
				</div>
			);
		}
	}
}

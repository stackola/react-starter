import React from "react";
import CSSModules from "react-css-modules";
import style from "./summary.less";
var months = {
	1: "January",
	2: "February",
	3: "March",
	4: "April",
	5: "May",
	6: "June",
	7: "July",
	8: "August",
	9: "September",
	10: "October",
	11: "November",
	12: "Becember"
};
@CSSModules(style, { allowMultiple: true, handleNotFoundStyleName: "log" })
export default class Summary extends React.Component {
	getNumBikes() {
		return this.props.build.volume * this.props.build.cities.length;
	}
	getOrderTime() {
		//365
		let start = this.props.build.startMonth;
		let end = this.props.build.endMonth;
		if (start && end) {
			if (start < end) {
				return end - start + 1;
			} else {
				return 12 - start + end + 1;
			}
		}
		return 0;
	}
	getStartDate() {
		let start = this.props.build.startMonth;
		var d = new Date();
		var n = d.getMonth();
		var y = d.getFullYear();
		n++;
		if (start <= n) {
			return months[start] + " " + (y + 1);
		} else {
			return months[start] + " " + y;
		}
	}
	getEndDate() {
		let start = this.props.build.startMonth;
		let end = this.props.build.endMonth;
		var d = new Date();
		var n = d.getMonth();
		var y = d.getFullYear();

		n++;
		if (start <= n) {
			if (start < end) {
				return months[end] + " " + (y + 1);
			} else {
				return months[end] + " " + (y + 1);
			}
		} else {
			if (start > end) {
				return months[end] + " " + (y + 1);
			} else {
				return months[end] + " " + y;
			}
		}
	}
	render() {
		return (
			<div styleName="summary">
				<div styleName="row">
					<div styleName="key">Model</div>
					<div styleName="value">{this.props.template.name}</div>
				</div>
				<div styleName="row">
					<div styleName="key">Städte</div>
					<div styleName="value">
						{this.props.build.cities.map(c => {
							return <div>{c}</div>;
						})}
					</div>
				</div>
				<div styleName="row">
					<div styleName="key">Anzahl Räder</div>
					<div styleName="value">
						{this.getNumBikes()}
					</div>
				</div>
				<div styleName="row">
					<div styleName="key">Buchungszeitraum</div>
					<div styleName="value">
						{this.getOrderTime()} Monate
						<div styleName="small">
							Beginn: {this.getStartDate()}
							<br />
							Ende: {this.getEndDate()}
							<br />
						</div>
					</div>
				</div>
				<div styleName="row">
					<div styleName="key">Addons</div>
					<div styleName="value">
						{this.props.options.addons.filter((a)=>{return this.props.build.addons[a.id]==true}).map((a)=>{
							return <div>{a.name}</div>
						})}
					</div>
				</div>
			</div>
		);
	}
}

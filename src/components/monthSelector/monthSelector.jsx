import React from "react";
import CSSModules from "react-css-modules";
import style from "./monthSelector.less";

@CSSModules(style, { allowMultiple: true, handleNotFoundStyleName: "log" })
class Month extends React.Component {
	render() {
		return (
			<div
				onClick={() => {
					this.props.onClick();
				}}
				styleName={"month " + (this.props.selected ? "selected " : "")}
			>
				<div styleName="circle">{this.props.month}</div>
			</div>
		);
	}
}

@CSSModules(style, { allowMultiple: true, handleNotFoundStyleName: "log" })
export default class MonthSelector extends React.Component {
	monthClicked(m) {
		if (this.props.is365){
			
				this.props.setStartMonth(m);
				let end=(m+11)%12;
				if (end==0){
					end=12;
				}
				this.props.setEndMonth(end);
				return;
			
		}
		else
		{
		if (!this.props.startMonth) {
			if (this.props.min==1){
				this.props.setStartMonth(m)
				this.props.setEndMonth(m)
				return;
			}else
			{

			this.props.setStartMonth(m);
			return;
			}
		}
		if (this.props.startMonth == m) {
			//do nothing.
			return;
		}
			if (this.getOrderTime(this.props.startMonth, m)>=this.props.min && this.getOrderTime(this.props.startMonth, m)<=this.props.max){
				this.props.setEndMonth(m);
			}
		
		}
	}
	getOrderTime(start, end) {
		if (start==end){
			return 1;
		}
		if (start && end) {
			if (start < end) {
				return end - start + 1;
			} else {
				return 12 - start + end + 1;
			}
		}
		return 0;
	}
	clear(){
		this.props.setStartMonth(null);
		this.props.setEndMonth(null);
	}
	isSelected(m){
		var start=this.props.startMonth;
		var end=this.props.endMonth;
		if (this.props.is365){
			return m==start;
		}else{

		if (start && end){
			//all in betweeen
			if (start<=end){
				return (m>=start && m<=end);
			}
			if (start>end){
				return (m>=start || m<=end);
			}
			return false;
		}
		else
		{
			return (m==this.props.startMonth);
		}
		}
	}
	render() {
		var months = {
			1: "JAN",
			2: "FEB",
			3: "MAR",
			4: "APR",
			5: "MAY",
			6: "JUN",
			7: "JUL",
			8: "AUG",
			9: "SEP",
			10: "OKT",
			11: "NOV",
			12: "DEZ"
		};
		var monthsArray = [];
		Object.keys(months).map(k => {
			monthsArray = [...monthsArray, months[k]];
		});
		return (
			<div styleName="monthSelector">
				{monthsArray.map((m, i) => {
					return (
						<Month
							month={m}
							onClick={() => {
								this.monthClicked(i + 1);
							}}
							selected={this.isSelected(i+1)}

						/>
					);
				})}
				{(this.props.startMonth && this.props.endMonth) ?
				(<div styleName="clearButton" onClick={()=>{this.clear()}}>Clear</div>):(<div styleName="clearButton">&nbsp;</div>)
				}
			</div>
		);
	}
}

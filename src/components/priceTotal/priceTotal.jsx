import React from 'react';
import CSSModules from 'react-css-modules';
import style from './priceTotal.less';

@CSSModules(style, {allowMultiple:true, handleNotFoundStyleName:'log'})
export default class PriceTotal extends React.Component{
	calcPrice() {
		var basePrice = parseInt(this.props.options.basePrice);
		var numBikes = this.getNumBikes();

		var orderTime = this.getOrderTime();

		// 365

		var price = basePrice * numBikes * orderTime;

		this.props.options.addons.map(a => {
			if (this.props.build.addons[a.id]) {
				console.log("addon selected",a);
				if (a.pricePerMonth && a.pricePerItem) {
					price += parseInt(a.price) * numBikes * orderTime;
				}
				if (a.pricePerMonth && !a.pricePerItem) {
					price += parseInt(a.price) * orderTime;
				}
				if (!a.pricePerMonth && a.pricePerItem) {
					price += parseInt(a.price) * numBikes;
				}
				if (!a.pricePerMonth && !a.pricePerItem) {
					price += parseInt(a.price);
				}
			}
		});
		
		// price = this.applyDiscount(numBikes, price).price;
		return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
	}
	getNumBikes(){
		return this.props.build.volume*this.props.build.cities.length;
	}

	getOrderTime(){
		//365
		let start = this.props.build.startMonth;
		let end =  this.props.build.endMonth;
		if (start && end){
			if (start<end){
				return end-start+1;
			}
			else{
				return 12-start+end+1;
			}
		}
		return 0;
	}

	render(){
		
		return (<div styleName="priceTotal">
				<div styleName="value">{this.calcPrice()},00€</div>
				<div styleName="text">Your price</div>
				<div styleName="spacer"/>
				<div styleName="value">{this.getNumBikes()}</div>
				<div styleName="text">Bikes</div>
			</div>);
	}
}

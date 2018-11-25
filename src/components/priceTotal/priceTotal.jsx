import React from "react";
import CSSModules from "react-css-modules";
import style from "./priceTotal.less";

@CSSModules(style, { allowMultiple: true, handleNotFoundStyleName: "log" })
export default class PriceTotal extends React.Component {
	calcPrice() {
		var basePrice = parseInt(this.props.options.basePrice);
		var numBikes = this.getNumBikes();

		var orderTime = this.getOrderTime();

		// 365
		if (this.props.is365) {
			orderTime = 1;
		}

		var price = basePrice * numBikes * orderTime;

		this.props.options.addons.map(a => {
			if (this.props.build.addons[a.id]) {
				//console.log("addon selected", a);
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

		price = this.applyDiscount(numBikes, price).price;
		return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
	}

	applyDiscount(bikes, price) {
		var discounts = this.props.options.discounts || [];

		discounts = discounts.sort((a, b) => {
			return a.min == b.min ? 0 : a.min < b.min ? -1 : 1;
		});
		discounts.reverse();
		for (var i = 0; i < discounts.length; i++) {
			var d = discounts[i];
			if (bikes >= d.min) {
				var dis = (100 - d.discount) / 100;
				return { price: Math.round(price * dis), discount: d.discount };
				break;
			}
		}

		return { price, discount: 0 };
	}
	getNumBikes() {
		return this.props.build.volume * this.props.build.cities.length;
	}

	getOrderTime() {
		//365
		let start = this.props.build.startMonth;
		let end = this.props.build.endMonth;
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

	render() {
		let discount = this.applyDiscount(this.getNumBikes(), 0).discount;
		return (
			<div styleName="priceTotal">
				<div styleName="value">{this.calcPrice()},00€</div>
				<div styleName="text">Ihr Preis</div>
				<div styleName="spacer" />
				<div styleName="value">{this.getNumBikes()}</div>
				<div styleName="text">Räder</div>
				
					<div>
						<div styleName="spacer" />
						<div styleName="value">{discount}%</div>
						<div styleName="text">Discount</div>
					</div>
				
			</div>
		);
	}
}

import React from "react";
import CSSModules from "react-css-modules";
import style from "./configurator.less";

import axios from "axios";

import { connect } from "react-redux";
import { ActionCreators } from "actions";
import { bindActionCreators } from "redux";

import CitySelector from "components/citySelector";
import OptionsEditor from "components/optionsEditor";
import PriceTotal from "components/priceTotal";
import Preview from "components/preview";
import BikeEditor from "components/bikeEditor";
import Summary from "components/summary";
import Form from "components/form";

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
	12: "December"
};


var settings = window.configurator_options;

@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(style, { allowMultiple: true, handleNotFoundStyleName: "log" })
class Configurator extends React.Component {
	constructor(p) {
		super(p);
		this.state = { step: 1, hasError: false, errorText: "",pdfUrl:"" };
		this.props.setSettings(settings);
		//console.log("setting");
	}
	stepOneFinished() {
		let b = this.props.build;
		//365
		if (this.is365()) {
			return b.volume > 0 && b.startMonth;
		}
		return b.volume > 0 && b.startMonth && b.endMonth;
	}
	is365() {
		return (
			this.props.settings.templates &&
			this.props.settings.templates[0] &&
			this.props.settings.templates[0].options.orderTime.nextBike365
		);
	}
	calcPrice() {
		let options = this.props.settings.templates[0].options;
		var basePrice = parseInt(options.basePrice);
		var numBikes = this.getNumBikes();

		var orderTime = this.getOrderTime();

		// 365
		if (this.props.is365) {
			orderTime = 1;
		}

		var price = basePrice * numBikes * orderTime;

		options.addons.map(a => {
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
		let ret = {
			before: price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
		};
		price = this.applyDiscount(numBikes, price).price;
		ret.after = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		ret.discount = this.applyDiscount(numBikes, price).discount;
		return ret;
	}
	getOrderTime() {
		//365
		let start = this.props.build.startMonth;
		let end = this.props.build.endMonth;
		if (start == end) {
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
				return months[end] + " " + (y + 2);
			}
		} else {
			if (start > end) {
				return months[end] + " " + (y + 1);
			} else {
				return months[end] + " " + y;
			}
		}
	}
	applyDiscount(bikes, price) {
		let options = this.props.settings.templates[0].options;
		var discounts = options.discounts || [];

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
	submit() {
		let url = window.ajaxUrl + "?action=nbc_submit";
		this.setState({ hasError: false }, () => {
			let formOk = this.isFormValid();
			if (formOk) {
				///post
				axios
					.post(url, {
						build: this.props.build,
						settings: this.props.settings,
						template: this.props.settings.templates[0],
						price: this.calcPrice(),
						orderTime:{num:this.getOrderTime(), start:this.getStartDate(), end:this.getEndDate()},
						addons: this.props.settings.templates[0].options.addons.filter((a)=>{return this.props.build.addons[a.id]==true}).map((a)=>{return a.name}),
						forms:this.props.settings.forms.map((f)=>{
							return {label:f.name, value:this.props.build.inputs[f.id]||""}
						})
					})
					.then(res => {
						//console.log(res);
						this.setState({ hasError: !formOk, step: 4, pdfUrl:res.data.pdf });
					});
				
			}
		});
	}
	isFormValid() {
		let forms = this.props.settings.forms;
		let inputs = this.props.build.inputs;
		//console.log(forms, inputs);
		let okay = true;
		forms.map(f => {
			if (f.required) {
				if (!inputs[f.id]) {
					okay = false;
				}
			}
		});
		return okay;
	}
	componentDidMount() {}
	render() {
		if (this.props.settings.templates && this.props.settings.templates[0]) {
			if (
				!this.props.build.cities ||
				this.props.build.cities.length == 0
			) {
				return (
					<div styleName="wrapper">
						<h1>Ihre Kampagne!!</h1>
						<CitySelector
							available={this.props.settings.templates[0].cities.split(
								"\n"
							)}
							build={this.props.build}
							selectCity={c => {
								this.props.selectCity(c);
							}}
							selected={this.props.build.cities}
							removeCity={c => {
								this.props.removeCity(c);
							}}
						/>
					</div>
				);
			} else {
				if (this.state.step == 1) {
					return (
						<div styleName="split">
							<div styleName="left">
								<h1>Ihre Kampagne</h1>
								<CitySelector
									available={this.props.settings.templates[0].cities.split(
										"\n"
									)}
									build={this.props.build}
									selectCity={c => {
										this.props.selectCity(c);
									}}
									selected={this.props.build.cities}
									removeCity={c => {
										this.props.removeCity(c);
									}}
								/>
								<PriceTotal
									options={
										this.props.settings.templates[0].options
									}
									build={this.props.build}
									is365={this.is365()}
								/>
							</div>
							<div styleName="right">
								<h1>Ihr Setup</h1>
								<OptionsEditor
									is365={this.is365()}
									settings={this.props.settings.templates[0]}
								/>
								<div styleName="buttons">
									<div
										styleName={
											"button " +
											(this.stepOneFinished()
												? "blue "
												: "disabled ")
										}
										onClick={() => {
											if (this.stepOneFinished()) {
												this.setState({ step: 2 });
											}
										}}
									>
										Weiter
									</div>
								</div>
							</div>
						</div>
					);
				}

				if (this.state.step == 2) {
					return (
						<div styleName="split">
							<div styleName="left">
								<h1>Ihre Räder</h1>
								<Preview
									image={
										this.props.settings.templates[0]
											.images[0]
									}
									build={this.props.build}
									key={2}
									render={false}
								/>
								<PriceTotal
									options={
										this.props.settings.templates[0].options
									}
									is365={this.is365()}
									build={this.props.build}
								/>
							</div>
							<div styleName="right">
								<h1>Konfiguration</h1>
								<BikeEditor />
								<div styleName="buttons">
									<div
										styleName={"button white space"}
										onClick={() => {
											this.setState({ step: 1 });
										}}
									>
										Zurück
									</div>
									<div
										styleName={"button blue"}
										onClick={() => {
											this.setState({ step: 3 });
										}}
									>
										Weiter
									</div>
								</div>
							</div>
						</div>
					);
				}
				if (this.state.step == 3) {
					return (
						<div styleName="split">
							<div styleName="left">
								<h1>Ihre Kampagne</h1>
								<Preview
									image={
										this.props.settings.templates[0]
											.images[0]
									}
									build={this.props.build}
									key={1}
									render={true}
									onRender={(r)=>{this.props.setRender(r)}}
								/>
								<PriceTotal
									options={
										this.props.settings.templates[0].options
									}
									build={this.props.build}
									is365={this.is365()}
								/>
							</div>
							<div styleName="right">
								<h2>Zusammenfassung</h2>
								<Summary
									options={
										this.props.settings.templates[0].options
									}
									template={this.props.settings.templates[0]}
									is365={this.is365()}
									build={this.props.build}
								/>
								<h2>Ihre Daten</h2>
								<Form
									forms={this.props.settings.forms}
									inputs={this.props.build.inputs}
									setInputs={i => {
										this.props.setInputs(i);
									}}
								/>
								{this.state.hasError && (
									<div styleName="formError">
										Please fill out all the required fields.
									</div>
								)}
								<div styleName="buttons">
									<div
										styleName={"button white space"}
										onClick={() => {
											this.setState({ step: 2 });
										}}
									>
										Zurück
									</div>

									<div
										styleName={
											"button " +
											(this.isFormValid()
												? "blue "
												: "disabled ")
										}
										onClick={() => {
											if (this.isFormValid()) {
												this.submit();
											}
										}}
									>
										Anfragen
									</div>
								</div>
							</div>
						</div>
					);
				}
				if (this.state.step == 4) {
					return (
						<div styleName="split">
							<div styleName="left">
								<h1>Ihre Kampagne</h1>
								<Preview
									image={
										this.props.settings.templates[0]
											.images[0]
									}
									build={this.props.build}
								/>
								<PriceTotal
									options={
										this.props.settings.templates[0].options
									}
									build={this.props.build}
									is365={this.is365()}
								/>
							</div>
							<div styleName="right">
								<h2>Vielen dank</h2>
								<div styleName="thankYou">
									Danke für Ihre Anfrage. Wir melden uns
									schnellstmöglich bei Ihnen.
									<div styleName="pdfDownload">
									<a target="_blank" href={this.state.pdfUrl}>Sie können hier eine Kopie Ihres Auftrages herunterladen.</a>
									</div>
								</div>
							</div>
						</div>
					);
				}
			}
		}

		return <div>Loading</div>;
	}
}

//Make state available as props
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
export default Configurator;

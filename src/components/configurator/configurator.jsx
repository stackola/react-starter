import React from "react";
import CSSModules from "react-css-modules";
import style from "./configurator.less";

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

var settings = {
	templates: [
		{
			name: "Your Campaign",
			id: 1,
			images: [
				{
					id: 19,
					url:
						"https://nextbike2.000webhostapp.com/wp-content/uploads/2018/08/0073_Slider_Visa-1.png",
					crop: {
						x: 14.536082474226806,
						y: 31.666666666666668,
						width: 26.185567010309278,
						height: 25.666666666666664
					}
				}
			],
			color: {
				hsl: {
					h: 212.3684210526316,
					s: 0.7238095238095237,
					l: 0.5882352941176471,
					a: 1
				},
				hex: "#4a90e2",
				rgb: { r: 74, g: 144, b: 226, a: 1 },
				hsv: {
					h: 212.3684210526316,
					s: 0.6725663716814159,
					v: 0.8862745098039215,
					a: 1
				},
				oldHue: 250,
				source: "hex"
			},
			options: {
				basePrice: "39",
				orderVolume: { min: 1, max: "1000" },
				orderTime: { min: "1", max: "12", nextBike365: false },
				voucherValue: { min: "1", max: 10000 },
				addons: [
					{
						id: 1,
						name: "First 15 min for free",
						price: "7",
						pricePerItem: true,
						pricePerMonth: true,
						info: "Customers can ride the first 15 min for free."
					},
					{
						id: 2,
						name: "In-App Advertising",
						price: "0",
						pricePerItem: false,
						pricePerMonth: false,
						info:
							"Your campaign is getting digital enhanced with XYZ"
					}
				],
				discounts: [{ min: "10", discount: "15" }]
			},
			image:
				"https://nextbike2.000webhostapp.com/wp-content/uploads/2018/08/Smart_Bike-1.png",
			cities:
				"Innsbruck\nKlagenfurt\nM\u00f6dling\nNeusiedler See\nSt. P\u00f6lten\nvarious other regions across Nieder\u00f6sterreich and Burgenland\nWachau\nBanja Luka\nSarajevo\nTuzla\nVictoria\nBrinje\nGospic\nKarlovac\nKlis\nLastovo\nMakarska\nPorec\nSibenik\nSlawonski Brod\nSplit\nVukovar\nZadar\nZagreb\nLimassol\nTallinn\nTurku\nAugsburg\nBensheim\nBerlin\nBochum\nBottrop\nBremen\nB\u00fcrstadt\nDortmund\nDossenheim\nDresden\nDuisburg\nD\u00fcsseldorf\nEssen\nFlensburg\nFrankenthal\nFrankfurt\nGelsenkirchen\nGie\u00dfen\nG\u00fctersloh\nHamburg\nHamm\nHanau\nHannover\nHeddesheim\nHeidelberg\nHeppenheim\nHerne\nHockenheim\nKaiserslautern\nKarlsruhe\nKassel\nKoblenz\nK\u00f6ln\nLadenburg\nLeipzig\nLudwigshafen\nMagdeburg\nMannheim\nMarburg\nM\u00fclheim an der Ruhr\nM\u00fcnchen\nM\u00fcnchen Region (20 cities)\nNorderstedt\nN\u00fcrnberg\nOberhausen\nOffenburg\nPotsdam\nQuickborn\nR\u00fcsselsheim\nSchwetzingen\nSpeyer\nStuttgart Region (15 cities)\nT\u00fcbingen\nUsedom\nWeinheim\nWiesbaden\nWorms\nW\u00fcrzburg\nBudapest\nBhopal\nDelhi NDMC\nHyderabad\nVijayawada\nJurmala\nRiga\nByblos\ndiverse municipalities\nDordrecht\nMaastricht\nAuckland\nChristchurch\nBialystok\nCzestochowa\nF\u00f6li Fillarit\nGliwicze\nGrodzisk Mazowiecki\nJastrzebski\nJuchnowicz Koscielny\nKalisz\nKatowice\nKolberg\nKonstancin Jeziorna\nKozle\nLegnica\nLodz\nLublin\nMichalowicze\nOpole\nOstrow\nPoznan\nPruszkow\nPszczyna\nRadom\nSczeczin\nSiedlce\nSosnowiec\nStalova Wola\nSzamotuly\nTychy\nWarsaw\nWroclaw\nZgiercz\nKing Abdullah Economic City\nNitra\nLas Palmas\nHergiswil\nHorw\nLuzern\nStans\nStansstad\nSursee\nKonya\nOrdu\nDubai\nRas Al Khaimah\nSharjah\nLviv\nBath\nBelfast\nCardiff\nExeter\nGlasgow\nMilton Keynes\nStirling\nUniversity of Warwick\nHoboken\nHudson County, NJ\nKent State University\nPittsburgh\nWest Palm Beach"
		},
		{
			name: "NextBike 365",
			id: 2,
			images: [
				{
					id: 19,
					url:
						"https://nextbike2.000webhostapp.com/wp-content/uploads/2018/08/0073_Slider_Visa-1.png",
					crop: {
						x: 10,
						y: 26.666666666666657,
						width: 35.46391752577319,
						height: 33.33333333333334
					}
				},
				{
					id: 29,
					url:
						"https://nextbike2.000webhostapp.com/wp-content/uploads/2018/08/ECObike_riding_City_transparentes_Adpaneltest.png",
					crop: {
						x: 55.96129131801237,
						y: 59.866668701171896,
						width: 24.111675126903556,
						height: 21.333333333333336
					}
				}
			],
			color: { hex: "#004a99" },
			options: {
				basePrice: "365",
				orderVolume: { min: 1, max: "1000" },
				orderTime: { min: 1, max: 36, nextBike365: true },
				voucherValue: { min: 0, max: 10000 },
				addons: [
					{
						id: 1,
						name: "App-Werbung",
						price: "200",
						pricePerItem: false,
						pricePerMonth: false
					},
					{
						id: 2,
						name: "Rahmen in Firmenfarbe",
						price: "50",
						pricePerItem: true,
						pricePerMonth: false
					},
					{
						id: 3,
						name: "XYZ",
						price: "28",
						pricePerItem: false,
						pricePerMonth: false
					}
				]
			},
			image:
				"https://nextbike2.000webhostapp.com/wp-content/uploads/2018/08/Smart_Bike-1-1.png",
			cities:
				"Innsbruck\nKlagenfurt\nM\u00f6dling\nNeusiedler See\nSt. P\u00f6lten\nvarious other regions across Nieder\u00f6sterreich and Burgenland\nWachau\nBanja Luka\nSarajevo\nTuzla\nVictoria\nBrinje\nGospic\nKarlovac\nKlis\nLastovo\nMakarska\nPorec\nSibenik\nSlawonski Brod\nSplit\nVukovar\nZadar\nZagreb\nLimassol\nTallinn\nTurku\nAugsburg\nBensheim\nBerlin\nBochum\nBottrop\nBremen\nB\u00fcrstadt\nDortmund\nDossenheim\nDresden\nDuisburg\nD\u00fcsseldorf\nEssen\nFlensburg\nFrankenthal\nFrankfurt\nGelsenkirchen\nGie\u00dfen\nG\u00fctersloh\nHamburg\nHamm\nHanau\nHannover\nHeddesheim\nHeidelberg\nHeppenheim\nHerne\nHockenheim\nKaiserslautern\nKarlsruhe\nKassel\nKoblenz\nK\u00f6ln\nLadenburg\nLeipzig\nLudwigshafen\nMagdeburg\nMannheim\nMarburg\nM\u00fclheim an der Ruhr\nM\u00fcnchen\nM\u00fcnchen Region (20 cities)\nNorderstedt\nN\u00fcrnberg\nOberhausen\nOffenburg\nPotsdam\nQuickborn\nR\u00fcsselsheim\nSchwetzingen\nSpeyer\nStuttgart Region (15 cities)\nT\u00fcbingen\nUsedom\nWeinheim\nWiesbaden\nWorms\nW\u00fcrzburg\nBudapest\nBhopal\nDelhi NDMC\nHyderabad\nVijayawada\nJurmala\nRiga\nByblos\ndiverse municipalities\nDordrecht\nMaastricht\nAuckland\nChristchurch\nBialystok\nCzestochowa\nF\u00f6li Fillarit\nGliwicze\nGrodzisk Mazowiecki\nJastrzebski\nJuchnowicz Koscielny\nKalisz\nKatowice\nKolberg\nKonstancin Jeziorna\nKozle\nLegnica\nLodz\nLublin\nMichalowicze\nOpole\nOstrow\nPoznan\nPruszkow\nPszczyna\nRadom\nSczeczin\nSiedlce\nSosnowiec\nStalova Wola\nSzamotuly\nTychy\nWarsaw\nWroclaw\nZgiercz\nKing Abdullah Economic City\nNitra\nLas Palmas\nHergiswil\nHorw\nLuzern\nStans\nStansstad\nSursee\nKonya\nOrdu\nDubai\nRas Al Khaimah\nSharjah\nLviv\nBath\nBelfast\nCardiff\nExeter\nGlasgow\nMilton Keynes\nStirling\nUniversity of Warwick\nHoboken\nHudson County, NJ\nKent State University\nPittsburgh\nWest Palm Beach"
		}
	],
	selectedTemplate: 1,
	email: "barth@nextbike.com",
	messages: {
		einstieg: "Choose a bike type",
		"St\u00e4dte Headline": "Cities",
		"Stadt Hinzuf\u00fcgen": "Add city",
		"Stadt Verf\u00fcgbarkeit Warnung":
			"Cities with * are possibly available in the future",
		"Basis Preis": "Basic price",
		Buchungszeitraum: "Booking period",
		"Addons Headline": "Addons",
		"Zusammenfassung Text":
			"Thanks for your inquiry. We will be shortly back.",
		"Zusammenfassung Headline": "Summary of your request:",
		"Nach Absenden": "Thanks for your interest in our products "
	},
	forms: [
		{ name: "First name", type: "text", required: true, id: 1 },
		{ name: "Surname", type: "text", required: true, id: 2 },
		{ name: "E-mail", type: "text", required: true, id: 3 },
		{ name: "Company", type: "text", required: true, id: 4 },
		{ name: "Telephone number", type: "text", required: true, id: 5 }
	],
	showNoti: false
};

@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(style, { allowMultiple: true, handleNotFoundStyleName: "log" })
class Configurator extends React.Component {
	constructor(p) {
		super(p);
		this.state = { step: 1 };
		this.props.setSettings(settings);
		console.log("setting");
	}
	stepOneFinished() {
		let b = this.props.build;
		//365
		return b.volume > 0 && b.startMonth && b.endMonth;
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
						<h1>Your Campaign</h1>
						<CitySelector
							available={this.props.settings.templates[0].cities.split(
								"\n"
							)}
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
								<h1>Your Campaign</h1>
								<CitySelector
									available={this.props.settings.templates[0].cities.split(
										"\n"
									)}
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
								/>
							</div>
							<div styleName="right">
								<h1>Your Setup</h1>
								<OptionsEditor
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
								<h1>Your Campaign</h1>
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
								/>
							</div>
							<div styleName="right">
								<h1>Configuration</h1>
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
								<h1>Your Campaign</h1>
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
								/>
							</div>
							<div styleName="right">
								<h2>Summary</h2>
								<Summary options={
										this.props.settings.templates[0].options
									}
									template={this.props.settings.templates[0]}
									build={this.props.build}/>
								<h2>Your Contact</h2>
								<Form forms={this.props.settings.forms} inputs={this.props.build.inputs} setInputs={(i)=>{this.props.setInputs(i)}}/>
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
										styleName={"button blue"}
										onClick={() => {}}
									>
										Anfragen
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

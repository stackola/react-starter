import React from 'react';
import CSSModules from 'react-css-modules';
import style from './fontPicker.less';

var fonts = [
	"Arial",
	"Arial Black",
	"Helvetica",
	"Times New Roman",
	"Courier New",
	"Verdana",
	"Georgia",
	"Garamond",
	"Comic Sans MS",
	"Trebuchet MS"
];

@CSSModules(style, {allowMultiple:true, handleNotFoundStyleName:'log'})
export default class FontPicker extends React.Component{
	constructor(p) {
		super(p);
		this.state = { selectorOpen: false };
	}
	toggleOpen(cb) {
		this.setState({ selectorOpen: !this.state.selectorOpen }, () => {
			if (cb) {
				cb();
			}
		});
	}

	selectFont(f) {
		this.toggleOpen(() => {
			this.props.setFont(f);
		});
	}
	render(){
		return (<div styleName="fontPicker">

				{this.state.selectorOpen ? (
					fonts.map(f => {
						return (
							<div
								key={f}
								styleName={
									"selectableFont " +
									(f == this.props.font ? "selected" : "")
								}
								onClick={() => {
									this.selectFont(f);
								}}
								style={{ fontFamily: f }}
							>
								{this.props.previewText ? (
									<div styleName="previewFont">
										<div styleName="previewSelectionText">{this.props.previewText}</div>
										<div>{f}</div>
									</div>
								) : (
									f
								)}
							</div>
						);
					})
				) : (
					<div
						styleName={"selectableFont picked"}
						onClick={() => {
							this.toggleOpen();
						}}
						style={{ fontFamily: this.props.font }}
					>
						{this.props.font}
					</div>
				)}

			</div>);
	}
}

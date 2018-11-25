import React from "react";
import CSSModules from "react-css-modules";
import style from "./colorPicker.less";

@CSSModules(style, { allowMultiple: true, handleNotFoundStyleName: "log" })
export default class ColorPicker extends React.Component {
	constructor(p){
		super(p);
		this.state={input:''};
	}
	componentDidMount() {
		this.setState({input:this.props.color});
	}
	onChange(t){
		if (t==""){
			this.setState({input:'#'});
			return;
		}
		this.setState({input:t},()=>{

		if (/^#(?:[0-9a-f]{3}){1,2}$/i.test(t)){
			this.props.setColor(this.state.input);
		}
		});
	}
	render() {
		let colors = [
			"#de2b2b",
			"#fdc279",
			"#fcca00",
			"#de2b90",
			"#972bde",
			"#78b3f8",
			"#004a99",
			"#2bd8de",
			"#2bde6d",
			"#d2de2b",
			"#b8d18e",
			"#b7b7b7",
			"#212121",
			"#fff",
		];
		return (
			<div styleName={"colorPicker "+(this.props.condensed?"condensed ":' ')}>
				<div styleName="colors">
					{colors.map(c => {
						return (
							<div
								onClick={() => {
									this.onChange(c);
								}}
								styleName="color"
								style={{ background: c }}
							/>
						);
					})}
				</div>
				<div styleName="hexContainer">
				<span styleName="hexLabel">HEX</span> <input type="text" onChange={(e)=>this.onChange(e.target.value)} styleName="hex" value={this.state.input}/>
				</div>
			</div>
		);
	}
}

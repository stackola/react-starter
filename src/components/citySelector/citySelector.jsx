import React from "react";
import CSSModules from "react-css-modules";
import style from "./citySelector.less";

import CityDropdown from "components/cityDropdown";

@CSSModules(style, { allowMultiple: true, handleNotFoundStyleName: "log" })
export default class CitySelector extends React.Component {
	render() {
		return (
			<div styleName="citySelector">
				<img
					styleName="map"
					src="img/itd_vectors_mini_map.png"
					alt=""
				/>
				<div styleName="dropDownHolder">
					<CityDropdown selected={this.props.selected} removeCity={(c)=>{this.props.removeCity(c)}} available={this.props.available} selectCity={(c)=>{this.props.selectCity(c)}}/>
				</div>
			</div>
		);
	}
}

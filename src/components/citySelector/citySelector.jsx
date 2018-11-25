import React from "react";
import CSSModules from "react-css-modules";
import style from "./citySelector.less";

import CityDropdown from "components/cityDropdown";

@CSSModules(style, { allowMultiple: true, handleNotFoundStyleName: "log" })
export default class CitySelector extends React.Component {
	render() {
		let marker1 = "http://www.nextbike.net/wp-content/uploads/2018/11/itd_vectors_nextbike_map_marker.png";
		let marker2 = "http://www.nextbike.net/wp-content/uploads/2018/11/itd_vectors_nextbike_map_marker_ad.png";
		var marker = marker1;
		if (
			this.props.build &&
			this.props.build.addons &&
			Object.keys(this.props.build.addons)
				.map(k => {
					return this.props.build.addons[k];
				})
				.filter(o => {
					return o == true;
				}).length > 0
		) {
			marker = marker2;
		}
		return (
			<div styleName="citySelector">
				<div styleName="circWrap">
					<img
						styleName="map"
						src="http://www.nextbike.net/wp-content/uploads/2018/11/itd_vectors_mini_map.png"
						alt=""
					/>
					{this.props.build && this.props.build.volume > 0 &&<img styleName="marker m1" src={marker} alt="" />}
					{this.props.build && this.props.build.volume > 50 &&<img styleName="marker m2" src={marker} alt="" />}
					{this.props.build && this.props.build.volume > 150 &&<img styleName="marker m3" src={marker} alt="" />}
					{this.props.build && this.props.build.volume > 400 &&<img styleName="marker m4" src={marker} alt="" />}
					{this.props.build && this.props.build.volume > 600 &&<img styleName="marker m5" src={marker} alt="" />}
					{this.props.build && this.props.build.volume > 800 &&<img styleName="marker m6" src={marker} alt="" />}
				</div>
				<div styleName="dropDownHolder">
					<CityDropdown
						selected={this.props.selected}
						removeCity={c => {
							this.props.removeCity(c);
						}}
						available={this.props.available}
						selectCity={c => {
							this.props.selectCity(c);
						}}
					/>
				</div>
			</div>
		);
	}
}

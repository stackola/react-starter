import React from "react";
import CSSModules from "react-css-modules";
import style from "./imageEditor.less";
import FA from "react-fontawesome";
import axios from "axios";

import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";

@CSSModules(style, { allowMultiple: true, handleNotFoundStyleName: "log" })
export default class ImageEditor extends React.Component {
	constructor(p) {
		super(p);
		this.state = { loading: false };
	}
	fileSelected(e) {
		var selectedFile = e.target.files[0];
		//console.log(selectedFile);
		const formData = new FormData();
		formData.append("image", selectedFile, selectedFile.name);
		this.setState({ loading: true }, () => {
			axios
				.post(window.ajaxUrl + "?action=nbc_upload_image", formData)
				.then(res => {
					//console.log(res);
					this.setState({ loading: false }, () => {
						if (res.data.error) {
							alert(res.data.error);
						} else {
							//console.log("gut", res.data);
							this.props.setImageUrl(res.data.url);
							//this.addImage(res.data.url);
						}
					});
				});
		});
	}
	render() {
		return (
			<div styleName="imageEditor">
				{this.props.image.url ? (
					<div>
						<div styleName="controlContainer slider">
							<div styleName="label">
								<div styleName="label">
									<FA name="expand-arrows-alt" />
								</div>
							</div>
							<Slider
								min={0}
								max={200}
								value={this.props.image.size}
								onChange={v => {
									this.props.setImageSize(v);
								}}
							/>
						</div>

						<div styleName="controlContainer slider">
							<div styleName="label">
								<FA name="arrows-alt-v" />
							</div>
							<Slider
								min={-100}
								max={100}
								value={this.props.image.position.top}
								onChange={v => {
									this.props.setImagePosition({
										top: v,
										left: this.props.image.position.left
									});
								}}
							/>
						</div>
						<div styleName="controlContainer slider">
							<div styleName="label">
								<FA name="arrows-alt-h" />
							</div>

							<Slider
								min={-100}
								max={100}
								value={this.props.image.position.left}
								onChange={v => {
									this.props.setImagePosition({
										top: this.props.image.position.top,
										left: v
									});
								}}
							/>
						</div>
						<div styleName="controlContainer">
							<div styleName="removePicture" onClick={()=>{this.props.setImageUrl(null)}}>
								Bild löschen <FA name="times"/>
							</div>
						</div>
					</div>
				) : (
					<label style={{ marginBottom: 0, fontWeight: 400 }}>
					<div styleName="uploadButton">
					HOCHLADEN <FA name="camera" />
					</div>
						<input
							type="file"
							onChange={e => {
								this.fileSelected(e);
							}}
							style={{ display: "none" }}
						/>
					</label>
						
				)}
			</div>
		);
	}
}

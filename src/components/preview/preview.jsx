import React from "react";
import html2canvas from "html2canvas";
import CSSModules from "react-css-modules";
import style from "./preview.less";

import TextComponent from "components/textComponent";
import ImageComponent from "components/imageComponent";

@CSSModules(style, { allowMultiple: true, handleNotFoundStyleName: "log" })
export default class Preview extends React.Component {
	constructor(p) {
		super(p);
		this.state = { containerWidth: 500, loading: false };
	}
	componentDidMount() {
		this.updateDimensions();
		/*if (this.props.displayOnly) {
			//render image!
			html2canvas(this.wrapperRef).then(canvas => {
				this.addRender(canvas.toDataURL());
			});
		}
		*/
		window.addEventListener("resize", () => {
			this.updateDimensions();
		});
		if (this.props.render){
			html2canvas(this.ref).then(canvas => {
				this.props.onRender(canvas.toDataURL());
			});
		}
	}

	updateDimensions() {
		if (this.wrapperRef) {
			this.setState(
				{
					...this.state,
					containerWidth: this.wrapperRef.offsetWidth
				},
				() => {
					//console.log("width set to ", this.state.containerWidth);
				}
			);
		}
	}
	render() {
		let image = this.props.image;
		let crop = this.props.image.crop;
		return (
			<div
				styleName="preview"
				
			>
				<div
					styleName="imgWrapper"
					ref={ref => {
						this.ref = ref;
					}}
					style={{ background: this.props.build.color || "#004a99" }}
				>
					<img styleName="nbEditorImage" src={this.props.image.url} />
					<div
						styleName="objectsContainer"
						style={{
							top: crop.y + "%",
							left: crop.x + "%",
							width: crop.width + "%",
							height: crop.height + "%"
						}}
					>
						<ImageComponent data={this.props.build.image} />
						<TextComponent
							containerWidth={this.state.containerWidth}
							text={this.props.build.text}
						/>
					</div>
				</div>
			</div>
		);
	}
}

/*

*/

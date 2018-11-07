import React from 'react';
import CSSModules from 'react-css-modules';
import style from './preview.less';

@CSSModules(style, {allowMultiple:true, handleNotFoundStyleName:'log'})
export default class Preview extends React.Component{
	constructor(p){
		super(p);
		this.state={ containerWidth: 500, loading: false };
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
	}

	updateDimensions() {
		if (this.wrapperRef) {
			this.setState({
				...this.state,
				containerWidth: this.wrapperRef.offsetWidth
			},()=>{console.log("width set to ", this.state.containerWidth)});
		
	}
	}
	render(){
		let image = this.props.image;
		let crop = this.props.image.crop;
		return (<div styleName="preview">
				<div
					styleName="imgWrapper"
					ref={ref => {
						this.wrapperRef = ref;
					}}
					style={{ background: this.props.build.color||'#fff'}}
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
					
					</div>
				</div>
			</div>);
	}
}


/*

*/
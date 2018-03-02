import React from 'react';
import RatingBar from './ratingBar.jsx';
export default class RatingWrapper extends React.Component{

	render(){
		return (
			<div className="ratingWrapper">
				<div className="ratingBarDescription">{this.props.name?this.props.name:""}</div>
				<RatingBar needs={this.props.needs} has={this.props.has} min={this.props.min?this.props.min:0} max={this.props.max?this.props.max:5}/>
			</div>
		);
	}
}
import React from 'react';

export default class RatingBar extends React.Component{

	render(){
		var {min, max, has, needs} = this.props;
		var blocks = [];

		for (var i = 0; i<max; i++){
			var color="";
			if (has>i){
				color="green";
				if (i>=needs){
					color="blue";
				}
			}

			else
			{
				if (i<needs){
					color="red";
				}
			}

			blocks.push(<div className={"block "+color}></div>);
		}

		return (
			<div className="ratingBar">
				{blocks}
			</div>
		);
	}
}
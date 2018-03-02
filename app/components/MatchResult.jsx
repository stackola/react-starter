import React from 'react';
import RatingWrapper from './ratingWrapper.jsx';
export default class MatchResult extends React.Component{

	render(){
		return (
			<div className={"matchResult " + (this.props.mini?'mini':'')}>
				<div className="name">
					{this.props.data.name}
					<div className="pullRight">
						Opox-Score™: <span className="opoxScore">{this.props.data.score}</span>
					</div>
				</div>
				<div className="matches">
					<div className="good">
						Best match:
						{this.props.data.best.map(r=>{
							return <RatingWrapper name={r.name} has={r.has} needs={r.needs}/>
						})}
					</div>
					<div className="bad">
						Worst match:
						{this.props.data.worst.map(r=>{
							return <RatingWrapper name={r.name} has={r.has} needs={r.needs}/>
						})}
					</div>
				</div>
			</div>
		);
	}
}
import React from 'react';

export default class InputField extends React.Component{

	render(){
		return (<input type="text" value={this.props.value} onChange={(e)=>{this.props.onChange(e)}}/>);
	}
}
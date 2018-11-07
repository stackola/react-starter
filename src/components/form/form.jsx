import React from 'react';
import CSSModules from 'react-css-modules';
import style from './form.less';

@CSSModules(style, {allowMultiple:true, handleNotFoundStyleName:'log'})
class Elem extends React.Component{
render (){
	let props=this.props;
	return (
		<div styleName="formRow">
			<div styleName="formLabel">
				{props.data.name} {props.data.required ? "" : "*"}
			</div>
			<input
				value={props.value || ""}
				onChange={e => {
					//this.setState({ name: e.target.value });
					props.updateElement(props.data.id, e.target.value);
				}}
				type={props.data.type}
			/>
		</div>
	);
}
}

@CSSModules(style, {allowMultiple:true, handleNotFoundStyleName:'log'})
export default class Form extends React.Component{
	updateElement(id, value) {
		var inputs = this.props.inputs;
		inputs[id]=value;
		this.props.setInputs(inputs);
	}
	render() {
		return (
			<div styleName="forms">
				{this.props.forms &&
					this.props.forms.map(f => {
						return (
							<Elem
								key={f.name}
								data={f}
								value={this.props.inputs[f.id]||""}
								updateElement={(id, value) => {
									this.updateElement(id, value);
								}}
							/>
						);
					})}
			</div>
		);
	}
}
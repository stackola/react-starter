import React, { Component } from 'react';
import CSSModules from 'react-css-modules';

import InputField from 'components/inputField';
import Header from 'components/header';
import style from './style.less';


@CSSModules(style, { allowMultiple: true, handleNotFoundStyleName: 'log' })
class AppContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {name:'Jan',};
	}
	componentDidMount() {
		console.log("Hi");
	}
	onMsg(zahl){
		this.setState({zahl});
	}
	changeName(name) {
		this.setState({name});
	}
	
	
	render() {
		return (
			<div styleName='main'>
				<Header/>
				<Header myFunc={(name)=>{this.changeName(name)}} name={this.state.name}/>
			</div>
		);
	}
}


export default AppContainer;

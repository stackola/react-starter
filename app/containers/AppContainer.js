import React, { Component } from 'react';
import {connect} from 'react-redux';
import {ActionCreators} from '../actions';
import { bindActionCreators } from 'redux';


class AppContainer extends Component<{}> {
	constructor(props){
		super(props)
		//initialize local state
		this.state={input:''};
	}	
	componentDidMount(){

	}
	changeInput(i){
		console.log(i);
		this.setState({...this.state, input:i});
	}
	setUsername(){
		//push new username currently held in local state to redux store
		this.props.setUsername(this.state.input);
		//Alternatively, you can use 
		//this.props.setUserObject({username:input});
		//check actions/user.js
	}
	render(){
		//We can access the redux store via our props. The available variables are defined in mapStateToProps() in this file
		return (<div>
			{this.props.user.username}
			<br/>
			<input type="text" value={this.state.input} onChange={(e)=>{this.changeInput(e.target.value)}}/>
			<br/>
			<button onClick={()=>{this.setUsername()}}>Set Username</button>
			</div>);
	}
}



	//Make state available as props
	function mapStateToProps(state){
		return {
			user:state.user,
		}
	}

//Make actions available as functions in props
function mapDispatchToProps(dispatch){
	return bindActionCreators(ActionCreators, dispatch);
}

//Connect to navigation, redux and export
export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
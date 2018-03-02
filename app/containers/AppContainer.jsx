import React, { Component } from 'react';
import {connect} from 'react-redux';
import {ActionCreators} from '../actions';
import { bindActionCreators } from 'redux';


import InputField from '../components/inputField.js';
import MatchResult from '../components/MatchResult.jsx';
var matches = [
  {
  	name:"Angelika Krause", score:76,
	best:[
		{name:'C#', has:5, needs:5},
		{name:'Javascript', has:5, needs:4},
		{name:'COBOL', has:4, needs:5},
	],
	worst:[
		{name:'MySQL', has:0, needs:5},
		{name:'PHP', has:1, needs:5},
		{name:'Nodejs', has:0, needs:4},
	]
  },
  {
  	name:"Peter Liesel", score:73,
	best:[
		{name:'Nodejs', has:5, needs:5},
		{name:'C#', has:4, needs:5},
		{name:'COBOL', has:4, needs:5},
	],
	worst:[
		{name:'MySQL', has:0, needs:5},
		{name:'Nodejs', has:0, needs:3},
		{name:'PHP', has:1, needs:5},
	]
  }
];


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
		
		//Clear input field
		this.setState({...this.state, input:''});
	}
	render(){
		//We can access the redux store via our props. The available variables are defined in mapStateToProps() in this file
		return (<div id="mainContainer">
				{matches.map(m=>{
					return <MatchResult data={m}/>
				})}
				{matches.map(m=>{
					return <MatchResult mini={true} data={m}/>
				})}
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
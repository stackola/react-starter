import React from 'react';
import style from './<%= slug %>.less';

export default class <%= name %> extends React.Component{
	render(){
		return (<div styleName="<%= slug %>"><%= name %></div>);
	}
}

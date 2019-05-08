import React from "react";

export default class Filterer extends React.Component {
  filter() {
    return this.props.data.filter(d => {
      return d.name == "a";
    });
  }
  render() {
    return this.props.children && this.props.children(this.filter());
  }
}

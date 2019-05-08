import React from "react";

export default class Searcher extends React.Component {
  search() {
    return this.props.data;
  }
  render() {
    return this.props.children && this.props.children(this.search());
  }
}

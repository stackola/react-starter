import React from "react";

export default class Sorter extends React.Component {
  sort() {
    return this.props.data.sort((a, b) => {
      return a.count - b.count;
    });
  }
  render() {
    return this.props.children && this.props.children(this.sort());
  }
}

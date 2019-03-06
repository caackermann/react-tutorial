import React, { Component } from "react";
import { Button } from "reactstrap";

class Resource extends Component {
  state = {};
  render() {
    return (
      <tr>
        {this.props.children}
        <td>{this.props.resource.id}</td>
        <td>{this.props.resource.name} </td>
        <td>{this.props.resource.year} </td>
        <td>{this.props.resource.color}</td>
        <td>{this.props.resource.pantone_value}</td>
      </tr>
    );
  }
}

export default Resource;

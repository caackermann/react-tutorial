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

        <td>
          <Button color="success" size="sm" className="m-2">
            View
          </Button>
          <Button color="danger" size="sm">
            Delete
          </Button>
        </td>
      </tr>
    );
  }
}

export default Resource;

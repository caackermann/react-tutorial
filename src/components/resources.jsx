import React, { Component } from "react";
import { Table } from "reactstrap";
import Resource from "./resource";

class Resources extends Component {
  render() {
    return (
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Year</th>
            <th>Color</th>
            <th>Pantone Value</th>
          </tr>
        </thead>

        <tbody>
          {this.props.resources.map(resource => (
            <Resource key={resource.id} resource={resource} />
          ))}
        </tbody>
      </Table>
    );
  }
}

export default Resources;

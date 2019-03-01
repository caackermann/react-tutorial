import React, { Component } from "react";
import { Button } from "reactstrap";

class User extends Component {
  state = {};
  render() {
    return (
      <tr>
        {this.props.children}
        <td>{this.props.user.id}</td>
        <td>{this.props.user.first_name} </td>
        <td>{this.props.user.last_name}</td>
        <td>
          <Button
            color="warning"
            size="sm"
            className="m-2"
            onClick={() => this.props.toggleEditUserModal(this.props.user)}
          >
            Edit
          </Button>
          <Button
            color="danger"
            size="sm"
            onClick={() => {
              if (window.confirm("Are you sure you wish to delete this item?"))
                this.props.deleteUser(this.props.user.id);
            }}
          >
            Delete
          </Button>
        </td>
      </tr>
    );
  }
}

export default User;

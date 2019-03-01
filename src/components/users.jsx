import React, { Component } from "react";
import { Table } from "reactstrap";
import User from "./user";

class Users extends Component {
  render() {
    const { toggleEditUserModal, deleteUser } = this.props;
    return (
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {this.props.users.map(user => (
            <User
              key={user.id}
              user={user}
              toggleEditUserModal={toggleEditUserModal}
              deleteUser={deleteUser}
            />
          ))}
        </tbody>
      </Table>
    );
  }
}

export default Users;

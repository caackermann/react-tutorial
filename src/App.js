import React, { Component } from "react";
import Users from "./components/users";
import Resources from "./components/resources";
import axios from "axios";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Collapse,
  FormGroup,
  Label,
  Input
} from "reactstrap";

class App extends Component {
  constructor(props) {
    super(props);

    this.usersToggle = this.usersToggle.bind(this);
    this.resourcesToggle = this.resourcesToggle.bind(this);
    this.toggleEditUserModal = this.toggleEditUserModal.bind(this);
    this.toggleNewUserModal = this.toggleNewUserModal.bind(this);
    this.addUser = this.addUser.bind(this);
    this.editUser = this.editUser.bind(this);
  }

  componentDidMount() {
    this.getUsers();
    this.getResources();
  }
  /*
  Tuve algunos problemas con la API. Al pedir todos los usuarios, se obtienen en páginas de a 3
  Es posible pedir mas de uno, pero hay un máximo de 12.
  Para no hacer un sistema de páginas, se obtienen los primeros 12 tanto para users como para resources
  Al agregar un nuevo usuario, este se agrega correctamente en la api. Lo muestro en la lista para que se vea que se creó,
  pero al actualizar la página se obtienen nuevamente los primeros 12 por lo que no se va a ver. Sin embargo, el usuario si
  está creado, ya que solo se muestra en la página cuando se recibe la respuesta exitosa de la api.
  */
  getUsers() {
    axios.get("https://reqres.in/api/users?per_page=12").then(res => {
      const users = res.data.data;
      this.setState({ users });
    });
  }
  getResources() {
    axios.get("https://reqres.in/api/unknown?per_page=12").then(res => {
      const resources = res.data.data;
      this.setState({ resources });
    });
  }
  addUser() {
    axios
      .post("https://reqres.in/api/users", this.state.newUserData)
      .then(res => {
        let { users } = this.state;
        users.push(res.data);
        this.setState({
          users,
          newUserModal: false,
          newUserData: { first_name: "", last_name: "" }
        });
      });
  }
  editUser(user) {
    axios
      .patch(
        "https://reqres.in/api/users" + this.state.editUserData.id,
        this.state.editUserData
      )
      .then(res => {
        this.setState({ editUserModal: false });
        //users.push(res.data);
        //his.setState({ users });
      });
  }

  state = {
    users: [],
    resources: [],
    usersCollapse: false,
    resCollapse: false,
    newUserModal: false,
    editUserModal: false,
    newUserData: {
      first_name: "",
      last_name: ""
    },
    editUserData: {
      id: "",
      first_name: "",
      last_name: ""
    }
  };

  render() {
    return (
      <div className="App container">
        <Modal
          isOpen={this.state.newUserModal}
          toggle={this.toggleNewUserModal}
        >
          <ModalHeader toggle={this.toggleNewUserModal}>
            Add a new user
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="first_name">First Name:</Label>
              <Input
                type="text"
                id="first_name"
                value={this.state.newUserData.first_name}
                onChange={input => {
                  let { newUserData } = this.state;
                  newUserData.first_name = input.target.value;
                  this.setState(newUserData);
                }}
              />
              <Label for="last_name">Last Name:</Label>
              <Input
                type="text"
                id="last_name"
                value={this.state.newUserData.last_name}
                onChange={input => {
                  let { newUserData } = this.state;
                  newUserData.last_name = input.target.value;
                  this.setState(newUserData);
                }}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addUser}>
              Add User
            </Button>
            <Button color="secondary" onClick={this.toggleNewUserModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <Modal
          isOpen={this.state.editUserModal}
          toggle={this.toggleEditUserModal}
        >
          <ModalHeader toggle={this.toggleEditUserModal}>Edit user</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="first_name">First Name:</Label>
              <Input
                type="text"
                id="first_name"
                value={this.state.editUserData.first_name}
                placeholder={this.state.editUserData.first_name}
                onChange={input => {
                  let { editUserData } = this.state;
                  editUserData.first_name = input.target.value;
                  this.setState(editUserData);
                }}
              />
              <Label for="last_name">Last Name:</Label>
              <Input
                type="text"
                id="last_name"
                value={this.state.editUserData.last_name}
                placeholder={this.state.editUserData.last_name}
                onChange={input => {
                  let { editUserData } = this.state;
                  editUserData.last_name = input.target.value;
                  this.setState(editUserData);
                }}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.editUser}>
              Edit User
            </Button>
            <Button color="secondary" onClick={this.toggleEditUserModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <ul className="m-2">
          <li className="m-2">
            <Button onClick={this.usersToggle}>All Users</Button>
            <Button color="success ml-2 mr-2" onClick={this.toggleNewUserModal}>
              Add User
            </Button>

            <Collapse isOpen={this.state.usersCollapse}>
              <Users
                users={this.state.users}
                toggleEditUserModal={this.toggleEditUserModal}
              />
            </Collapse>
          </li>
          <li className="m-2">
            <Button onClick={this.resourcesToggle}>All Resources</Button>
            <Collapse isOpen={this.state.resCollapse}>
              <Resources resources={this.state.resources} />
            </Collapse>
          </li>
        </ul>
      </div>
    );
  }
  usersToggle() {
    this.setState({ usersCollapse: !this.state.usersCollapse });
  }

  resourcesToggle() {
    this.setState({ resCollapse: !this.state.resCollapse });
  }
  toggleNewUserModal() {
    this.setState({ newUserModal: !this.state.newUserModal });
  }
  toggleEditUserModal(user) {
    this.setState({ editUserData: user });
    this.setState({ editUserModal: !this.state.editUserModal });
  }
}

export default App;

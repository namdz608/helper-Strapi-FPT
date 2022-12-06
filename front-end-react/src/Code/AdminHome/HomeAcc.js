import React, { Component } from "react";
import axios from "axios";
import "./HomeAcc.scss";
import SideNav from "../Layout/Sidenav";
class HomeAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.location.state.state,
      usersAll: [],
    };
  }
  async componentDidMount() {
    let a = await axios.get(`http://localhost:1337/api/users`);
    this.setState({
      usersAll: a.data,
    });
  }

  MoveEdit = (id) => {
    this.props.history.push(`edit-user/${id}`, { state: this.state.user });
  };

  DeleteUser = async (id) => {
    await axios.delete(`http://localhost:1337/api/users/${id}`);
    await this.componentDidMount();
  };

  MoveAdd = () => {
    this.props.history.push("add-new-user", { state: this.state.user });
  };

  render() {
    let { usersAll, user } = this.state;
    return (
      <>
        <div>
          <SideNav user={user} />
        </div>
        <section class="twitter">
          <div className="container">
            <div className="title">Manage Users</div>
            <center>
              <button
                className="btn btn-primary"
                onClick={() => this.MoveAdd()}
              >
                Add New User
              </button>
            </center>
            <br></br>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Full Name</th>
                  <th scope="col">Role</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Email</th>
                  <th scope="col">Address</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {usersAll &&
                  usersAll.map((item) => {
                    return (
                      <tr>
                        <th scope="row">{item.full_name}</th>
                        <td>{item.Role}</td>
                        <td>{item.phone_number}</td>
                        <td>{item.email}</td>
                        <td>{item.address}</td>
                        <td>
                          <div class="dropdown">
                            <button
                              class="btn btn-secondary dropdown-toggle"
                              type="button"
                              id="dropdownMenuButton"
                              data-toggle="dropdown"
                              aria-expanded="false"
                            >
                              Options
                            </button>
                            <div
                              class="dropdown-menu"
                              aria-labelledby="dropdownMenuButton"
                            >
                              <span
                                class="dropdown-item"
                                onClick={() => this.MoveEdit(item.id)}
                              >
                                Edit
                              </span>
                              <span
                                class="dropdown-item"
                                onClick={() => this.DeleteUser(item.id)}
                              >
                                Delete
                              </span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </section>
      </>
    );
  }
}

export default HomeAccount;

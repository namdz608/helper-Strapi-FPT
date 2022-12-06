import React, { Component } from "react";
import axios from "axios";
import Sidenav from "../Layout/Sidenav";

class HomeService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      services: "",
      user: this.props.location.state.state,
    };
  }

  DeleteService = async (id) => {
    await axios.delete(`http://localhost:1337/api/services/${id}`);
    await this.componentDidMount();
  };

  MoveEdit = (id) => {
    this.props.history.push(`/services-edit/${id}`, { state: this.state.user });
  };

  async componentDidMount() {
    let a = await axios.get("http://localhost:1337/api/services");
    this.setState({ services: a.data.data });
  }

  MoveAdd = () => {
    this.props.history.push("/services-add-new", { state: this.state.user });
  };

  render() {
    let { services, user } = this.state;
    return (
      <>
        <div>
          <Sidenav user={user} />
        </div>
        <section className="twitter">
          <div className="container">
            <div className="title">Manage Services</div>
            <center>
              <button
                className="btn btn-primary"
                onClick={() => this.MoveAdd()}
              >
                Add New Service
              </button>
            </center>
            <br></br>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Type</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services &&
                  services.map((item) => {
                    return (
                      <tr>
                        <th scope="row">{item.id}</th>
                        <td>{item.attributes.name}</td>
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
                                onClick={() => this.DeleteService(item.id)}
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

export default HomeService;

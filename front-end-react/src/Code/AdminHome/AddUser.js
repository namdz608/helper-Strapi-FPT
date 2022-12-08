import React, { Component } from "react";
import SideNav from "../Layout/Sidenav";
import axios from "axios";
import { toast } from "react-toastify";
import { default as ReactSelect } from "react-select";
import { components } from "react-select";

const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};
class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      address: "",
      phone_number: "",
      name: "",
      image: "",
      year: null,
      price: null,
      description: "",
      previewURLImg: "",
      role: "",
      username: "",
      password: "",
      user: this.props.location.state.state,
      job: "",
      newId: "",
      optionSelected: null,
      value: null,
    };
  }

  handleChange = (selected) => {
    let o = selected.map((item) => {
      return item.value;
    });
    this.setState({
      optionSelected: selected,
      value: o,
    });
  };

  async componentDidMount() {
    let a = await axios.get("http://localhost:1337/api/services");
    let jobs = [];
    a.data.data.forEach((element) => {
      jobs.push({ value: element.id, label: element.attributes.name });
    });
    this.setState({
      job: jobs,
    });
  }

  getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  handleImg = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await this.getBase64(file);
      let obj = URL.createObjectURL(file);
      this.setState({
        previewURLImg: obj,
        image: base64,
      });
    }
  };

  AddUserChange = (event, id) => {
    let copy = { ...this.state };
    copy[id] = event.target.value;
    this.setState({
      ...copy,
    });
  };

  AddUser = async () => {
    console.log(this.state)
    let a = await axios({
      url: `http://localhost:1337/api/auth/local/register`,
      method: "POST",
      data: {
        phone_number: this.state.phone_number,
        email: this.state.email,
        full_name: this.state.name,
        address: this.state.address,
        resetPasswordToken: "cillum Excepteur ad dolore",
        confirmationToken: "reprehenderit do labore elit tempor",
        image: this.state.image,
        description: this.state.description,
        username: this.state.username,
        password: this.state.password,
        Role: this.state.role,
        services: this.state.value,
      },
    });
    if(this.state.year != null || this.state.year != ""){
      await axios.post(`http://localhost:1337/api/transactions`, {
        data: {
          userId: a.data.user.id,
          yearEx: this.state.year,
          price: this.state.price,
          users_permissions_user: this.state.user,
        },
      });
    }
    if (a.status === 200) {
      toast.success("Created successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log(a);
      await axios.post(`http://localhost:1337/api/transactions`, {
        data: {
          userId: a.data.id,
          yearEx: this.state.year,
          price: this.state.price,
          status: false,
        },
      });
      await this.componentDidMount();
    } else {
      console.log(a);
    }
  };

  render() {
    let {
      email,
      name,
      user,
      phone_number,
      year,
      description,
      image,
      address,
      role,
      price,
      username,
      password,
    } = this.state;
    return (
      <>
        <div>
          <SideNav user={user} />
        </div>
        <section className="twitter">
          <div className="container">
            <div className=" text-center mt-5 ">
              <h1>Add New User</h1>
            </div>

            <div className="row ">
              <div className="col-lg-7 mx-auto">
                <div className="card mt-2 mx-auto p-4 bg-light">
                  <div className="card-body bg-light">
                    <div className="container">
                      <div className="controls">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label for="form_name">Full Name *</label>
                              <input
                                id="form_name"
                                type="text"
                                value={name}
                                className="form-control"
                                onChange={(event) =>
                                  this.AddUserChange(event, "name")
                                }
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label for="form_lastname">Email *</label>
                              <input
                                id="form_lastname"
                                type="text"
                                value={email}
                                className="form-control"
                                onChange={(event) =>
                                  this.AddUserChange(event, "email")
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label for="form_email">Phone Number *</label>
                              <input
                                id="form_email"
                                type="text"
                                value={phone_number}
                                className="form-control"
                                onChange={(event) =>
                                  this.AddUserChange(event, "phone_number")
                                }
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label for="form_need">Address *</label>
                              <input
                                id="form_email"
                                type="text"
                                value={address}
                                className="form-control"
                                onChange={(event) =>
                                  this.AddUserChange(event, "address")
                                }
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label for="form_need">Year Experience</label>
                              <input
                                type="text"
                                value={year}
                                className="form-control"
                                onChange={(event) =>
                                  this.AddUserChange(event, "year")
                                }
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label for="form_need">Role</label>
                              <select
                                class="form-control"
                                id="exampleFormControlSelect1"
                                onChange={(event) =>
                                  this.AddUserChange(event, "role")
                                }
                              >
                                <option>Helper</option>
                                <option>Admin</option>
                              </select>
                            </div>
                          </div>
                          <input
                            id="preview"
                            type="file"
                            onChange={(event) => this.handleImg(event)}
                            placeholder="Image"
                          />
                          <div className="col-md-6">
                            <div className="form-group">
                              <label for="form_need">Service</label>
                              <ReactSelect
                                options={this.state.job}
                                isMulti
                                closeMenuOnSelect={false}
                                hideSelectedOptions={false}
                                components={{
                                  Option,
                                }}
                                onChange={this.handleChange}
                                allowSelectAll={true}
                                value={this.state.optionSelected}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label for="form_need">User Name</label>
                              <input
                                type="text"
                                value={username}
                                className="form-control"
                                onChange={(event) =>
                                  this.AddUserChange(event, "username")
                                }
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label for="form_need">Password</label>
                              <input
                                type="text"
                                value={password}
                                className="form-control"
                                onChange={(event) =>
                                  this.AddUserChange(event, "password")
                                }
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label for="form_need">Price</label>
                              <input
                                type="text"
                                value={price}
                                className="form-control"
                                onChange={(event) =>
                                  this.AddUserChange(event, "price")
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group">
                              <label for="form_message">Description</label>
                              <textarea
                                id="form_message"
                                name="message"
                                className="form-control"
                                rows="4"
                                onChange={(event) =>
                                  this.AddUserChange(event, "description")
                                }
                                value={description}
                              ></textarea>
                            </div>
                          </div>

                          <div className="col-md-12">
                            <button
                              className="btn btn-success btn-send  pt-2 btn-block"
                              onClick={() => this.AddUser()}
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default AddUser;

import React, { Component } from "react";
import axios from "axios";
import SideNav from "../Layout/Sidenav";
import "./EditAcc.scss";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
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

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      address: "",
      phone_number: "",
      name: "",
      image: "",
      year: "",
      description: "",
      user: this.props.location.state.state,
      previewURLImg: "",
      job: "",
      price:'',
      optionSelected: null,
      value: null,
    };
  }

  getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

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

    let services = [];

    let id = this.props.match.params;
    let userInfo = await axios.get(
      `http://localhost:1337/api/users/${id.id}?populate=services`
    );

    userInfo.data.services.forEach((element) => {
      services.push({ value: element.id, label: element.name });
    });
    let details = await axios.get(`http://localhost:1337/api/transactions`, {
      params: {
        "filters[userId][$eq]": id.id,
      },
    });
    let o = services.map((item) => {
      return item.value;
    });
    if(details.data.data.length==0){
      this.setState({
        detail:null,
        email: userInfo.data.email,
        address: userInfo.data.address,
        name: userInfo.data.full_name,
        phone_number: userInfo.data.phone_number,
        image: userInfo.data.image,
        // year: details.data.data[0].attributes.yearEx,
        // price:details.data.data[0].attributes.price,
        description: userInfo.data.description,
        job: jobs,
        optionSelected: services,
        value: o,
      })
    }
    else{
      this.setState({
        detail:details.data.data[0].attributes,
        email: userInfo.data.email,
        address: userInfo.data.address,
        name: userInfo.data.full_name,
        phone_number: userInfo.data.phone_number,
        image: userInfo.data.image,
        year: details.data.data[0].attributes.yearEx,
        price:details.data.data[0].attributes.price,
        description: userInfo.data.description,
        job: jobs,
        optionSelected: services,
        value: o,
      });
    }
    
  }

  EditUserChange = (event, id) => {
    let copy = { ...this.state };
    copy[id] = event.target.value;
    this.setState({
      ...copy,
    });
  };

  EditUser = async () => {
    console.log(this.state.phone)
    let id = this.props.match.params;
    let userInfo = await axios({
      url: `http://localhost:1337/api/users/${id.id}?filter=*`,
      method: "PUT",
      data: {
        full_name: this.state.name,
        address: this.state.address,
        phone_number: this.state.phone_number,
        year_experiences: parseInt(this.state.year),
        image: this.state.image,
        description: this.state.description,
        services: this.state.value,
      },
    });

    let details = await axios.get(`http://localhost:1337/api/transactions`, {
      params: {
        "filters[userId][$eq]": id.id,
      },
    });
    console.log('dasdasd',details)
    if(details.data.data.length>0){
      let abc=details.data.data[0].id
      let a=await axios({
        url: `http://localhost:1337/api/transactions/${abc}`,
        method: "PUT",
        data: {
          data: {
            price: this.state.price,
            yearEx:this.state.year
          },
        },
      });
    }
    else{
      await axios.post(`http://localhost:1337/api/transactions`, {
        data: {
          userId: id.id,
          yearEx: this.state.year,
          price: this.state.price,
          users_permissions_user: this.state.user,
        },
      });
    }
    
    if (userInfo.status === 200) {
      toast.success("Edit User Successfully");
    } else {
      toast.error("Edit User Failure");
    }
    await this.componentDidMount();
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

  render() {
    let { email, address, phone_number, name, description, year, image, price ,user} =
      this.state;
    return (
      <>
        <div>
          <SideNav user={user} />
        </div>
        <section className="twitter">
          <div className="container">
            <div className=" text-center mt-5 ">
              <h1>Edit User's Information</h1>
            </div>
            <img src={image} />
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
                                name="name"
                                className="form-control"
                                value={name}
                                required="required"
                                onChange={(event) =>
                                  this.EditUserChange(event, "name")
                                }
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label for="form_lastname">Email *</label>
                              <input
                              disabled={true}
                                id="form_lastname"
                                type="text"
                                name="surname"
                                className="form-control"
                                value={email}
                                onChange={(event) =>
                                  this.EditUserChange(event, "email")
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
                                name="email"
                                className="form-control"
                                value={phone_number}
                                onChange={(event) =>
                                  this.EditUserChange(event, "phone_number")
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
                                name="email"
                                className="form-control"
                                value={address}
                                required="required"
                                onChange={(event) =>
                                  this.EditUserChange(event, "address")
                                }
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label for="form_need">Year Experience</label>
                              <input
                                type="text"
                                name="email"
                                className="form-control"
                                value={year}
                                onChange={(event) =>
                                  this.EditUserChange(event, "year")
                                }
                              />
                            </div>
                          </div>
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
                              <label for="form_need">Price</label>
                              <input
                                type="text"
                                name="email"
                                className="form-control"
                                value={price}
                                onChange={(event) =>
                                  this.EditUserChange(event, "price")
                                }
                              />
                            </div>
                          </div>
                          
                          <input
                            id="preview"
                            type="file"
                            className="form-control-file"
                            onChange={(event) => this.handleImg(event)}
                            placeholder="Image"
                          />
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
                                  this.EditUserChange(event, "description")
                                }
                                value={description}
                              ></textarea>
                            </div>
                          </div>

                          <div className="col-md-12">
                            <button
                              className="btn btn-success btn-send  pt-2 btn-block"
                              onClick={() => this.EditUser()}
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

export default EditUser;

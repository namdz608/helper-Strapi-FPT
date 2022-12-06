import React, { Component } from "react";
import Sidenav from "./Code/Layout/Sidenav";
import "./HomepageUser.scss";
import ToggleSwitch from "./Component/Switch";
import axios from "axios";

class UserHomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.location.state.state,
      newsletter: !this.props.location.state.state.status,
    };
  }

  async componentDidMount() {
    let details = await axios.get(`http://localhost:1337/api/transactions`, {
      params: {
        "filters[userId][$eq]": this.state.user.id,
      },
    });
    this.setState({
      newsletter: details.data.data[0].attributes.status,
    });
  }

  changeToggle = async () => {
    this.setState({
      newsletter: !this.state.newsletter,
    });
    let details = await axios.get(`http://localhost:1337/api/transactions`, {
      params: {
        "filters[userId][$eq]": this.state.user.id,
      },
    });
    let a=await axios({
      url: `http://localhost:1337/api/transactions/${details.data.data[0].id}`,
      method: "PUT",
      data: {
        data: {
          status: this.state.newsletter,
        },
      },
    });
  };

  render() {
    let { user, newsletter } = this.state;
    return (
      <>
        <div>
          <Sidenav user={user} />
        </div>
        <section className="twitter">
          <div className="container">
            {user && user.Role === "Helper" && (
              <div>
                <label htmlFor="newsletter">Status </label>
                <ToggleSwitch
                  id="newsletter"
                  checked={newsletter}
                  onChange={() => this.changeToggle()}
                />
              </div>
            )}

            <div className="container d-flex justify-content-center mt-5">
              <div className="card">
                <center>
                  <img
                    src={user.image}
                    className="img-fluid profile-image"
                    width="70"
                  />
                </center>
                <div className="middle-container d-flex align-items-center mt-3 p-2">
                  <div className="dollar-div px-3">
                    <div className="round-div">
                      <i className="fa fa-dollar dollar"></i>
                    </div>
                  </div>
                  <div className="container">
                    <div className="d-flex flex-column mr-2">
                      <span className="current-balance">
                        Full Name: {user.full_name}
                      </span>
                      <span className="amount">
                        <span className="dollar-sign"></span>Phone Number:{" "}
                        {user.phone_number}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="recent-border mt-4">
                  <span className="recent-orders">Email: {user.email}</span>
                </div>
                <div className="wishlist-border pt-2">
                  <span className="wishlist">Address: {user.address}</span>
                </div>
                <div className="fashion-studio-border pt-2">
                  <span className="fashion-studio">
                    {/* Year Experiences: {user.year_experiences} */}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default UserHomePage;

import React, { Component } from "react";
import axios from "axios";
import "./sidenav.scss";
import { withRouter } from "react-router-dom";
class SideNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
    };
  }
  ScheduleInfo = () => {
    this.props.history.push(`/helper-schedule`, { state: this.props.user });
  };

  LogOut = () => {
    this.props.history.push(`/login`);
  };

  ManageUser = () => {
    this.props.history.push("/home-account", { state: this.props.user });
  };

  async componentDidMount() {
    let a = this.props.user;
    this.setState({
      user: a,
    });
  }

  ManageServices = () => {
    this.props.history.push("/home-services", { state: this.props.user });
  };

  UserInfo = () => {
    this.props.history.push("/user-homepage", { state: this.props.user });
  };
  SeeBooking = () => {
    this.props.history.push("/see-booking", { state: this.props.user });
  };

  render() {
    let { user } = this.state;
    return (
      <>
        <aside className="sidebar">
          <nav className="nav">
            <ul>
              <li className="li">
                <span onClick={() => this.UserInfo()}>Profile</span>
              </li>
              {user.Role === "Helper" && (
                <>
                  <li className="li">
                    <span onClick={() => this.ScheduleInfo()}>
                      Manage Schedule
                    </span>
                  </li>
                  <li className="li">
                    <span onClick={() => this.SeeBooking()}>See Booking</span>
                  </li>
                </>
              )}

              {user.Role === "Admin" && (
                <>
                  <li className="li">
                    <span onClick={() => this.ManageUser()}>Manage User</span>
                  </li>
                  <li className="li">
                    <span onClick={() => this.ManageServices()}>
                      Manage Services
                    </span>
                  </li>
                </>
              )}

              <li className="li">
                <span onClick={() => this.LogOut()}>Log Out</span>
              </li>
            </ul>
          </nav>
        </aside>
      </>
    );
  }
}

export default withRouter(SideNav);

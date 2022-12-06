import React, { Component } from "react";
import "./Login.scss";
import axios from "axios";

class UserLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }
  onChangeEmail = (event) => {
    let email = event.target.value;
    this.setState({ email: email });
  };

  onChangePassword = (event) => {
    let password = event.target.value;
    this.setState({ password: password });
  };

  Login = async () => {
    let a = await axios.post("http://localhost:1337/api/auth/local", {
      identifier: this.state.email,
      password: this.state.password,
    });

    if (a.status === 200) {
      console.log("a", a.data.user);
      this.props.history.push("/user-homepage",{state:a.data.user});
    } else {
    }
  };
  render() {
    let { email, password } = this.state;
    return (
      <>
        <div className="wrapper fadeInDown">
          <div id="formContent">
            <h2 className="active"> Sign In </h2>

            <input
              type="text"
              id="login"
              className="fadeIn second"
              name="login"
              placeholder="login"
              value={email}
              onChange={(event) => this.onChangeEmail(event)}
            />
            <input
              type="password"
              id="password"
              className="fadeIn third"
              name="login"
              placeholder="password"
              value={password}
              onChange={(event) => this.onChangePassword(event)}
            />
            <br></br>
            <button onClick={() => this.Login()} className="btn btn-primary">
              Login
            </button>

            <div id="formFooter"></div>
          </div>
        </div>
      </>
    );
  }
}

export default UserLogin;

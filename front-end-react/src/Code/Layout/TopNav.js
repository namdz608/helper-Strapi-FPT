import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class TopNav extends Component {
  constructor(props) {
    super(props);
    this.state = { services: [] };
  }

  async componentDidMount() {
    let a = await axios.get("http://localhost:1337/api/services");
    this.setState({ services: a.data.data });
    console.log("dasd", this.state.services);
  }

  render() {
    let { services } = this.state;
    return (
      <>
        <div className="header">
          <div className="logo"></div>
          <div className="head-center">
            <div className="content">
              <div className="content-child">
                <div className="a">
                  <Link to="/">Trang Chủ</Link>
                </div>
              </div>
              <div className="content-child">
                <div className="a">
                  <Link to="/introduce">Giới Thiệu</Link>
                </div>
              </div>
              <div className="content-child">
                <div className="a">
                  <a
                    role="button"
                    class="nav-link dropdown-toggle"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Dịch Vụ
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    {services &&
                      services.map((item, index) => {
                        let abc=`/detail-service/${item.id}`
                        return (
                          <a key={index} className="dropdown-item" href={abc}>
                            {item.attributes.name}
                          </a>
                        );
                      })}
                  </div>
                </div>
              </div>
              <div className="content-child">
                <div className="a">
                <Link to="/all-helper">Giúp Việc</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="right-header">
            <div className="icon"></div>
            <Link to="/login">Đăng Nhập Cho Giúp Việc</Link>
          </div>
        </div>
      </>
    );
  }
}

export default TopNav;

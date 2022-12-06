import React, { Component } from "react";
import "./AllHelper.scss";
import TopNav from "../Layout/TopNav";
import axios from "axios";

class AllHelper extends Component {
  constructor(props) {
    super(props);
    this.state = {
        employees: [],

    };
  }

  async componentDidMount(){
    let users = await axios.get(`http://localhost:1337/api/users`, {
      params: {
        "filters[Role][$eq]": "Helper",
      },
    });
    this.setState({
        employees: users.data,
    })
  }
  SeeUserDetails=(id)=>{
    this.props.history.push(`/employee-details/${id}`,
    { state: null }
    );
  }
  render() {
    let { employees } = this.state;
    return (
      <>
        <TopNav />
        <div className="banner"></div>
        <div className="container">

        <div className="employees">
          {employees &&
            employees.length > 0 &&
            employees.map((item) => {
                return (
                  <div
                    onClick={() => {
                      this.SeeUserDetails(item.id);
                    }}
                    class="child-employee"
                  >
                    <center>
                      <img src="https://scontent-hkg4-1.xx.fbcdn.net/v/t1.15752-9/314931737_1748571132191824_2167271182472012638_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=ae9488&_nc_ohc=3oQdHOU4hxUAX8UfjEN&_nc_ht=scontent-hkg4-1.xx&oh=03_AdSsj6i00v03n7yWviB8oMdfPsZYfI49G0w3tHDXbrK5DA&oe=63928B82" />
                    </center>
                    <div className="emp-img">
                      <center>
                        <img src={item.image} />
                      </center>
                      <center>
                        <div className="emp-name">
                          Name: {item.full_name}
                        </div>
                      </center>
                    </div>
                  </div>
                );

            })}
        </div>
        </div>
      </>
    );
  }
}

export default AllHelper;

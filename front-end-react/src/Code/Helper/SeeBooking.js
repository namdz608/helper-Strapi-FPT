import React, { Component } from "react";
import SideNav from "../Layout/Sidenav";
import axios from "axios";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
class SeeBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.location.state.state,
      booking: [],
      date: new Date(),
      startDate: new Date(),
    };
  }

  setStartDate = (date) => {
    this.setState(
      {
        startDate: date,
      },
      () => {
        this.getDataByDate();
      }
    );
  };

  async componentDidMount() {
    await this.getDataByDate();
  }

  getDataByDate=async()=>{
    let { startDate} = this.state;
    let a = new Date(startDate).toISOString().slice(0, 10);
    let o = new Date(a);
    let timestamp = o.getTime();
    console.log('dmm',timestamp)
    let details = await axios.get(`http://localhost:1337/api/booking-infos`, {
      params: {
        "filters[helperId][$eq]": this.state.user.id,
        "filters[verify][$eq]": "pending",
        "filters[timeStamp][$eq]": timestamp+"",
      },
    });
    this.setState({
      booking: details.data.data,
    });
  }

  Accept = async (id) => {
    let a = await axios({
      url: `http://localhost:1337/api/booking-infos/${id}`,
      method: "PUT",
      data: {
        data: {
          verify: "Accpected",
        },
      },
    });
    await this.componentDidMount();
  };

  Denied = async (id) => {
    let a = await axios({
      url: `http://localhost:1337/api/booking-infos/${id}`,
      method: "PUT",
      data: {
        data: {
          verify: "Denied",
        },
      },
    });
    await this.componentDidMount();
  };

  render() {
    let { user, booking,startDate } = this.state;
    return (
      <>
        <SideNav user={user} />

        <section className="twitter">
          <div className="container">
            <center>
              <DatePicker
                selected={startDate}
                onChange={(date) => this.setStartDate(date)}
              />
            </center>
            <br></br>
            <center>
              <h1>Manage Booking</h1>
            </center>
            <br></br>
            <br></br>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Customer Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Time Slot</th>
                  <th scope="col">Service</th>
                  <th scope="col">Address</th>
                  <th scope="col">Note</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {booking &&
                  booking.map((item, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{item.attributes.name}</th>
                        <td>{item.attributes.email}</td>
                        <td>{item.attributes.phone}</td>
                        <td>{item.attributes.timeSlot}</td>
                        <td>{item.attributes.service}</td>
                        <td>{item.attributes.address}</td>
                        <td>{item.attributes.note}</td>
                        <td>
                          <div className="dropdown">
                            <button
                              className="btn btn-secondary dropdown-toggle"
                              type="button"
                              id="dropdownMenuButton"
                              data-toggle="dropdown"
                              aria-expanded="false"
                            >
                              Options
                            </button>
                            <div
                              className="dropdown-menu"
                              aria-labelledby="dropdownMenuButton"
                            >
                              <span
                                className="dropdown-item"
                                onClick={() => this.Accept(item.id)}
                              >
                                Accept
                              </span>
                              <span
                                className="dropdown-item"
                                onClick={() => this.Denied(item.id)}
                              >
                                Denied
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

export default SeeBooking;

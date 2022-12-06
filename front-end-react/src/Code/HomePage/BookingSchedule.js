import React, { Component } from "react";
import axios from "axios";
import "./BookingSchedule.scss";
import TopNav from "../Layout/TopNav";
import { toast } from "react-toastify";

class BookingSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      phone: "",
      name: "",
      note: "",
      address: "",
      data:{}
    };
  }

  handleChange = (event, id) => {
    let copy = { ...this.state };
    copy[id] = event.target.value;
    this.setState({
      ...copy,
    });
  };

  async componentDidMount() {
    let obj = this.props.location.state.state;
    this.setState({
      data:obj
    })
    console.log("dada", obj);
  }
  Booking = async () => {

      let a =await axios.post(`http://localhost:1337/api/booking-infos`, {
        data: {
          phone: this.state.phone,
          name: this.state.name,
          address: this.state.address,
          email:this.state.email,
          timeStamp:this.state.data.date,
          helperId:this.state.data.user.id,
          timeSlot:this.state.data.timeType,
          verify:"pending",
          note:this.state.note,
          helper_email:this.state.data.user.email,
          helper_name:this.state.data.user.full_name,
          service:this.state.data.service
        },
      });
    console.log(a)
    if(a.status===200){
      toast.success('Book Lịch Hẹn Thành Công!!!')
    }
    else{
      toast.error('Đăt Lịch Khám Thất Bại !!!')
    }
  };

  render() {
    let { email, address, phone, name, note } = this.state;
    return (
      <>
        <TopNav />
        <br></br>

        <div class="mahi_holder">
          <div class="container">
            <div class="row bg_2">
              <h2>
                <i>Input Customer information</i>
              </h2>
              <div class="col-3">
                <input
                  class="effect-10"
                  type="text"
                  value={email}
                  placeholder="Input Your Email"
                  onChange={(event) => this.handleChange(event, "email")}
                />
                <span class="focus-bg"></span>
              </div>
              <div class="col-3">
                <input
                  class="effect-11"
                  type="text"
                  value={phone}
                  placeholder="Input Your Phone Number"
                  onChange={(event) => this.handleChange(event, "phone")}
                />
                <span class="focus-bg"></span>
              </div>
              <div class="col-3">
                <input
                  class="effect-12"
                  type="text"
                  value={address}
                  placeholder="Input Your Address"
                  onChange={(event) => this.handleChange(event, "address")}
                />
                <span class="focus-bg"></span>
              </div>
              <div class="col-3">
                <input
                  class="effect-13"
                  type="text"
                  value={name}
                  placeholder="Input Your Name"
                  onChange={(event) => this.handleChange(event, "name")}
                />
                <span class="focus-bg"></span>
              </div>
              <div class="col-3">
                <input
                  class="effect-14"
                  type="text"
                  value={note}
                  placeholder="Note For Helper"
                  onChange={(event) => this.handleChange(event, "note")}
                />
                <span class="focus-bg"></span>
              </div>
            </div>
          </div>
        </div>
        <center>
          <button className="button-53" onClick={() => this.Booking()}>
            Book Now
          </button>
        </center>
      </>
    );
  }
}

export default BookingSchedule;

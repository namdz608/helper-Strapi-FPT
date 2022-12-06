import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./ManageSchedule.scss";
import axios from "axios";
import { toast } from "react-toastify";
import SideNav from "../Layout/Sidenav";
class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.location.state.state,
      startDate: new Date(),
      checked: false,
      date: new Date(),
      ScheduleArr: [
        { checked: true, value: "10:00 AM - 12:00 AM" },
        { checked: true, value: "8:00 AM - 10:00 AM" },
        { checked: true, value: "14:00 PM - 16:00 PM" },
        { checked: true, value: "18:00 PM - 20:00 PM" },
        { checked: true, value: "16:00 PM - 18:00 PM" },
      ],
    };
  }

  SaveScheduleHelper = async () => {
    let { startDate, ScheduleArr } = this.state;
    let a = new Date(startDate).toISOString().slice(0, 10);
    let o = new Date(a);
    let timestamp = o.getTime();
    let selectedTime = ScheduleArr.filter((item) => item.checked === false);
    let timeType = selectedTime.map((item) => {
      return item.value;
    });
    let scheduleArray = [];
    // obj.date = "" + timestamp;
    timeType.map((schedule) => {
      let obj = {};
      obj.timeType = schedule;
      scheduleArray.push(obj);
    });
    let timeData = await axios.get(`http://localhost:1337/api/schedules`, {
      params: {
        populate: "*",
        "filters[helper_id][$eq]": this.state.user.id + "",
      },
    });
    let j = timeData.data.data.find(
      (item) => item.attributes.date === "" + timestamp
    );
    if (j) {
      if (j.attributes.date === timestamp + "") {
        toast.error("Save Time Slot Failure");
      }
    } else {
      let res = await axios.post(`http://localhost:1337/api/schedules`, {
        data: {
          helper_id: this.state.user.id,
          date: "" + timestamp,
          ObjectTime: scheduleArray,
          // user: this.state.user,
        },
      });
      if(res.status===200){
        toast.success('Save Time Slot Success')
      }
      console.log(res)
    }
  };

  setStartDate = (date) => {
    this.setState({
      startDate: date,
    });
    let a = this.state.startDate;
    let o = new Date(a).toISOString().slice(0, 10);
    let g = new Date(o);
    let timestamp = g.getTime();
    console.log("dasd", a);
  };

  handleCheckboxChange = (event, data) => {
    if (event.target.checked) {
      data.checked = this.state.checked;
    } else if (!event.target.checked) {
      data.checked = !this.state.checked;
    }
  };

  render() {
    let { user, date, startDate, ScheduleArr } = this.state;
    return (
      <>
        <div>
          <SideNav user={user} />
          <section className="twitter">
            <div className="container">
              <DatePicker
                selected={startDate}
                onChange={(date) => this.setStartDate(date)}
                minDate={new Date(this.state.date)}
                maxDate={new Date("03-29-2100")}
                placeholderText="Select a date in February 2020"
              />
              <br></br>
              <section className="section">
                {ScheduleArr &&
                  ScheduleArr.map((item) => {
                    return (
                      <>
                        {/* <article class="feature1">
                          <input
                            type="checkbox"
                            id="feature1"
                            value={item.value}
                            onChange={(event) =>
                              this.handleCheckboxChange(event, item)
                            }
                          />
                          <div>
                            <span>{item.value}</span>
                          </div>
                        </article> */}
                        <div class="form-check">
                          <input
                            value={item.value}
                            type="checkbox"
                            onChange={(event) =>
                              this.handleCheckboxChange(event, item)
                            }
                            class="form-check-input"
                            id="anime"
                            name="hobby"
                          />
                          <label class="form-check-label" for="anime">
                          {item.value}
                          </label>
                        </div>
                      </>
                    );
                  })}
              </section>
              <br></br>
              <main>
                <button
                  className="button-89"
                  onClick={() => this.SaveScheduleHelper()}
                >
                  <span>Save</span>
                </button>
              </main>
            </div>
          </section>
        </div>
      </>
    );
  }
}

export default ManageSchedule;

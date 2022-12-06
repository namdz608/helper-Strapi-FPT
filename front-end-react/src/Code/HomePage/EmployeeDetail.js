import React, { Component } from "react";
import axios from "axios";
import TopNav from "../Layout/TopNav";
import "./EmployeeDetail.scss";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class EmployeeDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      id: "",
      setShow: false,
      startDate: new Date(),
      date: new Date(),
      arrSchedule: [],
      detail: {},
      service: "",
      previewURLImg: "",
      isDetail: false,
    };
  }

  handleShow = () => {
    if (this.state.detail.status === false) {
      alert("Employee have not online yet");
    } else {
      this.setState({
        setShow: true,
      });
    }
  };

  async componentDidMount() {
    let id = this.props.match.params;
    console.log(id.id)
    let service = this.props.location.state.state;
    let details = await axios.get(`http://localhost:1337/api/transactions`, {
      params: {
        "filters[userId][$eq]": id.id,
      },
    });
    if (service !== null) {
      let userInfo = await axios.get(
        `http://localhost:1337/api/users/${id.id}`
      );
      this.setState({
        user: userInfo.data,
        id: id,
        detail: details.data.data[0].attributes,
        service: service,
        isDetail: false,
      });
      console.log('da',userInfo)
      if (this.state.user.image) {
        let a = await fetch(this.state.user.image);
        let res = await a.blob();
        let obj = URL.createObjectURL(res);
        this.setState({
          previewURLImg: obj,
        });
      }
    } else {
      let userInfo = await axios.get(
        `http://localhost:1337/api/users/${id.id}`
      );
      console.log('da',userInfo)
      this.setState({
        user: userInfo.data,
        id: id,
        detail: details.data.data[0].attributes,
        isDetail: true,
      });
      if (this.state.user.image) {
        let a = await fetch(this.state.user.image);
        let res = await a.blob();
        let obj = URL.createObjectURL(res);
        this.setState({
          previewURLImg: obj,
        });
      }
    }
  }

  handleClose = () => {
    this.setState({
      setShow: false,
    });
  };

  setStartDate = (date) => {
    this.setState({
      startDate: date,
    });
  };

  SeeTimeSlot = async () => {
    let a = this.state.startDate;
    let o = new Date(a).toISOString().slice(0, 10);
    let g = new Date(o);
    let timestamp = g.getTime();
    let id = this.state.user.id;
    let timeType = await axios.get(`http://localhost:1337/api/schedules`, {
      params: {
        populate: "*",
        "filters[helper_id][$eq]": id + "",
      },
    });
    let j = timeType.data.data.find(
      (item) => item.attributes.date === "" + timestamp
    );
    if (j) {
      this.setState({
        arrSchedule: j.attributes.ObjectTime,
      });
    } else {
      this.setState({
        arrSchedule: [],
      });
    }
  };

  BookingHelper = (item) => {
    let j = this.state.startDate;
    let o = new Date(j).toISOString().slice(0, 10);
    let g = new Date(o);
    let timestamp = g.getTime();
    let a = item;
    a.user = this.state.user;
    a.date = timestamp + "";
    a.service = this.state.service;
    this.props.history.push("/booking-helper", { state: a });
  };

  render() {
    let {
      user,
      setShow,
      startDate,
      arrSchedule,
      detail,
      previewURLImg,
      isDetail,
    } = this.state;
    return (
      <>
        <TopNav />
        <div className="banner"></div>
        <div className="box-user">
          <div className="emp-avatar">
            <center>
              <div className="logo">
                <img src="https://scontent-hkg4-1.xx.fbcdn.net/v/t1.15752-9/314931737_1748571132191824_2167271182472012638_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=ae9488&_nc_ohc=3oQdHOU4hxUAX8UfjEN&_nc_ht=scontent-hkg4-1.xx&oh=03_AdSsj6i00v03n7yWviB8oMdfPsZYfI49G0w3tHDXbrK5DA&oe=63928B82" />
              </div>
              <div
                className="abc"
                style={{ backgroundImage: `url(${previewURLImg})` }}
              ></div>
            </center>
            <br></br>
            <br></br>
            <center>
              {isDetail == false ? (
                <Button variant="primary" onClick={() => this.handleShow()}>
                  Hire
                </Button>
              ) : (
                <div></div>
              )}
            </center>
            <Modal
              show={setShow}
              onHide={() => this.handleClose()}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Hire A Helper</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                I will not close if you click outside me. Don't even try to
                press escape key.
                <DatePicker
                  selected={startDate}
                  onChange={(date) => this.setStartDate(date)}
                  minDate={new Date(this.state.date)}
                  maxDate={new Date("03-29-2100")}
                  placeholderText="Select a date in February 2020"
                />
                <br></br>
                <br></br>
                <center>
                  <button
                    className="btn btn-warning"
                    onClick={() => this.SeeTimeSlot()}
                  >
                    See Time Slot
                  </button>
                </center>
                <br></br>
                <div className="timeslot">
                  {arrSchedule && arrSchedule.length > 0 ? (
                    arrSchedule.map((item) => {
                      return (
                        <>
                          <div className="container">
                            <button
                              className="button-19"
                              onClick={() => this.BookingHelper(item)}
                            >
                              {item.timeType}
                            </button>
                          </div>
                        </>
                      );
                    })
                  ) : (
                    <div>No Time SLot In this day</div>
                  )}
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => this.handleClose()}>
                  Close
                </Button>
                <Button variant="primary">Understood</Button>
              </Modal.Footer>
            </Modal>
          </div>
          <div className="user-information">
            <div className="detail-info">
              <h1>{user.full_name}</h1>
              <div>Brand: Trung Tâm giúp việc Hồng Phúc</div>
              {detail.status === true ? (
                <div className="status">
                  Status:{" "}
                  <img src="https://www.nicepng.com/png/full/101-1010276_dot-png-green-dot-png.png" />{" "}
                  Online
                </div>
              ) : (
                <div className="status">
                  Status:{" "}
                  <img src="https://www.freepnglogos.com/uploads/dot-png/red-glossy-dot-clip-art-clkerm-vector-clip-art-18.png" />{" "}
                  Offline
                </div>
              )}

              <hr></hr>
              <span>Contact</span>
              <div>Description: </div>
              <div>{user.description}</div>
              <hr></hr>
              <div>Contact: {user.phone_number}</div>
              <hr></hr>
              <div>Year Experience: {detail.yearEx}</div>
              <hr></hr>
              <div>Price: {detail.price} VND</div>
              <div className="container">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Chính sách mua hàng</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path d="M509.5 184.6L458.9 32.8C452.4 13.2 434.1 0 413.4 0H272v192h238.7c-.4-2.5-.4-5-1.2-7.4zM240 0H98.6c-20.7 0-39 13.2-45.5 32.8L2.5 184.6c-.8 2.4-.8 4.9-1.2 7.4H240V0zM0 224v240c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V224H0z" />
                        </svg>
                        Đổi người trong vòng 3 ngày nếu khách hàng không hài
                        lòng.
                      </th>
                    </tr>
                    <tr>
                      <th>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path d="M466.5 83.7l-192-80a48.15 48.15 0 0 0-36.9 0l-192 80C27.7 91.1 16 108.6 16 128c0 198.5 114.5 335.7 221.5 380.3 11.8 4.9 25.1 4.9 36.9 0C360.1 472.6 496 349.3 496 128c0-19.4-11.7-36.9-29.5-44.3zM256.1 446.3l-.1-381 175.9 73.3c-3.3 151.4-82.1 261.1-175.8 307.7z" />
                        </svg>
                        Người giúp việc có kinh nghiệm được đào tạo bài bản.
                      </th>
                    </tr>
                    <tr>
                      <th>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path d="M139.61 35.5a12 12 0 0 0-17 0L58.93 98.81l-22.7-22.12a12 12 0 0 0-17 0L3.53 92.41a12 12 0 0 0 0 17l47.59 47.4a12.78 12.78 0 0 0 17.61 0l15.59-15.62L156.52 69a12.09 12.09 0 0 0 .09-17zm0 159.19a12 12 0 0 0-17 0l-63.68 63.72-22.7-22.1a12 12 0 0 0-17 0L3.53 252a12 12 0 0 0 0 17L51 316.5a12.77 12.77 0 0 0 17.6 0l15.7-15.69 72.2-72.22a12 12 0 0 0 .09-16.9zM64 368c-26.49 0-48.59 21.5-48.59 48S37.53 464 64 464a48 48 0 0 0 0-96zm432 16H208a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h288a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-320H208a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h288a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16zm0 160H208a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h288a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z" />
                        </svg>
                        Cung cấp đầy đủ hợp đồng lao động.
                      </th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default EmployeeDetail;

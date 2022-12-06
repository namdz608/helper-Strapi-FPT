import React, { Component } from "react";
import axios from "axios";
import TopNav from "../Layout/TopNav";
import "./DetailService.scss";

class DetailService extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceInfo: "",
      employees: [],
    };
  }
  async componentDidMount() {
    let id = this.props.match.params;
    let a = await axios.get(
      `http://localhost:1337/api/services/${id.id}?populate=*`
    );
    this.setState({
      serviceInfo: a.data.data.attributes,
      employees: a.data.data.attributes.users_permissions_users.data,
    });
  }

  SeeUserDetails = (id) => {
    this.props.history.push(`/employee-details/${id}`,{ state: this.state.serviceInfo.name });
  };

  render() {
    let { serviceInfo, employees } = this.state;
    return (
      <>
        <TopNav />
        <div className="banner"></div>
        <div className="content-service">
          <div className="name">{serviceInfo.name}</div>
          <div className="description">{serviceInfo.description}</div>
          <div className="description">
            <div
              dangerouslySetInnerHTML={{
                __html: serviceInfo.contentHtml,
              }}
            ></div>
          </div>
          <center>
            <img src={serviceInfo.image} />
          </center>
          <div className="description">
            <h2>Cam kết của Hồng Phúc:</h2>
          </div>
          <div className="description">
            <ul>
              <li>
                Lý lịch của người giúp việc rõ ràng: Người giúp việc do công ty
                cung cấp đều minh bạch về nguồn gốc, có giấy tờ chứng minh nhân
                thân và có xác nhận của chính quyền địa phương nơi cư trú. Có
                xác nhận kiểm tra sức khỏe, đảm bảo không mắc các bệnh truyền
                nhiễm.
              </li>
              <li>Giá cả cạnh tranh</li>
              <li>
                Hỗ trợ khách hàng tối đa: Chính sách của chúng tôi luôn đảm bảo
                lợi ích cao nhất cho khách hàng.
              </li>
              <li>
                Hợp đồng, điều khoản rõ ràng giúp bạn hạn chế rủi ro ở mức thấp
                nhất
              </li>
              <li>
                Hồng Phúc luôn muốn mang lại cho khách hàng những dịch vụ tốt
                nhất, vì thế chúng tôi sẵn sàng lắng nghe mọi ý kiến phản ánh,
                góp ý của khách hàng. Khách hàng có thể phản ánh về công ty nếu
                như trong thời gian sử dụng dịch vụ giúp việc chăm bé của Hồng
                Phúc, người giúp việc không tuân thủ hợp đồng.
              </li>
            </ul>
          </div>
        </div>
        <div className="employees">
          {employees &&
            employees.length > 0 &&
            employees.map((item) => {
              if (item.attributes.Role === "Helper") {
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
                        <img src={item.attributes.image} />
                      </center>
                      <center>
                        <div className="emp-name">
                          Name: {item.attributes.full_name}
                        </div>
                      </center>
                    </div>
                  </div>
                );
              } else {
                return <div>Sad</div>;
              }
            })}
        </div>
      </>
    );
  }
}

export default DetailService;

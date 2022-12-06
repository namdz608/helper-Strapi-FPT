import React, { Component } from "react";
import axios from "axios";
import "./Home.scss";
import TopNav from "./Code/Layout/TopNav";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      services: "",
    };
  }

  ViewDetails = (id) => {
    this.props.history.push(`/detail-service/${id}`);
  };

  async componentDidMount() {
    let a = await axios.get("http://localhost:1337/api/services");
    this.setState({ services: a.data.data });
  }

  render() {
    let { services } = this.state;
    return (
      <>
        <TopNav />
        <div className="banner-home"></div>
        <div className="honor">
          <div className="honor-content">
          Giúp việc Hồng Phương được vinh danh "Top 100 Thương hiệu nổi tiếng Châu Á – Thái Bình Dương 2022”.
          </div>
          <div className="honor-img"></div>
        </div>
        <div className="why-choose">
          <div className="choose-img">
            <div className="choose-contain"></div>
          </div>
          <div className="choose-content">
            <div className="container-content">
              <div className="top">LỰA CHỌN HÀNG ĐẦU THUÊ NGƯỜI GIÚP VIỆC</div>
              <div className="mid">Tại sao chọn chúng tôi</div>
              <div className="bot">
                CÔNG TY TNHH ĐẦU TƯ VÀ XUẤT NHẬP KHẨU HỒNG PHƯƠNG là một trong
                những công ty chuyên cung cấp người lao động chuyên giúp việc
                gia đình, tạp vụ văn phòng, lao động phổ thông hàng đầu hiện
                nay. Với đội ngũ lãnh đạo và nhân viên trẻ, năng động, chuyên
                nghiệp, được đào tạo bài bản, không ngừng nâng cao nghiệp vụ,
                chúng tôi cam kết mang lại cho khách hàng sự hài lòng cao nhất.
                Công ty đã và đang hợp tác cùng các đơn vị, khách hàng như: Công
                ty xuất nhập khẩu Sovina; Đại học FPT; Các doanh nhân, ca sĩ;
                Các gia đình trong các khu biệt thự, chung cư cao cấp; Các xưởng
                sản xuất Thạch Thất, Đông Anh; Các nhà hàng quán ăn, Công ty vận
                chuyển, các khách sạn, cửa hàng thời trang; Các bệnh viện như:
                bệnh viện 103, 108, Việt Đức, bệnh viện huyết học; Các khách
                hàng cần gấp lao động Tết.
              </div>
            </div>
            <div className="choose-check">
              <div className="tick-container">
                <div className="tick-img"></div>
                <div className="tick-content">
                  Đặt lịch nhanh chóng 1900 636 008
                </div>
              </div>
              <div className="tick-container">
                <div className="tick-img"></div>
                <div className="tick-content">Giá cả rõ ràng</div>
              </div>
              <div className="tick-container">
                <div className="tick-img"></div>
                <div className="tick-content">
                  Cung cấp lao động ngay trong ngày
                </div>
              </div>
              <div className="tick-container">
                <div className="tick-img"></div>
                <div className="tick-content">Chuyên nghiệp và tận tâm</div>
              </div>
            </div>
          </div>
        </div>
        <div className="services">Dịch vụ của GIÚP VIỆC Hồng PHƯƠNG</div>
        <div className="parent">
          {services &&
            services.length > 0 &&
            services.map((item) => {
              return (
                <div
                  className="child"
                  onClick={() => this.ViewDetails(item.id)}
                >
                  <div className="icon"></div>
                  <div className="tieu-de">{item.attributes.name}</div>
                  <div className="noi-dung">{item.attributes.description}</div>
                  <div className="click-view">XEM CHI TIẾT</div>
                </div>
              );
            })}
        </div>
      </>
    );
  }
}

export default Home;

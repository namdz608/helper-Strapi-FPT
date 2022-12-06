const nodemailer= require('nodemailer');

let sendSimpleEmail=async(dataSent)=>{
    
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "phuongvtgch17530@fpt.edu.vn", // generated ethereal user
          pass: "dgputoydptepqnkz", // generated ethereal password
        },
      });
    
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Phương Xinh Gái 👻" <phuongvtgch17530@fpt.edu.vn>', // sender address
        to: dataSent.helper_email, // list of receivers
        subject: "Thông Tin Công Ty TNHH Giúp Việc Phương Xjnk Gái Gửi Bạn!!!!!", // Subject line
        text: "Hello world?", // plain text body
        html: `<h2>Xin Chào ${dataSent.helper_name}!</h2>
                <p>Bạn Nhận Được Email Này vì có khách hàng có nhu cầu thuê người giúp việc !!!!!</p>
                <p>Dịch Vụ: ${dataSent.service}</p>
                <p>Thông Tin đặt lịch</p>
                <div><b>Thời Gian: ${dataSent.timeSlot}</b></div>
                <div>Hãy Kiểm Tra Tài Khoản Để Xác Nhận Thông Tin</div>`, // html body
      });
}

let sendAccpetEmail1=async(dataSent)=>{
  let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "phuongvtgch17530@fpt.edu.vn", // generated ethereal user
        pass: "dgputoydptepqnkz", // generated ethereal password
      },
    });
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Admin System 💩💩 👻" <phuongvtgch17530@fpt.edu.vn>', // sender address
      to: dataSent.email, // list of receivers
      subject: "New Status 👹👹👹", // Subject line
      text: "Hello world?", // plain text body
      html:`<h2>Xin Chào ${dataSent.name}!</h2>
      <p>Bạn Nhận Được Email Này vì đã đặt lịch giúp việc thành Công !!!!</p>
      <p>Thông Tin đặt lịch khám bệnh</p>
      <p>Dịch Vụ đã thuê: ${dataSent.service}</p>
      <div><b>Thời Gian: ${dataSent.timeSlot}</b></div>
      <div><b>Nhân Viên Giúp Việc: ${dataSent.helper_name}</b></div>
      <div>Xác Nhận Thông Tin</div>`, 
    });
}

let sendDeniedEmail1=async(dataSent)=>{
  let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "phuongvtgch17530@fpt.edu.vn", // generated ethereal user
        pass: "dgputoydptepqnkz", // generated ethereal password
      },
    });
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Admin System 💩💩 👻" <phuongvtgch17530@fpt.edu.vn>', // sender address
      to: dataSent.email, // list of receivers
      subject: "New Status 👹👹👹", // Subject line
      text: "Hello world?", // plain text body
      html:`<h2>Xin Chào ${dataSent.name}!</h2>
      <p>Rất Tiếc, Chúng Tôi Không THể Dọn Dẹp cho Bạn!!!</p>
      <p>Mong Bạn Thông Cảm</p>`, 
// html bodyml body
    });
}
module.exports={sendSimpleEmail,sendDeniedEmail1,sendAccpetEmail1}
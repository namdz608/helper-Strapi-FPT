import UserLogin from "./Code/UserLogin";
import Home from "./HomeScreen";
import HomeAccount from "./Code/AdminHome/HomeAcc";
import UserManage from "./Code/AdminHome/UserManage";
import { Route, Switch } from "react-router-dom";
import EditUser from "./Code/AdminHome/EditAcc";
import AddUser from "./Code/AdminHome/AddUser";
import HomeService from "./Code/AdminHome/HomeService";
import AddService from "./Code/AdminHome/AddService";
import EditService from "./Code/AdminHome/EditService";
import DetailService from "./Code/HomePage/DetailsService";
import EmployeeDetail from "./Code/HomePage/EmployeeDetail";
import UserHomePage from "./HomeUserAccount"
import ManageSchedule from "./Code/Helper/ManageSchedule";
import BookingSchedule from "./Code/HomePage/BookingSchedule";
import SeeBooking from "./Code/Helper/SeeBooking";
import AllHelper from "./Code/HomePage/AllHelper";
import Introduce from "./Code/HomePage/Introduce";
function App() {
  return (
    <>
      <Switch>
        <Route path="/" component={Home} exact/>
        <Route path="/login" component={UserLogin} />
        <Route path="/home-account" component={HomeAccount}/>
        <Route path="/user-manage" component={UserManage}/>
        <Route path="/edit-user/:id" component={EditUser} />
        <Route path="/add-new-user" component={AddUser} />
        <Route path="/home-services" component={HomeService} />
        <Route path="/services-add-new" component={AddService} />
        <Route path="/services-edit/:id" component={EditService} />
        <Route path="/detail-service/:id" component={DetailService} />
        <Route path="/employee-details/:id" component={EmployeeDetail} />
        <Route path="/user-homepage" component={UserHomePage} />
        <Route path="/helper-schedule" component={ManageSchedule} />
        <Route path="/booking-helper" component={BookingSchedule} />
        <Route path="/see-booking" component={SeeBooking} />
        <Route path="/all-helper" component={AllHelper} />
        <Route path="/introduce" component={Introduce} />
      </Switch>
    </>
  );
}

export default App;

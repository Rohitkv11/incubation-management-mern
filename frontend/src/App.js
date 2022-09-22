import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/login";
import Signup from "./components/Signup/signup";
import Landingpage from "./components/Landingpage/landingpage";
import Status from "./components/Status/status";
import Adminlogin from "./components/Adminlogin/adminlogin";
import Adminpanel from "./components/Adminpanel/adminpanel";
import ViewApp from "./components/Viewapplication/viewapplication";
import ManageRequest from "./components/Managerequest/managerequest";
import Slot from "./components/Slot/slot";
import Token from "./store/tokenContext";
import UserHome from "./pages/userHome";

const App = () => {
  const userInfo = localStorage.getItem("token");
  return (
    <div>
      <Router>
        <Token>
          <Routes>
            <Route path="/" element={<Landingpage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<UserHome />} />
            <Route path="/status" element={<Status />} />
            <Route path="/adminlogin" element={<Adminlogin />} />
            <Route path="/adminpanel" element={<Adminpanel />} />
            <Route path="/viewApplication" element={<ViewApp />} />
            <Route path="/manageRequest" element={<ManageRequest />} />
            <Route path="/slots" element={<Slot />} />
          </Routes>
        </Token>
      </Router>
    </div>
  );
};
export default App;

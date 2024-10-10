import React from "react";
import "./User.css";
import Navbar from "../../Components/Navbar/Navbar";
import UserSideBar from "../../Components/UserSideBar/UserSideBar";
import UserCenterBox from "../../Components/UserCenterBox/UserCenterBox";
const User = () => {
  return (
    <div>
      <Navbar />
      <div className="user-data">
        <UserSideBar />
        <UserCenterBox />
      </div>
    </div>
  );
};

export default User;

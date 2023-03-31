import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings, ExitToApp } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/reducers/userReducer";
import Avatar from "../Avatar/Avatar";

export default function Topbar() {
  const dispatch = useDispatch();

  const user = useSelector(state=>state.user.currentUser)

  const handleLogout = (e) =>{
    e.preventDefault();
    dispatch(logout())
    window.location.reload(false)
  }
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">SHOP Dashoboard</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <div className="topbarIconContainer">
            <ExitToApp onClick={handleLogout} />
          </div>
          <Avatar url={user.avatar} name={ user.fullname || user.username } />
        </div>
      </div>
    </div>
  );
}

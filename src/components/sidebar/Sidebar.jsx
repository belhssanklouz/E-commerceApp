import "./sidebar.css";
import userReducer from "../../redux/reducers/userReducer"
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { sidebarDash,sidebarNoti,sidebarQuick,sidebarStaff } from "../../sideBarData";
import { useState } from "react";

export default function Sidebar(props) {
  console.log(userReducer)
  const [path,setPath] = useState('');
  console.log(props.location.pathname)
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            {sidebarDash.map((item,index)=>(
              <Link to={item.link} className="link" key={index} >
            <li className={`sidebarListItem ${item.link == props.location.pathname ? "active" : ""}`} onClick={(e)=>setPath(props.location.pathname)}>
              {item.icon}
              {item.title}
            </li>
            </Link>
              ))}
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            {sidebarQuick.map((item,index)=>(
              <Link to={item.link} className="link">
              <li className={`sidebarListItem ${item.link == props.location.pathname ? 'active' : ''}`}>
                {item.icon}
                {item.title}
              </li>
            </Link>
              ))}
            <Link to="/products" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Products
              </li>
            </Link>
            <li className="sidebarListItem">
              <AttachMoney className="sidebarIcon" />
              Transactions
            </li>
            <li className="sidebarListItem">
              <BarChart className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MailOutline className="sidebarIcon" />
              Mail
            </li>
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              Feedback
            </li>
            <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Messages
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <WorkOutline className="sidebarIcon" />
              Manage
            </li>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <Report className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

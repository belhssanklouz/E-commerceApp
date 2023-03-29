import "./sidebar.css";
import { Link } from "react-router-dom";
import {
  Timeline,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@material-ui/icons";
import { sidebarDash,sidebarQuick } from "../../sideBarData";

export default function Sidebar(props) {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            {sidebarDash.map((item,index)=>(
              <Link to={item.link} className="link" key={index} >
            <li className={`sidebarListItem ${item.link.includes(props.location.pathname) ? "active" : ""}`} >
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
              <Link to={item.link} className="link" key={index}>
              <li className={`sidebarListItem ${item.link === props.location.pathname ? 'active' : ''}`}>
                {item.icon}
                {item.title}
              </li>
            </Link>
              ))}
              <div className="sidebarMenu"> <h3 className="sidebarTitle">Notifications</h3> <ul className="sidebarList"> <li className="sidebarListItem"> <MailOutline className="sidebarIcon" /> Mail </li> <li className="sidebarListItem"> <DynamicFeed className="sidebarIcon" /> Feedback </li> <li className="sidebarListItem"> <ChatBubbleOutline className="sidebarIcon" /> Messages </li> </ul> </div> <div className="sidebarMenu"> <h3 className="sidebarTitle">Staff</h3> <ul className="sidebarList"> <li className="sidebarListItem"> <WorkOutline className="sidebarIcon" /> Manage </li> <li className="sidebarListItem"> <Timeline className="sidebarIcon" /> Analytics </li> <li className="sidebarListItem"> <Report className="sidebarIcon" /> Reports </li> </ul> </div>
          </ul>
        </div>
      </div>
    </div>
  );
}

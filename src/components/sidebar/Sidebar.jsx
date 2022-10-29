import "./sidebar.css";
import userReducer from "../../redux/reducers/userReducer"
import { Link } from "react-router-dom";
import { sidebarDash,sidebarQuick } from "../../sideBarData";
import { useState } from "react";

export default function Sidebar(props) {
  console.log(userReducer)
  const [path,setPath] = useState('');
  console.log(sidebarQuick[0].link.indexOf(props.location.pathname))
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            {sidebarDash.map((item,index)=>(
              <Link to={item.link} className="link" key={index} >
            <li className={`sidebarListItem ${item.link.includes(props.location.pathname) ? "active" : ""}`} onClick={()=>setPath(props.location.pathname)}>
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
          </ul>
        </div>
      </div>
    </div>
  );
}

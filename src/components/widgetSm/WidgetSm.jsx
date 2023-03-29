import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect } from "react";
import {useDispatch,useSelector} from 'react-redux';
import { getLastestUsers } from "../../redux/apiCalls";
import Avatar from "../Avatar/Avatar";

export default function WidgetSm() {
  const latestUsers = useSelector(state=>state.manageUsers.lastUsers)
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getLastestUsers())
  },[dispatch])
  console.log(latestUsers)
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {latestUsers.map(user=>(
          <li className="widgetSmListItem" key={user._id}>
            <div className="userDetailsContainer">
              <Avatar 
              url={user.avatar} 
              name={user.fullname}
              />
              <div className="widgetSmUser">
                <span className="widgetSmUsername">{user.fullname}</span>
                <span className="widgetSmUserTitle">{user.email}</span>
              </div>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
          ))}
      </ul>
    </div>
  );
}

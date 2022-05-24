import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect } from "react";
import {useDispatch,useSelector} from 'react-redux';
import { getLastestUsers } from "../../redux/apiCalls";

export default function WidgetSm() {
  const latestUsers = useSelector(state=>state.manageUsers.lastUsers)
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getLastestUsers())
  },[dispatch])
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {latestUsers.map(user=>(

          <li className="widgetSmListItem" key={user._id}>
          <img
            src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="widgetSmImg"
            />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{user.username}</span>
            <span className="widgetSmUserTitle">{user.email}</span>
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

import "./widgetLg.css";
import {useDispatch,useSelector} from "react-redux";
import { latestOrders } from "../../redux/apiCalls";
import { useEffect } from "react";
import {format} from 'timeago.js';
import Avatar from "../Avatar/Avatar";

export default function WidgetLg() {
  const dispatch = useDispatch();
  const lastOrders = useSelector(state=>state.orders.lastOrders)

  useEffect(()=>{
    dispatch(latestOrders());
  },[dispatch])
  console.log(lastOrders)
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        <tbody>

        {lastOrders.map(order=>(
          <tr className="widgetLgTr" key={order._id}>
          <td className="widgetLgUser">
            <Avatar 
             url={order?.user?.avatar} 
             name={order?.user?.fullname} 
            />
            <span className="widgetLgName">{order.user?.fullname}</span>
          </td>
          <td className="widgetLgDate">{format(order.createdAt)}</td>
          <td className="widgetLgAmount">${order.amount}</td>
          <td className="widgetLgStatus">
            <Button type={order.status} />
          </td>
        </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

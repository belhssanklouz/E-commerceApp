import { useEffect, useMemo, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { getStats } from "../../redux/apiCalls";

export default function Home() {
  const [stats,setStats] = useState([])

  const stat = useSelector(state=>state.stats.userStats);
  const MONTHS = useMemo(()=>[
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    'May',
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  [])

  useEffect(() => {

    try {
      stat.map(item=>{
        setStats(prev=>[...prev,{name:MONTHS[item._id-1], "Active User":item.total}])
      })
    } catch (error) {
      
    }
   
  }, [MONTHS,stat])
  console.log(stats)
  return (
    <div className="home">
      <FeaturedInfo />
      {console.log(stats)}
      <Chart data={stats} title="User Analytics" grid dataKey="Active User"/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
}

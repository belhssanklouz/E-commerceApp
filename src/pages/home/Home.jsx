import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";

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
        return 0;
      })
    } catch (error) {
      
    }
   
  }, [MONTHS,stat])
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={stats} title="User Analytics" grid dataKey="Active User"/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
}

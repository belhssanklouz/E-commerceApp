import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useSelector } from "react-redux";

export default function FeaturedInfo() {
  const income = useSelector(state=>state.orders.incoms);
  console.log(income)
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revenue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${income[income.length-1]?.total}</span>
          <span className="featuredMoneyRate">
            {(income[income.length-1]?.total/income[income.length-2]?.total)*100 < 0 ? 
            (<span className="featuredMoneyRate">
             -{(income[income.length-1]?.total/income[income.length-2]?.total)*100}
              <ArrowDownward className="featuredIcon negative"/>
            </span>):
            (<span className="featuredMoneyRate">
              +{(income[income.length-1]?.total/income[income.length-2]?.total)*100}
              <ArrowUpward className="featuredIcon"/>
            </span>)} 
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$4,415</span>
          <span className="featuredMoneyRate">
            -1.4 <ArrowDownward className="featuredIcon negative"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,225</span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}

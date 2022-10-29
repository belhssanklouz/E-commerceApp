import {
    LineStyle,
    Timeline,
    PermIdentity,
    Storefront,
    MailOutline,
    DynamicFeed,
    ChatBubbleOutline,
    WorkOutline,
    Report,
  } from "@material-ui/icons";

export const sidebarDash = [
    {title:"Home",link:"/",icon:<LineStyle className="sidebarIcon" />},
    // {title:"Analytics",link:"",icon:<Timeline className="sidebarIcon" />},
    // {title:"Sales",link:"",icon:<TrendingUp className="sidebarIcon" />}
]

export const sidebarQuick = [
    {title:"Users",link:"/users",icon:<PermIdentity className="sidebarIcon" />},
    {title:"Products",link:"/products",icon:<Storefront className="sidebarIcon" />},
    // {title:"Transactions",link:"",icon:<AttachMoney className="sidebarIcon" />},
    // {title:"Reports",link:"",icon:<BarChart className="sidebarIcon" />},
]
    

export const sidebarNoti = [
    {title:"Mail",link:"/",icon:<MailOutline className="sidebarIcon" />},
    {title:"Feedback",link:"/",icon:<DynamicFeed className="sidebarIcon" />},
    {title:"Messages",link:"/",icon:<ChatBubbleOutline className="sidebarIcon" />},
    
]

export const sidebarStaff = [
    {title:"Manage",link:"/",icon:<WorkOutline className="sidebarIcon" />},
    {title:"Analytics",link:"/",icon:<Timeline className="sidebarIcon" />},
    {title:"Reports",link:"/",icon:<Report className="sidebarIcon" />},
]
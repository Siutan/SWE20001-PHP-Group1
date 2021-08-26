import Dashboard from "views/Dashboard.js";
import Icons from "views/Icons.js";
//import Map from "views/Map.js";
import Notifications from "views/Notifications.js";
import Inventory from "views/TableList.js";
import Typography from "views/Typography.js";
import UserProfile from "views/UserProfile.js";
import Sales from "views/Sales";

var routes = [
  {
    path: "/dashboard",
    name: "Charts",
    icon: "tim-icons icon-chart-bar-32",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Sales",
    icon: "tim-icons icon-atom",
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Notification Popups",
    icon: "tim-icons icon-bell-55",
    component: Notifications,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "tim-icons icon-single-02",
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/inventory",
    name: "Inventory",
    icon: "tim-icons icon-basket-simple",
    component: Inventory,
    layout: "/admin",
  },
  {
    path: "/sales",
    name: "Sales",
    icon: "tim-icons icon-money-coins",
    component: Sales,
    layout: "/admin",
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "tim-icons icon-align-center",
    component: Typography,
    layout: "/admin",
  },
];
export default routes;

import Dashboard from "views/Dashboard.js";
import Icons from "views/Icons.js";
import Notifications from "views/Notifications.js";
import Inventory from "views/Inventory.js";
import EditInput from "views/Edit-Input.js";
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
    path: "/dev-stuff",
    name: "Dev-Stuff",
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
    path: "/edit-input",
    name: "Edit/input form",
    icon: "tim-icons icon-single-02",
    component: EditInput,
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
];
export default routes;

import Dashboard from "views/Dashboard.js";
import Analytics from "views/Analytics.js";
import Inventory from "views/Inventory.js";
import Sales from "views/Sales";
import Accounts from "views/Users"
import Products from "views/Products"

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-badge",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/analytics",
    name: "Analytics",
    icon: "tim-icons icon-chart-bar-32",
    component: Analytics,
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
    path: "/products",
    name: "Products",
    icon: "tim-icons icon-app",
    component: Products,
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
    path: "/accounts",
    name: "Accounts",
    icon: "tim-icons icon-single-02",
    component: Accounts,
    layout: "/admin",
  }
];
export default routes;

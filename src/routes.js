/*!

=========================================================
* Paper Dashboard PRO React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import DataTable from "views/DataTable.jsx";
import Dashboard from "views/Dashboard.jsx";
import FileTable from "views/FileTable.jsx";
import IntermediateTable from "views/IntermediateTable.jsx";
import Login from "views/Login.jsx";
import MyPage from "views/MyPage.jsx";
import Register from "views/Register.jsx";
import ScanFile from "views/ScanFile.jsx";
import Setting from "views/Setting.jsx";

const routes = [
  {
    invisible: true,
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/scan",
    name: "Scan",
    icon: "nc-icon nc-bank",
    component: ScanFile,
    layout: "/admin",
  },
  {
    path: "/file",
    name: "File",
    icon: "nc-icon nc-bank",
    component: FileTable,
    layout: "/admin",
  },
  {
    path: "/intermediate-data",
    name: "Intermediate data",
    icon: "nc-icon nc-bank",
    component: IntermediateTable,
    layout: "/admin",
  },
  {
    path: "/data",
    name: "Data",
    icon: "nc-icon nc-bank",
    component: DataTable,
    layout: "/admin",
  },
  {
    invisible: true,
    path: "/setting",
    name: "Setting",
    icon: "nc-icon nc-bank",
    component: Setting,
    layout: "/admin",
  },
  {
    path: "/profile",
    name: "My page",
    icon: "nc-icon nc-bank",
    component: MyPage,
    layout: "/admin",
  },
  {
    invisible: true,
    path: "/login",
    name: "Login",
    icon: "nc-icon nc-bank",
    component: Login,
    layout: "/auth",
  },
  {
    invisible: true,
    path: "/register",
    name: "Register",
    icon: "nc-icon nc-bank",
    component: Register,
    layout: "/auth",
  },
];

export default routes;

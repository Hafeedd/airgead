import { Outlet } from "react-router";
import Sidebar from "../sidebar/Sidebar";
import "./Layout.css"
import Header from "../header/Header";

export const Layout = () => {
    return (
      <div className="d-flex">
        <div className="sidebarCont">
          <Sidebar />
        </div>
          <div className="main_content w-100">
            <Header/>
            <Outlet/>
          </div>
        </div>
    );
  };


export default Layout;  
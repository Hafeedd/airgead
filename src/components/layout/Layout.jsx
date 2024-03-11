import { Outlet } from "react-router";
import Sidebar from "../sidebar/Sidebar";
import "./Layout.css"
import Header from "../header/Header";
import background from '../../assets/images/background.png'

export const Layout = () => {
    return (
      <div className="d-flex" style={{backgroundImage:`url(${background})`,backgroundColor:"white"}}>
        {/* <div className="w-100">asd</div> */}
          <Sidebar />
          <div className="main-content w-100" style={{userSelect:'none'}}>
            <Header/>
            <Outlet/>
          </div>
        </div>
    );
  };


export default Layout;  
import { Outlet } from "react-router";
import Sidebar from "../sidebar/Sidebar";
import "./Layout.css"
import Header from "../header/Header";
import background from '../../assets/images/background.png'
import { useEffect, useState } from "react";
import { Settings } from "../settings/Settings";

export const Layout = () => {
  const [activeSetting , setActiveSetting] = useState(false)

  useEffect(()=>{
    window.addEventListener('click',(e)=>{
      if(!document.getElementById('settings-cont')?.contains(e.target) && !document.getElementById('setting-icon')?.contains(e.target)){
       setActiveSetting(false) 
      }
    })
    return ()=>{window.removeEventListener('click',()=>{})}
  },[])

    return (
      <div className="d-flex" style={{backgroundImage:`url(${background})`,backgroundColor:"white", backgroundRepeat:'no-repeat',backgroundSize:'cover'}}>
        {/* <div className="w-100">asd</div> */}
          <Sidebar />
          <div className="main-content w-100" style={{userSelect:'none'}}>
            <Header {...{activeSetting , setActiveSetting}}/>
            <Outlet/>
            <Settings {...{activeSetting}}/>
          </div>
        </div>
    );
  };


export default Layout;  
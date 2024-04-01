import { Outlet } from "react-router";
import Sidebar from "../sidebar/Sidebar";
import "./Layout.css"
import Header from "../header/Header";
import background from '../../assets/images/background.png'
import { useEffect, useState } from "react";
import { Settings } from "../settings/Settings";
import { useSelector } from "react-redux";

export const Layout = () => {
  const [activeSetting, setActiveSetting] = useState(false)
  const auth = useSelector(state => state.auth.userDetails)
  // console.log(auth)
  //   const handleBeforeUnload = (event) => {
  //     if(!auth.remember){
  //       alert("Are you sure?")
  //       localStorage.removeItem("userDetails");
  //     }
  // };

  // useEffect(() => {
  //     window.addEventListener("beforeunload", handleBeforeUnload);

  //     return () => {
  //         window.removeEventListener("beforeunload", handleBeforeUnload);
  //     };
  // }, []);

  useEffect(() => {
    window.addEventListener('click', (e) => {
      if (!document.getElementById('settings-cont')?.contains(e.target) && !document.getElementById('setting-icon')?.contains(e.target)) {
        setActiveSetting(false)
      }
    })
    return () => { window.removeEventListener('click', () => { }) }
  }, [])

  return (
    <div className="d-flex"
      style={{ 
        // backgroundImage: `url(${background})`,
        backgroundColor: "white",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover' }}>
      {/* <div className="w-100">asd</div> */}
      <Sidebar />
      <div className="main-content w-100" style={{ userSelect: 'none' }}>
        <Header {...{ activeSetting, setActiveSetting }} />
        <Outlet/>
        <Settings {...{ activeSetting }} />
      </div>
    </div>
  );
};


export default Layout;  
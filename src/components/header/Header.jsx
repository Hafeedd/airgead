import "./header.css";
import userProf from "../../assets/icons/prof.jpeg";
import arrow from "../../assets/icons/back_arrow.png";
// import search from "../../assets/icons/search.png";
import setting from "../../assets/icons/setting.png";
import bell from "../../assets/icons/bell.png";
import { useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import e from "express";

const Header = (props) => {
  const {activeSetting , setActiveSetting} = props

  const userData = useSelector(state => state.auth.value?.userDetails)
  const location = useLocation();

  useEffect(() => {
    const element = document.getElementsByClassName("page_head")[0];
    const element2 = document.getElementsByClassName("main header")[0]
    if (element) {
      element2.style.backgroundColor = getComputedStyle(element).backgroundColor
    }
  }, [location.pathname]);

  const navigate = useNavigate();
  return (
    <div className="header main">
      <div className="header-cont w-100 px-4 h-100 d-flex justify-content-between">
        <div className="prev_btn btn" onClick={() => navigate(-1)}>
          <img className="white-to-black me-2" src={arrow} width={"7px"} height={"10px"} />
          Back
        </div>
        <div className="d-flex gap-3 align-items-center">
          {/* <div className="seach_bar_cont rounded-2">
            <img src={search} className="search_img me-3 ms-2 py-2" />
            <input
              className="search_bar rounded-2 border-0 py-1"
              placeholder="Search"
            />
          </div> */}
          <div className="header-item">
            <img src={bell} width="15rem" className="white-to-black" />
          </div>
          <div className="header-item cursor" id={'setting-icon'} onClick={()=>setActiveSetting(true)}>
            <img src={setting} width="18rem" className="white-to-black" />
          </div>
            {userData?.fk_group!=="Controller"&&
          <div className="heaader-user-cont rounded-1 px-2">
            <img src={userProf} alt="user-prof" className="header-user-prof-img" />
            <div>
              <div>{`${userData?.username?.slice(0, 10)} ${userData?.username?.length > 9 ? "..." : ""}`}</div>
              <div className="header-role-text">{userData?.fk_group}</div>
            </div>
          </div>
            }
        </div>
      </div>
    </div>
  );
};

export default Header;

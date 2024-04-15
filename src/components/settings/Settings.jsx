import React from "react";
import "./settings.css";
import IdConf from "../../assets/icons/Id_conf.png";
import CodeIcon from "../../assets/icons/code-conf-icon.png";
import accessPerm from "../../assets/icons/accessPerm.png";
import userProf from "../../assets/icons/prof.jpeg";
import RoleIcon from "../../assets/icons/roleConfiguration.png";
import { useDispatch, useSelector } from "react-redux";
import { useAuthServices } from "../../services/controller/authServices";
import { useNavigate } from "react-router";
import { logout } from "../../redux/authSlice";
import { MdLogout } from "react-icons/md";
import { MEDIA_URL } from "../../api/axios";
import { BiUserX } from "react-icons/bi";
import userImg from "../../assets/icons/lucide_user.png";

export const Settings = (props) => {
  const { activeSetting } = props;
  const auth = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { logoutAuth } = useAuthServices();

  const handleLogout = async () => {
    try {
      const res = await logoutAuth();
      if (res.success) {
        localStorage.setItem("userDetails", false);
        navigate("/login");
        dispatch(logout());
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      id={`settings-cont`}
      className={`settings ${activeSetting && "active"} ${
        auth?.userDetails?.fk_group === "Controller" && "controller"
      }`}
    >
      <div onClick={handleLogout} className="mt-4 text-end pe-2 cursor">
        <MdLogout size={"1.5rem"} className="me-2" />
        Logout
      </div>
      <div className="ps-5">
        <div
          className={`company-logo ${
            auth?.userDetails?.fk_group == "Company"
              ? "company border-0"
              : "controller"
          } pb-4 h-100 pt-4`}
        >
          <div
            className="d-flex text-light gap-3 cursor"
            onClick={() => navigate("/profile")}
          >
            <img
              className="header-user-prof-img company"
              src={
                auth?.userDetails?.image
                  ? MEDIA_URL + auth?.userDetails?.image
                  : userProf
              }
              alt="user"
            />
            <span>
              <h3>{auth?.userDetails?.username}</h3>
              {auth?.userDetails?.fk_role}
            </span>
          </div>
        </div>
      </div>
      <div
        className="settings-item mt-5"
        onClick={() => navigate("/id-configuration")}
      >
        <img src={IdConf} alt="Id Conf" /> Id Configuration
      </div>
      {auth?.userDetails?.fk_group === "Controller" ? (
        <></>
      ) : (
        <>
          <div
            onClick={() => navigate("/code-configuration")}
            className="settings-item mt-5"
          >
            <img src={CodeIcon} alt="access perm" />
            Code Configuration
          </div>
          <div
            onClick={() => navigate("/role-configuration-list")}
            className="settings-item mt-5"
          >
            <img src={RoleIcon} alt="access perm" />
            Role Configurations
          </div>
          <div
            onClick={() => navigate("/user-list")}
            className="settings-item mt-5"
          >
            <img src={userImg} alt="access perm" />
            User Register
          </div>
          <div
            onClick={() => navigate("/account-initialize")}
            className="settings-item mt-5"
          >
            <BiUserX size={34} className="p-0 m-0"/>
            Account Initializes
          </div>
        </>
      )}

      <div
        onClick={() => navigate("/email-configuration")}
        className="settings-item mt-5"
      >
        <img src={userImg} alt="email-conf" />
        Email Configuration
      </div>
      {/* <div onClick={handleLogout} className="settings-item mt-5">
                <img src={IdConf} alt='access perm' />
                Logout
            </div> */}
    </div>
  );
};

import React, { useState } from "react";
import "./loginMainPage.css";
import loginAnime from "../../assets/images/login.svg";
import vitezLogoWatermark from "../../assets/images/VITEZ LOGO-01 2.svg";
import vitezLogo from "../../assets/images/VITEZ LOGO-01 1.svg";
import { useLocation, useNavigate } from "react-router";
import Register from "./components/Register";
import { Login } from "./components/Login";
import { Verification } from "./components/Verification";
import { useAuthServices } from "../../services/controller/authServices";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";
import ForgotPwEmail from "./components/ForgotPwEmail";
import RecoveryQuestion from "./components/RecoveryQuestion";
import SetNewPassword from "./components/SetNewPassword";
import { Modal } from "react-bootstrap";
import AddRecovery from "./components/AddRecovery";

const LoginMainPage = () => {
  const [token, setToken] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpWait, setOtpWait] = useState(false);
  const [user, setUser] = useState({
    username: null,
    password: null,
    remember: false,
  });
  const [show, setShow] = useState(false);
  // const [recovery, setRecovery] = useState(false);
  const [username, setUsername] = useState("");
  const [forpass, setForpass] = useState(false);
  const [verpass, setVerpass] = useState(false);
  const [isverpass, setIsverpass] = useState(false);
  const [secpass, setSecpass] = useState(false);
  const [newpass, setNewpass] = useState(false);
  const [questions, setQuestions] = useState();

  console.log(
    "Codeme",
    username,
    forpass,
    verpass,
    isverpass,
    secpass,
    newpass
  );

  const dispatch = useDispatch();

  const { loginAuth, getAccount } = useAuthServices();

  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (value === "") {
      setUser((data) => ({ ...data, [name]: null }));
    } else if (name === "remember") {
      setUser((data) => ({ ...data, [name]: !user.remember }));
    } else {
      setUser((data) => ({ ...data, [name]: value }));
    }
  };

  const handleOtpChange = (data) => {
    setOtp(data);
  };

  const handleResendOtp = async (e) => {
    e.preventDefault();
    try {
      setOtpWait(true);
      let resp = await loginAuth({ resend: true }, { t: token });
      if (!resp.success) setOtpWait(false);
    } catch (err) {
      setOtpWait(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let resp;
      if (token && forpass && verpass) {
        resp = await getAccount({ otp: otp }, { t: token });
      } else if (token) {
        resp = await loginAuth({ otp: otp }, { t: token });
      } else resp = await loginAuth(user);
      if (resp.success) {
        if (forpass && token && verpass) {
          if (resp?.data?.is_verified === true) {
            setIsverpass(true);
            setNewpass(true);
            setToken(resp?.data?.verification_token);
          } else {
            setSecpass(true);
            setQuestions(resp?.data?.security_questions);
            setToken(resp?.data?.verification_token);
          }
        } else if (token) {
          setToken(false);
          let data = resp.data;
          const { username, mobile, image, email, fk_role, fk_group } = data;
          localStorage.setItem("token", data.token);
          dispatch(
            login({
              token: data.token,
              userDetails: {
                ...{ username, mobile, image, email, fk_role, fk_group },
              },
            })
          );
          navigate("/");
        }
        setToken(resp.data.verification_token);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
      Swal.fire(
        "Error",
        err?.response?.data?.message ||
        "Something went wrong. Please try again later.",
        "error"
      );
    }
  };

  return (
    <div className="row">
      <div className="col login-main-page-lh vh-100 d-flex flex-column justify-content-center">
        <div className="d-flex justify-content-center flex-column align-items-center">
          <img className="" src={vitezLogo} alt="" />
          <img src={loginAnime} alt="" width="360" height="380" />
          <p className="main-image-under-text railway-font text-light">
            Lorem, ipsum um! In labore minus ipsa reiciendis aperiam n labore
            minus ipsa reicien velit dolores!
          </p>
        </div>
      </div>
      <div className="col d-flex justify-content-center align-items-center">
        <img
          style={{ position: "fixed", zIndex: -1 }}
          src={vitezLogoWatermark}
          alt=""
        />
        {location.pathname === "/register" ? (
          <Register />
        ) : !token &&
          !forpass &&
          !verpass &&
          !isverpass &&
          !secpass &&
          !newpass ? (
          <Login
            {...{
              user,
              handleChange,
              handleSubmit,
              loading,
              setForpass,
            }}
          />
        ) : !forpass && !verpass && !isverpass && !secpass && !newpass ? (
          <Verification
            {...{
              handleResendOtp,
              setOtpWait,
              otpWait,
              otp,
              handleOtpChange,
              handleSubmit,
              // setIsverpass,
              // setSecpass,
              // setNewpass,
              // setToken
            }}
          />
        ) : forpass && !verpass && !isverpass && !secpass && !newpass ? (
          <ForgotPwEmail
            {...{
              loading,
              setShow,
              token,
              setToken,
              otp,
              setOtp,
              username,
              setUsername,
              setVerpass,
            }}
          />
        ) : forpass && verpass && !isverpass && !secpass && !newpass ? (
          <Verification
            {...{
              handleResendOtp,
              setOtpWait,
              otpWait,
              otp,
              handleOtpChange,
              handleSubmit,
              // setIsverpass,
              // setSecpass,
              // setNewpass,
              // setToken
              verpass
            }}
          />
        ) : forpass && verpass && isverpass && newpass && !secpass ? (
          <SetNewPassword {...{ token, setToken }} />
        ) : forpass && verpass && secpass && !isverpass && !newpass ? (
          <RecoveryQuestion
            {...{ questions, token, setQuestions, setNewpass, setToken }}
          />
        ) : (
          forpass &&
          verpass &&
          secpass &&
          newpass &&
          !isverpass && <SetNewPassword {...{ token, setToken }} />
        )}
      </div>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        centered
        size="lg"
        contentClassName="d-flex justify-content-center align-items-center py-5 px-5"
      >
        <SetNewPassword {...{ setShow }} />
      </Modal>
      <Modal
        // show={recovery}
        // onHide={() => setRecovery(false)}
        centered
        size="lg"
        contentClassName="d-flex justify-content-center align-items-center py-5 px-5"
      >
        {/* <AddRecovery {...{ setRecovery }} /> */}
      </Modal>
    </div>
  );
};
export default LoginMainPage;

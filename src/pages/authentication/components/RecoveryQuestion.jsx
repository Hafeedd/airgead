import React from 'react'
import userProfileIcon from '../../../assets/images/iconamoon_questionmark-circle-fill.png'
import { TextField } from "@mui/material";
import vitezLogo from '../../../assets/images/VITEZ LOGO-01 1.svg'


function RecoveryQuestion() {
  return (
    <form
    // onSubmit={handleSubmit}
    className="d-flex flex-column align-items-center railway-font"
    style={{ width: "70%", height: "fit-content" }}
  >
    <div><img className='' src={vitezLogo} alt="" /></div>
    <div className="d-flex mt-5">
      <div className="d-flex flex-column justify-content-center mt-2">
        <img src={userProfileIcon} alt="" />
      </div>
      <div className="p-2">
        <h1 className="p-0 m-0" style={{ font: "27px" }}>
        Recovery Question
        </h1>
        <p>
        Check Your mesaage . We've Sent You the PIN at 9087657389</p>
      </div>
    </div>

    <div className="w-100">
        <label className='fw-bold text-dark fs-5 mt-3' >What is the capital city of Australia?</label>
        <TextField
        // onChange={handleChange}
        // value={user.username}
        name="email"
        className="auth-input-field my-3 "
        id="outlined-basic"
        // label="Enter Details"
        variant="outlined"
      />
    </div>

    <div style={{ width: "100%" }}>
      <button
        type="submit"
        // disabled={loading}
        className="btn-login rounded py-3 fs-5 d-flex px-0 align-items-center justify-content-center"
      > Next | Set New Password        {/* {loading ? "Loading" : "Login"} &nbsp;&nbsp; */}
        {/* {loading && <div className="login-loader" />} */}
      </button>
    </div>

    {/* <div className={`my-4 ${controllerExist ? "invisible" : "visible"}`}>
      <p>
        Don’t have Account?{" "}
        <span
          className="cursor"
          style={{ color: "#EE7777" }}
          onClick={() => navigate("/register")}
        >
          Signup
        </span>
      </p>
    </div> */}

    {/* <div
      className="login-btm-border rounded d-flex justify-content-center align-item-center py-2"
      style={{ width: "100%" }}
    >
      <img className="px-1" src={emailIcon} alt="" />
      <img className="px-1" src={mobileIcon} alt="" />
      <p className="p-0 mt-2">Connect to the Email or Mobile Number</p>
    </div> */}
  </form>
  )
}

export default RecoveryQuestion
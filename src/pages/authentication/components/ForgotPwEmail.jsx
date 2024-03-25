import React from "react";
import userProfileIcon from '../../../assets/images/iconamoon_profile-circle-fill.png';
import { TextField } from "@mui/material";
import vitezLogo from '../../../assets/images/VITEZ LOGO-01 1.svg'
function ForgotPwEmail(props) {
    const {setShow}=props
    const handleShow =(e)=>{
        e.preventDefault()
        setShow(true)
    }
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
            Enter Phone number or Email
            </h1>
            <p>
            simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
            </p>
          </div>
        </div>

        <div className="w-100">
          <TextField
            // onChange={handleChange}
            // value={user.username}
            name="email"
            className="auth-input-field my-4"
            id="outlined-basic"
            label="Enter Details"
            variant="outlined"
          />
        </div>

        <div style={{ width: "100%" }}>
          <button
            type="submit"
            // disabled={loading}
            onClick={handleShow}
            className="btn-login rounded py-3 fs-5 d-flex px-0 align-items-center justify-content-center"
          > GET OTP
            {/* {loading ? "Loading" : "Login"} &nbsp;&nbsp; */}
            {/* {loading && <div className="login-loader" />} */}
          </button>
        </div>

       
      </form>
    
  );
}

export default ForgotPwEmail;

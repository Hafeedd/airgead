import React, { useState } from "react";
import userProfileIcon from '../../../assets/images/profile-circle.png';
import { TextField } from "@mui/material";
import vitezLogo from '../../../assets/images/VITEZ LOGO-01 1.svg'
import { useAuthServices } from "../../../services/controller/authServices";
import Swal from "sweetalert2";
function ForgotPwEmail(props) {
    const {setShow,loading,token, setToken,otp,setOtp,username,setUsername,setVerpass}=props
    // const handleShow =(e)=>{
    //     e.preventDefault()
    //     setShow(true)
    // }
    const{getAccount}=useAuthServices()
   
    const handleSubmit= async(e)=>{
      e.preventDefault()
      try{
        const resp = await getAccount({'username':username},null)
        if (resp?.success) {
          setToken(resp?.data?.verification_token)
          setVerpass(true)
      }
      }catch(err){
        Swal.fire({
            title: "Failed",
            text: err?.response?.data?.error,
            icon: "error",
            timer: 1000,
            showConfirmButton: false,
        });
      }
    }
  return (
   
      <form
        onSubmit={handleSubmit}
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
            Enter Your Username
            </h1>
            <p>
            simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
            </p>
          </div>
        </div>

        <div className="w-100">
          <TextField
            onChange={(e)=>setUsername(e.target.value)}
            value={username}
            name="username"
            className="auth-input-field my-4"
            id="outlined-basic"
            label="Enter Username"
            variant="outlined"
            required
          />
        </div>

        <div style={{ width: "100%" }}>
          <button
            type="submit"
            // disabled={loading}
            // onClick={handleShow}
            className="btn-login rounded py-3 fs-6 d-flex px-0 align-items-center justify-content-center"
          >GET OTP
             {/* {loading ? "Loading" : "GET OTP"} &nbsp;&nbsp;
            {loading && <div className="login-loader" />} */}
          </button>
        </div>

       
      </form>
    
  );
}

export default ForgotPwEmail;

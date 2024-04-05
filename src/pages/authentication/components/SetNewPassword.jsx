import React, { useState } from 'react'
import userProfileIcon from '../../../assets/images/lock-circle.png';
import { TextField } from "@mui/material";
import vitezLogo from '../../../assets/images/VITEZ LOGO-01 1.svg'
import { useAuthServices } from '../../../services/controller/authServices';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

function SetNewPassword(props) {
    const {setShow,token,setToken}=props
    // const handleShow =(e)=>{
    //     e.preventDefault()
    //     setShow(false)
    // }
    const[password,setPassword]=useState()
    const[confirmPassword,setConfirmPassword]=useState()
    const{resetAccount}=useAuthServices()
    const navigate = useNavigate();
    const handleSubmit = async(e)=>{
      e.preventDefault()
      try{
        if (password==confirmPassword){
        const resp = await resetAccount({password:password},{t:token})
        if (resp.success){
          console.log(resp?.data)
          setPassword('')
          setConfirmPassword('')
          setToken('')
          navigate("/");
        }
        } else{
          Swal.fire({
            title: "Password Mismatch",
            text: "please try again",
            icon: "info",
            timer: 1000,
            showConfirmButton: false,
        });
        }
      }catch(err){

      }
    }

  return (
    <form
        onSubmit={handleSubmit}
        className="d-flex flex-column align-items-center railway-font"
        style={{ width: "70%", height: "fit-content" }}
      >
        <div><img className='' src={vitezLogo} alt="" /></div>
        <div className="d-flex mt-3">
          <div className="d-flex flex-column justify-content-center mt-2">
            <img src={userProfileIcon} alt="" />
          </div>
          <div className="p-2">
            <h1 className="p-0 m-0" style={{ font: "27px" }}>
            Set New Password
            </h1>
            <p>
            Check Your mesaage . We've Sent You the PIN at 9087657389
            </p>
          </div>
        </div>

        <div className="w-100">
            <TextField
            onChange={(e)=>setPassword(e.target.value)}
            value={password}
            name="newPassword"
            className="auth-input-field my-4"
            id="outlined-basic"
            label="New Password"
            variant="outlined"
            type='password'
          />
           <TextField
            onChange={(e)=>setConfirmPassword(e.target.value)}
            value={confirmPassword}
            name="confirmPassword"
            className="auth-input-field my-4"
            id="outlined-basic"
            label="Confirm Password"
            variant="outlined"
            type='text'
          />
          
            
        </div>

        <div style={{ width: "100%" }}>
          <button
            type="submit"
            // disabled={loading}
            // onClick={handleShow}
            className="btn-login rounded py-3 mb-5 fs-5 d-flex px-0 align-items-center justify-content-center"
          > Submit
            {/* {loading ? "Loading" : "Login"} &nbsp;&nbsp; */}
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

export default SetNewPassword
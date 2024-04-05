import React, { useState } from 'react'
import userProfileIcon from '../../../assets/images/security-circle.png'
import { TextField } from "@mui/material";
import vitezLogo from '../../../assets/images/VITEZ LOGO-01 1.svg'
import { IoMdArrowRoundForward } from "react-icons/io";
import { useAuthServices } from '../../../services/controller/authServices';
import Swal from 'sweetalert2';
function RecoveryQuestion(props) {
  const{questions,token,setQuestions,setNewpass,setToken}=props
  const{verifyAccount}=useAuthServices()
  const [count,setcount] =useState(0)
  let limit=questions.length-1
  const [answer,setAnswer] = useState()
  const handleQASubmit = async(e)=>{
    e.preventDefault()
    try{
      if (count == limit) {
      let temp=questions
      temp[count].answer = answer
      setQuestions(temp)
      setAnswer('')
      const resp = await verifyAccount({questions:temp},{t:token})
      if (resp.success) { 
          console.log(resp?.data)
          setNewpass(true)
          setToken(resp?.data?.verification_token)
          setQuestions('')
      }
    }else if (count<limit){
      setcount(count+1)
      let temp =questions
      temp[count].answer = answer
      setQuestions(temp)
      setAnswer('')
    }}catch (err) {
      Swal.fire({
        title: "Oops! Something went wrong",
        text: err?.response?.data?.message,
        icon: "info",
        timer: 1000,
        showConfirmButton: false,
    });
    }
  }
  console.log('Questions', questions)
  return (
    <form
    onSubmit={handleQASubmit}
    className="d-flex flex-column align-items-center railway-font"
    style={{ width: "70%", height: "fit-content" }}
  >
    <div><img className='' src={vitezLogo} alt="" /></div>
    <div className="d-flex mt-5 align-items-start w-100">
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
        <label className='fw-bold text-dark fs-5 mt-3 ms-2' >
        <IoMdArrowRoundForward /> {questions[count].question}
        </label>
        <TextField
        onChange={(e)=>setAnswer(e.target.value)}
        value={answer}
        name="email"
        className="auth-input-field my-3 "
        id="outlined-basic"
        label="Enter Answer"
        variant="outlined"
        required
      />
    </div>

    <div style={{ width: "100%" }}>
      <button
        type="submit"
        // disabled={loading}
        className="btn-login rounded py-3 fs-5 d-flex px-0 align-items-center justify-content-center"
      > {count<limit? 'Next' :'Set New Password'}        {/* {loading ? "Loading" : "Login"} &nbsp;&nbsp; */}
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
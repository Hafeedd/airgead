import React from 'react'
import userProfileIcon from '../../../assets/images/iconamoon_questionmark-circle-fill.png'
import { TextField } from "@mui/material";
import vitezLogo from '../../../assets/images/VITEZ LOGO-01 1.svg'

const AddRecovery = (props) => {
    const {setRecovery}=props
    const handleRecovery = (e)=>{
        e.preventDefault()
        setRecovery(false)
    }
  return (
    <form
    // onSubmit={handleSubmit}
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
        Add Recovery Question
        </h1>
        <p>
        Check Your mesaage . We've Sent You the PIN at 9087657389</p>
      </div>
    </div>

    <div className="w-100">
       
        <TextField
        // onChange={handleChange}
        // value={user.username}
        name="email"
        className="auth-input-field my-3 "
        id="outlined-basic"
        label="Enter Question"
        variant="outlined"
      />
        <TextField
        // onChange={handleChange}
        // value={user.username}
        name="email"
        className="auth-input-field my-3 "
        id="outlined-basic"
        label="Enter Answer"
        variant="outlined"
      />
    </div>

    <div style={{ width: "100%" }}>
      <button
        type="submit"
        // disabled={loading}
        onClick={handleRecovery}
        className="btn-login rounded py-3 fs-5 d-flex px-0 align-items-center justify-content-center"
      > Next | Login       {/* {loading ? "Loading" : "Login"} &nbsp;&nbsp; */}
        {/* {loading && <div className="login-loader" />} */}
      </button>
    </div>

  </form>
  )
}

export default AddRecovery
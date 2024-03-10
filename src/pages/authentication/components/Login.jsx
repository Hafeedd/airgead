import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import userProfileIcon from '../../../assets/images/iconamoon_profile-circle-fill.png'
import TextField from '@mui/material/TextField';
import emailIcon from '../../../assets/images/mdi_email-open-outline.svg'
import mobileIcon from '../../../assets/images/icomoon-free_mobile.svg'
import PasswordField from './PasswordField'

export const Login = (props) => {
    const { user, handleChange, handleSubmit } = props

    const navigate = useNavigate()

    return (
        <div className='d-flex flex-column align-items-center railway-font' style={{ width: "70%", height: "fit-content" }}>

            <div className='d-flex mt-5'>
                <div className='d-flex flex-column justify-content-center mt-2'>
                    <img src={userProfileIcon} alt="" />
                </div>
                <div className='p-2'>
                    <h1 className='p-0 m-0' style={{ font: "27px" }}>Login</h1>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. itiis dicta non is labore fugiat voluptates assumenda iste!</p>
                </div>
            </div>

            <div className='w-100'>
                <TextField onChange={handleChange} value={user.username} name="username" className='auth-input-filed my-4' id="outlined-basic" label="User Name" variant="outlined" />
            </div>
            <PasswordField name="password" state={user} {...{ handleChange }} />

            <div className='d-flex flex-row justify-content-between my-4' style={{ width: "100%" }}>
                <div className='d-flex align-items-center'>
                    <input type="checkbox" name="" id="remember-me" />
                    <label className='ms-2' htmlFor="remember-me">Remember Me</label>
                </div>
                <p>Forgot Password</p>
            </div>

            <div style={{ width: "100%" }}>
                <button onClick={handleSubmit} className='btn-login rounded py-3' >Login</button>
            </div>

            <div className='my-4'>
                <p>Don’t have Account? <span style={{ color: "#EE7777" }}
                    onClick={() => navigate('/register')}>Signup</span></p>
            </div>

            <div className='login-btm-border rounded d-flex justify-content-center align-item-center py-2' style={{ width: "100%" }}>

                <img className='px-1' src={emailIcon} alt="" />
                <img className='px-1' src={mobileIcon} alt="" />
                <p className='p-0 mt-2'>Connect to the Email or Mobile Number</p>

            </div>

        </div>
    )
}

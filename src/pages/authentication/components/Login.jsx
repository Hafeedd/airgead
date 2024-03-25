import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import userProfileIcon from '../../../assets/images/iconamoon_profile-circle-fill.png'
import TextField from '@mui/material/TextField';
import emailIcon from '../../../assets/images/mdi_email-open-outline.svg'
import mobileIcon from '../../../assets/images/icomoon-free_mobile.svg'
import PasswordField from './PasswordField'
import { useAuthServices } from '../../../services/controller/authServices';
import ForgotPwEmail from './ForgotPwEmail';

export const Login = (props) => {
    const { user, handleChange, handleSubmit, loading ,forgot,setForgot} = props

    const [controllerExist, setControllerExist] = useState(true)

    const { checkController } = useAuthServices()

    useEffect(() => {
        handleCheckController()
    }, [])

    const handleCheckController = async () => {
        try {
            let resp = await checkController()
            if (resp.success) {
                setControllerExist(resp?.data?.exist || true)
            }
        } catch (err) { }
    }

    const navigate = useNavigate()

    const handleForgot =()=>{
        setForgot(true)
    }
    return (
        <form onSubmit={handleSubmit} className='d-flex flex-column align-items-center railway-font' style={{ width: "70%", height: "fit-content" }}>

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
                <TextField onChange={handleChange} value={user.username} name="username" className='auth-input-field my-4' id="outlined-basic" label="User Name" variant="outlined" />
            </div>
            <PasswordField name="password" state={user} {...{ handleChange }} />

            <div className='d-flex flex-row justify-content-between my-4' style={{ width: "100%" }}>
                <div className='d-flex align-items-center'>
                    <input type="checkbox" id="remember-me" onChange={handleChange}
                     name="remember" checked={user.remember} />
                    <label className='ms-2' htmlFor="remember-me">Remember Me</label>
                </div>
                <p className='cursor' onClick={handleForgot}>Forgot Password</p>
            </div>

            <div style={{ width: "100%" }}>
                <button type='submit' disabled={loading} className='btn-login rounded py-3 d-flex px-0 align-items-center justify-content-center' >
                    {loading ? "Loading" : "Login"} &nbsp;&nbsp;
                    {loading && <div className='login-loader' />}</button>
            </div>

            <div className={`my-4 ${controllerExist ? 'invisible' : 'visible'}`}>
                <p>Don’t have Account? <span className='cursor' style={{ color: "#EE7777" }}
                    onClick={() => navigate('/register')}>Signup</span></p>
            </div>

            <div className='login-btm-border rounded d-flex justify-content-center align-item-center py-2' style={{ width: "100%" }}>

                <img className='px-1' src={emailIcon} alt="" />
                <img className='px-1' src={mobileIcon} alt="" />
                <p className='p-0 mt-2'>Connect to the Email or Mobile Number</p>

            </div>

        </form>
    )
}

import React from 'react'
import './login.css'
import loginAnime from '../../../assets/images/login.svg'
import vitezLogoWatermark from '../../../assets/images/VITEZ LOGO-01 2.svg'
import userProfileIcon from '../../../assets/images/iconamoon_profile-circle-fill.png'
import TextField from '@mui/material/TextField';
import emailIcon from '../../../assets/images/mdi_email-open-outline.svg'
import mobileIcon from '../../../assets/images/icomoon-free_mobile.svg'
import LoginMainPage from '../components/LoginMainPage'
import PasswordField from '../components/PasswordField'

const Login = () => {
  return (
    <>
        <LoginMainPage>
        <div className='d-flex flex-column align-items-center railway-font' style={{width:"70%", height:"fit-content"}}>
                    
            <div className='d-flex mt-5'>
                <div className='d-flex flex-column justify-content-center mt-2'>
                    <img src={userProfileIcon} alt="" />
                </div>
                <div className='p-2'>
                    <h1 className='p-0 m-0' style={{font:"27px"}}>Login</h1>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. itiis dicta non is labore fugiat voluptates assumenda iste!</p>
                </div>
            </div>

            <div style={{width:"100%"}}>
                <TextField className='auth-input-filed my-4' id="outlined-basic" label="User Name" variant="outlined" /> 
            </div>

            {/* <div style={{width:"100%"}}>
                <TextField className='auth-input-filed' id="outlined-basic" label="Password" variant="outlined" />
            </div> */}

            <PasswordField/>

            <div className='d-flex flex-row justify-content-between my-4' style={{width:"100%"}}>
                <div className='d-flex'>
                    <input type="checkbox" name="" id="" />
                    <p>Remember Me</p>
                </div>
                <p>Forgot Password</p>
            </div>

            <div style={{width:"100%"}}>
                <button className='btn-login rounded py-3' >Login</button>
            </div>

            <div className='my-4'>
                <p>Don’t have Account? <span style={{color:"#EE7777"}}>Signup</span></p>
            </div>
            
            <div className='login-btm-border rounded d-flex justify-content-center align-item-center py-2' style={{width:"100%"}}>
                
                <img className='px-1' src={emailIcon} alt="" />
                <img className='px-1' src={mobileIcon} alt="" />
                <p className='p-0 mt-2'>Connect to the Email or Mobile Number</p>

            </div>
        
        </div>
        </LoginMainPage>
    </>
  )
}

export default Login
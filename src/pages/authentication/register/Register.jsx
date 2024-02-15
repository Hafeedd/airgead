import React from 'react'
import LoginMainPage from '../components/LoginMainPage'
import userProfileIcon from '../../../assets/images/iconamoon_profile-circle-fill.png'
import uploadImage from '../../../assets/images/upload-image.svg'
import TextField from '@mui/material/TextField';
import uploadIcon from '../../../assets/images/upload-icon.png'

const Register = () => {
  return (
    <>
        <LoginMainPage>
            <div className='d-flex flex-column align-items-center' style={{width:"70%",height:"fit-content"}}>
                <div className='d-flex'>
                    <div className='d-flex flex-column justify-content-center mt-2'>
                        <img src={userProfileIcon} alt="" />
                    </div>
                    <div className='p-2'>
                        <h1 className='p-0 m-0 railway-font' style={{font:"27px"}}>Register</h1>
                        <p className='railway-font'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. itiis dicta non is labore fugiat voluptates assumenda iste!</p>
                    </div>
                </div>
                    
                <div className='row p-0' style={{width:"100%"}}>
                    <div className="col-4 p-0 ">
                        <img className='mt-3' src={uploadImage} alt="" />
                        <button className='btn-login rounded mt-3 py-2 ' ><span><img src={uploadIcon} alt="" /></span>Upload Image</button>
                    </div>
                    <div className="col-7 ms-5  p-0 ">
                    <TextField className='auth-input-filed my-3  ' id="outlined-basic" label="First Name" variant="outlined" /> 
                    <TextField className='auth-input-filed my-2' id="outlined-basic" label="Last Name" variant="outlined" /> 
                    <TextField className='auth-input-filed my-3' id="outlined-basic" label="User Name" variant="outlined" /> 
                    </div>
                </div>
                <div>
                    <TextField className='auth-input-filed my-2' id="outlined-basic" label="Email" variant="outlined" />
                    <TextField className='auth-input-filed my-3' id="outlined-basic" label="Phone" variant="outlined" />
                    <TextField className='auth-input-filed my-2' id="outlined-basic" label="Password" variant="outlined" />
                    <TextField className='auth-input-filed my-3' id="outlined-basic" label="Confirm Password" variant="outlined" />
                </div>

                <div style={{width:"100%"}}>
                    <button className='btn-login rounded py-3 mt-3 railway-font' >Login</button>
                </div>
            </div>
        </LoginMainPage>
    
    </>
  )
}

export default Register
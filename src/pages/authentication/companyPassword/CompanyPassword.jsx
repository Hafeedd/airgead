import React from 'react'
import LoginMainPage from '../components/LoginMainPage'
import userProfileIcon from '../../../assets/images/iconamoon_profile-circle-fill.png'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PasswordField from '../components/PasswordField';


const CompanyPassword = () => {

    return (
        <>
            <LoginMainPage>

                <div className='d-flex flex-column align-items-center' style={{ width: "70%", height: "fit-content" }}>
                    <div className='d-flex mt-5' style={{ width: "100%" }}>
                        <div className='d-flex flex-column justify-content-center mt-2'>
                            <img src={userProfileIcon} alt="" />
                        </div>
                        <div className='p-2 railway-font'>
                            <h1 className='p-0 m-0' style={{ font: "27px" }}>Company Name</h1>
                            <p>Lorem ipsum dolor,ng elit. itabore fugiat voluptates assumenda iste!</p>
                        </div>
                    </div>
                    
                    <PasswordField/>

                    <p style={{ width: "100%" }} className='d-flex justify-content-end railway-font'>Forgot Password ?</p>

                    <button className='btn-login rounded py-3 railway-font' >Login</button>

                </div>
            </LoginMainPage>
        </>
    )
}

export default CompanyPassword
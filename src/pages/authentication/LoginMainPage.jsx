import React, { useState } from 'react'
import './loginMainPage.css'
import loginAnime from '../../assets/images/login.svg'
import vitezLogoWatermark from '../../assets/images/VITEZ LOGO-01 2.svg'
import vitezLogo from '../../assets/images/VITEZ LOGO-01 1.svg'
import { useLocation, useNavigate } from 'react-router'
import Register from './components/Register'
import { Login } from './components/Login'
import { Verification } from './components/Verification'
import { useAuthServices } from '../../services/auth/authServices'
import Swal from 'sweetalert2'

const LoginMainPage = () => {
  const [token, setToken] = useState(false)
  const [otp, setOtp] = useState('')
  const [user, setUser] = useState({
    username: null,
    password: null,
  })

  const { login } = useAuthServices()

  const navigate = useNavigate()
  const location = useLocation()

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    if (value === "") {
      setUser(data => ({ ...data, [name]: null }))
    } else {
      setUser(data => ({ ...data, [name]: value }))
    }
  }

  const handleOtpChange = (data) => {
    setOtp(data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let resp
      if(token){
        resp = await login({otp:otp},{t:token})
      }
      else
      resp = await login(user)
      if (resp.success) {
        if(token){
          setToken(false)
          
          navigate("/")
        }
        setToken(resp.data.verification_token)
      }
    } catch (err) {
      Swal.fire('Error', 
      err?.response?.data?.message || 
      'Something went wrong. Please try again later.', 'error')
    }
  }

  return (
    <div className="row">
      <div className="col login-main-page-lh vh-100 d-flex flex-column justify-content-center">
        <div className='d-flex justify-content-center flex-column align-items-center'>
          <img className='' src={vitezLogo} alt="" />
          <img src={loginAnime} alt="" />
          <p className='main-image-under-text railway-font'>Lorem, ipsum um! In labore  minus ipsa reiciendis aperiam  n labore  minus ipsa reicien velit dolores!</p>
        </div>
      </div>
      <div className="col d-flex justify-content-center align-items-center">
        <img style={{ position: "fixed", zIndex: -1 }} src={vitezLogoWatermark} alt="" />
        {location.pathname === "/register" ? <Register /> :
          !token ? <Login {...{ user, handleChange, handleSubmit }} /> :
            <Verification {...{ otp, handleOtpChange, handleSubmit }} />}
      </div>
    </div>
  )
}
export default LoginMainPage
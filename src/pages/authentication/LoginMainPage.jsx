import React, { useState } from 'react'
import './loginMainPage.css'
import loginAnime from '../../assets/images/login.svg'
import vitezLogoWatermark from '../../assets/images/VITEZ LOGO-01 2.svg'
import vitezLogo from '../../assets/images/VITEZ LOGO-01 1.svg'
import { useLocation, useNavigate } from 'react-router'
import Register from './components/Register'
import { Login } from './components/Login'
import { Verification } from './components/Verification'
import { useAuthServices } from '../../services/controller/authServices'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/authSlice'

const LoginMainPage = () => {
  const [token, setToken] = useState(false)
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [otpWait, setOtpWait] = useState(false)
  const [user, setUser] = useState({
    username: null,
    password: null,
    remember: false,
  })

  const dispatch = useDispatch()

  const { loginAuth } = useAuthServices()

  const navigate = useNavigate()
  const location = useLocation()

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    if (value === "") {
      setUser(data => ({ ...data, [name]: null }))
    } else if (name === "remember") {
      setUser(data => ({ ...data, [name]: !user.remember }))
    }
    else {
      setUser(data => ({ ...data, [name]: value }))
    }
  }

  const handleOtpChange = (data) => {
    setOtp(data)
  }

  const handleResendOtp = async (e) =>{
    e.preventDefault()
    try{
      setOtpWait(true)
      let resp = await loginAuth({resend:true},{t:token})
      if(!resp.success)
        setOtpWait(false)
    }catch(err){
      setOtpWait(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      let resp
      if (token) {
        resp = await loginAuth({ otp: otp }, { t: token })
      }
      else
        resp = await loginAuth(user)
      if (resp.success) {
        if (token) {
          setToken(false)
          let data = resp.data
          const { username, mobile, image, email, fk_role, fk_group } = data
          localStorage.setItem('token',data.token)
          dispatch(login({ token: data.token, userDetails: { ...{ username, mobile, image, email, fk_role, fk_group } } }))
          navigate("/")
        }
        setToken(resp.data.verification_token)
      }
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.log(err)
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
          !token ? <Login {...{ user, handleChange, handleSubmit, loading }} /> :
            <Verification {...{handleResendOtp,setOtpWait, otpWait, otp, handleOtpChange, handleSubmit }} />}
      </div>
    </div>
  )
}
export default LoginMainPage
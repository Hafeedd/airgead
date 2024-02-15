import React from 'react'
import loginAnime from '../../../assets/images/login.svg'
import vitezLogoWatermark from '../../../assets/images/VITEZ LOGO-01 2.svg'
import vitezLogo from '../../../assets/images/VITEZ LOGO-01 1.svg'

const LoginMainPage = ({children}) => {
  return (
    <>
         <div className="row">
            <div className="col login-main-page-lh vh-100 d-flex flex-column justify-content-center">
                <div className='d-flex justify-content-center flex-column align-items-center'>
                    <img className='' src={vitezLogo} alt="" />
                    <img src={loginAnime} alt="" />
                    <p className='main-image-under-text railway-font'>Lorem, ipsum um! In labore  minus ipsa reiciendis aperiam  n labore  minus ipsa reicien velit dolores!</p>
                </div>
                
                
            </div>
            <div className="col d-flex justify-content-center align-items-center">
                <img style={{position:"fixed", zIndex:-1}} src={vitezLogoWatermark} alt="" />
               {children} 
            </div>
        </div>
    </>
  )
}

export default LoginMainPage
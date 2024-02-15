import React from 'react'
import LoginMainPage from '../components/LoginMainPage'
import msgIcon from '../../../assets/images/msg-icon.png'

const Verification = () => {
  return (
    <>
        <LoginMainPage>
            <div className='d-flex  flex-column align-items-center' style={{width:"70%", height:"fit-content"}}>
                <div className='d-flex mt-5' style={{width:"100%"}}>
                    <div className='d-flex flex-column justify-content-center mt-2'>
                        <img src={msgIcon} alt="" />
                    </div>
                    <div className='p-2'>
                        <h1 className='p-0 m-0 railway-font' style={{font:"27px"}}>Verify Your Phone Number</h1>
                        <p className='railway-font'>Lorem ipsum dolor, non is labore fugiat voluptates assumenda iste!</p>
                    </div>
                </div>

                <div className='otp-container rounded mt-4 railway-font' style={{width:"100%"}}>
                    <input type="text" maxLength={1} className='otp-field' /><span className='otp-bar'>|</span>
                    <input type="text" maxLength={1} className='otp-field' /><span className='otp-bar'>|</span>
                    <input type="text" maxLength={1} className='otp-field' /><span className='otp-bar'>|</span>
                    <input type="text" maxLength={1} className='otp-field' /><span className='otp-bar'>|</span>
                    <input type="text" maxLength={1} className='otp-field' />
                </div> 

                <div className='d-flex justify-content-end mt-2' style={{width:"100%"}}>
                    <p className='railway-font'>Didn’t Received SMS? <span className='span-text-color'>Resend Code</span></p>
                </div>

                <button className='btn-login rounded py-3 mt-3 railway-font' >Login</button>

                
            </div>
        </LoginMainPage>
    </>
  )
}

export default Verification
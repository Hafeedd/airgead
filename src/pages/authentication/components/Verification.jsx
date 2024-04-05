import React, { useState } from 'react'
import msgIcon from '../../../assets/images/verify-circle.png'
import OTPInput from 'react-otp-input'
import Countdown from 'react-countdown'

export const Verification = (props) => {
    const { handleResendOtp,setOtpWait, otp, handleOtpChange, handleSubmit, otpWait,verpass } = props

    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (!completed) {
            return <span className="text-secondary">Please Wait for &nbsp;{hours}:{minutes}:{seconds}&nbsp; to resend OTP</span>;
        }else{
            setOtpWait(false)
        }
    };

    return (
        <div className='d-flex  flex-column align-items-center' style={{ width: "70%", height: "fit-content" }}>
            <div className='d-flex mt-5' style={{ width: "100%" }}>
                <div className='d-flex flex-column justify-content-center mt-2'>
                    <img src={msgIcon} alt="" />
                </div>
                <div className='p-2'>
                    <h1 className='p-0 m-0 railway-font' style={{ font: "27px" }}>Verify Your Phone Number</h1>
                    <p className='railway-font'>Lorem ipsum dolor, non is labore fugiat voluptates assumenda iste!</p>
                </div>
            </div>

            <div className='px-3 mt-4 w-100'>
                <OTPInput
                    value={otp}
                    name="otp"
                    onChange={handleOtpChange}
                    numInputs={5}
                    isInputNum={true}
                    shouldAutoFocus={true}
                    renderInput={(props) => <input {...props} />}
                    skipDefaultStyles={true}
                    renderSeparator={<div style={{ width: "0.51px", height: '3rem', borderLeft: '2px solid black', color: 'black' }}></div>}
                    containerStyle={{
                        border: '1px solid black',
                        display: 'flex',
                        justifyContent: 'space-around',
                        borderRadius: '0.4rem'
                    }}
                    inputStyle={'otp-input'}
                    focusStyle={{
                        outline: "0 !important",
                        border: "1px solid black !important",
                    }}
                />
            </div>

            <div className='d-flex justify-content-end mt-2' style={{ width: "100%" }}>
                {otpWait ? <Countdown
                    date={Date.now() + 180000}
                    renderer={renderer}
                /> : <p className='railway-font'>Didn’t Received SMS? <span className='span-text-color cursor' onClick={handleResendOtp}>Resend Code</span></p>}
            </div>
            <button onClick={handleSubmit} className='btn-login rounded py-3 mt-3 railway-font' >{verpass==true?'Verify':'Login'}</button>
        </div>
    )
}
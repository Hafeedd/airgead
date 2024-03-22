import React from 'react';
import './badGateway.css'
import { useAuthServices } from '../../services/controller/authServices';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice'

export const BadGateway = () => {

    const { logoutAuth } = useAuthServices()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = async () => {
        try {
            const res = await logoutAuth()
            if (res.success) {
                localStorage.setItem('userDetails', false)
                localStorage.setItem('token', false)
                navigate('/login')
                dispatch(logout())
            }
        } catch (err) { console.log(err) }
    }

    return (
        <div className='bad-gateway-cont'>
            <div className='bad-gateway-text'>Bad Gateway !!</div>
            <div className='gateway-btn-cont'>
                <div onClick={handleLogout} className='button logout'>Logout</div>
                <div onClick={()=>navigate(-1)} className='button go-back'>Go Back</div>
            </div>
        </div>
    )
}
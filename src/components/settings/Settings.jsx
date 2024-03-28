import React from 'react'
import './settings.css'
import IdConf from '../../assets/icons/Id_conf.png'
import CodeIcon from '../../assets/icons/code-conf-icon.png'
import accessPerm from '../../assets/icons/accessPerm.png'
import userProf from '../../assets/icons/prof.jpeg'
import { useDispatch, useSelector } from 'react-redux'
import { useAuthServices } from '../../services/controller/authServices'
import { useNavigate } from 'react-router'
import { logout } from '../../redux/authSlice'
import { MdLogout } from "react-icons/md";
import { MEDIA_URL } from '../../api/axios'
import userImg from '../../assets/icons/lucide_user.png'

export const Settings = (props) => {
    const auth = useSelector(state => state.auth)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { logoutAuth } = useAuthServices()

    const handleLogout = async () => {
        try {
            const res = await logoutAuth()
            if (res.success) {
                localStorage.setItem('userDetails', false)
                navigate('/login')
                dispatch(logout())
            }
        } catch (err) { console.log(err) }
    }

    const { activeSetting } = props
    return (
        <div id={`settings-cont`} className={`settings ${activeSetting && "active"}`}>
            <div onClick={handleLogout}
                className='mt-4 text-end pe-2 cursor'>
                    <MdLogout size={'1.5rem'} className='me-2' />
                Logout
            </div>
            <div className='ps-5'>
                <div className="company-logo border-0 pb-2 h-100 pt-4">
                    <div className='d-flex text-light gap-3'>
                        <img className="header-user-prof-img company" src={auth?.userDetails?.image ? MEDIA_URL + auth?.userDetails?.image : userProf} alt="user" />
                        <span><h3>{auth?.userDetails?.username}</h3>
                            {auth?.userDetails?.fk_role}</span>
                    </div>
                </div>
            </div>
            {auth?.userDetails?.fk_group === "Controller" &&
                <>
                    <div className="settings-item mt-5">
                        <img src={IdConf} alt='Id Conf' /> Code Configuration
                    </div>
                    <div className="settings-item mt-5">
                        <img src={accessPerm} alt='access perm' />
                        Access Permission
                    </div>
                </>
            }
            <div onClick={()=>navigate('/code-configuration')} className="settings-item mt-5">
                <img src={CodeIcon} alt='access perm' />
                Code Configuration
            </div>

            <div onClick={()=>navigate('/user-list')} className="settings-item mt-5">
                <img src={userImg} alt='access perm' />
                User Register
            </div>
            {/* <div onClick={handleLogout} className="settings-item mt-5">
                <img src={IdConf} alt='access perm' />
                Logout
            </div> */}
        </div>
    )
}
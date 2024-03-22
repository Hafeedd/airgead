import React from 'react'
import IdConf from '../../assets/icons/Id_conf.png'
import accessPerm from '../../assets/icons/accessPerm.png'
import { useDispatch, useSelector } from 'react-redux'
import { useAuthServices } from '../../services/controller/authServices'
import { useNavigate } from 'react-router'
import { logout } from '../../redux/authSlice'

export const Settings = (props) => {
    const auth = useSelector(state=>state.auth?.userDetails)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {logoutAuth} = useAuthServices()

    const handleLogout = async () =>{
        try{
            const res = await logoutAuth()
            if(res.success){
                localStorage.setItem('userDetails',false)
                navigate('/login')
                dispatch(logout())
            }
        }catch(err){ console.log(err)}
    }

    const { activeSetting } = props
    return (
        <div id={`settings-cont`} className={`settings ${activeSetting && "active"}`}>
            {/* <div>{"=>"}</div> */}
           {auth?.fk_group === "Controller" &&
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
            <div onClick={handleLogout} className="settings-item mt-5">
                <img src={IdConf} alt='access perm' />
                Logout
            </div>
        </div>
    )
}
import { useDispatch, useSelector } from "react-redux"
import { useAuthServices } from "../../services/controller/authServices"
import { useEffect, useState } from "react"
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom"
import { handlePermissions } from '../../redux/authSlice'
import { navigationList } from "../sidebar/Sidebar"
import Layout from "../layout/Layout"

export const CheckAuth = ({ type }) => {
    const auth = useSelector((state) => state.auth)
    const [verify, setVerify] = useState(null)

    const { verifyUser } = useAuthServices()

    const location = useLocation().pathname
    const navigate = useNavigate()

    useEffect(() => {
        checkToken()
    }, [location, auth.token,])

    const checkToken = async () => {
        try {
            const resp = await verifyUser()
            if (resp.success) {
                if (type?.includes(resp.data.fk_group)) {
                    let allAllowdPathList = navigationList.filter(data => resp.data.module_permissions.findIndex(x => x === data.code) > -1)
                    if (allAllowdPathList.findIndex(x => x.navigate === location)>-1) {
                        setVerify(resp.data.fk_group)
                        // dispatch(handlePermissions(resp.data.module_permissions))
                    } else {
                        setVerify(false)
                        navigate('/bad-gateway', { replace: true })
                    }
                }
            } else {
                setVerify(false)
                navigate('/bad-gateway', { replace: true })
            }
        } catch (err) {
            setVerify(false)
            navigate('/bad-gateway', { replace: true })
        }
    }

    return (type?.includes(verify) && <Outlet />)
}

export const VerifyToken = () =>{
    const auth = useSelector((state) => state.auth)
    const [verify, setVerify] = useState(null)

    const { verifyUser } = useAuthServices()
    const dispatch = useDispatch()

    const location = useLocation().pathname
    const navigate = useNavigate()

    useEffect(() => {
        checkToken()
    }, [location, auth.token,])

    const checkToken = async () => {
        try {
            const resp = await verifyUser()
            if (resp.success) {
                setVerify(true)
                dispatch(handlePermissions(resp.data.module_permissions))
            }
            else{
                navigate('/login')
            }
        } catch (err) {
            navigate('/login')
            setVerify(false)
        }
    }

    return (verify && <Layout />)
}
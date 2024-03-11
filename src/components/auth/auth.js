import { useSelector } from "react-redux"
import { useAuthServices } from "../../services/auth/authServices"
import { useEffect, useState } from "react"
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom"

const CheckAuth = () => {
    const auth = useSelector((state) => state.auth)
    const [verify, setVerify] = useState(null)

    const { verifyUser } = useAuthServices()

    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        checkToken()
    }, [location.pathname, auth.token,])

    const checkToken = async () => {
        try {
            const resp = await verifyUser()
            if (resp.success) {
                setVerify(true)
            } else {
                setVerify(false)
                navigate('/login')
            }
        } catch (err) {
            setVerify(false)
            navigate('/login')
        }
    }

    return (verify&&<Outlet/>)
    // return (<Outlet/>)
}

export default CheckAuth
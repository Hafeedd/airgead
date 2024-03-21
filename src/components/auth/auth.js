import { useSelector } from "react-redux"
import { useAuthServices } from "../../services/controller/authServices"
import { useEffect, useState } from "react"
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom"

export const CheckAuth = ({type}) => {
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
                if(type?.includes(resp.data.fk_group))
                setVerify(resp.data.fk_group)
                // if(resp.data.fk_group === "Controller")
                console.log(type , type?.includes(resp.data.fk_group))
                // navigate('/company-list',{ replace: true })
                // else if(type?.includes(resp.data.fk_group))
                // navigate('/',{ replace: true })
            } else {
                setVerify(false)
                navigate('/login',{ replace: true })
            }
        } catch (err) {
            setVerify(false)
            navigate('/login',{ replace: true })
        }
    }

    return (type?.includes(verify) && <Outlet/>)
}

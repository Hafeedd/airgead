import { useDispatch, useSelector } from "react-redux";
import { useAuthServices } from "../../services/controller/authServices";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { handlePermissions } from "../../redux/authSlice";
import { navigationList } from "../sidebar/Sidebar";
import Layout from "../layout/Layout";

export const CheckAuth = ({ userType, authType }) => {
  const auth = useSelector((state) => state.auth.value);
  const [verify, setVerify] = useState(null);

  const { verifyUser } = useAuthServices();

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch()

  let path = authType === "token" ? "/login" : "/bad-gateway";

  useEffect(() => {
    checkToken();
  }, [location.pathname, auth.token,])

  const checkToken = async () => {
    try {
      const resp = await verifyUser();
      if (resp?.success /* && userType?.includes(resp.data.fk_group) || (authType === "token" && auth.token) */) {
          let allAllowdPathList = navigationList.filter(
            (data) =>
              resp.data.module_permissions.findIndex((x) => x === data.code) >
              -1
          );
          if (
            allAllowdPathList.findIndex((x) => x.navigate === location.pathname) > -1 ||
            authType === "token"
          ) {
            console.log("a")
            setVerify(resp.data.fk_group);
            // dispatch(handlePermissions(resp.data.module_permissions))
        } else {
              console.log("b")
              setVerify(false);
              navigate(path, { replace: true });
            }
        } else {
          console.log("c")
          setVerify(false);
          navigate(path, { replace: true });
        }
    } catch (err) {
        console.log(err)
      setVerify(false);
      navigate(path, { replace: true });
    }
  };

  return (userType?.includes(verify) || (authType === "token"&& auth.token)) && ( authType=='token'?<Layout />:<Outlet/>);
};

// const checkToken = async () => {
//     try {
//         const resp = await verifyUser()
//         if (resp.success) {
//             if(userType?.includes(resp.data.fk_role))
//             setVerify(resp.data.fk_role)
//             else if(resp.data.fk_role === "Admin")
//             navigate('/company-list',{ replace: true })
//             else if(resp.data.fk_role === "User")
//             navigate('/',{ replace: true })
//         } else {
//             setVerify(false)
//             navigate(null,{ replace: true })
//         }
//     } catch (err) {
//         setVerify(false)
//         navigate(null,{ replace: true })
//     }
// }

// return (userType?.includes(verify)) && (authType==='token'?<Layout/>:<Outlet/>)
// }



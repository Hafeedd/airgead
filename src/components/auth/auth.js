import { useDispatch, useSelector } from "react-redux";
import { useAuthServices } from "../../services/controller/authServices";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { handlePermissions } from "../../redux/authSlice";
import { navigationList } from "../sidebar/Sidebar";
import Layout from "../layout/Layout";
import Swal from "sweetalert2";

export const CheckAuth = ({ userType, authType }) => {
  const auth = useSelector((state) => state.auth);
  const [verify, setVerify] = useState(null);

  const { verifyUser } = useAuthServices();

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch()

  let path = authType === "token" ? "/login" : "/bad-gateway";

  useEffect(() => {
    if(auth?.token)
    checkToken();
    else navigate(path,{replace:true})
  }, [location.pathname,auth?.token,])

  const checkToken = async () => {
    try {
      const resp = await verifyUser();
      if (resp?.success /* && userType?.includes(resp.data.fk_group) || (authType === "token" && auth.token) */) {
          let allAllowdPathList = navigationList.filter(
            (data) =>
              resp.data.module_permissions.findIndex((x) => x === data.code) >
              -1
          );
          if (1==1
            // allAllowdPathList.findIndex((x) => x.navigate === location.pathname) > -1 ||
            // authType === "token"
          ) {
            setVerify(resp.data.fk_group);
            dispatch(handlePermissions({module:resp.data.module_permissions,activity:resp.data.activity_permissions}))
        } else {
              setVerify(false);
              navigate(path, { replace: true });
            }
        } else {
          if(resp.code=="ERR_NETWORK"){
            Swal.fire({
              position:'top-end',
              title:"Please Check your Network and try again !",
              text:"Please reload after connecting to network.",
              timer:5000,
              showConfirmButton:false
            })
          }else{
          setVerify(false);
          navigate(path, { replace: true });}
        }
    } catch (err) {
      setVerify(false);
      navigate('/bad-gateway', { replace: true });
    }
  };

  return (userType?.includes(verify) || (authType === "token"&& auth?.token)) && ( authType=='token'?<Layout />:<Outlet/>);
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



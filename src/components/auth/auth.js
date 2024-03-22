import { useDispatch, useSelector } from "react-redux";
import { useAuthServices } from "../../services/controller/authServices";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { handlePermissions } from "../../redux/authSlice";
import { navigationList } from "../sidebar/Sidebar";
import Layout from "../layout/Layout";

export const CheckAuth = ({ userType, authType }) => {
  const auth = useSelector((state) => state.auth);
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
      if (resp?.success && userType?.includes(resp.data.fk_group) || (authType === "token" && auth.token)) {
          let allAllowdPathList = navigationList.filter(
            (data) =>
              resp.data.module_permissions.findIndex((x) => x === data.code) >
              -1
          );
          if (
            allAllowdPathList.findIndex((x) => x.navigate === location.pathname) > -1 ||
            authType === "token"
          ) {
            setVerify(resp.data.fk_group);
            dispatch(handlePermissions(resp.data.module_permissions))
          } else {
            setVerify(false);
            navigate(path, { replace: true });
          }
      } else {
        setVerify(false);
        navigate(path, { replace: true });
      }
    } catch (err) {
      console.log(err);
      setVerify(false);
      navigate(path, { replace: true });
    }
  };

  return (userType?.includes(verify) || (authType === "token"&& auth.token)) && ( authType=='token'?<Layout />:<Outlet/>);
};

// export const CheckAuth = (props) =>{
//     const {tokenCheck, types} = props
//     const auth = useSelector(state => state.auth)
//     const navigate = useNavigate()
//     const location = useLocation()
//     const dispatch = useDispatch()

//     const {verifyUser} = useAuthServices()

//     useEffect(()=>{
//         checkToken()
//     },[location.pathname, auth.token,])

//     const checkToken = async () =>{
//         try{
//             const res = await verifyUser()
//             if(res.success){

//             }
//         }catch(err){console.log(err)}
//     }
// }
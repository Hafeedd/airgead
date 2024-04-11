import React, { useEffect, useState } from "react";
import "./roleConfig.css";
import {useLocation} from 'react-router';
import { RoleConfigList } from "./components/RoleConfigList";
import { RoleConfigAdd } from "./components/RoleConfigAdd";
import { useCompanyServices } from "../../services/controller/companyServices";

export const RoleConfig = (props) => {
  const [roleList, setRoleList] = useState([])

    const location = useLocation()

    const {getCompanyRole} = useCompanyServices()

    useEffect(()=>{
      getData()
    },[])

    const getData = async () =>{
      try{
        let resp = await getCompanyRole()
        if(resp.success){
          setRoleList(resp.data)
        }
      }catch(err){}
    }

  return (
    <div className="p-4">
      <div className="role-config-cont">
        {
          location.pathname === '/role-configuration-list'?
          <RoleConfigList refresh={getData} {...{roleList}}/>:<RoleConfigAdd refresh={getData} {...{roleList,setRoleList}}/>
        }
      </div>
    </div>
  );
};

import React, { useState } from "react";
import "./roleConfig.css";
import {useLocation} from 'react-router';
import { RoleConfigList } from "./components/RoleConfigList";
import { RoleConfigAdd } from "./components/RoleConfigAdd";

export const RoleConfig = (props) => {

    const location = useLocation()

  return (
    <div className="p-4">
      <div className="role-config-cont">
        {
            location.pathname === '/role-configuratoin-list'?
            <RoleConfigList/>:<RoleConfigAdd/>
        }
      </div>
    </div>
  );
};

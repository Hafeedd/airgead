import React, { useEffect, useState } from "react";
import { CompanyDetails } from "./CompanyDetails";
import { CompanyPayment } from "./CompanyPlan";
import { CompanyPermission } from "./CompanyPermission";
import { useLocation } from "react-router";

export const CompanyAdd = () => {
  const [active, setActive] = useState(2);
  const [companyId, setCompanyId] = useState(null)
  const [edit, setEdit] = useState(false)
  const [moduleCodeList, setModuleCodeList] = useState([])

  const location = useLocation()

  useEffect(() => {
    if (location?.state?.company)
      setEdit(location.state.company)
  }, [location.state])

  return (
    <div className="company-add-cont pb-1">
      <div className={`company-progress-bar row mx-0 rounded-2`}>
        <span
          className={`company-progress-loader ${active > 1 && "act2"} ${active > 2 && "act3"
            }`}
        >
          <div className="circle"></div>
          <div className="circle animation2"></div>
          <div className="circle animation3"></div>
        </span>
        <div
          className={`col-3 col-4 bar-text border-0 ${active > 0 && "active"}`}
          style={{ zIndex: "3" }}
        >
          1. Basic Details
        </div>
        {location.pathname !='/user-add'?
          <div
          className={`col-3 col-4 bar-text ${active > 1 && "active"}`}
          style={{ zIndex: "3" }}
        >
          2. Plan Details
        </div>
        :
        <div
          className={`col-3 col-4 bar-text ${active > 1 && "active"}`}
          style={{ zIndex: "3" }}
        >
          2. Modules
        </div>}
        {/* <div
          className={`col-4 bar-text ${active > 2 && "active"}`}
          style={{ zIndex: "3" }}
        >
          3. Modules
        </div> */}
      </div>
      <div className="company-add">
        <h3>{location.pathname != '/user-add' ? (active === 1 ? "Company Details" : active === 2 ? "Company Plan Details" : active === 3 && "Access Permissions") : (active === 1 ? 'User Details' : active === 3 ? "Access Permissions" : '') }</h3>
        {/* <div className="company-details-cont row justify-content-between mx-0 my-2 p-0"> */}
        {active === 2 ? (
          <CompanyPayment {...{moduleCodeList, setModuleCodeList, edit, active, setActive, companyId, setCompanyId }} />
        ) : active === 3 ? (
          <CompanyPermission {...{moduleCodeList, setModuleCodeList, companyId, edit,setEdit,setCompanyId,setActive }} />
        ) :
          <CompanyDetails {...{ edit, active, setActive, setCompanyId,setEdit ,location}} />
        }
        {/* </div> */}
      </div>

    </div>
  );
};

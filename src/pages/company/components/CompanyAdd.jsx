import React, { useState } from "react";
import { CompanyDetails } from "./CompanyDetails";
import { CompanyPayment } from "./CompanyPlan";
import { CompanyPermission } from "./CompanyPermission";

export const CompanyAdd = () => {
  const [active, setActive] = useState(1);
  const [companyId, setCompanyId] = useState(null)

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
        <div
          className={`col-3 col-4 bar-text ${active > 1 && "active"}`}
          style={{ zIndex: "3" }}
        >
          2. Plan Details
        </div>
        <div
          className={`col-4 bar-text ${active > 2 && "active"}`}
          style={{ zIndex: "3" }}
        >
          3. Modules
        </div>
      </div>
      <div className="company-add">
        <h3>{active === 1 ? "Company Details" :active ===2 ? "Company Plan Details": active ===3 && "Access Permissions"}</h3>
        {/* <div className="company-details-cont row justify-content-between mx-0 my-2 p-0"> */}
        {active === 2 ? (
          <CompanyPayment {...{ active, setActive, companyId, setCompanyId }} />
        ) : active === 3 ? (
          <CompanyPermission />
        ) :
          <CompanyDetails {...{ active, setActive, setCompanyId }} />
        }
        {/* </div> */}
      </div>

    </div>
  );
};

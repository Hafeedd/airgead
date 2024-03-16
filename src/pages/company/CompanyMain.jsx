import React, { useState } from "react";
import { useLocation } from "react-router";
import { CompanyList } from "./components/CompanyList";
import "./companyMain.css";
import { CompanyAdd } from "./components/CompanyAdd";
import { CompanyView } from "./components/CompanyView";

export const CompanyMain = () => {
  const [edit, setEdit] = useState(true)
    const location = useLocation();

  return (
    <div className="m-5 mt-3 mb-0 company-cont">
      {location.pathname === "/company-list" ? (
        !edit?<CompanyList {...{setEdit}} />:<CompanyView/>
      ) : (
        location.pathname === "/company-add" && <CompanyAdd />
      )}
    </div>
  );
};

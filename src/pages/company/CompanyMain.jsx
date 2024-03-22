import React, { useState } from "react";
import { useLocation } from "react-router";
import { CompanyList } from "./components/CompanyList";
import "./companyMain.css";
import { CompanyAdd } from "./components/CompanyAdd";

export const CompanyMain = () => {
    const location = useLocation();

  return (
    <div className="m-5 mt-3 mb-0 company-cont">
      {location.pathname === "/" ? (
        <CompanyList/>
      ) : (
        location.pathname === "/company-add" && <CompanyAdd />
      )}
    </div>
  );
};

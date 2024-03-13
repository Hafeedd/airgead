import React from "react";
import { useLocation } from "react-router";
import { CompanyList } from "./components/CompanyList";
import "./companyMain.css";
import { CompanyAdd } from "./components/CompanyAdd";

export const CompanyMain = () => {
    const location = useLocation();

  return (
    <div className="m-5 mt-3 company-cont">
      {location.pathname === "/company-list" ? (
        <CompanyList />
      ) : (
        location.pathname === "/company-add" && <CompanyAdd />
      )}
    </div>
  );
};

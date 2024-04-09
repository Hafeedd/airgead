import React, { useEffect, useState } from "react";
import { CompanyDetails } from "./CompanyDetails";
import { CompanyPlan } from "./CompanyPlan";
import { CompanyPermission } from "./CompanyPermission";
import { useLocation, useNavigate } from "react-router";
import { MEDIA_URL } from "../../../api/axios";
import {Swal} from 'sweetalert2'
import { useCompanyServices } from "../../../services/controller/companyServices";

export const CompanyAdd = () => {
  const [active, setActive] = useState(1);
  const [companyId, setCompanyId] = useState(null);
  const [edit, setEdit] = useState(false);
  const [moduleCodeList, setModuleCodeList] = useState([]);
  const [activityCodes, setActivityCodes] = useState({});
  const [company, setCompany] = useState({
    first_name: null,
    last_name: null,
    mobile: null,
    email: null,
    group_name: null,
    logo: null,
    logo_url: null,
    address_line_1: null,
    address_line_2: null,
    country: null,
    location: null,
    state: null,
    district: null,
    city: null,
    pincode: null,
    username: null,
    password: null,
    image: null,
    image_url: null,
  });
  const [companyPlan, setCompanyPlan] = useState({
    renewal_date: null,
    renewal_time: null,
    extended_date: null,
    staff_limit: null,
    device_limit: null,
    modules: [],
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { getCompanyWithId, postCompanyPermission } = useCompanyServices();

  useEffect(() => {
    if (edit.id) {
      const {
        admin_details,
        created_by_details,
        group_detials,
        group_profile_details,
        subscription_history,
        logo,
        image,
        ...others
      } = edit;
      const {
        fk_group,
        user_permissions,
        groups,
        module_permissions,
        ...admin_det_others
      } = admin_details;
      setCompany({
        logo_url: MEDIA_URL + logo,
        image_url: MEDIA_URL + image,
        ...others,
        ...admin_det_others,
      });
      // setSelectedRole(edit.fk_role)
    }
  }, [edit]);

  const handleSubmitPermission = async (e) => {
    e.preventDefault();
    try {
      let resp;
      var companyPermissions = [];
      Object.keys(activityCodes).forEach((x) =>
        activityCodes[x]?.forEach((y) =>
          companyPermissions.push({ code: y, is_active: false })
        )
      );
      let tempCompanyModuleList = moduleCodeList.map((data) => ({
        code: data.code,
        is_active: true,
      }));
      // console.log(activityCodes)
      // console.log({activity_permissions:companyPermissions,module_permissions:tempCompanyModuleList})
      // return 0
      resp = await postCompanyPermission(companyId, {
        activity_permissions: companyPermissions,
        module_permissions: tempCompanyModuleList,
      });
      if (resp?.success) {
        Swal.fire("Success", "", "success");
        setCompanyId(false);
        setEdit(false);
        setModuleCodeList([]);
        setActivityCodes([]);
        setActive(1);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      var message =
        err?.response?.data?.message ||
        "Something went wrong pls try again later !";
      if (err?.response?.data?.errors) {
        message = Object.values(err.response.data?.errors)[0];
      }
      Swal.fire("Error", message, "error");
    }
  };

  useEffect(() => {
    if (location?.state?.company) handleCompanyGet(location?.state?.company);
  }, [location.state]);

  const handleCompanyGet = async (id) => {
    try {
      let resp;
      resp = await getCompanyWithId(id);
      if (resp.success) {
        setEdit(resp.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="company-add-cont pb-1">
      <div className={`company-progress-bar row mx-0 rounded-2`}>
        <span
          className={`company-progress-loader ${active > 1 && "act2"} ${
            active > 2 && "act3"
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
        {location.pathname != "/user-add" && (
          <div
            className={`col-3 col-4 bar-text ${active > 1 && "active"}`}
            style={{ zIndex: "3" }}
          >
            2. Plan Details
          </div>
        )}
          <div
            className={`col-3 col-4 bar-text ${active > 1 && "active"}`}
            style={{ zIndex: "3" }}
          >
            {location.pathname ==='/user-add'?'2':'3'}. Modules
          </div>
        {/* <div
          className={`col-4 bar-text ${active > 2 && "active"}`}
          style={{ zIndex: "3" }}
        >
          3. Modules
        </div> */}
      </div>
      <div className="company-add">
        <h3>
          {location.pathname != "/user-add"
            ? active === 1
              ? "Company Details"
              : active === 2
              ? "Company Plan Details"
              : active === 3 && "Access Permissions"
            : active === 1
            ? "User Details"
            : active === 3
            ? "Access Permissions"
            : ""}
        </h3>
        {/* <div className="company-details-cont row justify-content-between mx-0 my-2 p-0"> */}
        {active === 2 ? (
          <CompanyPlan
            {...{
              companyPlan,
              setCompanyPlan,
              moduleCodeList,
              setModuleCodeList,
              edit,
              active,
              setActive,
              companyId,
              setCompanyId,
            }}
          />
        ) : active === 3 ? (
          <CompanyPermission
            {...{
              moduleCodeList, 
              setModuleCodeList,
              handleSubmitPermission,
              setActive,
              company,
              activityCodes,
              setActivityCodes,
            }}
          />
        ) : (
          <CompanyDetails
            {...{
              setModuleCodeList,
              edit,
              active,
              setActive,
              setCompanyId,
              setEdit,
              location,
              company,
              setCompany,
              setCompanyPlan,
            }}
          />
        )}
        {/* </div> */}
      </div>
    </div>
  );
};

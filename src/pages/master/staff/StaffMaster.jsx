import "./StaffMaster.css";
import React, { useEffect, useState } from "react";
import { AddStaff } from "./components/AddStaff";
import { StaffTable } from "./components/StaffTable";
import useStaffServices from "../../../services/master/staffServices";
import { useLocation, useNavigate } from "react-router";
import { StaffPayScale } from "./components/StaffPayScale";
import Swal from "sweetalert2";

const StaffMaster = () => {
  const [search, setSearch] = useState();
  const [edit, setEdit] = useState();
  const [loading, setLoading] = useState(false);
  const [staffList, setStaffList] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const { getStaff } = useStaffServices();

  useEffect(() => {
    getData();
  }, []);

  const navigate = useNavigate();
  const location = useLocation();

  const handleEdit = (data) => {
    if (data) {
      setEdit(data);
      navigate("/staff-master");
    }
  };

  const getData = async () => {
    try {
      setLoading(true)
      const response = await getStaff();
      if (response.success) {
        let tempList = [];
        response?.data.map((item) => {
          var { created_at, updated_at, payscale, ...others } = item;
          var { created_at, updated_at, ...othersPayScale } = payscale;
          tempList.push({ ...othersPayScale, ...others });
        });
        setStaffList(tempList);
      }
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.log(err);
    }
  };

  return (
    <div className="item_add ">
      <div className="itemList_header row mx-0">
        <div className="page_head px-4 d-flex justify-content-between my-1">
          <div>
            <div className="fs-5 py-0">Staff Master</div>
            <div className="page_head_items mb-2">
              <div
                onClick={() => {
                  setEdit();
                  navigate("/staff-list");
                }}
                className={`page_head_item ${
                  location.pathname == "/staff-list" && "active"
                }`}
              >
                Staff List
              </div>
              <div
                onClick={() => {
                  navigate("/staff-master");
                }}
                className={`page_head_item ${
                  location.pathname == "/staff-master" && "active"
                }`}
              >
                General
              </div>
              <div
                onClick={() => {
                  navigate("/staff-pay-scale");
                }}
                className={`page_head_item ${
                  location.pathname == "/staff-pay-scale" && "active"
                }`}
              >
                Detail Pay-Scale
              </div>
            </div>
          </div>
          {location.pathname !== "/staff-master" && (
            <div className="h-100 d-flex align-items-center">
              <div
                className="btn-dark btn"
                onClick={() => navigate("/staff-master")}
              >
                + Add Staff
              </div>
            </div>
          )}
        </div>
      </div>
      {location.pathname == "/staff-list" && (
        <div className="px-4">
          <StaffTable
            {...{
              search,
              setSearch,
              loading,
              staffList,
              setStaffList,
              handleEdit,
              getData,
              // handleDelete,
              searchList,
              setSearchList,
            }}
          />
        </div>
      )}
      {location.pathname == "/staff-master" && (
        <AddStaff getMasetData={getData} {...{ edit, setEdit }} />
      )}
      {location.pathname == "/staff-pay-scale" && (
        <StaffPayScale
          {...{
            search,
            setSearch,
            staffList,
            setStaffList,
            handleEdit,
            getData,
          }}
        />
      )}
    </div>
  );
};

export default StaffMaster;

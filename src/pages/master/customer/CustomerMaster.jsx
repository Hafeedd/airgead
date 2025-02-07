import React, { useEffect, useState } from "react";
import "./customerMaster.css";
import { useNavigate, useLocation } from "react-router";
import Swal from "sweetalert2";
import CustomerTable from "./components/CustomerTable";
import CustomerAddForm from "./components/CustomerAddForm";
import useCustomerServices from "../../../services/master/customerServices";
import { FiPlus } from "react-icons/fi";
import { useSelector } from "react-redux";

const CustomerList = () => {
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [listCustomer, setListCustomer] = useState([]);
  const [search, setSearch] = useState();
  const permissions = useSelector((state) => state.auth.activityPermissions);
  // const [showCustomerAdd,setShowCustomerAdd] = useState(false)
  const { getCustomer } = useCustomerServices();

  const location = useLocation().pathname;
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      let params;
      if (search) {
        params = { code: search, name: search };
      }

      setLoading(true)
      const res = await getCustomer(params);
      if (res?.success) {
        setListCustomer(res?.data);
      }
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  };

  const handleEdit = (data) => {
    navigate("/customer-add");
    setEdit(data);
  };

  return (
    <div className="item_add">
      <div className="itemList_header row mx-0">
        <div className="page_head my-1 px-4 d-flex justify-content-between">
          <div>
            <div className="fw-600 fs-5">Master List</div>
            <div className="page_head_items mb-2">
              <div
                onClick={() => navigate("/customer-master")}
                className={`page_head_customer active`}
              >
                Customer List
              </div>
            </div>
          </div>
          <div
            className={`d-flex px-0 align-items-center customer-add-btn  ${
              location === "/customer-add" && "d-none"
            }`}
          >
            {!permissions.includes(1096)&&<div
              onClick={() => {
                navigate("/customer-add");
                setEdit(false);
              }}
              className="btn h-auto add-btn px-2 w-auto"
            >
             <FiPlus size={'1.4rem'}/>&nbsp; Add Customer
            </div>}
          </div>
        </div>
      </div>
      {
        /* edit||showCustomerAdd */ location === "/customer-add" ? (
          <CustomerAddForm
            refresh={getData}
            edit={edit}
            setEdit={setEdit}
          />
        ) : (
          <CustomerTable
            list={listCustomer}
            {...{
              getData,
              permissions,
              search,
              loading,
              setSearch,
              navigate,
              handleEdit,
              edit,
            }}
          />
        )
      }
    </div>
  );
};

export default CustomerList;

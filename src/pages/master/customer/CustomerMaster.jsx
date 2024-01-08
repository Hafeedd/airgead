import React, { useEffect, useState } from "react";
import "./customerMaster.css";
import { useNavigate, useLocation } from "react-router";
import Swal from "sweetalert2";
import CustomerTable from "./components/CustomerTable";
import CustomerAddForm from "./components/CustomerAddForm";
import useCustomerServices from "../../../services/master/customerServices";

const CustomerList = () => {
  const [pageHeadCustomer, setPageHeadCustomer] = useState(1);
  const [toEdit, setToEdit] = useState(false);
  const [listCustomer, setListCustomer] = useState([]);
  const [search, setSearch] = useState();
  // const [showCustomerAdd,setShowCustomerAdd] = useState(false)
  const { getCustomer, deleteCustomer } = useCustomerServices();

  const location = useLocation().pathname;
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (toEdit) {
      listCustomer.map((x) => {
        if (x.id === toEdit.id) {
          setToEdit(x);
        }
      });
    } else {
      setToEdit(null);
    }
  }, [listCustomer]);

  const handleDelete = (id, e) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteConfirm(id, e);
      }
    });
  };

  const handleDeleteConfirm = async (id, e) => {
    e.preventDefault();
    try {
      let res = await deleteCustomer(id);
      if (res.success)
        Swal.fire("Customer deleted Successfully", "", "success");
      else {
        Swal.fire(
          "Warning",
          res.message ||
            "This account may contain transaction. Therefore it cant be deleted",
          "info"
        );
      }
      getData();
    } catch (err) {
      Swal.fire(
        "Warning",
        "This account may contain transaction. Therefore it cant be deleted",
        "warning"
      );
    }
  };

  const getData = async () => {
    try {
      let params;
      if (search) {
        params = { code: search, name: search };
      }
      const res = await getCustomer(params);
      if (res?.success) {
        setListCustomer(res?.data);
      }
    } catch (err) {}
  };

  const handleEdit = (data) => {
    navigate("/customer-add");
    setToEdit(data);
  };

  // const handleClose = () =>{
  //     setToEdit(false);
  //     setShowCustomerAdd(false)
  // }

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
            <div
              onClick={() => {
                navigate("/customer-add");
                setToEdit(false);
              }}
              className="btn btn-primary add-btn px-2 py-1 w-auto"
            >
              + &nbsp; Add Customer
            </div>
          </div>
        </div>
      </div>
      {
        /* toEdit||showCustomerAdd */ location === "/customer-add" ? (
          <CustomerAddForm
            refresh={getData}
            edit={toEdit}
            setEdit={setToEdit}
          />
        ) : (
          <CustomerTable
            list={listCustomer}
            {...{
              getData,
              search,
              setSearch,
              navigate,
              handleEdit,
              handleDelete,
              toEdit,
            }}
          />
        )
      }
    </div>
  );
};

export default CustomerList;

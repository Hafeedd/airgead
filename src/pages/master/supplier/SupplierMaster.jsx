import React, { useEffect, useState } from "react";
import SupplierAdd from "./components/SupplierAdd";
import SupplierList from "./components/SupplierList";
import { useNavigate, useLocation } from "react-router";
import Swal from "sweetalert2";
import useCustomerServices from "../../../services/master/customerServices";
import { FiPlus } from "react-icons/fi";

const SupplierMaster = () => {
  const [pageHeadItem, setPageHeadItem] = useState(1);
  const [toEdit, setToEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [listItem, setListItem] = useState();
  const [search, setSearch] = useState();
  // const [showAddItem, setShowAddItem] = useState(false)
  const navigate = useNavigate();
  const { getSupplier } = useCustomerServices();

  const location = useLocation().pathname;

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
      const res = await getSupplier(params);
      if (res.success) {
        // const listhead = ['code','name','fk_company.company','hsn','retail_rate','purchase_rate','tax_gst','mrp_rate']
        // const newList = handleList(tempList,listhead)
        setListItem(res.data);
      }
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.log(err);
    }
  };

  // const handleList = (data, listItem) => {
  //   let r = [];
  //   if (data.length > 0) {
  //     listItem.map((x) => {
  //       r.push(data[x]);
  //     });
  //   }
  //   return r;
  // };

  const handleEdit = (data) => {
    navigate("/supplier-add");
    setToEdit(data);
  };

  return (
    <div className="item_add">
      <div className="itemList_header row mx-0">
        <div className="page_head my-1 px-4 d-flex justify-content-between">
          <div>
            <div className="fw-600 fs-5">Master Supplier</div>
            <div className="page_head_items mb-2">
              <div
                onClick={() => navigate("/supplier-master")}
                className={`page_head_item ${pageHeadItem === 1 && "active"}`}
              >
                Supplier List
              </div>
            </div>
          </div>
          <div
            className={`d-flex align-items-center ${
              location === "/supplier-add" && "d-none"
            }`}
          >
            <div
              onClick={() => {
                setToEdit(false);
                navigate("/supplier-add");
              }}
              className="btn h-auto add-btn px-2"
              style={{width:'fit-content'}}
            >
              <FiPlus size={'1.4rem'}/>&nbsp; Add Supplier
            </div>
          </div>
        </div>
      </div>

      {
        /* toEdit||showAddItem */ location === "/supplier-add" ? (
          <SupplierAdd refresh={getData} edit={toEdit} setToEdit={setToEdit} />
        ) : (
          <SupplierList
            list={listItem}
            {...{
              search,
              loading,
              setSearch,
              getData,
              handleEdit,
              // handleDelete,
              toEdit,
            }}
          />
        )
      }
    </div>
  );
};

export default SupplierMaster;

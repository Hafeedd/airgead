import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { OpStockDetails } from "./components/OpStockDetails";
import "./opStock.css";
// import useItemServices from "../../../services/master/itemServices";
import useOpenStockServices from "../../../services/master/openStockServices";
import Swal from "sweetalert2";

export const OpStock = () => {
  const [toEdit, setToEdit] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [filter, setFilter] = useState({
    company: null,
    category: null,
    name: null,
  });

  const [propertyList, setPropertyList] = useState({
    company: [],
    category: [],
  });

  const [amntCalc, setAmntCalc] = useState({
    from: null,
    to: null,
    perc: null,
    amnt: null,
    rate: null,
  });

  const [bulkDataChange, setBulkDataChange] = useState({
    hsn: null,
    tax_gst: null,
  });

  const navigate = useNavigate();
  //   const { getItemList } = useItemServices();
  const { getOpenStock, putOpenStock } = useOpenStockServices();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await putOpenStock(itemList);
      if (response.success) {
        Swal.fire("Success", "Item added successfully", "success");
      } else {
        Swal.fire("Error", response.message, "error");
      }
    } catch (err) {
      Swal.fire("Failed", "failed while saving data", "error");
    }
  };

  useEffect(() => {
    getData();
  }, [filter]);

  const getData = async () => {
    let params;
    if (filter.category || filter.company || filter.name) {
      params = {
        company: filter?.company,
        category: filter?.category,
        name: filter?.name,
      };
    }
    const response = await getOpenStock(params);
    if (response?.success) {
      setItemList([...response?.data]);
    }
  };

  const handleClearAll = (e) => {
    setAmntCalc({
      from: null,
      to: null,
      perc: null,
      amnt: null,
      rate: null,
    });
    setBulkDataChange({
      hsn: null,
      tax_gst: null,
    })
    setFilter({
      company: null,
      category: null,
      name: null,
    })
    getData()
  };

  return (
    <div className="item_add">
      <div className="itemList_header row mx-0">
        <div className="page_head my-1 ps-4 d-flex justify-content-between">
          <div>
            <div className="fw-600 fs-5">Opening Stock</div>
            <div className="page_head_items mb-3">
              <div
                onClick={() => navigate("/account-master")}
                className={`page_head_item active`}
              >
                Details
              </div>
            </div>
          </div>
          {/* <div className="col-1 col-2 d-flex px-1 align-items-center">
                        <div onClick={() => { setToEdit(false); navigate('/account-add') }} className="btn btn-primary add-btn px-0">+ &nbsp; Add Account</div>
                    </div> */}
        </div>
      </div>

      {
        <div className="p-3">
          <OpStockDetails
            refresh={getData}
            {...{
              itemList,
              setItemList,
              setToEdit,
              toEdit,
              propertyList,
              setPropertyList,
              filter,
              setFilter,
              handleSubmit,
              bulkDataChange,
              setBulkDataChange,
              amntCalc,
              setAmntCalc,
              handleClearAll,
            }}
          />
        </div>
      }
    </div>
  );
};

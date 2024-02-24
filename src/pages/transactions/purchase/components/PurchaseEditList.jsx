import React, { useEffect, useState } from "react";
import search from "../../../../assets/icons/search.png";
import editBtn from "../../../../assets/icons/edit-black.svg";
import deleteBtn from "../../../../assets/icons/delete.svg";
import Swal from "sweetalert2";
import useSalesServices from "../../../../services/transactions/salesServices";
import usePurchaseServices from "../../../../services/transactions/purchcaseServices";

const PurchaseEditList = (props) => {
  const {
    handleSetEdit,
    purchaseOrReturnList,
    // edit,
    from,
    closeEditModal,
    setEdit,
    getData,
  } = props;

  const {deleteSales} = useSalesServices()
  const {deletePurchase} = usePurchaseServices()
  const [searchedList, setSearchedList] = useState([])
  
  const handleDeleteData = async (id) => {
    try {
      let response;
      if (from == "sales") 
        response = await deleteSales(id);
      else
        response = await deletePurchase(id)
      if (response?.success) {
        Swal.fire({
          title: "Success",
          text: "Account deleted successfully",
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
        });
        getData();
      } else {
        Swal.fire({
          title: "Warning",
          text:
            response?.message ||
            "Failed to delete account. There may be transaction done with this account.",
          icon: "info",
          // timer: 1000,
          // showConfirmButton: false,
        });
      }
    } catch (err) {
      console.log(err)
      Swal.fire({
        title: "Warning",
        text:
          err?.response?.data?.message ||
          "Failed to delete account. There may be transaction done with this account.",
        icon: "info",
      });
    }
  };

  useEffect(()=>{
    if(purchaseOrReturnList?.length>0)
    setSearchedList([...purchaseOrReturnList])
  },[purchaseOrReturnList])

  const handleSearch = async (e) => {
    let tempData;
    // console.log(searchedList)
    if (searchedList?.length>0) {
      let value = e.target.value;
      if (value !== "") {
        const tmepList = [...purchaseOrReturnList]
        if (tmepList?.length > 0) {
          tempData = tmepList?.filter((x) => {
            let searchInString = `${
              x.documents_no +
              " " +
              x.bill_date +
              " " +
              x.supplier_name +
              " " +
              x.total_amount
            }`;
            let search = searchInString?.includes(value);
            if (search) {
              return true;
            }
          });
          setSearchedList([...tempData]);
        }
      } else {
        setSearchedList([...purchaseOrReturnList])
      }
    }
  };

  const handleEditClick = (data) => {
    setEdit(data);
    handleSetEdit(data)
    closeEditModal(false);
  };

  return (
    <div style={{ height: "100%" }} className="p-0 row mx-0">
      <table
        className="table table-hover purchase-item-table mb-0"
        style={{ height: "0%" }}
      >
        <thead>
          <tr>
            <th className="text-start ps-3 start">Doc Number</th>
            <th>Date</th>
            <th>{from === "sales" ? "Customer Name" : "Supplier Name"}</th>
            <th style={{ borderRight: "0px" }}>NET Amount</th>
            <th
              style={{ borderRight: "0px", width: "23%" }}
              className="ps-1 pe-0"
            >
              <div
                className="item_seach_bar_cont rounded-2 px-0 pe-1 mx-0"
                style={{ height: "2.0625rem", width: "fit-content" }}
              >
                <img src={search} className="search_img ms-3 py-2" />
                <input
                  className="item_search_bar rounded-2 border-0 py-1 px-1"
                  style={{ height: "2rem" }}
                  placeholder="Search"
                  type="text"
                  onChange={handleSearch}
                />
              </div>
            </th>
            <th style={{ borderRight: "0px" }} className="end">
              <div className="btn btn-sm btn-dark filter-btn px-0">
                Filter Here
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="purchase-item-body">
          {searchedList?.length > 0 ? (
            searchedList?.map((data, i) => {

              const handleDelete = async (e) => {
                Swal.fire({
                  title: "Delete",
                  text: `Are you sure, you want to delete ${from=="sales"?"sale":"purchase"} ${data.documents_no}?`,
                  icon: "question",
                  showDenyButton: true,
                  showCancelButton: false,
                  confirmButtonText: "Yes",
                  denyButtonText: "Cancel",
                  showLoaderOnConfirm: true,
                  preConfirm: async () => {
                    await handleDeleteData(data?.id);
                  },
                  preDeny: () => {
                    Swal.fire({
                      title: "Cancelled",
                      icon: "info",
                      timer: 1000,
                      showConfirmButton: false,
                    });
                  },
                });
              };

              return (
                <tr key={i}>
                  <td className="text-start ps-3">{data?.documents_no}</td>
                  <td className="">
                    {new Date(data?.created_at)
                      ?.toISOString()
                      .slice(0, 10)
                      .split("-")
                      .reverse()
                      .join("-")}
                  </td>
                  <td className="">
                    {from === "sales"
                      ? data?.customer_name
                      : data?.supplier_name}
                  </td>
                  <td className="">{data?.total_amount}</td>
                  <td className=""></td>
                  <td className="">
                    <div className="d-flex gap-3 pe-3 justify-content-end">
                      <img src={deleteBtn} alt="deleteBtn" onClick={()=> handleDelete()}/>
                      <img src={editBtn} alt="editBtn" onClick={() => handleEditClick(data)}/>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={6} className="text-center py-3 fs-4 ps-3">
                No Items
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div
        className="col-12 row pe-3 my-0 mt-3 w-100 justify-content-end pb-2 mx-0 align-items-end position-sticky"
        style={{ bottom: "5px", MinHeight: "inherit" }}
        // style={{ MinHeight: "inherit" }}
      >
        <div
          className="mx-0 px-1 pe-0 col-1 col-2 pb-0 "
        >
          <button
            onClick={() => closeEditModal(false)}
            className="btn btn-sm btn-dark w-100"
          >
            close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseEditList;

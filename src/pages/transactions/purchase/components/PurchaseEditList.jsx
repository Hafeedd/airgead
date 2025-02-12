import React, { useEffect, useState } from "react";
import search from "../../../../assets/icons/search.png";
import editBtn from "../../../../assets/icons/edit-black.svg";
import deleteBtn from "../../../../assets/icons/delete.svg";
import Swal from "sweetalert2";
import useSalesServices from "../../../../services/transactions/salesServices";
import usePurchaseServices from "../../../../services/transactions/purchcaseServices";
import { Form } from "react-bootstrap";
import { usePurchaseOrderServices } from "../../../../services/transactions/purchaseOrderServices";
import usePurchaseReturnServices from "../../../../services/transactions/purchaseReturnService";
import { useSalesOrderServices } from "../../../../services/transactions/salesOrderServices";
import { useSalesReturnServices } from "../../../../services/transactions/salesReturnService";
import { useSelector } from "react-redux";

const PurchaseEditList = (props) => {
  const { handleSetEdit, list, show, from, setShow, setEdit, getData, title } =
    props;
  const permissions = useSelector((state) => state.auth.activityPermissions);
  const [searchedList, setSearchedList] = useState([]);
  const [date, setDate] = useState({
    from: new Date().toISOString(),
    to: new Date().toISOString(),
  });

  const { deleteSales } = useSalesServices();
  const { deleteSalesOrder } = useSalesOrderServices();
  const { deleteSalesReturn } = useSalesReturnServices();
  const { deletePurchase } = usePurchaseServices();
  const { deletePurchaseOrder } = usePurchaseOrderServices();
  const { deletePurchaseReturn } = usePurchaseReturnServices();

  useEffect(() => {
    if (list?.length > 0) {
      handleDateFilter(list);
    }
  }, [list, date]);

  const handleDateFilter = (tempList) => {
    if (date.from || date.to) {
      if (tempList.length > 0) {
        let startDate = new Date(date.from?.slice(0, 10)).toLocaleDateString();
        let endDate = new Date(date.to?.slice(0, 10)).toLocaleDateString();
        tempList = tempList.filter((x) => {
          let dateOfItem = new Date(x.date).toLocaleDateString();
          // console.log(dateOfItem , endDate ,startDate.toLocaleDateString())
          if (
            (dateOfItem >= startDate && dateOfItem <= endDate) ||
            dateOfItem == startDate
          ) {
            return true;
          } else return false;
        });
        setSearchedList([...tempList]);
      } else setSearchedList([]);
    }
  };

  const handleSearch = async (e) => {
    let tempData;
    // console.log(searchedList)
    // if (searchedList?.length > 0) {
    let value = e.target.value;
    if (value !== "") {
      const tmepList = [...list];
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
        handleDateFilter(tempData);
      }
    } else {
      handleDateFilter(list);
    }
    // }
  };

  const handleEditClick = (data) => {
    setEdit(data);
    if (show === "order") handleSetEdit(data, true);
    else handleSetEdit(data);
    setShow(false);
  };

  const handleDeleteData = async (id) => {
    try {
      let response;
      if (from == "sales") response = await deleteSales(id);
      else if (from == "purch") response = await deletePurchase(id);
      else if (from == "purch Order") response = await deletePurchaseOrder(id);
      else if (from == "purch Return")
        response = await deletePurchaseReturn(id);
      else if (from == "sales Order") response = await deleteSalesOrder(id);
      else if (from == "sales Return") response = await deleteSalesReturn(id);
      if (response?.success) {
        Swal.fire({
          title: "Success",
          text: `${
            from.match(/sales/)
              ? "Sales"
              : from.match(/purch/)
              ? "Purchase"
              : "Account"
          } deleted successfully`,
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
            `Failed to delete ${
              from.match(/sales/)
                ? "sale"
                : from.match(/purch/)
                ? "purchase"
                : "account"
            }. There may be transaction done with this account.`,
          icon: "info",
          // timer: 1000,
          // showConfirmButton: false,
        });
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Warning",
        text:
          err?.response?.data?.message ||
          `Failed to delete ${
            from.match(/sales/)
              ? "sale"
              : from.match(/purch/)
              ? "purchase"
              : "account"
          }. There may be transaction done with this account.`,
        icon: "info",
      });
    }
  };

  const handleDateChange = (e) => {
    if (e.target.value === "") {
      setDate((data) => ({ ...data, [e.target.name]: null }));
    } else {
      setDate((data) => ({ ...data, [e.target.name]: e.target.value }));
    }
  };

  return (
    <div className="p-0">
      <div className="purchase-edit-popup">
        <h3>{title}</h3>
      </div>
      <div className="my-4 px-4 row mx-0 gap-3">
        <Form.Group className="col-4 px-0 d-flex align-items-center mx-0">
          <Form.Label className="col-3 px-0 m-0">From</Form.Label>
          <Form.Control
            value={date.from?.slice(0, 10)}
            onChange={handleDateChange}
            name="from"
            type="date"
            className="w-100"
          />
        </Form.Group>
        <Form.Group className="col-4 px-0 d-flex align-items-center mx-0">
          <Form.Label className="col-3 px-0 m-0">To</Form.Label>
          <Form.Control
            value={date.to?.slice(0, 10)}
            onChange={handleDateChange}
            name="to"
            type="date"
            className="w-100"
          />
        </Form.Group>
      </div>
      <div className="purchase-table-container px-3">
        <table
          className="table table-hover purchase-item-table mb-0"
          style={{ height: "0%" }}
        >
          <thead>
            <tr>
              <th className="text-start ps-3 start">Doc Number</th>
              <th>Date</th>
              <th>{from.match(/sales/) ? "Customer Name" : "Supplier Name"}</th>
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
                    text: `Are you sure, you want to delete ${
                      from.match(/sales/)
                        ? "sale"
                        : from.match(/purchase/)
                        ? "purchase"
                        : "account"
                    } ${data.documents_no}?`,
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
                  <tr
                    key={i}
                    onClick={() => {
                      if (show === "order") handleEditClick(data);
                    }}
                  >
                    <td className="text-start ps-3">{data?.documents_no}</td>
                    <td className="">
                      {new Date(data?.date)
                        ?.toISOString()
                        .slice(0, 10)
                        .split("-")
                        .reverse()
                        .join("-")}
                    </td>
                    <td className="">
                      {from.match(/sales/)
                        ? data?.customer_name
                        : data?.supplier_name}
                    </td>
                    <td className="">{data?.total_amount}</td>
                    <td className=""></td>
                    <td className="">
                      {show !== "order" && (
                        <div className="d-flex gap-3 pe-3 justify-content-end">
                          {((from === "purch" && !permissions.includes(1166)) ||
                            (from === "purch Order" &&
                              !permissions.includes(1242)) ||
                            (from === "purch Return" &&
                              !permissions.includes(1209)) ||
                            (from === "sales" && !permissions.includes(1185)) ||
                            (from === "sales Order" &&
                              !permissions.includes(1261)) ||
                            (from === "sales Return" &&
                              !permissions.includes(1223))) && (
                            <img
                              src={deleteBtn}
                              alt="deleteBtn"
                              onClick={() => handleDelete()}
                            />
                          )}
                          {((from === "purch" && !permissions.includes(1165)) ||
                            (from === "purch Order" &&
                              !permissions.includes(1241)) ||
                            (from === "purch Return" &&
                              !permissions.includes(1208)) ||
                            (from === "sales" && !permissions.includes(1184)) ||
                            (from === "sales Order" &&
                              !permissions.includes(1260)) ||
                            (from === "sales Return" &&
                              !permissions.includes(1222))) && (
                            <img
                              src={editBtn}
                              alt="editBtn"
                              onClick={() => handleEditClick(data)}
                            />
                          )}
                        </div>
                      )}
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
      </div>
      <div
        className="col-12 row pe-3 my-0 mt-3 w-100 justify-content-end pb-2 mx-0 align-items-end position-sticky"
        style={{ bottom: "5px", MinHeight: "inherit" }}
        // style={{ MinHeight: "inherit" }}
      >
        <div className="mx-0 px-1 pe-0 col-1 col-2 pb-0 ">
          <button
            onClick={() => setShow(false)}
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

import React, { useEffect, useState } from "react";
import "./SalesTransaction.css";
import { useLocation, useNavigate } from "react-router";
import { Modal } from "react-bootstrap";
import { FiEdit } from "react-icons/fi";
import PurchaseTableItemList from "../purchase/components/PurchaseTableItemList";
import PurchaseEditList from "../purchase/components/PurchaseEditList";
import SalesInvoiceDetails from "./components/SalesInvoiceDetails";
import SalesCustomerDetails from "./components/SalesCustomerDetails";
import SalesDeliveryDetails from "./components/SalesDeliveryDetails";
import SalesPrintingDetails from "./components/SalesPrintingDetails";
import SalesTable from "./components/SalesTable";
import SalesDetailFooter from "./components/SalesDetailFooter";
import useCustomerServices from "../../../services/master/customerServices";
import useSalesServices from "../../../services/transactions/salesServices";
import Swal from "sweetalert2";
import useItemServices from "../../../services/master/itemServices";
import { PrintFIle } from "./components/SalesBill";
import { initialPurchaseSalesTableStatePosition } from "../purchase/InitialData/data";
// import { initialPurchaseSalesTableStatePositionLocal } from "../purchase/PurchaseTransaction";

const initialSalesState = {
  cstm_id: null,
  fk_bill_type: null,
  fk_customer: null,
  customer_name: null,
  customer_address: null,
  customer_mobile: null,
  documents_no: null,
  careof_user: null,
  payment_type: "CASH",
  order_no: null,
  bill_no: null,
  created_at: null,
  rate_types: "RETAIL_RATE",
  bill_date: null,
  tax_gst: null,
  interstate: false,
  reverse_charge: false,
  tax_bill: false,
  total_item: null,
  total_amount: null,
  total_amount2: null,
  bank_amount: null,
  fk_bank: null,
  gst_in: null,
  item: null,
  total_discount: null,
  discount: null,
  roundoff: null,
  paid_cash: null,
  change_due: null,
  vehicle_no: null,
  total_margin: null,
  total_items: null,
  total_disc: null,
  total_value: null,
  total_qty: null,
  driver: null,
  poject: null,
  address: null,
  bank: null,
  total_cgst: null,
  total_scGst: null,
  return_value: null,
  return_cgst_sgst: null,
  transfer_account: null,
  delivery_address: null,
};

const initialTableItemState = {
  cstm_id: null,
  item_name: null,
  fk_item: null,
  code: null,
  quantity: 0.0,
  fk_unit: null,
  gross: 0.0,
  transaction_unit: null,
  rate: 0.0,
  sales_rate: 0.0,
  margin: 0.0,
  cost: 0.0,
  total: 0.0,
  sgst: 0.0,
  cgst_or_igst: 0.0,
  tax_gst: 0.0,
  value: 0.0,
  sale_discount: 0.0,
  discount_1_percentage: 0.0,
  discount_1_amount: 0.0,
};

export const initialSalesTableStatePositionLocal = JSON.parse(
  localStorage.getItem("initialSalesTableStatePositionLocal")
);

const SalesTransaction = () => {
  const [salesItemModal, setSalesItemModal] = useState(false);
  const [salesEditModal, setSalesEditModal] = useState(false);
  const [pageHeadItem, setPageHeadItem] = useState(1);
  const [edit, setEdit] = useState(false);
  const [customerList, setCustomerList] = useState(null);
  const [tableItemList, setTableItemList] = useState([]);
  const [salesList, setSalesList] = useState([]);
  const [billType, setBillType] = useState([]);
  const [codeWithBillTypeList, setCodeWithBillTypeList] = useState([]);
  const [showPrint, setShowPrint] = useState(false);
  const [bankSelect, setBankSelect] = useState(false);
  const [cstClsOpn, setCstClsOpn] = useState({
    opening: null,
    closing: null,
  });

  const [tableItemRef, setTableItemRef] = useState(null);

  // const [code, setCode] = useState(null);
  const [salesAdd, setSalesAdd] = useState(initialSalesState);

  const [tableItem, setTableItem] = useState(initialTableItemState);
  const [tableHeadList, setTableHeadList] = useState(
    initialSalesTableStatePositionLocal ||
      initialPurchaseSalesTableStatePosition
  );

  const { getProperty } = useItemServices();
  const { getCustomer } = useCustomerServices();
  const { getSales, postSales, putSales, getAllUserAc, getCodeWithBillType } =
    useSalesServices();

  const handleSalesAllReset = () => {
    setSalesAdd(initialSalesState);
    handleTableItemReset();
    setTableItemList([]);
    setEdit(false);
    setShowPrint(false);
    handleGetCode();
    localStorage.setItem("salesData", false);
  };

  const location = useLocation();

  const handleTableItemReset = () => {
    setTableItem(initialTableItemState);
  };

  useEffect(() => {
    window.onmousedown = myBeforeUnloadFunction;
    // myBeforeUnloadFunction()
  }, [salesAdd, tableItemList, edit]);

  const handleReloadData = () => {
    let data = localStorage.getItem("salesData");
    if (data) data = JSON.parse(data);
    if (data?.edit) {
      setEdit({ ...data.edit });
      handleSetEdit(data?.edit);
    } else if (data) {
      let { items, updated_at, edit, tablekeys, ...others } = data;
      let tempData = {
        ...others,
        change_due: others.change_due || "0.00",
      };
      setSalesAdd((data) => ({ ...data, tempData }));
      if (items) {
        setTableItemList([...items]);
        handleSalesAddCalc(items, true, tempData);
      }
    }
  };

  const myBeforeUnloadFunction = () => {
    const allSaleState = {
      ...salesAdd,
      items: [...tableItemList],
      edit: edit,
    };
    localStorage.setItem("salesData", JSON.stringify(allSaleState));
  };

  const handleSetEdit = (data) => {
    if (data) {
      let { sales_item, updated_at, ...others } = data;
      let tempData = { ...others, change_due: others.change_due || "0.00" };
      setSalesAdd((data) => ({ ...data, ...tempData }));
      if (sales_item) {
        console.log(sales_item)
        setTableItemList([...sales_item]);
        handleSalesAddCalc(sales_item, true, tempData);
      }
    } else handleGetCode();
  };

  useEffect(() => {
    getData();
    handleGetCode();
    handleReloadData();

    let customer = location.state;
    if (customer?.id) {
      setSalesAdd((data) => ({
        ...data,
        ["fk_customer"]: customer.id,
        ["customer_name"]: customer.name,
      }));
      navigate(null, { replace: true, state: { id: null, name: null } });
    }
  }, []);

  const navigate = useNavigate();

  const handleSalesAddCalc = (dataList, fromEdit, purchaseData) => {
    // dataList is the state of tableItemList
    if (dataList?.length > 0) {
      let netAmount = dataList?.reduce((a, b) => {
        return b.total || b.total >= 0
          ? parseFloat(a) + parseFloat(b.total)
          : 0;
      }, 0);
      let netMargin = dataList?.reduce((a, b) => {
        return b.margin || b.margin >= 0
          ? parseFloat(a) + parseFloat(b.margin)
          : 0;
      }, 0);
      let total_cgst_amnt = dataList?.reduce((a, b) => {
        return (b.total || b.total >= 0) && (b.value || b.total >= 0)
          ? parseFloat(a) + parseFloat((b.total - b.value) / 2)
          : 0;
      }, 0);
      let total_rate = dataList?.reduce((a, b) => {
        return b.rate || b.rate >= 0 ? parseFloat(a) + parseFloat(b.rate) : 0;
      }, 0);
      let totalItem = dataList?.reduce((a, b) => {
        return a + 1;
      }, 0);
      let totalCTC = dataList?.reduce((a, b) => {
        return b.cost || b.cost >= 0 ? parseFloat(a) + parseFloat(b.cost) : 0;
      }, 0);
      let totalQty = dataList?.reduce((a, b) => {
        return b.quantity || b.quantity >= 0
          ? parseFloat(a) + parseFloat(b.quantity)
          : 0;
      }, 0);
      let total_disc = dataList?.reduce((a, b) => {
        return b.discount_1_amount || b.discount_1_amount >= 0
          ? parseFloat(a) + parseFloat(b?.discount_1_amount || 0)
          : 0;
      }, 0);
      let total_value = dataList?.reduce((a, b) => {
        return b.value || b.value >= 0
          ? parseFloat(a) + parseFloat(b.value)
          : 0;
      }, 0);
      let total_sgst = dataList?.reduce((a, b) => {
        return b.sgst || b.sgst >= 0 ? parseFloat(a) + parseFloat(b.sgst) : 0;
      }, 0);
      // let total_scGst = dataList?.reduce((a, b) => {
      //   return b.sgst || b.sgst >= 0
      //     ? parseFloat(a) + (parseFloat(b.sgst) * parseFloat(b.value)) / 100
      //     : 0;
      // }, 0);
      let total_total = dataList?.reduce((a, b) => {
        return b.total || b.total >= 0
          ? parseFloat(a) + parseFloat(b.total)
          : 0;
      }, 0);

      let hsnWiseCalc = [];
      let hsnFilter = ["other"];
      dataList.forEach((data) => {
        if (data.hsn && hsnFilter.indexOf(data.hsn) < 0) {
          hsnFilter.push(data.hsn);
        }
      });

      hsnFilter.map((item) => {
        if (item !== "other") {
          var totalSgst = dataList?.reduce((a, b) => {
            return b.hsn == item && (b.sgst || b.sgst >= 0)
              ? parseFloat(a) + parseFloat(b.sgst)
              : a;
          }, 0);
          var value = dataList?.reduce((a, b) => {
            return b.hsn == item && (b.value || b.value >= 0)
              ? parseFloat(a) + parseFloat(b.value)
              : a;
          }, 0);
          var total = dataList?.reduce((a, b) => {
            return b.hsn == item && (b.total || b.total >= 0)
              ? parseFloat(a) + parseFloat(b.total)
              : a;
          }, 0);
          let totalTaxPerc;
          if (total && totalSgst) {
            totalTaxPerc = ((totalSgst * 2) / total) * 100;
          }

          hsnWiseCalc.push({
            hsn: item,
            total: total?.toFixed(2),
            value: value?.toFixed(2),
            taxPerc: totalTaxPerc?.toFixed(2),
            totalSgst: totalSgst?.toFixed(2),
          });
        } else {
          var totalSgst = dataList?.reduce((a, b) => {
            return !b.hsn && (b.sgst || b.sgst >= 0)
              ? parseFloat(a) + parseFloat(b.sgst)
              : a;
          }, 0);
          var value = dataList?.reduce((a, b) => {
            return !b.hsn && (b.value || b.value >= 0)
              ? parseFloat(a) + parseFloat(b.value)
              : a;
          }, 0);
          var total = dataList?.reduce((a, b) => {
            return !b.hsn && (b.total || b.total >= 0)
              ? parseFloat(a) + parseFloat(b.total)
              : a;
          }, 0);
          let totalTaxPerc;
          if (total && totalSgst) {
            totalTaxPerc = ((totalSgst * 2) / total) * 100;
          }

          hsnWiseCalc.push({
            hsn: item,
            total: total?.toFixed(2),
            value: value?.toFixed(2),
            taxPerc: totalTaxPerc?.toFixed(2),
            totalSgst: totalSgst?.toFixed(2),
          });
        }
      });

      let total_gst_perc;
      if (total_total && total_sgst) {
        total_gst_perc = ((total_sgst * 2) / total_total) * 100;
      }

      let roundOff = (
        Math.round(parseFloat(netAmount)).toFixed(2) - parseFloat(netAmount)
      ).toFixed(2);

      if (roundOff == 0 || !roundOff) roundOff = null;
      else if (roundOff < 0) roundOff = Math.abs(roundOff)?.toFixed(2);

      let tempSalesAdd = purchaseData || { ...salesAdd };
      if (!fromEdit) {
        tempSalesAdd = {
          ...tempSalesAdd,
          paid_cash: +netAmount?.toFixed(0),
          change_due: 0,
          bank_amount: 0,
        };
      }
      // let paidCash = (+netAmount?.toFixed(0)- salesAdd.discount) - (+salesAdd.change_due || 0 + +salesAdd.bank_amount ||0)

      // if (editStatus == "edit") {
      //   paidCash = edit.paid_cash || netAmount?.toFixed(0) || 0;
      // }

      // let changeDue = edit?.changeDue || 0;

      // if (paidCash) {
      //   changeDue =
      //     (netAmount?.toFixed(0) - salesAdd.discount || 0) -
      //     paidCash -
      //     salesAdd.bank_amount;
      // }

      tempSalesAdd = {
        ...tempSalesAdd,
        hsnCalc: hsnWiseCalc,
        total_cgst: total_cgst_amnt?.toFixed(2),
        total_value: total_value?.toFixed(2),
        total_margin: netMargin?.toFixed(0),
        total_amount: Number(netAmount?.toFixed(0) - salesAdd.discount),
        total_CTC: totalCTC?.toFixed(2),
        total_qty: totalQty?.toFixed(0),
        total_value: total_value?.toFixed(2),
        total_total: Number(total_total?.toFixed(2)),
        total_scGst: total_sgst?.toFixed(2),
        total_sgst: total_sgst?.toFixed(2),
        tax_gst: total_gst_perc?.toFixed(2),
        total_rate: total_rate,
        total_items: totalItem,
        roundoff: roundOff,
        total_discount: total_disc?.toFixed(2),
      };
      setSalesAdd({ ...tempSalesAdd });
    } else {
      setSalesAdd((data) => ({
        ...data,
        total_amount: 0,
        total_cgst: 0,
        total_value: 0,
        total_margin: 0,
        total_amount: 0,
        paid_cash: 0,
        total_CTC: 0,
        total_qty: 0,
        total_disc: 0,
        total_value: 0,
        total_total: 0,
        total_scGst: 0,
        total_items: 0,
        hsnCalc: [],
        // change_due: null,
      }));
    }
  };

  useEffect(() => {
    getOfInvoiceData();
  }, []);

  useEffect(() => {
    if ((!salesAdd.bank_amount && !salesAdd.fk_bank) || salesAdd.fk_bank)
      setBankSelect(true);
    else setBankSelect(false);
  }, [salesAdd.bank_amount, salesAdd.fk_bank]);

  const handleGetCode = async () => {
    try {
      const response2 = await getCodeWithBillType();
      if (response2.success) {
        setCodeWithBillTypeList(response2.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getData = async () => {
    try {
      let response = await getSales();
      if (response?.success) {
        setSalesList(response?.data);
      }
      return response?.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = () => {
    setSalesEditModal(true);
  };

  const handleChange = (e, data) => {
    if (data && data.name == "fk_bank") {
      let bank_data = data.options.filter((x) => x.value === data.value)[0];
      setSalesAdd((data) => ({
        ...data,
        fk_bank: bank_data?.value,
      }));
    }
    if (e.target.type === "checkbox") {
      setSalesAdd((data) => ({
        ...data,
        [e.target.name]: !salesAdd[e.target.name],
      }));
    } else if (e.target.name == "discount") {
      let discPrice,
        value = e.target.value !== "" ? +e.target.value : null;

      let totalAmount =
        (+salesAdd.paid_cash || 0) +
        (+salesAdd?.bank_amount || 0) +
        (+salesAdd?.change_due || 0);
      discPrice = totalAmount + +salesAdd.discount - value;
      setSalesAdd((data) => ({
        ...data,
        [e.target.name]: value,
        total_amount: discPrice?.toFixed(0),
        paid_cash: discPrice?.toFixed(0),
        change_due: "0.00",
        bank_amount: 0,
      }));
    } else if (e.target.name == "paid_cash") {
      if (
        +e.target.value >
        +salesAdd.paid_cash + +salesAdd.bank_amount + +salesAdd.change_due
      ) {
        Swal.fire({
          title: "Warning",
          text: "The amount exceeds the value in net amount",
          icon: "warning",
          timer: 1560,
        });
      } else {
        let value = e.target.value == "" ? null : e.target.value;
        setSalesAdd((data) => ({
          ...data,
          change_due:
            Number(salesAdd.change_due) +
              Number(salesAdd.total_amount) +
              Number(salesAdd.paid_cash) -
              value -
              salesAdd.total_amount || "0.00",
          paid_cash: value,
        }));
      }
    } else if (e.target.name == "bank_amount") {
      let value = e.target.value == "" ? null : +e.target.value;
      let totalAmount = salesAdd.total_amount;
      // (+salesAdd.change_due || 0) +
      // (+salesAdd.paid_cash || 0) +
      // (+salesAdd.bank_amount || 0);
      setSalesAdd((data) => ({
        ...data,
        paid_cash: +totalAmount - value,
        change_due:
          /* (salesAdd.total_amount - (value + +totalAmount - value)) || */ "0.00",
        bank_amount: value,
      }));
    } else if (e.target.value === "")
      setSalesAdd((data) => ({ ...data, [e.target.name]: null }));
    else setSalesAdd((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const getOfInvoiceData = async () => {
    try {
      const response = await getProperty();
      let list = [];
      if (response.success) {
        response.data.forEach((x) => {
          if (x.property_type == "bill_types") {
            list.push({ value: x["id"], text: x["property_value"] });
          }
        });
        setBillType(list);
        if (!salesAdd.fk_bill_type)
          setSalesAdd((data) => ({ ...data, fk_bill_type: list[0]?.value }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (salesAdd.change_due > 0 && !salesAdd.fk_customer) {
        Swal.fire({
          title: "Customer not selected",
          icon: "warning",
          text: "Please select customer to while balance is due",
          showConfirmButton: false,
          timer: 1500,
        });
        return 0;
      }
      if (tableItemList?.length < 1) {
        Swal.fire({
          title: "Item not added",
          icon: "warning",
          text: "Please add an item before submitting purchase",
          timer: 2000,
        });
        return 0;
      }
      if (salesAdd?.change_due<0 && !salesAdd.fk_customer) {
        Swal.fire({          
          icon: "warning",
          text: "Please select a customer .Balance pending!",
          timer: 2500,
        });
        return 0;
      }
      // const isValidForm = formValidation(formRef.current);
      // if (!isValidForm) return false;
      let submitData = { ...salesAdd, items: tableItemList };
      let response;
      // console.log(submitData.change_due)
      // return 0
      if (!edit) {
        response = await postSales(submitData);
      } else {
        response = await putSales(edit?.id, submitData);
      }
      if (response?.success) {
        getData();
        setShowPrint(true);
        Swal.fire("Purchase added successfully", "", "success");
      } else {
        Swal.fire(response?.data, "", "error");
      }
    } catch (err) {
      Swal.fire({
        title:
          "Error",
        text:
          "Something went wrong , Pls try again",
        icon: "error",
        timer: 1000,
        showConfirmButton: false,
      });
    }
  };

  const printStyle = localStorage.getItem("printType");

  return (
    <div className="item_add">
      <div className="itemList_header row mx-0 mb-3">
        <div className="page_head ps-4 d-flex pe-0">
          <div className="col-5 col-6">
            <div className="fw-600 fs-5">Sales</div>
            <div className="page_head_items mb-1">
              <div
                onClick={() => {
                  navigate("/sales-transaction");
                }}
                className={`page_head_item active`}
              >
                Sales Details
              </div>
            </div>
          </div>
          <div className="col-6 col-7 pe-4 d-flex align-items-center justify-content-end">
            <div className="col-2 col-3 d-flex px-0 align-items-center justify-content-end">
              <div
                onClick={() => setPageHeadItem(5)}
                className={`btn btn-secondary purchase-nav-btn px-2 ${
                  pageHeadItem === 5 && "select"
                }`}
              >
                Printing details
              </div>
            </div>
            {/* <div className="col-2 d-flex px-0 align-items-center justify-content-end">
              <div
                className={`btn btn-secondary purchase-nav-btn px-3 ${
                  pageHeadItem === 4 && "select"
                }`}
              >
                E-Payment
              </div>
            </div> */}
            <div className="col-2 col-3 d-flex px-0 align-items-center justify-content-end">
              <div
                onClick={() => setPageHeadItem(3)}
                className={`btn btn-secondary purchase-nav-btn px-2 ${
                  pageHeadItem === 3 && "select"
                }`}
              >
                Delivery details
              </div>
            </div>
            <div className="col-2 col-3 d-flex px-0 align-items-center justify-content-end">
              <div
                onClick={() => setPageHeadItem(2)}
                className={`btn btn-secondary purchase-nav-btn px-2 ${
                  pageHeadItem === 2 && "select"
                }`}
              >
                Customer details
              </div>
            </div>
            <div className="col-2 col-3 d-flex px-0 align-items-center justify-content-end">
              <div
                onClick={() => setPageHeadItem(1)}
                className={`btn btn-secondary purchase-nav-btn px-2 ${
                  pageHeadItem === 1 && "select"
                }`}
              >
                Invoice details
              </div>
            </div>
          </div>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="item_add_cont px-3 pb-1 pt-0"
      >
        <div className="row mx-0 mb-0 justify-content-between">
          <div className="col-3 mx-0 px-0 ps-2 row">
            <div className="col-12 sales-supplier-container px-0 py-3 row mx-0 mt-1">
              <div className="col-11 row mx-0 mb-1 align-items-center">
                <div className="col-5">Op Balance</div>
                <div className="col-1">:</div>
                <div className="col-5">{cstClsOpn.opening || 0}</div>
              </div>
              <div className="col-11 row mx-0 align-items-center">
                <div className="col-5">Cl Balance</div>
                <div className="col-1">:</div>
                <div className="col-5">{cstClsOpn.closing || 0}</div>
              </div>
            </div>
            <div className="col-12 gap-2 d-flex align-items-end justify-content-start px-0 mx-0 mt-1">
              <div className="">
                <div className="btn btn-sm btn-secondary rounded-bottom-0 px-3">
                  Sales
                </div>
              </div>
              <div className="">
                <div className="btn btn-sm btn-secondary rounded-bottom-0 px-3">
                  S.Return
                </div>
              </div>
              <div className="">
                <div className="btn btn-sm btn-secondary rounded-bottom-0 px-3">
                  Other
                </div>
              </div>
              <div className=" col-3">
                <div
                  onClick={handleEdit}
                  className="btn btn-sm btn-dark px-1 rounded-bottom-0 justify-content-center d-flex align-items-center gap-1"
                >
                  <FiEdit size={"1rem"} />
                  Edit
                </div>
              </div>
            </div>
            {/* <div className="col-3"> */}
            {/* <div
                className="btn btn-dark btn-sm purchase-edit-btn"
                onClick={handleEdit}
              >
                <FiEdit size={"1rem"} />
                Edit
              </div> */}
            {/* </div> */}
          </div>
          {/* --------------------- */}
          <div className={`col-9 ${pageHeadItem !== 1 && "d-none"}`}>
            <SalesInvoiceDetails
              {...{
                tableItemRef,
                salesAdd,
                setSalesAdd,
                billType,
                codeWithBillTypeList,
                handleChange,
                edit,
              }}
            />{" "}
          </div>
          <div className={`col-9 ${pageHeadItem !== 3 && "d-none"}`}>
            <SalesDeliveryDetails
              {...{ salesAdd, setSalesAdd, handleChange }}
            />
          </div>
          <div className={`col-9 ${pageHeadItem !== 2 && "d-none"}`}>
            {" "}
            <SalesCustomerDetails
              {...{
                edit,
                customerList,
                setCustomerList,
                getAllUserAc,
                billType,
                setBillType,
                salesAdd,
                setSalesAdd,
                getCustomer,
                setCstClsOpn,
              }}
            />
          </div>
          <div className={`col-9 ${pageHeadItem !== 4 && "d-none"}`}>
            <SalesInvoiceDetails />
          </div>
          <div className={`col-9 ${pageHeadItem !== 5 && "d-none"}`}>
            <SalesPrintingDetails />
          </div>
          {/* ------------------------- */}
        </div>
        <SalesTable
          {...{
            tableItemRef,
            setTableItemRef,
            handleSetEdit,
            tableItem,
            handleSalesAddCalc,
            setSalesItemModal,
            tableHeadList,
            setTableItem,
            salesAdd,
            edit,
            setEdit,
            handleSalesAllReset,
            tableItemList,
            salesList,
            setTableItemList,
            handleTableItemReset,
          }}
        />
        <SalesDetailFooter
          {...{
            bankSelect,            
            salesAdd,
            handleChange,
            edit,
            handleSubmit,
            handleSalesAllReset,
          }}
        />
      </form>
      <Modal
        show={salesItemModal}
        size="lg"
        centered
        onHide={() => setSalesItemModal(false)}
      >
        <PurchaseTableItemList
          from="sal"
          {...{
            tableHeadList,
            setTableHeadList,
          }}
        />
      </Modal>
      <Modal
        show={salesEditModal}
        size="lg"
        centered
        contentClassName="purchase-table-container"
        onHide={() => setSalesEditModal(false)}
      >
        <PurchaseEditList
          purchaseList={salesList}
          from="sales"
          setPurchaseList={setSalesList}
          closeEditModal={setSalesEditModal}
          {...{ handleSetEdit, setSalesEditModal, getData, setEdit, edit }}
        />
      </Modal>
      <Modal
        show={showPrint}
        centered
        contentClassName="sales-bill"
        size={printStyle == "thermal" ? "md" : "lg"}
        onHide={() => handleSalesAllReset()}
      >
        <PrintFIle
          c_address={salesAdd.customer_address}
          c_name={salesAdd.customer_name}
          c_number={salesAdd.customer_mobile}
          delivery_add={salesAdd.delivery_address}
          c_gstin={salesAdd.gst_in}
          vehicle_no={salesAdd.vehicle_no}
          driver={salesAdd.driver}
          total_qty={salesAdd.total_qty}
          total_disc={salesAdd.total_disc}
          total_value={salesAdd.total_value}
          total_cgst={salesAdd.total_cgst}
          total_sgst={salesAdd.total_sgst}
          total={salesAdd.total_total}
          taxPerc={salesAdd.tax_gst}
          hsn={salesAdd.hsn}
          roundOff={salesAdd.roundoff}
          hsnCalc={salesAdd.hsnCalc}
          {...{ handleSalesAllReset }}
        />
      </Modal>
    </div>
  );
};

export default SalesTransaction;

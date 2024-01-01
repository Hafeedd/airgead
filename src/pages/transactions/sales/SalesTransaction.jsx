import React, { useEffect, useState } from "react";
import "./SalesTransaction.css";
import { useNavigate } from "react-router";
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
import useOnKey from "../../../hooks/onKeyFunct/onKeyFunct";
import { formValidation } from "../../../hooks/formValidation/formValidation";
import Swal from "sweetalert2";
import usePurchaseServices from "../../../services/transactions/purchcaseServices";
import useItemServices from "../../../services/master/itemServices";
import { PrintFIle } from "./components/SalesBill";

const SalesTransaction = () => {
  const [salesItemModal, setSalesItemModal] = useState(false);
  const [salesEditModal, setSalesEditModal] = useState(false);
  const [pageHeadItem, setPageHeadItem] = useState(1);
  const [salesBatchShow, setSalesBatchShow] = useState(false);
  // const [salesHeader, setSalesHeader] = useState(1)
  const [tableEdit, setTableEdit] = useState(false);
  const [edit, setEdit] = useState(false);
  const [docNoRecheck, setDocNoRecheck] = useState(null);
  const [cstm_id, setCstm_id] = useState(false);
  const [customerList, setCustomerList] = useState(null);
  // const [salesItemSerielModal, setSalesItemSerielModal] = useState(false)
  const [tableItemList, setTableItemList] = useState([]);
  // const [tableItemBatch, setTableItemBatch] = useState(null)
  const [tableItemBatchList, setTableItemBatchList] = useState([]);
  const [salesList, setSalesList] = useState();
  const [tableItemKeys, setTableItemKeys] = useState([]);
  const [purchaseItemList, setPurchaseItemList] = useState([]);
  const [currentEditBillType, setCurrentEditBillType] = useState(null);
  const [billType, setBillType] = useState([]);
  const [billTypeDocNo, setBillTypeDocNo] = useState(null);
  const [codeWithBillTypeList, setCodeWithBillTypeList] = useState(null);
  const [showPrint, setShowPrint] = useState(false);
  const [cstClsOpn, setCstClsOpn] = useState({
    opening:null,closing:null,
  })

  const [ref, setRef] = useState(null);

  const [code, setCode] = useState(null);
  const [salesAdd, setSalesAdd] = useState({
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
    rate_types: "RET_RATE",
    bill_date: null,
    tax_gst: null,
    interstate: false,
    reverse_charge: false,
    tax_bill: false,
    total_item: null,
    total_amount: null,
    gst_in: null,
    item: null,
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
  });

  const [tableItem, setTableItem] = useState({
    cstm_id: null,
    item_name: null,
    fk_items: null,
    code: null,
    quantity: 0.0,
    unit: null,
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
  });

  const { getProperty } = useItemServices();
  const { getCustomer } = useCustomerServices();
  const { getPurchaseItem } = usePurchaseServices();
  const { getSales, postSales, putSales, getAllUserAc, getCodeWithBillType } =
    useSalesServices();

  const { handleKeyDown, formRef } = useOnKey(ref, setRef);

  const handleSalesAllReset = () => {
    setSalesAdd({
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
      rate_types: "RET_RATE",
      bill_date: null,
      interstate: false,
      reverse_charge: false,
      tax_bill: false,
      total_item: null,
      total_amount: null,
      gst_in: null,
      item: null,
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
      return_value: null,
      return_cgst_sgst: null,
      transfer_account: null,
      delivery_address: null,
    });
    handleTableItemReset();
    setTableItemList([]);
    setEdit();
    setShowPrint(false);
  };

  const handleTableItemReset = () => {
    let tempItem = { ...tableItem };
    const keys = Object.keys(tableItem);
    keys.map((data) => {
      if (data.match(/^item_name|^unit|^transaction_unit|^cstm_id/)) {
        tempItem = { ...tempItem, [data]: null };
      } else tempItem = { ...tempItem, [data]: 0 };
    });
    setTableItem(tempItem);
  };

  // the purchase data is selected from purchase list when the edit state is set
  useEffect(() => {
    if (salesList?.length > 0) {
      salesList?.map((item) => {
        if (item.id == edit?.id) {
          // checking the purchase id by edit id
          let { sales_item, updated_at, ...others } = item;
          setSalesAdd({ ...salesAdd, ...others });
          setCurrentEditBillType(others.fk_bill_type);
          if (sales_item) {
            setTableItemList([...sales_item]);
          }
        }
      });
    }
  }, [salesList]);

  useEffect(() => {
    getData();
  }, [edit]);

  const navigate = useNavigate();

  // console.log(salesAdd)

  useEffect(() => {
    if (tableItemList?.length > 0) {
      let netAmount = tableItemList?.reduce((a, b) => {
        return b.total || b.total >= 0
          ? parseFloat(a) + parseFloat(b.total)
          : 0;
      }, 0);
      let netMargin = tableItemList?.reduce((a, b) => {
        return b.margin || b.margin >= 0
          ? parseFloat(a) + parseFloat(b.margin)
          : 0;
      }, 0);
      let total_cgst_amnt = tableItemList?.reduce((a, b) => {
        return (b.total || b.total >= 0) && (b.value || b.total >= 0)
          ? parseFloat(a) + parseFloat((b.total - b.value) / 2)
          : 0;
      }, 0);
      let totalItem = tableItemList?.reduce((a, b) => {
        return a + 1;
      }, 0);
      let totalCTC = tableItemList?.reduce((a, b) => {
        return b.cost || b.cost >= 0 ? parseFloat(a) + parseFloat(b.cost) : 0;
      }, 0);
      let totalQty = tableItemList?.reduce((a, b) => {
        return b.quantity || b.quantity >= 0
          ? parseFloat(a) + parseFloat(b.quantity)
          : 0;
      }, 0);
      let total_disc = tableItemList?.reduce((a, b) => {
        return b.discount_1_amount || b.discount_1_amount >= 0
          ? parseFloat(a) + parseFloat(b?.discount_1_amount || 0)
          : 0;
      }, 0);
      let total_value = tableItemList?.reduce((a, b) => {
        return b.value || b.value >= 0
          ? parseFloat(a) + parseFloat(b.value)
          : 0;
      }, 0);
      let total_sgst = tableItemList?.reduce((a, b) => {
        return b.sgst || b.sgst >= 0 ? parseFloat(a) + parseFloat(b.sgst) : 0;
      }, 0);
      let total_scGst = tableItemList?.reduce((a, b) => {
        return b.sgst || b.sgst >= 0
          ? parseFloat(a) + (parseFloat(b.sgst) * parseFloat(b.value)) / 100
          : 0;
      }, 0);
      let total_total = tableItemList?.reduce((a, b) => {
        return b.total || b.total >= 0
          ? parseFloat(a) + parseFloat(b.total)
          : 0;
      }, 0);

      let hsnWiseCalc = []
      let hsnFilter =  ['other']
      tableItemList.forEach(data=>{
        if(data.hsn && hsnFilter.indexOf(data.hsn)<0){
          hsnFilter.push(data.hsn)
        }
      })
        console.log(hsnFilter)
      hsnFilter.map((item)=>{
        if(item !== 'other'){
          var totalSgst = tableItemList?.reduce((a, b) => {
            return (b.hsn == item && (b.sgst || b.sgst >= 0)) ? parseFloat(a) + parseFloat(b.sgst) : a;
          }, 0);
          var value = tableItemList?.reduce((a, b) => {
            return (b.hsn == item && (b.value || b.value >= 0)) ? parseFloat(a) + parseFloat(b.value) : a;
          }, 0);
          var total = tableItemList?.reduce((a, b) => {
            return (b.hsn == item && (b.total || b.total >= 0)) ? parseFloat(a) + parseFloat(b.total) : a;
          }, 0);
          let totalTaxPerc
          if(total && totalSgst){
            totalTaxPerc = ((totalSgst * 2) / total) * 100;
          }
          
          hsnWiseCalc.push({
            hsn:item,
            total:total?.toFixed(2),
            value:value?.toFixed(2),
            taxPerc:totalTaxPerc?.toFixed(2),
            totalSgst:totalSgst?.toFixed(2),
          })
        }else{
          var totalSgst = tableItemList?.reduce((a, b) => {
            console.log(b.hsn)
            return (!b.hsn && (b.sgst || b.sgst >= 0)) ? parseFloat(a) + parseFloat(b.sgst) : a;
          }, 0);
          var value = tableItemList?.reduce((a, b) => {
            return (!b.hsn && (b.value || b.value >= 0)) ? parseFloat(a) + parseFloat(b.value) : a;
          }, 0);
          var total = tableItemList?.reduce((a, b) => {
            return (!b.hsn && (b.total || b.total >= 0)) ? parseFloat(a) + parseFloat(b.total) : a;
          }, 0);
          let totalTaxPerc
          if(total && totalSgst){
            totalTaxPerc = ((totalSgst * 2) / total) * 100;
          }
          
          hsnWiseCalc.push({
            hsn:item,
            total:total?.toFixed(2),
            value:value?.toFixed(2),
            taxPerc:totalTaxPerc?.toFixed(2),
            totalSgst:totalSgst?.toFixed(2),
          })
        }
        })
      
      let total_gst_perc;
      if (total_total && total_sgst) {
        total_gst_perc = ((total_sgst * 2) / total_total) * 100;
      }

      let change_dueCal = Math.round(netAmount) - salesAdd.paid_cash;

      let tempSalesAdd = {
        ...salesAdd,
        hsnCalc:hsnWiseCalc,
        total_amount: netAmount?.toFixed(2),
        total_cgst: total_cgst_amnt?.toFixed(2),
        total_value: total_value?.toFixed(2),
        total_margin: netMargin?.toFixed(0),
        total_amount: netAmount?.toFixed(2),
        // paid_cash:netAmount?.toFixed(2),
        total_CTC: totalCTC?.toFixed(2),
        total_qty: totalQty?.toFixed(0),
        total_value: total_value?.toFixed(2),
        total_total: total_total?.toFixed(2),
        total_scGst: total_scGst?.toFixed(2),
        total_sgst: total_sgst?.toFixed(2),
        total_items: totalItem,
        tax_gst: total_gst_perc?.toFixed(2),
        discount: total_disc?.toFixed(2),
        roundoff: Math.round(netAmount),
        change_due: change_dueCal,
      };
      setSalesAdd({ ...tempSalesAdd });
    }
  }, [tableItemList, salesAdd.paid_cash]);

  useEffect(() => {
    if (tableItemList?.length < 1) {
      let tempSalesAdd = {
        ...salesAdd,
        total_amount: null,
        total_cgst: null,
        total_value: null,
        total_margin: null,
        total_amount: null,
        paid_cash: null,
        total_CTC: null,
        total_qty: null,
        total_disc: null,
        total_value: null,
        total_total: null,
        total_scGst: null,
        total_items: null,
        discount: null,
      };
      setSalesAdd({ ...tempSalesAdd });
    }
  }, [tableItemList]);

  useEffect(() => {
    getPurchaseData();
  }, []);

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

  const getPurchaseData = async () => {
    try {
      let response = await getPurchaseItem();
      if (response.success) {
        setPurchaseItemList(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = () => {
    setSalesEditModal(true);
  };

  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      setSalesAdd((data) => ({
        ...data,
        [e.target.name]: !salesAdd[e.target.name],
      }));
    } else if (e.target.value === "")
      setSalesAdd((data) => ({ ...data, [e.target.name]: null }));
    else setSalesAdd((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const getOfInvoiceData = async () => {
    try {
      const response = await getProperty();
      const response2 = await getCodeWithBillType();
      let list = [];
      if (response.success) {
        response.data.map((x) => {
          if (x.property_type == "bill_types") {
            list.push({ value: x["id"], text: x["property_value"] });
          }
        });
        setBillType(list);
        if (!edit)
          setSalesAdd((data) => ({ ...data, fk_bill_type: list[0]?.value }));
      }
      if (response2.success) {
        setCodeWithBillTypeList(response2.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (tableItemKeys?.length < 1 && !edit) {
        Swal.fire({
          title: "Item not added",
          icon: "warning",
          text: "Please add an item before submitting purchase",
          showConfirmButton: false,
          timer: 1500,
        });
        return 0;
      }
      formValidation(formRef.current);
      let submitData = { ...salesAdd, items: tableItemKeys };
      let response;
      if (!edit) {
        let data = submitData;
        if (docNoRecheck == submitData?.documents_no) {
          const { documents_no, ...others } = submitData;
          data = others;
        }
        response = await postSales(data);
      } else {
        let data = submitData;
        if (edit?.fk_bill_type == salesAdd?.fk_bill_type) {
          const { documents_no, ...others } = submitData;
          data = others;
        }
        response = await putSales(edit?.id, data);
      }
      if (response?.success) {
        // handleSalesAllReset()
        setShowPrint(true);
        Swal.fire("Purchase added successfully", "", "success");
      } else {
        Swal.fire(response?.data, "", "error");
      }
    } catch (err) {
      if(data.length<1) return 0
      let data = err?.response?.data?.data;
      let index;
      if (typeof data == "object") index = Object.keys(data)[0];
      let error = data[index][0];
      Swal.fire({
        title: index.toUpperCase(),
        text: error || "Something went wrong , Pls try again",
        icon: "error",
        timer: 1000,
        showConfirmButton: false,
      });
    }
  };

  const printStyle = localStorage.getItem('printType')

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
            <div className="col-2 d-flex px-0 align-items-center justify-content-end">
              <div
                className={`btn btn-secondary purchase-nav-btn px-3 ${
                  pageHeadItem === 4 && "select"
                }`}
              >
                E-Payment
              </div>
            </div>
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
      <form ref={formRef} className="item_add_cont px-3 pb-1 pt-0">
        <div className="row mx-0 mb-0">
          <div className="col-3 col-4 mx-0 ps-2 px-0 row">
            <div className="col-12 sales-supplier-container py-4 row mx-0 mt-1">
              <div className="col-12 row mx-0 mb-1 align-items-center">
                <div className="col-6">Opening Balance</div>
                <div className="col-1">:</div>
                <div className="col-5">{cstClsOpn.opening||0}</div>
              </div>
              <div className="col-12 row mx-0 align-items-center">
                <div className="col-6">Closing Balance</div>
                <div className="col-1">:</div>
                <div className="col-5">{cstClsOpn.closing||0}</div>
              </div>
            </div>
            <div className="col-9 d-flex align-items-end justify-content-start px-0 mx-0 mt-1">
              <div className="pe-1">
                <div className="btn btn-sm btn-secondary px-3">Sales</div>
              </div>
              <div className="">
                <div className="btn btn-sm btn-secondary px-3">S.Return</div>
              </div>
              <div className="ps-1">
                <div className="btn btn-sm btn-secondary px-3">Other</div>
              </div>
            </div>
            <div className="col-3 pe-0 d-flex justify-content-end align-items-end mt-1">
              <div
                className="btn btn-dark btn-sm purchase-edit-btn"
                onClick={handleEdit}
              >
                <FiEdit size={"1rem"} />
                Edit
              </div>
            </div>
          </div>
          {pageHeadItem == 1 ? (
            <SalesInvoiceDetails
              {...{
                currentEditBillType,
                setCurrentEditBillType,
                billType,
                setBillType,
                getOfInvoiceData,
                billTypeDocNo,
                setBillTypeDocNo,
                getCodeWithBillType,
                codeWithBillTypeList,
                setCodeWithBillTypeList,
                code,
                setCode,
                salesAdd,
                docNoRecheck,
                setDocNoRecheck,
                setSalesAdd,
                handleChange,
                edit,
              }}
            />
          ) : pageHeadItem == 3 ? (
            <SalesDeliveryDetails
              {...{ salesAdd, setSalesAdd, handleChange }}
            />
          ) : pageHeadItem == 2 ? (
            <SalesCustomerDetails
              {...{
                customerList,
                setCustomerList,
                getAllUserAc,
                billType,
                setBillType,
                salesAdd,
                setSalesAdd,
                getCustomer,
                setCstClsOpn
              }}
            />
          ) : pageHeadItem == 4 ? (
            <SalesInvoiceDetails />
          ) : pageHeadItem == 5 ? (
            <SalesPrintingDetails />
          ) : (
            <div></div>
          )}
        </div>
        <SalesTable
          {...{
            salesBatchShow,
            setSalesBatchShow,
            tableItem,
            setSalesItemModal,
            salesAdd,
            salesList,
            setSalesList,
            edit,
            setEdit,
            handleSalesAllReset,
            setTableItemList,
            setTableItem,
            tableEdit,
            setTableEdit,
            tableItemList,
            cstm_id,
            setCstm_id,
            handleTableItemReset,
            getData,
            tableItemBatchList,
            setTableItemBatchList,
            tableItemKeys,
            setTableItemKeys,
          }}
        />
        <SalesDetailFooter
          {...{
            handleKeyDown,
            salesAdd,
            setSalesAdd,
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
        <PurchaseTableItemList />
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
          {...{ setSalesEditModal, getData, setEdit, edit }}
        />
      </Modal>
      <Modal
        show={showPrint}
        centered
        size={printStyle=="thermal"?"md":"lg"}
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

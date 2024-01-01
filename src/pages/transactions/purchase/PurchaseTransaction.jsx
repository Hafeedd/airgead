import React, { useEffect, useRef, useState } from "react";
import "./PurchaseTransaction.css";
import { useNavigate } from "react-router";
import { Modal } from "react-bootstrap";
import PurchaseInvoiceDetails from "./components/PurchaseInvoiceDetails";
import PurchaseTable from "./components/PurchaseTable";
import PurchaseDetailFooter from "./components/PurchaseDetailFooter";
import PurchasePrintingDetails from "./components/PurchasePrintingDetails";
import PurchaseDeliveryDetails from "./components/PurchaseDeliveryDetails";
import PurchaseTableItemList from "./components/PurchaseTableItemList";
import PurchaseEditList from "./components/PurchaseEditList";
import { PurchaseItemBatchAdd } from "./components/PurchaseItemSerielAdd";
import Swal from "sweetalert2";
import usePurchaseServices from "../../../services/transactions/purchcaseServices";
import { formValidation } from "../../../hooks/formValidation/formValidation";
import useItemServices from "../../../services/master/itemServices";
import useOnKey from "../../../hooks/onKeyFunct/onKeyFunct";
import { StockPop } from "./components/StockPop";
import useCustomerServices from '../../../services/master/customerServices'

const PurchaseTransaction = () => {
  const [purchaseItemModal, setPurchaseItemModal] = useState(false);
  const [cstm_id, setCstm_id] = useState(1);
  const [supplierList, setSupplierList] = useState(null);
  const [purchaseEditModal, setPurchaseEditModal] = useState(false);
  const [purchaseItemSerielModal, setPurchaseItemSerielModal] = useState(false);
  const [pageHeadItem, setPageHeadItem] = useState(1);
  const [tebleItemKeys, setTableItemKeys] = useState([]);
  const [itemBatchStore, setItemBatchStore] = useState();
  const [ref, setRef] = useState(null);
  const [edit, setEdit] = useState(null);
  const [showStock, setShowStock] = useState(false);
  const [showBatch, setShowBatch] = useState(false);
  const [itemNameList, setItemNameList] = useState([]);
  const [calcChange, setCalcChange] = useState(true);
  const [tableEdit, setTableEdit] = useState(false);
  const [batchKeys, setBatchKeys] = useState([]);
  const navigate = useNavigate({});

  const [purchaseList, setPurchaseList] = useState();
  const [tableItemList, setTableItemList] = useState([]);
  const [tableItemBatchList, setTableItemBatchList] = useState([]);

  const { handleKeyDown, formRef } = useOnKey(ref, setRef);
  const [purchaseAdd, setPurchaseAdd] = useState({
    cstm_id: null,
    fk_supplier: null,
    supplier_name: null,
    documents_no: null,
    payment_type: "CASH",
    order_no: null,
    bill_no: null,
    created_at: null,
    bill_date: null,
    interstate: false,
    reverse_charge: false,
    tax_bill: false,
    total_item: null,
    total_amount: null,
    item: null,
    discount: null,
    roundoff: null,
    paid_cash: null,
    change_due: null,
    fk_supplier: null,
    vehicle_no: null,
    isBatch: false,
    total_margin: null,
    total_items: null,
    total_disc: null,
    total_value: null,
    total_qty: null,
    driver: null,
    poject: null,
    address: null,
    bank: null,
    transfer_account: null,
  });

  const [tableItem, setTableItem] = useState({
    cstm_id: null,
    item_name: null,
    fk_items: null,
    code: null,
    quantity: 0.0,
    unit: null,
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

  const [tableItemBatch, setTableItemBatch] = useState({
    id: null,
    cstm_id: null,
    batch_or_serial: null,
    company_barcode: null,
    batch_qty: null,
    company: null,
    size: null,
    color: null,
  });

  const { postPurchaseItem, putPurchaseItem } = usePurchaseServices();
  const { getCode } = useItemServices();

  useEffect(() => {
    if (tableItemList.length > 0) {
      let netAmount = tableItemList?.reduce((a, b) => {
        return b.total ? parseFloat(a) + parseFloat(b.total) : 0;
      }, 0);
      let netMargin = tableItemList?.reduce((a, b) => {
        return b.margin ? parseFloat(a) + parseFloat(b.margin) : 0;
      }, 0);
      let totalItem = tableItemList?.reduce((a, b) => {
        return a + 1;
      }, 0);
      let totalCTC = tableItemList?.reduce((a, b) => {
        return b.cost ? parseFloat(a) + parseFloat(b.cost) : 0;
      }, 0);
      let totalQty = tableItemList?.reduce((a, b) => {
        return b.quantity ? parseFloat(a) + parseFloat(b.quantity) : 0;
      }, 0);
      let total_value = tableItemList?.reduce((a, b) => {
        return b.value ? parseFloat(a) + parseFloat(b.value) : 0;
      }, 0);
      let total_scGst = tableItemList?.reduce((a, b) => {
        return b.value ? parseFloat(a) + parseFloat(b.cgst_or_igst) : 0;
      }, 0);
      let total_total = tableItemList?.reduce((a, b) => {
        return b.value ? parseFloat(a) + parseFloat(b.total) : 0;
      }, 0);
      // let total_disc = tableItemList?.reduce((a, b) => {
      //   return b.discount_1_amount
      //     ? parseFloat(a) + parseFloat(b.discount_1_amount)
      //     : 0;
      // }, 0);

      let tempPurchaseAdd = {
        ...purchaseAdd,
        total_margin: netMargin?.toFixed(0),
        // total_amount: netAmount?.toFixed(2),
        total_amount2: netAmount?.toFixed(2),
        paid_cash: netAmount?.toFixed(2),
        total_CTC: totalCTC?.toFixed(2),
        total_qty: totalQty?.toFixed(0),
        // total_disc: total_disc?.toFixed(0),
        total_value: total_value?.toFixed(2),
        total_total: total_total?.toFixed(2),
        total_scGst: total_scGst?.toFixed(0),
        total_items: totalItem,
        // discount: total_disc?.toFixed(2),
      };
      setPurchaseAdd({ ...tempPurchaseAdd });
    } else {
      setPurchaseAdd({
        ...purchaseAdd,
        otal_margin: 0,
        total_amount: 0,
        paid_cash: 0,
        total_CTC: 0,
        total_qty: 0,
        total_value: 0,
        total_total: 0,
        total_scGst: 0,
        total_items: 0, 
        // total_disc: 0,
      });
    }
  }, [tableItemList]);

  useEffect(() => {
    let tempPurhase = { ...purchaseAdd };
    if (purchaseAdd.total_amount) {
      let balance =
        parseFloat(purchaseAdd.total_amount) -
        parseFloat(purchaseAdd.paid_cash ? purchaseAdd.paid_cash : 0);
      if (balance >= 0) {
        tempPurhase = { ...tempPurhase, change_due: balance.toFixed(0),paid_cash2:balance };
      } else {
        tempPurhase = { ...tempPurhase, change_due: 0 };
      }
      if (balance > 0) {
        tempPurhase = { ...tempPurhase, payment_type: "CREDIT" };
      } else {
        tempPurhase = { ...tempPurhase, payment_type: "CASH" };
      }
      setPurchaseAdd(tempPurhase);
    }
  }, [purchaseAdd.paid_cash]);

  useEffect(() => {
    let tempPurhase = { ...purchaseAdd };
    if (purchaseAdd.total_amount) {
      let balance =
        parseFloat(purchaseAdd.total_amount) -
        parseFloat(purchaseAdd.paid_cash ? purchaseAdd.paid_cash : 0);
      if (balance >= 0) {
        tempPurhase = { ...tempPurhase, change_due: balance.toFixed(2) };
      } else {
        tempPurhase = { ...tempPurhase, change_due: 0 };
      }
      if (balance > 0) {
        tempPurhase = { ...tempPurhase, payment_type: "CREDIT" };
      } else {
        tempPurhase = { ...tempPurhase, payment_type: "CASH" };
      }
      setPurchaseAdd(tempPurhase);
    }
  }, [purchaseAdd.paid_cash]);

  useEffect(() => {
    if (
      purchaseAdd?.change_due >= 0 &&
      purchaseAdd.change_due <= purchaseAdd.total_amount
    ) {
      setPurchaseAdd({
        ...purchaseAdd,
        paid_cash: purchaseAdd.total_amount - purchaseAdd.change_due,
      });
    }
  }, [purchaseAdd.change_due]);

  // calculation of table item

  const handleAmountCalculation = (tempItem, e) => {
    let name = e.target.name;
    let value = {};
    let total, cost
    if (tempItem.rate && tempItem.quantity) { 
      total = tempItem.total
      cost = tempItem.cost;
      total = tempItem.quantity * tempItem.rate;
      cost = tempItem.rate;
        value = {
        ["value"]: tempItem.quantity * tempItem.rate,
        ["total"]: total,
        ["cost"]: cost,
      };
      tempItem = {...tempItem,...value}
      if (name !== "discount_1_amount" && tempItem.discount_1_percentage) {
        value = {
          ...value,
          ["discount_1_amount"]:
            value.value -
            (value.value -
              tempItem.discount_1_percentage * (value.value / 100)),
          ["discount_1_amount_per_item"]:
            tempItem.rate -
            (tempItem.rate -
              tempItem.discount_1_percentage * (tempItem.rate / 100)),
        };
      } else if (name !== "discount_1_amount") {
        value = { ...value, ["discount_1_amount"]: 0 ,['discount_1_amount_per_item']:0};
      }
      if (name == "discount_1_amount" && tempItem.discount_1_amount) {
        value = {
          ...value,
          ["discount_1_percentage"]:
            (tempItem.discount_1_amount / value.value) * 100,
        };
      } else if (name == "discount_1_amount") {
        value = { ...value, ["discount_1_percentage"]: 0 };
      }
      tempItem = {...tempItem,...value}
      if (tempItem.value && tempItem.discount_1_amount) {
        tempItem.discount_1_amount = parseFloat(tempItem.discount_1_amount);
        value = {
          ...tempItem,
          ["value"]:
            parseFloat(tempItem.quantity * tempItem.rate) -
            parseFloat(tempItem.discount_1_amount),
          ["total"]:
            parseFloat(tempItem.quantity * tempItem.rate) -
            parseFloat(tempItem.discount_1_amount),
          ["cost"]:
            parseFloat(tempItem.rate) - parseFloat(tempItem.discount_1_amount),
        };
      } else if(name !== 'margin' && name !== 'sales_rate') {
        value = {
          ...value,
          ["value"]: tempItem.quantity * tempItem.rate,
          ["total"]: tempItem.quantity * tempItem.rate,
          ["cost"]: tempItem.rate,
        };
      }
      tempItem = {...tempItem, ...value}
      // if (name == 'tax_gst' || name == 'sales_rate' || name == 'margin') {
        if (tempItem.tax_gst) {
          let totalTaxAmnt = tempItem.tax_gst * (tempItem.value / 100)
          value = {
            ...value,
            ["total"]: tempItem.value + tempItem.tax_gst * (tempItem.value / 100),
            ["cost"]:
                (tempItem.rate-tempItem.discount_1_amount_per_item)
              +
              (tempItem.tax_gst * ((tempItem.rate - tempItem.discount_1_amount_per_item) / 100)),
            ["cgst_or_igst"]: totalTaxAmnt / 2,
            ["sgst"]: totalTaxAmnt / 2,
          };
        } else {
          value = { ...value, cgst_or_igst: 0, sgst: 0 };
        }
      // }
      tempItem = { ...tempItem, ...value };
      if (name !== "sales_rate") {
        if (tempItem.margin) {
          value = {
            ...tempItem,
            ["sales_rate"]:
            parseFloat(tableItem.cost) +
            parseFloat(tableItem.cost * (tempItem.margin / 100)),
          };
        } else {
          value = { ...value, ["sales_rate"]: 0 };
        }
      }
      tempItem = { ...tempItem, ...value };
      if (name !== "margin") {
        if (tempItem.sales_rate) {
          value = {
            ...value,
            ["margin"]: parseFloat(
              ((tempItem.sales_rate - value.cost) / tempItem.cost) * 100
            ),
          };
        } else {
          value = { ...value, ["margin"]: 0 };
        }
      }
    } else {
      tempItem = { ...tempItem, value: 0 };
    }
    tempItem = { ...tempItem, ...value };
    let tempItemKeys = Object.keys(tempItem);
    tempItemKeys?.map((key) => {
      let number = parseFloat(tempItem[key]);
      if (number?.toFixed(2) && !Number.isInteger(number) && number) {
        tempItem = { ...tempItem, [key]: parseFloat(number?.toFixed(2)) };
      }
    });
    tempItem = { ...tempItem };
    setTableItem(tempItem);
  };

  // the purchase data is selected from purchase list when the edit state is set
  useEffect(() => {
    if (purchaseList) {
      purchaseList?.map((item) => {
        if (item.id == edit?.id) {
          // checking the purchase id by edit id
          let { items, updated_at, ...others } = item;
          setPurchaseAdd({ ...purchaseAdd, ...others });
          if (items) {
            setTimeout(() => {
              setTableItemList([...items]);
            }, 100);
          }
        }
      });
    }
  }, [purchaseList]);

  useEffect(() => {
    getData();
  }, [edit]);

  /* useEffect(() => {
        switch (pageHeadItem) {
            case 1: setPurchaseHeader(<PurchaseInvoiceDetails {...{handleEdit,purchaseAdd,
                handleChange,supplierList, setSupplierList}} />)
            break
            case 2: setPurchaseHeader(<PurchasePrintingDetails {...{handleEdit,purchaseAdd,
                handleChange}} />)
            break
            case 3: setPurchaseHeader(<PurchaseDeliveryDetails {...{handleEdit,purchaseAdd,
                handleChange}} />)
            break
            case 4: setPurchaseHeader(<PurchaseInvoiceDetails {...{handleEdit,purchaseAdd,
                handleChange,supplierList, setSupplierList}} />)
                break
            default: break;
        }
    }, [pageHeadItem,purchaseAdd,supplierList,edit]) */

  const {
    postPurchase,
    putPurchase,
    getPurchase,
    deletePurchase,
    deletePurchaseItem,
    deletePurchaseItemBatch,
  } = usePurchaseServices();
  const {getSupplier} = useCustomerServices()

  const getData = async () => {
    try {
      let code, response, response2;

      let res = await getSupplier()
      if(!res?.success) return 0
      let tempSuppList = []
      res.data.map(item=>{
          let a = {value:item.id,text:item.code,name:item.name,description:item.name}
          tempSuppList.push(a)
      })
      setSupplierList(tempSuppList)

      response = await getPurchase();
      if (response?.success) {
        let tempPurData = []
        response?.data.map(purData=>{
          // console.log(purData)
          if(purData.fk_supplier>-1){
            let supplierName = tempSuppList.filter(supData=>supData.value == purData.fk_supplier)[0].name
            purData = {...purData,supplier_name:supplierName}
          }
          tempPurData.push(purData)
        })
        setPurchaseList(tempPurData);
      }
      response2 = await getCode();
      if (response2.success && !edit) {
        for (let i of response2.data) {
          let type = "PUR";
          if (i.sub_id == type) {
            code = i.next_code;
          }
          setPurchaseAdd((data) => ({ ...data, documents_no: code }));
        }
      }
      return response?.data;
    } catch (err) {
      console.log(err);
    }
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

  const handleEdit = () => {
    setPurchaseEditModal(true);
  };

  const handlePurchaseAllReset = () => {
    setPurchaseAdd({
      cstm_id: null,
      fk_supplier: null,
      supplier_name: null,
      documents_no: null,
      patyment_type: "CASH",
      order_no: null,
      bill_no: null,
      created_at: null,
      bill_date: null,
      interstate: false,
      reverse_charge: false,
      tax_bill: false,
      total_item: null,
      total_amount: null,
      item: null,
      discount: null,
      roundoff: null,
      paid_cash: null,
      change_due: null,
      fk_supplier: null,
      vehicle_no: null,
      total_margin: null,
      total_items: null,
      total_qty: null,
      driver: null,
      poject: null,
      address: null,
      bank: null,
      transfer_account: null,
    });
    setTableItemList([]);
    setTableItemBatchList([]);
    setEdit();
    getData();
  };

  const handleChange = (e, data) => {
    if (data) {
      let supplier_data = data.options.filter((x) => x.value === data.value)[0];
      setPurchaseAdd((data) => ({
        ...data,
        ["supplier_name"]: supplier_data?.name,
        ["fk_supplier"]: supplier_data?.value,
      }));
    } else if (e.target.type === "checkbox") {
      setPurchaseAdd((data) => ({
        ...data,
        [e.target.name]: !data[e.target.name],
      }));
    }
    else if(e.target.name == "discount"){
      let discPrice 
        if(e.target.value == ''){
        let discAmntToBeAdded = Math.abs(Number(purchaseAdd?.total_amount2||0)-Number(purchaseAdd.total_amount))||null
        discPrice = Number(purchaseAdd.total_amount)+Number(discAmntToBeAdded)
        }else
        if(purchaseAdd?.total_amount2){
        discPrice = purchaseAdd?.total_amount2
        discPrice = discPrice - e.target.value}
      setPurchaseAdd(data=>({...data, [e.target.name]:e.target.value,
      total_amount:discPrice?.toFixed(2)}))
    }
    else if (e.target.value == "")
      setPurchaseAdd((data) => ({ ...data, [e.target.name]: null }));
    else
      setPurchaseAdd((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const handleChangeTableItem = (e, data) => {
    let tempItem = { ...tableItem };
    if (data) {
      let Item_data = data.options.filter((x) => x?.value === data?.value)[0];
      tempItem = {
        ...tempItem,
        item_name: Item_data?.text,
        code: Item_data?.description,
        fk_items: Item_data?.value,
        unit: Item_data?.unit,
      };
    }
    if (e.target.value === "") {
      tempItem = { ...tempItem, [e.target.name]: "" };
    } else if (e.target.type === "number") {
      tempItem = { ...tempItem, [e.target.name]: parseFloat(e.target.value) };
    } else {
      tempItem = { ...tempItem, [e.target.name]: e.target.value };
    }
    handleAmountCalculation(tempItem, e);
    setCalcChange(!calcChange);
  };

  const handleChangeTableItemBatch = (e) => {
    if (e.target.value == "")
      setTableItemBatch((data) => ({ ...data, [e.target.name]: null }));
    else e.target.value = e.target.value.toUpperCase();
    setTableItemBatch((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const handleCloseItemBatch = () => {
    if (!tableEdit) {
      let tempList = [...tableItemList];
      let listAfterItemRem = [];

      let index = tempList.findIndex((x) => {
        return x.cstm_id == purchaseItemSerielModal;
      });

      if (index > -1) {
        tempList.splice(index, 1);
        listAfterItemRem = [...tempList];
      }
      handlePurchaseAllReset();
      setTableItemList([...listAfterItemRem]);
    }
    setPurchaseItemSerielModal(false);
    setShowBatch(false);
  };

  const handleResetBatch = () => {
    let keys = Object.keys(tableItemBatch);
    keys.map((key) => {
      setTableItemBatch((data) => ({ ...data, [key]: null }));
    });
  };

  const handleResetTable = () => {
    setTableItem({
      cstm_id: null,
      item_name: null,
      fk_items: null,
      code: null,
      quantity: 0.0,
      unit: null,
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
    setTableEdit(false)
    // setEdit(false)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (tebleItemKeys?.length < 0) {
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
      let submitData = { ...purchaseAdd, items: tebleItemKeys };
      let response;
      if (!edit) {
        response = await postPurchase(submitData);
      } else {
        // const { documents_no, ...others } = submitData;
        response = await putPurchase(edit?.id, submitData);
      }
      if (response?.success) {
        handlePurchaseAllReset();
        Swal.fire("Purchase added successfully", "", "success");
      } else {
        if(response?.data?.length>0){
          if(response?.data){
            Swal.fire({
              title: 'Error',
              text: response?.data||"Something went wrong. Pls try again later",
              icon: "error",
              timer: 1000,
              showConfirmButton: false,
            });}
        }else
        Swal.fire("Failed to create purchase", "", "error");
      }
    } catch (err) {
      if(err?.response?.data?.data){
      Swal.fire({
        title: 'Error',
        text: err?.response?.data||"Something went wrong. Pls try again later",
        icon: "error",
        timer: 1000,
        showConfirmButton: false,
      });}
      else{
        Swal.fire("Failed to create purchase", "", "error");
      }
    }
  };

  const handleBatchSubmit = async (tempItems) => {
    try {
      let ItemTempList = [...tableItemBatchList],
        itemTemp = {};
      if (tableItemBatchList.length>0){
        tableItemBatchList?.map((data) => {
          let itemTemp = { ...data };
          itemTemp = { ...itemTemp, ["cstm_id"]: cstm_id };
          setTableItemBatchList(ItemTempList);
        });
      }
        try {
          let submitData = { ...tableItem,fk_units:tableItem?.unit };
          if (purchaseAdd.isBatch)
            submitData = { ...submitData, batch_items: batchKeys };
          let response;
          if (!tableEdit) {
            response = await postPurchaseItem(submitData);
          } else {
            response = await putPurchaseItem(tableEdit, submitData);
          }
          if (response?.success && !tableEdit) {
              let tempItemKeys = [...tebleItemKeys];
              tempItemKeys.push({ id: response?.data?.purchase?.id });
              ItemTempList.push(itemTemp)
              setTableItemKeys(tempItemKeys)
                tempItems?.map((x, i) => {
                    if (x.cstm_id == cstm_id) {
                        x.id = response?.data?.purchase?.id;
                        tempItems.splice(i, 1);
                        tempItems.push({ ...x })
                        setTableItemList(tempItems);
                    }
                })
          } else if((edit || tableEdit) && response.success){
            const data = await getData();
            // setEdit(data);
            tempItems?.map((x, i) => {
              if (x.id == tableEdit) {
                x = {...x,...tableItem}
                tempItems.splice(i, 1);
                tempItems.push({ ...x })
                setTableItemList(tempItems);
              }
            })
            setTableEdit(false);
          // }else if(edit){
          //   setEdit(false)
          }
          else{
            Swal.fire('Error',response.message||
            'Error while adding new item , Please try again','error')
          }
        } catch (err) {
          // setTableItemList([...tableItemList])
          const key = Object.keys(err?.response?.data?.data)[0]?.split('_').join(' ')
          const value = Object.values(err?.response?.data?.data)[0][0]
          Swal.fire("Error",key+" "+value||"Failed to add Item , please try again.",'error')
        }
        setPurchaseItemSerielModal(false);
        handleTableItemReset();
    } catch (err) {
      Swal.fire('Error',"Failed while adding item to table. Pls try again later",'error')
    }
  };

  return (
    <div className="item_add">
      <div className="itemList_header row mx-0 mb-3">
        <div className="page_head ps-4 d-flex pe-0">
          <div className="col-6 col-7">
            <div className="fw-600 fs-5">Purchase</div>
            <div className="page_head_items mb-1">
              <div
                onClick={() => {
                  navigate("/purchase-transaction");
                }}
                className={`page_head_item active`}
              >
                Purchase Details
              </div>
            </div>
          </div>
          <div className="col-5 col-6 pe-4 d-flex align-items-center justify-content-end">
            <div className="col-3 d-flex px-0 align-items-center justify-content-end">
              <div
                onClick={() => setPageHeadItem(2)}
                className={`btn btn-secondary purchase-nav-btn px-2 
                                ${pageHeadItem === 2 && "select"}`}
              >
                Printing details
              </div>
            </div>
            <div className="col-3 d-flex px-0 align-items-center justify-content-end">
              <div
                // onClick={() => setPageHeadItem(4)}
                className={`btn btn-secondary purchase-nav-btn px-3 
                                ${pageHeadItem === 4 && "select"}`}
              >
                E-Payment
              </div>
            </div>
            <div className="col-3 d-flex px-0 align-items-center justify-content-end">
              <div
                onClick={() => setPageHeadItem(3)}
                className={`btn btn-secondary purchase-nav-btn px-2 
                                ${pageHeadItem === 3 && "select"}`}
              >
                Delivery details
              </div>
            </div>
            <div className="col-3 d-flex px-0 align-items-center justify-content-end">
              <div
                onClick={() => setPageHeadItem(1)}
                className={`btn btn-secondary purchase-nav-btn px-2 
                                ${pageHeadItem === 1 && "select"}`}
              >
                Invoice details
              </div>
            </div>
          </div>
        </div>
      </div>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="item_add_cont px-3 pb-1 pt-0"
      >
        {/* {purchaseHeader} ---------------------------------------------------------*/}
        {pageHeadItem == 1? 
        <PurchaseInvoiceDetails
          {...{
            handleEdit,
            purchaseAdd,
            handleChange,
            supplierList,
            setSupplierList,
          }}
        />
        :pageHeadItem == 2? 
        <PurchasePrintingDetails
          {...{ handleEdit, purchaseAdd, handleChange }}
        />
        :pageHeadItem == 3? 
        <PurchaseDeliveryDetails
          {...{ handleEdit, purchaseAdd, handleChange }}
        />
        :pageHeadItem == 4 &&
        <PurchaseInvoiceDetails
          {...{
            handleEdit,
            purchaseAdd,
            handleChange,
            supplierList,
            setSupplierList,
          }}
        />
        }
        {/* {purchaseHeader} ---------------------------------------------------------*/}
        <PurchaseTable
          {...{
            handleBatchSubmit,
            setPurchaseItemModal,
            tableItem,
            setTableItem,
            setShowStock,
            itemNameList,
            setItemNameList,
            handleChangeTableItem,
            purchaseAdd,
            setPurchaseItemSerielModal,
            handleChange,
            cstm_id,
            setCstm_id,
            tableItemList,
            setTableItemList,
            edit,
            tableItemBatchList,
            setTableItemBatchList,
            tableEdit,
            setTableEdit,
            setEdit,
            purchaseList,
            setPurchaseList,
            getData,
            handlePurchaseAllReset,
            handleResetTable,
          }}
        />
        <PurchaseDetailFooter
          {...{
            handleEdit,
            purchaseAdd,
            handleChange,
            handleKeyDown,
            handlePurchaseAllReset,
            edit,
          }}
        />
      </form>
      <Modal
        show={purchaseItemModal}
        size="lg"
        centered
        onHide={() => setPurchaseItemModal(false)}
      >
        <PurchaseTableItemList />
      </Modal>
      <Modal
        show={purchaseEditModal}
        size="lg"
        centered
        contentClassName="purchase-table-container"
        onHide={() => setPurchaseEditModal(false)}
      >
        <PurchaseEditList
          closeEditModal={setPurchaseEditModal}
          {...{
            purchaseList,
            setEdit,
            edit,
            setPurchaseList,
            getData,
          }}
        />
      </Modal>
      <Modal
        show={showBatch}
        size="lg"
        centered
        contentClassName="purchase-batch-modal"
        onHide={() => handleCloseItemBatch()}
      >
        <PurchaseItemBatchAdd
          {...{
            tableItemBatch,
            setTableItemBatch,
            purchaseItemSerielModal,
            handleChangeTableItemBatch,
            setPurchaseItemSerielModal,
            itemBatchStore,
            setItemBatchStore,
            handleTableItemReset,
            tebleItemKeys,
            setTableItemKeys,
            handleBatchSubmit,
            tableItemBatchList,
            setTableItemBatchList,
            tableItemList,
            setTableItemList,
            purchaseAdd,
            tableItem,
            handleCloseItemBatch,
            getData,
            tableEdit,
            setTableEdit,
            handleResetBatch,
            batchKeys,
            setBatchKeys,
            showBatch,
            setShowBatch
          }}
        />
      </Modal>

      <Modal
        show={showStock}
        centered
        size="lg"
        onHide={() => setShowStock(false)}
      >
        <StockPop
          {...{ itemNameList, setTableItem, tableItem, setShowStock }}
        />
      </Modal>
    </div>
  );
};

export default PurchaseTransaction;

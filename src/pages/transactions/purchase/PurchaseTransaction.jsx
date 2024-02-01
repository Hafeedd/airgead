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
import useCustomerServices from "../../../services/master/customerServices";
import useAccountServices from "../../../services/master/accountServices";

const initialPurchaseAdd = {
  cstm_id: null,
  fk_supplier: null,
  supplier_name: null,
  documents_no: null,
  payment_type: "CASH",
  order_no: null,
  bank_amount: null,
  fk_bank: null,
  bill_no: null,
  created_at: null,
  bill_date: null,
  interstate: false,
  reverse_charge: false,
  tax_bill: false,
  total_item: null,
  total_amount: null,
  total_amount2: null,
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
  cstm_id: null,
  fk_supplier: null,
  supplier_name: null,
  documents_no: null,
  payment_type: "CASH",
  order_no: null,
  bank_amount: null,
  fk_bank: null,
  bill_no: null,
  created_at: null,
  bill_date: null,
  interstate: false,
  reverse_charge: false,
  tax_bill: false,
  total_item: null,
  total_amount: null,
  total_amount2: null,
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
};

const initalTableItem = {
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
};

export const initialPurchaseTableStatePositionLocal = JSON.parse(localStorage.getItem(
  "initialPurchaseTableStatePositionLocal"
))

export const initialPurchaseSalesTableStatePosition = [
  {
    title: "Item Name",
    state: "item_name",
    position: 1,
    visible: true,
    skipping: false,
    readOnly: false,
    saleShow:true,
    purchaseShow:true
  },
  {
    title: "Qty",
    state: "quantity",
    position: 2,
    visible: true,
    skipping: false,
    readOnly: false,
    saleShow:true,
    purchaseShow:true
  },
  {
    title: "Ut",
    state: "unit",
    position: 3,
    visible: true,
    skipping: false,
    readOnly: false,
    saleShow:true,
    purchaseShow:true
  },
  {
    title: "P.Rate",
    state: "rate",
    position: 4,
    visible: true,
    skipping: false,
    readOnly: false,
    saleShow:false,
    purchaseShow:true
  },
  {
    title: "Net Rate",
    state: "gross",
    position: 5,
    visible: true,
    skipping: false,
    readOnly: false,
    saleShow:true,
    purchaseShow:false
  },
  {
    title: "Disc%",
    state: "discount_1_percentage",
    position: 6,
    visible: true,
    skipping: false,
    readOnly: false,
    saleShow:true,
    purchaseShow:true
  },
  {
    title: "Disc",
    state: "discount_1_amount",
    position: 7,
    visible: true,
    skipping: false,
    readOnly: false,
    saleShow:true,
    purchaseShow:true
  },
  {
    title: "Value",
    state: "value",
    position: 8,
    visible: true,
    skipping: false,
    readOnly: true,
    saleShow:true,
    purchaseShow:true
  },
  {
    title: "Tax",
    state: "tax_gst",
    position: 9,
    visible: true,
    skipping: false,
    readOnly: false,
    saleShow:true,
    purchaseShow:true
  },
  {
    title: "CGST,IGST",
    state: "cgst_or_igst",
    position: 10,
    visible: true,
    skipping: false,
    readOnly: true,
    saleShow:true,
    purchaseShow:true
  },
  {
    title: "SGST",
    state: "sgst",
    position: 11,
    visible: true,
    skipping: false,
    readOnly: true,
    saleShow:true,
    purchaseShow:true
  },
  {
    title: "Total",
    state: "total",
    position: 12,
    visible: true,
    skipping: false,
    readOnly: true,
    saleShow:true,
    purchaseShow:true
  },
  {
    title: "Cost",
    state: "cost",
    position: 13,
    visible: true,
    skipping: false,
    readOnly: true,
    saleShow:false,
    purchaseShow:true
  },
  {
    title: "Margin",
    state: "margin",
    position: 14,
    visible: true,
    skipping: false,
    readOnly: false,
    saleShow:false,
    purchaseShow:true
  },
  {
    title: "S.Rate",
    state: "sales_rate",
    position: 15,
    visible: true,
    skipping: false,
    readOnly: false,
    saleShow:false,
    purchaseShow:true
  },
];

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
  const [tableEdit, setTableEdit] = useState(false);
  const [batchKeys, setBatchKeys] = useState([]);
  const [bankList, setBankList] = useState([]);
  const [bankSelect, setBankSelect] = useState(false);
  const [tableHeadList, setTableHeadList] = useState(
    initialPurchaseTableStatePositionLocal || initialPurchaseSalesTableStatePosition
  );
  
  // this below state is to check if a table item is edited and -
  // the save button is not checked or not . false if checked
  const [tableItemEdited, setTableItemEdited] = useState(false) 
  const [purchaseList, setPurchaseList] = useState();
  const [tableItemList, setTableItemList] = useState([]);
  const [tableItemBatchList, setTableItemBatchList] = useState([]);
  const { handleKeyDown, formRef } = useOnKey(ref, setRef);
  
  const [purchaseAdd, setPurchaseAdd] = useState(initialPurchaseAdd);
  
  const [tableItem, setTableItem] = useState(initalTableItem);
  
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
  
  const navigate = useNavigate();
  const { postPurchaseItem } = usePurchaseServices();
  const { getCode } = useItemServices();

  useEffect(() => {
    if (edit) handlePurchAllCalc("noEdit");
    else handlePurchAllCalc("noEdit");
  }, [tableItemList]);

  useEffect(() => {
    if (
      (purchaseAdd.bank_amount && purchaseAdd.fk_bank) ||
      (!purchaseAdd.bank_amount && !purchaseAdd.fk_bank)
    )
      setBankSelect(true);
    else setBankSelect(false);
  }, [purchaseAdd.bank_amount, purchaseAdd.fk_bank]);

  useEffect(() => {
    let paymentType = "CASH";
    if (purchaseAdd.change_due > 0) paymentType = "CREDIT";
    setPurchaseAdd((data) => ({ ...data, payment_type: paymentType }));
  }, [purchaseAdd.change_due]);

  useEffect(() => {
    getData();
    handleGetCode();
  }, []);

  useEffect(() => {
    if (edit) {
      let { items, updated_at, ...others } = edit;
      setPurchaseAdd(data=>({ ...data, ...others }));
      if (items) {
          setTableItemList([...items]);
      }
    }else  handleGetCode();
  }, [edit]);

  const handlePurchAllCalc = (status) => {
    if (tableItemList?.length > 0) {
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

      let roundOff = (
        Math.round(parseFloat(netAmount)).toFixed(2) - parseFloat(netAmount)
      ).toFixed(2);
      if (roundOff == 0 || !roundOff) roundOff = null;
      else if (roundOff < 0) roundOff = Math.abs(roundOff);

      // if(roundOff){
      //   roundOff = roundOff.toFixed(2)
      // }
        // console.log(purchaseAdd.paid_cash)
      let paidCash =( +netAmount?.toFixed(0) - purchaseAdd.discount) - (purchaseAdd.change_due || 0 + +purchaseAdd.bank_amount||0)
      // if (status == "edit") {
      //   paidCash = edit.paid_cash || netAmount?.toFixed(0) || 0;
      // }

      // if (status == "edit" && purchaseAdd.discount>0) {
      //   netAmount = +edit.total_amount - purchaseAdd.discount;
      // }

      // if (paidCash) {
      //   changeDue =
      //     (netAmount?.toFixed(0) - purchaseAdd.discount || 0) -
      //     paidCash -
      //     purchaseAdd.bank_amount;
      // }

      let tempPurchaseAdd = {
        ...purchaseAdd,
        total_margin: netMargin?.toFixed(0),
        total_amount: Number(netAmount?.toFixed(0) - purchaseAdd.discount),
        total_amount2: Number(netAmount?.toFixed(2) - purchaseAdd.discount),
        paid_cash: Number(paidCash || 0)?.toFixed(0),
        total_CTC: totalCTC?.toFixed(2),
        total_qty: totalQty?.toFixed(0),
        total_value: total_value?.toFixed(2),
        total_total: total_total?.toFixed(2),
        total_scGst: total_scGst?.toFixed(2),
        total_items: totalItem,
        roundoff: roundOff,
        // change_due: changeDue > 0 ? changeDue?.toFixed(2) : null,
      };
      setPurchaseAdd((data) => ({ ...data, ...tempPurchaseAdd }));
    } else {
      setPurchaseAdd((data) => ({
        ...data,
        otal_margin: 0,
        total_amount: 0,
        paid_cash: 0,
        total_CTC: 0,
        total_qty: 0,
        total_value: 0,
        total_total: 0,
        total_scGst: 0,
        total_items: 0,
        // change_due: 0,
        discount: 0,
        roundoff: 0,
        total_disc: 0,
      }));
    }
  };

  // console.log(purchaseAdd)

  const { getAccountList } = useAccountServices();
  const { postPurchase, putPurchase, getPurchase } = usePurchaseServices();
  const { getSupplier } = useCustomerServices();

  const handleGetCode = async () => {
    try {
      let code;
      let response = await getCode();
      if (response.success && !edit && !purchaseAdd.documents_no) {
        for (let i of response.data) {
          let type = "PUR";
          if (i.sub_id == type) {
            code = i.next_code;
          }
          setPurchaseAdd((data) => ({ ...data, documents_no: code }));
        }
      }
    } catch (err) {}
  };

  const getData = async () => {
    try {
      let response, response1, response3;

      response = await getSupplier();
      if (!response?.success) return 0;
      let tempSuppList = [];
      response.data.map((item) => {
        let a = {
          value: item.id,
          text: item.code,
          name: item.name,
          description: item.name,
        };
        tempSuppList.push(a);
      });
      setSupplierList(tempSuppList);

      response1 = await getPurchase();
      if (response1?.success) {
        let tempPurData = [];
        response1?.data.map((purData) => {
          if (purData.fk_supplier > -1) {
            let supplierName = tempSuppList.filter(
              (supData) => supData.value == purData.fk_supplier
            )[0]?.name;
            purData = { ...purData, supplier_name: supplierName };
          }
          tempPurData.push(purData);
        });
        setPurchaseList(tempPurData);
      }

      response3 = await getAccountList();
      if (response3.success) {
        let bankAcc = [];
        response3.data.map((item) => {
          if (item.bank_account) {
            bankAcc.push({
              key: item.code,
              value: item.id,
              text: item.name,
              description: item.code,
            });
          }
        });
        setBankList([...bankAcc]);
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
    setPurchaseAdd(initialPurchaseAdd);
    setTableItemList([]);
    setTableItemBatchList([]);
    setTableItem(initalTableItem);
    setTableItemKeys([])
    setEdit(false);
    handleGetCode();
  };

  const handleChange = (e, data) => {
    if (data && data.name == "fk_bank") {
      let bank_data = data.options.filter((x) => x.value === data.value)[0];
      setPurchaseAdd((data) => ({
        ...data,
        fk_bank: bank_data?.value,
      }));
    } else if (data) {
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
    } else if (e.target.name == "discount") {
      let discPrice,
        value = e.target.value !== "" ? +e.target.value : null;

      let totalAmount =
        (+purchaseAdd.paid_cash || 0) +
        (+purchaseAdd?.bank_amount || 0) +
        (+purchaseAdd?.change_due || 0);
      discPrice = totalAmount + +purchaseAdd.discount - value;
      setPurchaseAdd((data) => ({
        ...data,
        [e.target.name]: value,
        total_amount: discPrice?.toFixed(0),
        paid_cash: discPrice?.toFixed(0),
        change_due: 0,
        bank_amount: 0,
      }));
    } else if (e.target.name == "bank_amount") {
      let value = e.target.value == "" ? null : +e.target.value;
      let totalAmount =
        (+purchaseAdd.change_due || 0) +
        (+purchaseAdd.paid_cash || 0) +
        (+purchaseAdd.bank_amount || 0);
      setPurchaseAdd((data) => ({
        ...data,
        paid_cash: +totalAmount - value,
        change_due: +purchaseAdd.total_amount - (value + +totalAmount - value),
        bank_amount: value,
      }));
    } else if (e.target.name == "paid_cash") {
      if (
        e.target.value >
        e.target.value + purchaseAdd.bank_amount + purchaseAdd.change_due
      ) {
        Swal.fire({
          title: "Warning",
          text: "The amount exceeds the value in net amount",
          icon: "warning",
          timer: 1560,
        });
      } else {
        let value = e.target.value == "" ? null : +e.target.value;
        setPurchaseAdd((data) => ({
          ...data,
          change_due:
            +purchaseAdd.change_due +
            +purchaseAdd.total_amount +
            +purchaseAdd.paid_cash -
            value -
            +purchaseAdd.total_amount,
          paid_cash: value,
        }));
      }
    } else if (e.target.value == "")
      setPurchaseAdd((data) => ({ ...data, [e.target.name]: null }));
    else
      setPurchaseAdd((data) => ({ ...data, [e.target.name]: e.target.value }));
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
    setTableEdit(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (purchaseAdd.change_due > 0 && !purchaseAdd.fk_supplier) {
        Swal.fire({
          title: "Supplier not selected",
          icon: "warning",
          text: "Please select a supplier if balance is due",
          showConfirmButton: false,
          timer: 1500,
        });
        return 0;
      }
      if (tableItemList.length <= 0) {
        Swal.fire({
          title: "Item not added",
          icon: "warning",
          text: "Please add an item before submitting purchase",
          showConfirmButton: false,
          timer: 1500,
        });
        return 0;
      }
      if (tableItemEdited){
        Swal.fire({
          title: "Item edited but edit button is not clicked",
          icon: "warning",
          text: "",
          showConfirmButton: true,
          timer: 1500,
        });
        return 0;        
      }
      // formValidation(formRef.current);
      let submitData = { ...purchaseAdd, items: tebleItemKeys };
      let response;
      // console.log(submitData.change_due)
      // return 0
      if (!edit) {
        response = await postPurchase(submitData);
      } else {
        // const { documents_no, ...others } = submitData;
        response = await putPurchase(edit?.id, submitData);
      }
      if (response?.success) {
        handlePurchaseAllReset();
        getData();
        Swal.fire("Purchase added successfully", "", "success");
      } else {
        if (response?.data?.length > 0) {
          if (response?.data) {
            Swal.fire({
              title: "Error",
              text:
                response?.data[0] ||
                "Something went wrong. Pls try again later",
              icon: "error",
              timer: 1000,
              showConfirmButton: false,
            });
          }
        } else Swal.fire("Failed to create purchase", "", "error");
      }
    } catch (err) {
      if (err?.response?.data?.data) {
        Swal.fire({
          title: "Error",
          text:
            err?.response?.data || "Something went wrong. Pls try again later",
          icon: "error",
          timer: 1000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire("Failed to create purchase", "", "error");
      }
    }
  };

  const handleBatchSubmit = async (tempItems) => {
    try {
      let ItemTempList = [...tableItemBatchList],
        itemTemp = {};
      if (tableItemBatchList.length > 0) {
        tableItemBatchList?.map((data) => {
          let itemTemp = { ...data };
          itemTemp = { ...itemTemp, ["cstm_id"]: cstm_id };
          setTableItemBatchList(ItemTempList);
        });
      }
      try {
        let submitData = { ...tableItem, fk_units: tableItem?.unit };
        if (purchaseAdd.isBatch)
          submitData = { ...submitData, batch_items: batchKeys };
        let response;
        if (!tableEdit) {
          response = await postPurchaseItem(submitData);
        }
        if (response?.success && !tableEdit) {
          let tempItemKeys = [...tebleItemKeys];
          tempItemKeys.push({ id: response?.data?.purchase?.id });
          ItemTempList.push(itemTemp);
          setTableItemKeys(tempItemKeys);
          tempItems?.map((x, i) => {
            if (x.cstm_id == cstm_id) {
              x.id = response?.data?.purchase?.id;
              tempItems.splice(i, 1);
              tempItems.push({ ...x });
              setTableItemList(tempItems);
            }
          });
        }
        // else if ((edit || tableEdit) && response.success) {
        //   const data = await getData();
        //   // setEdit(data);
        //   tempItems?.map((x, i) => {
        //     if (x.id == tableEdit) {
        //       x = { ...x, ...tableItem };
        //       tempItems.splice(i, 1);
        //       tempItems.push({ ...x });
        //       setTableItemList(tempItems);
        //     }
        //   });
        //   setTableEdit(false);
        //   // }else if(edit){
        //   //   setEdit(false)
        // }
        else {
          Swal.fire(
            "Error",
            response.message ||
              "Error while adding new item , Please try again",
            "error"
          );
        }
      } catch (err) {
      console.log(err)
        // setTableItemList([...tableItemList])
        const key = Object.keys(err?.response?.data?.data)[0]
          ?.split("_")
          .join(" ");
        const value = Object.values(err?.response?.data?.data)[0][0];
        Swal.fire(
          "Error",
          key + " " + value || "Failed to add Item , please try again.",
          "error"
        );
      }
      // setPurchaseItemSerielModal(false);
      handleTableItemReset();
    } catch (err) {
    // console.log(err)
      Swal.fire(
        "Error",
        "Failed while adding item to table. Pls try again later",
        "error"
      );
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
            {/* <div className="col-3 d-flex px-0 align-items-center justify-content-end">
              <div
                // onClick={() => setPageHeadItem(4)}
                className={`btn btn-secondary purchase-nav-btn px-3 
                                ${pageHeadItem === 4 && "select"}`}
              >
                E-Payment
              </div>
            </div> */}
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
        {pageHeadItem == 1 ? (
          <PurchaseInvoiceDetails
            {...{
              setPurchaseAdd,
              handleEdit,
              purchaseAdd,
              handleChange,
              supplierList,
              setSupplierList,
            }}
          />
        ) : pageHeadItem == 2 ? (
          <PurchasePrintingDetails
            {...{ handleEdit, purchaseAdd, handleChange }}
          />
        ) : pageHeadItem == 3 ? (
          <PurchaseDeliveryDetails
            {...{ handleEdit, purchaseAdd, handleChange }}
          />
        ) : (
          pageHeadItem == 4 && (
            <PurchaseInvoiceDetails
              {...{
                handleEdit,
                purchaseAdd,
                handleChange,
                supplierList,
                setSupplierList,
              }}
            />
          )
        )}
        {/* {purchaseHeader} ---------------------------------------------------------*/}
        <PurchaseTable
          {...{
            tableItemEdited, 
            setTableItemEdited,
            tableHeadList,
            handleBatchSubmit,
            setPurchaseItemModal,
            tableItem,
            setTableItem,
            setShowStock,
            itemNameList,
            setItemNameList,
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
            bankSelect,
            bankList,
            tableItemList,
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
        <PurchaseTableItemList
        from="pur"
          {...{
            tableHeadList,
            setTableHeadList
          }}
        />
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
            setShowBatch,
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

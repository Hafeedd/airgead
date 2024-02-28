import React, { useEffect, useRef, useState } from "react";
import "./PurchaseTransaction.css";
import { useLocation, useNavigate } from "react-router";
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
import useItemServices from "../../../services/master/itemServices";
import { StockPop } from "./components/StockPop";
import useCustomerServices from "../../../services/master/customerServices";
import useAccountServices from "../../../services/master/accountServices";
import {
  initialPurchaseAdd,
  initialPurchaseSalesTableStatePosition,
  initialTableItem,
} from "./InitialData/data";
import usePurchaseReturnServices from "../../../services/transactions/purchaseReturnService";
import { StockJournalEdit } from "../stockjurnal/components/StockJournalEdit";

export const initialPurchaseTableStatePositionLocal = JSON.parse(
  localStorage.getItem("initialPurchaseTableStatePositionLocal")
);

const PurchaseTransaction = ({ returnPage }) => {
  const [purchaseItemModal, setPurchaseItemModal] = useState(false);
  const [showPurchaseReturn, setShowPurchaseReturn] = useState(false);
  const [supplierList, setSupplierList] = useState(null);
  const [purchaseEditModal, setPurchaseEditModal] = useState(false);
  const [purchaseItemSerielModal, setPurchaseItemSerielModal] = useState(false);
  const [pageHeadItem, setPageHeadItem] = useState(1);  
  const [edit, setEdit] = useState(null);
  const [showStock, setShowStock] = useState(false);
  const [showBatch, setShowBatch] = useState(false);
  const [itemNameList, setItemNameList] = useState([]);
  const [tableEdit, setTableEdit] = useState(false);
  const [batchKeys, setBatchKeys] = useState([]);
  const [bankList, setBankList] = useState([]);
  const [bankSelect, setBankSelect] = useState(false);
  const [tableHeadList, setTableHeadList] = useState(
    initialPurchaseTableStatePositionLocal ||
      initialPurchaseSalesTableStatePosition
  );

  const [purchaseOnlyList, setPurchaseOnlyList] = useState([]);
  const [purchaseOrReturnList, setPurchaseOrReturnList] = useState([]);
  const [tableItemList, setTableItemList] = useState([]);
  const [tableItemBatchList, setTableItemBatchList] = useState([]);

  const [purchaseAdd, setPurchaseAdd] = useState(initialPurchaseAdd);

  const [tableItem, setTableItem] = useState(initialTableItem);

  //ref of input / select / button fileds
  const [tableItemRef, setTableItemRef] = useState(null);
  const [purchaseInvoiceRef, setPurchaseInvoiceRef] = useState(null);

  const location = useLocation();

  const navigate = useNavigate();
  const { getCode } = useItemServices();

  const { getAccountList } = useAccountServices();
  const { postPurchase, putPurchase, getPurchase } =
    usePurchaseServices();
  const {
    postPurchaseReturn,
    getPurchaseReturn,
    putPurchaseReturn,
  } = usePurchaseReturnServices();

  const { getSupplier } = useCustomerServices();

  useEffect(() => {
    getData();
    if (!returnPage){
    handleReloadData();
  }
    else if (returnPage) {
      handlePurchaseAllReset()
      handleGetCode(true)
    }

    let supplier = location.state;
    if (supplier?.id) {
      setPurchaseAdd((data) => ({
        ...data,
        ["fk_supplier"]: supplier.id,
        ["supplier_name"]: supplier.name,
      }));
      navigate(null, { replace: true, state: { id: null, name: null } });
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'E' && e.shiftKey) {
        setShowPurchaseReturn(true)
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    // if (!returnPage) window.onmousedown = myBeforeUnloadFunction;
    myBeforeUnloadFunction()
  }, [purchaseAdd, tableItemList, edit]);

  const myBeforeUnloadFunction = () => {
    const allPurchState = {
      ...purchaseAdd,
      items: [...tableItemList],
      edit: edit,
    };
    if(!returnPage)
    localStorage.setItem("purchaseData", JSON.stringify(allPurchState));
  };

  const handleReloadData = () => {
    let data = localStorage.getItem("purchaseData");
    if (data) data = JSON.parse(data);
    if (data?.edit) {
      setEdit({ ...data.edit });
      handleSetEdit(data?.edit);
    } else if (data?.created_at) {
      let { items, updated_at, edit, tablekeys, ...others } = data;
      let tempData = {
        ...others,
        change_due: others.change_due || "0.00",
      };
      setPurchaseAdd((data) => ({ ...data, ...tempData }));
      if (items) {
        setTableItemList([...items]);
        handlePurchAllCalc(items, true, tempData);
      }
    } else handleGetCode(false, true);
  };

  useEffect(() => {
    if (
      (!purchaseAdd.bank_amount && !purchaseAdd.fk_bank) ||
      purchaseAdd.fk_bank
    )
      setBankSelect(true);
    else setBankSelect(false);
  }, [purchaseAdd.bank_amount, purchaseAdd.fk_bank]);

  useEffect(() => {
    let paymentType = "CASH";
    if (purchaseAdd.change_due > 0) paymentType = "CREDIT";
    setPurchaseAdd((data) => ({ ...data, payment_type: paymentType }));
  }, [purchaseAdd.change_due]);

  const handleSetEdit = (state) => {
    if (state) {
      let { items, updated_at, ...others } = state;
      let tempData = {
        ...others,
        change_due: others.change_due || "0.00",
      };
      setPurchaseAdd((data) => ({ ...data, ...tempData }));
      if (items) {
        setTableItemList([...items]);
        handlePurchAllCalc(items, true, tempData);
      }
    }
  };

  const handlePurchAllCalc = (dataList, fromEdit, purchaseData) => {
    // dataList is the list of tableItemList
    if (dataList?.length > 0) {
      let tempPurchaseAdd = purchaseData || { ...purchaseAdd };
      let netAmount = dataList?.reduce((a, b) => {
        return b.total ? parseFloat(a) + parseFloat(b.total) : 0;
      }, 0);
      let netMargin = dataList?.reduce((a, b) => {
        return b.margin ? parseFloat(a) + parseFloat(b.margin) : 0;
      }, 0);
      let totalItem = dataList?.reduce((a, b) => {
        return a + 1;
      }, 0);
      let totalCTC = dataList?.reduce((a, b) => {
        return b.cost ? parseFloat(a) + parseFloat(b.cost) : 0;
      }, 0);
      let totalQty = dataList?.reduce((a, b) => {
        return b.quantity ? parseFloat(a) + parseFloat(b.quantity) : 0;
      }, 0);
      let total_value = dataList?.reduce((a, b) => {
        return b.value ? parseFloat(a) + parseFloat(b.value) : 0;
      }, 0);
      let total_scGst = dataList?.reduce((a, b) => {
        return b.value ? parseFloat(a) + parseFloat(b.cgst_or_igst) : 0;
      }, 0);
      let total_total = dataList?.reduce((a, b) => {
        return b.value ? parseFloat(a) + parseFloat(b.total) : 0;
      }, 0);
      let total_disc = dataList?.reduce((a, b) => {
        return b.discount_1_amount
          ? parseFloat(a) + parseFloat(b.discount_1_amount)
          : 0;
      }, 0);

      let roundOff = (
        Math.round(parseFloat(netAmount)).toFixed(2) - parseFloat(netAmount)
      ).toFixed(2);
      if (roundOff == 0 || !roundOff) roundOff = null;
      else if (roundOff < 0) roundOff = Math.abs(roundOff);

      if (!fromEdit)
        tempPurchaseAdd = {
          ...tempPurchaseAdd,
          paid_cash: netAmount?.toFixed(0),
          change_due: 0,
          bank_amount: 0,
        };

      tempPurchaseAdd = {
        ...tempPurchaseAdd,
        total_margin: netMargin?.toFixed(0),
        total_amount: Number(netAmount?.toFixed(0) - purchaseAdd.discount),
        total_amount2: Number(netAmount?.toFixed(2) - purchaseAdd.discount),
        total_CTC: totalCTC?.toFixed(2),
        total_qty: totalQty?.toFixed(0),
        total_value: total_value?.toFixed(2),
        total_total: total_total?.toFixed(2),
        total_scGst: total_scGst?.toFixed(2),
        total_items: totalItem,
        total_disc: total_disc,
        roundoff: roundOff,
      };

      setPurchaseAdd((data) => {
        return { ...data, ...tempPurchaseAdd };
      });
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
        discount: 0,
        roundoff: 0,
        total_disc: 0,
      }));
    }
  };

  const handleGetCode = async (nextCode, firstReload) => {
    //  nextCode arg is sent form handleNext fucnt
    //  in purchaseTable and handleReset in purchaseDetailFooter
    //  it is for reseting doc_no instead of checking edit
    try {
      let code;
      let response = await getCode();
      if (
        response.success &&
        ((!edit && nextCode) || nextCode || (!nextCode && firstReload))
      ) {
        for (let i of response.data) {
          let type = "PUR";
          if(returnPage){
            type = "PURT"
          }
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
      let response, response1, response3,response4, suppList, bankList, purOrRetList,purOnlyList;
      
      const handleSuppNameAdd = (data) =>{
        let list = [];
          data.map((purData) => {
            if (purData.fk_supplier > -1) {
              let supplierName = suppList?.filter(
                (supData) => supData.value == purData.fk_supplier
              )[0]?.name;
              purData = { ...purData, supplier_name: supplierName };
            }
            list.push(purData);
          });
          return list
      }
      
      response = await getSupplier();
      if (!response?.success) return 0;
      suppList = [];
      response.data.map((item) => {
        let a = {
          value: item.id,
          text: item.code,
          name: item.name,
          description: item.name,
        };
        suppList.push(a);
      });
      setSupplierList(suppList);
      if (returnPage){         
        response4 = await getPurchase();
        response1 = await getPurchaseReturn();}
      else response1 = await getPurchase();
      if (response1?.success && ((returnPage && response4.success)|| !returnPage)) {
        purOrRetList = handleSuppNameAdd(response1.data)
        if(returnPage && response4.success)
        purOnlyList = handleSuppNameAdd(response4.data)
        setPurchaseOrReturnList(purOrRetList);
        setPurchaseOnlyList(purOnlyList)
      }

      response3 = await getAccountList();
      if (response3.success) {
        bankList = [];
        response3.data.map((item) => {
          if (item.bank_account) {
            bankList.push({
              key: item.code,
              value: item.id,
              text: item.name,
              description: item.code,
            });
          }
        });

        setBankList([...bankList]);
      }
      return { suppList, bankList };
    } catch (err) {
      console.log(err);
    }
  };

  const handleTableItemReset = () => {
    setTableEdit(false);
    setTableItem(initialTableItem);
  };

  const handleEdit = () => {
    setPurchaseEditModal(true);
  };

  const handlePurchaseAllReset = () => {
    setPurchaseAdd(initialPurchaseAdd);
    setTableItemList([]);
    setTableItemBatchList([]);
    setTableItem(initialTableItem);    
    setEdit(false);
    if (!returnPage) {
    localStorage.setItem("purchaseData", false);
  }
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
        change_due: "0.00",
        bank_amount: 0,
      }));
    } else if (e.target.name == "bank_amount") {
      let value = e.target.value == "" ? null : +e.target.value;
      let totalAmount = purchaseAdd.total_amount;
      setPurchaseAdd((data) => ({
        ...data,
        paid_cash: +totalAmount - value,
        change_due: "0.00",
        bank_amount: value,
      }));
    } else if (e.target.name == "paid_cash") {
      if (
        +e.target.value >
        +(
          +purchaseAdd.paid_cash +
          +purchaseAdd.bank_amount +
          +purchaseAdd.change_due
        )
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
              +purchaseAdd.total_amount || "0.00",
          paid_cash: value,
        }));
      }
    } else if (e.target.value == "")
      setPurchaseAdd((data) => ({ ...data, [e.target.name]: null }));
    else
      setPurchaseAdd((data) => ({ ...data, [e.target.name]: e.target.value }));
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
      
      let submitData = { ...purchaseAdd, items: tableItemList };
      let response;

      if (!edit) {
        if (returnPage) response = await postPurchaseReturn(submitData);
        else response = await postPurchase(submitData);
      } else {
        if (returnPage)
          response = await putPurchaseReturn(edit?.id, submitData);
        else response = await putPurchase(edit?.id, submitData);
      }
      if (response?.success) {
        handlePurchaseAllReset();
        handleGetCode(true);
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

  // const handleBatchSubmit = async (tempItems) => {
  //   try {
  //     let ItemTempList = [...tableItemBatchList],
  //       itemTemp = {};
  //     if (tableItemBatchList.length > 0) {
  //       tableItemBatchList?.map((data) => {
  //         let itemTemp = { ...data };
  //         itemTemp = { ...itemTemp, ["cstm_id"]: cstm_id };
  //         setTableItemBatchList(ItemTempList);
  //       });
  //     }
  //     try {
  //       let submitData = { ...tableItem };
  //       if (purchaseAdd.isBatch)
  //         submitData = { ...submitData, batch_items: batchKeys };
  //       let response;
  //       if (!tableEdit) {
  //         if (returnPage) response = await postPurchaseReturnItem(submitData);
  //         else response = await postPurchaseItem(submitData);
  //       }
  //       if (response?.success && !tableEdit) {
  //         let tempItemKeys = [...tableItemKeys];
  //         tempItemKeys.push({
  //           id: returnPage ? response?.data?.id : response?.data?.purchase?.id,
  //         });
  //         ItemTempList.push(itemTemp);  
  //         tempItems?.map((x, i) => {
  //           if (x.cstm_id == cstm_id) {
  //             x.id = returnPage
  //               ? response?.data?.id
  //               : response?.data?.purchase?.id;
  //             tempItems.splice(i, 1);
  //             tempItems.push({ ...x });
  //             setTableItemList(tempItems);
  //           }
  //         });
  //       }
  //       // else if ((edit || tableEdit) && response.success) {
  //       //   const data = await getData();
  //       //   // setEdit(data);
  //       //   tempItems?.map((x, i) => {
  //       //     if (x.id == tableEdit) {
  //       //       x = { ...x, ...tableItem };
  //       //       tempItems.splice(i, 1);
  //       //       tempItems.push({ ...x });
  //       //       setTableItemList(tempItems);
  //       //     }
  //       //   });
  //       //   setTableEdit(false);
  //       //   // }else if(edit){
  //       //   //   setEdit(false)
  //       // }
  //       else {
  //         Swal.fire(
  //           "Error",
  //           response.message ||
  //             "Error while adding new item , Please try again",
  //           "error"
  //         );
  //       }
  //     } catch (err) {
  //       // setTableItemList([...tableItemList])
  //       const key = Object.keys(err?.response?.data?.data)[0]
  //         ?.split("_")
  //         .join(" ");
  //       const value = Object.values(err?.response?.data?.data)[0][0];
  //       Swal.fire(
  //         "Error",
  //         key + " " + value || "Failed to add Item , please try again.",
  //         "error"
  //       );
  //     }
  //     // setPurchaseItemSerielModal(false);
  //     handleTableItemReset();
  //     handlePurchAllCalc(tempItems, false);
  //   } catch (err) {
  //     console.log(err);
  //     Swal.fire(
  //       "Error",
  //       "Failed while adding item to table. Pls try again later",
  //       "error"
  //     );
  //   }
  // };

  const handleBatchSubmit = (tempItems) => {};

  return (
    <div className="item_add">
      <div className={`itemList_header row mx-0 mb-3`}>
        <div
          className={`page_head ps-4 d-flex pe-0 ${
            returnPage && " purchase-return active-header2"
          }`}
        >
          <div className="col-6 col-7">
            <div className="fw-600 fs-5">
              Purchase {returnPage && " Return"}
            </div>
            <div className="page_head_items mb-1">
              <div
                onClick={() => {
                  navigate("/purchase-transaction");
                }}
                className={`page_head_item active`}
              >
                Purchase {returnPage && " Return "} Details
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
      <form onSubmit={handleSubmit} className="item_add_cont px-3 pb-1 pt-0">
        {/* {purchaseHeader} ---------------------------------------------------------*/}
        {
          pageHeadItem == 1 ? (
            <PurchaseInvoiceDetails
              {...{
                returnPage,
                purchaseInvoiceRef,
                setPurchaseInvoiceRef,
                tableItemRef,
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
              {...{ returnPage, handleEdit, purchaseAdd, handleChange }}
            />
          ) : (
            pageHeadItem == 3 && (
              <PurchaseDeliveryDetails
                {...{ returnPage, handleEdit, purchaseAdd, handleChange }}
              />
            )
          )
        }
        {/* {purchaseHeader} ---------------------------------------------------------*/}
        <PurchaseTable
          {...{
            purchaseInvoiceRef,
            tableItemRef,
            setTableItemRef,
            handleGetCode,
            handleSetEdit,
            tableHeadList,
            setPurchaseItemModal,
            tableItem,
            setTableItem,
            edit,
            handlePurchAllCalc,
            purchaseAdd,
            tableItemList,
            setTableItemList,
            tableEdit,
            setEdit,
            itemNameList,
            setItemNameList,
            purchaseOrReturnList,
            handleTableItemReset,
            handlePurchaseAllReset,
            setShowBatch,
          }}
        />
        <PurchaseDetailFooter
          {...{
            setPurchaseAdd,
            handleGetCode,
            bankSelect,
            bankList,
            tableItemList,
            purchaseAdd,
            handleChange,
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
            setTableHeadList,
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
            handleSetEdit,
            purchaseOrReturnList,
            setEdit,
            edit,
            setPurchaseOrReturnList,
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
            edit,
            setPurchaseItemSerielModal,
            purchaseItemSerielModal,
            handleTableItemReset,
            tableItemBatchList,
            setTableItemBatchList,
            handleCloseItemBatch,
            setTableEdit,
            getData,
            handleBatchSubmit,
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
      <Modal
      show={showPurchaseReturn && returnPage}
      centered
      size="xl"
      onHide={()=>setShowPurchaseReturn(false)}
      >
        <StockJournalEdit
        list={purchaseOnlyList}
        title="Purchase Return Item List"
        setShow={setShowPurchaseReturn}        
        handleCalc={handlePurchAllCalc}
        show={showPurchaseReturn}
        setItemList={setTableItemList}
        handleClearAll={handlePurchaseAllReset}
        supplierCustomer={purchaseAdd.supplier_name}
        from="purchRtn" 
        {...{getData,setEdit}}
        />
      </Modal>
    </div>
  );
};

export default PurchaseTransaction;

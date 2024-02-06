import React, { useEffect, useState } from "react";
import useItemServices from "../../../../services/master/itemServices";
import { Dropdown } from "semantic-ui-react";
import { FiEdit } from "react-icons/fi";
import { BsTrashFill } from "react-icons/bs";
import Swal from "sweetalert2";
import usePurchaseServices from "../../../../services/transactions/purchcaseServices";
import useOnKey from "../../../../hooks/onKeyFunct/onKeyFunct";

const PurchaseTable = (props) => {
  const {
    setTableItemEdited,
    tableHeadList,
    setPurchaseItemModal,
    tableItem,
    setTableItem,
    edit,
    handlePurchAllCalc,
    setPurchaseItemSerielModal,
    cstm_id,
    purchaseAdd,
    setCstm_id,
    tableItemList,
    setTableItemList,
    tableEdit,
    setTableEdit,
    setEdit,
    handleBatchSubmit,
    itemNameList,
    setItemNameList,
    purchaseList,
    getData,
    handlePurchaseAllReset,
    handleResetTable,
    setShowBatch,
    setShowStock,
    setPurchaseList,
    showBatch,
    tableItemBatchList,
    setTableItemBatchList,
  } = props;

  const [ref, setRef] = useState();
  const [ref2, setRef2] = useState();
  // const [itemNameList, setItemNameList] = useState([])
  const [unitList, setUnitList] = useState();

  useEffect(() => {
    getTableData();
  }, []);

  useEffect(()=>{
    const tempList = [...tableItemList]
    const editedList = tempList.filter((x) => x.edited);
      if (editedList.length < 1) setTableItemEdited(false);
  },[tableItemList])

  const [handleKeyDown, formRef] = useOnKey(ref, setRef);
  const [handleKeyDown2, formRef2] = useOnKey(ref2, setRef2, tableItemList);

  const { getItemNameList, getProperty } = useItemServices();

  const { deletePurchaseItem, putPurchaseItem } = usePurchaseServices();

  const handleKeyTableItemEdit = async (e, data, i) => {
    e.preventDefault();
    if (e.key == "Enter" && !e.ctrlKey) {
      handleTableItemEdit(e, data, i);
    } else handleKeyDown2(e);
  };

  const handleTableItemEdit = async (e, data, i) => {
    try {
      if (!data.item_name || !data.quantity || !data.rate) {
        Swal.fire({
          title: "please enter Essential details firs",
          text: "Enter Rate , Quantity and Select Item First",
          icon: "warning",
          // showConfirmButton: false,
          timer: 1500,
        });
        handleKeyDown2(e);
        return 0;
      }
      let response = await putPurchaseItem(data.id, data);
      if (response.success) {
        handleKeyDown2(e);
        getData();
      } else {
        Swal.fire({
          title: "Failed to edit",
          text: response.message || "Something went wrong! please try again",
          icon: "warning",
          timer: 1500,
        });
      }
      let tempList = [...tableItemList];
      let { edited, ...others } = data;
      tempList.splice(i, 1, others);
      setTableItemList([...tempList]); 
      handlePurchAllCalc(tempList,false)     
    } catch (err) {}
  };

  const getTableData = async () => {
    const minFunct = (data) => {
      let list = [];
      data.map((x) => {
        if (x.property_type === "unit") {
          list.push({ value: x["id"], text: x["property_value"] });
        }
      });
      setUnitList(list);
    };

    const handleDataNameList = (data) => {
      let tempList = [];
      data?.map((x) => {
        tempList.push({
          ...x,
          text: x.name,
          description: x.code,
          value: x.id,
          unit: x.fk_unit,
        });
      });
      setItemNameList([...tempList]);
    };
    try {
      let res2 = await getProperty();
      let res = await getItemNameList();
      if (res2?.success) minFunct(res2.data);
      if (res?.success) handleDataNameList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // handle table item changing-----------------------------------

  const handleChangeTableItem = (e, data, state, toTableItem) => {
    // toTableItem is used to check if the state to be set to tableItem or tableItemList
    // if toTableItem is not true then it contains the index of tableItemList
    let tempItem = { ...state };
    if (data) {
      let Item_data = data.options.filter((x) => x?.value === data?.value)[0];
      // console.log(Item_data)
      const { purchase_rate, discount_1_percentage, tax_gst, fk_unit } =
        Item_data || {};
      tempItem = {
        ...tempItem,
        rate: purchase_rate || 0,
        discount_1_percentage: discount_1_percentage || 0,
        tax_gst: tax_gst || 0,
        fk_unit: fk_unit,
        quantity: Item_data ? 1 : 0,
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
    const calculatedData = handleAmountCalculation(tempItem, e, state);
    if (toTableItem === true) setTableItem(calculatedData);
    else {
      let tempList = [...tableItemList];
      tempList.splice(toTableItem, 1, { ...calculatedData, edited: true });
      setTableItemList([...tempList]);
      setTableItemEdited(true);
    }
  };

  //  calculating table item values

  const handleAmountCalculation = (tempItem, e, state) => {
    let name = e.target.name;
    let value = {};
    let total, cost;
    if (tempItem.rate && tempItem.quantity) {
      total = tempItem.total;
      cost = tempItem.cost;
      total = tempItem.quantity * tempItem.rate;
      cost = tempItem.rate;
      value = {
        ["value"]: tempItem.quantity * tempItem.rate,
        ["total"]: total,
        ["cost"]: cost,
      };
      tempItem = { ...tempItem, ...value };
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
        value = {
          ...value,
          ["discount_1_amount"]: 0,
          ["discount_1_amount_per_item"]: 0,
        };
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
      tempItem = { ...tempItem, ...value };
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
      } else if (name !== "margin" && name !== "sales_rate") {
        value = {
          ...value,
          ["value"]: tempItem.quantity * tempItem.rate,
          ["total"]: tempItem.quantity * tempItem.rate,
          ["cost"]: tempItem.rate,
        };
      }
      tempItem = { ...tempItem, ...value };

      if (tempItem.tax_gst) {
        let totalTaxAmnt = +tempItem.tax_gst * (+tempItem.value / 100);
        let sgst = (totalTaxAmnt / 2)?.toFixed(2);
        value = {
          ...value,
          ["total"]: +tempItem.value + sgst * 2,
          ["cost"]:
            +tempItem.rate -
            +tempItem.discount_1_amount_per_item +
            +tempItem.tax_gst *
              ((+tempItem.rate - +tempItem.discount_1_amount_per_item) / 100),
          ["cgst_or_igst"]: sgst,
          ["sgst"]: sgst,
        };
      } else {
        value = { ...value, cgst_or_igst: 0, sgst: 0 };
      }

      tempItem = { ...tempItem, ...value };
      if (name !== "sales_rate") {
        if (tempItem.margin) {
          value = {
            ...tempItem,
            ["sales_rate"]:
              +state.cost?.toFixed(2) +
              +state.cost?.toFixed(2) * (+tempItem.margin / 100),
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
      tempItem = {
        ...tempItem,
        value: 0,
        /* tax_gst:0, */ sgst: 0,
        cgst_or_igst: 0,
        total: 0,
        cost: 0,
      };
    }
    tempItem = { ...tempItem, ...value };
    let tempItemKeys = Object.keys(tempItem);
    tempItemKeys?.map((key) => {
      let number = parseFloat(tempItem[key]);
      if (number?.toFixed(2) && !Number.isInteger(number) && number) {
        tempItem = { ...tempItem, [key]: parseFloat(number?.toFixed(2)) };
      }
    });

    return tempItem;
  };

  // -----------------------------------------------------

  const handleFocus = (e) => {
    if (!tableItem[e.target.name])
      setTableItem((data) => ({ ...data, [e.target.name]: "" }));
  };

  const handleBlur = (e) => {
    if (
      !tableItem[e.target.name] ||
      tableItem[e.target.name] == "" ||
      tableItem[e.target.name] == "0"
    ) {
      setTableItem((data) => ({ ...data, [e.target.name]: 0 }));
    }
  };

  const handleAddBatchOpen = (e) => {
    e.preventDefault();
    let itemTempList = [...tableItemList];

    if (e.type === "keydown") {
      if (e?.key !== "Enter") return 0;
    }
    if (
      !tableEdit &&
      (!tableItem.item_name || !tableItem.quantity || !tableItem.rate)
    ) {
      Swal.fire({
        title: "please enter Essential details firs",
        text: "Enter Rate , Quantity and Select Item First",
        icon: "warning",
        showConfirmButton: false,
        timer: 1500,
      });
      handleKeyDown(e);
      return 0;
    }
    if (!tableEdit) {
      let itemTemp = { ...tableItem };
      itemTemp = { ...itemTemp, ["cstm_id"]: cstm_id };
      itemTempList.unshift(itemTemp);
      // setTableItemList(itemTempList);
      setCstm_id(cstm_id + 1);
      setPurchaseItemSerielModal(cstm_id);
      if (purchaseAdd.isBatch) setShowBatch(true);
    } else {
      setPurchaseItemSerielModal(tableEdit || true);
    }
    if (purchaseAdd.isBatch) setShowBatch(true);
    else handleBatchSubmit(itemTempList,false);
    handleKeyDown(e);
  };

  const handlePrev = () => {
    if (purchaseList?.length > 0) {
      if (!edit) {
        handlePurchaseAllReset();
        setEdit(purchaseList[0]);
      } else {
        let ind = purchaseList?.findIndex((x) => edit.id == x.id);
        if (ind !== purchaseList?.length - 1) {
          handlePurchaseAllReset();
          setEdit(purchaseList[ind + 1]);
        } else {
          Swal.fire("No more purchase to edit", "go for next", "warning");
        }
      }
    } else {
      Swal.fire("No more purchase to edit", "go for next", "warning");
    }
  };

  const handleNext = () => {
    if (!edit) {
      Swal.fire("No more purchase to edit", "go for prev", "warning");
    } else if (edit?.id == purchaseList[0].id) {
      handlePurchaseAllReset();
    } else {
      handlePurchaseAllReset();
      let ind = purchaseList?.findIndex((x) => edit.id == x.id);
      if (ind !== purchaseList[0]) {
        setEdit(purchaseList[ind - 1]);
      } else {
        Swal.fire("No more purchase to edit", "go for prev", "warning");
      }
    }
  };

  const AdjustHeightOfTable = () => {
    let a = [];
    for (let i = 0; i < 9 - purchaseAdd.total_items || 0; i++) {
      a.push(
        <tr key={i}>
          <td
            className="border-0"
            style={{ height: "1.82rem", display: "" }}
            colSpan={tableHeadList.length + 2}
          ></td>
        </tr>
      );
    }
    return a;
  };

  const handleTableItemDelete = async (data, i) => {
    if (tableItemList?.length < 2 && edit) {
      Swal.fire({
        title: "There is only one item exist.",
        text: "You cant delete.",
        icon: "warning",
        timer: 1500,
      });
      return 0;
    }
    if (!data.created_at) {
      let tempList = [...tableItemList];
      tempList.splice(i, 1);
      setTableItemList([...tempList]);
    }
    try {
      let response = await deletePurchaseItem(data.id);
      if (response.success) {
        Swal.fire({
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        let tempList = [...tableItemList];
        tempList.splice(i, 1);
        setTableItemList([...tempList]);
        getData();
      }
      // else if (response.success && !data.created_at) {
      //   Swal.fire({
      //     title: "Item deleted successfully",
      //     icon: "success",
      //     showConfirmButton: false,
      //     timer: 1500,
      //   });
      // }
      else {
        Swal.fire(response.message, "", "error");
      }
    } catch (err) {
      Swal.fire("Fialed to delete item", "please try again", "warning");
    }
  };

  const search = (options, searchValue) => {
    searchValue = searchValue.toUpperCase();
    return options.filter((option) => {
      return (
        option?.text.toString().includes(searchValue) ||
        option.description.includes(searchValue)
      );
    });
  };

  return (
    <>
      <div className="mx-2 mt-1 purchase-table-item-container px-0">
        <table className="table table-secondary purchase-table mb-0">
          <thead className="purchase-table-header">
            <tr>
              {/* <th className="text-start" colSpan={2}>
                Item Name
              </th>
              <th>Qty</th>
              <th>Ut</th>
              <th width="65">P. Rate</th>
              <th>Disc%</th>
              <th>Disc</th>
              <th>Value</th>
              <th>Tax%</th>
              <th>CGST/IGST</th>
              <th>SGST</th>
              <th>Total</th>
              <th>Cost</th>
              <th>Margin%</th>
              <th>S.Rate</th> */}
              {tableHeadList?.length > 0 &&
                tableHeadList.map((item, i) => {
                  if (item.visible && item.purchaseShow)
                    return (
                      //   item.state == "item_name"?
                      //   <th className="text-start" colSpan={2}>
                      //   Item Name
                      // </th>:
                      i == 0 ? (
                        <th className="text-start" colSpan={2}>
                          {item.title}
                        </th>
                      ) : (
                        <th>{item.title}</th>
                      )
                    );
                })}
              <th className="py-1 text-end">
                <div
                  className="btn btn-primary purchase-add-btn my-0 py-0"
                  onClick={() => setPurchaseItemModal(true)}
                >
                  +
                </div>
              </th>
              {/* <th className="py-1 text-end"></th> */}
            </tr>
          </thead>
          <tbody className="purchase-table-body">
            {tableItemList?.length > 0 &&
              tableItemList.map((data, i) => {
                const confirmDelete = async () => {
                  Swal.fire({
                    title: "Delete Item",
                    text: "Do you want to delete Item ?",
                    showDenyButton: true,
                    showCancelButton: false,
                    denyButtonText: "Cancel",
                    showLoaderOnConfirm: true,
                    preConfirm: async () => {
                      await handleTableItemDelete(data, i);
                    },
                    preDeny: () =>
                      Swal.fire({
                        title: "Canceled",
                        showConfirmButton: false,
                        timer: 1500,
                      }),
                  });
                };

                return (
                  <tr id="editTr" ref={(el) => (formRef2.current[i] = el)}>
                    {tableHeadList?.length > 0 &&
                      tableHeadList.map((item, index) => {
                        if (item.visible && item.purchaseShow)
                          return (
                            // item.state === "item_name"?
                            index === 0 ? (
                              <td className="text-start ps-3" colSpan={2}>
                                <Dropdown
                                  // onClick={()=>setShowStock(data=>!data)}
                                  selection
                                  onChange={(e, a) =>
                                    handleChangeTableItem(e, a, data, i)
                                  }
                                  required
                                  upward={
                                    purchaseAdd.total_items > 4 ? true : false
                                  }
                                  search={search}
                                  onKeyDown={handleKeyDown2}
                                  placeholder="SELECT"
                                  className="purchase_search_drop border-0 w-100 ps-2"
                                  name={"name"}
                                  value={data.fk_items || data.name}
                                  options={itemNameList}
                                />
                              </td>
                            ) : data.state === "unit" ? (
                              <td>
                                <select
                                  onChange={(e) =>
                                    handleChangeTableItem(e, null, data, i)
                                  }
                                  onKeyDown={handleKeyDown2}
                                  name="unit"
                                  value={data.unit}
                                  style={{
                                    WebkitAppearance: "none",
                                    fontSize: "10px",
                                    padding: "3.5px 1px",
                                  }}
                                  className="purchase_input border-0 w-100 text-center"
                                >
                                  {unitList &&
                                    unitList.map((x, i) => (
                                      <option key={i} value={x.value}>
                                        {x.text}
                                      </option>
                                    ))}
                                </select>
                              </td>
                            ) : (
                              <td>
                                <input
                                  onChange={(e) =>
                                    handleChangeTableItem(e, null, data, i)
                                  }
                                  onKeyDown={handleKeyDown2}
                                  name={item.state}
                                  className="purchase-table-items-input"
                                  value={data[item?.state]}
                                />
                              </td>
                            )
                          );
                      })}
                    {/*
                    <td>
                      <input
                        onChange={(e) =>
                          handleChangeTableItem(e, null, data, i)
                        }
                        onKeyDown={handleKeyDown2}
                        name="rate"
                        className="purchase-table-items-input"
                        value={data.rate}
                      />
                    </td>
                     <td>
                      <input
                      onKeyDown={handleKeyDown2}
                        onChange={(e) =>
                          handleChangeTableItem(e, null, data, i)
                        }
                        name="discount_1_percentage"
                        className="purchase-table-items-input"
                        value={data.discount_1_percentage}
                      />
                    </td>
                    <td>
                      <input
                        onKeyDown={handleKeyDown2}
                        onChange={(e) =>
                          handleChangeTableItem(e, null, data, i)
                        }
                        name="discount_1_amount"
                        className="purchase-table-items-input"
                        value={data.discount_1_amount}
                      />
                    </td>
                    <td>
                      <input
                        disabled
                        onChange={(e) =>
                          handleChangeTableItem(e, null, data, i)
                        }
                        name="value"
                        className="purchase-table-items-input"
                        value={data.value}
                      />
                    </td>
                    <td>
                      <input
                        onKeyDown={handleKeyDown2}
                        onChange={(e) =>
                          handleChangeTableItem(e, null, data, i)
                        }
                        name="tax_gst"
                        className="purchase-table-items-input"
                        value={data.tax_gst}
                      />
                    </td>
                    <td>
                      <input
                        disabled
                        onChange={(e) =>
                          handleChangeTableItem(e, null, data, i)
                        }
                        name="cgst_or_igst"
                        className="purchase-table-items-input"
                        value={data.cgst_or_igst}
                      />
                    </td>
                    <td>
                      <input
                        disabled
                        onChange={(e) =>
                          handleChangeTableItem(e, null, data, i)
                        }
                        name="sgst"
                        className="purchase-table-items-input"
                        value={data.sgst}
                      />
                    </td>
                    <td>
                      <input
                        disabled
                        onChange={(e) =>
                          handleChangeTableItem(e, null, data, i)
                        }
                        name="total"
                        className="purchase-table-items-input"
                        value={data.total}
                      />
                    </td>
                    <td>
                      <input
                        disabled
                        onChange={(e) =>
                          handleChangeTableItem(e, null, data, i)
                        }
                        name="cost"
                        className="purchase-table-items-input"
                        value={data.cost}
                      />
                    </td>
                    <td>
                      <input
                        onKeyDown={handleKeyDown2}
                        onChange={(e) =>
                          handleChangeTableItem(e, null, data, i)
                        }
                        name="margin"
                        className="purchase-table-items-input"
                        value={data.margin}
                      />
                    </td>
                    <td>
                      <input
                        onKeyDown={handleKeyDown2}
                        onChange={(e) =>
                          handleChangeTableItem(e, null, data, i)
                        }
                        name="sales_rate"
                        className="purchase-table-items-input"
                        value={data.sales_rate}
                      />
                    </td> */}
                    <td>
                      {data.edited ? (
                        <button
                          onKeyDown={(e) => handleKeyTableItemEdit(e, data, i)}
                          onClick={(e) => handleTableItemEdit(e, data, i)}
                          className="text-center border-0 bg-transparent"
                        >
                          <FiEdit className="mb-1 btn p-0" size={"16px"} />
                        </button>
                      ) : (
                        <div
                          onClick={() => confirmDelete()}
                          className="text-center w-100"
                        >
                          <BsTrashFill className="mb-1 btn p-0" size={"16px"} />
                        </div>
                      )}
                    </td>
                    {/* <td className="p-0">
                  </td> */}
                  </tr>
                );
              })}
            <tr className="input-tr" ref={formRef}>
              {tableHeadList?.length > 0 &&
                tableHeadList.map((item, i) => {
                  if (item.visible && item.purchaseShow)
                    return item.state === "item_name" ? (
                      <td
                        className="purchase_search_drop_td text-start ps-3"
                        colSpan={i == 0 ? 2 : 1}
                      >
                        <Dropdown
                          clearable
                          // onClick={()=>setShowStock(data=>!data)}
                          selection
                          required
                          upward={purchaseAdd.total_items > 4 ? true : false}
                          // scrolling
                          search={search}
                          placeholder="SELECT"
                          className="purchase_search_drop border-0 w-100 ps-2"
                          onKeyDown={handleKeyDown}
                          name={"name"}
                          onChange={(e, data) =>
                            handleChangeTableItem(e, data, tableItem, true)
                          }
                          value={
                            tableItem.fk_items == "" || tableItem.fk_items
                              ? tableItem.fk_items
                              : ""
                          }
                          options={itemNameList}
                        />
                      </td>
                    ) : item.state === "unit" ? (
                      <td colSpan={i == 0 ? 2 : 1}>
                        <select
                          onKeyDown={handleKeyDown}
                          name={"unit"}
                          onChange={(e) =>
                            handleChangeTableItem(e, null, tableItem, true)
                          }
                          value={
                            tableItem.unit == "" || tableItem.unit
                              ? tableItem.unit
                              : ""
                          }
                          style={{
                            WebkitAppearance: "none",
                            MozAppearance: "none",
                            fontSize: "10px",
                            padding: "3.5px 1px",
                          }}
                          className="purchase_input border-0 w-100 text-center"
                        >
                          {unitList &&
                            unitList.map((x, i) => (
                              <option key={i} value={x.value}>
                                {x.text}
                              </option>
                            ))}
                        </select>
                      </td>
                    ) : (
                      <td colSpan={i == 0 ? 2 : 1}>
                        <input
                          onKeyDown={handleKeyDown}
                          name={item.state}
                          onChange={(e) =>
                            handleChangeTableItem(e, null, tableItem, true)
                          }
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                          value={
                            tableItem[item.state] == "" ||
                            tableItem[item.state] ||
                            tableItem[item.state] == "0"
                              ? tableItem[item.state]
                              : ""
                          }
                          type="number"
                          className="purchase_input border-0 w-100 text-center"
                        />
                      </td>
                    );
                })}
              {/* <td>
                <input
                  onKeyDown={handleKeyDown}
                  name={"rate"}
                  onChange={(e) =>
                    handleChangeTableItem(e, null, tableItem, true)
                  }
                  value={
                    tableItem.rate == "" || tableItem.rate ? tableItem.rate : ""
                  }
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  type="number"
                  className="purchase_input border-0 w-100 text-center"
                />
              </td>
              <td>
                <input
                  onKeyDown={handleKeyDown}
                  name={"discount_1_percentage"}
                  onChange={(e) =>
                    handleChangeTableItem(e, null, tableItem, true)
                  }
                  value={
                    tableItem.discount_1_percentage == "" ||
                    tableItem.discount_1_percentage
                      ? tableItem.discount_1_percentage
                      : ""
                  }
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  type="number"
                  className="purchase_input border-0 w-100 text-center"
                />
              </td>
              <td>
                <input
                  onKeyDown={handleKeyDown}
                  name={"discount_1_amount"}
                  onChange={(e) =>
                    handleChangeTableItem(e, null, tableItem, true)
                  }
                  value={
                    tableItem.discount_1_amount == "" ||
                    tableItem.discount_1_amount
                      ? tableItem.discount_1_amount
                      : ""
                  }
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  type="number"
                  className="purchase_input border-0 w-100 text-center"
                />
              </td>
              <td>
                <input
                  disabled
                  onKeyDown={handleKeyDown}
                  name={"value"}
                  onChange={(e) =>
                    handleChangeTableItem(e, null, tableItem, true)
                  }
                  value={
                    tableItem.value == "" || tableItem.value
                      ? tableItem.value
                      : ""
                  }
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  type="number"
                  className="purchase_input border-0 w-100 text-center"
                />
              </td>
              <td>
                <input
                  onKeyDown={handleKeyDown}
                  name={"tax_gst"}
                  onChange={(e) =>
                    handleChangeTableItem(e, null, tableItem, true)
                  }
                  value={
                    tableItem.tax_gst == "" || tableItem.tax_gst
                      ? tableItem.tax_gst
                      : ""
                  }
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  type="number"
                  className="purchase_input border-0 w-100 text-center"
                />
              </td>
              <td>
                <input
                  disabled
                  onKeyDown={handleKeyDown}
                  name={"cgst_or_igst"}
                  onChange={(e) =>
                    handleChangeTableItem(e, null, tableItem, true)
                  }
                  value={
                    tableItem.cgst_or_igst == "" || tableItem.cgst_or_igst
                      ? tableItem.cgst_or_igst
                      : ""
                  }
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  type="number"
                  className="purchase_input border-0 w-100 text-center"
                />
              </td>
              <td>
                <input
                  disabled
                  onKeyDown={handleKeyDown}
                  name={"sgst"}
                  onChange={(e) =>
                    handleChangeTableItem(e, null, tableItem, true)
                  }
                  value={
                    tableItem.sgst == "" || tableItem.sgst ? tableItem.sgst : ""
                  }
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  type="number"
                  className="purchase_input border-0 w-100 text-center"
                />
              </td>
              <td>
                <input
                  disabled
                  onKeyDown={handleKeyDown}
                  name={"total"}
                  onChange={(e) =>
                    handleChangeTableItem(e, null, tableItem, true)
                  }
                  value={
                    tableItem.total == "" || tableItem.total
                      ? tableItem.total
                      : ""
                  }
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  type="number"
                  className="purchase_input border-0 w-100 text-center"
                />
              </td>
              <td>
                <input
                  disabled
                  onKeyDown={handleKeyDown}
                  name={"cost"}
                  onChange={(e) =>
                    handleChangeTableItem(e, null, tableItem, true)
                  }
                  value={
                    tableItem.cost == "" || tableItem.cost ? tableItem.cost : ""
                  }
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  type="number"
                  className="purchase_input border-0 w-100 text-center"
                />
              </td>
              <td>
                <input
                  onKeyDown={handleKeyDown}
                  name={"margin"}
                  onChange={(e) =>
                    handleChangeTableItem(e, null, tableItem, true)
                  }
                  value={
                    tableItem.margin == "" || tableItem.margin
                      ? tableItem.margin
                      : ""
                  }
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  type="number"
                  className="purchase_input border-0 w-100 text-center"
                />
              </td>
              <td>
                <input
                  onKeyDown={handleKeyDown}
                  name={"sales_rate"}
                  onChange={(e) =>
                    handleChangeTableItem(e, null, tableItem, true)
                  }
                  value={
                    tableItem.sales_rate == "" || tableItem.sales_rate
                      ? tableItem.sales_rate
                      : ""
                  }
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  type="number"
                  className="purchase_input border-0 w-100 text-center"
                />
              </td> */}
              <td className="align-top">
                {tableEdit ? (
                  <div
                    onClick={handleAddBatchOpen}
                    // onKeyDown={handleAddBatchOpen}
                    className="text-center"
                  >
                    <FiEdit className="mb-1 btn p-0" size={"16px"} />
                  </div>
                ) : (
                  <input
                    onKeyDown={handleAddBatchOpen}
                    onClick={handleAddBatchOpen}
                    type="button"
                    className="table-item-add-btn rounded-1 btn-sm align-middle"
                    value={"+"}
                  />
                )}
              </td>
              <td className="p-0 text-start">
                {tableEdit && (
                  <input
                    type="button"
                    onClick={() => {
                      setTableEdit(false);
                      handleResetTable();
                    }}
                    className="table-item-add-btn2 text-start"
                    value={"+"}
                  />
                )}
              </td>
            </tr>

            {<AdjustHeightOfTable />}
          </tbody>
          <tfoot>
            <tr className="purchase-table-green">
              <td className="item2 col-1">
                <div
                  className="btn bg-none outline-none text-light border-none"
                  onClick={handlePrev}
                >
                  {"<"} Previous
                </div>
              </td>
              <td className="item3 px-3 col-1">
                <div
                  className="btn bg-none outline-none text-light border-none"
                  onClick={handleNext}
                >
                  Next {">"}
                </div>
              </td>
              {tableHeadList?.length > 0 &&
                tableHeadList.map((item, i) => {
                  if (i > 0 && item.purchaseShow)
                    return item.state === "discount_1_amount" &&
                      item.visible ? (
                      <td className="item">
                        <div className="purch-green-table-item">
                          {purchaseAdd.total_disc || 0}
                        </div>
                      </td>
                    ) : item.state === "value" && item.visible ? (
                      <td className="item">
                        <div className="purch-green-table-item">
                          {purchaseAdd.total_value || 0}
                        </div>
                      </td>
                    ) : item.state === "cgst_or_igst" ||
                      (item.state === "sgst" && item.visible) ? (
                      <td className="item">
                        <div className="purch-green-table-item">
                          {purchaseAdd.total_scGst || 0}
                        </div>
                      </td>
                    ) : item.state === "total" && item.visible ? (
                      <td className="item">
                        <div className="purch-green-table-item">
                          {purchaseAdd.total_total || 0}
                        </div>
                      </td>
                    ) : (
                      item.visible && <td>{/* {item.state} */}</td>
                    );
                })}
              {/* <td></td>
              <td></td>
              <td className="item">
                <div className="purch-green-table-item">
                  {purchaseAdd.total_disc || 0}%
                </div>
              </td>
              <td className="item">
                <div className="purch-green-table-item">
                  {purchaseAdd.total_value || 0}
                </div>
              </td>
              <td></td>
              <td className="item">
                <div className="purch-green-table-item">
                  {purchaseAdd.total_scGst || 0}
                </div>
              </td>
              <td className="item">
                <div className="purch-green-table-item">
                  {purchaseAdd.total_scGst || 0}
                </div>
              </td>
              <td className="item">
                <div className="purch-green-table-item">
                  {purchaseAdd.total_total || 0}
                </div>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td> */}
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="purchase-detail-container px-3 py-0 mx-2 mt-1">
        <div className="col-3 col-4 row mx-0">
          <div className="col-5 text-end">Total Item :</div>
          <div className="col-7">{purchaseAdd.total_items || 0}</div>
        </div>
        <div className="col-3 col-4 row mx-0">
          <div className="col-5 text-end">Item :</div>
          <div className="col-7">{purchaseAdd.total_qty || 0}</div>
          <div className="col-5 text-end">HSN :</div>
          <div className="col-7">323</div>
        </div>
        <div className="col-2 row mx-0">
          <div className="col-5 text-end">CTC :</div>
          <div className="col-7">{purchaseAdd.total_CTC || 0}</div>
        </div>
        <div className="col-2 row mx-0">
          <div className="col-5 text-end">Godown :</div>
          <div className="col-7"></div>
        </div>
        <div className="col-1">M : {purchaseAdd.total_margin || 0}%</div>
      </div>
    </>
  );
};

export default PurchaseTable;

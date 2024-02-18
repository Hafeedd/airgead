import React, { useEffect, useState } from "react";
import useItemServices from "../../../../services/master/itemServices";
import { Dropdown } from "semantic-ui-react";
import { BsTrashFill } from "react-icons/bs";
import Swal from "sweetalert2";
import useOnKey from "../../../../hooks/onKeyFunct/onKeyFunct";
import { useLocation, useNavigate } from "react-router";
// import usePurchaseServices from "../../../../services/transactions/purchcaseServices";
// import usePurchaseReturnServices from "../../../../services/transactions/purchaseReturn";

const PurchaseTable = (props) => {
  const {
    returnPage,
    purchaseInvoiceRef,
    tableItemRef,
    setTableItemRef,
    setTableItemKeys,
    tableItemKeys,
    handleGetCode,
    handleSetEdit,
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
    setEdit,
    handleBatchSubmit,
    itemNameList,
    setItemNameList,
    purchaseList,
    handleTableItemReset,
    getData,
    handlePurchaseAllReset,
    setShowBatch,
  } = props;
  const [tableHeight, setTableHeight] = useState();
  const [unitList, setUnitList] = useState();
  const [tableItemListRef, setTableItemListRef] = useState(null);

  const { getItemNameList, getProperty } = useItemServices();
  // const { deletePurchaseItem, putPurchaseItem, putPurchase } =
  //   usePurchaseServices();
  // const { deletePurchaseReturnItem, putPurchaseReturnItem } =
  //   usePurchaseReturnServices();
  const [handleKeyDown, formRef] = useOnKey(
    tableItemRef,
    setTableItemRef,
    purchaseInvoiceRef,
    "repeat"
  );
  const [handleKeyDown2, formRef2] = useOnKey(
    tableItemListRef,
    setTableItemListRef,
    tableItemRef,
    false,
    tableItemList
  );

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {}, [purchaseAdd.total]);

  useEffect(() => {
    getTableData();

    if (location?.state?.fromItemAdd) {
      let item = location.state.item;
      const { purchase_rate, discount_1_percentage, tax_gst, fk_unit } =
        item || {};
      let tempItem = { ...tableItem };
      tempItem = {
        ...tempItem,
        fk_items: item?.id,
        rate: purchase_rate || 0,
        discount_1_percentage: discount_1_percentage || 0,
        tax_gst: tax_gst || 0,
        fk_units: fk_unit,
        // quantity: itemData ? 1 : 0,
        item_name: item?.name,
        cgst_or_igst: item?.tax_gst / 2 || 0,
        sgst: item?.tax_gst / 2 || 0,
        code: item?.description,
        margin: item?.margin,
        sales_rate: item?.retail_rate,
      };
      setTableItem({ ...tempItem });
      navigate(null, { state: null });

      document
        .getElementById("tableItemFkItem")
        ?.querySelector("input")
        ?.focus();
    }
  }, []);

  useEffect(() => {
    const tempList = [...tableItemList];
    const editedList = tempList.filter((x) => x.edited);
    if (editedList.length < 1) setTableItemEdited(false);
  }, [tableItemList, setTableItemEdited]);

  const handleKeyTableItemEdit = async (e, data, i) => {
    if (e.key === "Enter" && !e.ctrlKey) {
      e.preventDefault();
      handleTableItemEdit(e, data, i);
    } else handleKeyDown2(e);
  };

  const handleTableItemEdit = async (e, data, i) => {
    e.preventDefault();
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
      let tempList = [...tableItemList];
      let { edited, ...others } = data;
      tempList.splice(i, 1, others);
      setTableItemList([...tempList]);
      handlePurchAllCalc(tempList, false, false, true);
    } catch (err) {}
  };

  const getTableData = async () => {
    const minFunct = (data) => {
      let list = [];
      data.forEach((x) => {
        if (x.property_type === "unit") {
          list.push({ value: x["id"], text: x["property_value"] });
        }
      });
      setUnitList(list);
    };

    const handleDataNameList = (data) => {
      let tempList = [];
      data?.forEach((x) => {
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

  const handleItemNameSelection = (e, { value }) => {
    let data = value?.toUpperCase();
    if (data) {
      navigate("/add", {
        state: { fromPurchase: true, name: data },
      });
    }
  };

  // handle table item changing-----------------------------------

  const handleChangeTableItem = (e, data, state, toTableItem) => {
    // toTableItem is used to check if the state to be set to tableItem or tableItemList
    // if toTableItem is not true then it contains the index of tableItemList
    let tempItem = { ...state };
    if (data) {
      let itemData = data.options.filter((x) => x?.value === data?.value)[0];

      const { purchase_rate, discount_1_percentage, tax_gst, fk_unit } =
        itemData || {};
      tempItem = {
        ...tempItem,
        rate: purchase_rate || 0,
        discount_1_percentage: discount_1_percentage || 0,
        tax_gst: tax_gst || 0,
        fk_units: fk_unit,
        // quantity: itemData ? 1 : 0,
        item_name: itemData?.text,
        code: itemData?.description,
        fk_items: itemData?.value,
        unit: itemData?.unit,
        margin: itemData?.margin,
        sales_rate: itemData?.retail_rate,
      };
    }
    if (e.target.value === "") {
      tempItem = { ...tempItem, [e.target.name]: "" };
    } else if (e.target.type === "number") {
      tempItem = { ...tempItem, [e.target.name]: parseFloat(+e.target.value) };
    } else {
      tempItem = { ...tempItem, [e.target.name]: e.target.value };
    }
    // let calculatedData = tempItem
    // if(!data)
    let calculatedData = handleAmountCalculation(tempItem, e, state);
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
        value: tempItem.quantity * tempItem.rate,
        total: total,
        cost: cost,
      };
      tempItem = { ...tempItem, ...value };
      if (name !== "discount_1_amount" && tempItem.discount_1_percentage) {
        value = {
          ...value,
          discount_1_amount:
            value.value -
            (value.value -
              tempItem.discount_1_percentage * (value.value / 100)),
          discount_1_amount_per_item:
            tempItem.rate -
            (tempItem.rate -
              tempItem.discount_1_percentage * (tempItem.rate / 100)),
        };
      } else if (name !== "discount_1_amount") {
        value = {
          ...value,
          discount_1_amount: 0,
          discount_1_amount_per_item: 0,
        };
      }
      if (name === "discount_1_amount" && tempItem.discount_1_amount) {
        value = {
          ...value,
          discount_1_percentage:
            (tempItem.discount_1_amount / value.value) * 100,
        };
      } else if (name === "discount_1_amount") {
        value = { ...value, discount_1_percentage: 0 };
      }
      tempItem = { ...tempItem, ...value };
      if (tempItem.value && tempItem.discount_1_amount) {
        tempItem.discount_1_amount = parseFloat(tempItem.discount_1_amount);
        value = {
          ...tempItem,
          value:
            parseFloat(tempItem.quantity * tempItem.rate) -
            parseFloat(tempItem.discount_1_amount),
          total:
            parseFloat(tempItem.quantity * tempItem.rate) -
            parseFloat(tempItem.discount_1_amount),
          cost:
            parseFloat(tempItem.rate) - parseFloat(tempItem.discount_1_amount),
        };
      } else if (name !== "margin" && name !== "sales_rate") {
        value = {
          ...value,
          value: tempItem.quantity * tempItem.rate,
          total: tempItem.quantity * tempItem.rate,
          cost: tempItem.rate,
        };
      }
      tempItem = { ...tempItem, ...value };

      if (tempItem.tax_gst) {
        let totalTaxAmnt = +tempItem.tax_gst * (+tempItem.value / 100);
        let sgst = (totalTaxAmnt / 2)?.toFixed(2);
        value = {
          ...value,
          total: +tempItem.value + sgst * 2,
          cost:
            +tempItem.rate -
            +tempItem.discount_1_amount_per_item +
            +tempItem.tax_gst *
              ((+tempItem.rate - +tempItem.discount_1_amount_per_item) / 100),
          cgst_or_igst: sgst,
          sgst: sgst,
        };
      } else {
        value = { ...value, cgst_or_igst: 0, sgst: 0 };
      }

      tempItem = { ...tempItem, ...value };
      if (name !== "sales_rate") {
        if (tempItem.margin) {
          value = {
            ...tempItem,
            sales_rate:
              +state.cost?.toFixed(2) +
              +state.cost?.toFixed(2) * (+tempItem.margin / 100),
          };
        } else {
          value = { ...value, sales_rate: 0 };
        }
      }
      tempItem = { ...tempItem, ...value };
      if (name !== "margin") {
        if (tempItem.sales_rate) {
          value = {
            ...value,
            margin: parseFloat(
              ((tempItem.sales_rate - value.cost) / tempItem.cost) * 100
            ),
          };
        } else {
          value = { ...value, margin: 0 };
        }
      }
    } else {
      tempItem = {
        ...tempItem,
        value: 0,
        sgst: 0,
        cgst_or_igst: 0,
        total: 0,
        cost: 0,
      };
    }
    tempItem = { ...tempItem, ...value };
    let tempItemKeys = Object.keys(tempItem);
    tempItemKeys?.forEach((key) => {
      let number = parseFloat(tempItem[key]);
      if (number?.toFixed(2) && !Number.isInteger(number) && number) {
        tempItem = { ...tempItem, [key]: parseFloat(number?.toFixed(2)) };
      }
    });

    return tempItem;
  };

  // -----------------------------------------------------

  const handleAddOpenBatch = (e) => {
    e.preventDefault();
    if (e.type === "keydown") {
      if (e?.key !== "Enter") return 0;
    }
    if (
      !tableEdit &&
      (!tableItem.item_name || !tableItem.quantity || !tableItem.rate)
    ) {
      handleKeyDown(e);
      Swal.fire({
        title: "please enter Essential details firs",
        text: "Enter Rate , Quantity and Select Item First",
        icon: "warning",
        showConfirmButton: false,
        timer: 1500,
      });
      return 0;
    }

    let tempList = [...tableItemList];
    tempList.push({ ...tableItem });
    setTableItemList([...tempList]);
    handlePurchAllCalc([...tempList]);
    if (purchaseAdd.isBatch) setShowBatch(true);
    else {
      handleTableItemReset();
      handleKeyDown(e);
    }
  };

  const handlePrev = () => {
    if (purchaseList?.length > 0) {
      if (!edit) {
        handlePurchaseAllReset();
        setEdit({ ...purchaseList[0] });
        handleSetEdit(purchaseList[0]);
      } else {
        let ind = purchaseList?.findIndex((x) => edit.id === x.id);
        if (ind !== purchaseList?.length - 1) {
          handlePurchaseAllReset();
          setEdit({ ...purchaseList[ind + 1] });
          handleSetEdit(purchaseList[ind + 1]);
        } else {
          Swal.fire("No more purchase to edit", "go for next", "warning");
        }
      }
    } else {
      Swal.fire("No more purchase to edit", "go for next", "warning");
    }
  };

  const handleNext = () => {
    if (purchaseList?.length > 0)
      if (!edit) {
        Swal.fire("No more purchase to edit", "go for prev", "warning");
      } else if (edit?.id === purchaseList[0]?.id) {
        handlePurchaseAllReset();
        handleGetCode(true);
      } else {
        handlePurchaseAllReset();
        let ind = purchaseList?.findIndex((x) => edit.id === x.id);
        if (ind !== purchaseList[0]) {
          setEdit(purchaseList[ind - 1]);
          handleSetEdit(purchaseList[ind - 1]);
        } else {
          handlePurchaseAllReset();
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
    let tempList = [...tableItemList];
    tempList.splice(i, 1);
    setTableItemList([...tempList]);
    handlePurchAllCalc(tempList, false);
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
        <table
          className="table table-secondary purchase-table mb-0"
        >
          <thead className="purchase-table-header">
            <tr>
              <th width="30">SL</th>
              {tableHeadList?.length > 0 &&
                tableHeadList.map((item, i) => {
                  if (item.visible && item.purchaseShow)
                    return i === 0 ? (
                      <th width="200" className="text-start" colSpan={1}>
                        {item.title}
                      </th>
                    ) : (
                      <th>{item.title}</th>
                    );
                  else return null;
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
                  <tr
                    id="purchSaletableBodyTr"
                    ref={(el) => (formRef2.current[i] = el)}
                  >
                    <td>{i + 1}</td>
                    {tableHeadList?.length > 0 &&
                      tableHeadList.map((item, index) => {
                        if (item.visible && item.purchaseShow)
                          return (
                            index === 0 ? (
                              <td className="text-start ps-3 pe-2" colSpan={1}>
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
                                  onKeyDown={(e) => {
                                    handleKeyDown2(e);
                                  }}
                                  placeholder="SELECT"
                                  className="purchase_search_drop border-0 w-100 ps-2"
                                  name={"name"}
                                  value={data.fk_items || data.name}
                                  options={itemNameList}
                                />
                              </td>
                            ) : item.state === "unit" ? (
                              <td>
                                <select
                                  onChange={(e) =>
                                    handleChangeTableItem(e, null, data, i)
                                  }
                                  onKeyDown={(e) => {
                                    handleKeyDown2(e);
                                  }}
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
                                  onKeyDown={(e) => {
                                    handleKeyDown2(e);
                                  }}
                                  name={item.state}
                                  type="number"
                                  disabled={item.readOnly}
                                  placeholder="0"
                                  className="purchase-table-items-input"
                                  value={data[item?.state] || ""}
                                />
                              </td>
                            )
                          );
                        else return null;
                      })}
                    <td>
                      <div
                        onClick={() => confirmDelete()}
                        className="text-center w-100"
                      >
                        <BsTrashFill className="mb-1 btn p-0" size={"16px"} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            <tr className="input-tr" ref={formRef}>
              <td></td>
              {tableHeadList?.length > 0 &&
                tableHeadList.map((item, i) => {
                  if (item.visible && item.purchaseShow)
                    return item.state === "item_name" ? (
                      <td
                        className="purchase_search_drop_td text-start ps-3 pe-2"
                        colSpan={1}
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
                          allowAdditions
                          id="tableItemFkItem"
                          onAddItem={handleItemNameSelection}
                          name={"name"}
                          onChange={(e, data) =>
                            handleChangeTableItem(e, data, tableItem, true)
                          }
                          value={
                            tableItem.fk_items === "" || tableItem.fk_items
                              ? tableItem.fk_items
                              : ""
                          }
                          options={itemNameList}
                        />
                      </td>
                    ) : item.state === "unit" ? (
                      <td colSpan={1}>
                        <select
                          onKeyDown={handleKeyDown}
                          name={"unit"}
                          onChange={(e) =>
                            handleChangeTableItem(e, null, tableItem, true)
                          }
                          value={
                            tableItem.unit === "" || tableItem.unit
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
                      <td colSpan={1}>
                        <input
                          onKeyDown={handleKeyDown}
                          name={item.state}
                          onChange={(e) =>
                            handleChangeTableItem(e, null, tableItem, true)
                          }
                          disabled={item.readOnly}
                          value={
                            tableItem[item.state] === "" ||
                            tableItem[item.state] ||
                            tableItem[item.state] === 0
                              ? tableItem[item.state]
                              : ""
                          }
                          type="number"
                          className="purchase_input border-0 w-100 text-center"
                        />
                      </td>
                    );
                  else return null;
                })}
              <td className="align-top">
                <input
                  onKeyDown={handleAddOpenBatch}
                  onClick={handleAddOpenBatch}
                  type="button"
                  className="table-item-add-btn rounded-1 btn-sm align-middle"
                  value={"+"}
                />
              </td>
            </tr>

            {<AdjustHeightOfTable />}
          </tbody>
          <tfoot>
            <tr className="purchase-table-green">
              <td colSpan={2} className="col-2 text-start">
                <div className="d-flex justify-items-start">
                  <div
                    style={{ background: "#4A00A8" }}
                    className="btn bg-none outline-none text-light border-none"
                    onClick={handlePrev}
                  >
                    {"<"} Previous
                  </div>
                  <div
                    style={{ background: "#707070" }}
                    className="btn bg-none outline-none text-light border-none"
                    onClick={handleNext}
                  >
                    Next {">"}
                  </div>
                </div>
              </td>
              {tableHeadList?.length > 0 &&
                tableHeadList.map((item, i) => {
                  if (i > 0 && item.purchaseShow)
                    return item.state === "discount_1_amount" &&
                      item.visible ? (
                      <td className="item">
                        <div className="purch-green-table-item">
                          {purchaseAdd.total_disc?.toFixed(2) || 0}
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
                      item.visible && <td></td>
                    );
                  else return null;
                })}
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

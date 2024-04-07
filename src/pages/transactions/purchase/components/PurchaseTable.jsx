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
    from,
    permissions,
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
  } = props;
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
        unit: fk_unit,
        // quantity: itemData ? 1 : 0,
        item_name: item?.name,
        cgst_or_igst: item?.tax_gst / 2 || 0,
        sgst: item?.tax_gst / 2 || 0,
        code: item?.description,
        margin: item?.margin,
        sales_rate: item?.retail_rate,
      };
      setTableItem((data)=>({...data,...tempItem}));
      navigate(null, { state: null });
      document
        .getElementById("tableItemFkItem")
        ?.parentNode?.nextSibling?.firstChild?.focus();
    }
  }, [location.pathname]);

  useEffect(() => {
    if (tableItemList?.length > 10)
      document
        .getElementById("tableItemFkItem")
        .scrollIntoView({ behavior: "smooth" });
  }, [tableItemList]);

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
        const {discount_1_percentage,tax_gst,purchase_rate,retail_rate,margin} = x
        tempList.push({
          ...{discount_1_percentage,tax_gst,purchase_rate,retail_rate,margin},
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
    // Swal.fire()
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
        console.log(itemData)
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
        fk_unit: itemData?.unit,
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
    let name = e.target.name
    if(data) name = data.name
    let calculatedData = handleAmountCalculation(tempItem, name, state);
    if (toTableItem === true) setTableItem(calculatedData);
    else {
      let tempList = [...tableItemList];
      tempList.splice(toTableItem, 1, { ...calculatedData });
      setTableItemList([...tempList]);
      handlePurchAllCalc([...tempList], false, false);
    }
  };

  //  calculating table item values

  const handleAmountCalculation = (tempItem, name, state) => {
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
        };
      } else if (name !== "discount_1_amount") {
        value = {
          ...value,
          discount_1_amount: 0,
        };
      }

      tempItem = { ...tempItem, ...value };
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
        let total = parseFloat(tempItem.quantity * tempItem.rate) -
        parseFloat(tempItem.discount_1_amount),
        value = {
          ...tempItem,
          value:
            parseFloat(tempItem.quantity * tempItem.rate) -
            parseFloat(tempItem.discount_1_amount),
          total:
            total,
          cost: total/tempItem.quantity||1
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
        let isVat = tableHeadList?.filter((x) => x.state == "vat")[0]
          ?.visible;
          let total = +tempItem.value + sgst * 2
        value = {
          ...value,
          total: total,
          cost:total/tempItem.quantity||1
        };
        
        if (isVat) {
          value = {
            ...value,
            vat_perc: sgst * 2,
          };
        } else {
          value = {
            ...value,
            cgst_or_igst: sgst,
            sgst: sgst,
          };
        }
      } else {
        value = { ...value, cgst_or_igst: 0, sgst: 0, vat_perc: 0 };
      }

      tempItem = { ...tempItem, ...value };
      if (name !== "sales_rate" && name !== "name") {
        if (tempItem.margin>0 && tempItem.cost>0) {
          value = {
            ...tempItem,
            sales_rate:
              +tempItem.cost?.toFixed(2) +
              +tempItem.cost?.toFixed(2) * (+tempItem.margin / 100),
          };
        } else{
          value = { ...value, sales_rate: 0 };
        }
      }
      tempItem = { ...tempItem, ...value };
      if (name !== "margin" && name !== "name") {
        if (tempItem.sales_rate>0 && tempItem.cost>0) {
          value = {
            ...value,
            margin: parseFloat(
              ((tempItem.sales_rate - tempItem.cost) / tempItem.cost) * 100
            ),
          };
        } else if(name == "sales_rate"){
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
        sales_rate:0,
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
    if (purchaseOrReturnList?.length > 0) {
      if (!edit) {
        handlePurchaseAllReset(true);
        setEdit({ ...purchaseOrReturnList[0] });
        handleSetEdit(purchaseOrReturnList[0]);
      } else {
        let ind = purchaseOrReturnList?.findIndex((x) => edit.id === x.id);
        if (ind !== purchaseOrReturnList?.length - 1) {
          handlePurchaseAllReset(true);
          setEdit({ ...purchaseOrReturnList[ind + 1] });
          handleSetEdit(purchaseOrReturnList[ind + 1]);
        } else {
          Swal.fire("No more purchase to edit", "go for next", "warning");
        }
      }
    } else {
      Swal.fire("No more purchase to edit", "go for next", "warning");
    }
  };

  const handleNext = () => {
    if (purchaseOrReturnList?.length > 0)
      if (!edit) {
        Swal.fire("No more purchase to edit", "go for prev", "warning");
      } else if (edit?.id === purchaseOrReturnList[0]?.id) {
        handlePurchaseAllReset(true);
        handleGetCode(true);
      } else {
        handlePurchaseAllReset(true);
        let ind = purchaseOrReturnList?.findIndex((x) => edit.id === x.id);
        if (ind !== purchaseOrReturnList[0]) {
          setEdit(purchaseOrReturnList[ind - 1]);
          handleSetEdit(purchaseOrReturnList[ind - 1]);
        } else {
          handlePurchaseAllReset(true);
          Swal.fire("No more purchase to edit", "go for prev", "warning");
        }
      }
  };

  const AdjustHeightOfTable = () => {
    let tableTr = [];
    tableTr.push(
      <tr key={0}>
        <td className="border-0" colSpan={tableHeadList.length + 2}></td>
      </tr>
    );
    for (let i = 0; i < 8 - purchaseAdd.total_items || 0; i++) {
      tableTr.push(
        <tr key={i+1}>
          <td className="border-0" colSpan={tableHeadList.length + 2}></td>
        </tr>
      );
    }
    return tableTr;
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
        <table className="table table-secondary purchase-table mb-0">
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
                  className="btn purchase-add-btn my-0 py-0"
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
                          return index === 0 ? (
                            <td className="text-start ps-3 pe-2" colSpan={1}>
                              <Dropdown
                                // onClick={()=>setShowStock(data=>!data)}
                                selection
                                onChange={(e, a) =>
                                  handleChangeTableItem(e, a, data, i)
                                }
                                upward={
                                  purchaseAdd.total_items > 4 ? true : false
                                }
                                search={search}
                                onKeyDown={handleKeyDown2}
                                disabled={((from==='purch'&&!permissions.includes(1170))||(from==="purch Order"&&!permissions.includes(1246))||(from==="purch Return"&&!permissions.includes(1208)) )|| item.readOnly }
                                placeholder="SELECT"
                                className="purchase_search_drop border-0 w-100 ps-2"
                                name={"name"}
                                value={data.fk_items || data.name}
                                options={itemNameList}
                              />
                            </td>
                          ) : item.state === "fk_unit" ? (
                            <td>
                              <select
                                onChange={(e) =>
                                  handleChangeTableItem(e, null, data, i)
                                }
                                onKeyDown={handleKeyDown2}
                                name="fk_unit"
                                value={data.fk_unit}
                                disabled={((from==='purch'&&!permissions.includes(1170))||(from==="purch Order"&&!permissions.includes(1246))||(from==="purch Return"&&!permissions.includes(1208)) )|| item.readOnly }
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
                          ) :item.state === 'expiry_date'?
                          (
                            <td colSpan={1}>
                              <input
                              onFocus={(e)=>console.log(e)}
                              onKeyDown={handleKeyDown}
                              name={item.state}
                              onChange={(e)=>handleChangeTableItem(e,null,tableItem,i)}
                              disabled={((from==='purch'&&!permissions.includes(1170))||(from==="purch Order"&&!permissions.includes(1246))||(from==="purch Return"&&!permissions.includes(1208)) )|| item.readOnly }
                              value={data[item.state]||''}
                              type="date"
                              className="purchase_input border-0 w-100 text-center"
                              />
                            </td>
                          ):                          
                          (
                            <td>
                              <input
                                onChange={(e) =>
                                  handleChangeTableItem(e, null, data, i)
                                }
                                onKeyDown={handleKeyDown2}
                                name={
                                  item.state == "vat" ? "tax_gst" : item.state
                                }
                                type="number"
                                disabled={((from==='purch'&&!permissions.includes(1170))||(from==="purch Order"&&!permissions.includes(1246))||(from==="purch Return"&&!permissions.includes(1208)) )|| item.readOnly }
                                placeholder="0"
                                className="purchase-table-items-input"
                                value={
                                  item.state === "vat"
                                    ? data.tax_gst || ""
                                    : data[item?.state] || ""
                                }
                              />
                            </td>
                          );
                        else return null;
                      })}
                    <td>
                      <div
                        onClick={() => confirmDelete()}
                        className="text-center w-100"
                      >
                       {(from==="purch"&&!permissions.includes(1171))||(from==="purch Return"&&!permissions.includes(1247))&&<BsTrashFill className="mb-1 btn p-0" size={"16px"} />}
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
                    ) : item.state === "fk_unit" ? (
                      <td colSpan={1}>
                        <select 
                          onKeyDown={handleKeyDown}
                          name={"fk_unit"}
                          onChange={(e) =>
                            handleChangeTableItem(e, null, tableItem, true)
                          }
                          value={
                            tableItem.fk_unit === "" || tableItem.fk_unit
                              ? tableItem.fk_unit
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
                    ) :item.state === 'expiry_date'?
                    (
                      <td colSpan={1}>
                        <input
                        // onFocus={(e)=>console.log(e.target)}
                        onKeyDown={handleKeyDown}
                        name={item.state}
                        onChange={(e)=>handleChangeTableItem(e,null,tableItem,true)}
                        disabled={item.readOnly}
                        value={tableItem[item.state]||''}
                        type="date"
                        className="purchase_input border-0 w-100 text-center"
                        />
                      </td>
                    ):
                     (
                      <td colSpan={1}>
                        <input
                          onKeyDown={handleKeyDown}
                          name={item.state == "vat" ? "tax_gst" : item.state}
                          onChange={(e) =>
                            handleChangeTableItem(e, null, tableItem, true)
                          }
                          disabled={item.readOnly}
                          value={                            
                            tableItem[item.state === 'vat'?'tax_gst':item.state] === "" ||
                            tableItem[item.state === 'vat'?'tax_gst':item.state] ||
                            tableItem[item.state === 'vat'?'tax_gst':item.state] === 0
                              ? tableItem[item.state === 'vat'?'tax_gst':item.state]
                              : "0"
                          }
                          type="number"
                          className="purchase_input border-0 w-100 text-center"
                        />
                      </td>
                    );
                  else return null;
                })}
              <td className="align-top">
              {!permissions.includes(1169)&&<input
                  onKeyDown={handleAddOpenBatch}
                  onClick={handleAddOpenBatch}
                  type="button"
                  className="table-item-add-btn rounded-1 btn-sm align-middle"
                  value={"+"}
                />}
              </td>
            </tr>

            {<AdjustHeightOfTable />}
          </tbody>
          <tfoot>
            <tr className="purchase-table-green">
              <td colSpan={3} className="col-2 text-start">
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
                tableHeadList?.map((item, i) => {
                  if (i > 1 && item.purchaseShow)
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
                      (item.state === "sgst"|| item.state === "vat_perc" && item.visible) ? (
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

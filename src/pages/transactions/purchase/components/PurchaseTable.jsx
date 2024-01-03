import React, { useCallback, useEffect, useState } from "react";
import PurchaseTableItemList from "./PurchaseTableItemList";
import useItemServices from "../../../../services/master/itemServices";
import { Dropdown } from "semantic-ui-react";
import { FiEdit } from "react-icons/fi";
import { BsTrashFill } from "react-icons/bs";
import Swal from "sweetalert2";
import usePurchaseServices from "../../../../services/transactions/purchcaseServices";
import useOnKey from "../../../../hooks/onKeyFunct/onKeyFunct";

const PurchaseTable = (props) => {
  const {
    setPurchaseItemModal,
    tableItem,
    handleChangeTableItem,
    setTableItem,
    edit,
    setPurchaseItemSerielModal,
    cstm_id,
    purchaseAdd,
    setCstm_id,
    tableItemList,
    setTableItemList,
    tableItemBatchList,
    setTableItemBatchList,
    tableEdit,
    setTableEdit,
    setEdit,
    handleBatchSubmit,
    itemNameList,
    setItemNameList,
    setShowStock,
    purchaseList,
    setPurchaseList,
    getData,
    handlePurchaseAllReset,
    handleResetTable,
    showBatch,
    setShowBatch,
  } = props;

  const [ref, setRef] = useState();
  // const [itemNameList, setItemNameList] = useState([])
  const [unitList, setUnitList] = useState();

  useEffect(() => {
    getTableData();
  }, []);

  const { handleKeyDown, formRef } = useOnKey(ref, setRef);

  const { getItemNameList, getProperty } = useItemServices();

  const { deletePurchaseItem } = usePurchaseServices();

  const handleTableItemEdit = (data) => {
    let { batches, ...others } = data;
    if (data?.batches) {
      setTableItemBatchList([...data?.batches]);
    }
    setTableItem(others);
    setTableEdit(data.id);
  };

  // const setItemNameListState = (data) => {
  //     let tempList = []
  //     data.map(item=>{
  //         item['value'] = item.id
  //         delete item.id
  //         item['text'] = item.name
  //         delete item.name
  //         tempList.push(item)
  //     })
  //     setItemNameList(tempList)
  // }

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
    else handleBatchSubmit(itemTempList);
  };

  const handlePrev = () => {
    if (purchaseList?.length > 0) {
      if (!edit) {
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
            style={{ height: "1.8rem", display: "" }}
            colSpan={17}
          ></td>
        </tr>
      );
    }
    return a;
  };

  const confirmDelete = async (data) => {
    Swal.fire({
      title: "Delete Item",
      text: "Do you want to delete Item ?",
      showDenyButton: true,
      showCancelButton: false,
      denyButtonText: "Cancel",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        await handleTableItemDelete(data);
      },
      preDeny: () =>
        Swal.fire({
          title: "Canceled",
          showConfirmButton: false,
          timer: 1500,
        }),
    });
  };

  const handleTableItemDelete = async (data) => {
    if (!data.created_at) {
      let tempList = [...tableItemList];
      let listAfterItemRem = [];

      let index = tempList.findIndex((x) => {
        return x.id == data.id;
      });

      if (index > -1) {
        tempList.splice(index, 1);
        listAfterItemRem = [...tempList];
      }
      setTableItemList([...listAfterItemRem]);
    }
    try {
      let response = await deletePurchaseItem(data.id);
      if (response.success && data.created_at) {
        Swal.fire({
          title: "Item deleted successfully",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        const data = await getData();
        data?.map((purchData) => {
          if (purchData?.id === edit?.id) {
            setEdit(purchData);
          }
        });
      } else if (response.success && !data.created_at) {
        Swal.fire({
          title: "Item deleted successfully",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire(response.message, "", "error");
      }
    } catch (err) {
      console.log(err);
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
              <th className="text-start" colSpan={2}>
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
              <th>S.Rate</th>
              <th className="py-1 text-end">
                <div
                  className="btn btn-primary purchase-add-btn my-0 py-0"
                  onClick={() => setPurchaseItemModal(true)}
                >
                  +
                </div>
              </th>
              <th className="py-1 text-end"></th>
            </tr>
          </thead>
          <tbody className="purchase-table-body" ref={formRef}>
            {tableItemList?.length > 0 &&
              tableItemList.map((data) => (
                <tr>
                  <td className="text-start ps-3" colSpan={2}>
                    <select
                      style={{
                        WebkitAppearance: "none",
                        MozAppearance: "none",
                        fontSize: "10px",
                        padding: "3.5px 1px",
                      }}
                      disabled
                      value={data.fk_items}
                      className="purchase_input border-0 w-100"
                    >
                      <option value={null}>Select</option>
                      {itemNameList?.length > 0 &&
                        itemNameList.map((item, index) => (
                          <option key={index} value={item.value}>
                            {item.text}
                          </option>
                        ))}
                    </select>
                  </td>
                  <td>{data.quantity}</td>
                  <td>
                    <select
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
                  <td>{data.rate}</td>
                  <td>{data.discount_1_percentage}%</td>
                  <td>{data.discount_1_amount}</td>
                  <td>{data.value}</td>
                  <td>{data.tax_gst}%</td>
                  <td>{data.cgst_or_igst}</td>
                  <td>{data.sgst}</td>
                  <td>{data.total}</td>
                  <td>{data.cost}</td>
                  <td>{data.margin}</td>
                  <td>{data.sales_rate}</td>
                  <td>
                    <div
                      onClick={() => handleTableItemEdit(data)}
                      className="text-center"
                    >
                      <FiEdit className="mb-1 btn p-0" size={"16px"} />
                    </div>
                  </td>
                  <td className="p-0">
                    <div
                      onClick={() => confirmDelete(data)}
                      className="text-start w-100"
                    >
                      <BsTrashFill className="mb-1 btn p-0" size={"16px"} />
                    </div>
                  </td>
                </tr>
              ))}
            <tr>
              <td
                className="purchase_search_drop_td text-start ps-3"
                colSpan={2}
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
                  onChange={handleChangeTableItem}
                  value={
                    tableItem.fk_items == "" || tableItem.fk_items
                      ? tableItem.fk_items
                      : ""
                  }
                  options={itemNameList}
                />
              </td>
              <td>
                <input
                  onKeyDown={handleKeyDown}
                  name={"quantity"}
                  onChange={handleChangeTableItem}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  value={
                    tableItem.quantity == "" ||
                    tableItem.quantity ||
                    tableItem.quantity == "0"
                      ? tableItem.quantity
                      : ""
                  }
                  type="number"
                  className="purchase_input border-0 w-100 text-center"
                />
              </td>
              <td>
                <select
                  onKeyDown={handleKeyDown}
                  name={"unit"}
                  onChange={handleChangeTableItem}
                  value={
                    tableItem.unit == "" || tableItem.unit ? tableItem.unit : ""
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
              <td>
                <input
                  onKeyDown={handleKeyDown}
                  name={"rate"}
                  onChange={handleChangeTableItem}
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
                  onChange={handleChangeTableItem}
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
                  onChange={handleChangeTableItem}
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
                  onChange={handleChangeTableItem}
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
                  onChange={handleChangeTableItem}
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
                  onChange={handleChangeTableItem}
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
                  onChange={handleChangeTableItem}
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
                  onChange={handleChangeTableItem}
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
                  onChange={handleChangeTableItem}
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
                  onChange={handleChangeTableItem}
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
                  onChange={handleChangeTableItem}
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
              </td>
              <td>
                {tableEdit ? (
                  <div
                    onClick={handleAddBatchOpen}
                    onKeyDown={handleAddBatchOpen}
                    className="text-center"
                  >
                    <FiEdit className="mb-1 btn p-0" size={"16px"} />
                  </div>
                ) : (
                  <button
                    onKeyDown={handleAddBatchOpen}
                    onClick={handleAddBatchOpen}
                    type="button"
                    className="table-item-add-btn"
                    value={"+"}
                  >
                    +
                  </button>
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
              <td className="item">
                <div className="purch-green-table-item">
                  {purchaseAdd.total_qty || 0}
                </div>
              </td>
              <td></td>
              <td></td>
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
              <td></td>
            </tr>
          </tbody>
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

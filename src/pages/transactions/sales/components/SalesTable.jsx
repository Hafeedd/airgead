import React, { useEffect, useState } from "react";
import { Dropdown } from "semantic-ui-react";
import useOnKey from "../../../../hooks/onKeyFunct/onKeyFunct";
import { BsTrashFill } from "react-icons/bs";
import useItemServices from "../../../../services/master/itemServices";
import Swal from "sweetalert2";

const SalesTable = (props) => {
  const {
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
  } = props;

  const [tableItemRefList, setTableItemRefList] = useState(null);
  const [unitList, setUnitList] = useState(null);
  // const [calcChange, setCalcChange] = useState();
  const [itemNameList, setItemNameList] = useState([]);

  const { getProperty, getItemNameList } = useItemServices();

  const [handleKeyDown, formRef] = useOnKey(tableItemRef, setTableItemRef);
  const [handleKeyDown2, formRef2] = useOnKey(
    tableItemRefList,
    setTableItemRefList,
    tableItemRef,
    "false",
    tableItemList
  );

  useEffect(() => {
    getTableData();
  }, []);

  useEffect(() => {
    if (tableItemList?.length > 10)
      document
        .getElementById("tableItemFkItem")
        .scrollIntoView({ behavior: "smooth" });
  }, [tableItemList]);

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
      const { id, code, name, ...others } = x;
      tempList.push({
        ...others,
        text: x.name,
        description: x.code,
        value: x.id,
      });
    });
    setItemNameList([...tempList]);
  };

  const getTableData = async () => {
    try {
      let response = await getProperty();
      let response2 = await getItemNameList();
      if (response.success) {
        minFunct(response.data);
      }
      if (response2.success) {
        handleDataNameList(response2.data);
      }
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

  const AdjustHeightOfTable = () => {
    let tempTableTr = [];
    let lengthOfTh = tableHeadList.filter(
      (x) => x.saleShow && x.visible
    ).length;
    tempTableTr.push(
      <tr className="border-0">
        <td
          className="border-0"
          colSpan={lengthOfTh + 2}
        ></td>
      </tr>
    );
    for (let i = 0; i < 7 - tableItemList.length || 0; i++) {
      tempTableTr.push(
        <tr className="border-0" key={i}>
          <td
            className="border-0"
            colSpan={lengthOfTh + 2}
          ></td>
        </tr>
      );
    }
    return tempTableTr;
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
    handleSalesAddCalc(tempList, false);
  };

  const handleAddSalesItem = async (e) => {
    e.preventDefault();
    if (e.type === "keydown") {
      if (e.key == "Enter" && e.ctrlKey) {
        handleKeyDown(e);
        return 0;
      } else if (e.key !== "Enter") {
        return 0;
      }
    }
    if (!tableItem.fk_items || !tableItem.quantity || !tableItem.rate) {
      handleKeyDown(e);
      Swal.fire({
        title: "Please Enter essential details first",
        text: "Select item , enter quantity, enter rate , enter sales rate",
        icon: "warning",
        showConfirmButton: false,
        timer: 1500,
      });
      return 0;
    }

    let tempList = [...tableItemList];
    tempList.push({ ...tableItem });
    setTableItemList([...tempList]);
    handleSalesAddCalc([...tempList]);
    handleKeyDown(e);
    handleTableItemReset();
  };

  const handleChangeTableItem = (e, data, state, totableItem) => {
    // totableItem is used to check if the state to be set to tableItem or tableItemList
    // if totableItem is not true then it contains the index of tableItemList

    let tempItem = { ...state };
    if (data?.value) {
      var item_data =
        data.options.filter((x) => x?.value === data?.value)[0] || {};
      var newObj = Object.fromEntries(
        Object.entries(item_data)?.filter(([key, value]) => value !== null)
      );
      let {
        id,
        code,
        name,
        tax_gst,
        retail_rate,
        purchase_rate,
        tax_inclusive,
        ...others
      } = newObj;
      others.cgst_or_igst = tax_gst / 2 || 0;
      others.sgst = tax_gst / 2 || 0;
      if (!retail_rate) {
        others = {};
        retail_rate = 0;
      }
      let gross = retail_rate;

      if (tax_gst && !tax_inclusive) {
        gross = retail_rate + tax_gst * (retail_rate / 100);
      }
      if (others.discount_1_percentage) {
        others.discount_1_amount =
          gross - (gross - others.discount_1_percentage * (gross / 100));
      }
      if (others.retail_rate) {
        others.value = gross;
      }
      tempItem = {
        ...tempItem,
        ...others,
        item_name: newObj?.text,
        code: newObj?.description,
        fk_items: newObj?.value,
        sales_rate: retail_rate || 0,
        rate: retail_rate || 0,
        gross: gross || 0,
        tax_gst: tax_gst || 0,
        quantity: 0,
      };
    } else if (data?.value == "") {
      handleTableItemReset();
      return 0;
    } else if (e.target.value === "") {
      tempItem = { ...tempItem, [e.target.name]: "" };
    } else if (e.target.type === "number") {
      tempItem = {
        ...tempItem,
        [e.target.name]: parseFloat(+e.target.value + 0),
      };
    } else {
      tempItem = { ...tempItem, [e.target.name]: e.target.value };
    }
    const calculatedData = handleAmountCalculation(tempItem, e, data);
    if (totableItem === true) setTableItem(calculatedData);
    else {
      let tempList = [...tableItemList];
      tempList.splice(totableItem, 1, { ...calculatedData, edited: true });
      setTableItemList([...tempList]);
    }
  };

  const handleAmountCalculation = (tempItem, e, data) => {
    let name = e.target.name;
    let value = {};
    let total, cost;

    // ---------------------------
    if (
      e.target.name !== "tax_gst" &&
      e.target.name !== "rate" &&
      e.target.name !== "discount_1_percentage" &&
      data?.name !== "name"
    ) {
      if (tempItem.gross && tempItem.tax_gst) {
        // console.log(
        //   (tempItem.gross-
        //   (tempItem.gross -
        //     (tempItem.gross -
        //       tempItem?.discount_1_percentage * (tempItem.gross / 100))))
        // );
        // console.log(

        //     tempItem.gross
        //     -
        //     (tempItem.gross -
        //       (tempItem.gross -
        //         tempItem?.discount_1_percentage * (tempItem.gross / 100)))
        //         /
        //       (1 + tempItem.tax_gst / 100)
        // );
        value = {
          ...value,
          rate:
            (tempItem.gross -
              (tempItem.gross -
                (tempItem.gross -
                  tempItem?.discount_1_percentage * (tempItem.gross / 100)))) /
            (1 + tempItem.tax_gst / 100), //  gross / (1 + tax / 100)
        };
      } else if (!tempItem.gross) {
        value = { ...value, rate: 0 };
      }
    }

    tempItem = { ...tempItem, ...value };

    // ---------------------------

    if (tempItem.rate && tempItem.quantity) {
      total = tempItem.total;
      cost = tempItem.cost;
      total = tempItem.quantity * tempItem.rate;
      cost = tempItem.rate;
      value = {
        ...value,
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
      if (tempItem.discount_1_percentage) {
        value = {
          ["discount_amnt_per_item"]:
            tempItem.discount_1_percentage * (tempItem.rate / 100),
        };
      } else {
        value = {
          ["discount_amnt_per_item"]: 0,
        };
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

      if (e.target.name !== "gross") {
        if (tempItem.tax_gst && tempItem.rate) {
          // console.log(
          //   (tempItem.rate - tempItem.discount_1_amount_per_item) *
          //     (tempItem.tax_gst / 100)
          // );
          value = {
            ...value,
            ["gross"]:
              (tempItem.rate - tempItem.discount_1_amount_per_item || 0) +
              (tempItem.rate - tempItem.discount_1_amount_per_item || 0) *
                (tempItem.tax_gst / 100),
          };
        } else {
          value = { ...value, ["gross"]: 0 };
        }
      }
      tempItem = { ...tempItem, ...value };

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
    } else {
      tempItem = {
        ...tempItem,
        value: 0,
        sgst: 0,
        cgst_or_igst: 0,
        total: 0,
        rate: 0,
        discount_1_amount: 0,
        gross: 0,
      };
    }

    let tempItemKeys = Object.keys(tempItem);
    tempItemKeys?.map((key) => {
      let number = parseFloat(tempItem[key]);
      if (number?.toFixed(2) && !Number.isInteger(number) && number) {
        tempItem = { ...tempItem, [key]: parseFloat(number?.toFixed(2)) };
      }
    });
    tempItem = { ...tempItem };
    return tempItem;
  };

  const search = (options, searchValue) => {
    searchValue = searchValue.toString().toUpperCase();
    return options.filter((option) => {
      return (
        option?.text.toString().includes(searchValue) ||
        option.description?.toString()?.includes(searchValue)
      );
    });
  };

  const handlePrev = () => {
    if (salesList?.length > 0) {
      if (!edit) {
        handleSalesAllReset();
        setEdit(salesList[0]);
        handleSetEdit(salesList[0]);
      } else {
        let ind = salesList?.findIndex((x) => edit.id == x.id);
        if (ind !== salesList?.length - 1) {
          handleSalesAllReset();
          setEdit(salesList[ind + 1]);
          handleSetEdit(salesList[ind + 1]);
        } else {
          Swal.fire("No more purchase to edit", "go for next", "warning");
        }
      }
    } else {
      Swal.fire("No more purchase to edit", "go for next", "warning");
    }
  };

  const handleNext = () => {
    if (!edit || salesList?.length < 1) {
      Swal.fire("No more purchase to edit", "go for prev", "warning");
    } else if (edit?.id == salesList[0]?.id) {
      handleSalesAllReset();
      handleSetEdit(true);
    } else {
      handleSalesAllReset();
      let ind = salesList?.findIndex((x) => edit.id == x.id);
      if (ind !== salesList[0]) {
        setEdit(salesList[ind - 1]);
        handleSetEdit(salesList[ind - 1]);
      } else {
        Swal.fire("No more purchase to edit", "go for prev", "warning");
      }
    }
  };

  return (
    <>
      <div className="mx-2 sales-table-item-container" id="TableToPrint">
        <table
          style={{ tableLayout: "fixed" }}
          className="table table-secondary purchase-table mb-0"
        >
          <thead className="purchase-table-header">
            <tr>
              <th width="30">SL</th>
              {tableHeadList?.length > 0 &&
                tableHeadList.map((item, i) => {
                  if (item.visible && item.saleShow)
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
                  className="btn btn-primary purchase-add-btn my-0"
                  onClick={() => setSalesItemModal(true)}
                >
                  +
                </div>
              </th>
              {/* <th></th> */}
            </tr>
          </thead>
          <tbody className="sales-table-body">
            {/* table Item List-----------------------------------------start */}
            {tableItemList?.length > 0 &&
              tableItemList?.map((data, i) => {
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
                    key={i}
                    ref={(el) => (formRef2.current[i] = el)}
                  >
                    <td>{i + 1}</td>
                    {tableHeadList?.length > 0 &&
                      tableHeadList.map((item, index) => {
                        if (item.visible && item.saleShow)
                          return (
                            // item.state === "item_name"?
                            index === 0 ? (
                              <td className="text-start ps-3 pe-3" colSpan={1}>
                                <Dropdown
                                  // onClick={()=>setShowStock(data=>!data)}
                                  selection
                                  onChange={(e, a) =>
                                    handleChangeTableItem(e, a, data, i)
                                  }
                                  required
                                  upward={
                                    salesAdd.total_items > 4 ? true : false
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
                            ) : item.state === "unit" ? (
                              <td>
                                <select
                                  onChange={(e) =>
                                    handleChangeTableItem(e, null, data, i)
                                  }
                                  onKeyDown={handleKeyDown2}
                                  name="fk_unit"
                                  value={data.fk_unit}
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
                                  type="number"
                                  placeholder="0"
                                  disabled={item?.readOnly}
                                  className="purchase-table-items-input"
                                  value={
                                    data[item?.state] && data[item?.state] > -1
                                      ? data[item?.state]
                                      : ""
                                  }
                                />
                              </td>
                            )
                          );
                        else return null;
                      })}
                    <td className="p-0">
                      <div
                        onClick={confirmDelete}
                        className="text-center w-100"
                      >
                        <BsTrashFill className="mb-1 btn p-0" size={"16px"} />
                      </div>
                    </td>
                  </tr>
                );
              })}

            {/* table Item List-----------------------------------------end */}

            <tr ref={formRef} className="input-tr">
              <td></td>
              {tableHeadList?.length > 0 &&
                tableHeadList.map((item, i) => {
                  if (item.visible && item.saleShow)
                    return item.state === "item_name" ? (
                      <td
                        className="purchase_search_drop_td text-start ps-3 pe-3"
                        colSpan={1}
                      >
                        <Dropdown
                          clearable
                          // onClick={()=>setShowStock(data=>!data)}
                          selection
                          required
                          upward={salesAdd.total_items > 4 ? true : false}
                          // scrolling
                          search={search}
                          placeholder="SELECT"
                          className="purchase_search_drop border-0 w-100 ps-2"
                          onKeyDown={handleKeyDown}
                          allowAdditions
                          id="tableItemFkItem"
                          // onAddItem={handleItemNameSelection}
                          name={"name"}
                          onChange={
                            (e, data) =>
                              handleChangeTableItem(e, data, tableItem, true)
                            // handleItemNameSelection(e,data)
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
                      <td colSpan={i === 0 ? 2 : 1}>
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
                    ) : (
                      <td colSpan={i === 0 ? 2 : 1}>
                        <input
                          onKeyDown={handleKeyDown}
                          name={item.state}
                          disabled={item?.readOnly}
                          onChange={(e) =>
                            handleChangeTableItem(e, null, tableItem, true)
                          }
                          onFocus={handleFocus}
                          onBlur={handleBlur}
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
              <td>
                <input
                  type="button"
                  onKeyDown={handleAddSalesItem}
                  onClick={handleAddSalesItem}
                  className="table-item-add-btn rounded-1 btn-sm"
                  value={"+"}
                />
              </td>
            </tr>
            <AdjustHeightOfTable />
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
                  if (i > 0 && item.saleShow)
                    return item.state === "discount_1_amount" &&
                      item.visible ? (
                      <td className="item">
                        <div className="purch-green-table-item">
                          {salesAdd.total_disc?.toFixed(2) || 0}
                        </div>
                      </td>
                    ) : item.state === "value" && item.visible ? (
                      <td className="item">
                        <div className="purch-green-table-item">
                          {salesAdd.total_value || 0}
                        </div>
                      </td>
                    ) : (item.state === "cgst_or_igst" ||
                        item.state === "sgst") &&
                      item.visible ? (
                      <td className="item">
                        <div className="purch-green-table-item">
                          {salesAdd.total_scGst || 0}
                        </div>
                      </td>
                    ) : item.state === "total" && item.visible ? (
                      <td className="item">
                        <div className="purch-green-table-item">
                          {salesAdd.total_total || 0}
                        </div>
                      </td>
                    ) : (
                      item.visible && <td>{/* {item.state} */}</td>
                    );
                  else return null;
                })}
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="sales-detail-container mx-2 mt-1">
        <div className="col-2 col-3 mx-0 item">
          <div className="col-4">Total Item</div>
          <div className="col-1">:</div>
          <div className="col-7">{salesAdd.total_items}</div>
        </div>
        <div className="col-1 col-2 mx-0 item">
          <div className="col-4">PR</div>
          <div className="col-1">:</div>
          <div className="col-7">{salesAdd.total_rate?.toFixed(2)}</div>
        </div>
        <div className="col-1 col-2 mx-0 item">
          <div className="col-4">CT</div>
          <div className="col-1">:</div>
          <div className="col-7">234.1</div>
        </div>
        <div className="col-1 col-2 mx-0 item">
          <div className="col-4">MIN</div>
          <div className="col-1">:</div>
          <div className="col-7">0</div>
        </div>
        <div className="col-1 col-2 mx-0 item">
          <div className="col-4">SR</div>
          <div className="col-1">:</div>
          <div className="col-7">500</div>
        </div>
        <div className="col-2 mx-0 item">
          <div className="col-4">MRP</div>
          <div className="col-1">:</div>
          <div className="col-7">600</div>
        </div>
        <div className="col-1 col-2 mx-0 item">
          <div className="col-4">IM</div>
          <div className="col-1">:</div>
          <div className="col-7">.00</div>
        </div>
      </div>
    </>
  );
};

export default SalesTable;

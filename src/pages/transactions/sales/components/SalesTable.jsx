import React, { useEffect, useState } from "react";
import { Dropdown } from "semantic-ui-react";
import useOnKey from "../../../../hooks/onKeyFunct/onKeyFunct";
import { FiEdit } from "react-icons/fi";
import { BsTrashFill } from "react-icons/bs";
import useItemServices from "../../../../services/master/itemServices";
import Swal from "sweetalert2";
import useSalesServices from "../../../../services/transactions/salesServices";

const SalesTable = (props) => {
  const {
    tableItem,
    handleSalesAddCalc,
    setSalesItemModal,
    setSalesBatchShow,
    setTableEdit,
    setTableItem,
    tableEdit,
    salesAdd,
    cstm_id,
    setCstm_id,
    edit,
    setEdit,
    handleSalesAllReset,
    tableItemList,
    salesList,
    setTableItemList,
    handleTableItemReset,
    getData,
    tableItemKeys,
    setTableItemKeys,
  } = props;

  const [ref, setRef] = useState(null);
  const [ref2, setRef2] = useState(null);
  const [unitList, setUnitList] = useState(null);
  // const [calcChange, setCalcChange] = useState();
  const [itemNameList, setItemNameList] = useState([]);

  const { getProperty, getItemNameList } = useItemServices();
  const { deleteSalesItem } = useSalesServices();
  const { postSalesItem, putSalesItem } = useSalesServices();

  const [handleKeyDown, formRef] = useOnKey(ref, setRef);
  const [handleKeyDown2, formRef2] = useOnKey(ref2, setRef2, tableItemList);

  useEffect(() => {
    getTableData();
  }, []);

  // useEffect(()=>{
  //   handleAmountCalculation(tableItem,e)
  // },[tableItem.quantity])

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
      const { id, code, name, fk_unit, ...others } = x;
      tempList.push({
        text: x.name,
        description: x.code,
        value: x.id,
        unit: x.fk_unit,
        ...others,
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
    let a = [];
    for (let i = 0; i < 8 - tableItemList.length || 0; i++) {
      a.push(
        <tr className="border-0" key={i}>
          <td
            className="border-0"
            style={{ height: "1.766rem", display: "" }}
            colSpan={18}
          ></td>
        </tr>
      );
    }
    return a;
  };

  const handleKeyTableItemEdit = async (e, data, i) => {
    if (e.key == "Enter") {
      if (e.key == "Enter" && e.ctrlKey) return 0;
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
      let response = await putSalesItem(data.id, data);
      if (response.success) {
        handleKeyDown(e);
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
      handleSalesAddCalc(tempList, false);
      // handleKeyDown2(e)
    } catch (err) {}
  };

  // const confirmDelete = async (data) => {
  //   Swal.fire({
  //     title: "Delete Item",
  //     text: "Do you want to delete Item ?",
  //     showDenyButton: true,
  //     showCancelButton: false,
  //     denyButtonText: "Cancel",
  //     showLoaderOnConfirm: true,
  //     preConfirm: async () => {
  //       await handleTableItemDelete(data);
  //     },
  //     preDeny: () =>
  //       Swal.fire({
  //         title: "Canceled",
  //         showConfirmButton: false,
  //         timer: 1500,
  //       }),
  //   });
  // };

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
      let response;
      response = await deleteSalesItem(data.id);
      if (response.success) {
        Swal.fire({
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        // const data = await getData();
        // if (data?.length > 0)
        //   data?.map((purchData) => {
        //     if (purchData?.id === edit?.id) {
        //       console.log(purchData);
        //       setEdit(purchData);
        //     }
        //   });
        let tempList = [...tableItemList];
        tempList.splice(i, 1);
        setTableItemList([...tempList]);
        handleSalesAddCalc(tempList,false)
        getData();
      }
      // if (response.success && !data.created_at) {
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
    try {
      if (!tableItem.fk_items || !tableItem.quantity || !tableItem.rate) {
        Swal.fire({
          title: "Please Enter essential details first",
          text: "Select item , enter quantity, enter rate , enter sales rate",
          icon: "warning",
          showConfirmButton: false,
          timer: 1500,
        });
        return 0;
      }
      let response;
      if (!tableEdit)
        response = await postSalesItem({
          ...tableItem,
          fk_units: tableItem.unit,
        });
      else
        response = await putSalesItem(tableEdit, {
          ...tableItem,
          fk_units: tableItem.unit,
        });
      let itemTempList = [...tableItemList];
      if (response?.success && !tableEdit) {
        let tempItemKeys = [...tableItemKeys];
        tempItemKeys.push({ id: response?.data?.id });
        setTableItemKeys(tempItemKeys);
        let itemTemp = { ...tableItem };
        itemTemp = { ...itemTemp, ["cstm_id"]: cstm_id, id: response.data.id };
        itemTempList.push(itemTemp);
        setTableItemList([...itemTempList]);
        setCstm_id(cstm_id + 1);
        handleTableItemReset();
      } else if (response?.success && tableEdit) {
        let ind;
        if (itemTempList?.length > 0)
          ind = itemTempList.findIndex((item) => item.id == tableEdit);
        itemTempList.splice(ind, 1);
        itemTempList.push(tableItem);
        setTableItemList([...itemTempList]);
        setTableEdit(false);
        handleTableItemReset();
      } else {
        Swal.fire(response.message, "", "error");
      }
      handleKeyDown(e)
      handleSalesAddCalc(itemTempList);
    } catch (err) {
      console.log(err);
      Swal.fire("Fialed to Add Item, pls try again", "", "error");
    }
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
        fk_unit,
        retail_rate,
        purchase_rate,
        tax_inclusive,
        tax_gst,
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
        unit: newObj?.unit,
        sales_rate: retail_rate || 0,
        rate: retail_rate || 0,
        gross: gross || 0,
        tax_gst: tax_gst || 0,
        quantity: 1,
      };
    } else if (data?.value == "") {
      handleTableItemReset();
      return 0;
    } else if (e.target.value === "") {
      tempItem = { ...tempItem, [e.target.name]: "" };
    } else if (e.target.type === "number") {
      tempItem = { ...tempItem, [e.target.name]: parseFloat(+e.target.value+0) };
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
          console.log(
            (tempItem.rate - tempItem.discount_1_amount_per_item) *
              (tempItem.tax_gst / 100)
          );
          value = {
            ...value,
            ["gross"]:
              (tempItem.rate - tempItem.discount_1_amount_per_item || 0) +
              ((tempItem.rate - tempItem.discount_1_amount_per_item || 0) *
                (tempItem.tax_gst / 100)),
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
        gross:0,
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
      } else {
        let ind = salesList?.findIndex((x) => edit.id == x.id);
        if (ind !== salesList?.length - 1) {
          handleSalesAllReset();
          setEdit(salesList[ind + 1]);
        } else {
          Swal.fire("No more purchase to edit", "go for next", "warning");
        }
      }
    } else {
      Swal.fire("No more purchase to edit", "go for next", "warning");
    }
  };

  const handleNext = () => {
    let i = salesList?.length - 1;
    if (!edit) {
      Swal.fire("No more purchase to edit", "go for prev", "warning");
    } else if (edit?.id == salesList[0]?.id) {
      handleSalesAllReset();
    } else {
      handleSalesAllReset();
      let ind = salesList?.findIndex((x) => edit.id == x.id);
      if (ind !== salesList[0]) {
        setEdit(salesList[ind - 1]);
      } else {
        Swal.fire("No more purchase to edit", "go for prev", "warning");
      }
    }
  };

  return (
    <>
      <div className="px-2 " id="TableToPrint">
        <table className="table table-secondary purchase-table mb-0">
          <thead className="purchase-table-header">
            <tr>
              <th className="text-start" colSpan={3}>
                Item Name
              </th>
              <th>Qty</th>
              <th>Ut</th>
              <th>Rate</th>
              <th>Net Rate</th>
              <th>Disc%</th>
              <th>Disc</th>
              <th>Value</th>
              <th>Tax</th>
              <th>CGST/IGST</th>
              <th>SGST</th>
              <th>Total</th>
              {/* <th>Cost</th>
              <th>Margin%</th> */}
              {/* <th>P.Rate</th> */}
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
          <tbody className="purchase-table-body">
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
                    id={"tableBodyTr"}
                    key={i}
                    ref={(el) => (formRef2.current[i] = el)}
                  >
                    <td className="text-start ps-3" colSpan={3}>
                      <Dropdown
                        // clearable
                        options={itemNameList}
                        selection
                        search={search}
                        placeholder="SELECT"
                        className="purchase_search_drop border-0 w-100 ps-2"
                        onKeyDown={handleKeyDown2}
                        name={"fk_items"}
                        onChange={(e, a) =>
                          handleChangeTableItem(e, a, data, i)
                        }
                        value={
                          data?.fk_items == "" || data?.fk_items
                            ? data?.fk_items
                            : ""
                        }
                      />
                    </td>
                    <td>
                      <input
                        onKeyDown={handleKeyDown2}
                        onChange={(e) =>
                          handleChangeTableItem(e, null, data, i)
                        }
                        name="quantity"
                        className="purchase_input border-0 w-100 text-center"
                        value={data.quantity || ""}
                      />
                    </td>
                    <td>
                      <select
                        onKeyDown={handleKeyDown2}
                        onChange={(e) =>
                          handleChangeTableItem(e, null, data, i)
                        }
                        value={data.unit || ""}
                        name="unit"
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
                    <td>
                      <input
                        onKeyDown={handleKeyDown2}
                        onChange={(e) =>
                          handleChangeTableItem(e, null, data, i)
                        }
                        className="purchase_input border-0 w-100 text-center"
                        value={data.rate || ""}
                        name="rate"
                      />
                    </td>
                    <td>
                      <input
                        onKeyDown={handleKeyDown2}
                        // disabled
                        onChange={(e) =>
                          handleChangeTableItem(e, null, data, i)
                        }
                        className="purchase_input border-0 w-100 text-center"
                        value={data.gross || ""}
                        name="gross"
                      />
                    </td>
                    <td>
                      <input
                        onKeyDown={handleKeyDown2}
                        onChange={(e) =>
                          handleChangeTableItem(e, null, data, i)
                        }
                        className="purchase_input border-0 w-100 text-center"
                        value={data.discount_1_percentage || ""}
                        name="discount_1_percentage"
                      />
                    </td>
                    <td>
                      <input
                        onKeyDown={handleKeyDown2}
                        onChange={(e) =>
                          handleChangeTableItem(e, null, data, i)
                        }
                        className="purchase_input border-0 w-100 text-center"
                        value={data.discount_1_amount || ""}
                        name="discount_1_amount"
                      />
                    </td>
                    <td>
                      <input
                        disabled
                        onKeyDown={handleKeyDown2}
                        onChange={(e) =>
                          handleChangeTableItem(e, null, data, i)
                        }
                        className="purchase_input border-0 w-100 text-center"
                        value={data.value || ""}
                        name="value"
                      />
                    </td>
                    <td>
                      <input
                        onKeyDown={handleKeyDown2}
                        onChange={(e) =>
                          handleChangeTableItem(e, null, data, i)
                        }
                        className="purchase_input border-0 w-100 text-center"
                        value={data.tax_gst || ""}
                        name="tax_gst"
                      />
                    </td>
                    <td>
                      <input
                        disabled
                        onKeyDown={handleKeyDown2}
                        onChange={(e) =>
                          handleChangeTableItem(e, null, data, i)
                        }
                        className="purchase_input border-0 w-100 text-center"
                        value={data.cgst_or_igst || ""}
                        name="cgst_or_igst"
                      />
                    </td>
                    <td>
                      <input
                        disabled
                        onKeyDown={handleKeyDown2}
                        onChange={(e) =>
                          handleChangeTableItem(e, null, data, i)
                        }
                        className="purchase_input border-0 w-100 text-center"
                        value={data.sgst || ""}
                        name="sgst"
                      />
                    </td>
                    <td>
                      <input
                        disabled
                        onKeyDown={handleKeyDown2}
                        onChange={(e) =>
                          handleChangeTableItem(e, null, data, i)
                        }
                        className="purchase_input border-0 w-100 text-center"
                        value={data.total || ""}
                        name="total"
                      />
                    </td>
                    {data?.edited ? (
                      <td>
                        <button
                          onKeyDown={(e) => handleKeyTableItemEdit(e, data, i)}
                          onClick={(e) => handleTableItemEdit(e, data, i)}
                          className="text-center border-0 bg-transparent"
                        >
                          <FiEdit className="mb-1 btn p-0" size={"16px"} />
                        </button>
                      </td>
                    ) : (
                      <td className="p-0">
                        <div
                          onClick={confirmDelete}
                          className="text-center w-100"
                        >
                          <BsTrashFill className="mb-1 btn p-0" size={"16px"} />
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}

            {/* table Item List-----------------------------------------end */}

            <tr ref={formRef} className="input-tr">
              <td
                colSpan={3}
                className="purchase_search_drop_td text-start ps-3"
              >
                <Dropdown
                  clearable
                  required
                  selection
                  upward={salesAdd.total_items > 4 ? true : false}
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
                    tableItem?.fk_items == "" || tableItem?.fk_items
                      ? tableItem?.fk_items
                      : ""
                  }
                  options={itemNameList}
                />
              </td>
              <td>
                <input
                  onKeyDown={handleKeyDown}
                  name={"quantity"}
                  onChange={(e) =>
                    handleChangeTableItem(e, null, tableItem, true)
                  }
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  value={
                    tableItem?.quantity == "" ||
                    tableItem?.quantity ||
                    tableItem?.quantity == "0"
                      ? tableItem?.quantity
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
                  onChange={(e) =>
                    handleChangeTableItem(e, null, tableItem, true)
                  }
                  value={
                    tableItem?.unit == "" || tableItem?.unit
                      ? tableItem?.unit
                      : ""
                  }
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
              <td>
                <input
                  onKeyDown={handleKeyDown}
                  name={"rate"}
                  onChange={(e) =>
                    handleChangeTableItem(e, null, tableItem, true)
                  }
                  value={
                    tableItem?.rate == "" || tableItem?.rate
                      ? tableItem?.rate
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
                  // disabled
                  onKeyDown={handleKeyDown}
                  onChange={(e) =>
                    handleChangeTableItem(e, null, tableItem, true)
                  }
                  name={"gross"}
                  // onChange={(e) =>
                  //   handleChangeTableItem(e, null, tableItem, true)
                  // }
                  value={
                    tableItem?.gross == "" || tableItem?.gross
                      ? tableItem?.gross
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
                  name={"discount_1_percentage"}
                  onChange={(e) =>
                    handleChangeTableItem(e, null, tableItem, true)
                  }
                  value={
                    tableItem?.discount_1_percentage == "" ||
                    tableItem?.discount_1_percentage
                      ? tableItem?.discount_1_percentage
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
                    tableItem?.discount_1_amount == "" ||
                    tableItem?.discount_1_amount
                      ? tableItem?.discount_1_amount
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
                    tableItem?.value == "" || tableItem?.value
                      ? tableItem?.value
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
                    tableItem?.tax_gst == "" || tableItem?.tax_gst
                      ? tableItem?.tax_gst
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
                    tableItem?.cgst_or_igst == "" || tableItem?.cgst_or_igst
                      ? tableItem?.cgst_or_igst
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
                    tableItem?.sgst == "" || tableItem?.sgst
                      ? tableItem?.sgst
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
                  name={"total"}
                  onChange={(e) =>
                    handleChangeTableItem(e, null, tableItem, true)
                  }
                  value={
                    tableItem?.total == "" || tableItem?.total
                      ? tableItem?.total
                      : ""
                  }
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  type="number"
                  className="purchase_input border-0 w-100 text-center"
                />
              </td>
              {/* <td>
                <input
                  disabled
                  onKeyDown={handleKeyDown}
                  name={"cost"}
                  onChange={handleChangeTableItem}
                  value={
                    tableItem?.cost == "" || tableItem?.cost
                      ? tableItem?.cost
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
                  name={"margin"}
                  onChange={handleChangeTableItem}
                  value={
                    tableItem?.margin == "" || tableItem?.margin
                      ? tableItem?.margin
                      : ""
                  }
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  type="number"
                  className="purchase_input border-0 w-100 text-center"
                />
              </td> */}
              {/* <td>
                <input
                  onKeyDown={handleKeyDown}
                  name={"sales_rate"}
                  onChange={handleChangeTableItem}
                  value={
                    tableItem?.sales_rate == "" || tableItem?.sales_rate
                      ? tableItem?.sales_rate
                      : ""
                  }
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  type="number"
                  className="purchase_input border-0 w-100 text-center"
                />
              </td> */}
              <td>
                {/* {tableEdit ? (
                  <button onClick={handleAddSalesItem} className="text-center border-0 bg-transparent">
                    <FiEdit className="mb-1 btn p-0" size={"16px"} />
                  </button>
                ) : ( */}
                <input
                  type="button"
                  onKeyDown={handleAddSalesItem}
                  onClick={handleAddSalesItem}
                  className="table-item-add-btn rounded-1 btn-sm"
                  value={"+"}
                />
                {/* )} */}
              </td>
              {/* <td className="p-0 text-start">
                {tableEdit && (
                  <input
                    type="button"
                    onClick={() => {
                      setTableEdit(false);
                      handleTableItemReset();
                    }}
                    className="table-item-add-btn2 text-start"
                    value={"+"}
                  />
                )}
              </td> */}
            </tr>

            <AdjustHeightOfTable />
          </tbody>
          <tfoot>
            <tr className="purchase-table-green">
              <td className="item2 col-1" colSpan={2}>
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
                  {salesAdd.total_qty || 0}
                </div>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="item">
                <div className="purch-green-table-item">
                  {salesAdd.total_discount || 0}
                </div>
              </td>
              <td className="item">
                <div className="purch-green-table-item">
                  {salesAdd.total_value || 0}
                </div>
              </td>
              <td></td>
              <td className="item">
                <div className="purch-green-table-item">
                  {salesAdd.total_sgst || 0}
                </div>
              </td>
              <td className="item">
                <div className="purch-green-table-item">
                  {salesAdd.total_sgst || 0}
                </div>
              </td>
              <td className="item">
                <div className="purch-green-table-item">
                  {salesAdd.total_total || 0}
                </div>
              </td>
              <td></td>
              <td></td>
              {/* <td></td> */}
              <td></td>
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

// --------------------------------------------------------

// let name = e.target.name;
// let value = {};
// if (tempItem.rate && tempItem.quantity) {
//   let total = tempItem.total,
//     cost = tempItem.cost;
//   if (!tempItem.discount_1_amount && !tempItem.tax_gst) {
//     total = tempItem.quantity * tempItem.rate;
//     cost = tempItem.rate;
//   }
//   value = {
//     ["value"]: tempItem.quantity * tempItem.rate,
//     ["total"]: total,
//     ["cost"]: cost,
//   };
//   tempItem = { ...tempItem, ...value };
//   if (name != "discount_1_amount" && tempItem.discount_1_percentage) {
//     value = {
//       ...value,
//       ["discount_1_amount"]:
//         tempItem.discount_1_percentage * (value.value / 100),
//     };
//   } else if (name == "discount_1_percentage") {
//     value = { ...value, ["discount_1_amount"]: 0 };
//   }
//   if (name == "discount_1_amount" && tempItem.discount_1_amount) {
//     value = {
//       ...value,
//       ["discount_1_percentage"]:
//         (tempItem.discount_1_amount / value.value) * 100,
//     };
//   } else if (name == "discount_1_amount") {
//     value = { ...value, ["discount_1_percentage"]: 0 };
//   }
//   tempItem = { ...tempItem, ...value };

//   if (tempItem.discount_1_percentage) {
//     value = {
//       ["discount_amnt_per_item"]:
//         tempItem.discount_1_percentage * (tempItem.rate / 100),
//     };
//   } else {
//     value = {
//       ["discount_amnt_per_item"]: 0,
//     };
//   }

//   tempItem = { ...tempItem, ...value };
//   if (name == "tax_gst") {
//     if (tempItem.tax_gst) {
//       value = {
//         ...value,
//         ["total"]:
//           value.value -
//           value.discount_1_amount +
//           tempItem.tax_gst * (value.value / 100),
//         ["cost"]:
//           parseInt(
//             parseFloat(tempItem.rate) -
//               parseFloat(tempItem.discount_1_amount)
//           ) +
//           tempItem.tax_gst * (tempItem.rate / 100),
//         ["cgst_or_igst"]: tempItem.tax_gst / 2,
//         ["sgst"]: tempItem.tax_gst / 2,
//       };
//     } else {
//       value = { ...value, cgst_or_igst: 0, sgst: 0 };
//     }
//   }
//   tempItem = { ...tempItem, ...value };
//   // if (tempItem.tax_gst) {
//   //   value = {
//   //     ...value,
//   //     ["tax_amount"]: tempItem.tax_gst * (tempItem.value / 100),
//   //   };
//   // }
//   tempItem = { ...tempItem, ...value };
//   if (tempItem.tax_gst && tempItem.value) {
//     // console.log(tempItem.value)
//     value = {
//       ...value,
//       ["gross"]:
//         (tempItem.rate - tempItem.discount_amnt_per_item || 0) +
//         (tempItem.rate - tempItem.discount_amnt_per_item || 0) *
//           (tempItem.tax_gst / 100),
//       // ["tax_amount"]: (tempItem.tax_gst) * (tempItem.value / 100),
//     };
//   } else {
//     value = { ...value, ["gross"]: 0 };
//   }
//   tempItem = { ...tempItem, ...value };
//   if (tempItem.gross && tempItem.quantity) {
//     let totalValue = tempItem.rate * tempItem.quantity - tempItem.discount_1_amount || 0
//     let totalTaxAmnt = +tempItem.tax_gst * (+totalValue / 100);
//     let sgst = (totalTaxAmnt / 2)?.toFixed(2);
//     value = {
//       ...value,
//       ["value"]:
//         tempItem.rate * tempItem.quantity - tempItem.discount_1_amount || 0,
//       ["total"]:
//         (tempItem.rate * tempItem.quantity - tempItem.discount_1_amount ||
//           0) + (sgst*2),
//       ["cgst_or_igst"]: sgst,
//       ["sgst"]: sgst,
//     };
//   }

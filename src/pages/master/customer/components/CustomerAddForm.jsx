import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import deleteBtn from "../../../../assets/icons/delete-white.svg";
import { Modal } from "react-bootstrap";
import useOnKey from "../../../../hooks/onKeyFunct/onKeyFunct";
import useCustomerServices from "../../../../services/master/customerServices";
import SearchDropDown from "../../../../components/searchDropDown/SearchDropDown";
import useItemServices from "../../../../services/master/itemServices";

const initialCustomerState = {
  code: null,
  name: null,
  address: null,
  post: null,
  pin: null,
  pin_distance: null,
  contact_person: null,
  email: null,
  mobile: null,
  alt_mobile: null,
  gst_in: null,
  disc: null,
  remark: null,
  opening_balance: "0.00",
  payment_type: "TO_GIVE",
  district: null,
  route: null,
  city: null,
  town: null,
  types: null,
  rate_types: null,
  bill_types: null,
  credit_limit_in_amt: null,
  credit_limit_in_days: null,
}

const CustomerAddForm = (props) => {
  const { edit, refresh, setEdit } = props

  const [showDropdown, setShowDropdown] = useState(1);
  const [showRates, setShowRates] = useState(false);
  const [ratesEdit, setRatesEdit] = useState(false);
  const [ratesTempList, setRatesTempList] = useState([]);
  const [itemNameList, setItemNameList] = useState([]);
  const [ref, setRef] = useState();
  const [rates, setRates] = useState({
    R_item: null,
    R_wsRate: null,
    R_rtRate: null,
    R_mrp: null,
    R_id: null,
  });
  const [listItem, setLisItem] = useState({
    district: [],
    route: [],
    city: [],
    town: [],
    types: [],
    rate_types: [
      { text: "MRP", value: "MRP" },
      { text: "RET_RATE", value: "RET_RATE" },
      { text: "WS_RATE", value: "WS_RATE" },
      { text: "SUPER_WHOLESALE_RATE", value: "SUPER_WHOLESALE_RATE" },
      { text: "QUOTATION_RATE", value: "QUOTATION_RATE" },
      { text: "RENT_RATE", value: "RENT_RATE" },
    ],
    bill_types: [],
  });

  const [customerAdd, setCustomerAdd] = useState(initialCustomerState);

  const { postCustomer, putCustomer, putSetRate, postSetRate, deleteCustomer } =
    useCustomerServices();

  const { getProperty, postProperty, getCode, getItemNameList } =
    useItemServices();

  useEffect(()=>{
    getData()
  },[])

  useEffect(() => {
    let op_balance = "0.00";
    if (edit?.account_opening_balance?.length > 0) {
      op_balance = Math.abs(edit?.account_opening_balance[0]?.opening_balance);
    }
    setCustomerAdd({
      ...edit,
      district: edit?.fk_district,
      route: edit?.fk_route,
      city: edit?.fk_city,
      town: edit?.fk_town,
      types: edit?.fk_types,
      bill_types: edit?.fk_bill_types,
      opening_balance: op_balance,
    });
    if (edit) {
      if (edit.fk_setrate.length > 0) {
        let b = [];
        edit.fk_setrate.map((data) => {
          let r = {
            R_item: data.fk_item,
            R_wsRate: data.wholesale_rate,
            R_rtRate: data.retail_rate,
            R_mrp: data.mrp,
            R_id: data.id,
          };
          b.push(r);
        });
        setRatesTempList(b);
      }
    }
    if (!edit) handleGetCode();
  }, [edit]);

  useEffect(() => {

  }, [edit]);

  const { handleKeyDown, formRef } = useOnKey(ref, setRef);

  const handleRatesClear = () => {
    let x = Object.keys(rates);
    x.map((key) => {
      setRates((data) => ({ ...data, [key]: null }));
    });
  };

  const addToList = async () => {
    let valuesOfRates = Object.values(rates);
    let valueCheck = valuesOfRates.filter((x) => x !== null && x !== "");
    if (ratesEdit && valueCheck.length > 3) {
      try {
        const data = {
          fk_item: rates.R_item,
          wholesale_rate: rates.R_wsRate,
          retail_rate: rates.R_rtRate,
          mrp: rates.R_mrp,
        };
        let res = await putSetRate(ratesEdit, data);
        if (res.success) {
          refresh();
          handleRatesClear();
        } else {
        }
      } catch (err) {}
    } else {
      if (valueCheck.length > 3) {
        let g = ratesTempList;
        g.push(rates);
        setRatesTempList(g);
        let r = {};
        valuesOfRates.map((data) => (r = { ...r, [data]: "" }));
        handleRatesClear();
      }
    }
  };

  const setItemNameListState = (data) => {
    let tempList = [];
    data.map((item) => {
      item["value"] = item.id;
      delete item.id;
      item["text"] = item.name;
      delete item.name;
      tempList.push(item);
    });
    setItemNameList(tempList);
  };

  const handleGetCode = async () => {
    try {
      let code
      let res2 = await getCode();
      if (res2?.success) {
        let cod = res2?.data?.filter((x) => x.sub_id === "CUS")[0];

        setCustomerAdd((data) => ({
          ...data,
          ["code"]: cod.sub_id + cod?.next_value,
        }));
        code = cod.sub_id + cod?.next_value;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getData = async () => {
    let list = {}
    const miniFunct = (data) => {
      const keys = Object.keys(listItem);
      data?.map((x) => {
        if (keys.indexOf(x.property_type) > -1) {
          if (!list[x.property_type]?.length > 0) {
            list[x.property_type] = [];
            if (x.property_type === "unit") {
              list["transaction_unit"] = [];
            }
          }
          list[x?.property_type].push({
            value: x["id"],
            text: x["property_value"],
            opening_balance: "0.00",
          });
        }
      });
    };
    try {
      let res = await getProperty();
      if (res.success) miniFunct(res?.data);
      res = await getItemNameList();
      if (res.success) setItemNameListState(res.data);
      
      setLisItem(list);
    } catch (err) {}
  };

  const addNewOption = async (e, data, state) => {
    e.preventDefault();
    let value = data.value;
    try {
      let submitData = { property_value: value, property_type: state };
      let res = await postProperty(submitData);
      if (res?.success) {
        setCustomerAdd((data) => ({ ...data, [state]: res.data.id }));
        Swal.fire("Option Added Successfylly", "", "success");
      } else {
        Swal.fire(res?.message, "", "error");
      }
      getData();
    } catch (err) {
      Swal.fire(err?.response?.data?.message, "", "error");
    }
  };

  const handleToUpperCase = (data) => {
    let keysOfData,
      tempData = { ...data };
    if (typeof data == "object") keysOfData = Object.keys(data);
    if (!keysOfData?.length > 0) return 0;
    keysOfData.map((item) => {
      if (typeof data[item] == "string" && !item.match(/email|R_item/)) {
        let itemTemp = data[item]?.toUpperCase();
        tempData = { ...tempData, [item]: itemTemp };
      }
    });
    return tempData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let submitData = handleToUpperCase(customerAdd);
      const names = [
        "district",
        "route",
        "city",
        "town",
        "bill_types",
        "types",
      ];
      let data = handleChangeFk(names, submitData);
      let res,
        res2 = 1,
        customerId;
      if (edit) {
        res = await putCustomer(edit.id, data);
        customerId = res.data.id;
      } else {
        res = await postCustomer(data);
        customerId = res.data.data_customer.id;
      }
      if (res?.success && (!edit || (edit && !rates?.R_id))) {
        refresh()
        if (ratesTempList.length > 0) {
          ratesTempList.map(async (x) => {
            const data = {
              fk_item: x.R_item,
              wholesale_rate: x.R_wsRate,
              retail_rate: x.R_rtRate,
              mrp: x.R_mrp,
            };
            res2 = await postSetRate(customerId, data);
          });
        }
        if (res2 !== 1 && res2.success) {
          Swal.fire(res?.message, "", "success");
          setEdit(false);
        } else if (res2 != 1 && !res2.success) {
          Swal.fire(res2?.message, "", "error");
          setEdit(false);
          await deleteCustomer(res?.data.data_customer?.id);
        } else {
          Swal.fire("Customer Added successfully", "", "success");
          setEdit(false);
        }
      } else if (!res?.success && !edit) {
        const errkey = Object.keys(res.data);
        Swal.fire(res?.data[errkey[0]], "", "error");
        getData();
      }
    } catch (err) {
      const errkey = Object.keys(err.response.data.data);
      Swal.fire(err.response.data.data[errkey[0]][0], "", "error");
    }
  };
  
  const handleChangeFk = (name, submitData) => {
    name.map((x) => {
      submitData["fk_" + x] = submitData[x];
      delete submitData[x];
    });
    return submitData;
  };
  
  const handleReset = async () => {
    refresh();
    setCustomerAdd(initialCustomerState);
    setEdit(false);
    getData();
  };

  const handleChange = (e) => {
    if (e.target.name.match(/^R_/)) {
      if (
        e.target.value === "" ||
        (e.target.name === "R_item" && e.target.value.length < 0)
      ) {
        setRates((data) => ({ ...data, [e.target.name]: null }));
      } else {
        setRates((data) => ({ ...data, [e.target.name]: e.target.value }));
      }
    } else {
      let a = e.target.value;
      if (e.target.type === "number" && e.target.value !== "") {
        let a = parseInt(e.target.value);
        e.target.value = a;
      }
      if (e.target.value === "")
        setCustomerAdd((data) => ({ ...data, [e.target.name]: null }));
      else setCustomerAdd((data) => ({ ...data, [e.target.name]: a }));
    }
  };

  const handleEditRates = (e, data) => {
    setRates(data);
    setRatesEdit(data.R_id);
  };

  const handleRatesClose = () => {
    setShowRates(false);
    handleRatesClear();
  };

  const handleValueNull = (e) => {
    if (e.target.value == "" || parseInt(e.target.value) == 0) {
      setCustomerAdd((data) => ({ ...data, ["opening_balance"]: "0.00" }));
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="item_add_cont">
      {edit ? "Edit Customer" : "Add New Customer"}
      <div className="item_add_form pt-1 d-flex mt-1">
        {/* item details --------------------------------------------------------------------------------------- */}

        <div className="item_add_form_part1 col-6 row mx-0 px-0">
          <div className="d-flex align-items-center ps-0 row mx-0 my-2">
            <div className="mx-0 px-0 col-5 col-6">Code</div>
            <div className="mx-0 px-0 col-6 col-7">
              <input
                onKeyDown={handleKeyDown}
                onChange={handleChange}
                name="code"
                value={customerAdd.code || ""}
                type="text"
                required
                className="item_input names"
              />
            </div>
          </div>
          <div className="d-flex align-items-center ps-0 row mx-0 my-2">
            <div className="mx-0 px-0 col-5 col-6">Name</div>
            <div className="mx-0 px-0 col-6 col-7">
              <input
                onKeyDown={handleKeyDown}
                onChange={handleChange}
                name="name"
                value={customerAdd.name || ""}
                type="text"
                required
                className="item_input names"
              />
            </div>
          </div>
          <div className="d-flex align-items-center ps-0 row mx-0 my-2">
            <div className="mx-0 px-0 col-5 col-6">Address</div>
            <div className="mx-0 px-0 col-6 col-7">
              <textarea
                onKeyDown={handleKeyDown}
                onChange={handleChange}
                name="address"
                value={customerAdd.address || ""}
                rows={4}
                className="item_input text-area names"
              />
            </div>
          </div>
          <div className="d-flex align-items-center ps-0 row mx-0 my-2">
            <div className="col-5 col-6 row mx-0 px-0">
              <div className="mx-0 px-0 col-5">Post</div>
              <div className="mx-0 px-0 col-7">
                <input
                  onKeyDown={handleKeyDown}
                  onChange={handleChange}
                  name="post"
                  value={customerAdd.post || ""}
                  type="text"
                  className="item_input names"
                />
              </div>
            </div>
            <div className="col-6 col-7 row ps-5 mx-0 px-0">
              <div className="mx-0 px-0 col-5">Pin</div>
              <div className="mx-0 px-0 col-7">
                <input
                  onKeyDown={handleKeyDown}
                  onChange={handleChange}
                  name="pin"
                  value={customerAdd.pin || ""}
                  type="number"
                  className="item_input names"
                />
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center ps-0 row mx-0 my-2">
            <div className="col-5 col-6 row mx-0 px-0">
              <div className="mx-0 px-0 col-5">Contact Person</div>
              <div className="mx-0 px-0 col-7">
                <input
                  onKeyDown={handleKeyDown}
                  onChange={handleChange}
                  name="contact_person"
                  value={customerAdd.contact_person || ""}
                  type="text"
                  className="item_input names"
                />
              </div>
            </div>
            <div className="col-6 col-7 row ps-5 mx-0 px-0">
              <div className="mx-0 px-0 col-5">PIN Distance</div>
              <div className="mx-0 px-0 col-7">
                <input
                  onKeyDown={handleKeyDown}
                  onChange={handleChange}
                  name="pin_distance"
                  value={customerAdd.pin_distance || ""}
                  type="number"
                  className="item_input names"
                />
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center ps-0 row mx-0 my-2">
            <div className="mx-0 px-0 col-5 col-6">Email</div>
            <div className="mx-0 px-0 col-6 col-7">
              <input
                onKeyDown={handleKeyDown}
                onChange={handleChange}
                name="email"
                value={customerAdd.email || ""}
                type="text"
                className="text-lowercase item_input names"
              />
            </div>
          </div>
          <div className="d-flex align-items-center ps-0 row mx-0 my-2">
            <div className="mx-0 px-0 col-5 col-6">Mob</div>
            <div className="mx-0 px-0 col-6 col-7">
              <input
                onKeyDown={handleKeyDown}
                onChange={handleChange}
                name="mobile"
                value={customerAdd.mobile || ""}
                type="number"
                className="item_input names"
              />
            </div>
          </div>
          <div className="d-flex align-items-center ps-0 row mx-0 my-2">
            <div className="mx-0 px-0 col-5 col-6">Alt Mob</div>
            <div className="mx-0 px-0 col-6 col-7">
              <input
                onKeyDown={handleKeyDown}
                onChange={handleChange}
                name="alt_mobile"
                value={customerAdd.alt_mobile || ""}
                type="number"
                className="item_input names"
              />
            </div>
          </div>
          <div className="d-flex align-items-center ps-0 row mx-0 my-2">
            <div className="mx-0 px-0 col-5 col-6">GSTin</div>
            <div className="mx-0 px-0 col-6 col-7">
              <input
                onKeyDown={handleKeyDown}
                onChange={handleChange}
                name="gst_in"
                value={customerAdd.gst_in || ""}
                type="text"
                className="item_input names"
              />
            </div>
          </div>
          <div className="d-flex align-items-center ps-0 row mx-0 my-2">
            <div className="mx-0 px-0 col-5 col-6">Credit Limit</div>
            <div className="mx-0 px-0 col-6 col-7 d-flex gap-2">
              <input
                onKeyDown={handleKeyDown}
                onChange={handleChange}
                name="credit_limit_in_amt"
                value={customerAdd.credit_limit_in_amt || ""}
                type="number"
                placeholder="In Amnt"
                className="item_input names credit"
              />
              <input
                onKeyDown={handleKeyDown}
                onChange={handleChange}
                name="credit_limit_in_days"
                value={customerAdd.credit_limit_in_days || ""}
                type="number"
                placeholder="In Days"
                className="item_input names credit"
              />
            </div>
          </div>

          <div className="d-flex align-items-center ps-0 row mx-0 my-2">
            <div className="mx-0 px-0 col-5 col-6">Op Balance</div>
            <div className="mx-0 px-0 col-6 col-7">
              <div className="item_input_with_drop row rounded-2 align-items-center p-0 m-0">
                <div className="col-6 col-7 mx-0 px-0 me-0">
                  <input
                    onBlur={handleValueNull}
                    required
                    onKeyDown={handleKeyDown}
                    onChange={handleChange}
                    name="opening_balance"
                    value={customerAdd.opening_balance || ""}
                    type="number"
                    className="item_input names border-0 "
                  />
                </div>
                <div className="col-6 col-5 mx-0 px-0 d-flex align-items-center dropdown-btn-cont">
                  <select
                    onKeyDown={handleKeyDown}
                    onChange={handleChange}
                    name="payment_type"
                    value={customerAdd.payment_type}
                    className="pay-type-select ms-0 pe-0"
                  >
                    <option value="TO_GIVE">To Give</option>
                    <option value="TO_RECEIVE">To Receive</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          {/* ------------------------------ */}
          <div className="d-flex align-items-center ps-0 row mx-0 my-2">
            <div className="mx-0 px-0 col-5 col-6">Disc %</div>
            <div className="mx-0 px-0 col-3 col-4">
              <input
                onKeyDown={handleKeyDown}
                onChange={handleChange}
                name="disc"
                value={customerAdd.disc || ""}
                type="number"
                className="item_input names"
              />
            </div>
            <div className="mx-0 px-0 col-3 d-flex ps-1">
              <div
                onClick={() => setShowRates(true)}
                className="btn btn-sm btn-dark py-0 w-100 rates-btn"
              >
                Set Rates
              </div>
            </div>
          </div>
        </div>

        {/* item rate ----------------------------------------------------------------------------------------------------------- */}

        <div className="item_add_form_part2 row mx-0 px-0 me-0 col-6 border-0">
          <div className="d-flex align-items-start justify-content-between mx-0 ps-4 pe-0">
            <div className="col-3 col-4">Route</div>
            <div className="mx-0 px-0 col-7 col-8">
              <SearchDropDown
                containerClass="large"
                id="route"
                addNew={true}
                setNew={addNewOption}
                options={listItem}
                {...{ showDropdown, setShowDropdown, handleKeyDown }}
                setDataValue={setCustomerAdd}
                selectedValue={customerAdd || ""}
              />
            </div>
          </div>
          <div className="d-flex align-items-start justify-content-between mx-0 ps-4 pe-0 my-2">
            <div className="col-3 col-4">City</div>
            <div className="mx-0 px-0 col-7 col-8">
              <SearchDropDown
                containerClass="large"
                id="city"
                addNew={true}
                setNew={addNewOption}
                options={listItem}
                {...{ showDropdown, setShowDropdown, handleKeyDown }}
                setDataValue={setCustomerAdd}
                selectedValue={customerAdd || ""}
              />
            </div>
          </div>
          <div className="d-flex align-items-start justify-content-between mx-0 ps-4 pe-0 my-2">
            <div className="col-3 col-4">Town</div>
            <div className="mx-0 px-0 col-7 col-8">
              <SearchDropDown
                containerClass="large"
                id="town"
                addNew={true}
                setNew={addNewOption}
                options={listItem}
                {...{ showDropdown, setShowDropdown, handleKeyDown }}
                setDataValue={setCustomerAdd}
                selectedValue={customerAdd || ""}
              />
            </div>
          </div>
          <div className="d-flex align-items-start justify-content-between mx-0 ps-4 pe-0 my-2">
            <div className="col-3 col-4">District</div>
            <div className="mx-0 px-0 col-7 col-8">
              <SearchDropDown
                containerClass="large"
                id="district"
                addNew={true}
                setNew={addNewOption}
                options={listItem}
                {...{ showDropdown, setShowDropdown, handleKeyDown }}
                setDataValue={setCustomerAdd}
                selectedValue={customerAdd || ""}
              />
            </div>
          </div>
          <div className="d-flex align-items-start justify-content-between mx-0 ps-4 pe-0 my-2">
            <div className="col-3 col-4">Type</div>
            <div className="mx-0 px-0 col-7 col-8">
              <SearchDropDown
                containerClass="large"
                id="types"
                addNew={true}
                setNew={addNewOption}
                options={listItem}
                {...{ showDropdown, setShowDropdown, handleKeyDown }}
                setDataValue={setCustomerAdd}
                selectedValue={customerAdd || ""}
              />
            </div>
          </div>
          <div className="d-flex align-items-start justify-content-between mx-0 ps-4 pe-0 my-2">
            <div className="col-3 col-4">Rate Type</div>
            <div className="mx-0 px-0 col-7 col-8">
              <SearchDropDown
                containerClass="large"
                id="rate_types"
                noAdd={true}
                noSearch={true}
                setNew={addNewOption}
                options={listItem}
                {...{ showDropdown, setShowDropdown, handleKeyDown }}
                setDataValue={setCustomerAdd}
                selectedValue={customerAdd || ""}
              />
            </div>
          </div>
          <div className="d-flex align-items-start justify-content-between mx-0 ps-4 pe-0 my-2">
            <div className="col-3 col-4">Bill Type</div>
            <div className="mx-0 px-0 col-7 col-8">
              <SearchDropDown
                containerClass="large"
                id="bill_types"
                addNew={true}
                setNew={addNewOption}
                options={listItem}
                {...{ showDropdown, setShowDropdown, handleKeyDown }}
                setDataValue={setCustomerAdd}
                selectedValue={customerAdd || ""}
              />
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between mx-0 ps-4 pe-0 my-2">
            <div className="col-3 col-4">Remarks</div>
            <div className="mx-0 px-0 col-7 col-8">
              <textarea
                onKeyDown={handleKeyDown}
                onChange={handleChange}
                name="remark"
                value={customerAdd.remark || ""}
                rows={3}
                className="item_input text-area names"
              />
            </div>
          </div>
          <div className="d-flex align-items-center row mx-0 ps-4 pe-3 my-2">
            <div className="mx-0 px-0 col-4 d-flex align-items-center">
              <input
                onKeyDown={handleKeyDown}
                onChange={handleChange}
                name="repeat"
                value={customerAdd.repeat || ""}
                type="checkbox"
              />
              <label className="px-2">Repeat</label>
            </div>
            <div className="mx-0 px-0 ps-4 col-8 d-flex align-items-center">
              <input
                onKeyDown={handleKeyDown}
                onChange={handleChange}
                name="blocked"
                value={customerAdd.blocked || ""}
                type="checkbox"
              />
              <label className="px-2">Blocked</label>
            </div>
          </div>
          <div className="bottom-btn-section row px-0 ms-2 mx-0 my-2">
            <div className="mx-0 px-0 col-4" />
            <div className="mx-0 px-1 col-4">
              <button
                onClick={handleReset}
                type="reset"
                className="btn btn-sm btn-outline-dark w-100"
              >
                Clear
              </button>
            </div>
            <div className="mx-0 px-1 col-4">
              <button type="submit" className="btn btn-sm btn-dark w-100">
                {edit ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={showRates}
        contentClassName="bg-dark"
        dialogClassName=""
        size="lg"
        centered
        onHide={handleRatesClose}
      >
        <Modal.Body>
          <div className="text-light pb-2">
            <div className="unit_modal_body mt-2 px-3 pb-2">
              <table className="custom-table-2 names ms-2 position-relative">
                <thead className="tabel-head">
                  <tr>
                    <th>Item</th>
                    <th>Ws.Rate</th>
                    <th>Rt.Rate</th>
                    <th>MRP</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="rounded-3 ">
                  <tr className="table-head-input">
                    <td>
                      <select
                        onChange={handleChange}
                        type="select"
                        value={rates.R_item || ""}
                        className="unit_select py-2 text-light w-100"
                        name="R_item"
                      >
                        <option value={null}>Select</option>
                        {itemNameList?.length > 0 &&
                          itemNameList.map((data, index) => (
                            <option key={index} value={data.value}>
                              {data.text}
                            </option>
                          ))}
                      </select>
                    </td>
                    <td>
                      <input
                        onKeyDown={handleKeyDown}
                        onChange={handleChange}
                        type="number"
                        name="R_wsRate"
                        value={rates.R_wsRate || ""}
                        className="w-100 text-light px-2"
                      />
                    </td>
                    <td>
                      <input
                        onKeyDown={handleKeyDown}
                        onChange={handleChange}
                        type="number"
                        name="R_rtRate"
                        value={rates.R_rtRate || ""}
                        className="w-100 text-light px-2"
                      />
                    </td>
                    <td>
                      <input
                        onKeyDown={handleKeyDown}
                        onChange={handleChange}
                        type="number"
                        name="R_mrp"
                        value={rates.R_mrp || ""}
                        className="w-100 text-light px-2"
                      />
                    </td>
                    <th className="col col-1 cursor text-center">
                      <img
                        onClick={() => handleReset()}
                        src={deleteBtn}
                        alt="deletebtn"
                      />
                    </th>
                    <th className="btn-td text-center col-1 col-2">
                      <div
                        onClick={addToList}
                        className="add_unit_btn py-1 col-11 col-12 my-1 btn"
                      >
                        {ratesEdit !== false ? "Edit rates" : "Add rate"}
                      </div>
                    </th>
                  </tr>
                  {ratesTempList?.length > 0 &&
                    ratesTempList.map((data) => (
                      <tr>
                        <td>
                          <select
                            onChange={handleChange}
                            type="select"
                            value={data.R_item || ""}
                            className="unit_select py-2 text-light w-100"
                            disabled
                            name="R_item"
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
                        <td>
                          <input
                            onKeyDown={handleKeyDown}
                            disabled
                            value={data.R_wsRate}
                            type="text"
                            className="w-100 text-light px-2"
                          />
                        </td>
                        <td>
                          <input
                            onKeyDown={handleKeyDown}
                            disabled
                            value={data.R_rtRate}
                            type="number"
                            className="w-100 text-light px-2"
                          />
                        </td>
                        <td>
                          <input
                            onKeyDown={handleKeyDown}
                            disabled
                            value={data.R_mrp}
                            type="number"
                            className="w-100 text-light px-2"
                          />
                        </td>
                        <td style={{ background: "#464646" }}>
                          <div
                            /* onClick={e=>handleDeleteUnit(data)} */ className="text-center"
                          >
                            <img src={deleteBtn} alt="delete btn" />
                          </div>
                        </td>
                        <td
                          style={{ background: "#464646" }}
                          className="btn-td text-center"
                        >
                          <div
                            onClick={(e) => handleEditRates(e, data)}
                            className="add_unit_btn btn col-11 py-1 my-1"
                          >
                            {"Edit"}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </form>
  );
};

export default CustomerAddForm;

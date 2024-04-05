import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { Modal } from "react-bootstrap";
import SearchDropDown from "../../../../components/searchDropDown/SearchDropDown";
import useItemServices from "../../../../services/master/itemServices";
import useOnKey from "../../../../hooks/onKeyFunct/onKeyFunct";
import { useLocation, useNavigate } from "react-router";
import { initialItemData } from "../initialData/ItemData";
import { useSelector } from "react-redux";
import { ItemPopup } from "./ItemPopup";

export const ItemAddForm = ({ edit, refresh, setToEdit }) => {
  const permissions = useSelector((state) => state.auth.activityPermissions);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState("");
  const [ref, setRef] = useState();
  
  // popup states
  const [popup, setPopup] = useState(false);
  const [popupInput, setPopupInput] = useState({});
  const [popupList, setPopupList] = useState([]);
  
  const typesOptions = [
    { text: "PRODUCT", value: "PRODUCT" },
    { text: "RAW MATERIAL", value: "RAW_MATERIAL" },
    { text: "SERVICE", value: "SERVICE" },
  ];
  const rentOptions = [
    { text: "SELECT", value: null },
    { text: "HOUR", value: "HOUR" },
    { text: "MONTH", value: "MONTH" },
  ];
  const [listItem, setListItem] = useState({
    second_name: [],
    types: typesOptions,
    rent_type: rentOptions,
    category: [],
    sub_category: [],
    company: [],
    size: [],
    color: [],
    group: [],
    tax_group: [],
    rack: [],
    unit: [],
    transaction_unit: [],
    rent_type: [],
  });

  const [handleKeyDown, formRef] = useOnKey(ref, setRef);

  const [itemadd, setItemAdd] = useState(initialItemData);

  const {
    getProperty,
    postProperty,
    putProperty,
    getCode,
    putItemAdd,
    postItemAdd,
  } = useItemServices();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    getData();
    handleGetCode();
  }, []);

  useEffect(() => {
    let items = { ...itemadd };
    if (edit) {
      console.log(edit)
      let keys = Object.keys(itemadd || {});
      keys.map((key) => {
        if (key === "types")
          setItemAdd((data) => ({ ...data, ["types"]: edit.type }));
        else if (
          key.match(
            /^second_name|^category|^sub_category|^company|^size|^color|^group|^tax_group|^unit|^rack/
          )
        ) {
          let a = "fk_" + key;
          if (edit[a]) {
            items = { ...items, [key]: edit[a] };
          }
        } else items = { ...items, [key]: edit[key] };
      });
    }
    setItemAdd(items);
  }, [edit]);

  const getData = async () => {
    let list = {};
    const miniFunct = (data) => {
      const keys = Object.keys(listItem);
      data.map((x) => {
        if (keys.indexOf(x.property_type) > -1) {
          if (!list[x.property_type]?.length > 0) {
            if (x.property_type !== "unit")
              list[x.property_type] = [{ value: null, text: "SELECT" }];
            else list[x.property_type] = [];
            if (x.property_type === "unit") {
              list["transaction_unit"] = [];
            }
          }
          if (x.property_type === "unit")
            list["transaction_unit"].push({
              value: x["property_value"],
              text: x["property_value"],
            });
          list[x?.property_type].push({
            value: x["id"],
            text: x["property_value"],
          });
        }
      });
    };
    try {
      let res = await getProperty();
      if (res?.success) miniFunct(res?.data);
      list.types = typesOptions;
      list.rent_type = rentOptions;
      let tempList = { ...listItem, ...list };
      setListItem({ ...tempList });
      if (
        tempList?.unit?.length > 0 &&
        tempList?.transaction_unit?.length > 0 &&
        !edit
      ) {
        setItemAdd((item) => ({
          ...item,
          ["unit"]: tempList?.unit[0]?.value,
          ["transaction_unit"]: tempList?.transaction_unit[0]?.value,
        }));
      }
      const { name, fromPurchase } = location?.state || {};
      if (name && fromPurchase) {
        setItemAdd((data) => ({ ...data, name: name }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleGetCode = async () => {
    if (!edit) {
      try {
        let res2 = await getCode();
        if (res2?.success) {
          let cod = res2?.data?.filter((x) => x.types === "ITEM_CODE");
          setItemAdd((data) => ({
            ...data,
            ["code"]: cod[0]?.sub_id + cod[0]?.next_value,
          }));
        }
      } catch (err) {
        console.log(err);
      }
    }
  };


  const addOption = async (e, data, state, editid) => {
    e.preventDefault();
    let value = data.value;
    try {
      let res;
      console.log(editid);
      if (editid) {
        let submitData = { property_value: data };
        res = await putProperty(submitData, editid);
      } else {
        let submitData = { property_value: value, property_type: state };
        res = await postProperty(submitData);
      }
      if (res.success)
        setItemAdd((data) => ({ ...data, [state]: res.data.id }));

      if (res.success) {
        Swal.fire("Option Added Successfylly", "", "success");
      }
      getData();
    } catch (err) {
      Swal.fire("Failed to add option", "", "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      var submitData = { ...itemadd,items:popupList };
      let res;
      const names = [
        "second_name",
        "category",
        "sub_category",
        "company",
        "size",
        "color",
        "group",
        "tax_group",
        "rack",
        "unit",
        "purchase",
      ];
      var data = handleChangeFk(names, submitData);
      setSubmitLoading(true);
      if (edit) {
        res = await putItemAdd(edit?.id, data);
      } else {
        res = await postItemAdd(data);
      }
      if (res?.success) {
        if (location?.state?.fromPurchase) {
          navigate("/purchase-transaction", {
            state: { fromItemAdd: true, item: res?.data },
          });
        } else Swal.fire("Item Added Successfully", "", "success");
        handleReset();
      } else Swal.fire(res?.data[0], "", "error");
      setSubmitLoading(false);
    } catch (err) {
      console.log(err);
      setSubmitLoading(false);
      let message = err?.response?.data?.message || "Something went wrong .Please try again."
      // let a = Object.keys(err?.response?.data?. || {});
      Swal.fire(message, "", "error");
    }
  };

  // console.log(itemadd)

  const handleChangeFk = (name, submitData) => {
    name.map((x) => {
      submitData["fk_" + x] = submitData[x];
      delete submitData[x];
    });
    return submitData;
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value || null;
    if (!popup) setItemAdd((data) => ({ ...data, [name]: value }));
    else setPopupInput((data) => ({ ...data, [name]: value }));
  };

  const handleCheck = (e) => {
    setItemAdd((data) => ({ ...data, [e.target.name]: !data[e.target.name] }));
  };

  const handleReset = () => {
    setItemAdd(initialItemData);
    setToEdit(false);
    setPopup(false);
    setPopupList([])
    refresh();
    getData();
    handleGetCode();
  };

  return (
    <form onSubmit={handleSubmit} ref={formRef} className={`item_add_cont`}>
      {edit ? "Edit Items" : "Add New Item"}
      <div className={`item_add_form pt-1 d-flex mt-1`}>
        {/* item details --------------------------------------------------------------------------------------- */}

        <div className="item_add_form_part1 row mx-0 px-0 col-6 ">
          <div className="item_add_first_row px-0 row mx-0 ">
            <div className="item_inputs d-flex mx-0 px-0 col-6">
              <div className="col-4 px-0">Code*</div>
              <div className="col-8 px-0">
                <input
                  onKeyDown={handleKeyDown}
                  required
                  type="text"
                  className="item_input"
                  value={itemadd.code ? itemadd.code : ""}
                  name="code"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="item_inputs d-flex px-0 col-6 align-itmes-end">
              <div className="col-4 px-0 ps-3">HSN</div>
              <div className="col-8 px-0">
                <input
                  onKeyDown={handleKeyDown}
                  type="number"
                  className="item_input"
                  value={itemadd.hsn ? itemadd.hsn : ""}
                  name="hsn"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="item_inputs row px-0 mx-0 pt-2">
            <div className="col-6 px-0">Name*</div>
            <div className="col-6 px-0">
              <input
                onKeyDown={handleKeyDown}
                type="text"
                required
                className="item_input ms-0 col-6"
                value={itemadd.name ? itemadd.name : ""}
                name="name"
                onChange={handleChange}
              />
            </div>
          </div>
          {/* {permissions.includes(1005) && ( */}
          <div className="item_inputs d-flex pt-2 px-0">
            <div className="col-6">Second Name</div>
            <SearchDropDown
              id="second_name"
              // noAdd={!permissions.includes(1006)}
              // isEditable={permissions.includes(1007)}
              setNew={addOption}
              options={listItem}
              {...{ showDropdown, setShowDropdown, handleKeyDown }}
              setDataValue={setItemAdd}
              selectedValue={itemadd}
            />
          </div>
          {/* )} */}
          <div className="item_inputs d-flex pt-2 px-0">
            <div className="col-6">Type</div>
            <SearchDropDown
              id="types"
              setNew={addOption}
              options={listItem}
              {...{ showDropdown, setShowDropdown, handleKeyDown }}
              setDataValue={setItemAdd}
              selectedValue={itemadd}
            />
          </div>
          {/* {permissions.includes(1008) && ( */}
          <div className="item_inputs d-flex pt-2 px-0">
            <div className="col-6">Category</div>
            <div className="col-6 px-0">
              <SearchDropDown
                id="category"
                // noAdd={!permissions.includes(1009)}
                // isEditable={!permissions.includes(1010)}
                setNew={addOption}
                options={listItem}
                {...{ showDropdown, setShowDropdown, handleKeyDown }}
                setDataValue={setItemAdd}
                selectedValue={itemadd}
              />
            </div>
          </div>
          {/* )} */}
          {/* {permissions.includes(1011) && ( */}
          <div className="item_inputs d-flex pt-2 px-0">
            <div className="col-6">Sub Category</div>
            <div className="col-6 px-0">
              <SearchDropDown
                id="sub_category"
                // noAdd={!permissions.includes(1012)}
                // isEditable={!permissions.includes(1013)}
                setNew={addOption}
                options={listItem}
                {...{ showDropdown, setShowDropdown, handleKeyDown }}
                setDataValue={setItemAdd}
                selectedValue={itemadd}
              />
            </div>
          </div>
          {/* )} */}
          {/* {permissions.includes(1014) && ( */}
          <div className="item_inputs d-flex pt-2 px-0">
            <div className="col-6">Company*</div>
            <div className="col-6 px-0">
              <SearchDropDown
                id="company"
                // noAdd={!permissions.includes(1015)}
                // isEditable={!permissions.includes(1016)}
                addNew={true}
                setNew={addOption}
                options={listItem}
                {...{ showDropdown, setShowDropdown, handleKeyDown }}
                setDataValue={setItemAdd}
                selectedValue={itemadd}
              />
            </div>
          </div>
          {/* )} */}

          <div className="item_inputs row mx-0 px-0 col-12 pt-2">
            {/* {permissions.includes(1017) && ( */}
            <>
              <div className="col-2 col-3 px-0">Size</div>
              <div className="col-3 col-4 px-0">
                <SearchDropDown
                  id="size"
                  // noAdd={!permissions.includes(1018)}
                  // isEditable={!permissions.includes(1019)}
                  setNew={addOption}
                  options={listItem}
                  {...{ showDropdown, setShowDropdown, handleKeyDown }}
                  setDataValue={setItemAdd}
                  selectedValue={itemadd}
                />
              </div>
            </>
            {/* )} */}
            {/* {permissions.includes(1020) && ( */}
            <>
              <div className="col-2 col-3 px-0 ps-3">Color</div>
              <div className="col-3 col-4 px-0">
                <SearchDropDown
                  // noAdd={!permissions.includes(1021)}
                  // isEditable={!permissions.includes(1022)}
                  id="color"
                  addNew={true}
                  setNew={addOption}
                  options={listItem}
                  {...{ showDropdown, setShowDropdown, handleKeyDown }}
                  setDataValue={setItemAdd}
                  selectedValue={itemadd}
                />
              </div>
            </>
            {/* )} */}
          </div>
          {/* </div> */}

          <div className="item_inputs row mx-0 px-0 col-12 pt-2">
            {/* {permissions.includes(1023) && ( */}
            <>
              <div className="col-2 col-3 px-0">Group</div>
              <div className="col-3 col-4 px-0">
                <SearchDropDown
                  // noAdd={!permissions.includes(1024)}
                  // isEditable={!permissions.includes(1025)}
                  id="group"
                  addNew={true}
                  setNew={addOption}
                  options={listItem}
                  {...{ showDropdown, setShowDropdown, handleKeyDown }}
                  setDataValue={setItemAdd}
                  selectedValue={itemadd}
                />
              </div>
            </>
            {/* )} */}
            {/* {permissions.includes(1026)&&<> */}
            <div className="col-2 col-3 px-0 ps-3">Tax Group</div>
            <div className="col-3 col-4 px-0">
              <SearchDropDown
                id="tax_group"
                // noAdd={!permissions.includes(1027)}
                // isEditable={!permissions.includes(1028)}
                addNew={true}
                setNew={addOption}
                options={listItem}
                {...{ showDropdown, setShowDropdown, handleKeyDown }}
                setDataValue={setItemAdd}
                selectedValue={itemadd}
              />
            </div>
            {/* </>} */}
          </div>

          {/* {permissions.includes(1029)&& */}
          <div className="item_inputs d-flex pt-2 px-0">
            <div className="col-6">Godown/Rack</div>
            <div className="col-6 px-0">
              <SearchDropDown
                id="rack"
                // noAdd={!permissions.includes(1030)}
                // isEditable={!permissions.includes(1031)}
                addNew={true}
                setNew={addOption}
                options={listItem}
                {...{ showDropdown, setShowDropdown, handleKeyDown }}
                setDataValue={setItemAdd}
                selectedValue={itemadd}
              />
            </div>
          </div>
          {/* } */}
          <div className="item_inputs d-flex pt-2 px-0">
            <div className="col-6">Stock Unit*</div>
            <div className="col-6 px-0">
              <SearchDropDown
                // noAdd={!permissions.includes(1033)}
                // isEditable={!permissions.includes(1034)}
                required
                id="unit"
                addNew={true}
                defaultSelected
                setNew={addOption}
                options={listItem}
                {...{ showDropdown, setShowDropdown, handleKeyDown }}
                setDataValue={setItemAdd}
                selectedValue={itemadd}
              />
            </div>
          </div>
          <div className="item_inputs d-flex pt-2 px-0">
            <div className="col-6">Transaction Unit*</div>
            <div className="col-6 px-0">
              <SearchDropDown
                required
                id="transaction_unit"
                noAdd={true}
                defaultSelected
                setNew={addOption}
                options={listItem}
                {...{ showDropdown, setShowDropdown, handleKeyDown }}
                setDataValue={setItemAdd}
                selectedValue={itemadd}
              />
            </div>
          </div>
        </div>

        {/* item rate ----------------------------------------------------------------------------------------------------------- */}

        <div className="item_add_form_part2 row mx-0 px-0 me-0 col-6 border-0">
          <div className="item_add_first_row d-flex justify-content-between px-0 row mx-0 pt-2">
            <div className="item_inputs right d-flex mx-0 px-0 col-6">
              MRP
              <input
                onKeyDown={handleKeyDown}
                value={itemadd.mrp_rate ? itemadd.mrp_rate : ""}
                type="number"
                className="item_input col-6 col-7"
                name="mrp_rate"
                onChange={handleChange}
              />
            </div>
            <div className="item_inputs right d-flex px-0 col-6 ">
              Sales. Rate
              <input
                onKeyDown={handleKeyDown}
                value={itemadd.retail_rate ? itemadd.retail_rate : ""}
                type="number"
                className="item_input col-6 col-7"
                name="retail_rate"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="item_add_first_row px-0 row mx-0 pt-2">
            <div className="item_inputs right d-flex mx-0 px-0 col-6">
              WS
              <input
                onKeyDown={handleKeyDown}
                value={itemadd.wholesale_rate ? itemadd.wholesale_rate : ""}
                type="number"
                className="item_input col-6 col-7"
                name="wholesale_rate"
                onChange={handleChange}
              />
            </div>
            <div className="item_inputs right d-flex px-0 col-6 ">
              SWS. Rate
              <input
                onKeyDown={handleKeyDown}
                value={
                  itemadd.super_wholesale_rate
                    ? itemadd.super_wholesale_rate
                    : ""
                }
                type="number"
                className="item_input col-6 col-7"
                name="super_wholesale_rate"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="item_add_first_row px-0 row mx-0 pt-2">
            <div className="item_inputs right d-flex px-0 col-6 ">
              Rent
              <input
                onKeyDown={handleKeyDown}
                value={itemadd.rent ? itemadd.rent : ""}
                type="number"
                className="item_input col-6 col-7"
                name="rent"
                onChange={handleChange}
              />
            </div>
            <div className="item_inputs right d-flex mx-0 px-0 col-6">
              Rent Type
              <div className="item-input col-6 col-7">
                <SearchDropDown
                  id="rent_type"
                  addNew={true}
                  setNew={addOption}
                  options={listItem}
                  noAdd={true}
                  {...{ showDropdown, setShowDropdown, handleKeyDown }}
                  setDataValue={setItemAdd}
                  selectedValue={itemadd}
                />
              </div>
            </div>
          </div>
          <div className="item_add_first_row px-0 row mx-0 pt-2">
            <div className="item_inputs right d-flex mx-0 px-0 col-6">
              P.Rate
              <input
                onKeyDown={handleKeyDown}
                value={itemadd.purchase_rate ? itemadd.purchase_rate : ""}
                type="number"
                className="item_input col-6 col-7"
                name="purchase_rate"
                onChange={handleChange}
              />
            </div>
            <div className="item_inputs right d-flex px-0 col-6 ">
              Cost
              <input
                onKeyDown={handleKeyDown}
                value={itemadd.cost || ""}
                type="number"
                className="item_input col-6 col-7"
                name="cost"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="item_add_first_row px-0 row mx-0 pt-2">
            <div className="item_inputs right d-flex mx-0 px-0 col-6">
              Margin %
              <input
                onKeyDown={handleKeyDown}
                value={itemadd.margin ? itemadd.margin : ""}
                type="number"
                className="item_input col-6 col-7"
                name="margin"
                onChange={handleChange}
              />
            </div>
            <div className="item_inputs right d-flex px-0 col-6 ">
              Tax/ GST %
              <input
                onKeyDown={handleKeyDown}
                value={itemadd.tax_gst ? itemadd.tax_gst : ""}
                type="number"
                className="item_input col-6 col-7"
                name="tax_gst"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="item_add_first_row px-0 row mx-0 pt-2">
            <div className="item_inputs right d-flex mx-0 px-0 col-6">
              Cess1
              <input
                onKeyDown={handleKeyDown}
                value={itemadd.cess_1 ? itemadd.cess_1 : ""}
                type="number"
                className="item_input col-6 col-7"
                name="cess_1"
                onChange={handleChange}
              />
            </div>
            <div className="item_inputs right d-flex px-0 col-6 ">
              Cess2
              <input
                onKeyDown={handleKeyDown}
                value={itemadd.cess_2 ? itemadd.cess_2 : ""}
                type="number"
                className="item_input col-6 col-7"
                name="cess_2"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="item_add_first_row px-0 row mx-0 pt-2">
            <div className="item_inputs right d-flex mx-0 px-0 col-6">
              P.Disc
              <input
                onKeyDown={handleKeyDown}
                value={
                  itemadd.purchase_discount ? itemadd.purchase_discount : ""
                }
                type="number"
                className="item_input col-6 col-7"
                name="purchase_discount"
                onChange={handleChange}
              />
            </div>
            <div className="item_inputs right d-flex px-0 col-6 ">
              S.Disc
              <input
                onKeyDown={handleKeyDown}
                value={itemadd.sale_discount ? itemadd.sale_discount : ""}
                type="number"
                className="item_input col-6 col-7"
                name="sale_discount"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="item_add_first_row px-0 row mx-0 pt-2">
            <div className="item_inputs right d-flex mx-0 px-0 col-6">
              UnLd. Charge
              <input
                onKeyDown={handleKeyDown}
                value={itemadd.unload_charge ? itemadd.unload_charge : ""}
                type="number"
                className="item_input col-6 col-7"
                name="unload_charge"
                onChange={handleChange}
              />
            </div>
            <div className="item_inputs right d-flex mx-0 px-0 col-6">
              QTN
              <input
                onKeyDown={handleKeyDown}
                value={itemadd.quotation_rate ? itemadd.quotation_rate : ""}
                type="number"
                className="item_input col-6 col-7"
                name="quotation_rate"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="item_add_first_row px-0 row mx-0 pt-2">
            <div className="item_inputs right d-flex mx-0 px-0 col-6">
              Ld. Charge
              <input
                onKeyDown={handleKeyDown}
                value={itemadd.load_charge ? itemadd.load_charge : ""}
                type="number"
                className="item_input col-6 col-7"
                name="load_charge"
                onChange={handleChange}
              />
            </div>
            <div className="item_inputs right d-flex px-0 col-6 ">
              Cmsn %
              <input
                onKeyDown={handleKeyDown}
                value={itemadd.commission ? itemadd.commission : ""}
                type="number"
                className="item_input col-6 col-7"
                name="commission"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="item_add_first_row px-0 row mx-0 pt-2">
            <div className="item_inputs right d-flex mx-0 px-0 col-6">
              Qty in Box
              <input
                onKeyDown={handleKeyDown}
                value={itemadd.qty_in_box ? itemadd.qty_in_box : ""}
                type="number"
                className="item_input col-6 col-7"
                name="qty_in_box"
                onChange={handleChange}
              />
            </div>
            <div className="item_inputs right d-flex px-0 col-6 ">
              Op. Stock
              <input
                onKeyDown={handleKeyDown}
                value={itemadd.open_stock ? itemadd.open_stock : ""}
                type="number"
                className="item_input col-6 col-7"
                name="open_stock"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="item_add_first_row px-0 row mx-0 pt-2">
            <div className="item_inputs right d-flex mx-0 px-0 col-6">
              Dmge
              <input
                onKeyDown={handleKeyDown}
                value={itemadd.damage ? itemadd.damage : ""}
                type="number"
                className="item_input col-6 col-7"
                name="damage"
                onChange={handleChange}
              />
            </div>
            <div className="item_inputs right d-flex px-0 col-6 ">
              Dmg. Cost
              <input
                onKeyDown={handleKeyDown}
                value={itemadd.damage_cost ? itemadd.damage_cost : ""}
                type="number"
                className="item_input col-6 col-7"
                name="damage_cost"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="item_add_first_row px-0 row mx-0 pt-2">
            <div className="item_inputs right d-flex mx-0 px-0 col-6">
              Role
              <input
                onKeyDown={handleKeyDown}
                value={itemadd.role ? itemadd.role : ""}
                type="number"
                className="item_input col-6 col-7"
                name="role"
                onChange={handleChange}
              />
            </div>
            <div className="item_inputs right d-flex px-0 col-6 ">
              Point
              <input
                onKeyDown={handleKeyDown}
                value={itemadd.point ? itemadd.point : ""}
                type="number"
                className="item_input col-6 col-7"
                name="point"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="pt-3 d-flex justify-content-between w-100">
        <div className="col-6">
          {/* {permissions.includes(1035)&& */}
          <div
            onClick={() => setPopup("unit")}
            className="btn bg-secondary text-light col-5 text-start px-3 py-1 me-4 ms-0"
          >
            Unit Conversion
          </div>
          {/* } */}
          {/* {permissions.includes(1039)&& */}
          <div
            onClick={() => setPopup("barcode")}
            className="btn bg-secondary text-light col-5 text-start px-3 py-1"
          >
            BarCode
          </div>
          <div
            onClick={() => setPopup("batch")}
            className="btn bg-secondary text-light col-5 text-start mt-2 px-3 py-1"
          >
            Add Batch
          </div>
          {/* } */}
        </div>
        <div className="d-flex flex-column align-items-end">
          <div className="checkbox col-6">
            <div className="checkbox_container">
              <div className="item_add_check  d-flex align-item-center">
                <input
                  onKeyDown={handleKeyDown}
                  onChange={handleCheck}
                  type="checkbox"
                  checked={itemadd.blocked}
                  name="blocked"
                  value={itemadd.blocked ? itemadd.blocked : ""}
                />
                <label>Blocked</label>
              </div>
              <div className="item_add_check  d-flex align-item-center">
                <input
                  onKeyDown={handleKeyDown}
                  onChange={handleCheck}
                  type="checkbox"
                  checked={itemadd.manuel_qty_in_bc}
                  name="manuel_qty_in_bc"
                  value={
                    itemadd.manuel_qty_in_bc ? itemadd.manuel_qty_in_bc : ""
                  }
                />
                <label>Manual Qty in Box</label>
              </div>
            </div>
            <div className="checkbox_container">
              <div className="item_add_check  d-flex align-item-center">
                <input
                  onKeyDown={handleKeyDown}
                  onChange={handleCheck}
                  type="checkbox"
                  checked={itemadd.gate_pass}
                  name="gate_pass"
                  value={itemadd.gate_pass ? itemadd.gate_pass : ""}
                />
                <label>Gate Pass</label>
              </div>
              <div className="item_add_check  d-flex align-item-center">
                <input
                  onKeyDown={handleKeyDown}
                  onChange={handleCheck}
                  type="checkbox"
                  checked={itemadd.tax_inclusive}
                  name="tax_inclusive"
                  value={itemadd.tax_inclusive ? itemadd.tax_inclusive : ""}
                />
                <label>Tax Inclusive</label>
              </div>
            </div>
            <div className="checkbox_container">
              <div className="item_add_check  d-flex align-item-center">
                <input
                  onKeyDown={handleKeyDown}
                  onChange={handleCheck}
                  type="checkbox"
                  checked={itemadd.rent_item}
                  name="rent_item"
                  value={itemadd.rent_item ? itemadd.rent_item : ""}
                />
                <label>Rent Item</label>
              </div>
              <div className="item_add_check  d-flex align-item-center">
                <input
                  onKeyDown={handleKeyDown}
                  onChange={handleCheck}
                  type="checkbox"
                  checked={itemadd.blocked}
                  name="blocked"
                  value={itemadd.blocked ? itemadd.blocked : ""}
                />
                <label>Repeat</label>
              </div>
            </div>
          </div>
          <div className="d-flex w-100 gap-3 justify-content-end mt-2">
            <div className="col-5 px-0">
              <div onClick={handleReset} className="clear-btn btn">
                Clear
              </div>
            </div>
            <div className="col-5 px-0">
              <button
                disabled={submitLoading}
                type="submit"
                className="add-btn btn"
              >
                {edit ? "Update" : "Submit"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        contentClassName="unit_modal px-0 bg-dark"
        dialogClassName="d-flex justify-content-center"
        show={popup}
        size={popup ? "xl" : "lg"}
        centered
        onHide={() => setPopup(false)}
      >
        <Modal.Body>
          <ItemPopup
            {...{
              popup,
              handleChange,
              popupInput,
              popupList,
              setPopupInput,
              setPopupList,
              setPopup,
            }}
          />
        </Modal.Body>
      </Modal>
    </form>
  );
};

import React, { useEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { Dropdown } from "semantic-ui-react";
import { MdBorderColor, MdDelete } from "react-icons/md";
import { RiAddBoxFill } from "react-icons/ri";
import Swal from "sweetalert2";
import useItemServices from "../../../../services/master/itemServices";
import editBtn from "../../../../assets/icons/edit-black.svg";
import useProductionServices from "../../../../services/master/productionServices";
import useOnKey from "../../../../hooks/onKeyFunct/onKeyFunct";
const MaterialCompositionOfProduct = (props) => {
  const {
    typeList,
    allItem,
    allRaw,
    unitList,
    bankAccList,
    allPropertiesTypes,
    editComposition,
    setEditComposition,
  } = props;
  const [itemQuantity, setItemQuantity] = useState("");
  const [itemQuantityUnit, setItemQuantityUnit] = useState("");
  const [rawQuantity, setRawQuantity] = useState("");
  const [byproductQuantity, setByProductQuantity] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedRaw, setSelectedRaw] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [selectedByProduct, setSelectedByProduct] = useState("");
  const [selectedByProductUnit, setSelectedByProductUnit] = useState("");
  const [rawList, setRawList] = useState([]);
  const [byProductList, setByproductList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);
  const [show, setShow] = useState(false);
  const { postProperty, putProperty } = useItemServices();
  const [typeData, SetTypeData] = useState("");
  const [edit, setEdit] = useState(false);
  const [selectDebitAccount, setSelectedDebitAccount] = useState("");
  const [selectCreditAccount, setSelectedCreditAccount] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");

  const [ref1, setRef1] = useState();
  const [ref2, setRef2] = useState();
  const [ref3, setRef3] = useState();
  const [ref4, setRef4] = useState();

  const [handleKeyDown1 , formRef1] = useOnKey(ref1, setRef1)
  const [handleKeyDown2 , formRef2] = useOnKey(ref2, setRef2)
  const [handleKeyDown3 , formRef3] = useOnKey(ref3, setRef3)
  const [handleKeyDown4 , formRef4] = useOnKey(ref4, setRef4)


  const handleByProductAdd = () => {
    let tempList = [...byProductList];
    let tempData = {
      fk_item: selectedByProduct,
      qty: byproductQuantity,
      fk_unit: selectedByProductUnit,
    };
    tempList.push(tempData);
    setByproductList([...tempList]);
    setSelectedByProduct("");
    setSelectedByProductUnit("");
    setByProductQuantity("");
  };

  const handleRawAdd = () => {
    let tempList = [...rawList];
    let tempData = {
      fk_item: selectedRaw,
      qty: rawQuantity,
      fk_unit: selectedUnit,
    };
    tempList.push(tempData);
    setRawList([...tempList]);
    setSelectedRaw("");
    setSelectedUnit("");
    setRawQuantity("");
  };

  const handleExpenseAdd = () => {
    let tempList = [...expenseList];
    let tempData = {
      fk_debit_account: selectDebitAccount,
      fk_credit_account: selectCreditAccount,
      amount: expenseAmount,
    };
    tempList.push(tempData);
    setExpenseList([...tempList]);
    setSelectedCreditAccount("");
    setSelectedDebitAccount("");
    setExpenseAmount("");
  };

  const handleDropdownChangeDebitAccount = (event, data) => {
    setSelectedDebitAccount(data.value);
  };

  const handleDropdownChangeCreditAccount = (event, data) => {
    setSelectedCreditAccount(data.value);
  };

  const handleDropdownChangeType = (event, data) => {
    setSelectedType(data.value);
  };
  const handleDropdownChangeItem = (event, data) => {
    let filtered_data=data.options.filter((item)=>item.value == data.value)[0];
    setSelectedItem(data.value);
    setItemQuantityUnit(filtered_data?.fk_unit?filtered_data?.fk_unit:null);
  };

  const handleDropdownChangeRaw = (event, data) => {
    let filtered_data=data.options.filter((item)=>item.value == data.value)[0];
    setSelectedRaw(data.value);
    setSelectedUnit(filtered_data?.fk_unit?filtered_data?.fk_unit:null);
  };
  const handleDropdownChangeUnit = (event, data) => {
    setSelectedUnit(data.value);
  };
  const handleDropdownChangeByProduct = (event, data) => {
    let filtered_data=data.options.filter((item)=>item.value == data.value)[0];
    setSelectedByProduct(data.value);
    setSelectedByProductUnit(filtered_data?.fk_unit?filtered_data?.fk_unit:null);
  };
  const handleDropdownChangeByProductUnit = (event, data) => {
    setSelectedByProductUnit(data.value);
  };
  const handleDropdownItemQuantityUnit = (event, data) => {
    setItemQuantityUnit(data.value);
  };

  const handleTypeAdd = async () => {
    try {
      if (edit) {
        let submitData = {
          id: edit,
          property_value: typeData,
          property_type: "composition_type",
        };
        let result = await putProperty(submitData, edit);
        if (result?.success) {
          Swal.fire("Option Updated Successfylly", "", "success");
          setEdit(false);
        } else {
          Swal.fire(result?.message, "", "error");
        }
        allPropertiesTypes();
        SetTypeData("");
      } else {
        let submitData = {
          property_value: typeData,
          property_type: "composition_type",
        };
        let result = await postProperty(submitData);
        if (result?.success) {
          Swal.fire("Option Added Successfylly", "", "success");
        } else {
          Swal.fire(result?.message, "", "error");
        }
        allPropertiesTypes();
        SetTypeData("");
      }
    } catch (err) {
      Swal.fire(err?.response?.data?.message, "", "error");
    }
  };

  const handleEdit = (data) => {
    console.log(data.id);
    setEdit(data.id);
    SetTypeData(data.property_value);
  };

  const handleClose = () => {
    setShow(false);
    setEdit(false);
  };
  const { postMaterialComposition, putMaterialComposition } =
    useProductionServices();

  useEffect(() => {
    setSelectedItem(editComposition?.fk_item);
    setSelectedType(editComposition?.fk_type);
    setItemQuantity(editComposition?.qty);
    setItemQuantityUnit(editComposition?.fk_unit);
    setRawList(editComposition?.raw_materials || []);
    setByproductList(editComposition?.by_products || []);
    setExpenseList(editComposition?.expense_accounts || []);
  }, [editComposition]);

  const handleMaterialSave = async () => {
    if (editComposition) {
      let id = editComposition.id;
      let submitData = {
        fk_item: selectedItem,
        fk_type: selectedType,
        qty: itemQuantity,
        fk_unit: itemQuantityUnit,
        raw_materials: rawList,
        by_products: byProductList,
        expense_accounts: expenseList,
      };
      let response = await putMaterialComposition(id, submitData);
      if (response.success) {
        Swal.fire("Material Composition Updated Successfully", "", "success");
        setSelectedItem("");
        setSelectedType("");
        setItemQuantity("");
        setItemQuantityUnit("");
        setRawList([]);
        setByproductList([]);
        setExpenseList([]);
        setEditComposition(false);
      } else {
        Swal.fire(response?.message, "", "error");
      }
    } else {
      let submitData = {
        fk_item: selectedItem,
        fk_type: selectedType,
        qty: itemQuantity,
        fk_unit: itemQuantityUnit,
        raw_materials: rawList,
        by_products: byProductList,
        expense_accounts: expenseList,
      };
      let response = await postMaterialComposition(submitData);
      if (response.success) {
        Swal.fire("Material Composition Added Successfully", "", "success");
        setSelectedItem("");
        setSelectedType("");
        setItemQuantity("");
        setItemQuantityUnit("");
        setRawList([]);
        setByproductList([]);
        setExpenseList([]);
      } else {
        Swal.fire(response?.message, "", "error");
      }
    }
  };
  const handleMaterialClear = () => {
    Swal.fire("Material Composition Cleared", "", "info");
    setSelectedItem("");
    setSelectedType("");
    setItemQuantity("");
    setItemQuantityUnit("");
    setRawList([]);
    setByproductList([]);
    setExpenseList([]);
  };

  const search = (options, searchValue) => {
    searchValue = searchValue.toUpperCase();
    return options.filter((option) => {
      return (
        option?.value?.toString()?.includes(searchValue) ||
        option?.text?.toString()?.includes(searchValue)
      );
    });
  };

  const handleKeyDownRawadd =(e)=>{
    if(e?.keyCode === 13){
      handleKeyDown2(e)
      handleRawAdd()
    }
  }

  const handleKeyDownByproductAdd =(e)=>{
    if(e?.keyCode === 13){
      handleByProductAdd()
      handleKeyDown3(e)
    }
  }

  const handleKeyDownExpenseAdd =(e)=>{
    if(e?.keyCode === 13){
      handleExpenseAdd()
      handleKeyDown4(e)
    }
  }
  return (
    <div className="px-0 row">
      <div className="col-12">
        <div className="row mx-5 px-0 rounded  " style={{backgroundColor:'#a6c4fd'}} ref={formRef1} >
          
          <div className="col-3 border-2 px-0 ps-2">
            <Form.Group className="row ps-0 mx-0 d-flex align-items-center mb-1">
            <div className="col-2 pe-4 ">Item:</div>
              <div className="col-10 mx-0  d-flex align-items-center mt-1">
                <Dropdown
                  clearable
                  selection
                  required
                  search={search}
                  onKeyDown={handleKeyDown1}
                  onChange={handleDropdownChangeItem}
                  className="purchase-input-text table-drop d-flex align-items-center py-0 form-control custom-dropdown-width"
                  name="item"
                  placeholder="select"
                  value={selectedItem}
                  options={allItem}
                />
              </div>
            </Form.Group>
          </div>
          <div className="col-3 border-2 px-0">
            <Form.Group className="row ps-0 mx-0 d-flex align-items-center">
              <div className="col-2 pe-5 ps-2 ">Qty:</div>
              <div className="col-2 me-1 px-0 mt-1">
                <input
                  type="text"
                  className="rounded-1 border-1 w-100 custom-text"
                  style={{'border': '1px solid #abc9ff'}}
                  value={itemQuantity}
                  onKeyDown={handleKeyDown1}
                  onChange={(e) => setItemQuantity(e.target.value)}
                />
              </div>
              <div className="col-4 px-0 mt-1">
              <Dropdown
                clearable
                selection
                required
                search={search}
                onKeyDown={handleKeyDown1}
                onChange={handleDropdownItemQuantityUnit}
                className="purchase-input-text table-drop d-flex align-items-center py-0 form-control w-50 custom-dropdown-width"
                name="code"
                placeholder="select"
                value={itemQuantityUnit}
                options={unitList}
                />
                </div>
                <div className="col-2 ps-5">Type:</div>
            </Form.Group>
          </div>
          <div className="col-3 border-2 px-0">
            <Form.Group className="row  ps-0 mx-0 d-flex align-items-center">
              <div className="col-6 mx-0 d-flex align-items-center mt-1">
                <Dropdown
                  clearable
                  selection
                  required
                  search={search}
                  onKeyDown={handleKeyDown1}
                  onChange={handleDropdownChangeType}
                  className="purchase-input-text table-drop d-flex align-items-center py-0 w-100 form-control custom-dropdown-width"
                  name="type"
                  placeholder="Select"
                  value={selectedType}
                  options={typeList}
                />
                <div>
                  <RiAddBoxFill
                    size={25}
                    className="rounded-5 "
                    onClick={() => setShow(true)}
                  />
                </div>
              </div>
            </Form.Group>
          </div>
        </div>

        <div className="row mx-0 d-flex mt-2">
          <div
            className="col-6 px-0 ms-0 ps-5 pe-1"
            style={{ height: "200px", overflowY: "scroll" }}
            
          >
            <div
              className="mx-0 TabHead text-center border-bottom border-light border-2 w-100 py-1  text-dark  rounded-top"
              style={{ top: "0", position: "sticky", zIndex: 1 ,backgroundColor:'#abc9ff' }}
            >
             <b>Quantity of a material used</b>
            </div>
            <table className="materials w-100 rounded-bottom">
              <thead className="text-light">
                <tr>
                  <th width='70%' className="text-start ps-3">Raw material</th>
                  <th width='10%'>Qty</th>
                  <th width='10%'>Unit</th>
                  <th width='10%'></th>
                </tr>
              </thead>
              <tbody ref={formRef2}>
                {rawList?.length > 0 &&
                  rawList.map((data, key) => {
                    const handleRawDelete = () => {
                      let tempList = [...rawList];
                      tempList.splice(key, 1);
                      setRawList([...tempList]);
                    };
                    const handleRawEdit = (e, drop_data) => {
                      if (drop_data)
                        data = { ...data, [drop_data.name]: drop_data.value };
                      else data = { ...data, [e.target.name]: e.target.value };
                      let tempList = [...rawList];
                      tempList.splice(key, 1, data);
                      setRawList([...tempList]);
                    };
                    return (
                      <tr key={key}>
                        <td>
                          <Dropdown
                            clearable
                            selection
                            required
                            search={search}
                            onKeyDown={handleKeyDown2}
                            onChange={handleRawEdit}
                            className="purchase-input-text table-drop d-flex align-items-center py-0 form-control custom-dropdown-width w-100"
                            name="fk_item"
                            placeholder="select"
                            value={data.fk_item}
                            options={allRaw}
                          />
                        </td>
                        <td>
                          <input
                            name="qty"
                            type="text"
                            value={data.qty}
                            onChange={handleRawEdit}
                            onKeyDown={handleKeyDown2}
                            className="rounded-1  border-0 w-100 custom-text"
                          />
                        </td>
                        <td>
                          <Dropdown
                            clearable
                            selection
                            required
                            search={search}
                            onKeyDown={handleKeyDown2}
                            onChange={handleRawEdit}
                            className="purchase-input-text table-drop d-flex align-items-center py-0 form-control  custom-dropdown-width"
                            name="fk_unit"
                            placeholder="select"
                            value={data.fk_unit}
                            options={unitList}
                          />
                        </td>
                        <td>
                          <MdDelete size={20} onClick={handleRawDelete} />
                        </td>
                      </tr>
                    );
                  })}
                <tr>
                  <td>
                    <Dropdown
                      clearable
                      selection
                      required
                      search={search}
                      onKeyDown={handleKeyDown2}
                      onChange={handleDropdownChangeRaw}
                      className="purchase-input-text table-drop d-flex align-items-center py-0 form-control border-light  custom-dropdown-width"
                      name="code"
                      placeholder="select"
                      value={selectedRaw}
                      options={allRaw}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={rawQuantity}
                      onKeyDown={handleKeyDown2}
                      onChange={(e) => setRawQuantity(e.target.value)}
                      className="rounded-1  border-0 w-100 custom-text"
                    />
                  </td>
                  <td>
                    <Dropdown
                      clearable
                      selection
                      required
                      search={search}
                      onKeyDown={handleKeyDownRawadd}
                      onChange={handleDropdownChangeUnit}
                      className="purchase-input-text table-drop d-flex align-items-center py-0 form-control  custom-dropdown-width"
                      name="code"
                      placeholder="select"
                      value={selectedUnit}
                      options={unitList}
                    />
                  </td>
                  <td>
                    <RiAddBoxFill size={20} onClick={handleRawAdd} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            className="col-6  px-0 ps-1 pe-5"
            style={{ height: "200px", overflowY: "scroll" }}            
          >
            <div
              className="mx-0 TabHead text-center  border-bottom border-light border-2 py-1 w-100 text-dark  rounded-top"
              style={{ top: "0", position: "sticky", zIndex: 1 ,backgroundColor:'#abc9ff' }}
            >
              <b>Byproduct of the production</b>
            </div>
            <table className="materials w-100 rounded-bottom">
              <thead className="text-light">
                <tr>
                  <th width='70%' className="text-start ps-3">Item Name</th>
                  <th  width='10%'>Qty</th>
                  <th  width='10%'>Unit</th>
                  <th width='10%'></th>
                </tr>
              </thead>
              <tbody ref={formRef3}>
                {byProductList?.length > 0 &&
                  byProductList.map((data, key) => {
                    const handleByProductDelete = () => {
                      let tempList = [...byProductList];
                      tempList.splice(key, 1);
                      setByproductList([...tempList]);
                    };

                    const handleByProductEdit = (e, drop_data) => {
                      if (drop_data)
                        data = { ...data, [drop_data.name]: drop_data.value };
                      else data = { ...data, [e.target.name]: e.target.value };
                      let tempList = [...rawList];
                      tempList.splice(key, 1, data);
                      setByproductList([...tempList]);
                    };
                    return (
                      <tr key={key}>
                        <td>
                          <Dropdown
                            clearable
                            selection
                            required
                            search={search}
                            onKeyDown={handleKeyDown3}
                            onChange={handleByProductEdit}
                            className="purchase-input-text table-drop d-flex align-items-center py-0 form-control  custom-dropdown-width"
                            name="fk_item"
                            placeholder="select"
                            value={data.fk_item}
                            options={allItem}
                          />
                        </td>
                        <td>
                          <input
                            name="qty"
                            type="text"
                            value={data.qty}
                            onKeyDown={handleKeyDown3}
                            onChange={handleByProductEdit}
                            className="rounded-1  border-0 w-100 custom-text"
                          />
                        </td>
                        <td>
                          <Dropdown
                            clearable
                            selection
                            required
                            search={search}
                            onKeyDown={handleKeyDown3}
                            onChange={handleByProductEdit}
                            className="purchase-input-text table-drop d-flex align-items-center py-0 form-control  custom-dropdown-width"
                            name="fk_unit"
                            placeholder="select"
                            value={data.fk_unit}
                            options={unitList}
                          />
                        </td>
                        <td>
                          <MdDelete size={20} onClick={handleByProductDelete} />
                        </td>
                      </tr>
                    );
                  })}
                <tr>
                  <td>
                    <Dropdown
                      clearable
                      selection
                      required
                      search={search}
                      onKeyDown={handleKeyDown3}
                      onChange={handleDropdownChangeByProduct}
                      className="purchase-input-text table-drop d-flex align-items-center py-0 form-control  custom-dropdown-width"
                      name="code"
                      placeholder="select"
                      value={selectedByProduct}
                      options={allItem}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={byproductQuantity}
                      onKeyDown={handleKeyDown3}
                      onChange={(e) => setByProductQuantity(e.target.value)}
                      className="rounded-1  border-0 w-100 custom-text"
                    />
                  </td>
                  <td>
                    <Dropdown
                      clearable
                      selection
                      required
                      search={search}
                      onKeyDown={handleKeyDownByproductAdd}
                      onChange={handleDropdownChangeByProductUnit}
                      className="purchase-input-text table-drop d-flex align-items-center py-0 form-control  custom-dropdown-width"
                      name="code"
                      placeholder="select"
                      value={selectedByProductUnit}
                      options={unitList}
                    />
                  </td>
                  <td>
                    <RiAddBoxFill size={20} onClick={handleByProductAdd} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div
          className="col-12 px-5 mt-2"
          style={{ height: "120px", overflowY: "scroll" }}
          
        >
          <div
            className="mx-0 text-light  ps-4 py-1 w-100  rounded-top"
            style={{
              backgroundColor: "#51385D",
              position: "sticky",
              top: 0,
              zIndex: 2,
            }}
          >
           <b>Labour and Expenses</b> 
          </div>
          <table className="materialsub w-100 border border-bottom " >
            <thead className="text-light">
              <tr>
                <th width='40%'>Debit Account</th>
                <th width='5%'>Amount</th>
                <th width='40%'>Credit Account</th>
                <th width='15%'></th>
              </tr>
            </thead>
            <tbody ref={formRef4}>
              {expenseList?.length > 0 &&
                expenseList.map((data, key) => {

                  const handleExpenseDelete = () => {
                    let tempList = [...expenseList];
                    tempList.splice(key, 1);
                    setExpenseList([...tempList]);
                  };

                  const handleExpenseEdit = (e, drop_data) => {
                    if (drop_data)
                      data = { ...data, [drop_data.name]: drop_data.value };
                    else data = { ...data, [e.target.name]: e.target.value };
                    let tempList = [...expenseList];
                    tempList.splice(key, 1, data);
                    setExpenseList([...tempList]);
                  };
                  return (
                    <tr key={key}>
                      <td>
                        <Dropdown
                          clearable
                          selection
                          required
                          search={search}
                          onKeyDown={handleKeyDown4}
                          onChange={handleExpenseEdit}
                          className="purchase-input-text table-drop d-flex align-items-center py-0 form-control custom-dropdown-width "
                          name="fk_debit_account"
                          placeholder="select"
                          value={data.fk_debit_account}
                          options={bankAccList}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="rounded-1  border-0 w-100 custom-text"
                          onChange={handleExpenseEdit}
                          onKeyDown={handleKeyDown4}
                          value={data.amount}
                          name="amount"
                        />
                      </td>
                      <td>
                        <Dropdown
                          clearable
                          selection
                          required
                          search={search}
                          onKeyDown={handleKeyDown4}
                          onChange={handleExpenseEdit}
                          className="purchase-input-text table-drop d-flex align-items-center py-0 form-control  custom-dropdown-width"
                          name="fk_credit_account"
                          placeholder="select"
                          value={data.fk_credit_account}
                          options={bankAccList}
                        />
                      </td>
                      <td>
                        <MdDelete size={20} onClick={handleExpenseDelete} />
                      </td>
                    </tr>
                  );
                })}
              <tr>
                <td>
                  <Dropdown
                    clearable
                    selection
                    required
                    search={search}
                    onKeyDown={handleKeyDown4}
                    onChange={handleDropdownChangeDebitAccount}
                    className="purchase-input-text table-drop d-flex align-items-center py-0 form-control custom-dropdown-width"
                    name="fk_debit_account"
                    placeholder="select"
                    value={selectDebitAccount}
                    options={bankAccList}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="rounded-1  border-0 w-100 custom-text"
                    onChange={(e) => setExpenseAmount(e.target.value)}
                    value={expenseAmount}
                    onKeyDown={handleKeyDown4}
                    name="amount"
                  />
                </td>
                <td>
                  <Dropdown
                    clearable
                    selection
                    required
                    search={search}
                    onKeyDown={handleKeyDownExpenseAdd}
                    onChange={handleDropdownChangeCreditAccount}
                    className="purchase-input-text table-drop d-flex align-items-center py-0 form-control custom-dropdown-width"
                    name="fk_credit_account"
                    placeholder="select"
                    value={selectCreditAccount}
                    options={bankAccList}
                  />
                </td>
                <td>
                  <RiAddBoxFill size={20} onClick={handleExpenseAdd} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-12 d-flex justify-content-end mt-2 me-5 pe-5">
          <div
            className="btn btn-md mx-1 text-light col-1 col-2 py-1"
            style={{backgroundColor:'#624c6d'}}
            onClick={handleMaterialClear}
          >
            Clear
          </div>
          <div
            className="btn btn-md ms-3 me-1 text-dark col-1 col-2 py-1"
            style={{backgroundColor:'#abc9ff'}}
            onClick={handleMaterialSave}
          >
            Save
          </div>
        </div>
      </div>
      <Modal
        size="md"
        centered
        onHide={handleClose}
        show={show}
        contentClassName="search-dropdown"
      >
        <Modal.Body className="dropdown-body p-0 pb-2">
          <div className="dropdown-header">Add Design</div>
          <div className="px-4 pt-1 w-100">
            <div className="drop-input-cont position-relative align-items-center d-flex mt-2">
              <input
                onChange={(e) => SetTypeData(e.target.value)}
                placeholder="Add category here"
                type="text"
                className="item_input height ms-0 position-relative"
                value={typeData}
              />
              <div onClick={handleTypeAdd} className="btn drop-add-btn">
                {edit !== false ? "Edit" : "Add"}
              </div>
            </div>
            <div className="dropdown-add-items rounded-2 p-2 pb-1 mt-4">
              {typeList?.length > 0 ? (
                typeList.map((item, i) => (
                  <div key={i} className="dropdown-add-item ms-0 mb-2 p-1 px-2">
                    {item.property_value}
                    <img
                      onClick={() => handleEdit(item)}
                      className="cursor"
                      src={editBtn}
                    />
                  </div>
                ))
              ) : (
                <div className="dropdown-add-item ms-0 mb-2 p-1 px-2">
                  No Item Added yet
                </div>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MaterialCompositionOfProduct;

import React, { useState } from "react";
import { Dropdown } from "semantic-ui-react";
import useOnKey from "../../../../hooks/onKeyFunct/onKeyFunct";
import deleteBtn from "../../../../assets/icons/delete.svg";
import { BsPlusSquareFill } from "react-icons/bs";
import { Numbers } from "@mui/icons-material";
const RawMaterials = (props) => {
  const {
    items,
    rawItems,
    setRawItems,
    units,
    setFullProdData,
    produceData,
    fullProdData,
    setProduceData,
    labourDetails,
    // setLabourDetails,
    proList,
    rawData,
    setRawData,
    itemCompleteData
  } = props;

  const [ref1, setRef1] = useState();
  const [handleKeyDown1, formRef1] = useOnKey(ref1, setRef1);

  const search = (options, searchValue) => {
    searchValue = searchValue.toUpperCase();
    return options.filter((option) => {
      return (
        option?.value?.toString()?.includes(searchValue) ||
        option?.text?.toString()?.includes(searchValue)
      );
    });
  };

  const handleDropdownChangeUnit = (event, data) => {
    setRawItems((obj) => ({ ...obj, fk_unit: data.value }));
  };

  const handleDropdownChangeRawUnit = (event, data) => {
    setRawData((obj) => ({ ...obj, fk_unit: data.value }));
  };

  const handleRawItemDropdownProducedItem = (e,data)=>{
    if (data.value!=null){
    let tempName=data?.options?.filter(x=>x.value===data.value)[0]
    setRawData((obj)=>({ ...obj, item_produced_name:tempName?.text,fk_produced_item:data.value}));
    }
  }

  const handleRawItemDropdownChangeItem = (e,data)=>{
  let tempData = data?.options?.filter(x=>x.value==data.value)[0]
  let tempitemData=itemCompleteData.filter(x=>x.id===data.value)[0]
  setRawData((obj)=>({ ...obj, fk_item:data.value ,item_name:tempData?.text,cost:tempitemData?.cost,fk_unit:tempitemData?.fk_unit }));
    // let tempData=data.options.filter(x=>x.value=data.value)[0]
    // console.log(data,tempData.value,tempData.text)
    // setRawData((obj)=>({ ...obj, fk_raw_item:data.value ,raw_item:tempName }));
  }
  const handleQtyChange = (e,rawData)=>{
    setRawData((obj)=>({...obj,qty:e.target.value,value:parseFloat(rawData.cost*e.target.value).toFixed(2)}))
  }
  const handleCostChange = (e,rawData)=>{
    setRawData((obj)=>({...obj,cost:e.target.value,value:parseFloat(e.target.value*rawData.qty).toFixed(2)}))
  }
  const handleValueChange = (e,rawData)=>{
    setRawData((obj)=>({...obj,value:e.target.value,cost:parseFloat(e.target.value/rawData.qty).toFixed(2)}))
  }
  const handleRawDataSubmit = ()=>{
    setRawItems((data)=>[...data,rawData]);
    let raw_data = {
      fk_produced_item:null,
      item_produced_name: null,
      fk_item: null,
      item_name: null,
      qty: null,
      fk_unit: null,
      cost: null,
      value: null,
      godown_rate: null,
    };
    setRawData(raw_data);
  };
  return (
    <div
      className="col-12 mt-1 px-2"
      style={{ height: "149px", overflowY: "scroll" }}
    >
      <div
        className="div-head rounded-top ps-3 pt-1 my-0 py-0 mx-0 px-0"
        style={{ top: "0", position: "sticky", zIndex: 5 }}
      >
        Raw Materials Used
      </div>
      <table className="w-100 ProdTable1">
        <thead>
          <tr className="bg-dark text-light">
            <th width='30%'>Item Produced</th>
            <th width='25%'>Item Used</th>
            <th width='5%'>Qty</th>
            <th width='10%'>Unit</th>
            <th width='5%'>Cost</th>
            <th width='10%'>Value</th>
            <th width='10%'>Godown</th>
            <th width='5%'>
              <span className="pe-1">+</span>
            </th>
          </tr>
        </thead>
        <tbody ref={formRef1}>
          {rawItems?.length > 0 &&
            rawItems?.map((data, key) => {
              const handleChange = (e, drop_data) => {
                let updatedData;
                if (drop_data)
                  updatedData = { ...data, [drop_data.name]: drop_data.value };
                else updatedData = { ...data, [e.target.name]: e.target.value };

                // Update the rawItems array
                let tempList = [...rawItems];
                tempList.splice(key, 1, updatedData);
                setRawItems([...tempList]);

                if (e.target.name != "value") {
                  // Calculate and update the value field based on cost and qty
                  const updatedCost = parseFloat(updatedData.cost || 0);
                  const updatedQty = parseFloat(updatedData.qty || 0);
                  const updatedValue = updatedCost * updatedQty;
                  // const updated_value= parseFloat(updatedData.value||0)
                  // updated_value?updated_cost=updated_value/updatedQty:updated_cost=updatedCost;

                  // Update the value field in the current data object
                  updatedData = { ...updatedData, value: updatedValue };
                } else {
                  const updatedValue = parseFloat(updatedData.value || 0);
                  const updatedQty = parseFloat(updatedData.qty || 0);
                  const updatedCost = updatedValue / updatedQty;
                  updatedData = { ...updatedData, cost: updatedCost };
                }

                // Update the rawItems array again with the modified data
                tempList.splice(key, 1, updatedData);
                setRawItems([...tempList]);
                let r_sum = tempList.reduce(
                  (a, b) =>
                    b.item_produced_name == data.item_produced_name
                      ? +a + +b.value
                      : a,
                  0
                );
                let l_sum = labourDetails.reduce(
                  (a, b) =>
                    b.item_produced_name == data.item_produced_name
                      ? +a + +b.amount
                      : a,
                  0
                );
                if (rawItems?.length > 0) {
                  let tempList = [...fullProdData];
                  let ind = tempList.findIndex(
                    (x) => x.item_name === data.item_produced_name
                  );
                  let tempItem = { ...produceData };
                  if (ind > -1) {
                    tempItem = tempList[ind];
                  }
                  tempItem = {
                    ...tempItem,
                    value: ((l_sum || 0) + r_sum)?.toFixed(2),
                    r_sum: r_sum,
                    cost: (
                      ((tempItem.l_sum || 0) + r_sum) /
                      tempItem.qty
                    )?.toFixed(2),
                    retail_rate:
                      ((l_sum || 0) + r_sum) / tempItem.qty +
                      (((l_sum || 0) + r_sum) / tempItem.qty) *
                        (tempItem.margin / 100),
                  };
                  tempList.splice(ind, 1, tempItem);
                  if (ind > -1) setFullProdData([...tempList]);
                  else setProduceData({ ...tempItem });
                } else
                  setProduceData((data) => ({
                    ...data,
                    value: ((l_sum || 0) + r_sum)?.toFixed(2),
                    r_sum: r_sum,
                    cost: (((l_sum || 0) + r_sum) / data.qty)?.toFixed(2),
                  }));
              };
              const handleDelete = () => {
                let tempList = rawItems || [];
                tempList.splice(key, 1);
                setRawItems([...tempList]);
                let r_sum = tempList.reduce(
                  (a, b) =>
                    b.item_produced_name == data.item_produced_name
                      ? +a + +b.value
                      : a,
                  0
                );
                let l_sum = labourDetails.reduce(
                  (a, b) =>
                    b.item_produced_name == data.item_produced_name
                      ? +a + +b.amount
                      : a,
                  0
                );
                if (rawItems?.length > 0) {
                  let tempList = [...fullProdData];
                  let ind = tempList.findIndex(
                    (x) => x.item_name === data.item_produced_name
                  );
                  let tempItem = { ...produceData };
                  if (ind > -1) {
                    tempItem = tempList[ind];
                  }
                  tempItem = {
                    ...tempItem,
                    value: ((l_sum || 0) + r_sum)?.toFixed(2),
                    r_sum: r_sum,
                    cost: (
                      ((tempItem.l_sum || 0) + r_sum) /
                      tempItem.qty
                    )?.toFixed(2),
                    retail_rate:
                      ((l_sum || 0) + r_sum) / tempItem.qty +
                      (((l_sum || 0) + r_sum) / tempItem.qty) *
                        (tempItem.margin / 100),
                  };
                  if (tempItem.value == 0 || !tempItem) tempList.splice(ind, 1);
                  else tempList.splice(ind, 1, tempItem);
                  if (ind > -1) setFullProdData([...tempList]);
                  else setProduceData({ ...tempItem });
                } else
                  setProduceData((data) => ({
                    ...data,
                    value: ((l_sum || 0) + r_sum)?.toFixed(2),
                    r_sum: r_sum,
                    cost: (((l_sum || 0) + r_sum) / data.qty)?.toFixed(2),
                  }));
              };
              return (
                <tr key={key}>
                  <td>
                    <input
                      type="text"
                      className="border-0 rounded-1 w-100"
                      value={data.item_produced_name}
                      // onChange={handleChange}
                      onKeyDown={handleKeyDown1}
                      name="item_produced_name"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="border-0 rounded-1 w-100"
                      value={data.item_name}
                      // onChange={handleChange}
                      onKeyDown={handleKeyDown1}
                      name="item_name"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="border-0 rounded-1 w-75"
                      value={data.qty}
                      onChange={handleChange}
                      onKeyDown={handleKeyDown1}
                      name="qty"
                    />
                  </td>
                  <td>
                    <Dropdown
                      clearable
                      selection
                      required
                      search={search}
                      onKeyDown={handleKeyDown1}
                      onChange={handleDropdownChangeUnit}
                      className="purchase-input-text table-drop d-flex align-items-center py-0 form-control custom-dropdown-width2 "
                      name="fk_unit"
                      placeholder="Select"
                      value={data.fk_unit}
                      options={units}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="border-0 rounded-1 w-75"
                      value={data.cost}
                      onChange={handleChange}
                      onKeyDown={handleKeyDown1}
                      name="cost"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="border-0 rounded-1 w-75"
                      value={data.value}
                      onChange={handleChange}
                      onKeyDown={handleKeyDown1}
                      name="value"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="border-0 rounded-1 w-75"
                      value={data.godown}
                      // onChange={handleChange}
                      onKeyDown={handleKeyDown1}
                      name="godown_rate"
                      disabled
                    />
                  </td>
                  <td>
                    <img
                      src={deleteBtn}
                      className="cursor pe-1"
                      style={{ maxWidth: "17px" }}
                      onClick={() => handleDelete()}
                      alt="editBtn"
                    />
                  </td>
                </tr>
              );
            })}
              <tr>
            
              <td><Dropdown
                clearable
                selection
                search={search}
                onKeyDown={handleKeyDown1}
                onChange={(e, val) =>handleRawItemDropdownProducedItem(e, val,rawData)}
                className="purchase-input-text table-drop py-0 form-control custom-dropdown-width2 d-flex  align-items-center "
                name="fk_produced_item"
                placeholder="Select"
                value={rawData.fk_produced_item || ""}
                options={proList}
              /></td>
              <td><Dropdown
                clearable
                selection
                search={search}
                onKeyDown={handleKeyDown1}
                onChange={(e, val) =>handleRawItemDropdownChangeItem(e, val, rawData)}
                className="purchase-input-text table-drop py-0 form-control custom-dropdown-width2 d-flex  align-items-center"
                name="fk_item"
                placeholder="Select"
                value={rawData.fk_item || ""}
                options={items}
              /></td>
              <td>
              <input
                type='text'
                className='border-0 rounded-1 w-75' 
                value={rawData.qty||""}
                onChange={(e) =>handleQtyChange(e, rawData)}
                onKeyDown={handleKeyDown1}
                name='qty'
                />
              </td>
              <td><Dropdown
                    clearable
                    selection
                    required
                    search={search}
                    onKeyDown={handleKeyDown1}
                    onChange={handleDropdownChangeRawUnit}
                    className="purchase-input-text table-drop d-flex align-items-center py-0 form-control custom-dropdown-width2 "
                    name="fk_unit"
                    placeholder="Select"
                    value={rawData.fk_unit}
                    options={units}
                  />
                </td>
              <td><input
                type='text'
                className='border-0 rounded-1 w-75' 
                value={rawData.cost||''}
                onChange={(e) =>handleCostChange(e, rawData)}
                onKeyDown={handleKeyDown1}
                name='cost'
                /></td>
              <td><input
                type='text'
                className='border-0 rounded-1 w-75' 
                value={rawData.value||''}
                onChange={(e)=>handleValueChange(e, rawData)}
                onKeyDown={handleKeyDown1}
                name='value'
                /></td>
              <td><input
                type='text'
                className='border-0 rounded-1 w-75' 
                // value={data.godown}
                // onChange={handleChange}
                onKeyDown={handleKeyDown1}
                name='godown_rate'
                disabled
                /></td>
              <td><BsPlusSquareFill 
                className="me-1"
                style={{ color: "black" }}
                onClick={handleRawDataSubmit}
                onKeyDown={handleRawDataSubmit}
              /></td>
            </tr>

          {/* {fullRawData?.length>0?fullRawData?.map((data,key)=>{
           const handleChange = (e, drop_data) => {
            if (drop_data)
              data = { ...data, [drop_data.name]: drop_data.value };
            else data = { ...data, [e.target.name]: e.target.value };
            let tempList = [...fullRawData];
            tempList.splice(key, 1, data);
            setRawItems([...tempList]);
          };
          return(
            <tr key={key}>
            <td>
              <input
              type='text'
              className='border-0 rounded-1 w-100' 
              value={data.item_produced_name}              
              onChange={handleChange}
              onKeyDown={handleKeyDown1}
              name='item_produced_name'
              />
              </td>
            <td>
            <input
              type='text'
              className='border-0 rounded-1 w-100' 
              value={data.item_name}
              onChange={handleChange}
              onKeyDown={handleKeyDown1}
              name='item_name'
              />
            </td>
            <td>
            <input
              type='text'
              className='border-0 rounded-1 w-75' 
              value={data.qty}
              onChange={handleChange}
              onKeyDown={handleKeyDown1}
              name='qty'
              />
            </td>
            <td><Dropdown
                  clearable
                  selection
                  required
                  search={search}
                  onKeyDown={handleKeyDown1}
                  onChange={handleDropdownChangeUnit}
                  className="purchase-input-text table-drop d-flex align-items-center py-0 form-control custom-dropdown-width "
                  name="fk_unit"
                  placeholder="Select"
                  value={data.fk_unit}
                  options={units}
                />
              </td>
            <td><input
              type='text'
              className='border-0 rounded-1 w-75' 
              value={data.cost}
              onChange={handleChange}
              onKeyDown={handleKeyDown1}
              name='cost'
              /></td>
            <td><input
              type='text'
              className='border-0 rounded-1 w-75' 
              value={data.value}
              onChange={handleChange}
              onKeyDown={handleKeyDown1}
              name='value'
              /></td>
            <td><input
              type='text'
              className='border-0 rounded-1 w-75' 
              value={data.godown}
              onChange={handleChange}
              onKeyDown={handleKeyDown1}
              name='godown_rate'
              disabled
              /></td>
            <td></td>
          </tr>
  
          )
        }):(
          <tr>
          <td>
            <input
            type='text'
            className='border-0 rounded-1 w-100' 
            // value={data.item_produced_name}
            // onChange={handleChange}
            onKeyDown={handleKeyDown1}
            name='item_produced_name'
            />
            </td>
          <td>
          <input
            type='text'
            className='border-0 rounded-1 w-100' 
            // value={data.item_name}
            // onChange={handleChange}
            onKeyDown={handleKeyDown1}
            name='item_name'
            />
          </td>
          <td>
          <input
            type='text'
            className='border-0 rounded-1 w-75' 
            // value={data.qty}
            // onChange={handleChange}
            onKeyDown={handleKeyDown1}
            name='qty'
            />
          </td>
          <td><Dropdown
                clearable
                selection
                required
                search={search}
                onKeyDown={handleKeyDown1}
                // onChange={handleDropdownChangeUnit}
                className="purchase-input-text table-drop d-flex align-items-center py-0 form-control custom-dropdown-width "
                name="fk_unit"
                placeholder="Select"
                // value={data.fk_unit}
                options={units}
              />
            </td>
          <td><input
            type='text'
            className='border-0 rounded-1 w-75' 
            // value={data.cost}
            // onChange={handleChange}
            onKeyDown={handleKeyDown1}
            name='cost'
            /></td>
          <td><input
            type='text'
            className='border-0 rounded-1 w-75' 
            // value={data.value}
            // onChange={handleChange}
            onKeyDown={handleKeyDown1}
            name='value'
            /></td>
          <td><input
            type='text'
            className='border-0 rounded-1 w-75' 
            // value={data.godown}
            // onChange={handleChange}
            onKeyDown={handleKeyDown1}
            name='godown_rate'
            disabled
            /></td>
          <td></td>
        </tr>)} */}
        </tbody>
        <tfoot>
          {rawItems.length > 0 && (
            <tr className="text-dark">
              <td colSpan={4}></td>
              <td>Total Value :</td>
              <td className="text-left">
                {rawItems.reduce((acc, item) => +acc + +item.value, 0)}
              </td>
              <td colSpan={2}></td>
            </tr>
          )}
        </tfoot>
      </table>
    </div>
  );
};

export default RawMaterials;

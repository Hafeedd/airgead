import React, { useState } from "react";
import { Dropdown } from "semantic-ui-react";
import useOnKey from "../../../../hooks/onKeyFunct/onKeyFunct";
const RawMaterials = (props) => {
  const {
    rawItems,
    setRawItems,
    units,
    fullRawData,
    setFullRawData,
    setFullProdData,
    produceData,
    fullProdData,
    setProduceData,
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

  return (
    <div
      className="col-12 mt-1"
      style={{ height: "149px", overflowY: "scroll" }}
    >
      <div
        className="div-head rounded-top ps-3 pt-1 my-0 py-0"
        style={{ top: "0", position: "sticky", zIndex: 1 }}
      >
        Raw Materials Used
      </div>
      <table className="w-100 ProdTable1">
        <thead>
          <tr className="bg-dark text-light">
            <th>Item Produced</th>
            <th>Item Used</th>
            <th width="100">Qty</th>
            <th width="100">Unit</th>
            <th width="100">Cost</th>
            <th width="200">Value</th>
            <th>Godown</th>
            <th>
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
                let r_sum = tempList.reduce((a, b) => a + +b.value || a, 0);
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
                    value: (tempItem.l_sum || 0) + r_sum,
                    r_sum: r_sum,
                    cost: ((tempItem.l_sum || 0) + r_sum) / tempItem.qty,
                  };
                  tempList.splice(ind, 1, tempItem);
                  if (ind > -1) setFullProdData([...tempList]);
                  else setProduceData({ ...tempItem });
                } else
                  setProduceData((data) => ({
                    ...data,
                    value: (data.l_sum || 0) + r_sum,
                    r_sum: r_sum,
                    cost: ((data.l_sum || 0) + r_sum) / data.qty,
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
                      className="purchase-input-text table-drop d-flex align-items-center py-0 form-control custom-dropdown-width "
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
                  <td></td>
                </tr>
              );
            })}

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
          <tr className="text-dark">
            <td>Total Value :</td>
            <td colSpan={7}> </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default RawMaterials;

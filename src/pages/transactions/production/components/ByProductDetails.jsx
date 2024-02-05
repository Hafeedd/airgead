import React, { useState } from 'react'
import { Dropdown } from "semantic-ui-react";
import useOnKey from '../../../../hooks/onKeyFunct/onKeyFunct';
const ByProductDetails = (props) => {
  const{
    byProductItems,
    setByProductItems,
    units,
    fullByprodData,
    setFullByprodData,
  }=props
  
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
    setByProductItems((obj) => ({ ...obj, fk_unit: data.value }));
  };
  return (
    <div className="col-6 ms-1 pe-1" style={{ height: "140px", overflowY: "scroll" }}>
    <div className="div-head rounded-top ps-3 pt-1 my-0 py-0" style={{ top: "0", position: "sticky", zIndex: 1 }}>By Products Details</div>
      <table className="w-100 ProdTable1">
        <thead>
          <tr className="bg-dark text-light">
            <th>Item<br/>Produced</th>
            <th>Item Name</th>
            <th>Qty</th>
            <th>Unit</th>
            <th>Cost</th>
            <th>Value</th>
            <th>Margin</th>
            <th>MRP</th>
            <th>S.Rate</th>
            <th>+</th>
          </tr>
        </thead>
        <tbody ref={formRef1}>
          {byProductItems?.length>0&&byProductItems?.map((data,i)=>{
            const handleChange = (e, drop_data) => {
              if (drop_data)
                data = { ...data, [drop_data.name]: drop_data.value };
              else data = { ...data, [e.target.name]: e.target.value };
              let tempList = [...byProductItems];
              tempList.splice(i, 1, data);
              setByProductItems([...tempList]);
            };
          return(
            <tr key={i}>
            <td>
              <input
              type='text'
              className='border border-secondary rounded-1 w-100' 
              value={data.item_produced_name}
              onChange={handleChange}
              onKeyDown={handleKeyDown1}
              name='item_produced_name'
              />
              </td>
            <td>
            <input
              type='text'
              className='border border-secondary rounded-1 w-100' 
              value={data.item_name}
              onChange={handleChange}
              onKeyDown={handleKeyDown1}
              name='item_name'
              />
            </td>
            <td>
            <input
              type='text'
              className='border border-secondary rounded-1 w-75' 
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
              className='border border-secondary rounded-1 w-75' 
              value={data.cost}
              onChange={handleChange}
              onKeyDown={handleKeyDown1}
              name='cost'
              /></td>
            <td><input
              type='text'
              className='border border-secondary rounded-1 w-75' 
              value={data.value}
              onChange={handleChange}
              onKeyDown={handleKeyDown1}
              name='value'
              /></td>
            <td><input
              type='text'
              className='border border-secondary rounded-1 w-75' 
              value={data.margin}
              onChange={handleChange}
              onKeyDown={handleKeyDown1}
              name='margin'
              /></td>
              <td><input
              type='text'
              className='border border-secondary rounded-1 w-75' 
              value={data.mrp_rate}
              onChange={handleChange}
              onKeyDown={handleKeyDown1}
              name='mrp_rate'
              /></td>
              <td><input
              type='text'
              className='border border-secondary rounded-1 w-75' 
              value={data.s_rate}
              onChange={handleChange}
              onKeyDown={handleKeyDown1}
              name='s_rate'
              /></td>
            <td></td>
          </tr>
  
          )
        })}
       
       {fullByprodData?.length>0?fullByprodData?.map((data,i)=>{
            const handleChange = (e, drop_data) => {
              if (drop_data)
                data = { ...data, [drop_data.name]: drop_data.value };
              else data = { ...data, [e.target.name]: e.target.value };
              let tempList = [...fullByprodData];
              tempList.splice(i, 1, data);
              setFullByprodData([...tempList]);
            };
          return(
            <tr key={i}>
            <td>
              <input
              type='text'
              className='border border-secondary rounded-1 w-100' 
              value={data.item_produced_name}
              onChange={handleChange}
              onKeyDown={handleKeyDown1}
              name='item_produced_name'
              />
              </td>
            <td>
            <input
              type='text'
              className='border border-secondary rounded-1 w-100' 
              value={data.item_name}
              onChange={handleChange}
              onKeyDown={handleKeyDown1}
              name='item_name'
              />
            </td>
            <td>
            <input
              type='text'
              className='border border-secondary rounded-1 w-75' 
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
              className='border border-secondary rounded-1 w-75' 
              value={data.cost}
              onChange={handleChange}
              onKeyDown={handleKeyDown1}
              name='cost'
              /></td>
            <td><input
              type='text'
              className='border border-secondary rounded-1 w-75' 
              value={data.value}
              onChange={handleChange}
              onKeyDown={handleKeyDown1}
              name='value'
              /></td>
            <td><input
              type='text'
              className='border border-secondary rounded-1 w-75' 
              value={data.margin}
              onChange={handleChange}
              onKeyDown={handleKeyDown1}
              name='margin'
              /></td>
              <td><input
              type='text'
              className='border border-secondary rounded-1 w-75' 
              value={data.mrp_rate}
              onChange={handleChange}
              onKeyDown={handleKeyDown1}
              name='mrp_rate'
              /></td>
              <td><input
              type='text'
              className='border border-secondary rounded-1 w-75' 
              value={data.s_rate}
              onChange={handleChange}
              onKeyDown={handleKeyDown1}
              name='s_rate'
              /></td>
            <td></td>
          </tr>
  
          )
        }):(
          <tr>
            <td>
              <input
              type='text'
              className='border border-secondary rounded-1 w-100' 
              //value={data.item_produced_name}
              // onChange={handleChange}
              onKeyDown={handleKeyDown1}
              name='item_produced_name'
              />
              </td>
            <td>
            <input
              type='text'
              className='border border-secondary rounded-1 w-100' 
              //value={data.item_name}
              // onChange={handleChange}
              onKeyDown={handleKeyDown1}
              name='item_name'
              />
            </td>
            <td>
            <input
              type='text'
              className='border border-secondary rounded-1 w-75' 
              //value={data.qty}
              // onChange={handleChange}
              // onKeyDown={handleKeyDown1}
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
                  //value={data.fk_unit}
                  options={units}
                />
              </td>
            <td><input
              type='text'
              className='border border-secondary rounded-1 w-75' 
             // value={data.cost}
              // onChange={handleChange}
              onKeyDown={handleKeyDown1}
              name='cost'
              /></td>
            <td><input
              type='text'
              className='border border-secondary rounded-1 w-75' 
              //value={data.value}
              // onChange={handleChange}
              onKeyDown={handleKeyDown1}
              name='value'
              /></td>
            <td><input
              type='text'
              className='border border-secondary rounded-1 w-75' 
              //value={data.godown}
              // onChange={handleChange}
              onKeyDown={handleKeyDown1}
              name='margin'
              /></td>
              <td><input
              type='text'
              className='border border-secondary rounded-1 w-75' 
              //value={data.godown}
              // onChange={handleChange}
              onKeyDown={handleKeyDown1}
              name='mrp_rate'
              /></td>
              <td><input
              type='text'
              className='border border-secondary rounded-1 w-75' 
              //value={data.godown}
              // onChange={handleChange}
              onKeyDown={handleKeyDown1}
              name='s_rate'
              /></td>
            <td></td>
          </tr>
        )}
       
        </tbody>
      </table>
    </div>
  )
}

export default ByProductDetails
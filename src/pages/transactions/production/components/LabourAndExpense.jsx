import React, { useState } from 'react'
import { Dropdown } from "semantic-ui-react";
import useOnKey from '../../../../hooks/onKeyFunct/onKeyFunct';
const LabourAndExpense = (props) => {
  
  const{
    labourDetails,setLabourDetails,accDetails,fullLabourData,setFullLabourData
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

  const handleDropdownChangeDebit = (event, data) => {
    setLabourDetails((obj) => ({ ...obj, fk_debit_account: data.value }));
  };

  
  const handleDropdownChangeCredit = (event, data) => {
    setLabourDetails((obj) => ({ ...obj, fk_credit_account: data.value }));
  };
  return (
    <div className="col-12 mt-1" style={{ height: "140px", overflowY: "scroll" }}>
    <div className="div-head rounded-top ps-3 pt-1 my-0 py-0" style={{ top: "0", position: "sticky", zIndex: 1 }}>Labour and Expenses</div>
    <table className="w-100 ProdTable1">
        <thead>
          <tr className="bg-dark text-light">
            <th>Item Produced</th>
            <th>Debit Account</th>
            <th>Amount</th>
            <th>Credit Account</th>
          </tr>
        </thead>
        <tbody ref={formRef1}>
        {labourDetails?.length>0&&labourDetails?.map((data,i)=>{
          const handleChange = (e, drop_data) => {
            if (drop_data)
              data = { ...data, [drop_data.name]: drop_data.value };
            else data = { ...data, [e.target.name]: e.target.value };
            let tempList = [...labourDetails];
            tempList.splice(i, 1, data);
            setLabourDetails([...tempList]);
          };
          return(
            <tr key={i}>
            <td>
            <input
              type='text'
              className='border border-secondary rounded-1 w-75' 
              value={data.item_produced_name}
              onChange={handleChange}
              onKeyDown={handleKeyDown1}
              name='item_produced_name'
              />
            </td>
            <td><Dropdown
                  clearable
                  selection
                  required
                  search={search}
                  onKeyDown={handleKeyDown1}
                  onChange={handleDropdownChangeDebit}
                  className="purchase-input-text table-drop d-flex align-items-center py-0 form-control custom-dropdown-width1"
                  name="fk_debit_account"
                  placeholder="Select"
                  value={data.fk_debit_account}
                  options={accDetails}
                />
              </td>
            <td><input
              type='text'
              className='border border-secondary rounded-1 w-25' 
              value={data.amount}
              onChange={handleChange}
              onKeyDown={handleKeyDown1}
              name='amount'
              /></td>
                <td><Dropdown
                  clearable
                  selection
                  required
                  search={search}
                  onKeyDown={handleKeyDown1}
                  onChange={handleDropdownChangeCredit}
                  className="purchase-input-text table-drop d-flex align-items-center py-0 form-control custom-dropdown-width1 "
                  name="fk_credit_account"
                  placeholder="Select"
                  value={data.fk_credit_account}
                  options={accDetails}
                />
              </td>
          </tr>
          )
        })}

       {fullLabourData?.length>0?fullLabourData?.map((data,i)=>{
          const handleChange = (e, drop_data) => {
            if (drop_data)
              data = { ...data, [drop_data.name]: drop_data.value };
            else data = { ...data, [e.target.name]: e.target.value };
            let tempList = [...fullLabourData];
            tempList.splice(i, 1, data);
            setFullLabourData([...tempList]);
          };
          return(
            <tr key={i}>
            <td>
            <input
              type='text'
              className='border border-secondary rounded-1 w-75' 
              value={data.item_produced_name}
              onChange={handleChange}
              onKeyDown={handleKeyDown1}
              name='item_produced_name'
              />
            </td>
            <td><Dropdown
                  clearable
                  selection
                  required
                  search={search}
                  onKeyDown={handleKeyDown1}
                  onChange={handleDropdownChangeDebit}
                  className="purchase-input-text table-drop d-flex align-items-center py-0 form-control custom-dropdown-width1"
                  name="fk_debit_account"
                  placeholder="Select"
                  value={data.fk_debit_account}
                  options={accDetails}
                />
              </td>
            <td><input
              type='text'
              className='border border-secondary rounded-1 w-25' 
              value={data.amount}
              onChange={handleChange}
              onKeyDown={handleKeyDown1}
              name='amount'
              /></td>
                <td><Dropdown
                  clearable
                  selection
                  required
                  search={search}
                  onKeyDown={handleKeyDown1}
                  onChange={handleDropdownChangeCredit}
                  className="purchase-input-text table-drop d-flex align-items-center py-0 form-control custom-dropdown-width1 "
                  name="fk_credit_account"
                  placeholder="Select"
                  value={data.fk_credit_account}
                  options={accDetails}
                />
              </td>
          </tr>
          )
        }):( <tr>
          <td>
          <input
            type='text'
            className='border border-secondary rounded-1 w-75' 
            // value={data.item_produced_name}
            // onChange={handleChange}
            // onKeyDown={handleKeyDown1}
            name='item_produced_name'
            />
          </td>
          <td><Dropdown
                clearable
                selection
                required
                // search={search}
                // onKeyDown={handleKeyDown1}
                // onChange={handleDropdownChangeUnit}
                className="purchase-input-text table-drop d-flex align-items-center py-0 form-control custom-dropdown-width1 "
                name="fk_unit"
                placeholder="Select"
                // value={data.fk_debit_account}
                options={accDetails}
              />
            </td>
          <td><input
            type='text'
            className='border border-secondary rounded-1 w-25' 
            // value={data.amount}
            // onChange={handleChange}
            // onKeyDown={handleKeyDown1}
            name='amount'
            /></td>
              <td><Dropdown
                clearable
                selection
                required
                // search={search}
                // onKeyDown={handleKeyDown1}
                // onChange={handleDropdownChangeUnit}
                className="purchase-input-text table-drop d-flex align-items-center py-0 form-control custom-dropdown-width1 "
                name="fk_unit"
                placeholder="Select"
                // value={data.fk_credit_account}
                options={accDetails}
              />
            </td>
        </tr>)}

      
        </tbody>
      </table>
    </div>
  )
}

export default LabourAndExpense
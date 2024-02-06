import React from 'react'
import { Dropdown } from "semantic-ui-react";
const LabourAndExpense = (props) => {
  
  const{
    labourDetails,setLabourDetails,accDetails
  }=props
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
        <tbody>
        {labourDetails?.length>0&&labourDetails?.map((data,i)=>{
          return(
            <tr key={i}>
            <td>
            <input
              type='text'
              className='border border-secondary rounded-1 w-75' 
              value={data.item_produced_name}
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
                  className="purchase-input-text table-drop d-flex align-items-center py-0 form-control custom-dropdown-width1"
                  name="fk_unit"
                  placeholder="Select"
                  value={data.fk_debit_account}
                  options={accDetails}
                />
              </td>
            <td><input
              type='text'
              className='border border-secondary rounded-1 w-25' 
              value={data.amount}
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
                  value={data.fk_credit_account}
                  options={accDetails}
                />
              </td>
          </tr>
          )
        })}
       

       <tr>
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
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default LabourAndExpense
import React, { useState } from "react";
import { Dropdown } from "semantic-ui-react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import useOnKey from "../../../../hooks/onKeyFunct/onKeyFunct";
import deleteBtn from "../../../../assets/icons/delete.svg";
import { BsPlusSquareFill } from "react-icons/bs";
const LabourAndExpense = (props) => {
  const {
    labourDetails,
    setLabourDetails,
    accDetails,
    setProduceData,
    isLabOpen,
    setIsLabOpen,
    setIsByOpen,
    rawItems,
    fullProdData,
    produceData,
    setFullProdData,
    proList,
    labourData,
    setLabourData,
  } = props;

  const [ref1, setRef1] = useState();
  const [handleKeyDown1, formRef1] = useOnKey(ref1, setRef1);

  const toggleAccordion = () => {
    setIsLabOpen(!isLabOpen);
    setIsByOpen(false);
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

  const handleLabourDropdownProducedItem = (e, data)=>{
  if (data.value!=null){
    let tempName=data?.options?.filter(x=>x.value===data.value)[0]
    setLabourData((obj)=>({ ...obj, item_produced_name:tempName?.text,fk_produced_item:data.value}));
    }
  }

  const handleLabourDropdownDebit = (e, data)=>{
    if (data.value!=null){
      let tempName=data?.options?.filter(x=>x.value===data.value)[0]
      setLabourData((obj)=>({ ...obj, debit_account_name:tempName?.text,fk_debit_account:data.value}));
      }
    }

  const handleAmountChange = (e)=>{
    setLabourData((obj)=>({...obj,amount:e.target.value}))
  }

  const handleLabourDropdownCredit = (e, data)=>{
    if (data.value!=null){
      let tempName=data?.options?.filter(x=>x.value===data.value)[0]
      setLabourData((obj)=>({ ...obj, credit_account_name:tempName?.text,fk_credit_account:data.value}));
      }
    }
  const handleLabourDataSubmit=()=>{
    setLabourDetails((data)=>[...data,labourData]);
    let labour_data = {
        fk_debit_account: null,
        fk_credit_account: null,
        amount: null,
        item_produced_name: null,
      };
    setLabourData(labour_data);
  }
  return (
    <div
      className="col-12 mt-1 px-2"
      style={{
        display: isLabOpen ? "block" : "block",
        height: isLabOpen ? "120px" : "2rem",
        overflowY: isLabOpen ? "scroll" : "hidden",
      }}
    >
      <div
        className="div-head rounded-top ps-3 my-0 py-0 d-flex justify-content-between"
        style={{ top: "0", position: "sticky", zIndex: 5 }}
      >
        <div className="pt-1">Labour and Expenses</div>
        <div
          className="btn  btn-sm text-light border-0 "
          onClick={toggleAccordion}
        >
          {isLabOpen ? (
            <AiFillEyeInvisible size={15} />
          ) : (
            <AiFillEye size={15} />
          )}
        </div>
      </div>
      <table className="w-100 ProdTable1">
        <thead>
          <tr className="bg-dark text-light">
            <th width='30%'>Item Produced</th>
            <th width='30%'>Debit Account</th>
            <th width='5%'>Amount</th>
            <th width='30%'>Credit Account</th>
            <th width="5%"></th>
          </tr>
        </thead>
        <tbody ref={formRef1}>
          {labourDetails?.length > 0 &&
            labourDetails?.map((data, i) => {

              const handleDropdownChangeDebit = (event, drop_data) => {
                let tempList = [...labourDetails]
                tempList.splice(i,1,{...data,fk_debit_account: drop_data.value})
                setLabourDetails([...tempList]);                
              };
            
              const handleDropdownChangeCredit = (event, drop_data) => {
                let tempList = [...labourDetails]
                tempList.splice(i,1,{...data,fk_credit_account: drop_data.value})
                setLabourDetails([...tempList]);
              };

              const handleChange = (e, drop_data) => {
                let updatedData;
                if (drop_data)
                  updatedData = { ...data, [drop_data.name]: drop_data.value };
                else updatedData = { ...data, [e.target.name]: e.target.value };
                let tempList = [...labourDetails];
                tempList.splice(i, 1, updatedData);
                setLabourDetails([...tempList]);
                let r_sum = rawItems.reduce(
                  (a, b) =>
                    b.item_produced_name == data.item_produced_name
                      ? +a + +b.value
                      : a,
                  0
                );
                let l_sum = tempList.reduce(
                  (a, b) =>
                    b.item_produced_name == data.item_produced_name
                      ? +a + +b.amount
                      : a,
                  0
                );
                let tempListOfProdData = [...fullProdData];
                let ind = tempListOfProdData.findIndex(
                  (x) => x.item_name === data.item_produced_name
                );
                let tempItem = { ...produceData };
                if (ind > -1) {
                  tempItem = tempListOfProdData[ind];
                }
                tempItem = {
                  ...tempItem,
                  value: ((r_sum || 0) + l_sum)?.toFixed(2),
                  l_sum: l_sum,
                  cost: (((r_sum || 0) + l_sum) / tempItem.qty)?.toFixed(2),
                  retail_rate:(((tempItem.margin/100)*(((r_sum || 0) + l_sum) / tempItem.qty))+(((r_sum || 0) + l_sum) / tempItem.qty))?.toFixed(2)
                }
                tempListOfProdData.splice(ind,1,tempItem)
                if(ind>-1) setFullProdData([...tempListOfProdData])
                else setProduceData({...tempItem})
              };
              const handleDelete = () =>{
                let tempList = labourDetails||[]
                tempList.splice(i,1)
                setLabourDetails([...tempList])
                let r_sum = rawItems.reduce(
                  (a, b) =>
                    b.item_produced_name == data.item_produced_name
                      ? +a + +b.value
                      : a,
                  0
                );
                let l_sum = tempList.reduce(
                  (a, b) =>
                    b.item_produced_name == data.item_produced_name
                      ? +a + +b.amount
                      : a,
                  0
                );
                let tempListOfProdData = [...fullProdData];
                let ind = tempListOfProdData.findIndex(
                  (x) => x.item_name === data.item_produced_name
                );
                let tempItem = { ...produceData };
                if (ind > -1) {
                  tempItem = tempListOfProdData[ind];
                }
                tempItem = {
                  ...tempItem,
                  value: ((r_sum || 0) + l_sum)?.toFixed(2),
                  l_sum: l_sum,
                  cost: (((r_sum || 0) + l_sum) / tempItem.qty)?.toFixed(2),
                  retail_rate:(((tempItem.margin/100)*(((r_sum || 0) + l_sum) / tempItem.qty))+(((r_sum || 0) + l_sum) / tempItem.qty))?.toFixed(2)
                }
                if (tempItem.value == 0 || !tempItem) tempList.splice(ind, 1);
                else tempListOfProdData.splice(ind,1,tempItem)
                if(ind>-1) setFullProdData([...tempListOfProdData])
                else setProduceData({...tempItem})
              }
              return (
                <tr key={i}>
                  <td>
                    <input
                      type="text"
                      className="border-0 rounded-1"
                      value={data.item_produced_name}
                      onChange={handleChange}
                      onKeyDown={handleKeyDown1}
                      name="item_produced_name"
                    />
                  </td>
                  <td>
                    <Dropdown
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
                  <td>
                    <input
                      type="text"
                      className="border-0 rounded-1 w-75"
                      value={data.amount}
                      onChange={handleChange}
                      onKeyDown={handleKeyDown1}
                      name="amount"
                    />
                  </td>
                  <td>
                    <Dropdown
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
                  <td><img
                              src={deleteBtn}
                              className="cursor pe-1"
                              style={{maxWidth:'17px'}}
                              onClick={() => handleDelete()}
                              alt="editBtn"
                            /></td>
                </tr>
              );
            })}
            <tr>
              <td><Dropdown
                clearable
                selection
                search={search}
                onKeyDown={handleKeyDown1}
                onChange={(e, val) =>handleLabourDropdownProducedItem(e, val, labourData)}
                className="purchase-input-text table-drop py-0 form-control custom-dropdown-width2 d-flex  align-items-center"
                name="fk_produced_item"
                placeholder="Select"
                value={labourData.fk_produced_item || ""}
                options={proList}
              /></td>
              <td><Dropdown
                    clearable
                    selection
                    required
                    search={search}
                    onKeyDown={handleKeyDown1}
                    onChange={(e, val) =>handleLabourDropdownDebit(e, val, labourData)}
                    className="purchase-input-text table-drop d-flex align-items-center py-0 form-control custom-dropdown-width1 "
                    name="fk_debit_account"
                    placeholder="Select"
                    value={labourData.fk_debit_account}
                    options={accDetails}
                  />
                </td>
              <td><input
                type='text'
                className='border-0 rounded-1 w-75' 
                value={labourData.amount||''}
                onChange={(e) =>handleAmountChange(e,labourData)}
                onKeyDown={handleKeyDown1}
                name='amount'
                /></td>
                  <td><Dropdown
                    clearable
                    selection
                    required
                    search={search}
                    onKeyDown={handleKeyDown1}
                    onChange={(e, val) =>handleLabourDropdownCredit(e, val, labourData)}
                    className="purchase-input-text table-drop d-flex align-items-center py-0 form-control custom-dropdown-width1 "
                    name="fk_credit_account"
                    placeholder="Select"
                    value={labourData.fk_credit_account}
                    options={accDetails}
                  />
                </td>
                <td>
                  <button className=" border-0 bg-light" 
                    onMouseDown={handleLabourDataSubmit}
                    onKeyDown={handleLabourDataSubmit}>
                    <BsPlusSquareFill style={{ color: "black" }} />
                  </button>
                </td>
            </tr>
          {/* {fullLabourData?.length>0?fullLabourData?.map((data,i)=>{
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
              className='border-0 rounded-1 w-75' 
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
              className='border-0 rounded-1 w-25' 
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
            className='border-0 rounded-1 w-75' 
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
            className='border-0 rounded-1 w-25' 
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
        </tr>)} */}
        </tbody>
        <tfoot>
          {labourDetails.length > 0 && (
          <tr className="text-dark">
            <td></td>
            <td>Total Amount :</td>
            <td className="text-left">
              {labourDetails.reduce((acc, item) => (+acc + +item.amount).toFixed(2), 0)}
            </td>
            <td colSpan={2}></td>
          </tr>
          )}
        </tfoot>
      </table>
    </div>
  );
};

export default LabourAndExpense;

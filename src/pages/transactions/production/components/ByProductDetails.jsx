import React, { useState } from 'react'
import { Dropdown } from "semantic-ui-react";
import useOnKey from '../../../../hooks/onKeyFunct/onKeyFunct';
import { AiFillEyeInvisible,AiFillEye } from "react-icons/ai";
import deleteBtn from "../../../../assets/icons/delete.svg";
import { BsPlusSquareFill } from "react-icons/bs";
import { Numbers } from '@mui/icons-material';

const ByProductDetails = (props) => {
  const{
    byProductItems,
    setByProductItems,
    units,
    isByOpen,
    setIsByOpen,
    setIsLabOpen,

    items,
    proList,
    byprodData, 
    setByprodData,
    itemCompleteData
  }=props
  
  const [ref1, setRef1] = useState();
  const [handleKeyDown1, formRef1] = useOnKey(ref1, setRef1);

  const toggleAccordion = () => {
    setIsByOpen(!isByOpen);
    setIsLabOpen(false)
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

  const handleDropdownChangeUnit = (event, data) => {
    setByProductItems((obj) => ({ ...obj, fk_unit: data.value }));
  };

  const handleByProdDropdownChangeUnit= (event, data) => {
    setByprodData((obj) => ({ ...obj, fk_unit: data.value }));
  };

  const handleByProdDropdownProducedItem =(e,data) =>{
    if (data.value!=null){
      let tempName=data?.options?.filter(x=>x.value===data.value)[0]
      setByprodData((obj)=>({ ...obj, item_produced_name:tempName?.text,fk_produced_item:data.value}));
      }
  }

  const handleByProdDropdownChangeItem =(e,data) =>{
    if (data.value!=null){
      let tempData = data?.options?.filter(x=>x.value==data.value)[0]
      let tempitemData=itemCompleteData.filter(x=>x.id===data.value)[0]
      setByprodData((obj)=>({ ...obj, fk_item:data.value ,item_name:tempData?.text,cost:tempitemData?.cost,fk_unit:tempitemData?.fk_unit }));
    }
  }

  const handleByProdChangeQty = (e,data)=>{
    setByprodData((obj)=>({...obj,qty:e.target.value,value:parseFloat(data.cost*e.target.value).toFixed(2)}))
  }
  const handleByProdChangeCost = (e,data)=>{
    setByprodData((obj)=>({...obj,cost:e.target.value,value:parseFloat(e.target.value*data.qty).toFixed(2)}))
  }
  const handleByProdChangeValue = (e,data)=>{
    setByprodData((obj)=>({...obj,value:e.target.value,cost:parseFloat(e.target.value/data.qty).toFixed(2)}))
  }
  const handleByProdChangeMargin = (e,data)=>{
    setByprodData((obj)=>({...obj,margin:e.target.value,retail_rate:parseFloat(data.cost+(data.cost*(e.target.value/100))).toFixed(2)}))
  }
  const handleByProdChangeSrate = (e,data)=>{
    setByprodData((obj)=>({...obj,retail_rate:e.target.value,margin:parseFloat(((e.target.value - data.cost) / data.cost) * 100).toFixed(2)}))
  }

  const handleByProdChangeMrp = (e,data)=>{
    setByprodData((obj)=>({...obj,mrp_rate:e.target.value}))
  }

  const handleByProdDataSubmit =()=>{
    setByProductItems((data)=>[...data,byprodData]);
    let by_prod_data = {
      qty: null,
      fk_item: null,
      fk_unit: null,
      cost: null,
      value: null,
      margin: null,
      mrp_rate: null,
      retail_rate: null,
      item_name: null,
      item_produced_name: null,
      fk_produced_item:null,
    };
    setByprodData(by_prod_data);
  }

  return (
    <div className="col-12 mt-1 px-2"
    style={{
      display: isByOpen ? 'block' : 'block',
      height: isByOpen ? "120px" : "2rem",
      overflowY: isByOpen ? "scroll" : "hidden"
    }}
    >
    <div className="div-head rounded-top ps-3 my-0 py-0 d-flex justify-content-between " style={{ top: "0", position: "sticky", zIndex: 1 }}>
      <div className='pt-1'>By Products Details</div>
      <div className='btn  btn-sm text-light border-0 ' onClick={toggleAccordion}>{isByOpen ? <AiFillEyeInvisible size={15} /> : <AiFillEye size={15} />}</div>
      </div>
      <table className="w-100 ProdTable1"  >
        <thead>
          <tr className="bg-dark text-light">
            <th width='30%'>Item Produced</th>
            <th width='20%'>Item Name</th>
            <th width='5%'>Qty</th>
            <th width='5%'>Unit</th>
            <th width='5%'>Cost</th>
            <th width='10%'>Value</th>
            <th width='5%'>Margin</th>
            <th width='5%'>S.Rate</th>
            <th width='10%'>MRP</th>
            <th width="10%"><span className='pe-1'>+</span></th>
          </tr>
        </thead>
        <tbody ref={formRef1}>
          {byProductItems?.length>0&&byProductItems?.map((data,i)=>{
            console.log(data)
            const handleChange = (e, drop_data) => {
              // if (drop_data)
              //   data = { ...data, [drop_data.name]: drop_data.value };
              // else data = { ...data, [e.target.name]: e.target.value };
              // let tempList = [...byProductItems];
              // tempList.splice(i, 1, data);
              // setByProductItems([...tempList]);
              let updatedData;
              if (drop_data)
                updatedData = { ...data, [drop_data.name]: drop_data.value };
              else updatedData = { ...data, [e.target.name]: e.target.value };

              // Update the rawItems array
              let tempList = [...byProductItems];
              // tempList.splice(i, 1, updatedData);
              // setByProductItems([...tempList]);

              if (e.target.name != "value") {
                // Calculate and update the value field based on cost and qty
                const updatedCost = parseFloat(updatedData.cost || 0).toFixed(2);
                const updatedQty = parseFloat(updatedData.qty || 0).toFixed(2);
                const updatedMargin = parseFloat(updatedData.margin || 0).toFixed(2);
                const updatedValue = updatedCost * updatedQty;
                const updatedSRate = Number(updatedCost)+ Number(updatedCost*(updatedMargin/100))
                // const updated_value= parseFloat(updatedData.value||0)
                // updated_value?updated_cost=updated_value/updatedQty:updated_cost=updatedCost;

                // Update the value field in the current data object
                updatedData = { ...updatedData, value: updatedValue , retail_rate:updatedSRate};
              } else {
                const updatedValue = parseFloat(updatedData.value || 0);
                const updatedQty = parseFloat(updatedData.qty || 0);
                const updatedCost = updatedValue / updatedQty;
                updatedData = { ...updatedData, cost: updatedCost };
              }

              // Update the rawItems array again with the modified data
              tempList.splice(i, 1, updatedData);
              setByProductItems([...tempList]);
            };
            const handleDelete = () =>{
              let tempList = byProductItems||[]
              tempList.splice(i,1)
              setByProductItems([...tempList])
            }
          return(
            <tr key={i}>
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
                  className="purchase-input-text table-drop d-flex align-items-center py-0 form-control custom-dropdown-width2 "
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
              value={data.margin}
              onChange={handleChange}
              onKeyDown={handleKeyDown1}
              name='margin'
              /></td>
              <td><input
              type='text'
              className='border-0 rounded-1 w-75' 
              value={data.retail_rate}
              onChange={handleChange}
              onKeyDown={handleKeyDown1}
              name='retail_rate'
              /></td>
              <td><input
              type='text'
              className='border-0 rounded-1 w-75' 
              value={data.mrp_rate}
              onChange={handleChange}
              onKeyDown={handleKeyDown1}
              name='mrp_rate'
              /></td>
              
            <td><img
                              src={deleteBtn}
                              className="cursor pe-1"
                              style={{maxWidth:'17px'}}
                              onClick={() => handleDelete()}
                              alt="editBtn"
                            /></td>
          </tr>
  
          )
        })}
         <tr>
            <td><Dropdown
                clearable
                selection
                search={search}
                onKeyDown={handleKeyDown1}
                onChange={(e, val) =>handleByProdDropdownProducedItem(e, val,byprodData)}
                className="purchase-input-text table-drop py-0 form-control custom-dropdown-width2  d-flex  align-items-center"
                name="fk_produced_item"
                placeholder="Select"
                value={byprodData.fk_produced_item || ""}
                options={proList}
              /></td>
              <td><Dropdown
                clearable
                selection
                search={search}
                onKeyDown={handleKeyDown1}
                onChange={(e, val) =>handleByProdDropdownChangeItem(e, val, byprodData)}
                className="purchase-input-text table-drop py-0 form-control custom-dropdown-width2  d-flex  align-items-center"
                name="fk_item"
                placeholder="Select"
                value={byprodData.fk_item || ""}
                options={items}
              /></td>
            <td>
            <input
              type='text'
              className='border-0 rounded-1 w-75' 
              value={byprodData.qty||""}
              onChange={(e)=>handleByProdChangeQty(e,byprodData)}
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
                  onChange={handleByProdDropdownChangeUnit}
                  className="purchase-input-text table-drop d-flex align-items-center py-0 form-control custom-dropdown-width2 "
                  name="fk_unit"
                  placeholder="Select"
                  value={byprodData.fk_unit}
                  options={units}
                />
              </td>
            <td><input
              type='text'
              className='border-0 rounded-1 w-75' 
              value={byprodData.cost ||""}
              onChange={(e)=>handleByProdChangeCost(e,byprodData)}
              onKeyDown={handleKeyDown1}
              name='cost'
              /></td>
            <td><input
              type='text'
              className='border-0 rounded-1 w-75' 
              value={byprodData.value||""}
              onChange={(e)=>handleByProdChangeValue(e,byprodData)}
              onKeyDown={handleKeyDown1}
              name='value'
              /></td>
            <td><input
              type='text'
              className='border-0 rounded-1 w-75' 
              value={byprodData.margin||""}
              onChange={(e)=>handleByProdChangeMargin(e,byprodData)}
              onKeyDown={handleKeyDown1}
              name='margin'
              /></td>
              <td><input
              type='text'
              className='border-0 rounded-1 w-75' 
              value={byprodData.retail_rate||""}
              onChange={(e)=>handleByProdChangeSrate(e,byprodData)}
              onKeyDown={handleKeyDown1}
              name='retail_rate'
              /></td>
              <td><input
              type='text'
              className='border-0 rounded-1 w-75' 
              value={byprodData.mrp_rate||""}
              onChange={(e)=>handleByProdChangeMrp(e,byprodData)}
              onKeyDown={handleKeyDown1}
              name='mrp_rate'
              /></td>
              <td>
                <button className=" border-0 bg-light " 
                  onMouseDown={handleByProdDataSubmit}
                  onKeyDown={handleByProdDataSubmit}>
                  <BsPlusSquareFill style={{ color: "black"}} />
                </button>
              </td>
          </tr>
       
       {/* {fullByprodData?.length>0?fullByprodData?.map((data,i)=>{
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
              value={data.margin}
              onChange={handleChange}
              onKeyDown={handleKeyDown1}
              name='margin'
              /></td>
              <td><input
              type='text'
              className='border-0 rounded-1 w-75' 
              value={data.mrp_rate}
              onChange={handleChange}
              onKeyDown={handleKeyDown1}
              name='mrp_rate'
              /></td>
              <td><input
              type='text'
              className='border-0 rounded-1 w-75' 
              value={data.retail_rate}
              onChange={handleChange}
              onKeyDown={handleKeyDown1}
              name='retail_rate'
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
              //value={data.item_produced_name}
              // onChange={handleChange}
              onKeyDown={handleKeyDown1}
              name='item_produced_name'
              />
              </td>
            <td>
            <input
              type='text'
              className='border-0 rounded-1 w-100' 
              //value={data.item_name}
              // onChange={handleChange}
              onKeyDown={handleKeyDown1}
              name='item_name'
              />
            </td>
            <td>
            <input
              type='text'
              className='border-0 rounded-1 w-75' 
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
              className='border-0 rounded-1 w-75' 
             // value={data.cost}
              // onChange={handleChange}
              onKeyDown={handleKeyDown1}
              name='cost'
              /></td>
            <td><input
              type='text'
              className='border-0 rounded-1 w-75' 
              //value={data.value}
              // onChange={handleChange}
              onKeyDown={handleKeyDown1}
              name='value'
              /></td>
            <td><input
              type='text'
              className='border-0 rounded-1 w-75' 
              //value={data.godown}
              // onChange={handleChange}
              onKeyDown={handleKeyDown1}
              name='margin'
              /></td>
              <td><input
              type='text'
              className='border-0 rounded-1 w-75' 
              //value={data.godown}
              // onChange={handleChange}
              onKeyDown={handleKeyDown1}
              name='mrp_rate'
              /></td>
              <td><input
              type='text'
              className='border-0 rounded-1 w-75' 
              //value={data.godown}
              // onChange={handleChange}
              onKeyDown={handleKeyDown1}
              name='retail_rate'
              /></td>
            <td></td>
          </tr>
        )} */}
       
        </tbody>
      </table>
    </div>
  )
}

export default ByProductDetails
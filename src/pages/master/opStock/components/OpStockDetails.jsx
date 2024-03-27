import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { OpStockTable } from "./OpStockTable";
import useItemServices from "../../../../services/master/itemServices";
import useOnKey from "../../../../hooks/onKeyFunct/onKeyFunct";
import SearchDropDown from "../../../../components/searchDropDown/SearchDropDown";

export const OpStockDetails = (props) => {
  const { itemList, setItemList, setToEdit, toEdit, refresh 
  ,propertyList, setPropertyList,filter, setFilter,handleSubmit,
  bulkDataChange, setBulkDataChange,amntCalc, setAmntCalc,handleClearAll} = props;
  const [ref, setRef] = useState(null);
  const [showDropdown, setShowDropdown] = useState(null);

  const { getProperty } = useItemServices();

  const [ handleKeyDown , formRef ] = useOnKey(ref, setRef);

  const handleOpStockBulkDataChange =() =>{
    let newList, tempList = [...itemList]
    if(parseInt(bulkDataChange.hsn) || parseInt(bulkDataChange.tax_gst)){
      newList = tempList.map((item)=>{
        item.hsn = bulkDataChange.hsn
        item.tax_gst = bulkDataChange.tax_gst
        return item
      })
    }
    if(newList?.length>0){
      setItemList([...newList])
    }
  }

  const handlePercApply = () =>{
    let newTempList
    if(amntCalc.perc){
      if(amntCalc.to){
        if(amntCalc.from){
          newTempList = itemList.map(item=>{
            let tempStore = (((item[amntCalc.from]||0) * parseInt(amntCalc.perc))/100) + item[amntCalc.from]||0
            item = {...item,[amntCalc.to]:tempStore}
            return item
          })
        }else{
          newTempList = itemList.map(item=>{
            console.log(item[amntCalc?.to])
            let tempStore = (((item[amntCalc?.to]||0) * parseInt(amntCalc.perc))/100) + item[amntCalc.to]||0
            console.log(tempStore)
            item = {...item,[amntCalc?.to]:tempStore}
            return item
          })
        }
      }
    }
    setItemList(newTempList)
  }

  const handleAmntApply = () =>{
    let newTempList
    if(amntCalc.amnt){
      if(amntCalc.to){
        if(amntCalc.from){
          newTempList = itemList.map(item=>{
            let tempStore = (item[amntCalc.from]||0) + parseFloat(amntCalc.amnt)
            item = {...item,[amntCalc.to]:tempStore}
            return item
          })
        }else{
          newTempList = itemList.map(item=>{
            let tempStore = ((item[amntCalc.to]||0) + parseFloat(amntCalc.amnt))
            item = {...item,[amntCalc.to]:tempStore}
            return item
          })
        }
      }
    }
    setItemList(newTempList)
  }

  const handleRateApply = () =>{
    let newTempList
    if(amntCalc.rate){
      if(amntCalc.to){
        if(amntCalc.from){
          newTempList = itemList.map(item=>{
            let tempStore = parseFloat(amntCalc.rate)
            item = {...item,[amntCalc.to]:tempStore}
            return item
          })
        }else{
          newTempList = itemList.map(item=>{
            let tempStore = parseFloat(amntCalc.rate)
            item = {...item,[amntCalc.to]:tempStore}
            return item
          })
        }
      }
    }
    setItemList(newTempList)
  }

  const handleBulkDataChange = (e) =>{
    if(e.target.value === ""){
      setBulkDataChange({...bulkDataChange,[e.target.name]:null})
    }else
    setBulkDataChange({...bulkDataChange,[e.target.name]:e.target.value})
  }

  useEffect(()=>{
    getPropertyData()
  },[])

  const getPropertyData = async () => {
    const miniFunct = (data) => {
      let list = {};
      const keys = Object.keys(propertyList);
      data.map((x) => {
        if (keys.indexOf(x.property_type) > -1) {
          if (!list[x.property_type]?.length > 0) {
            list[x.property_type] = [];
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
      setPropertyList(list)
    };
    try {
      const response = await getProperty();
      if (response.success) miniFunct(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRateCalcChange = (e) =>{
    if(e.target.value === ""){
      setAmntCalc({...amntCalc,[e.target.name]:null})
    }else{
      setAmntCalc({...amntCalc,[e.target.name]:e.target.value})
    }
  }

  return (
    <div className="op-stock-det">
      Op Stock
      <form ref={formRef} onSubmit={handleSubmit} className="d-flex row mx-0 px-0 pt-3">
        <div className="col-6 col-7 border-end border-2 pe-5">
          <Form.Group className="col-11 pe-4 ps-0 mx-0 d-flex align-items-start mt-1">
            <Form.Label className="col-2 purchase-input-label pb-1">
              Company
            </Form.Label>
            <div className="purchase-input-text op-stock-dropdown me-1 w-100">
              <SearchDropDown
                id="company"
                noAdd={true}
                options={propertyList}
                {...{ showDropdown, setShowDropdown, handleKeyDown }}
                setDataValue={setFilter}
                selectedValue={filter}
              />
            </div>
          </Form.Group>
          <Form.Group className="col-11 pe-4 ps-0 mx-0 d-flex align-items-start mt-2">
            <Form.Label className="col-2 purchase-input-label pb-1">
              Category
            </Form.Label>
            <div className="purchase-input-text op-stock-dropdown a b c me-1 w-100">
              <SearchDropDown
                id="category"
                noAdd={true}
                options={propertyList}
                {...{ showDropdown, setShowDropdown, handleKeyDown }}
                setDataValue={setFilter}
                selectedValue={filter}
              />
            </div>
          </Form.Group>
          <div className="col-11 pe-4 ps-0 mx-0 d-flex align-items-start">
            <Form.Group className="col-6 ps-0 mx-0 d-flex align-items-start mt-2">
              <Form.Label className="col-4 purchase-input-label pb-1">
                HSN
              </Form.Label>
              <div className="w-100">
                <Form.Control
                  onChange={handleBulkDataChange}
                  name="hsn"
                  value={bulkDataChange.hsn||''}
                  className="purchase-input-text me-2"
                  type="text"
                />
                <div onClick={handleOpStockBulkDataChange} className="col-12 text-center btn mt-1 op-stock-apply-btn">
                  Apply
                </div>
              </div>
            </Form.Group>
            <Form.Group className="col-6 ps-0 mx-0 d-flex align-items-start mt-2 pe-2">
              <Form.Label className="col-3 col-4 purchase-input-label pb-1 ps-3">
                Tax %
              </Form.Label>
              <div className="w-100">
                <Form.Control
                  onChange={handleBulkDataChange}                 
                  name="tax_gst"
                  value={bulkDataChange.tax_gst||''}
                  className="purchase-input-text me-2"
                  type="text"
                />
                <div onClick={handleOpStockBulkDataChange} className="col-12 text-center btn mt-1 op-stock-apply-btn">
                  Apply
                </div>
              </div>
            </Form.Group>
          </div>
        </div>
        <div className="col-5 col-6 pe-2 px-0 row mx-0 justify-content-end">
          <Form.Group className="col-9 ps-0 mx-0 d-flex align-items-start pe-1">
            <Form.Label
              className="col-3 purchase-input-label align-items-start"
              style={{ lineHeight: "1rem" }}
            >
              Update rate <br /> from
            </Form.Label>
            <Form.Select
              onChange={handleRateCalcChange}              
              name="from"
              value={amntCalc.from||''}
              className="purchase-input-text"
              style={{lineHeight:"1rem"}}
            >
            <option value={null} >SELECT</option>
            <option value={"mrp_rate"} >MRP</option>
            <option value={"retail_rate"} >RETAIL RATE</option>
            <option value={"purchase_rate"} >PUCHASE RATE</option>
            <option value={"wholesale_rate"} >WHOLESALE RATE</option>
            <option value={"super_wholesale_rate"} >SUPER WHOELSALE RATE</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="col-9 ps-0 mx-0 d-flex align-items-start mt-1 pe-1">
            <Form.Label className="col-3 purchase-input-label ">
              Rate Type
            </Form.Label>
            <div className="w-100 d-flex">
              <Form.Select
                onChange={handleRateCalcChange}
                name="to"
                value={amntCalc.to||''}
                className="purchase-input-text"
                style={{lineHeight:"1rem"}}
              >
              <option value={null} >SELECT</option>
              <option value={"mrp_rate"} >MRP</option>
              <option value={"retail_rate"} >RETAIL RATE</option>
              <option value={"purchase_rate"} >PUCHASE RATE</option>
              <option value={"wholesale_rate"} >WHOLESALE RATE</option>
              <option value={"super_wholesale_rate"} >SUPER WHOELSALE RATE</option>
              </Form.Select>
              {/* <div className="col-6 btn op-stock-apply-btn ">Apply</div> */}
            </div>
          </Form.Group>
          <Form.Group className="col-9 ps-0 mx-0 d-flex align-items-start mt-2 pe-1">
            <Form.Label className="col-3 purchase-input-label ">
              By percentage
            </Form.Label>
            <div className="w-100 d-flex">
              <Form.Control
                onChange={handleRateCalcChange}
                name="perc"
                value={amntCalc.perc||''}
                className="purchase-input-text me-2"
                type="number"
              />
              <div onClick={handlePercApply} className="col-6 btn op-stock-apply-btn">Apply</div>
            </div>
          </Form.Group>
          <Form.Group className="col-9 ps-0 mx-0 d-flex align-items-start mt-2 pe-1">
            <Form.Label className="col-3 purchase-input-label ">
              By Amount
            </Form.Label>
            <div className="w-100 d-flex">
              <Form.Control
                onChange={handleRateCalcChange}
                name="amnt"
                value={amntCalc.amnt||''}
                className="purchase-input-text me-2"
                type="number"
              />
              <div onClick={handleAmntApply} className="col-6 btn op-stock-apply-btn ">Apply</div>
            </div>
          </Form.Group>
          <Form.Group className="col-9 ps-0 mx-0 d-flex align-items-start mt-2 pe-1">
            <Form.Label className="col-3 purchase-input-label ">
              Set Rate
            </Form.Label>
            <div className="w-100 d-flex">
              <Form.Control
                onChange={handleRateCalcChange}
                name="rate"
                value={amntCalc.rate||''}
                className="purchase-input-text me-2"
                type="number"
              />
              <div onClick={handleRateApply} className="col-6 btn op-stock-apply-btn ">Apply</div>
            </div>
          </Form.Group>
        </div>
        <div>
          <OpStockTable {...{ itemList, setItemList, setFilter, filter }} />
        </div>
        <div className="row mx-0 justify-content-end mt-2">
          <div onClick={handleClearAll} className="btn col-1 col-2 clear-btn me-3">Clear</div>
          <input type="submit" className="btn col-1 col-2 add-btn" value={"Save"}/>
        </div>
      </form>
    </div>
  );
};

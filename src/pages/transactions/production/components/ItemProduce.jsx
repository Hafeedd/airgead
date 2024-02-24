import React, { useState } from "react";
import { Dropdown } from "semantic-ui-react";
import useOnKey from "../../../../hooks/onKeyFunct/onKeyFunct";
import { BsPlusSquareFill } from "react-icons/bs";
const ItemProduce = (props) => {
  const {
    items,
    materialList,
    types,
    units,
    produceData,
    setProduceData,
    setRawItems,
    setByProductItems,
    setLabourDetails,
    fullProdData,
    setFullProdData,
    fullRawData,
    setFullRawData,
    rawItems,
    fullByprodData,
    setFullByprodData,
    byProductItems,
    fullLabourData,
    setFullLabourData,
    labourDetails,
    setListProduction,
    listProduction,
    
  } = props;

  const [ref1, setRef1] = useState();
  const [handleKeyDown1, formRef1] = useOnKey(ref1, setRef1);

  const handleDropdownChangeItem = (e, data,prodItem,index) => {

    if (e.target.value == "") {
      prodItem = { ...prodItem, [e.target.name]: null }
    } else {
      prodItem = { ...prodItem, [e.target.name]: e.target.value}
    }
    // setProduceData((obj) => ({ ...obj, fk_item: data.value }));

    if(index>-1){
      let tempProductList = [...fullProdData]
      tempProductList.splice(index, 1, {...prodItem})
      setFullProdData([...tempProductList])
    }else
    setProduceData({...prodItem})
  };

  const handleDropdownChangeType = (e, data,prodItem,index) => {
    if (e.target.value == "") {
      prodItem = { ...prodItem, [e.target.name]: null }
    } else {
      prodItem = { ...prodItem, [e.target.name]: e.target.value}
    }
    // setProduceData((obj) => ({ ...obj, fk_type: data.value }));

    if(index>-1){
      let tempProductList = [...fullProdData]
      tempProductList.splice(index, 1, {...prodItem})
      setFullProdData([...tempProductList])
    }else
    setProduceData({...prodItem})
  };


  const handleDropdownChangeUnit = (e, data,prodItem,index) => {
    if (e.target.value == "") {
      prodItem = { ...prodItem, [e.target.name]: null }
    } else {
      prodItem = { ...prodItem, [e.target.name]: e.target.value}
    }
    // setProduceData((obj) => ({ ...obj, fk_unit: data.value }));

    if(index>-1){
      let tempProductList = [...fullProdData]
      tempProductList.splice(index, 1, {...prodItem})
      setFullProdData([...tempProductList])
    }else
    setProduceData({...prodItem})
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

  const handleChange = (e,prodItem,index) => {
    if (e.target.value == "") {
      // setProduceData((data) => ({ ...data, [e.target.name]: null }));
      prodItem = { ...prodItem, [e.target.name]: null }
    } else {
      // setProduceData((data) => ({ ...data, [e.target.name]: e.target.value }));
      prodItem = { ...prodItem, [e.target.name]: e.target.value }
    }

    if(index>-1){
      let tempProductList = [...fullProdData]
      tempProductList.splice(index, 1, {...prodItem})
      setFullProdData([...tempProductList])
    }else
    setProduceData({...prodItem})
  };

  const handleQtyChange = (e,prodItem,index) => {
    if (e.target.value == "") {
      // setProduceData((data) => ({ ...data, [e.target.name]: null }));
      prodItem = { ...prodItem, [e.target.name]: null }
    } else {
      // setProduceData((data) => ({ ...data, [e.target.name]: parseFloat(e.target.value) }));
      prodItem = {...prodItem, [e.target.name]: parseFloat(e.target.value) }
      
      let filteredRawMaterialList = materialList?.filter(
        (info) =>
          info.fk_type === produceData.fk_type && info.fk_item === produceData.fk_item
      );
      // setProduceData((data) => ({ ...data,fk_unit:filteredRawMaterialList[0]?.fk_unit}))
      prodItem = {...prodItem,fk_unit:filteredRawMaterialList[0]?.fk_unit}
      let mappedRaw = [];
      filteredRawMaterialList[0]?.raw_materials?.length > 0 &&
        filteredRawMaterialList[0]?.raw_materials?.map((data) => {
          mappedRaw.push({
            initial_qty: data.qty,
            fk_item: data.fk_item,
            fk_unit: data.fk_unit,
            cost: data.item_details.cost,
            value:null,
            margin: data.item_details.margin,
            mrp_rate: data.item_details.mrp_rate,
            item_produced_name: null,
            item_name: data.item_details.name,
            godown_rate: null,
          });
        });
      mappedRaw = mappedRaw.map((item) => ({
        ...item,
        item_produced_name: filteredRawMaterialList[0]?.item_details.name,
        ratio:e.target.value/filteredRawMaterialList[0]?.qty,
        qty:(e.target.value/filteredRawMaterialList[0]?.qty)*item.initial_qty,
        value:Number(((e.target.value/filteredRawMaterialList[0]?.qty)*item.initial_qty)*item.cost).toFixed(2)
      }));

      let r_sum=mappedRaw.reduce((a,b)=>a+ +b.value||0,0);
      setRawItems(mappedRaw);
      
      let mappedByprod = [];
      filteredRawMaterialList[0]?.by_products?.length > 0 &&
        filteredRawMaterialList[0]?.by_products?.map((data) => {
          mappedByprod.push({
            qty: data.qty,
            fk_item: data.fk_item,
            fk_unit: data.fk_unit,
            cost: data.item_details.cost,
            value: data.qty * data.item_details.cost,
            margin: data.item_details.margin,
            mrp_rate: data.item_details.mrp_rate,
            p_type: null,
            s_rate: data.item_details.retail_rate,
            item_name: data.item_details.name,
            item_produced_name: null,
          });
        });
      mappedByprod = mappedByprod.map((item) => ({
        ...item,
        item_produced_name: filteredRawMaterialList[0]?.item_details.name,
      }));

      setByProductItems(mappedByprod);
      let mappedLabour = [];
      filteredRawMaterialList[0]?.expense_accounts?.length > 0 &&
        filteredRawMaterialList[0]?.expense_accounts?.map((data) => {
          mappedLabour.push({
            fk_debit_account: data.debit_account_details.id,
            debit_name:data.debit_account_details.fk_customer.name,
            fk_credit_account: data.credit_account_details.id,
            credit_name:data.credit_account_details.fk_customer.name,
            amount: null,
            item_produced_name: null,
            initial_amount:data.amount,
          });
        });
      mappedLabour = mappedLabour.map((item) => ({
        ...item,
        item_produced_name: filteredRawMaterialList[0]?.item_details.name,
        amount:(item.initial_amount*e.target.value)/filteredRawMaterialList[0]?.qty
      }));
      let l_sum=mappedLabour.reduce((a,b)=>a+ +b.amount||0,0);
      setLabourDetails(mappedLabour);
      
      let total_cost=Number((r_sum+l_sum)/e.target.value).toFixed(2)
      let total_value=Number(r_sum+l_sum).toFixed(2)
      // setProduceData((data)=>({...data,cost:total_cost,value:total_value,mrp_rate:filteredRawMaterialList[0]?.item_details.mrp_rate,wholesale_rate:filteredRawMaterialList[0]?.item_details.wholesale_rate,r_sum:r_sum,
      // l_sum:l_sum}
      prodItem = {...prodItem,cost:total_cost,value:total_value,mrp_rate:filteredRawMaterialList[0]?.item_details.mrp_rate,wholesale_rate:filteredRawMaterialList[0]?.item_details.wholesale_rate,r_sum:r_sum,
      l_sum:l_sum}
      let m = Number(filteredRawMaterialList[0]?.item_details.margin)
      let sr = Number(filteredRawMaterialList[0]?.item_details.retail_rate)
      if (sr != '' || null){
        // setProduceData((data)=>({...data,retail_rate:sr,margin:((sr-Number(data.cost))/Number(data.cost))*100}))
        prodItem = {...prodItem,retail_rate:sr,margin:((sr-Number(prodItem.cost))/Number(prodItem.cost))*100}
      }
      if (m != '' || null){
        // setProduceData((data)=>({...data,retail_rate:Number(data.cost)+(Number(data.cost)*(m/100)),margin:m}))
        prodItem = {...prodItem,retail_rate:Number(prodItem.cost)+(Number(prodItem.cost)*(m/100)),margin:m}
      }

      if(index>-1){
        let tempProductList = [...fullProdData]
        tempProductList.splice(index, 1, {...prodItem})
        setFullProdData([...tempProductList])
      }else
      setProduceData({...prodItem})
    }
  };

  const handleMarginChange = (e,prodItem,index) => {
    if (e.target.value == "") {
      // setProduceData((data) => ({ ...data, [e.target.name]: null,retail_rate:null }));
      prodItem = { ...prodItem, [e.target.name]: null,retail_rate:null }
    } else {
      // setProduceData((data) => ({ ...data, [e.target.name]: e.target.value,retail_rate:+data.cost+ +(data.cost*(e.target.value/100))  }));
      prodItem = { ...prodItem, [e.target.name]: e.target.value,retail_rate:+prodItem.cost+ +(prodItem.cost*(e.target.value/100))  }
    }
    if(index>-1){
      let tempProductList = [...fullProdData]
      tempProductList.splice(index, 1, {...prodItem})
      setFullProdData([...tempProductList])
    }else
    setProduceData({...prodItem})
  };

  const handleRetailChange = (e,prodItem,index) => {
    if (e.target.value == "") {
      // setProduceData((data) => ({ ...data, [e.target.name]: null,margin:null}));
      prodItem = { ...prodItem, [e.target.name]: null,margin:null}
    } else {
      // setProduceData((data) => ({ ...data, [e.target.name]: e.target.value,margin:Number(((e.target.value-data.cost)/data.cost)*100).toFixed(2)  }));
      prodItem = { ...prodItem, [e.target.name]: e.target.value,margin:Number(((e.target.value-prodItem.cost)/prodItem.cost)*100).toFixed(2)}
    }
    
    if(index>-1){
      let tempProductList = [...fullProdData]
      tempProductList.splice(index, 1, {...prodItem})
      setFullProdData([...tempProductList])
    }else
    setProduceData({...prodItem})
  };

  const handleSubmit = () =>{
    setFullProdData(prevFullRaw => [...prevFullRaw, { ...produceData }]);
    let tempRaw =[]
    tempRaw=[...fullRawData,...rawItems]
    setFullRawData(tempRaw)
    let tempByProd = []
    tempByProd=[...fullByprodData,...byProductItems]
    setFullByprodData(tempByProd)

    let tempLabour =[]
    tempLabour=[...fullLabourData,...labourDetails]
    setFullLabourData(tempLabour)

    let tempList ={...produceData,"raw_materials":[...rawItems],'by_products':[...byProductItems],'expense_accounts':[...labourDetails]}
    setListProduction(data=>([...data,tempList]))
    
    setProduceData('')
    setRawItems('')
    setByProductItems('')
    setLabourDetails('')
  }
  // const handleKeySubmit =() =>{

  // }
  return (
    <div className="col-12 mt-1"  style={{ height: "124px", overflowY: "scroll" }}>
      <table className="w-100 ProdTable">
        <thead> 
          <tr className="bg-dark text-light">
            <th width='250'>Item Produced</th>
            <th width='100'>P.Type</th>
            <th width="50">Qty</th>
            <th width="80">Unit</th>
            <th width='50'>Cost</th>
            <th width='100'>Value</th>
            <th width='80'>Margin %</th>
            <th width='80'>Sales<br/>Rate</th>
            <th width='80'>
              Ws.
              <br />
              Rate
            </th>
            <th width='80'>MRP</th>
            <th width="40">
              Sws.
              <br />
              Rate
            </th>
            <th width="40">Qtn Rate</th>
            <th width="40">Godown</th>
            <th width='100'>Batch No</th>
            <th>+</th>
          </tr>
        </thead>
        <tbody ref={formRef1}>
          {fullProdData?.length>0&&fullProdData.map((data,key)=>{

            return(
              <tr key={key}>
            <td>
              <Dropdown
                clearable
                selection
                required
                search={search}
                onKeyDown={handleKeyDown1}
                onChange={handleDropdownChangeItem}
                className="purchase-input-text table-drop d-flex align-items-center py-0 form-control custom-dropdown-border"
                name="fk_item"
                placeholder="Select"
                value={data.fk_item || ""}
                options={items}
              />
            </td>
            <td>
              <Dropdown
                clearable
                selection
                required
                search={search}
                onKeyDown={handleKeyDown1}
                onChange={(e,val)=>handleDropdownChangeType(e,val,data,key)}
                className="purchase-input-text table-drop d-flex align-items-center py-0 form-control custom-dropdown-width"
                name="fk_type"
                placeholder="Select"
                value={data.fk_type || ""}
                options={types}
              />
            </td>
            <td>
              <input
                type="text"
                className="border-0 rounded-1 w-100"
                value={data.qty || ""}
                onChange={(e)=>handleQtyChange(e,data,key)}
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
                value={data.fk_unit || ""}
                options={units}
              />
            </td>
            <td>
              <input
                type="text"
                className="border-0 rounded-1 w-100 "
                value={data.cost || ""}
                onChange={handleChange}
                onKeyDown={handleKeyDown1}
                name="cost"
              />
            </td>
            <td>
              <input
                type="text"
                className="border-0 rounded-1 w-100 "
                value={data.value || ""}
                onChange={handleChange}
                onKeyDown={handleKeyDown1}
                name="value"
              />
            </td>
            <td>
              <input
                type="text"
                className="border-0 rounded-1 w-100 "
                value={data.margin || ""}
                onChange={handleMarginChange}
                onKeyDown={handleKeyDown1}
                name="margin"
              />
            </td>
            <td>
              <input
                type="text"
                className="border-0 rounded-1 w-100 "
                value={data.retail_rate || ""}
                onChange={handleRetailChange}
                onKeyDown={handleKeyDown1}
                name="retail_rate"
              />
            </td>
            <td>
              <input
                type="text"
                className="border-0 rounded-1 w-100 "
                value={data.wholesale_rate || ""}
                onChange={handleChange}
                onKeyDown={handleKeyDown1}
                name="wholesale_rate"
              />
            </td>
            <td>
              <input
                type="text"
                className="border-0 rounded-1 w-100 "
                value={data.mrp_rate || ""}
                onChange={handleChange}
                onKeyDown={handleKeyDown1}
                name="mrp_rate"
              />
            </td>
            
           
            <td>
              <input
                type="text"
                className="border-0 rounded-1 w-100 "
                disabled
                name="super_wholesale_rate"
              />
            </td>
            <td>
              <input
                type="text"
                className="border-0 rounded-1 w-100 "
                disabled
                name="quotation_rate"
              />
            </td>
            <td>
              <input
                type="text"
                className="border-0 rounded-1 w-100 "
                disabled
                name="godown"
              />
            </td>
            <td>
              <input
                type="text"
                className="border-0 rounded-1 w-100 "
                value={data.batch_no || ""}
                onChange={handleChange}
                onKeyDown={handleKeyDown1}
                name="batch_no"
              />
            </td>
            <td></td>
          </tr>
            )
          })}
          

          <tr>
            <td>
              <Dropdown
                clearable
                selection
                required
                search={search}
                onKeyDown={handleKeyDown1}
                onChange={handleDropdownChangeItem}
                className="purchase-input-text table-drop d-flex align-items-center py-0 form-control custom-dropdown-width  "
                name="fk_item"
                placeholder="Select"
                value={produceData.fk_item || ""}
                options={items}
              />
            </td>
            <td>
              <Dropdown
                clearable
                selection
                required
                search={search}
                onKeyDown={handleKeyDown1}
                onChange={handleDropdownChangeType}
                className="purchase-input-text table-drop d-flex align-items-center py-0 form-control custom-dropdown-width"
                name="fk_type"
                placeholder="Select"
                value={produceData.fk_type || ""}
                options={types}
              />
            </td>
            <td>
              <input
                type="text"
                className="border-0 rounded-1 w-100"
                value={produceData.qty || ""}
                onChange={(e)=>handleQtyChange(e,produceData)}
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
                className="purchase-input-text table-drop d-flex align-items-center py-0 form-control custom-dropdown-width"
                name="fk_unit"
                placeholder="Select"
                value={produceData.fk_unit || ""}
                options={units}
              />
            </td>
            <td>
              <input
                type="text"
                className="border-0 rounded-1 w-100 "
                value={produceData.cost || ""}
                onChange={handleChange}
                onKeyDown={handleKeyDown1}
                name="cost"
              />
            </td>
            <td>
              <input
                type="text"
                className="border-0 rounded-1 w-100 "
                value={produceData.value || ""}
                onChange={handleChange}
                onKeyDown={handleKeyDown1}
                name="value"
              />
            </td>
            <td>
              <input
                type="text"
                className="border-0 rounded-1 w-100 "
                value={produceData.margin || ""}
                onChange={handleMarginChange}
                onKeyDown={handleKeyDown1}
                name="margin"
              />
            </td>
            <td>
              <input
                type="text"
                className="border-0 rounded-1 w-100 "
                value={produceData.retail_rate || ""}
                onChange={handleRetailChange}
                onKeyDown={handleKeyDown1}
                name="retail_rate"
              />
            </td>
            <td>
              <input
                type="text"
                className="border-0 rounded-1 w-100 "
                value={produceData.wholesale_rate || ""}
                onChange={handleChange}
                onKeyDown={handleKeyDown1}
                name="wholesale_rate"
              />
            </td>
            <td>
              <input
                type="text"
                className="border-0 rounded-1 w-100 "
                value={produceData.mrp_rate || ""}
                onChange={handleChange}
                onKeyDown={handleKeyDown1}
                name="mrp_rate"
              />
            </td>
            
           
            <td>
              <input
                type="text"
                className="border-0 rounded-1 w-100 "
                disabled
                name="super_wholesale_rate"
              />
            </td>
            <td>
              <input
                type="text"
                className="border-0 rounded-1 w-100 "
                disabled
                name="quotation_rate"
              />
            </td>
            <td>
              <input
                type="text"
                className="border-0 rounded-1 w-100 "
                disabled
                name="godown"
              />
            </td>
            <td>
              <input
                type="text"
                className="border-0 rounded-1 w-100 "
                value={produceData.batch_no || ""}
                onChange={handleChange}
                onKeyDown={handleKeyDown1}
                name="batch_no"
              />
            </td>
            <td><BsPlusSquareFill style={{color:'black'}} onClick={handleSubmit} onKeyDown={handleSubmit}/></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ItemProduce;

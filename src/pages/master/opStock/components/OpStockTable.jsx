import React from "react";
import searchIcon from "../../../../assets/icons/search.png";
import { GrRefresh } from "react-icons/gr";

export const OpStockTable = (props) => {
  const {itemList,setItemList,setFilter,filter} = props

  const handleChange = (id,e) =>{
    let tempData = itemList[id]
    let tempList = itemList
    if(e.target.value === ""){
      tempData = {...tempData,[e.target.name]:null}
    }else{
      tempData = {...tempData,[e.target.name]:e.target.value}
    }
    tempList.splice(id,1,tempData)
    setItemList([...tempList])
  }

  return (
    <div className="mt-4">
      <div
        style={{ background: "#000" }}
        className="w-100 d-flex justify-content-end"
      >
        <div className="col-3 p-2 stock-ledger-search d-flex align-items-center">
          <div className="col-1 me-2">
            <GrRefresh className="bg-light m-1 p-1 rounded-1" size={20} />
          </div>
          <div className="item_seach_bar_cont rounded-2 col-11 col-10">
            <img src={searchIcon} className="search_img me-3 ms-2 py-2" />
            <input
              value={filter.name}
              onChange={(e)=>setFilter({...filter,name:e.target.value})}
              className="item_search_bar rounded-2 border-0 py-1"
              placeholder="Search"
              type="text"
            />
          </div>
        </div>
      </div>
      <div className="op-stock-table-cont">
        <table className="table op-stock">
          <thead>
            <tr>
              <th width={"30"} className="ps-4 text-start">
                SL
              </th>
              <th width={"90"} className="ps-4 text-start">
                Code
              </th>
              <th width="190" className="text-start ps-3">
                Item Name
              </th>
              <th>HSN</th>
              <th>MRP</th>
              <th>Sale Rate</th>
              <th>P.Rate</th>
              <th>Cost</th>
              <th>Tax%</th>
              <th>Op Stock</th>
            </tr>
          </thead>
          <tbody>
           {itemList?.length>0 ?
            itemList?.map((data,i)=>
            (<tr key={i}>
              <td className="ps-4">
                {i+1}
              </td>
              <td width="130" className="ps-4">
                <input
                  type="text"
                  className="op-stock-input text-start text-danger"
                  placeholder="Enter"
                  onChange={(e)=>handleChange(i,e)}
                  name="code"
                  value={data.code||""}
                />
              </td>
              <td width="190" className="ps-3">
                <input
                  type="text"
                  className="op-stock-input text-start text-danger"
                  placeholder="Enter"
                  onChange={(e)=>handleChange(i,e)}
                  name="name"
                  value={data.name||""}
                />
              </td>
              <td>
                <input
                  type="number"
                  className="op-stock-input"
                  placeholder="Enter"
                  onChange={(e)=>handleChange(i,e)}
                  name="hsn"
                  value={data.hsn||""}
                />
              </td>
              <td>
                <input
                  type="number"
                  className="op-stock-input"
                  placeholder="Enter"
                  onChange={(e)=>handleChange(i,e)}
                  name="mrp_rate"
                  value={data.mrp_rate||""}
                />
              </td>
              <td>
                <input
                  type="number"
                  className="op-stock-input"
                  placeholder="Enter"
                  onChange={(e)=>handleChange(i,e)}
                  name="retail_rate"
                  value={data.retail_rate||""}
                />
              </td>
              <td>
                <input
                  type="number"
                  className="op-stock-input"
                  placeholder="Enter"
                  onChange={(e)=>handleChange(i,e)}
                  name="purchase_rate"
                  value={data.purchase_rate||""}
                />
              </td>
              <td>
                <input
                  type="number"
                  className="op-stock-input"
                  placeholder="Enter"
                  onChange={(e)=>handleChange(i,e)}
                  name="cost"
                  value={data.cost||""}
                />
              </td>
              <td>
                <input
                  type="number"
                  className="op-stock-input"
                  placeholder="Enter"
                  onChange={(e)=>handleChange(i,e)}
                  name="tax_gst"
                  value={data.tax_gst||""}
                />
              </td>
              <td>
                <input
                  type="number"
                  className="op-stock-input"
                  placeholder="Enter"
                  onChange={(e)=>handleChange(i,e)}
                  name="open_stock"
                  value={data.open_stock||""}
                />
              </td>
            </tr>)):
            <tr><td className="fs-5 py-2 text-center" colSpan={9}>No Items Added Yet</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

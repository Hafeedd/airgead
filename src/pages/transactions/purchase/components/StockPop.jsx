import React from "react";
import { useNavigate } from "react-router";

export const StockPop = (props) => {
  const { itemNameList, setTableItem, tableItem ,setShowStock} = props;
  
  const navigate = useNavigate()
  
  const handleSelect = (data) => {
    let tempItem = {...tableItem}
    tempItem = tempItem.map(x=>{
      let a = {}
      if(x == null ){
        a[x] = 0
      }else{
        a[x] = x
      }
      
    })
    if (data) {
      console.log(data)
      // let data = data.options.filter((x) => x?.value === data?.value)[0];
      tempItem = {
        ...tempItem,...data,
        sales_rate:data.retail_rate,
        item_name: data?.text,
        code: data?.description,
        fk_items: data?.value,
        unit: data?.unit,
      };
      setTableItem({ ...tempItem });
    }
    setShowStock(false)
  };

  const AdjustTableHeight = () => {
    let a = [];
    for (let i = 0; i < 9 - itemNameList.length || 0; i++)
      a.push(
        <tr className="border-0">
          <td
            colSpan={5}
            className="border-0"
            style={{ height: "2.7rem" }}
          ></td>
        </tr>
      );
    return a;
  };

  return (
    <div className="rounded-1">
      <div className="bg-dark rounded-top-1 text-light p-2 px-3 fs-5 d-flex align-items-center justify-content-between">
        Select Stock
        <div className="btn btn-light text-dark col-2" onClick={()=>navigate('/add')}>Add Item</div>
      </div>
      <div className="stock-body px-3">
        <table className="table stock-pop mt-3">
          <thead className="rounded-top-2">
            <tr>
              <th className="rounded-top-2 rounded-end-0">SL</th>
              <th width="110">Code</th>
              <th>Item Name</th>
              <th>Retail Rate</th>
              <th className="rounded-top-2 rounded-start-0">Stock</th>
            </tr>
          </thead>
          <tbody>
            {itemNameList.length > 0 ? (
              itemNameList.map((data, key) => (
                <tr className="tr-with-data" onClick={()=>handleSelect(data)}>
                  <td>{key + 1}</td>
                  <td>{data?.code}</td>
                  <td>{data?.name}</td>
                  <td>{data?.retail_rate}</td>
                  <td>{data?.sock || 0}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center fs-4">
                  No Item Added Yet
                </td>
              </tr>
            )}
            <AdjustTableHeight />
          </tbody>
        </table>
      </div>
      <div className="text-end px-3 mb-2">
        <div onClick={()=>setShowStock(false)} className="btn btn-dark col-2">Close</div>
      </div>
    </div>
  );
};

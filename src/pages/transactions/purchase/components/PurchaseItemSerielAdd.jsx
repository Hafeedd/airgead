import React, { useEffect, useState } from "react";
import useOnKey from "../../../../onKeyFunct/onKeyFunct";

export const PurchaseItemBatchAdd = (props) => {
  const { tableItemBatch, setTableItemBatch,edit,
    setPurchaseItemSerielModal, handleChangeTableItemBatch,
    purchaseItemSerielModal,handleTableItemReset,
    tableItemBatchList, setTableItemBatchList,
    tableItemList,setTableItemList,
    } = props;

  const [ref, setRef] = useState();
  const [batchList, setBatchList] = useState();

  const { handleKeyDown, formRef } = useOnKey(ref, setRef);

  useEffect(()=>{
    if(!purchaseItemSerielModal){
        handleReset()
        setBatchList([])
    }
  },[purchaseItemSerielModal])

  const addToBatchList = () => {
    let tempList = batchList ? [...batchList] : [];
    let valueLength = Object.values(tableItemBatch).length;
    if (valueLength > 5) {
      tempList.push(tableItemBatch);
    }
    setBatchList(tempList);
    handleReset();
  };

  const handleReset = () => {
    let keys = Object.keys(tableItemBatch);
    keys.map((key) => {
      setTableItemBatch((data) => ({ ...data, [key]: null }));
    });
  };

  const handleBatchAddBtn = (e) => {
    if(e.type === "keydown"){
      if(e.key !== "Enter"){
      return 0}
    }
      e.preventDefault();
      addToBatchList();
    handleKeyDown(e);
  };
  

  const handleRemoveBatch = (index) =>{
    if(!edit,index>-1){
        let tempList = [...batchList]
        tempList.splice(index,1)
        setBatchList(tempList)
    }
  }

  const handleClose = () =>{
    setPurchaseItemSerielModal(false)
    handleTableItemReset()
    setBatchList([])
    let tempList = [...tableItemList]
    let index = tempList.indexOf((data)=>data.cstm_id === purchaseItemSerielModal)
    if(index){
      tempList.splice(index,1)
    }
    setTableItemList(tempList)
  }

  console.log(tableItemBatchList)

  const handleBatchSubmit = (e) =>{
    if(batchList?.length>0){
      let ItemTempList = [...tableItemBatchList]
      batchList.map(data=>{
        let itemTemp = {...data}
        itemTemp = {...itemTemp,['cstm_id']:purchaseItemSerielModal}
        ItemTempList.push(itemTemp)
      })
      setTableItemBatchList(ItemTempList)
      setPurchaseItemSerielModal(false)
      handleTableItemReset()
    }
  }

  return (
    <div
      ref={formRef}
      className="p-0 row mx-0 pb-2 bg-dark"
      style={{ borderRadius: "0.3125rem", minHeight: "inherit" }}
    >
      <div className="col-12 table_cont">
        <table className="table table-hover purchase-serial-table">
          <thead>
            <tr>
              <th className="text-start ps-4 col-3">Barch/Serial</th>
              <th>Company Barcode</th>
              <th>Qty</th>
              <th>Company</th>
              <th>Size</th>
              <th colSpan={2}>Color</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  onKeyDown={handleKeyDown}
                  onChange={handleChangeTableItemBatch}
                  placeholder="Enter"
                  name="batch"
                  value={tableItemBatch.batch || ""}
                  className="seriel-input color-trnsp text-light"
                />
              </td>
              <td>
                <input
                  onKeyDown={handleKeyDown}
                  onChange={handleChangeTableItemBatch}
                  placeholder="Enter"
                  name="c_barcode"
                  value={tableItemBatch.c_barcode || ""}
                  className="seriel-input"
                />
              </td>
              <td>
                <input
                  onKeyDown={handleKeyDown}
                  onChange={handleChangeTableItemBatch}
                  placeholder="Enter"
                  name="qty"
                  value={tableItemBatch.qty || ""}
                  className="seriel-input"
                />
              </td>
              <td>
                <input
                  onKeyDown={handleKeyDown}
                  onChange={handleChangeTableItemBatch}
                  placeholder="Enter"
                  name="company"
                  value={tableItemBatch.company || ""}
                  className="seriel-input"
                />
              </td>
              <td>
                <input
                  onKeyDown={handleKeyDown}
                  onChange={handleChangeTableItemBatch}
                  placeholder="Enter"
                  name="size"
                  value={tableItemBatch.size || ""}
                  className="seriel-input"
                />
              </td>
              <td>
                <input
                  onKeyDown={handleKeyDown}
                  onChange={handleChangeTableItemBatch}
                  placeholder="Enter"
                  name="color"
                  value={tableItemBatch.color || ""}
                  className="seriel-input"
                />
              </td>
              <td>
                <button
                  onClick={handleBatchAddBtn}
                  onKeyDown={handleBatchAddBtn}
                  className="seriel-input-button"
                >
                  +
                </button>
              </td>
            </tr>
            {batchList &&
              batchList.map((data,i) => (
                <tr key={i}>
                  <td>
                    <div>{data.batch}</div>
                  </td>
                  <td>
                    <div className="seriel-data">{data.c_barcode || ""}</div>
                  </td>
                  <td>
                    <div className="seriel-data">{data.qty || ""}</div>
                  </td>
                  <td>
                    <div className="seriel-data">{data.company || ""}</div>
                  </td>
                  <td>
                    <div className="seriel-data">{data.size || ""}</div>
                  </td>
                  <td>
                    <div className="seriel-data">{data.color || ""}</div>
                  </td>
                  <td>
                    <div onClick={()=>handleRemoveBatch(i)} className="seriel-data-button">-</div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <span className="col-9 col-10 me-3"/>
      <div className="col-2 mt-3 d-flex align-items-end mb-2">
        <div onClick={()=>handleClose()} className="btn btn-light rounded-1 py-1 align-end w-100 me-2">
          Cancel
        </div>
        <div onClick={handleBatchSubmit} className="btn btn-primary rounded-1 py-1 align-end w-100">
          Submit
        </div>
      </div>
    </div>
  );
};

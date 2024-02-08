import React, { useEffect, useState } from "react";
import usePurchaseServices from "../../../../services/transactions/purchcaseServices";
import Swal from "sweetalert2";
import { FaPencilAlt } from "react-icons/fa";
import { MdClear, MdDeleteForever } from "react-icons/md";
import { AiOutlineArrowUp } from "react-icons/ai";
import useOnKey from "../../../../hooks/onKeyFunct/onKeyFunct";

const initialTableItemBatch = {
  id: null,
  cstm_id: null,
  batch_or_serial: null,
  company_barcode: null,
  batch_qty: null,
  company: null,
  size: null,
  color: null,
};

export const PurchaseItemBatchAdd = (props) => {
  const {
    edit,
    setPurchaseItemSerielModal,
    purchaseItemSerielModal,
    handleTableItemReset,
    tableItemBatchList,
    setTableItemBatchList,
    handleCloseItemBatch,
    setTableEdit,
    getData,
    handleBatchSubmit,
    batchKeys,
    setBatchKeys,
    showBatch,
    setShowBatch,
  } = props;

  const [ref, setRef] = useState();
  // const [batchList, setTableItemBatchList] = useState([]);
  const [batchEdit, setBatchEdit] = useState(false);
  const [tableItemBatch, setTableItemBatch] = useState(initialTableItemBatch);

  const { handleKeyDown, formRef } = useOnKey(ref, setRef);

  const {
    postPurchaseItem,
    putPurchaseItem,
    postPurchaseItemBatch,
    putPurchaseItemBatch,
    deletePurchaseItemBatch,
  } = usePurchaseServices();

  useEffect(() => {
    if (!purchaseItemSerielModal) {
      handleResetBatch();
      setTableItemBatchList([]);
    }
  }, [showBatch]);

  const handleChangeTableItemBatch = (e) => {
    if (e.target.value == "")
      setTableItemBatch((data) => ({ ...data, [e.target.name]: null }));
    else e.target.value = e.target.value.toUpperCase();
    setTableItemBatch((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const handleResetBatch = () => {
    let keys = Object.keys(tableItemBatch);
    keys.map((key) => {
      setTableItemBatch((data) => ({ ...data, [key]: null }));
    });
  };

  const addToBatchList = async () => {
    if (!tableItemBatch?.batch_or_serial) {
      Swal.fire("Please Enter seriel number", "", "warning");
      return 0;
    }
    let tempList = [...tableItemBatchList];
    let tempBatchKeys = [...batchKeys];
    let valueLength = Object.values(tableItemBatch).length;
    if (valueLength > 5) {
      try {
        const response = await postPurchaseItemBatch(tableItemBatch);
        if (response?.success) {
          tempBatchKeys.push({ id: response?.data?.id });
          tempList.push({ ...tableItemBatch, id: response?.data?.id });
          setBatchKeys(tempBatchKeys);
        } else {
          Swal.fire(response?.data?.message, "", "error");
        }
      } catch (err) {
        console.log(err);
        Swal.fire(err?.response?.data?.message, "", "error");
      }
    }
    setTableItemBatchList(tempList);
    handleResetBatch();
  };

  const handleBatchAddBtn = (e) => {
    if (e.type === "keydown") {
      if (e.key !== "Enter") {
        return 0;
      }
    }
    e.preventDefault();
    addToBatchList();
    handleKeyDown(e);
  };

  const handleRemoveBatch = async (index, data) => {
    if (index > -1) {
      let tempList = [...tableItemBatchList];
      tempList.splice(index, 1);
      setTableItemBatchList(tempList);
      if (edit) {
        const response = await deletePurchaseItemBatch(data.id);
      }
    } else {
      setTableEdit(false);
    }
  };

  const handleClose = () => {
    handleCloseItemBatch();
    setPurchaseItemSerielModal(false);
    setShowBatch(false);
    handleTableItemReset();
    setTableItemBatchList();
    setTableEdit(false);
  };

  const handelDeleteBatch = async (data) => {
    let id;
    if (batchEdit) {
      id = data.cstm_id;
    } else {
      id = data.id;
    }
  };

  const refreshBatchList = async () => {
    try {
      const data = await getData();
      if (data) {
        for (let purch of data) {
          for (let item of purch?.items) {
            if (item?.id == purchaseItemSerielModal) {
              if (item.batches?.length > 0)
                setTableItemBatchList(item?.batches);
            }
          }
        }
      }
    } catch (err) {}
  };

  const handleMoveToEdit = (data) => {
    setTableItemBatch(data);
    setBatchEdit(data);
  };

  const handleClearEdit = () => {
    setBatchEdit(false);
    handleResetBatch();
  };

  const handleEditBatch = async () => {
    try {
      let res;
      if (tableItemBatch?.id) {
        res = await putPurchaseItemBatch(tableItemBatch, tableItemBatch?.id);
      } else {
        Swal.fire("Nothing to edit yet", "please try again", "error");
      }
      if (res?.success) {
        Swal.fire("Batch edited successfully", "", "success");
        refreshBatchList();
        handleResetBatch();
      } else Swal.fire(res.message, "", "error");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      ref={formRef}
      className="p-0 row mx-0 pb-2 bg-dark"
      style={{ borderRadius: "0.3125rem", minHeight: "inherit" }}
    >
      <div className="col-12 px-0 table_cont">
        <table className="table table-hover purchase-serial-table">
          <thead>
            <tr>
              <th className="text-start ps-4 col-3">Barch/Serial</th>
              <th>Company Barcode</th>
              <th>Qty</th>
              <th>Company</th>
              <th>Size</th>
              <th>Color</th>
              {/* <th>Expiry</th> */}
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  onKeyDown={handleKeyDown}
                  onChange={handleChangeTableItemBatch}
                  placeholder="Enter"
                  name="batch_or_serial"
                  value={tableItemBatch.batch_or_serial || ""}
                  className="seriel-input color-trnsp text-light"
                />
              </td>
              <td>
                <input
                  onKeyDown={handleKeyDown}
                  onChange={handleChangeTableItemBatch}
                  placeholder="Enter"
                  name="company_barcode"
                  value={tableItemBatch.company_barcode || ""}
                  className="seriel-input"
                />
              </td>
              <td>
                <input
                  onKeyDown={handleKeyDown}
                  onChange={handleChangeTableItemBatch}
                  placeholder="Enter"
                  name="batch_qty"
                  value={tableItemBatch.batch_qty || ""}
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
              {/* <td>
                <input
                  onKeyDown={handleKeyDown}
                  onChange={handleChangeTableItemBatch}
                  placeholder="Enter"
                  name="expiry"
                  value={tableItemBatch.expiry || ""}
                  className="seriel-input"
                />
              </td> */}
              <td>
                {!batchEdit ? (
                  <button
                    onClick={handleBatchAddBtn}
                    onKeyDown={handleBatchAddBtn}
                    className="seriel-input-button"
                  >
                    +
                  </button>
                ) : (
                  <FaPencilAlt
                    onClick={handleEditBatch}
                    className="text-light cursor mx-2"
                  />
                )}
              </td>
              <td>
                {!batchEdit ? (
                  <div></div>
                ) : (
                  <MdClear
                    onClick={handleClearEdit}
                    className="text-light cursor fs-5 mx-2"
                  />
                )}
              </td>
            </tr>
            {tableItemBatchList &&
              tableItemBatchList?.map((data, i) => (
                <tr className="batch-seriel-row" key={i}>
                  <td>
                    <div>{data?.batch_or_serial}</div>
                  </td>
                  <td>
                    <div className="seriel-data">
                      {data?.company_barcode || ""}
                    </div>
                  </td>
                  <td>
                    <div className="seriel-data">{data?.batch_qty || ""}</div>
                  </td>
                  <td>
                    <div className="seriel-data">{data?.company || ""}</div>
                  </td>
                  <td>
                    <div className="seriel-data">{data?.size || ""}</div>
                  </td>
                  <td>
                    <div className="seriel-data">{data?.color || ""}</div>
                  </td>
                  <td className="">
                    <div>
                      <AiOutlineArrowUp
                        onClick={() => handleMoveToEdit(data)}
                        className="text-light cursor fs-5 mx-1"
                      />
                    </div>
                  </td>
                  <td className="">
                    <div onClick={() => handleRemoveBatch(i, data)}>
                      <MdDeleteForever className="text-light fs-5 cursor mx-1" />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <span className="col-9 col-10 me-3" />
      <div className="col-2 mt-3 d-flex align-items-end mb-2">
        <div
          onClick={() => handleClose()}
          className="btn btn-light rounded-1 py-1 align-end w-100 me-2"
        >
          Cancel
        </div>
        <div
          onClick={handleBatchSubmit}
          className="btn btn-primary rounded-1 py-1 align-end w-100"
        >
          Submit
        </div>
      </div>
    </div>
  );
};

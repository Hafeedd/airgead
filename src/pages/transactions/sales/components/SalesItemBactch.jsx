import { useEffect, useState } from "react";
import useOnKey from "../../../../hooks/onKeyFunct/onKeyFunct";
import Swal from "sweetalert2";
import { MdClear, MdDeleteForever } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { AiOutlineArrowUp } from "react-icons/ai";

export const SalesItemBactch = (props) => {
  const {
    tableItemBatch,
    tableItemBatchList,
    salesAdd,
    setSalesBatchShow,
    salesBatchShow,
    purchaseItemList,
    setSalesAdd,
  } = props;

  const [tableData, setTableData] = useState([]);
  const [batchShow, setBatcheShow] = useState([]);

  useEffect(() => {
    if (salesBatchShow && purchaseItemList?.length > 0) {
      const tempData = purchaseItemList.filter((item) => {
        return item.code == salesBatchShow;
      });
      setTableData(tempData);
    }
  }, [salesBatchShow]);

  const handleDataSelection = (data) => {
    console.log(data.code);
    if (data?.batches?.length > 0) {
      setBatcheShow(true);
      setTableData(data.batches);
    } else {
      setBatcheShow(false);
      setSalesBatchShow(false);
    }
    setSalesAdd((item) => ({
      ...item,
      fk_items: data.id,
      code: data.code,
      item_name: data.item_name,
      unit: data.unit,
    }));
  };

  return (
    <div className="sales-batch-table-cont-cont">
      <div className="text-light fs-5 ps-3 py-2">Purchase Item List</div>
      <div className="sales-batch-table-cont rounded-2 row">
        <table className="table sales-batch-table col-12">
          <thead>
            <tr>
              <th width="170">
                <div className="theadth">Batch/Serial</div>
              </th>
              <th width="150">
                <div className="theadth text-center">Company Barcode</div>
              </th>
              <th>
                <div className="theadth text-center">Rate</div>
              </th>
              <th>
                <div className="theadth text-center">Cost</div>
              </th>
              <th>
                <div className="theadth text-center">MRP</div>
              </th>
              <th>
                <div className="theadth text-center">P.Rate</div>
              </th>
              <th>
                <div className="theadth text-center">RAC</div>
              </th>
              <th>
                <div className="theadth text-center">...</div>
              </th>
              <th>
                <div className="theadth text-center">...</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.length > 0 ? (
              tableData.map((data, i) => (
                <tr
                  onClick={() => handleDataSelection(data)}
                  className="batch-seriel-row"
                  key={i}
                >
                  <td>
                    <div className="tbodytd">
                      <input
                        disabled
                        placeholder="..."
                        value={data.code || ""}
                      />
                    </div>
                  </td>

                  <td>
                    <div className="tbodytd">
                      <input
                        disabled
                        className="text-center"
                        placeholder="..."
                        value={data.item_name || ""}
                      />
                    </div>
                  </td>

                  <td>
                    <div className="tbodytd">
                      <input
                        disabled
                        className="text-center"
                        placeholder="..."
                        value={data.rate || ""}
                      />
                    </div>
                  </td>

                  <td>
                    <div className="tbodytd">
                      <input
                        disabled
                        className="text-center"
                        placeholder="..."
                        value={data.cost || ""}
                      />
                    </div>
                  </td>

                  <td>
                    <div className="tbodytd">
                      <input
                        disabled
                        className="text-center"
                        placeholder="..."
                        value={data.total || ""}
                      />
                    </div>
                  </td>

                  <td>
                    <div className="tbodytd">
                      <input
                        disabled
                        className="text-center"
                        placeholder="..."
                        value={data.rate || ""}
                      />
                    </div>
                  </td>

                  <td>
                    <div className="tbodytd">
                      <input
                        disabled
                        className="text-center"
                        placeholder="..."
                        value={data.sales_rate || ""}
                      />
                    </div>
                  </td>

                  <td>
                    <div className="tbodytd">
                      <input
                        disabled
                        className="text-center"
                        placeholder="..."
                        value={data.margin || ""}
                      />
                    </div>
                  </td>

                  <td>
                    <div className="tbodytd">
                      <input
                        disabled
                        className="text-center"
                        placeholder="..."
                        value={data.value || ""}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              // ))
              <tr>
                <td colSpan={9} className="pt-4 fs-5">
                  No item Added yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="sales-batch-footer row align-items-center">
        <span className="col-10" />
        <button
          onClick={() => setSalesBatchShow(false)}
          className="btn sales-batch-cbtn py-1 col-1 col-2 me-2"
        >
          Close
        </button>
        {/* <button className="btn sales-batch-sbtn col-1 col-2">Save</button> */}
      </div>
    </div>
  );
};

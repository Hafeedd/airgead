import React from "react";
import { useLocation } from "react-router";
import "./ProductionTransaction.css";

const ProductionTransaction = () => {
  const location = useLocation();
  return (
    <div className="item_add">
      <div className="itemList_header row mx-0">
        <div className="page_head ps-4 d-flex justify-content-between">
          <div>
            <div className="fs-5 py-2">Production</div>
            <div className="page_head_items">
              <div
                className={`page_head_item ${
                  location.pathname == "/production-transaction" && "active"
                }`}
              >
                Production
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-3 mt-3">
        <div className="p-2 bg-light rounded-1">
          <div className="col-12 d-flex ">
            <div
              className="col-3 pt-4 ps-4"
              style={{ backgroundColor: "#e6e6e6" }}
            >
              <div className="col-5">
                <div className="col-12 d-flex">
                  <div className="col-7 w-100">
                    <strong>Sales Value</strong>
                  </div>
                  <div className="col-5">:</div>
                </div>
                <div className="col-12 d-flex">
                  <div className="col-7 w-100">
                    <strong>Cost</strong>
                  </div>
                  <div className="col-5">:</div>
                </div>
                <div className="col-12 d-flex">
                  <div className="col-7 w-100">
                    <strong>Margin</strong>
                  </div>
                  <div className="col-5">:</div>
                </div>
              </div>
            </div>
            <div className="col-5">
              <div className="col-12 d-flex justify-content-end pt-4">
                <button className="col-1 col-2 bg-dark text-light border border-dark mt-5 rounded py-1">
                  Edit
                </button>
              </div>
            </div>
            <div className="col-4 px-3 pt-3">
              <div className="col-12 d-flex mb-2">
                <div className="col-6 d-flex mx-0">
                  <div className="col-4 mx-0">Doc.No</div>
                  <input type="text" className="rounded border col-8 " />
                </div>
                <div className="col-6 d-flex mx-0">
                  <div className="col-4 mx-0 ps-4">Date</div>
                  <input type="text" className="rounded border col-8 mx-2 " />
                </div>
              </div>
              <div className="col-12 d-flex mb-2">
                <div className="col-3">Checked by </div>
                <input type="text" className="col-9 rounded border ms-2" />
              </div>
              <div className="col-12 d-flex mb-2">
                <div className="col-3">Narration</div>
                <input type="text" className="col-9 rounded border ms-2" />{" "}
              </div>
            </div>
          </div>

          <div className="col-12 mt-1">
            <table className="w-100 ProdTable">
              <thead>
                <tr className="bg-dark text-light">
                  <th>Item Produced</th>
                  <th>P.Type</th>
                  <th>Qty</th>
                  <th>Unit</th>
                  <th>Cost</th>
                  <th>Value</th>
                  <th>Margin</th>
                  <th>MRP</th>
                  <th>S.Rate</th>
                  <th>Ws.Rate</th>
                  <th>sws.Rate</th>
                  <th>Qtn Rate</th>
                  <th>Godown</th>
                  <th>Batch No</th>
                  <th>+</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>item Number1</td>
                  <td>01.0 </td>
                  <td>0.0</td>
                  <td>102.</td>
                  <td>10%</td>
                  <td>10%</td>
                  <td>00.0 </td>
                  <td>12.0</td>
                  <td>5.0</td>
                  <td>2.0</td>
                  <td>01.0</td>
                  <td>545</td>
                  <td>540</td>
                  <td>540</td>
                  <td></td>
                </tr>

                <tr>
                  <td>item Number1</td>
                  <td>01.0 </td>
                  <td>0.0</td>
                  <td>102.</td>
                  <td>10%</td>
                  <td>10%</td>
                  <td>00.0 </td>
                  <td>12.0</td>
                  <td>5.0</td>
                  <td>2.0</td>
                  <td>01.0</td>
                  <td>545</td>
                  <td>540</td>
                  <td>540</td>
                  <td></td>
                </tr>
                <tr>
                  <td>item Number1</td>
                  <td>01.0 </td>
                  <td>0.0</td>
                  <td>102.</td>
                  <td>10%</td>
                  <td>10%</td>
                  <td>00.0 </td>
                  <td>12.0</td>
                  <td>5.0</td>
                  <td>2.0</td>
                  <td>01.0</td>
                  <td>545</td>
                  <td>540</td>
                  <td>540</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="col-12 mt-1 d-flex">
            <div className="col-6">
              <div className="div-head rounded-top ps-3 pt-1 my-0 py-0">Raw Materials Used</div>
              <table className="w-100 ProdTable1">
                <thead>
                  <tr className="bg-dark text-light">
                    <th>Item Produced</th>
                    <th>Item Used</th>
                    <th>Qty</th>
                    <th>Unit</th>
                    <th>Cost</th>
                    <th>S.Rate</th>
                    <th>Godown</th>
                    <th>+</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>item Number1</td>
                    <td>01.0 </td>
                    <td>0.0</td>
                    <td>102.</td>
                    <td>10%</td>
                    <td>10%</td>
                    <td>00.0 </td>
                    <td></td>
                  </tr>

                  <tr>
                    <td>item Number2</td>
                    <td>01.0 </td>
                    <td>0.0</td>
                    <td>102.</td>
                    <td>10%</td>
                    <td>10%</td>
                    <td>00.0 </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>item Number3</td>
                    <td>01.0 </td>
                    <td>0.0</td>
                    <td>102.</td>
                    <td>10%</td>
                    <td>10%</td>
                    <td>00.0 </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="col-6 ms-1 pe-1">
            <div className="div-head rounded-top ps-3 pt-1 my-0 py-0">By Products Details</div>
              <table className="w-100 ProdTable1">
                <thead>
                  <tr className="bg-dark text-light">
                    <th>Item Produced</th>
                    <th>P.Type</th>
                    <th>Qty</th>
                    <th>Unit</th>
                    <th>Cost</th>
                    <th>Value</th>
                    <th>Margin</th>
                    <th>MRP</th>
                    <th>S.Rate</th>
                    <th>+</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>item Number1</td>
                    <td>01.0 </td>
                    <td>0.0</td>
                    <td>102.</td>
                    <td>10%</td>
                    <td>10%</td>
                    <td>00.0 </td>
                    <td>12.0</td>
                    <td>5.0</td>
                    <td></td>
                  </tr>

                  <tr>
                    <td>item Number2</td>
                    <td>01.0 </td>
                    <td>0.0</td>
                    <td>102.</td>
                    <td>10%</td>
                    <td>10%</td>
                    <td>00.0 </td>
                    <td>12.0</td>
                    <td>5.0</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>item Number3</td>
                    <td>01.0 </td>
                    <td>0.0</td>
                    <td>102.</td>
                    <td>10%</td>
                    <td>10%</td>
                    <td>00.0 </td>
                    <td>12.0</td>
                    <td>5.0</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="col-12 mt-1">
          <div className="div-head rounded-top ps-3 pt-1 my-0 py-0">Labour and Expenses</div>
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
                <tr>
                  <td>item Number1</td>
                  <td>01.0 </td>
                  <td>0.0</td>
                  <td>102.</td>
                </tr>

                <tr>
                  <td>item Number1</td>
                  <td>01.0 </td>
                  <td>0.0</td>
                  <td>102.</td>
                </tr>
                <tr>
                  <td>item Number1</td>
                  <td>01.0 </td>
                  <td>0.0</td>
                  <td>102.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-12 d-flex justify-content-end mt-1">
                <button className="col-1 mx-1 rounded border border-dark bg-dark text-light py-1">Clear</button>
                <button className="col-1 rounded border border-dark bg-dark text-light py-1">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductionTransaction;

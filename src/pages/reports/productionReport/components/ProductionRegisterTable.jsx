import React from "react";
import "../productionreport.css";

const ProductionRegisterTable = () => {
  return (
    <div className="mt-4 pro-table-scroller">
      <div className="rounded production-head ms-2 me-2 py-3 d-flex justify-content-between">
        <div className="ms-3">Doc.No : PDB/00001</div>
        <div>Date : 15/03/2023</div>
        <div>Qty Produced : 255.33</div>
        <div>By Produced : 00.00</div>
        <div>Qty Used : 70.25</div>
        <div className="me-2">Expense : 0.00 (3 Items)</div>
      </div>

      <div className="col-12 d-flex justify-content-between">
        <div className="col-6 mt-2 pe-1">
          <div className="text-start bg-clr fw-bold fs-6 rounded-top ps-3 ms-2 w-100 py-1">
            Produced ( 1Item )
          </div>
          <table className="production-table ms-2 me-2">
            <thead>
              <tr>
                <th className="ps-3 text-start">Item Name</th>
                <th>QTY</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="ps-3 text-start">Item Number 1</td>
                <td>23.5</td>
              </tr>
              <tr>
                <td className="ps-3 text-start">Item Number 1</td>
                <td>23.5</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td
                  colSpan={2}
                  className="production-table-fl rounded-bottom align-middle text-end"
                >
                  255
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="col-6 mt-2 me-2 pe-2 ps-2">
          <div className="text-start bg-clr fw-bold rounded-top ps-3 py-1">
            Raw Meterials ( 2 Items )
          </div>
          <table className="production-table">
            <thead>
              <tr>
                <th className="text-start bg-clr ps-3">Meterials Name</th>
                <th>Qty</th>
                <th>Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="ps-3 text-start">Meterial Number 1 </td>
                <td>50.00</td>
                <td>20.33</td>
              </tr>
              <tr>
                <td className="ps-3 text-start">Meterial Number 1 </td>
                <td>50.00</td>
                <td>20.33</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td
                  colSpan={3}
                  className="production-table-fr rounded-bottom align-middle text-end"
                >
                  255
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div>
        <div className="col-12 d-flex mt-2 justify-content-between">
          <div className="col-5 col-6 mt-2 pe-1">
            <div className="text-start bg-clr fw-bold fs-6 rounded-top ps-3 ms-2 w-100 py-1">
              By Product Details
            </div>
            <table className="production-table ms-2 me-2 shadow p-3 mb-5 bg-white rounded">
              <thead>
                <tr>
                  <th className="ps-3 text-start">Item Produced</th>
                  <th>P.Type</th>
                  <th>Qty</th>
                  <th>Unit</th>
                  <th>Cost</th>
                  <th>Value</th>
                  <th>Margin</th>
                  <th>S.rate</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="ps-3 text-start">Item Number 1</td>
                  <td>01.0</td>
                  <td>0.0</td>
                  <td>102</td>
                  <td>10%</td>
                  <td>10%</td>
                  <td>0.00</td>
                  <td>12.0</td>
                </tr>
                <tr>
                  <td className="ps-3 text-start">Item Number 1</td>
                  <td>01.0</td>
                  <td>0.0</td>
                  <td>102</td>
                  <td>10%</td>
                  <td>10%</td>
                  <td>0.00</td>
                  <td>12.0</td>
                </tr>

                <tr>
                  <td className="ps-3 text-start">Item Number 1</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td className="ps-3 text-start">Item Number 1</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="col-6 col-7 mt-2 ms-2 pe-3 ps-1">
            <div className="text-start bg-clr-1 fw-bold rounded-top ps-3 py-1">
              Labour and Expenses
            </div>
            <table className="production-table-ls shadow p-3 mb-5 bg-white rounded">
              <thead>
                <tr>
                  <th className="text-center ps-1">
                    <div className="rounded me-3">Item Produced</div>
                  </th>
                  <th className="text-center">
                    <div className="rounded px-0 me-3">Debit Account</div>
                  </th>
                  <th className="text-center">
                    <div className="rounded px-0 me-3">Amount</div>
                  </th>
                  <th className="text-center">
                    <div className="rounded px-0 me-3">Credit A/c</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-center">
                    <div className="px-0 me-2 ">Meterial Number 1 </div>
                  </td>
                  <td className="text-center">
                    <div className="px-0  me-2">50.00</div>
                  </td>
                  <td className="text-center">
                    <div className="px-0  me-2">50.00</div>
                  </td>
                  <td className="text-center">50.00</td>
                </tr>
                <tr>
                  <td className="text-center">
                    <div className="px-0  me-2">Meterial Number 1 </div>
                  </td>
                  <td className="text-center">
                    <div className="px-0  me-2">50.00</div>
                  </td>
                  <td className="text-center">
                    <div className="px-0  me-2">50.00</div>
                  </td>
                  <td className="text-center">50.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductionRegisterTable;

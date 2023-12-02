import React from 'react'
import { GrRefresh } from 'react-icons/gr';
import searchIcon from "../../../../assets/icons/search.png";

const BillWiseLedgerTable = () => {
  return (
    <div className="row mx-0 mt-3">
      <div className="daybook-cont px-0">
        <div
          style={{ background: "#000" }}
          className="w-100 d-flex justify-content-end rounded-top-1"
        >
          <div className="col-3 p-2 stock-ledger-search d-flex align-items-center">
            <div className="col-1 me-2">
              <GrRefresh className="bg-light m-1 p-1 rounded-1" size={20} />
            </div>
            <div className="item_seach_bar_cont rounded-2 col-11 col-10">
              <img src={searchIcon} className="search_img me-3 ms-2 py-2" />
              <input
                className="item_search_bar rounded-2 border-0 py-1"
                placeholder="Search"
                type="text"
              />
            </div>
          </div>
        </div>
        <div className="day-book-table-cont">
          <table className="table daybook-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Doc. No</th>
                <th>A/c Name</th>
                <th>Narration</th>
                <th>Qty</th>
                <th>Rate</th>
                <th>Total</th>
                <th>Debit</th>
                <th>Credit</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Date</td>
                <td>Doc. No</td>
                <td>A/c Name</td>
                <td>Narration</td>
                <td>Qty</td>
                <td>Rate</td>
                <td>Total</td>
                <td>Debit</td>
                <td>Credit</td>
                <td>Balance</td>
              </tr>
              <tr>
                <td>Date</td>
                <td>Doc. No</td>
                <td>A/c Name</td>
                <td>Narration</td>
                <td>Qty</td>
                <td>Rate</td>
                <td>Total</td>
                <td>Debit</td>
                <td>Credit</td>
                <td>Balance</td>
              </tr>
              <tr>
                <td>Date</td>
                <td>Doc. No</td>
                <td>A/c Name</td>
                <td>Narration</td>
                <td>Qty</td>
                <td>Rate</td>
                <td>Total</td>
                <td>Debit</td>
                <td>Credit</td>
                <td>Balance</td>
              </tr>
              <tr>
                <td>Date</td>
                <td>Doc. No</td>
                <td>A/c Name</td>
                <td>Narration</td>
                <td>Qty</td>
                <td>Rate</td>
                <td>Total</td>
                <td>Debit</td>
                <td>Credit</td>
                <td>Balance</td>
              </tr>
              <tr>
                <td>Date</td>
                <td>Doc. No</td>
                <td>A/c Name</td>
                <td>Narration</td>
                <td>Qty</td>
                <td>Rate</td>
                <td>Total</td>
                <td>Debit</td>
                <td>Credit</td>
                <td>Balance</td>
              </tr>
              <tr>
                <td>Date</td>
                <td>Doc. No</td>
                <td>A/c Name</td>
                <td>Narration</td>
                <td>Qty</td>
                <td>Rate</td>
                <td>Total</td>
                <td>Debit</td>
                <td>Credit</td>
                <td>Balance</td>
              </tr>
              <tr>
                <td>Date</td>
                <td>Doc. No</td>
                <td>A/c Name</td>
                <td>Narration</td>
                <td>Qty</td>
                <td>Rate</td>
                <td>Total</td>
                <td>Debit</td>
                <td>Credit</td>
                <td>Balance</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BillWiseLedgerTable
import React from "react";
import { GrRefresh } from "react-icons/gr";
import searchIcon from "../../../../assets/icons/search.png";
import "./purchaseRegisterTable.css";

const PurchaseBookTable = () => {
  return (
    <div className="row mx-0 mt-3">
      <div className="daybook-cont">
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
        <div className="stick-table table-scroll">
          <table className="table daybook-table">
            <thead>
              <tr>
                <th>Doc No</th>
                <th>Date</th>
                <th>Party</th>
                <th>Gross</th>
                <th>CGST</th>
                <th>SGST</th>
                <th>Cess1</th>
                <th>Cess2</th>
                <th>Total</th>
                <th>P.Returnn</th>
                <th>Netamt</th>
                <th>Paidamt</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Doc No</td>
                <td>Date</td>
                <td>Party</td>
                <td>Gross</td>
                <td>CGST</td>
                <td>SGST</td>
                <td>Cess1</td>
                <td>Cess2</td>
                <td>Total</td>
                <td>P.Returnn</td>
                <td>Netamt</td>
                <td>Paidamt</td>
                <td>Balance</td>
              </tr>
              <tr>
                <td>Doc No</td>
                <td>Date</td>
                <td>Party</td>
                <td>Gross</td>
                <td>CGST</td>
                <td>SGST</td>
                <td>Cess1</td>
                <td>Cess2</td>
                <td>Total</td>
                <td>P.Returnn</td>
                <td>Netamt</td>
                <td>Paidamt</td>
                <td>Balance</td>
              </tr>
              <tr>
                <td>Doc No</td>
                <td>Date</td>
                <td>Party</td>
                <td>Gross</td>
                <td>CGST</td>
                <td>SGST</td>
                <td>Cess1</td>
                <td>Cess2</td>
                <td>Total</td>
                <td>P.Returnn</td>
                <td>Netamt</td>
                <td>Paidamt</td>
                <td>Balance</td>
              </tr>
              <tr>
                <td>Doc No</td>
                <td>Date</td>
                <td>Party</td>
                <td>Gross</td>
                <td>CGST</td>
                <td>SGST</td>
                <td>Cess1</td>
                <td>Cess2</td>
                <td>Total</td>
                <td>P.Returnn</td>
                <td>Netamt</td>
                <td>Paidamt</td>
                <td>Balance</td>
              </tr>
              <tr>
                <td>Doc No</td>
                <td>Date</td>
                <td>Party</td>
                <td>Gross</td>
                <td>CGST</td>
                <td>SGST</td>
                <td>Cess1</td>
                <td>Cess2</td>
                <td>Total</td>
                <td>P.Returnn</td>
                <td>Netamt</td>
                <td>Paidamt</td>
                <td>Balance</td>
              </tr>
              <tr>
                <td>Doc No</td>
                <td>Date</td>
                <td>Party</td>
                <td>Gross</td>
                <td>CGST</td>
                <td>SGST</td>
                <td>Cess1</td>
                <td>Cess2</td>
                <td>Total</td>
                <td>P.Returnn</td>
                <td>Netamt</td>
                <td>Paidamt</td>
                <td>Balance</td>
              </tr>
              <tr>
                <td>Doc No</td>
                <td>Date</td>
                <td>Party</td>
                <td>Gross</td>
                <td>CGST</td>
                <td>SGST</td>
                <td>Cess1</td>
                <td>Cess2</td>
                <td>Total</td>
                <td>P.Returnn</td>
                <td>Netamt</td>
                <td>Paidamt</td>
                <td>Balance</td>
              </tr>
              <tr>
                <td>Doc No</td>
                <td>Date</td>
                <td>Party</td>
                <td>Gross</td>
                <td>CGST</td>
                <td>SGST</td>
                <td>Cess1</td>
                <td>Cess2</td>
                <td>Total</td>
                <td>P.Returnn</td>
                <td>Netamt</td>
                <td>Paidamt</td>
                <td>Balance</td>
              </tr>
              <tr>
                <td>Doc No</td>
                <td>Date</td>
                <td>Party</td>
                <td>Gross</td>
                <td>CGST</td>
                <td>SGST</td>
                <td>Cess1</td>
                <td>Cess2</td>
                <td>Total</td>
                <td>P.Returnn</td>
                <td>Netamt</td>
                <td>Paidamt</td>
                <td>Balance</td>
              </tr>
              <tr>
                <td>Doc No</td>
                <td>Date</td>
                <td>Party</td>
                <td>Gross</td>
                <td>CGST</td>
                <td>SGST</td>
                <td>Cess1</td>
                <td>Cess2</td>
                <td>Total</td>
                <td>P.Returnn</td>
                <td>Netamt</td>
                <td>Paidamt</td>
                <td>Balance</td>
              </tr>
              <tr>
                <td>Doc No</td>
                <td>Date</td>
                <td>Party</td>
                <td>Gross</td>
                <td>CGST</td>
                <td>SGST</td>
                <td>Cess1</td>
                <td>Cess2</td>
                <td>Total</td>
                <td>P.Returnn</td>
                <td>Netamt</td>
                <td>Paidamt</td>
                <td>Balance</td>
              </tr>
              <tr>
                <td>Doc No</td>
                <td>Date</td>
                <td>Party</td>
                <td>Gross</td>
                <td>CGST</td>
                <td>SGST</td>
                <td>Cess1</td>
                <td>Cess2</td>
                <td>Total</td>
                <td>P.Returnn</td>
                <td>Netamt</td>
                <td>Paidamt</td>
                <td>Balance</td>
              </tr>
              <tr>
                <td>Doc No</td>
                <td>Date</td>
                <td>Party</td>
                <td>Gross</td>
                <td>CGST</td>
                <td>SGST</td>
                <td>Cess1</td>
                <td>Cess2</td>
                <td>Total</td>
                <td>P.Returnn</td>
                <td>Netamt</td>
                <td>Paidamt</td>
                <td>Balance</td>
              </tr>
              <tr>
                <td>Doc No</td>
                <td>Date</td>
                <td>Party</td>
                <td>Gross</td>
                <td>CGST</td>
                <td>SGST</td>
                <td>Cess1</td>
                <td>Cess2</td>
                <td>Total</td>
                <td>P.Returnn</td>
                <td>Netamt</td>
                <td>Paidamt</td>
                <td>Balance</td>
              </tr>
              <tr>
                <td>Doc No</td>
                <td>Date</td>
                <td>Party</td>
                <td>Gross</td>
                <td>CGST</td>
                <td>SGST</td>
                <td>Cess1</td>
                <td>Cess2</td>
                <td>Total</td>
                <td>P.Returnn</td>
                <td>Netamt</td>
                <td>Paidamt</td>
                <td>Balance</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PurchaseBookTable;

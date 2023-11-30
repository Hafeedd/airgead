import React from "react";
import { GrRefresh } from "react-icons/gr";
import searchIcon from "../../../../assets/icons/search.png";
import "./purchaseRegisterTable.css";

const PurchaseBookTable = (props) => {
  const { purchaseBookList, setPurchaseBookList } = props;

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
              {purchaseBookList?.length > 0 ? (
                purchaseBookList.map((data, i) => {
                  let gross = 0;
                  gross =
                    (data?.total_amount ||
                    0) - (data?.total_sgst || 0 + data?.total_cgst || 0);
                  let total = 0;
                  total =
                    gross + (data?.total_sgst || 0 + data?.total_cgst || 0);
                  let netAmount = 0;
                  netAmount = total - (data?.purchase_return || 0);
                  let balance = 0;
                  balance = netAmount - data?.payment_amount || 0;

                  return (
                    <tr key={i}>
                      <td>{data?.documents_no || "..."}</td>
                      <td>
                        {data?.created_at
                          .slice(0, 10)
                          .split("-")
                          .reverse()
                          .join("/") || "..."}
                      </td>
                      <td>{data?.fk_supplier?.name || ""}</td>
                      <td>{gross.toFixed(2) || 0}</td>
                      <td>{data.total_cgst || 0}</td>
                      <td>{data.total_sgst || 0}</td>
                      <td>{data.total_cess1 || 0}</td>
                      <td>{data.total_cess2 || 0}</td>
                      <td>{total.toFixed(2) || 0}</td>
                      <td>{data?.purchase_return || 0}</td>
                      <td>{netAmount.toFixed(2) || 0}</td>
                      <td>{data?.payment_amount || 0}</td>
                      <td>{balance.toFixed(2) || 0}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={13} className="fs-4 text-center">
                    {" "}
                    No Reports yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PurchaseBookTable;

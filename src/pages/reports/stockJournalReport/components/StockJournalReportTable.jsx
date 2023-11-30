import React from "react";
import { GrRefresh } from "react-icons/gr";
import searchIcon from "../../../../assets/icons/search.png";

export const StockJournalReportTable = () => {
  return (
    <div>
      <div className="mt-3">
        <div
          style={{ background: "#000" }}
          className="w-100 d-flex justify-content-end align-items-center rounded-top-2"
        >
          <div className="col-3 p-2 stock-ledger-search d-flex align-items-center">
            <div className="col-1 me-2">
              <GrRefresh className="bg-light m-1 p-1 rounded-1" size={20} />
            </div>
            <div className="item_seach_bar_cont rounded-2 col-11 col-10">
              <img src={searchIcon} className="search_img me-3 ms-2 py-2" />
              <input
                // value={search}
                //   onChange={handleSearch}
                className="item_search_bar rounded-2 border-0 py-1"
                placeholder="Search"
                type="text"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className="stock-journal-report-table-cont"
      >
        <table className="table">
          <thead className="text-light">
            <tr>
              <th width="210" className="text-start ps-3">
                Item Name
              </th>
              <th width="180" className="">
                QTY
              </th>
              <th width="200" className="text-start ps-3">
                UT
              </th>
              <th width="150">Cost</th>
              <th>Gross</th>
              <th>Net Amnt</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="top-tr text-start ps-3 py-3" colSpan={6}>Ledger Name : CASH IN HAND {'( CASH )'} {'( 19 Items )'}</td>
            </tr>
            <tr>
              <td className="py-4" colSpan={6}></td>
            </tr>
            <tr>
              <td className="bottom-tr py-4" colSpan={6}></td>
            </tr>
            <tr>
              <td className="top-tr text-start ps-3 py-3" colSpan={6}>Ledger Name : CASH IN HAND {'( CASH )'} {'( 19 Items )'}</td>
            </tr>
            <tr>
              <td className="py-4" colSpan={6}></td>
            </tr>
            <tr>
              <td className="bottom-tr py-4" colSpan={6}></td>
            </tr>
            <tr>
              <td className="top-tr text-start ps-3 py-3" colSpan={6}>Ledger Name : CASH IN HAND {'( CASH )'} {'( 19 Items )'}</td>
            </tr>
            <tr>
              <td className="py-4" colSpan={6}></td>
            </tr>
            <tr>
              <td className="bottom-tr py-4" colSpan={6}></td>
            </tr>
          </tbody>
        </table>
      </div>
      <br />
      <div className="row">
        <div className="w-100 d-flex justify-content-end mb-0">
          <div className="btn btn-dark col-1 col-2 py-0">Exit</div>
        </div>
      </div>
    </div>
  );
};

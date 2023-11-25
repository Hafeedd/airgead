import React, { useEffect, useState } from "react";
import searchIcon from "../../../../assets/icons/search.png";
import { GrRefresh } from "react-icons/gr";

export const TaxTable = (props) => {
  const { params } = props;

  const [tableHead, setTableHead] = useState([
    "Doc No.",
    "Date",
    "GST No",
    "Party",
    "HSN",
    "Item",
    "Tax",
    "QTY",
    "UT",
    "Value",
    "C-GST",
    "S-GST",
    "Total",
  ]);

  useEffect(() => {
    if (params.report_type) {
      let a;
      switch (params.report_type) {
        // case 'item_wise':
        //     setTableHead(['Doc No.','Date',"GST No","Party","HSN","Item","Tax","QTY","UT","Value","C-GST","S-GST","Total"]);break;
        case "hsn_wise":
          setTableHead(["HSN", "QTY", "Value", "C-GST", "S-GST", "Total"]);
          break;
        case "percentage_wise":
          setTableHead([
            "Tax",
            "Doc No.",
            "Date",
            "QTY",
            "Value",
            "C-GST",
            "S-GST",
            "VAT",
            "Cess1",
            "Cess2",
            "Total",
          ]);
          break;
        case "tax_summary":
          setTableHead(["S/N", "Tax", "Value", "C-GST", "S-GST", "Total"]);
          break;
        case "date_summary":
          setTableHead([
            "Date",
            "Doc No",
            "Tax",
            "Value",
            "C-GST",
            "S-GST",
            "Total",
          ]);
          break;
        default:
          setTableHead([
            "Doc No.",
            "Date",
            "GST No",
            "Party",
            "HSN",
            "Item",
            "Tax",
            "QTY",
            "UT",
            "Value",
            "C-GST",
            "S-GST",
            "Total",
          ]);
          break;
      }
    }
  }, [params.report_type]);

  return (
    <div className=" mx-0 mt-2 tax-report-cont">
      <div
        style={{ background: "#000" }}
        className="w-100 d-flex justify-content-end rounded-top-1"
      >
        <div className="col-3 p-2 stock-ledger-search d-flex align-items-center">
          <div className="col-1 me-2">
            <GrRefresh
              //   onClick={() => setSearchedList(dayBookList)}
              className="bg-light m-1 p-1 rounded-1"
              size={20}
            />
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
      <table className="table tax-report">
        <thead>
          <tr>
            {tableHead?.length > 0 &&
              tableHead?.map((data, i) => {
                console.log(data);
                return <th key={i}>{data}</th>;
              })}
          </tr>
        </thead>
        <tbody>
          <tr>
            {tableHead?.length > 0 &&
              tableHead?.map((data, i) => {
                console.log(data);
                return <td key={i}></td>;
              })}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

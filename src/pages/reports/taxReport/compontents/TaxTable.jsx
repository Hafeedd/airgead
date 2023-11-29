import React, { useEffect, useState } from "react";
import searchIcon from "../../../../assets/icons/search.png";
import { GrRefresh } from "react-icons/gr";

export const TaxTable = (props) => {
  const { params, reportList } = props;

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

  const [searchedList, setSearchedList] = useState([]);

  useEffect(() => {
    setSearchedList(reportList);
  }, [reportList]);

  const handleSearch = async (e) => {
    try {
      let tempData,
        tempList = reportList;
      if (reportList) {
        let value = e.target.value.toLocaleLowerCase();
        if (value != "") {
          if (reportList.length > 0) {
            let searchName = []
            if(params.report_type == 'item_wise'){
              // searchName = {"party",'hsn','document_number'}
            }




            tempData = tempList?.filter((x) => {
              let searchInString = `${
                x.document_no?.toLocaleLowerCase() +
                " " +
                x.date?.toLocaleLowerCase()
              }`;
              let search = searchInString?.includes(value);
              if (search) {
                return true;
              }
            });
            setSearchedList(tempData);
          }
        } else {
          setSearchedList(reportList);
        }
      }
    } catch {}
  };

  return (
    <div className=" mx-0 mt-2 tax-report-cont">
      <div
          style={{ background: "#000" }}
          className="w-100 d-flex justify-content-end rounded-top-1"
        >
          <div className="col-3 p-2 stock-ledger-search d-flex align-items-center">
            <div className="col-1 me-2">
              <GrRefresh
                onClick={() => setSearchedList(reportList)}
                className="bg-light m-1 p-1 rounded-1"
                size={20}
              />
            </div>
            <div className="item_seach_bar_cont rounded-2 col-11 col-10">
              <img src={searchIcon} className="search_img me-3 ms-2 my-0"/>
              <input
                // value={search}
                onChange={handleSearch}
                className="item_search_bar rounded-2 border-0 py-1"
                placeholder="Search"
                type="text"
              />
            </div>
          </div>
      </div>
      {/* <div className="tax-report-table-cont"> */}
      <table className="table tax-report">
        <thead>
          <tr>
            {tableHead?.length > 0 &&
              tableHead?.map((data, i) => {
                return <th key={i}>{data}</th>;
              })}
          </tr>
        </thead>
        <tbody>
          {
            // itemm wise report
            params.report_type == "item_wise"
              ? searchedList?.item_wise_report?.length > 0 &&
                searchedList.item_wise_report?.map((data, i) => (
                  <tr>
                    <td>{data["document_number"]}</td>
                    <td>
                      {data["date"]?.slice(0, 10).split("-").reverse().join("-")}
                    </td>
                    <td>{data["gst_number"]}</td>
                    <td>{data?.party}</td>
                    <td>{data?.item_wise_common[0]?.hsn}</td>
                    <td>{data?.item_wise_common[0].item_name}</td>
                    <td>{data?.item_wise_common[0].tax_gst}</td>
                    <td>{data?.item_wise_common[0].quantity}</td>
                    <td>{data?.item_wise_common[0].fk_unit}</td>
                    <td>{data?.item_wise_common[0].value}</td>
                    <td>{data?.item_wise_common[0].cgst?.toFixed(2)}</td>
                    <td>{data?.item_wise_common[0].sgst?.toFixed(2)}</td>
                    <td>{data?.item_wise_common[0].total?.toFixed(2)}</td>
                  </tr>
                ))
              : //  hsn wise report
              params.report_type == "hsn_wise"
              ? searchedList?.hsn_wise_report?.length > 0 &&
                searchedList.hsn_wise_report?.map((data, i) => (
                  <tr>
                    <td>{data.hsn}</td>
                    <td>{data.quantity}</td>
                    <td>{data.value}</td>
                    <td>{data.cgst}</td>
                    <td>{data.sgst}</td>
                    <td>{data.total}</td>
                  </tr>
                ))
              : //  percentage wise report
              params.report_type == "percentage_wise"
              ? searchedList?.percentage_wise?.length > 0 &&
                searchedList.percentage_wise?.map((data, i) => (
                  <tr>
                    <td>{data.tax}</td>
                    <td>{data.documents}</td>
                    <td>
                      {data.date?.slice(0, 10).split("-").reverse().join("-")}
                    </td>
                    <td>{data.quantity}</td>
                    <td>{data.value}</td>
                    <td>{data.cgst}</td>
                    <td>{data.sgst}</td>
                    <td>{data.tax}</td> {/* vat */}
                    <td>{data.cess1}</td> {/* cess2 */}
                    <td>{data.cess2 || 0}</td> {/* cess1 */}
                    <td>{data.total}</td>
                  </tr>
                ))
              : //   tax summary report
              params.report_type == "tax_summary"
              ? searchedList?.summery?.length > 0 &&
                searchedList.summery?.map((data, i) => (
                  <tr>
                    <td>{i + 1}</td>
                    <td>{data.tax}</td>
                    <td>{data.value}</td>
                    <td>{data.cgst}</td>
                    <td>{data.sgst}</td>
                    <td>{data.total}</td>
                  </tr>
                ))
              : //   tax summary report
                params.report_type == "date_summary" &&
                searchedList?.summery?.length > 0 &&
                searchedList.summery?.map((data, i) => (
                  <tr>
                    <td>
                      {data.date?.slice(0, 10).split("-").reverse().join("-")}
                    </td>
                    <td>{data.documents}</td>
                    <td>{data.tax}</td>
                    <td>{data.value}</td>
                    <td>{data.cgst}</td>
                    <td>{data.sgst}</td>
                    <td>{data.total}</td>
                  </tr>
                ))
          }
        </tbody>
      </table>
      {/* </div> */}
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { BsFiletypePdf, BsWhatsapp } from "react-icons/bs";
import { RiFileExcel2Line } from "react-icons/ri";
import { TfiEmail, TfiPrinter } from "react-icons/tfi";
import searchIcon from "../../../../assets/icons/search.png";
import { GrRefresh } from "react-icons/gr";
import { useNavigate } from "react-router";
const CustomerOutstandingDetails = (props) => {
  const {
    custOutstanding,
    setCustOutstanding,
    paramsToReport,
    setParamsToReport,
    columnVisibility,
  } = props;

  const navigate = useNavigate()

  const handleChange = (e) => {
    if (e.target.value === "") {
      setParamsToReport({ ...paramsToReport, [e.target.name]: null });
    } else {
      setParamsToReport({ ...paramsToReport, [e.target.name]: e.target.value });
    }
  };
  const [searchedList, setSearchedList] = useState([]);

  useEffect(() => {
    setSearchedList(custOutstanding.user_array);
  }, [custOutstanding.user_array]);

  const handleSearch = async (e) => {
    try {
      let tempData,
        tempList = custOutstanding.user_array;
      if (custOutstanding.user_array) {
        let value = e.target.value.toLocaleLowerCase();
        if (value != "") {
          if (custOutstanding.user_array.length > 0) {
            tempData = tempList?.filter((x) => {
              console.log(x);
              let searchInString = `${
                x.data1[0].user_code?.toLocaleLowerCase() +
                x.data1[0].user_name?.toLocaleLowerCase() +
                " " +
                x.data1[0].user_mobile?.toLocaleLowerCase()
              }`;
              let search = searchInString?.includes(value);
              if (search) {
                return true;
              }
            });
            setSearchedList(tempData);
          }
        } else {
          setSearchedList(custOutstanding.user_array);
        }
      }
    } catch {}
  };

  return (
    <div className="px-0">
      <div className="d-flex row mx-0 justify-content-start align-items-center">
        <div className="col-12 mt-1 d-flex justify-content-start px-0">
          <div
            style={{ background: "#4B4B4B" }}
            className="reports-btn btn rounded-1 col-1 col-2 py-0 me-3 mx-0"
          >
            <BsFiletypePdf className="me-2 text-" size={18} />
            PDF
          </div>
          <div
            style={{ background: "#4B4B4B" }}
            className="reports-btn btn rounded-1 col-1 col-2 py-0 me-3"
          >
            <RiFileExcel2Line className="me-2" size={18} />
            Excel
          </div>
          <div
            style={{ background: "#4B4B4B" }}
            className="reports-btn btn rounded-1 col-1 col-2 py-0 me-3"
          >
            <TfiPrinter size={18} className="me-2 h-100" />
            Print
          </div>
          <div
            style={{ background: "#4B4B4B" }}
            className="reports-btn btn rounded-1 col-1 col-2 py-0 me-3"
          >
            <TfiEmail size={18} className="me-2 h-100" />
            Email
          </div>
          <div
            style={{ background: "#4B4B4B" }}
            className="reports-btn btn rounded-1 col-1 col-2 py-0"
          >
            <BsWhatsapp size={18} className="me-2 h-100" />
            Whatsapp
          </div>
        </div>
        <div className="row mt-2 col-12 mx-0 px-0">
          <Form.Group className="col-4 col-3 pe-4 ps-0 mx-0 d-flex align-items-start mt-1">
            <Form.Label className="col-2 purchase-input-label align-middle">
              From
            </Form.Label>
            <Form.Control
              onChange={handleChange}
              required
              name="from_date"
              value={
                paramsToReport.from_date || new Date().toISOString.slice(0, 10)
              }
              className="purchase-input-text me-2"
              placeholder="Document number"
              type="date"
            />
          </Form.Group>
          <Form.Group className="col-4 col-3 pe-4 ps-0 mx-0 d-flex align-items-start mt-1">
            <Form.Label className="col-2 purchase-input-label align-middle">
              Upto
            </Form.Label>
            <Form.Control
              onChange={handleChange}
              required
              name="to_date"
              value={
                paramsToReport.to_date || new Date().toISOString.slice(0, 10)
              }
              className="purchase-input-text me-2"
              placeholder="Document number"
              type="date"
            />
          </Form.Group>
        </div>
      </div>

      <div>
        <div className="mt-3">
          <div
            style={{ background: "#000" }}
            className="w-100 d-flex justify-content-between align-items-center"
          >
            <div className="mx-0 px-0 col-2 ps-3">
              <select
                name="payment_type"
                value={paramsToReport.payment_type || ""}
                className="account-select-dropdown bg-light text-dark ms-0 pe-0"
                onChange={handleChange}
              >
                <option value="">All</option>
                <option value="to_receive">Receivable Only</option>
                <option value="to_give">Payable Only</option>
                <option value="with_balance_only">With Balance Only</option>
              </select>
            </div>
            <div className="col-3 p-2 stock-ledger-search d-flex align-items-center me-1">
              <div className="col-1 me-2">
                <GrRefresh className="bg-light m-1 p-1 rounded-1" size={20} />
              </div>
              <div className="item_seach_bar_cont rounded-2 col-11 col-10">
                <img src={searchIcon} className="search_img me-3 ms-2 py-2" />
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
        </div>
        <div style={{ height: "24rem", overflowY: "scroll" }}>
          <table
            className="col-12 px-0 mx-0 outstanding-table"
            style={{ background: "#000" }}
          >
            <thead className="text-light">
              <tr>
                {columnVisibility?.code && <th>Code</th>}
                {columnVisibility?.customer && <th>Customer</th>}
                {columnVisibility?.address && <th>Address</th>}
                {columnVisibility?.mobile && <th>Mobile</th>}
                {columnVisibility?.opbal && <th>Op.Balance</th>}
                {columnVisibility?.debit && <th>Debit</th>}
                {columnVisibility?.credit && <th>Credit</th>}
                {columnVisibility?.clbal && <th>Cl.Balance</th>}
              </tr>
            </thead>
            <tbody className="bg-light">
              {searchedList?.length > 0 &&
                searchedList?.map((data, i) => {
                  console.log(data);
                  return (
                    <tr key={i}>
                      {columnVisibility?.code && (
                        <td>{data?.data1[0].user_code}</td>
                      )}
                      {columnVisibility?.customer && (
                        <td>{data?.data1[0].user_name}</td>
                      )}
                      {columnVisibility?.address && (
                        <td>{data?.data1[0].user_address}</td>
                      )}
                      {columnVisibility?.mobile && (
                        <td>{data?.data1[0].user_mobile}</td>
                      )}
                      {columnVisibility?.opbal && (
                        <td>
                          {data?.opening_balance_new < 0
                            ? Math.abs(data?.opening_balance_new).toFixed(2) + " Cr"
                            : data?.opening_balance_new > 0
                            ? data?.opening_balance_new.toFixed(2) + " Db"
                            : 0}
                        </td>
                      )}
                      {columnVisibility?.debit && <td>{data?.sum_debit.toFixed(2)}</td>}
                      {columnVisibility?.credit && <td>{data?.sum_credit.toFixed(2)}</td>}
                      {columnVisibility?.clbal && (
                        <td>
                          {data?.closing_balance < 0
                            ? Math.abs(data?.closing_balance).toFixed(2) + " Cr"
                            : data?.closing_balance > 0
                            ? data?.closing_balance.toFixed(2) + " Db"
                            : 0}
                        </td>
                      )}
                    </tr>
                  );
                })}
            </tbody>

            <tfoot
              style={{
                position: "sticky",
                bottom: "0",
                zIndex: 4,
                background: "#CECECE",
              }}
            >
              <tr>
                {columnVisibility?.code && <td>Cl Bal</td>}
                {columnVisibility?.customer && <td></td>}
                {columnVisibility?.address && <td></td>}
                {columnVisibility?.mobile && <td></td>}
                {columnVisibility?.opbal && (
                  <td>
                    {custOutstanding?.total_opening_balance < 0
                      ? Math.abs(custOutstanding?.total_opening_balance).toFixed(2) + " Cr"
                      : custOutstanding?.total_opening_balance > 0
                      ? custOutstanding?.total_opening_balance.toFixed(2) + " Db"
                      : 0}
                  </td>
                )}
                {columnVisibility?.debit && (
                  <td>{custOutstanding?.total_user_debit||0}</td>
                )}
                {columnVisibility?.credit && (
                  <td>{Math.abs(custOutstanding?.total_user_credit)||0}</td>
                )}
                {columnVisibility?.clbal && (
                  <td>
                    {custOutstanding?.total_closing_balance < 0
                      ? Math.abs(custOutstanding?.total_closing_balance).toFixed(2) + " Cr"
                      : custOutstanding?.total_closing_balance > 0
                      ? custOutstanding?.total_closing_balance.toFixed(2) + " Db"
                      : 0}
                  </td>
                )}
              </tr>
            </tfoot>
          </table>
        </div>
        <br />
        <div className="row">
          <div className="w-100 d-flex justify-content-end mb-3">
            <div onClick={()=>navigate(-1)} className="btn btn-dark col-1 col-2 py-0">Exit</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerOutstandingDetails;

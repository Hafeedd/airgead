import React from 'react'
import { GrRefresh } from 'react-icons/gr';
import searchIcon from "../../../../assets/icons/search.png";

const BillWiseLedgerTable = (props) => {

  const {billwiseledgerList, setBillWiseLedgerList, params} = props

  console.log(billwiseledgerList)

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
        <div className="day-book-table-cont table-scrolle">
          <table className="table daybook-table billwise">
            <thead>
              <tr>
                <th className="text-center">Date</th>
                <th className="text-center">Doc. No</th>
                <th className="text-center">Narration</th>
                <th className="text-center">Item Name</th>
                <th className="text-center">Qty</th>
                <th className="text-center">Rate</th>
                <th className="text-center">Total</th>
                <th className="text-center">Debit</th>
                <th className="text-center">Credit</th>
                <th className="text-center">Balance</th>
              </tr>
            </thead>
            <tbody>
              {billwiseledgerList?.length > 0 ? (
                billwiseledgerList?.map((data, i) => {
                  return (
                    <>
                      <tr>
                        <td colSpan={10} className="w-100 m-0 p-0 border-0">
                          <div className="table-hd p-2 border-0">
                            <div className="d-flex ms-3 py-1 px-0 justify-content-between align-items-center">
                              &emsp;Ledger Name : {data?.account_code}{" "}
                              &emsp;&emsp;&emsp;&emsp;
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={10} className="w-100 m-0 p-0 border-0">
                          <div className="table-sd p-2 border-0">
                            <div className="d-flex ms-3 py-1 px-0 justify-content-between align-items-center op-clr">
                              &emsp;Date :&emsp;
                              {params.from_date
                                .slice(0, 10)
                                .split("-")
                                .reverse()
                                .join("/")}
                              &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                              OPENING BALANCE:&emsp;{data?.opening_balance}
                            </div>
                          </div>
                        </td>
                      </tr>
                      {data?.ledger?.length > 0 ? (
                        data?.ledger?.map((ledger, i) => {
                          return (
                            <tr key={i}>
                              <td className="text-center">{ledger.date}
                                {/* {ledger?.date
                                  .slice(0, 10)
                                  .split("-")
                                  .reverse()
                                  .join("/")} */}
                              </td>
                              <td className="text-center">
                                {ledger?.bill_number}
                              </td>
                              <td className="text-center">{ledger?.type}</td>
                              {ledger?.items?.length > 0 &&
                                ledger?.items?.map((item, i) => {
                                  return (
                                    <>
                                      <td className="text-center">
                                        {item?.item_name}
                                      </td>
                                      <td className="text-center">
                                        {item?.quantity || 0.0}
                                      </td>
                                      <td className="text-center">
                                        {item?.rate || 0.0}
                                      </td>
                                      <td className="text-center">
                                        {item?.amount || 0.0}
                                      </td>
                                      <td className="text-center">
                                        {data?.debit || 0.0}
                                      </td>
                                      <td className="text-center">
                                        {data?.credit || 0.0}
                                      </td>
                                      <td className="text-center">{0.0}</td>
                                    </>
                                  );
                                })}
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={10} className="fs-4 text-center">
                            {" "}
                            No Reports yet
                          </td>
                        </tr>
                      )}
                      <tr>
                        <td colSpan={10} className="w-100 m-0 p-0 border-0">
                          <div className="table-sd p-2 border-0">
                            <div className="d-flex ms-3 py-1 px-0 justify-content-between align-items-center op-clr">
                              &emsp;Date :&emsp;
                              {params.to_date
                                .slice(0, 10)
                                .split("-")
                                .reverse()
                                .join("/")}
                              &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                              CLOSING BALANCE:&emsp;{data?.closing_balance}
                            </div>
                          </div>
                        </td>
                      </tr>
                    </>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={10} className="fs-4 text-center">
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
}

export default BillWiseLedgerTable
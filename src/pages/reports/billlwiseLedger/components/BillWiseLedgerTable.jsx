import React, { useEffect, useState } from "react";
import { GrRefresh } from "react-icons/gr";
import searchIcon from "../../../../assets/icons/search.png";

const BillWiseLedgerTable = (props) => {
  const { billwiseledgerList, params, accountList, accountName } = props;
  // const [searchedList, setSearchedList] = useState([]);
  

 
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
        <div className="bill-wise-ledg-table table-scrolle">
          <table className="table bill-wise-table billwise">
            <thead>
              <tr>
                <th className="text-center">Date</th>
                <th className="text-center">Doc. No</th>
                <th className="text-center">Account Name</th>
                <th className="text-center">Narration</th>
                <th className="text-center">OP/ACC</th>
                <th className="text-center">Qty</th>
                <th className="text-center">Rate</th>
                <th className="text-center">Total</th>
                <th className="text-center">Debit</th>
                <th className="text-center">Credit</th>
                <th className="text-center">Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={11} className="w-100 m-0 p-0 border-0">
                  <div className="table-hd p-2 border-0">
                    <div className="d-flex ms-3 py-1 px-0 justify-content-between align-items-center">
                      &emsp;Ledger Name : {accountName || accountList[0]?.text}
                      &emsp;&emsp;&emsp;&emsp;
                    </div>
                  </div>
                </td>
              </tr>
              {billwiseledgerList?.length > 0 ? (
                billwiseledgerList?.map((data, i) => {
                  let bal = parseFloat(data?.opening_balance);
                  let ListAfter = [];
                  if (data?.ledger_data?.length > 0) {
                    data?.ledger_data?.map((ledgerData) => {
                      if (ledgerData.items.length > 0) {
                        let ledgerList = [];
                        ledgerData.items?.map((itemsInLedg) => {
                          console.log(ledgerData);
                          ledgerList.push(itemsInLedg);
                          const checkDayBookBill =
                            ledgerData.account_detail?.filter(
                              (x) =>
                                (x.documents_no == itemsInLedg.doc_num ||
                                  x.documents_no == itemsInLedg.docu_no) &&
                                (x.account_name == itemsInLedg?.customer_name ||
                                  x.account_name == itemsInLedg?.supplier)
                            );
                          if (checkDayBookBill.length > 0)
                            ledgerList.push(...checkDayBookBill);
                        });
                        if (ledgerList.length > 0)
                          ListAfter.push(...ledgerList);
                      }
                    });
                  } else {
                    ListAfter.push(...data.daybook_data);
                  }

                  return (
                    <>
                      {" "}
                      <tr key={i}>
                        <td colSpan={11} className="w-100 m-0 p-0">
                          <div className="table-sd p-2 border-0">
                            <div className="d-flex ms-3 py-1 px-0 justify-content-between align-items-center op-clr">
                              &emsp;Date :&emsp;
                              {params.from_date
                                .slice(0, 10)
                                .split("-")
                                .reverse()
                                .join("/")}
                              &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;OPENING
                              BALANCE:&emsp;
                              {data?.opening_balance.toFixed(2)}
                            </div>
                          </div>
                        </td>
                      </tr>
                      {ListAfter?.length > 0 &&
                        ListAfter?.map((ledg, i) => {
                          bal =
                            parseFloat(ledg?.debit || 0) -
                            parseFloat(ledg?.credit || 0) +
                            bal;
                          console.log(data);
                          if (
                            parseFloat(ledg?.debit || 0) !== 0 ||
                            parseFloat(ledg?.credit || 0) !== 0 ||
                            ledg?.total ||
                            ledg?.rate
                          ) {
                            console.log(ledg);
                            return (
                              <tr key={i}>
                                <td className="text-center">
                                  {ledg?.created_at
                                    ? ledg?.created_at
                                        .slice(0, 10)
                                        .split("-")
                                        .reverse()
                                        .join("/")
                                    : ledg?.date
                                        ?.slice(0, 10)
                                        .split("-")
                                        .reverse()
                                        .join("/") || "..."}
                                </td>
                                <td className="text-center">
                                  {ledg?.doc_num
                                    ? ledg?.doc_num
                                    : ledg?.docu_no
                                    ? ledg?.docu_no
                                    : ledg?.documents_no
                                    ? ledg?.documents_no
                                    : ledg?.bill_number}
                                </td>
                                <td className="text-center">
                                  {ledg?.supplier
                                    ? ledg?.supplier
                                    : ledg?.customer_name
                                    ? ledg?.customer_name
                                    : ledg?.account_name
                                    ? ledg?.account_name
                                    : ledg?.account_name}
                                </td>
                                <td className="text-center">
                                  {ledg?.item_name
                                    ? ledg?.item_name
                                    : ledg?.narration}
                                </td>{" "}
                                <td className="text-center">
                                  {ledg?.opp_account_name}
                                </td>
                                <td className="text-center">
                                  {ledg?.quantity ? ledg?.quantity || 0 : " "}
                                </td>{" "}
                                <td className="text-center">
                                  {ledg?.rate ? ledg?.rate || 0 : " "}
                                </td>{" "}
                                <td className="text-center">
                                  {ledg?.total ? ledg?.total || 0 : " "}
                                </td>
                                <td className="text-center">
                                  {ledg?.debit ? ledg?.debit || 0 : " "}
                                </td>
                                <td className="text-center">
                                  {ledg?.credit ? ledg?.credit || 0 : " "}
                                </td>
                                <td className="text-center">
                                  {bal.toFixed(2)}
                                </td>
                              </tr>
                            );
                          }
                        })}
                      <tr>
                        <td colSpan={11} className="w-100 m-0 p-0 border-0">
                          <div className="table-sd p-2 border-0">
                            <div className="d-flex ms-3 py-1 px-0 justify-content-between align-items-center op-clr">
                              &emsp;Date :&emsp;
                              {params.to_date
                                .slice(0, 10)
                                .split("-")
                                .reverse()
                                .join("/")}
                              &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                              CLOSING BALANCE:&emsp;
                              {data?.closing_balance.toFixed(2)}
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
};

export default BillWiseLedgerTable;

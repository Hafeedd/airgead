import React, { useEffect, useState } from "react";
import { GrRefresh } from "react-icons/gr";
import searchIcon from "../../../../assets/icons/search.png";

const ConsolidateCashbookTable = (props) => {
  const { consolidateList, params } = props;

  const [searchedList, setSearchedList] = useState([]);

  useEffect(() => {
    setSearchedList(consolidateList?.opp_account_data);
  }, [consolidateList]);

  const handleSearch = async (e) => {
    try {
      let tempData,
        tempList = consolidateList?.opp_account_data;
      if (consolidateList) {
        let value = e.target.value.toLowerCase();
        if (value !== "") {
          if (consolidateList?.opp_account_data.length > 0) {
            let search;
            tempData = tempList?.filter((x) => {
              let searchInString = `${x?.account_name?.toLowerCase()}`;
              search = searchInString?.includes(value);
              if (search) return true;
            });
            if (search) {
              return true;
            }
          }
          setSearchedList(tempData);
        } else {
          setSearchedList(tempList);
        }
      } else {
        setSearchedList(tempList);
      }
    } catch {}
  };

  let totalDebit = 0;
  let totalCredit = 0;
  let tempBalance = consolidateList?.cash_account_data?.op_balance||0;
  console.log(searchedList);
  return (
    <div className="row mx-0 mt-3">
      <div className="daybook-cont">
        <div
          style={{ background: "#000" }}
          className="w-100 d-flex justify-content-end rounded-top-1"
        >
          <div className="col-3 p-2 stock-ledger-search d-flex align-items-center">
            <div className="col-1 me-2">
              <GrRefresh
                onClick={() =>
                  setSearchedList(consolidateList?.opp_account_data)
                }
                className="bg-light m-1 p-1 rounded-1"
                size={20}
              />
            </div>
            <div className="item_seach_bar_cont rounded-2 col-11 col-10">
              <img src={searchIcon} className="search_img me-3 ms-2 py-2" />
              <input
                onChange={handleSearch}
                className="item_search_bar rounded-2 border-0 py-1"
                placeholder="Search"
                type="text"
              />
            </div>
          </div>
        </div>
        <div className="stick-table Ctable-scroll">
          <table className="table daybook-table">
            <thead>
              <tr>
                <th>Account Name</th>
                <th>Narration</th>
                <th>Debit</th>
                <th>Credit</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="m-0 p-0" colSpan={5}>
                  <div className="cashbook-table-bottom m-0 p-3 ">
                    <p style={{ textAlign: "start" }}>
                      Ledger Name : {"CASH IN HAND"}{" "}
                    </p>
                  </div>
                </td>
              </tr>
              <tr className="cashbook-table-row">
                <td className="text-primary p-2" colSpan={1}>
                  {params.from_date.split("-").reverse().join("/")}
                </td>
                <td colSpan={2}></td>
                <td className="text-primary">Opening Balance</td>
                <td className="text-success fw-bolder" colSpan={1}>
                  {consolidateList?.cash_account_data?.op_balance}
                </td>
              </tr>
              {searchedList?.length > 0 &&
                searchedList?.map((data, i) => {
                  let debit = (data?.total > 0 ? data?.total : 0).toFixed(2);
                  let credit = (data?.total < 0 ? data?.total : 0).toFixed(2);
                  let balance = tempBalance;
                  // if (debit > 0) balance = +balance + +debit;
                  // else if (credit < 0) balance = +balance - +credit;
                  totalCredit = +totalCredit + parseFloat(credit);
                  totalDebit = +totalDebit + +debit;
                  balance = +balance + +credit + +debit
                  tempBalance = balance;
                  return (
                    <tr>
                      <td>{data?.account_name}</td>
                      <td>{data?.account_code}</td>
                      <td>{debit && debit > 0 ? debit : " "}</td>
                      <td>{credit && credit < 0 ? credit : " "}</td>
                      <td>{balance}</td>
                    </tr>
                  );
                })}

              <tr className="cashbook-table-row ">
                <td className="text-primary p-2">
                  {params.to_date.split("-").reverse().join("/")}
                </td>
                <td colSpan={2}></td>
                <td className="text-primary">Closing Balance</td>
                <td className="text-success fw-bolder">
                  {consolidateList?.cash_account_data?.closing_balance}
                </td>
              </tr>
              <tr className="py-3">
                <td className="bg-secondary" colSpan={2}></td>
                <td className="bg-secondary">
                  <div className="cashbook-down-box text-black p-3 d-flex align-items-center justify-content-center">
                    <p>{totalDebit}</p>
                  </div>
                </td>
                <td className="bg-secondary">
                  <div className="cashbook-down-box text-black p-3 d-flex align-items-center justify-content-center">
                    {totalCredit}
                  </div>
                </td>
                <td className="bg-secondary"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default ConsolidateCashbookTable;

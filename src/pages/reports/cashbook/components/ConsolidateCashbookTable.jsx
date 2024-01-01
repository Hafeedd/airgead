import React from "react";
import { GrRefresh } from "react-icons/gr";
import searchIcon from "../../../../assets/icons/search.png";

const ConsolidateCashbookTable = (props) => {
  const { consolidateList, params } = props;

  console.log(consolidateList);

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
                <th>Account Name</th>
                <th>Narration</th>
                <th>Debit</th>
                <th>Credit</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {consolidateList?.length > 0 ? (
                consolidateList?.map((data) => {
                  console.log(data);
                  return (
                    <>
                      <tr>
                        <td className="m-0 p-0" colSpan={5}>
                          <div className="cashbook-table-bottom m-0 p-3 ">
                            <p style={{ textAlign: "start" }}>
                              Ledger Name :{" "}
                              {data?.daybook_obj_ser?.account?.name}{" "}
                            </p>
                          </div>
                        </td>
                      </tr>
                      <tr className="cashbook-table-row  ">
                        <td className="text-primary p-2   " colSpan={1}>
                          {params.from_date.split("-").reverse().join("/")}
                        </td>
                        <td colSpan={2}></td>
                        <td className="text-primary">Opening Balance</td>
                        <td className="text-success fw-bolder" colSpan={1}>
                          {data?.op_balance}
                        </td>
                      </tr>
                      {data?.opposite_accounts.length > 0 &&
                        data?.opposite_accounts.map((item, i) => {
                          let credit = item?.amount > 0 && (item?.amount)
                          let debit = Math.abs(item?.amount < 0 && item?.amount);
                          let balance = 0
                          balance = parseFloat((balance+ data?.op_balance)+item?.amount)
                          return (
                            <tr>
                              <td>{item?.account?.name}</td>
                              <td>{item?.daybook_part_ref}</td>
                              <td>{debit || " "}</td>
                              <td>{credit|| " "}</td>
                              <td>{balance}</td>
                            </tr>
                          );
                        })}
                      <tr className="cashbook-table-row ">
                        <td className="text-primary p-2" >
                          {params.to_date.split("-").reverse().join("/")}
                        </td>
                        <td colSpan={2}></td>
                        <td className="text-primary">Closing Balance</td>
                        <td className="text-success fw-bolder">
                          {data?.closing_balance}
                        </td>
                      </tr>
                      <tr className="py-3">
                        <td className="bg-secondary" colSpan={2}></td>
                        <td className="bg-secondary">
                          <div className="cashbook-down-box text-black p-3 d-flex align-items-center justify-content-center">
                            <p>{0}</p>
                          </div>
                        </td>
                        <td className="bg-secondary">
                          <div className="cashbook-down-box text-black p-3 d-flex align-items-center justify-content-center">
                            {0}
                          </div>
                        </td>
                        <td className="bg-secondary"></td>
                      </tr>
                    </>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="fs-4 text-center">
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
export default ConsolidateCashbookTable;

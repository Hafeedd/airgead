import React, { useEffect, useState } from "react";
import searchIcon from "../../../../assets/icons/search.png";
import { GrRefresh } from "react-icons/gr";

const SalesBookTable = (props) => {
  const { salesBookList } = props;

  const [searchedList, setSearchedList] = useState([]);

  // const AdjustTableHeight = () => {
  //   let a = [];
  //   for (let i = 0; i < 7 - salesBookList?.length; i++) {
  //     a.push(
  //       <tr>
  //         <td colSpan={13}></td>
  //       </tr>
  //     );
  //   }
  //   return a;
  // };

  useEffect(() => {
    setSearchedList(salesBookList);
  }, [salesBookList]);

  const handleSearch = async (e) => {
    try {
      let tempData,
        tempList = salesBookList;
      if (salesBookList) {
        let value = e.target.value.toLowerCase();
        if (value !== "") {
          if (salesBookList.length > 0) {
            tempData = tempList?.filter((x) => {
              console.log(x);
              let searchInString = `${
                x.documents_no?.toLowerCase() +
                " " +
                x.fk_customer?.name?.toLowerCase()
              }`;
              let search = searchInString?.includes(value);
              if (search) {
                return true;
              }
            });
            setSearchedList(tempData);
          }
        } else {
          setSearchedList(tempList);
        }
      }
    } catch {}
  };

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
                onClick={() => setSearchedList(salesBookList)}
                className="bg-light m-1 p-1 rounded-1"
                size={20}
              />
            </div>
            <div className="item_seach_bar_cont rounded-2 col-11 col-10">
              <img src={searchIcon} className="search_img me-3 ms-2 py-2" />
              <input
                // value={search}
                // onChange={(e)=>setSearch(e.target.value)}
                onChange={handleSearch}
                className="item_search_bar rounded-2 border-0 py-1"
                placeholder="Search"
                type="text"
              />
            </div>
          </div>
        </div>
        <div className="stick-table table-scroll-sale">
          <table className="table daybook-table">
            <thead>
              <tr>
                <th>Doc No</th>
                <th className="text-center">Date</th>
                <th>Party</th>
                <th>Gross</th>
                <th>CGST</th>
                <th>SGST</th>
                <th>Cess1</th>
                <th>Cess2</th>
                <th>Total</th>
                <th>Returnn</th>
                <th>Netamt</th>
                <th>Rcvdamt</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {searchedList?.length > 0 ? (
                searchedList.map((data, i) => {
                  let gross = 0;
                  gross =
                    (data?.total_amount ||
                    0) - (data?.total_sgst || 0 + data?.total_cgst || 0);
                  let total = 0;
                  total =
                    gross + (data?.total_sgst || 0 + data?.total_cgst || 0);
                  let netAmount = 0;
                  netAmount = total - (data?.sales_return || 0);
                  let balance = 0;
                  balance = netAmount - data?.received_amount || 0;

                  return (
                    <tr key={i}>
                      <td>{data?.documents_no || "..."}</td>
                      <td className="ps-4 text-center">
                        {data.created_at
                          .slice(0, 10)
                          .split("-")
                          .reverse()
                          .join("/") || "..."}
                      </td>
                      <td>{data?.fk_customer?.name || "..."}</td>
                      <td>{gross.toFixed(2) || 0}</td>
                      <td>{data.total_cgst || 0}</td>
                      <td>{data.total_sgst || 0}</td>
                      <td>{data.total_cess1 || 0}</td>
                      <td>{data.total_cess2 || 0}</td>
                      <td>{total.toFixed(2) || 0}</td>
                      <td>{data.sales_return || 0}</td>
                      <td>{netAmount.toFixed(2) || 0}</td>
                      <td>{data.received_amount || 0}</td>
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

export default SalesBookTable;

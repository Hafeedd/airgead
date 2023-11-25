import { useEffect, useState } from "react";
import searchIcon from "../../../../assets/icons/search.png";
import { MdRefresh } from "react-icons/md";

export const AccountsTable = (props) => {
  const { list } = props;

  const [searchedList, setSearchedList] = useState([]);

  useEffect(() => {
    if (list?.length > 0) setSearchedList([...list]);
  }, [list]);

  const handleSearch = async (e, i) => {
    try {
      let tempData, tempList;
      let r = [...list];
      tempList = [...r[i]?.ledger_report];
      if (tempList.length > 0) {
        let value = e.target.value.toLowerCase();
        if (value != "") {
          if (tempList?.length > 0) {
            tempData = tempList?.filter((x) => {
              let searchInString = `${
                x?.opp_code?.toLowerCase() +
                " " +
                x?.opp_account?.toLowerCase() +
                " " +
                x?.debit?.toString().toLowerCase() +
                " " +
                x?.credit?.toString().toLowerCase()
              }`;
              let search = searchInString?.includes(value);
              if (search) {
                return true;
              }
            });
            let data = [...searchedList];
            data[i] = { ...data[i], ledger_report: [...tempData] , search: e.target.value};
            setSearchedList([...data]);
          }
        } else {
          let data = [...searchedList];
          if (list[i]?.ledger_report?.length > 0) {
            data[i] = {...data,ledger_report:[...list[i]?.ledger_report],search:e.target.value}
            setSearchedList([...data]);
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleRefresh = (e, i) => {
    let data = [...searchedList];
    if (list[i]?.ledger_report?.length > 0) {
      data[i] = {...data,ledger_report:[...list[i]?.ledger_report],search:''}
      setSearchedList([...data]);
    }
  };

  const AdjustTableHeight = () => {
    let a = [];
    for (let i = 0; i < 7 - list?.length; i++) {
      a.push(
        <tr>
          <td className="text-start">{"..."}</td>
          <td className="text-center">{"..."}</td>
          <td className="text-center">{"..."}</td>
          <td className="text-center">{"..."}</td>
          <td className="text-center">{"..."}</td>
          <td className="text-center">{"..."}</td>
          <td className="text-end">{"..."}</td>
        </tr>
      );
    }
    return a;
  };

  return (
    <div className="mt-3 acc-ledger-cont">
      <table className="table acc-ledger">
        <thead>
          <tr>
            <th className="text-start">Date</th>
            <th className="text-center">Doc No.</th>
            <th className="text-center">A/C Name</th>
            <th className="text-center">Narration</th>
            <th className="text-center">Debit</th>
            <th className="text-center">Credit</th>
            <th className="text-end">Balance</th>
          </tr>
          <tr></tr>
        </thead>
        <tbody>
          {searchedList?.length > 0 ? (
            searchedList.map((data, i) => {
              let tempBalance = data?.opening_balance;
              return (
                <>
                  <tr key={i}>
                    <th colSpan={7} className="w-100">
                      <div>
                        <div className="text-light ms-3 py-1 d-flex align-items-center justify-content-between">
                          Ledger Name : {"( " + data.account_name + " ) "}{" "}
                          &nbsp;&nbsp;{" "}
                          {"( " + data?.opening_balance + ": Op. Balance ) "}{" "}
                          &nbsp;&nbsp;{" "}
                          {"( " + data?.closing_balance + ": Cl. Balance )"}
                          <div className="col-3 p-2 stock-ledger-search d-flex align-items-center">
                            <div className="col-1 me-2">
                              <MdRefresh
                                onClick={(e)=>handleRefresh(e,i)}
                                className="bg-dark m-1 p-0 rounded-1"
                                size={21}
                              />
                            </div>
                            <div className="item_seach_bar_cont rounded-2 col-11 col-10">
                              <img
                                src={searchIcon}
                                className="search_img me-3 ms-2 py-2"
                              />
                              <input
                                value={data.search}
                                onChange={(e) => handleSearch(e, i)}
                                className="item_search_bar rounded-2 border-0 py-1"
                                placeholder="Search"
                                type="text"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </th>
                  </tr>
                  {data?.ledger_report?.length > 0 ? (
                    data?.ledger_report?.map((item, i) => {
                      let balance;
                      if (!item.debit)
                        balance = tempBalance - item?.credit || 0;
                      else balance = tempBalance - item?.debit || 0;
                      tempBalance = balance;
                      return (
                        <tr key={i}>
                          <td className="text-start">
                            {new Date(item?.date).toLocaleDateString()}
                          </td>
                          <td className="text-center">{item?.opp_code}</td>
                          <td className="text-center">{item?.opp_account}</td>
                          <td className="text-center">{item?.narration}</td>
                          <td className="text-center">{item?.debit || 0}</td>
                          <td className="text-center">{item?.credit || 0}</td>
                          <td className="text-end">{balance}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td className="fs-4 text-center" colSpan={7}>
                        No reports yet
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td
                      style={{ background: "#CECECE" }}
                      className=""
                      colSpan={1}
                    >
                      Closing balance
                    </td>
                    <td
                      style={{ background: "#CECECE" }}
                      className="text-end"
                      colSpan={6}
                    >
                      {data.closing_balance}
                    </td>
                  </tr>
                </>
              );
            })
          ) : (
            <tr>
              <td className="fs-4 text-center" colSpan={7}>
                No reports yet
              </td>
            </tr>
          )}
          {/* <AdjustTableHeight/> */}
        </tbody>
      </table>
    </div>
  );
};

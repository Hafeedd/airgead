import { useEffect, useState } from "react";
import searchIcon from "../../../../assets/icons/search.png";
import { GrRefresh } from "react-icons/gr";

export const DayBookTable = (props) => {
  const { dayBookList } = props;

  const [searchedList, setSearchedList] = useState([]);

  useEffect(() => {
    setSearchedList(dayBookList);
  }, [dayBookList]);

  const handleSearch = async (e) => {
    try {
      let tempData,
        tempList = [...dayBookList];
      if (dayBookList) {
        let value = e.target.value.toLowerCase();
        if (value != "") {
          if (dayBookList.length > 0) {
            let accDocNoString = " ";
            
            tempData = tempList?.filter((x) => {
              if (x?.account_data?.length < 0) return false;
              accDocNoString = x?.account_data?.reduce(
                (a, b) => a + " " + b?.document_no?.toLowerCase(),
                " "
              );

              let searchInString = accDocNoString;
              let search = searchInString?.includes(value);
              if (search) {
                return true;
              }
            });
            setSearchedList([...tempData]);
          }
        } else {
          setSearchedList([...dayBookList]);
        }
      }
    } catch (err) {}
  };

  return (
    <div className="row mx-0 mt-3">
      <div className="daybook-cont px-0">
        <div
          style={{ background: "#000" }}
          className="w-100 d-flex justify-content-end rounded-top-1"
        >
          <div className="col-3 p-2 stock-ledger-search d-flex align-items-center">
            <div className="col-1 me-2">
              <GrRefresh
                onClick={() => setSearchedList(dayBookList)}
                className="bg-light m-1 p-1 rounded-1"
                size={20}
              />
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
        <div className="day-book-table-cont">
          <table className="table daybook-table">
            <thead>
              <tr>
                <th>A/c Name</th>
                <th>Description</th>
                <th className="text-center">Debit</th>
                <th className="text-center">Credit</th>
              </tr>
            </thead>
            <tbody>
              {searchedList?.length > 0 ? (
                searchedList?.map((data, i) => {
                  return (
                    data.account_data.length > 0 &&
                    data.account_data.filter((x) => x.debit > 0 || x.credit > 0)
                      .length > 0 && (
                      <>
                        <tr>
                          <td
                            style={{ background: "#BD93F3", color: "white" }}
                            colSpan={4}
                          >
                            <div className="d-flex">
                              <div
                                className="me-4 d-flex"
                                style={{ width: "fit-content" }}
                              >
                                {"Date: " +
                                  new Date(
                                    data.account_data[0]?.date
                                  ).toLocaleDateString()}
                              </div>
                              <div style={{ width: "fit-content" }}>
                                {"Doc: " + data.account_data[0]?.document_no}
                              </div>
                            </div>
                          </td>
                        </tr>
                        {data?.account_data?.length > 0 &&
                          data?.account_data?.map((daybookData) => {
                            return (
                              (daybookData?.debit > 0 ||
                                daybookData?.credit > 0) && (
                                <tr className="borde border-secondary">
                                  <td>{daybookData?.account_name}</td>
                                  <td>{daybookData?.narrations}</td>
                                  <td className="text-center">
                                    {daybookData?.debit || ""}
                                  </td>
                                  <td className="text-center">
                                    {daybookData?.credit || ""}
                                  </td>
                                </tr>
                              )
                            );
                          })}
                        <tr className="foot">
                          <td></td>
                          <td></td>
                          <td>
                            <dvi className="daybook-foot-data text-center">
                              {data?.account_total?.total_debit?.toFixed(2)}
                            </dvi>
                          </td>
                          <td>
                            <dvi className="daybook-foot-data text-center">
                              {data?.account_total?.total_credit?.toFixed(2)}
                            </dvi>
                          </td>
                        </tr>
                      </>
                    )
                  );
                })
              ) : (
                <tr>
                  <td colSpan={4} className="text-center">
                    No transactions !
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

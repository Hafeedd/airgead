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
        tempList = dayBookList;
      if (dayBookList) {
        let value = e.target.value.toLocaleLowerCase();
        if (value != "") {
          if (dayBookList.length > 0) {
            tempData = tempList?.filter((x) => {
              let searchInString = `${
                x.account_data[0].document_no?.toLocaleLowerCase() +
                " " +
                x.account_data[0].date?.toLocaleLowerCase()
              }`;
              let search = searchInString?.includes(value);
              if (search) {
                return true;
              }
            });
            setSearchedList(tempData);
          }
        } else {
          setSearchedList(dayBookList);
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
              <GrRefresh onClick={()=>setSearchedList(dayBookList)} className="bg-light m-1 p-1 rounded-1" size={20} />
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
                searchedList?.map((data, i) => (
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
                              data.account_data[0]?.date?.slice(0, 10)}
                          </div>
                          <div style={{ width: "fit-content" }}>
                            {"Doc: " +
                              data.account_data[0]?.document_no?.slice(0, 10)}
                          </div>
                        </div>
                      </td>
                    </tr>
                    {data?.account_data?.length > 0 &&
                      data?.account_data?.map((daybookData) => {
                        return (
                          <tr>
                            <td>{daybookData?.account_name}</td>
                            <td>{daybookData?.desc}</td>
                            <td className="text-center">
                              {daybookData?.debit}
                            </td>
                            <td className="text-center">
                              {daybookData?.credit}
                            </td>
                          </tr>
                        );
                      })}
                    <tr className="foot">
                      <td></td>
                      <td></td>
                      <td>
                        <dvi className="daybook-foot-data text-center">
                          {data?.account_total?.total_debit}
                        </dvi>
                      </td>
                      <td>
                        <dvi className="daybook-foot-data text-center">
                          {data?.account_total?.total_credit}
                        </dvi>
                      </td>
                    </tr>
                  </>
                ))
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

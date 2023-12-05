import React, { useEffect, useState } from "react";
import { GrRefresh } from "react-icons/gr";
import searchIcon from "../../../../assets/icons/search.png";
import { useReportsServices } from "../../../../services/reports/reports";
import { useNavigate } from "react-router";

export const ItemHistoryTable = (props) => {
    const { params, itemId, setItemId } = props;
    const [list, setList] = useState([]);
    const [searchedList, setSearchedList] = useState([]);
    const navigate = useNavigate()

    const { getItemHistory } = useReportsServices();
  
    useEffect(() => {
      setSearchedList(list);
    }, [list]);
  
    const handleSearch = async (e) => {
      try {
        let tempData,
          tempList = list;
        if (list) {
          let value = e.target.value.toLocaleLowerCase();
          if (value != "") {
            if (list.length > 0) {
              tempData = tempList?.filter((x) => {
                let searchInString = `${
                  x.document_number?.toLocaleLowerCase() +
                  " " +
                  x.barcode?.toLocaleLowerCase() +
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
            setSearchedList(list);
          }
        }
      } catch {}
    };
  
    useEffect(() => {
      getData();
    }, [params,itemId]);
  
    const getData = async () => {
      try {
        const response = await getItemHistory(itemId,params);
        if (response.success) {
          setList(response.data);
        }
      } catch (err) {}
    };
  
  //   console.log((new Date(list[1]?.date)).toISOString())
  
  
    return (
      <div>
        <div className="mt-3">
          <div
            style={{ background: "#000" }}
            className="w-100 d-flex justify-content-end align-items-center rounded-top-2"
          >
            <div className="col-3 p-2 stock-ledger-search d-flex align-items-center">
              <div className="col-1 me-2" onClick={()=>setSearchedList(list)}>
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
        <div className="stock-journal-report-table-cont">
          <table className="table">
            <thead className="text-light">
              <tr>
                <th className="text-start ps-3">Date</th>
                <th>Doc No</th>
                <th>Party</th>
                <th>Qty</th>
                <th>Unit</th>
                <th>Rate</th>
                <th>Free</th>
              </tr>
            </thead>
            <tbody>
              {searchedList?.length > 0 ? (
                searchedList?.map((data, i) => {
                  return (
                    <>
                    <tr>
                    <td colSpan={7}></td>
                    </tr>
                    <tr>
                    <td colSpan={7}></td>
                    </tr>
                    <tr>
                      <td>
                        {(new Date(data?.date)).toLocaleDateString()}
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                    <td colSpan={7}></td>
                    </tr>
                    </>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="fs-5 p-3">
                    There is no Item History report to show
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <br />
        <div className="row">
          <div className="w-100 d-flex justify-content-end mb-0">
            <div onClick={()=>navigate(-1)} className="btn btn-dark col-1 col-2 py-0">Exit</div>
          </div>
        </div>
      </div>
    );
  };
  
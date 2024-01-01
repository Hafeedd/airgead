import React, { useEffect, useState } from "react";
import searchIcon from "../../../../assets/icons/search.png";
import { GrRefresh } from "react-icons/gr";
import "./salesRegisterTable.css";

const SalesRegisterTable = (props) => {
  const { saleRegisterList, setSaleRegisterList } = props;

  const [searchedList, setSearchedList] = useState([]);

  // const AdjustTableHeight = () => {
  //   let a = [];
  //   for (let i = 0; i < 7 - saleRegisterList?.length; i++) {
  //     a.push(
  //       <tr>
  //         <td colSpan={12}></td>
  //       </tr>
  //     );
  //   }
  //   return a;
  // };

  useEffect(() => {
    setSearchedList(saleRegisterList);
  }, [saleRegisterList]);

  const handlesearch = async (e) => {
    try {
      let tempData,
        tempList = saleRegisterList;
      if (saleRegisterList) {
        let value = e.target.value.toLowerCase();
        if (value !== "") {
          if (saleRegisterList.length > 0) {
            tempData = tempList?.filter((x) => {
              let search;
              x.sales_item.map((data) => {
                let searchInString = `${data?.item?.item_name?.toLowerCase()}`;
                search = searchInString?.includes(value);
                if (search) return true;
              });
              if (search) {
                return true;
              }
            });
            setSearchedList(tempData);
          }
        } else {
          setSearchedList(tempList);
        }
      } else {
        setSearchedList(tempList);
      }
    } catch {}
  };

  const handleDrop = (i) => {
    let tempList = saleRegisterList;
    let newList = tempList[i];
    if (newList.drop) {
      newList.drop = false;
    } else newList.drop = true;
    tempList.splice(i, 1, newList);
    setSaleRegisterList([...tempList]);
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
                onClick={() => setSearchedList(saleRegisterList)}
                className="bg-light m-1 p-1 rounded-1"
                size={20}
              />
            </div>
            <div className="item_seach_bar_cont rounded-2 col-11 col-10">
              <img src={searchIcon} className="search_img me-3 ms-2 py-2" />
              <input
                // value={search}
                // onChange={(e)=>setSearch(e.target.value)}
                onChange={handlesearch}
                S
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
                <th>Item Name</th>
                <th>Qty</th>
                <th>Unit</th>
                <th>Free</th>
                <th>Rate</th>
                <th>G.Rate</th>
                <th>Gross</th>
                <th>Disc %</th>
                <th>Disc Amt</th>
                <th>Tax%</th>
                <th>Tax</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {searchedList?.length > 0 ? (
                searchedList.map((data, i) => {
                  let total = 0;
                  let per = 0;
                  return (
                    <>
                      <tr key={i}>
                        <td colSpan={12} className="w-100 m-0 p-0 border-0">
                          <div className="table-hd p-2 border-0">
                            <div className=" d-flex ms-4 py-1 px-0 justify-content-between align-items-center">
                              &emsp;Deatils : {data?.documents_no}{" "}
                              &emsp;&emsp;&emsp; &emsp;&emsp; &emsp;Date :{" "}
                              {data?.created_at
                                .slice(0, 10)
                                .split("-")
                                .reverse()
                                .join("/")}{" "}
                              &emsp;&emsp;&emsp; &emsp;&emsp; &emsp;
                              &emsp;Customer : {data?.customer_name}{" "}
                              &emsp;&emsp;&emsp; &emsp;&emsp; &emsp; NET: &emsp;
                              {data?.total_amount || "0"} &emsp;(
                              {data.sales_item.length}Items)
                              <div
                                className={`drop me-3 ${
                                  data.drop ? "active" : "notActive"
                                }`}
                                onClick={() => {
                                  handleDrop(i);
                                }}
                              >
                                {">"}
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      {!data.drop &&
                        data.sales_item.length > 0 &&
                        data.sales_item.map((item, i) => {
                          total = parseFloat(item.item?.total) + total;
                          per = item.item?.discount_1_percentage + per;
                          return (
                            <tr key={i}>
                              <td>{item.item?.item_name || "..."}</td>
                              <td>{item.item?.quantity || "0"}</td>
                              <td>{item.item?.unit || "0"}</td>
                              <td>{item.item?.free || "0"}</td>
                              <td>{item.item?.rate || "0"}</td>
                              <td>{item.item?.rate || "0"}</td>
                              <td>{item.item?.rate || "0"}</td>
                              <td className="ps-4">
                                {item.item?.discount_1_percentage + "%" || "%"}
                              </td>
                              <td>{item.item?.discount_1_amount || "0"}</td>
                              <td>{item.item?.tax_gst + "%" || "%"}</td>
                              <td>{item.item?.tax_gst || "0"}</td>
                              <td>{item.item?.total || "0"}</td>
                            </tr>
                          );
                        })}
                      <tr>
                        <td colSpan={12} className="bg-secondary p-0 m-0 py-2">
                          <div className="sales-mas">
                            {/* <h5 className="sales-btm sale-fir">{per + "%"}</h5> */}
                            <h5 className="sales-btm sale-sec">{total}</h5>
                          </div>
                        </td>
                      </tr>

                      {/* <tr>
                      <td
                        colSpan={7}
                        className="w-100 m-0 p-0 px-3 py-2 bg-secondary"
                      ></td>
                      <td className="bg-secondary py-2 px-3">
                        <div className="py-1 px-3 bg-white rounded">
                          {per + "%"}
                        </div>
                      </td>
                      <td
                        colSpan={3}
                        className="w-100 m-0 p-0 px-3 bg-secondary"
                      ></td>
                      <td className="bg-secondary py-2 px-3">
                        <div className="py-1 px-3 bg-white rounded">
                          {total}
                        </div>
                      </td>
                    </tr> */}
                    </>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={12} className="fs-4 text-center">
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

export default SalesRegisterTable;

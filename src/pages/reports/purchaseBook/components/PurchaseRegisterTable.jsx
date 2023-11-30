import React from "react";
import { GrRefresh } from "react-icons/gr";
import searchIcon from "../../../../assets/icons/search.png";

const PurchaseRegisterTable = (props) => {
  const { purchaseRegisterList, setPurchaseRegisterList } = props;

  const handleDrop = (i) => {
    let tempList = purchaseRegisterList;
    let newList = tempList[i];
    if (newList.drop) {
      newList.drop = false;
    } else newList.drop = true;
    tempList.splice(i, 1, newList);
    setPurchaseRegisterList([...tempList]);
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
                <th>Item Name</th>
                <th>Qty</th>
                <th>Ut</th>
                <th>Free</th>
                <th>Rate</th>
                <th>Gross</th>
                <th>Disc</th>
                <th>Disc Tax%</th>
                <th>Tax</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {purchaseRegisterList?.length > 0 ? (
                purchaseRegisterList.map((data, i) => {
                  return (
                    <>
                      <tr key={i}>
                        <td colSpan={10} className="w-100 m-0 p-0 border-0">
                          <div className="table-hd p-2 border-0">
                            <div className="d-flex ms-4 py-1 px-0 justify-content-between align-items-center">
                              Deatils : {data?.documents_no}{" "}
                              &emsp;&emsp;&emsp;&emsp; Date :{" "}
                              {data?.created_at
                                .slice(0, 10)
                                .split("-")
                                .reverse()
                                .join("/")}{" "}
                              ({data?.purchase_item?.length}items)
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
                      {!data.drop && data?.purchase_item.length > 0 ? (
                        data?.purchase_item.map((item, i) => {
                          let gross = (item?.item.total )-(item?.item.tax_gst) 
                          return (
                            <tr key={i}>
                              <td>{item?.item.item_name || " "}</td>
                              <td>{item?.item.quantity}</td>
                              <td>Ut</td>
                              <td>{item?.item.free}</td>
                              <td>{item?.item.rate}</td>
                              <td>{gross || 0}</td>
                              <td>{item?.item.discount_1_amount}</td>
                              <td>{item?.item.discount_1_percentage}</td>
                              <td>{item?.item.tax_gst}</td>
                              <td>{item?.item.total}</td>
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

export default PurchaseRegisterTable;

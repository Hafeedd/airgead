import React, { useEffect, useState } from "react";
import { GrRefresh } from "react-icons/gr";
import searchIcon from "../../../../assets/icons/search.png";
import { useReportsServices } from "../../../../services/reports/reports";
import { useNavigate } from "react-router";
import useItemServices from "../../../../services/master/itemServices";

export const ItemHistoryTable = (props) => {
  const { params, itemId, setItemId } = props;
  const [list, setList] = useState([]);
  const [searchedList, setSearchedList] = useState([]);
  const [unitList, setUnitList] = useState([]);
  const navigate = useNavigate();

  const { getItemHistory } = useReportsServices();
  const { getProperty } = useItemServices();

  useEffect(() => {
    let tempList = { ...list };
    // let closing_stock = 0;
    let closing_stock = tempList?.opening_balance||0
    let totalSales = 0;
    let totalPurchase = 0;

    if (
      Object.values(tempList).filter((x) => {
        if (x) return x?.length > 0;
      })?.length > 0
    ) {
      totalPurchase = tempList?.purchase_items?.reduce(
        (a, b) => b.quantity +a,
        0
      );
      closing_stock = closing_stock + +totalPurchase

      totalSales = tempList?.sales_items?.reduce(
        (a, b) => b.quantity+a,
        0
      );

      closing_stock = closing_stock - +totalSales

      closing_stock = tempList?.stockjournal_daybook_item?.reduce(
        (a, b) =>
          b.add_qty || b.less_qty
            ? a - Math.abs(b.less_qty) + Math.abs(b.add_qty)
            : a,
        closing_stock
      );
    }

    tempList.closing_stock = closing_stock;
    if( tempList?.purchase_items && tempList?.sales_items){
    tempList.purchase_items.totalQty = totalPurchase;
    tempList.sales_items.totalQty = totalSales;
  }
    
    setSearchedList(tempList);

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
  }, [params, itemId]);

  const getData = async () => {
    let data = {
      from_date: params?.from_date?.split("-").reverse().join("-"),
      to_date: params.to_date.split("-").reverse().join("-"),
    };
    try {
      const response = await getItemHistory(itemId, data);
      if (response.success) {
        setList(response.data);
      }
      const response2 = await getProperty();
      if (response2.success) {
        if (response2.data.length > 0) {
          let a = response2.data.filter((x) => x.property_type == "unit");
          setUnitList(a);
        }
      }
    } catch (err) {}
  };

  const SelectUnit = ({ utId }) => {
    let a;
    if (unitList.length > 0)
      unitList.forEach((data) => {
        if (data.id == utId) a = data.property_value;
      });
    return a;
  };

  return (
    <div>
      <div className="mt-3">
        <div
          style={{ background: "#000" }}
          className="w-100 d-flex justify-content-end align-items-center rounded-top-2"
        >
          <div className="col-3 p-2 stock-ledger-search d-flex align-items-center">
            <div className="col-1 me-2" onClick={() => setSearchedList(list)}>
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
      <div className="stock-journal-report-table-cont item-history">
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
            {Object.values(searchedList).filter((x) => x?.length > 0).length >
              0 && (
              <tr>
                <td className="fs-5 py-2 " colSpan={7}>
                  Opening Stock&emsp;{searchedList?.opening_balance}
                </td>
              </tr>
            )}
            {Object.values(searchedList).filter((x) => x?.length > 0).length >
            0 ? (
              Object.keys(searchedList).map((data, i) => {
                let closing_stock = 0;
                let a = data.split("_");
                a?.pop(data.split("_").length - 1);
                a = a?.join(" ");
                a = a.replace(/^\w/, (c) => c.toUpperCase());
                return (
                  searchedList[data]?.length > 0 && (
                    <>
                      <tr key={i} className="first-tr">
                        <td colSpan={7}>
                          {"Type : "}&nbsp;&nbsp;
                          {a}
                        </td>
                      </tr>
                      {/* <tr>
                        <td colSpan={2}></td>
                        <td className="text-danger">OPENING STOCK :</td>
                        <td className="text-danger">
                          {searchedList[0]?.item_stock || 0}
                        </td>
                        <td colSpan={3}></td>
                      </tr> */}
                      {searchedList[data]?.length > 0 &&
                        searchedList[data]?.map((item, i) => {
                          if (closing_stock == 0 && item.item_stock > 0) {
                            closing_stock = item.item_stock;
                          }
                          if (data.match(/^p/)) {
                            closing_stock = closing_stock + item.quantity;
                          } else if (data.match(/^sa/)) {
                            closing_stock = closing_stock - item.quantity;
                          } else {
                            if (item.add_qty > 0) {
                              closing_stock =
                                closing_stock + parseInt(item.add_qty);
                            } else {
                              closing_stock =
                                closing_stock - parseInt(item.less_qty);
                            }
                          }
                          return (
                            <tr>
                              <td className="text-start ps-3">
                                {new Date(item.created_at).toLocaleDateString()}
                              </td>
                              <td>{item.doc_num}</td>
                              <td>{item.supplier}</td>
                              <td>
                                {data.match(/^st/)
                                  ? item?.add_qty > ""
                                    ? item?.add_qty + " +"
                                    : Math.abs(item?.less_qty) + " -"
                                  : item?.quantity || ""}
                              </td>
                              <td>{<SelectUnit utId={item.unit} />}</td>
                              <td>{item?.cost || ""}</td>
                              <td>{item?.free || ""}</td>
                            </tr>
                          );
                        })}
                      <tr>
                        <td className="fs-6 text-center" colSpan={7}>
                          Total {data == "purchase_items" ? searchedList.purchase_items?.totalQty:
                          data == "sales_items" &&
                          searchedList.sales_items?.totalQty}
                        </td>
                      </tr>
                      {/* <tr>
                        <td colSpan={2}></td>
                        <td className="text-danger">CLOSING STOCK :</td>
                        <td className="text-danger">{closing_stock}</td>
                        <td colSpan={3}></td>
                      </tr> */}
                    </>
                  )
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="fs-5 p-3">
                  There is no Item History report to show
                </td>
              </tr>
            )}
            {Object.values(searchedList).filter((x) => x?.length > 0).length >
              0 && (
              <tr>
                <td className="fs-5 py-2 " colSpan={7}>
                  Closing Stock&emsp; {searchedList.closing_stock}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <br />
      <div className="row">
        <div className="w-100 d-flex justify-content-end mb-0">
          <div
            onClick={() => navigate(-1)}
            className="btn btn-dark col-1 col-2 py-0"
          >
            Exit
          </div>
        </div>
      </div>
    </div>
  );
};

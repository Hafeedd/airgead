import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const StockPop = (props) => {
  const {
    handleKeyDown,
    itemSelected,
    setShowStock,
    handleChangeTableItem,
    setDropdownOpen,
  } = props;

  const [selectedId, setSelectedId] = useState(0);

  useEffect(() => {
    document.getElementById("tr-input-width-data")?.focus();
  }, []);

  const handleArrowNav = (e) => {
    if (
      e.key === "ArrowDown" &&
      selectedId < itemSelected?.data?.batch_list?.length - 1
    ) {
      e.preventDefault();
      setSelectedId((data) => data + 1);
    }
    if (e.key === "ArrowUp" && selectedId > 0) {
      e.preventDefault();
      setSelectedId((data) => data - 1);
    }
    if (e.key === "Enter") {
      handleSelect(itemSelected?.data?.batch_list[selectedId]);
    }
  };

  const navigate = useNavigate();

  const handleSelect = (data) => {
    // let tempItem = {...tableItem}
    // tempItem = tempItem.map(x=>{
    //   let a = {}
    //   if(x == null ){
    //     a[x] = 0
    //   }else{
    //     a[x] = x
    //   }

    // })

    // if (data) {
    //   console.log(data)
    //   // let data = data.options.filter((x) => x?.value === data?.value)[0];
    //   tempItem = {
    //     ...tempItem,...data,
    //     sales_rate:data.retail_rate,
    //     item_name: data?.text,
    //     code: data?.description,
    //     fk_items: data?.value,
    //     unit: data?.unit,
    //   };
    //   setTableItem({ ...tempItem });
    // }
    handleChangeTableItem(
      itemSelected.e,
      data,
      itemSelected.state,
      itemSelected.toTableItem,
      true
    );
    setDropdownOpen(false);
    setShowStock(false);
  };

  const AdjustTableHeight = () => {
    let a = [];
    for (let i = 0; i < 9 - itemSelected?.data?.batch_list?.length || 0; i++)
      a.push(
        <tr className="border-0">
          <td
            colSpan={5}
            className="border-0"
            style={{ height: "2.7rem" }}
          ></td>
        </tr>
      );
    return a;
  };

  return (
    <div className="rounded-1">
      <div className="bg-dark rounded-top-1 text-light p-2 px-3 fs-5 d-flex align-items-center justify-content-between">
        Select Stock Of &nbsp;
        {itemSelected?.data?.item_name} &emsp;
        {itemSelected?.data?.item_code}
        <div
          className="btn btn-light text-dark col-2"
          onClick={() => navigate("/add")}
        >
          Add Item
        </div>
      </div>
      <label htmlFor="tr-input-width-data" className="stock-body w-100 px-3">
        <table className="table stock-pop mt-3">
          <thead className="rounded-top-2">
            <tr>
              <th className="rounded-top-2 rounded-end-0">
                <button
                  onKeyDown={handleArrowNav}
                  id={"tr-input-width-data"}
                >
                  SL
                </button>
              </th>
              <th>Batch</th>
              <th>Cost</th>
              <th>Rate</th>
              <th>Retail Rate</th>
              <th>Exp Date</th>
              <th className="rounded-top-2 rounded-start-0">Stock</th>
            </tr>
          </thead>
          <tbody>
            {itemSelected?.data?.batch_list?.length > 0 ? (
              itemSelected?.data?.batch_list?.map((data, key) => (
                <tr
                  className={`tr-with-data ${key == selectedId && "active"}`}
                  onClick={() =>
                    handleSelect({
                      ...data,
                      parentId: itemSelected?.data.item_id,
                    })
                  }
                >
                  <td>
                    {/* <input
                    value={key+1}
                    onClick={e=>(e.preventDefault())}
                    onKeyDown={handleArrowNav}
                    id={"tr-input-width-data"} /> */}
                    {key + 1}
                  </td>
                  <td>{data?.batch_no}</td>
                  <td>{data?.cost}</td>
                  <td>{data?.rate}</td>
                  <td>{data?.sales_rate}</td>
                  <td>
                    {data?.expiry_date
                      ? dayjs(data?.expiry_date).format("DD-MM-YYYY")
                      : ""}
                  </td>
                  <td>{data?.quantity || 0}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center fs-4">
                  No Item Added Yet
                </td>
              </tr>
            )}
            <AdjustTableHeight />
          </tbody>
        </table>
      </label>
      <div className="text-end px-3 mb-2">
        <div onClick={() => setShowStock(false)} className="btn btn-dark col-2">
          Close
        </div>
      </div>
    </div>
  );
};

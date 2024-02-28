import React, { useEffect, useState } from "react";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";

const PurchaseTableItemList = (props) => {
  const { tableHeadList, setTableHeadList, from } = props;
  const [selectedItem, setSelectedItem] = useState(3);

  useEffect(() => {
    let tempList = tableHeadList.filter(
      (x) =>
        (from === "sal" && x.saleShow) || (from === "pur" && x.purchaseShow)
    );
    setTableHeadList(tempList);
  }, [selectedItem, from, tableHeadList, setTableHeadList]);

  const handleTableHeadChange = (index, state) => {
    let tempList = [...tableHeadList];
    if (tempList?.length > 0) {
      if (state === "visible") {
        tempList[index].visible = !tempList[index].visible;
        for (let i = 0; i < tempList.length; i++) {
          let oppositeState = "";
          let relatedState = "";
          if (tempList[index].state === "vat") {
            oppositeState = "cgst_or_igst sgst tax_gst";
            relatedState = "vat_perc";
          } else if (tempList[index].state === "tax_gst") {
            oppositeState = "vat vat_perc";
            relatedState = "cgst_or_igst sgst";
          }
          if (oppositeState !== "" && relatedState !== "") {
            if (oppositeState.includes(tempList[i].state))
              tempList[i].visible = !tempList[index].visible;
            if (relatedState.includes(tempList[i].state))
              tempList[i].visible = tempList[index].visible;
          }
        }
      }
      if (state === "changeUp") {
        [tempList[index].position, tempList[index - 1].position] = [
          tempList[index - 1].position,
          tempList[index].position,
          setSelectedItem(index - 1),
        ];
      }
      if (state === "changeDown") {
        [tempList[index].position, tempList[index + 1].position] = [
          tempList[index + 1].position,
          tempList[index].position,
          setSelectedItem(index + 1),
        ];
      }
    }
    tempList.sort((a, b) => a.position - b.position);
    if (from == "pur") {
      localStorage.setItem(
        "initialPurchaseTableStatePositionLocal",
        JSON.stringify(tempList)
      );
    } else {
      localStorage.setItem(
        "initialSalesTableStatePositionLocal",
        JSON.stringify(tempList)
      );
    }
    setTableHeadList([...tempList]);
  };

  return (
    <div className="p-0 row mx-0">
      <table className="table table-hover purchase-item-table ">
        <thead className="">
          <tr className="">
            <th className="text-start ps-3 start">Column Name</th>
            <th>Visible</th>
            <th>Readonly</th>
            <th>Skipping</th>
            <th style={{ borderRight: "0px" }}>Breakpoint</th>
            {/* <th style={{borderRight:'0px', width:'2rem'}}></th> */}
            {/* <th
              
              className="end"
            ></th> */}
          </tr>
        </thead>
        <tbody className="purchase-item-body">
          {tableHeadList?.length > 0 &&
            tableHeadList.map((data, i) => {
              // console.log(i)
              if (
                (from === "sal" && data.saleShow) ||
                (from === "pur" && data.purchaseShow)
              )
                return (
                  <tr
                    className={`${selectedItem === i && "table-select-item"}`}
                  >
                    <td
                      onClick={() => {
                        setSelectedItem(i);
                      }}
                      className="name ps-3 bg-transparent"
                    >
                      {data?.title}
                    </td>
                    <td
                      onClick={() => {
                        if (i > 2) handleTableHeadChange(i, "visible");
                      }}
                      className={`${
                        !data.visible ? "clr" : "n_clr"
                      } bg-transparent`}
                    >
                      {data?.visible ? "Yes" : "No"}
                    </td>
                    <td
                      className={`${
                        !data.readOnly ? "clr" : "n_clr"
                      } bg-transparent`}
                    >
                      {data?.readOnly ? "Yes" : "No"}
                    </td>
                    <td
                      className={`${
                        !data.skipping ? "clr" : "n_clr"
                      } bg-transparent`}
                    >
                      {data?.skipping ? "Yes" : "No"}
                    </td>
                    <td
                      className={`${
                        !data.breakPoint ? "clr" : "n_clr"
                      } bg-transparent`}
                    >
                      {data?.breakPoint ? "Yes" : "No"}
                    </td>
                    {/* <td className="d-flex align-items-center justify-content-center">
                    </td> */}
                    {/* <div className="btn btn-outline-dark btn-sm me-1 d-flex justify-content-center align-items-center px-1">
                <BiSolidUpArrow />
                </div>
                <div className="btn btn-outline-dark btn-sm me-1 d-flex justify-content-center align-items-center px-1">
                <BiSolidDownArrow />
              </div> */}
                  </tr>
                );
              else return null;
            })}
        </tbody>
      </table>
      <div className="col-12 row pe-2 my-2 mb-3">
        <div className="mx-0 px-0 col-10 col-11 mx-0 align-items-center h-100" />
        <div style={{ height: "1.5rem" }} className="col-1 d-flex mt-1">
          <div
            onClick={() => handleTableHeadChange(selectedItem, "changeUp")}
            className={`btn btn-outline-dark btn-sm me-1 d-flex justify-content-center align-items-center px-1
            ${selectedItem < 4 ? "invisible" : "visible"}`}
          >
            <BiSolidUpArrow />
          </div>
          <div
            onClick={() => handleTableHeadChange(selectedItem, "changeDown")}
            className={`btn btn-outline-dark btn-sm me-1 d-flex justify-content-center align-items-center px-1
              ${
                selectedItem < 3 || selectedItem === tableHeadList.length - 1
                  ? "invisible"
                  : "visible"
              }`}
          >
            <BiSolidDownArrow />
          </div>
          {/* <div className='mx-0 px-1 col-4'>
              <button type='reset' className='btn btn-sm btn-outline-dark w-100'>Clear</button>
          </div> */}
        </div>
        {/* <div className="mx-0 px-1 pe-0 col-1 col-2">
          <button type="submit" className="btn btn-sm btn-dark w-100">
            Save
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default PurchaseTableItemList;

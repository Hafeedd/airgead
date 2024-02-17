import { height } from "@mui/system";
import React from "react";
import { Rnd } from "react-rnd";

export const NormaA4 = (props) => {
  const {
    c_address,
    c_name,
    c_number,
    delivery_add,
    c_gstin,
    vehicle_no,
    driver,
    taxPerc,
    total_qty,
    total_disc,
    total_value,
    total_cgst,
    total_sgst,
    total,
    roundOff,
    hsn,
    TableHeigth,
    tableHead,
    tableTrBody,
    hsnCalc,
  } = props;

  return (
    <div className="p-3" id="new" style={{ width: "fit-content" }}>
      <div className="border w-auto border-secondary">
        <div className="text-center w-auto">
          <h4>Demonstration</h4>
          <p>Near New Bus Stand Nilambur</p>
        </div>
        <div className="row">
          {" "}
          {/* row of sub head */}
          <div className="col-4 row ms-1">
            <div className="row">
              <div className="col-3 text-end">Invoice: </div>
              <div className="col-6">A/0000006</div>
            </div>
            <div className="row">
              <div className="col-3 text-end">Invoice: </div>
              <div className="col-6">A/0000006</div>
            </div>
            <div className="col-1 row"></div>
          </div>
          <div className="col-4 text-center ps-4">
            <div>434234g3jh24</div>
            <div>8545485</div>
          </div>
          <div className="col-4 text-center ps-4"></div>
        </div>
        <div
         className="border-top border-bottom border-dark py-1 mt-2 text-center">
          <b>Tax invoice</b>
        </div>
        <div
          className="row border-bottom mx-0 border-secondary"
          // style={{ }}
          style={{
            // border: '2px solid black',
            height: "120px",
            // padding: "0",
            // margin: "0px",
            // overflow: "none",
          }}
        >
          <div 
          // style={{
          //   resize: "horizontal",
          //   overflow:"auto",
          //   minWidth: "20%",
          //   maxWidth:"70%",
          //   height: "100%",
          //   margin: "0px",
          //   padding: "6px",
          //   display: "flex",
          // }}
          className="col-6 text-start position-relative ps-5 py-3 border-end flex-wrap border-secondary d-flex">
            <Rnd
              default={{
                x: 0,
                y: 0,
              }}
              enableResizing="false"
              bounds="parent"
            >
              <p className="h-100 d-flex flex-column w-100 p-3 mb-0">
                <div style={{ height: "fit-content" }}>Customer Details :</div>
                <br />{c_name?.toUpperCase()}
                <br />
                {c_address && (
                  <div className="d-flex flex-wrap">
                    {c_address?.toUpperCase()}
                  </div>
                )}
              </p>
            </Rnd>
            <Rnd
              default={{
                x: 180,
                y: 25,
              }}
              enableResizing="false"
              bounds="parent"
            >
              <div className="w-100 h-100 p-2">
                <div className="text-center">MOBILE: {c_number}</div>
                <div className="text-center">GST Number: {c_gstin}</div>
              </div>
            </Rnd>
          </div>
          <div 
          // style={{
          //   resize: "horizontal",
          //   overflow:"auto",
          //   minWidth: "20%",
          //   height: "100%",
          //   margin: "0px",
          //   padding: "6px",
          //   display: "flex",
          // }}
          style={{minWidth:'fit-content'}}
          className="col-6 position-relative text-start ps-5">
            <Rnd
              default={{
                x: 60,
                y: 0,
              }}
              enableResizing="false"
              bounds="parent"
            >
              <div className="col-5 h-100 w-100 d-flex flex-column p-2">
                <div style={{ height: "fit-content" }}>Delivery to :</div> <br/>
                {delivery_add?.toUpperCase()}
              </div>
            </Rnd>
            <Rnd
              default={{
                x: 160,
                y: 20,
              }}
              enableResizing="false"
              bounds="parent"
            >
            <div className="d-flex flex-column gap-2 w-100 h-100 text-end p-3">
              <div className="row mx-0">
                <div style={{ height: "fit-content" }}>Vehicle No :</div> {vehicle_no}
              </div>
              <div className="row mx-0">
                <div style={{height:"fit-content"}}>Driver :</div> {driver?.toUpperCase()}
              </div>
            </div>
            </Rnd>
          </div>
        </div>
        <div className="border-top w-auto border-bottom mt-3 border-secondary">
          <table className="table mb-0 w-100">
            <thead>
              <tr>
                {/* <th className="border-bottom border-secondary">S/L</th> */}
                {tableHead.length > 0 &&
                  tableHead.map((data) => (
                    <th
                      style={{
                        // border: '2px solid black',
                        padding: "0",
                        margin: "0px",
                        overflow: "auto",
                      }}
                      className="border-start border-bottom border-secondary"
                    >
                      <div
                        style={{
                          resize: "horizontal",
                          overflow: "auto",
                          width: "100%",
                          minWidth: "100%",
                          height: "fit-content",
                          margin: "0px",
                          padding: "6px",
                          // border: '1px solid black',
                          display: "block",
                        }}
                      >
                        {data}
                      </div>
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {tableTrBody.length > 0 &&
                tableTrBody.map((data, i) => {
                  const a = [];
                  data.map((item) =>
                    a.push(
                      <td className="border-0 border-start border-end-0 border-secondary">
                        {item}
                      </td>
                    )
                  );
                  return (
                    <tr>
                      <td className="border-0">{i + 1}</td>
                      {a}
                    </tr>
                  );
                })}
              <TableHeigth />
              <tr>
                {/* <td></td> */}
                {tableHead.length > 0 &&
                  tableHead.map((data, i) => {
                    // console.log(data)
                    if (data.match("Qty"))
                      return (
                        <td className="border-0 border-start border-secondary">
                          {total_qty}
                        </td>
                      );
                    else if (data.match("Value"))
                      return (
                        <td className="border-0 border-start border-secondary">
                          {total_value}
                        </td>
                      );
                    else if (data.includes("Disc") && !data.includes("%"))
                      return (
                        <td className="border-0 border-start border-secondary">
                          {total_disc}
                        </td>
                      );
                    else if (data.match(/^CGST|SGST/))
                      return (
                        <td className="border-0 border-start border-secondary">
                          {total_sgst}
                        </td>
                      );
                    else if (data.includes("Total"))
                      return (
                        <td className="border-0 border-start border-secondary">
                          {total}
                        </td>
                      );
                    else {
                      return (
                        <td className="border-0 border-start border-secondary"></td>
                      );
                    }
                  })}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="row mx-0 p-3 justify-content-between align-items-end">
          <div className="col-8 border border-secondary rounded-2 p-2">
            <table className="table normalA4-print border-0 border-none me-2 mb-2">
              <thead>
                <tr className="border-bottom border-secondary">
                  <th className="text-start">Hsn</th>
                  <th>Value</th>
                  <th>Cgst%</th>
                  <th>Cgst</th>
                  <th>Sgst%</th>
                  <th>Sgst</th>
                  <th>Gst</th>
                </tr>
              </thead>
              <tbody>
                {hsnCalc?.length > 0 &&
                  hsnCalc.map((data, i) => (
                    <tr key={i}>
                      <td className="text-start">{data.hsn || ""}</td>
                      <td>{data.total || 0}</td>
                      <td>{parseFloat(data.totalSgst) / 2 || 0}%</td>
                      <td>{data.totalSgst || 0}</td>
                      <td>{parseFloat(data.taxPerc) / 2 || 0}%</td>
                      <td>{data.totalSgst || 0}</td>
                      <td>{(data.totalSgst * 2)?.toFixed(2) || 0}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="col-3">
            <div className="row mb-2">
              <div className="col-7">Round Off:</div>
              {parseFloat(total - roundOff).toFixed(2) || "0.00"}
            </div>
            <div className="row">
              <div className="col-7">
                <b>Grand Total:</b>
              </div>
              {Math.round(total || 0)?.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

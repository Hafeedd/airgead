import React from "react";

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
    <div className="w-100 p-3" id="new">
      <div className="border border-secondary">
        <div className="text-center w-100">
          <h4>Demonstration</h4>
          <p>Near New Bus Stand Nilambur</p>
        </div>
        <div className="row">
          {" "}
          {/* row of sub head */}
          <div className="col-4 row ms-1">
            <div className="row">
              <div className="col-3 text-end">Invoice: </div>
              <div className="col-3">A/0000006</div>
            </div>
            <div className="row">
              <div className="col-3 text-end">Invoice: </div>
              <div className="col-3">A/0000006</div>
            </div>
            <div className="col-1 row"></div>
          </div>
          <div className="col-4 text-center ps-4">
            <div>434234g3jh24</div>
            <div>8545485</div>
          </div>
          <div className="col-4 text-center ps-4"></div>
        </div>
        <div className="border-top border-bottom border-dark py-1 mt-2 text-center">
          <b>Tax invoice</b>
        </div>
        <div className="row border-bottom mx-0 border-secondary">
          <div className="col-6 text-start ps-5 py-3 border-end d-flex flex-column border-secondary">
            <p>
              Customer Details
              <br />
              {c_name?.toUpperCase()}
              <br />
              <div className="col-5 d-flex flex-wrap">
                {c_address?.toUpperCase()}
              </div>
            </p>
            <div className="text-center">MOBILE: {c_number}</div>
            <div className="text-center">GST Number: {c_gstin}</div>
          </div>
          <div className="col-6 text-start ps-5 pt-4">
            <div className="col-5 d-flex flex-wrap">
              Delivery to : <br />
              {delivery_add?.toUpperCase()}
            </div>
            <div className="d-flex flex-column gap-2 text-end p-3">
              <div className="row mx-0">
                <div className="col-7">Vehicle No :</div> {vehicle_no}
              </div>
              <div className="row mx-0">
                <div className="col-7">Driver :</div> {driver?.toUpperCase()}
              </div>
            </div>
          </div>
        </div>
        <div className="border-top border-bottom mt-3 border-secondary">
          <table className="table mb-0">
            <thead>
              <tr>
                <th className="border-bottom border-secondary">S/L</th>
                {tableHead.length > 0 &&
                  tableHead.map((data) => (
                    <th className="border-start border-secondary">{data}</th>
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
                <td></td>
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
          <div className="col-8 border gap-2 rounded-2 d-flex p-2 me-2 mb-2">
            {hsnCalc?.length > 0 &&
              hsnCalc.map((data, i) => (
                <>
                  <div className="col-2 col-3 gap-2 px-0">
                    <div>Hsn</div>
                    {data.hsn || ""}
                  </div>
                  <div className="col-2 col-1 gap-2 px-0">
                    <div>Value</div>
                    {data.total || 0}
                  </div>
                  <div className="col-2 col-1 gap-2 px-0">
                    <div>Cgst%</div> {parseFloat(data.totalSgst) / 2 || 0}%
                  </div>
                  <div className="col-2 col-1 gap-2 px-0">
                    <div>Cgst</div>
                    {data.totalSgst || 0}
                  </div>
                  <div className="col-2 col-1 gap-2 px-0">
                    <div>Sgst%</div> {parseFloat(data.taxPerc) / 2 || 0}%
                  </div>
                  <div className="col-2 col-1 gap-2 px-0">
                    <div>Sgst</div>
                    {data.totalSgst || 0}
                  </div>
                  <div className="col-2 col-1 gap-2 px-0">
                    <div>Gst</div>
                    {(data.totalSgst * 2)?.toFixed(2) || 0}
                  </div>
                </>
              ))}
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
              {total}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

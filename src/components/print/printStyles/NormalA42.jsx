import React from "react";
import tempImg from "../../../assets/images/image.jpg";
import { toWords } from 'number-to-words'
export const NormalA42 = (props) => {
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
    <div className="m-2 border border-secondary pt-2" id="new">
      <div className="text-center row mx-0">
        <div className="mb-3">
          <img src={tempImg} width={500} height={90} alt={"comp logo"} />
        </div>
        <p>
          <b>
            Thirnavaya Road Near Supriya Hospital
            <br />
            Puthanathani
            <br />
            Mobile : 787897898
            <br />
            Gst Number :
          </b>
          42323434
        </p>
      </div>
      <div className="border-top border-bottom mt-1 border-secondary text-center py-2">
        <b>TAX INVOICE</b>
      </div>
      <div className="row mx-0">
        <div className="col-6 row mx-0 p-2 border-end border-secondary">
          <div className="col-3">Invoice No:</div>
          <div className="col-7">4332424</div>
          <div className="col-3">Date:</div>
          <div className="col-7">20/04/2023</div>
        </div>
        <div className="col-6 row justify-content-end mx-0 p-2">
          <div className="col-3">Invoice No:</div>
          <div className="col-7">4332424</div>
          <div className="col-3">Date:</div>
          <div className="col-7">20/04/2023</div>
        </div>
      </div>
      <div className="row mx-0 border-top border-bottom border-secondary">
        <div className="col-6 py-1 ps-4 border-end border-secondary">
          {"Details of Reciever ( Billed to )"}
        </div>
        <div className="col-6 py-1 ps-4 ">
          {"Details of Consignee ( Shipped to )"}
        </div>
      </div>
      <div className="row mx-0 border-bottom border-secondary">
        <div className="col-6 py-1 ps-4 border-end border-secondary">
          <b>SR Agencies</b>
          <br />
          BYPASS ROAD MALAPPURAM
          <br />
          MALAPPURAM KUNNUMMAL
          <br />
          KERALA 5435435
          <br />
        </div>
        <div className="col-6 py-1 ps-4 ">
          MOOCHIKAL ROAD
          <br />
          VALLUVAMBURAM PO
          <br />
          KOZHIKODE DIST
          <br />
          4545345
        </div>
      </div>

      <div className="border-top border-bottom mt-3 border-secondary">
          <table className="table mb-0">
            <thead>
              <tr>
                <th className="border-bottom border-secondary">S/L</th>
                {tableHead.length > 0 &&
                  tableHead.map(data =>
                    <th className="border-start border-secondary">{data}</th>)}
              </tr>
            </thead>
            <tbody>
              {tableTrBody.length > 0 &&
                tableTrBody.map((data, i) => {
                  const a = []
                  data.map(item=>(
                    a.push(<td className="border-0 border-start border-end-0 border-secondary">{item}</td>)
                  ))
                  return (
                    <tr>
                      <td className="border-0">{i + 1}</td>
                      {a}
                    </tr>)
                })}
              <TableHeigth />
              <tr>
                <td></td>
                {tableHead.length>0&&
                tableHead.map((data,i)=>{
                  // console.log(data)
                  if(data.match('Qty'))
                    return(<td className="border-0 border-start border-secondary">{total_qty}</td>)
                    else if(data.match('Value'))
                    return(<td className="border-0 border-start border-secondary">{total_value}</td>)
                    else if(data.includes('Disc')&& !data.includes('%'))
                    return(<td className="border-0 border-start border-secondary">{total_disc}</td>)
                    else if(data.match(/^CGST|SGST/))
                    return(<td className="border-0 border-start border-secondary">{total_sgst}</td>)
                    else if(data.includes('Total'))
                    return(<td className="border-0 border-start border-secondary">{total}</td>)
                  else{
                    return(<td className="border-0 border-start border-secondary"></td>)
                  }
                })}
              </tr>
            </tbody>
          </table>
        </div>
        <div className="row mx-0">
          <div className="col-6 p-2 border-end border-secondary px-0">
            <div className="border-bottom border-secondary pb-2 px-2">{total&&toWords(total)?.slice(0,1)?.toUpperCase() + toWords(total)?.slice(1,)}</div>
            <div className="px-2 pt-2">              
                <b><u>BANK DETAILS</u></b><br/>
                Account no : 3443243243243<br/>
                IFSC : VDS34324324<br/>
                CSB BANK : PUTHANATHANI
            </div>
          </div>
          <div className="col-6 pe-0 pt-2">
                <div className="row mx-0 justify-content-end">
                <div className="col-8 text-end">Round off :</div> 
                <div className="col-3 text-end">{roundOff}</div> 
                </div>
                <div className="row mx-0 justify-content-end">
                <div className="col-8 text-end"><b>Bill Total :</b></div> 
                <div className="col-3 text-end">{roundOff}</div> 
                </div>
          </div>

        </div>
    </div>
  );
};

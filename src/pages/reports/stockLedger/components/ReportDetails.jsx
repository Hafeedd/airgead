import React from "react";
import { Form } from "react-bootstrap";
import { TfiEmail, TfiPrinter } from "react-icons/tfi";
import { BsWhatsapp, BsFiletypePdf } from "react-icons/bs";
import { RiFileExcel2Line } from "react-icons/ri";

export const ReportDetails = (props) => {
  const {stockList, setStockList,from,
    paramsToReport, setParamsToReport,} = props

    const handleChange = (e) =>{
      if(e.target.value === ""){
        setParamsToReport({...paramsToReport,[e.target.name]:null})
      }else{
        setParamsToReport({...paramsToReport,[e.target.name]:e.target.value?.toUpperCase()})
      }
    }

  return (
    // <div className="stock-jdetails-cont col-12 p-1 ps-4 rounded-1 w-100 bg-light h-100 pe-4">
      <div className="stock-entry row mx-0 px-0 pt-1 w-fit d-flex justify-content-between">
        <div className="d-flex col-8 px-0">
          <Form.Group className="col-6 pe-4 ps-0 mx-0 d-flex align-items-start mt-1">
            <Form.Label className="col-2 purchase-input-label pb-1">
              From.
            </Form.Label>
            <Form.Control
              onChange={handleChange}
              required
              name="from_date"
              value={paramsToReport.from_date||(new Date().toISOString.slice(0,8)+'01')}
              className="purchase-input-text me-2"
              placeholder="Document number"
              type="date"
            />
          </Form.Group>
          <Form.Group className="col-6 pe-6 ps-0 mx-0 d-flex align-items-start mt-1">
            <Form.Label className="col-2 purchase-input-label pb-1">
              Upto
            </Form.Label>
            <Form.Control
              onChange={handleChange}
              required
              name="to_date"
              value={paramsToReport.to_date||(new Date().toISOString().slice(0,8)+'01')}
              className="purchase-input-text me-2"
              placeholder="Document number"
              type="date"
            />
          </Form.Group>
        </div>
        <div className="col-4 mt-1 d-flex justify-content-end">
          <div
            style={{ background: "#4B4B4B" }}
            className="reports-btn btn rounded-1 col-5 py-0 me-3"
          >
            <TfiEmail size={18} className="me-2 h-100" />
            Email
          </div>
          <div
            style={{ background: "#4B4B4B" }}
            className="reports-btn btn rounded-1 col-5 py-0"
          >
            <BsWhatsapp className="me-2" size={18} />
            Whatsapp
          </div>
        </div>
        <div className="stock-entry row mx-0 px-0 pt-1 w-fit d-flex justify-content-between mt-2">
          <div className="d-flex col-8 px-0">
            <Form.Group className="col-6 pe-4 ps-0 mx-0 d-flex align-items-start mt-1">
              <Form.Label className="col-2 purchase-input-label pb-1">
               {from=="stock" ? "Item Code":"Details"}
              </Form.Label>
              <Form.Control
                onChange={handleChange}
                name="item_code"
                value={paramsToReport.item_code||""}
                className="purchase-input-text me-2 text-start"
                placeholder={from=="stock" ? "Item Code":"Details"}
                type="text"
              />
              {/* <div 
                className="col-1 col-2 p-1 bg-dark rounded-1 btn py-0 text-light "> */}
              {/* <MdMovieEdit size={18} className="mb-1"/></div> */}
            </Form.Group>
          </div>
          <div className="col-4 mt-1 d-flex justify-content-end">
            <div
              style={{ background: "#4B4B4B" }}
              className="reports-btn btn rounded-1 col-5 py-0 me-3"
            >
              <BsFiletypePdf className="me-2 text-" size={18}/>
              PDF
            </div>
            <div
              style={{ background: "#4B4B4B" }}
              className="reports-btn btn rounded-1 col-5 py-0 me-3"
            >
              <RiFileExcel2Line className="me-2" size={18}/>
              Excel
            </div>
            <div
              style={{ background: "#4B4B4B" }}
              className="reports-btn btn rounded-1 col-5 py-0"
            >
              <TfiPrinter size={18} className="me-2 h-100" />
              Print
            </div>
          </div>
        </div>
      </div>
  );
};

import React, { useEffect, useState } from "react";
import { TfiEmail, TfiPrinter } from "react-icons/tfi";
import { BsWhatsapp, BsFiletypePdf } from "react-icons/bs";
import { RiFileExcel2Line } from "react-icons/ri";
import { Form } from "react-bootstrap";

export const TaxDetails = (props) => {
  const { params, setParams } = props;
  
  const handleChange = (e) => {
      if (e.target.value == "") {
          setParams({ ...params, [e.target.name]: null });
        } else setParams({ ...params, [e.target.name]: e.target.value });
    };

  return (
    <div className="row mx-0 d-flex">
      <div className="col-9 px-0 ">
        <div className="col-12 mt-1 d-flex justify-content-start d-flex flex-wrap gap-3">
          <div
            style={{ background: "#4B4B4B" }}
            className="reports-btn btn rounded-1 col-2 p-0 "
          >
            <BsFiletypePdf className="me-2 text-" size={18} />
            PDF
          </div>
          <div
            style={{ background: "#4B4B4B" }}
            className="reports-btn btn rounded-1  col-2 py-0 "
          >
            <RiFileExcel2Line className="me-2" size={18} />
            Excel
          </div>
          <div
            style={{ background: "#4B4B4B" }}
            className="reports-btn btn rounded-1  col-2 py-0 "
          >
            <TfiPrinter size={18} className="me-2 h-100" />
            Print
          </div>
          <div
            style={{ background: "#4B4B4B" }}
            className="reports-btn btn rounded-1  col-2 py-0 "
          >
            <TfiEmail size={18} className="me-2 h-100" />
            Email
          </div>
          <div
            style={{ background: "#4B4B4B" }}
            className="reports-btn btn rounded-1  col-2 py-0"
          >
            <BsWhatsapp size={18} className="me-2 h-100" />
            Whatsapp
          </div>
        </div>
        <div className="row mx-0 mt-2">
          <div className="d-flex col-8 px-0">
            <Form.Group className="col-5 pe-4 ps-0 mx-0 d-flex align-items-center mt-1">
              <Form.Label className="col-2 purchase-input-label pb-1">
                {/* {from=="stock" ? "Item Code":"Details"} */}
                From
              </Form.Label>
              <Form.Control
                name="from_date"
                onChange={handleChange}
                value={params?.from_date || ""}
                className="purchase-input-text me-2 text-start"
                type="date"
              />
            </Form.Group>
            <Form.Group className="col-5 pe-4 ps-0 mx-0 d-flex align-items-center mt-1">
              <Form.Label className="col-2 purchase-input-label pb-1">
                {/* {from=="stock" ? "Item Code":"Details"} */}
                Upto
              </Form.Label>
              <Form.Control
                name="to_date"
                value={
                  params?.to_date || new Date()?.toISOString()?.slice(0, 10)
                }
                onChange={handleChange}
                className="purchase-input-text me-2 text-start"
                type="date"
              />
            </Form.Group>
          </div>
        </div>
      </div>
      <div className="col-3 row px-0 d-flex justify-content-end mx-0">
        <Form.Group className="col-12 w-100 mx-0 d-flex align-items-center px-0 ps-1">
          <Form.Select
            name="category"
            value={params.category}
            onChange={handleChange}
            className="purchase-input-text select-drop text-start"
            type="date"
          >
            <option value="sales">Sales</option>
            <option value="purchase">Purchase</option>
            {/* <option>S. Return</option>
            <option>P. Return</option>
            <option>Service</option>
            <option>Stock Transfer</option> */}
          </Form.Select>
        </Form.Group>
        <Form.Group className="col-12 mx-0 d-flex align-items-center px-0 ps-1 mt-2">
          <Form.Select
            name="report_type"
            value={params?.report_type}
            onChange={handleChange}
            className="purchase-input-text select-drop text-start"
            type="date"
          >
            <option value="item_wise">Item Wise</option>
            <option value="hsn_wise">HSN Wise</option>
            <option value="percentage_wise">Percentage Wise</option>
            <option value="tax_summary">Tax Summary</option>
            <option value="date_summary">Date Summary</option>
          </Form.Select>
        </Form.Group>
      </div>
    </div>
  );
};

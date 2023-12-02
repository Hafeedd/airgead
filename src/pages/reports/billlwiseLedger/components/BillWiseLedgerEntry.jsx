import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { BsFiletypePdf, BsWhatsapp } from "react-icons/bs";
import { RiFileExcel2Line } from "react-icons/ri";
import { TfiEmail, TfiPrinter } from "react-icons/tfi";
import './billWiseLedger.css'

const BillWiseLedgerEntry = () => {



  return (
    <div className="row mx-0">
      <div className="col-12 px-0 mt-1 d-flex gap-3 justify-content-start">
        <div
          style={{ background: "#4B4B4B" }}
          className="reports-btn btn rounded-1 col-1 col-2 py-0"
        >
          <BsFiletypePdf className="me-2 text-" size={18} />
          PDF
        </div>
        <div
          style={{ background: "#4B4B4B" }}
          className="reports-btn btn rounded-1 col-1 col-2 py-0"
        >
          <RiFileExcel2Line className="me-2" size={18} />
          Excel
        </div>
        <div
          style={{ background: "#4B4B4B" }}
          className="reports-btn btn rounded-1 col-1 col-2 py-0"
        >
          <TfiPrinter size={18} className="me-2 h-100" />
          Print
        </div>
        <div
          style={{ background: "#4B4B4B" }}
          className="reports-btn btn rounded-1 col-1 col-2 py-0"
        >
          <TfiEmail size={18} className="me-2 h-100" />
          Email
        </div>
        <div
          style={{ background: "#4B4B4B" }}
          className="reports-btn btn rounded-1 col-1 col-2 py-0"
        >
          <BsWhatsapp size={18} className="me-2 h-100" />
          Whatsapp
        </div>
      </div>
      <div className="d-flex col-12 mt-2 mx-0 px-0">
        <Form.Group className="col-4 col-3 pe-4 ps-0 mx-0 d-flex align-items-center mt-1">
          <Form.Label className="col-2 purchase-input-label pb-1">
            Select
          </Form.Label>
          <Form.Select
            aria-label="Default select example"
            name="select"
            className="purchase-input-text me-2 text-start"
          >
            <option value="1">All</option>
            <option value="2">Active</option>
            <option value="3">Inactive</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="col-4 col-3 pe-4 ps-0 mx-0 d-flex align-items-center mt-1">
          <Form.Label className="col-2 purchase-input-label pb-1">
            From
          </Form.Label>
          <Form.Control
            name="from_date"
            className="purchase-input-text me-2 text-start"
            type="date"
          />
        </Form.Group>
        <Form.Group className="col-4 col-3 pe-4 ps-0 mx-0 d-flex align-items-center mt-1">
          <Form.Label className="col-2 purchase-input-label pb-1">
            Upto
          </Form.Label>
          <Form.Control
            name="to_date"
            className="purchase-input-text me-2 text-start"
            type="date"
          />
        </Form.Group>
      </div>
    </div>
  );
};

export default BillWiseLedgerEntry;

import React from 'react'
import { TfiEmail, TfiPrinter } from "react-icons/tfi";
import { BsWhatsapp, BsFiletypePdf } from "react-icons/bs";
import { RiFileExcel2Line } from "react-icons/ri";
import { Form } from "react-bootstrap";

const ChartOfAccEntry = () => {
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
       
    </div>
  )
}

export default ChartOfAccEntry
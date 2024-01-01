import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { BsFiletypePdf, BsWhatsapp } from "react-icons/bs";
import { RiFileExcel2Line } from "react-icons/ri";
import { TfiEmail, TfiPrinter } from "react-icons/tfi";
import './billWiseLedger.css'
import { Dropdown } from "semantic-ui-react";

const BillWiseLedgerEntry = (props) => {

  const {
    params,
    setParams,
    accountList,
    accountCode,
    setAccountCode,
    setAccountName,
  } = props;

  
  const handleChange = (e)=>{
    if(e.target.value === ""){
      setParams({ ...params,[e.target.name]:null})
    }else{
      setParams({ ...params,[e.target.name]: e.target.value })
    }
  }

    const search = (options, searchValue) => {
      searchValue = searchValue.toUpperCase();
      return options.filter((option) => {
        console.log(option);
        return (
          option?.value?.includes(searchValue) ||
          option?.text?.includes(searchValue)
        );
      });
    };

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
        <div className="col-4 col-3 pe-4 ps-0 mx-0 d-flex align-items-center mt-1">
          <Form.Label className="col-2 purchase-input-label pb-1">
            Account
          </Form.Label>
          <Dropdown
            // disabled={edit}
            clearable
            selection
            search={search}
            onChange={(e,data)=>{
              setAccountCode(data.value)
              setAccountName(data.options?.filter(x=>x.value==data.value)[0]?.text)  
            }}
            className="bill-wise-select item d-flex align-items-center py-0 form-control"
            name="supplier_detail"
            placeholder="select Account Details"
            value={accountCode || ""}
            options={accountList}
          />
        </div>

        <Form.Group className="col-4 col-3 pe-4 ps-0 mx-0 d-flex align-items-center mt-1">
          <Form.Label className="col-2 purchase-input-label pb-1">
            From
          </Form.Label>
          <Form.Control
            onChange={handleChange}
            required
            name="from_date"
            value={params.from_date || new Date().toISOString(0, 10)}
            className="purchase-input-text me-2 text-start"
            type="date"
          />
        </Form.Group>
        <Form.Group className="col-4 col-3 pe-4 ps-0 mx-0 d-flex align-items-center mt-1">
          <Form.Label className="col-2 purchase-input-label pb-1">
            Upto
          </Form.Label>
          <Form.Control
            onChange={handleChange}
            required
            name="to_date"
            value={params.to_date || new Date().toISOString(0, 10)}
            className="purchase-input-text me-2 text-start"
            type="date"
          />
        </Form.Group>
      </div>
    </div>
  );
};

export default BillWiseLedgerEntry;

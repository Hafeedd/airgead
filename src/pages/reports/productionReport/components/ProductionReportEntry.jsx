import React from 'react'
import '../productionreport.css'
import { Form } from 'react-bootstrap';
import { TfiEmail, TfiPrinter } from "react-icons/tfi";
import { BsWhatsapp, BsFiletypePdf } from "react-icons/bs";
import { RiFileExcel2Line } from "react-icons/ri";

const ProductionReportEntry = () => {
  return (
    <div className="row mx-0">
      <div className="col-12 d-flex justify-content-spacebetween">
        <div className="d-flex col-6 mt-2 mx-0 px-0">
          <Form.Group className="col-6 pe-4 ps-0 mx-0 d-flex align-items-center mt-1">
            <Form.Label className="col-2 purchase-input-label pb-1">
              {/* {from=="stock" ? "Item Code":"Details"} */}
              From
            </Form.Label>
            <Form.Control
              name="from_date"
              // onChange={handleChange}
              // value={params.from_date || ""}
              className="purchase-input-text me-2 text-start"
              type="date"
            />
          </Form.Group>
          <Form.Group className="col-6 pe-4 ps-0 mx-0 d-flex align-items-center mt-1">
            <Form.Label className="col-2 purchase-input-label pb-1">
              {/* {from=="stock" ? "Item Code":"Details"} */}
              To
            </Form.Label>
            <Form.Control
              name="to_date"
              // value={params.to_date || new Date()?.toISOString()?.slice(0, 10)}
              // onChange={handleChange}
              className="purchase-input-text me-2 text-start"
              type="date"
            />
          </Form.Group>
        </div>

        <div className="col-6 px-0 mt-1 d-flex gap-3 justify-content-end">
          <div
            style={{ background: "#4D872A" }}
            className="reports-btn btn rounded-1 col-3 py-2"
          >
            <BsWhatsapp size={18} className="me-2 h-100" />
            Whatsapp
          </div>
          <div
            style={{ background: "#AD3232" }}
            className="reports-btn btn rounded-1 col-3 py-2"
          >
            <BsFiletypePdf className="me-2 text-" size={18} />
            PDF
          </div>
          <div
            style={{ background: "#4C6CBE" }}
            className="reports-btn btn rounded-1 col-3 py-2"
          >
            <RiFileExcel2Line className="me-2" size={18} />
            Excel
          </div>
        </div>
      </div>
      <div className="mt-4 col-12 d-flex">
        <div className="col-6 d-flex">
          <div className="col-6 d-flex align-items-center">
            <Form.Label className="pe-1 purchase-input-label pb-1">
              From :
            </Form.Label>
            <div className="col-6">02/01/2024</div>
          </div>
          <div className="col-6 d-flex align-items-center">
            <Form.Label className="pe-1 purchase-input-label pb-1">
              To :
            </Form.Label>{" "}
            <div className="col-6">02/01/2024</div>
          </div>
        </div>
        <div className="col-6 d-flex">
          <Form.Group className="col-6 pe-4 ps-0 mx-0 d-flex align-items-center mt-1">
            <Form.Label className="col-3 purchase-input-label pb-1">
              Item
            </Form.Label>
            <Form.Select
              name="item"
              className="purchase-input-text m-0 text-start"
            >
              <option value="">Select an item</option>
              <option value="item1">Item 1</option>
              <option value="item2">Item 2</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="col-6 ps-0 mx-0 d-flex align-items-center mt-1">
            <Form.Label className="col-3 purchase-input-label pb-1">
              Type
            </Form.Label>
            <Form.Select
              name="type"
              className="purchase-input-text m-0 text-start"
            >
              <option value="">Select a type</option>
              <option value="type1">Type 1</option>
              <option value="type2">Type 2</option>
            </Form.Select>
          </Form.Group>
        </div>
      </div>
    </div>
  );
}

export default ProductionReportEntry
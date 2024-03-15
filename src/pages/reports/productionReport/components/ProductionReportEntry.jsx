import React from 'react'
import '../productionreport.css'
import { Form } from 'react-bootstrap';
import { BsWhatsapp, BsFiletypePdf } from "react-icons/bs";
import { RiFileExcel2Line } from "react-icons/ri";
import { Dropdown } from 'semantic-ui-react';

const ProductionReportEntry = (params) => {
  const { 
    paramsToReport,
    setParamsToReport,
    items,
    types,
    searchItem,
    setSearchItem,
    searchType,
    setSearchType,
  } =params

  const handleChange = (e) => {
    if (e.target.value === "") {
      setParamsToReport({ ...paramsToReport, [e.target.name]: null });
    } else {
      setParamsToReport({ ...paramsToReport, [e.target.name]: e.target.value });
    }
  };
  const search = (options, searchValue) => {
    searchValue = searchValue?.toString()?.toLowerCase();
    return options.filter((option) => {
      return (
        option?.value?.toString()?.toLowerCase()?.includes(searchValue) ||
        option?.text?.toString()?.toLowerCase()?.includes(searchValue)
      );
    });
  };

  const handleDropdownChangeItem = (e,data)=>{
    if (data.value != "") setSearchItem(data?.value)
  }

  const handleDropdownChangeType = (e,data)=>{
    if (data.value != "") setSearchType(data?.value)
  }
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
              onChange={handleChange}
              value={paramsToReport.from_date}
              className="purchase-input-text me-2 text-start"
              type="date"
              required
            />
          </Form.Group>
          <Form.Group className="col-6 pe-4 ps-0 mx-0 d-flex align-items-center mt-1">
            <Form.Label className="col-2 purchase-input-label pb-1">
              {/* {from=="stock" ? "Item Code":"Details"} */}
              To
            </Form.Label>
            <Form.Control
              name="to_date"
              value={ paramsToReport.to_date }
              onChange={handleChange}
              className="purchase-input-text me-2 text-start"
              type="date"
              required
            />
          </Form.Group>
        </div>

        <div className="col-6 px-0 mt-1 d-flex gap-3 justify-content-end">
          <div
            style={{ background: "#4D872A" }}
            className="reports-btn btn rounded-1 col-2 py-1 px-0"
          >
            <BsWhatsapp size={18} className="me-2 h-100" />
            Whatsapp
          </div>
          <div
            style={{ background: "#AD3232" }}
            className="reports-btn btn rounded-1 col-2 py-1"
          >
            <BsFiletypePdf className="me-2 text-" size={18} />
            PDF
          </div>
          <div
            style={{ background: "#4C6CBE" }}
            className="reports-btn btn rounded-1 col-2 py-1"
          >
            <RiFileExcel2Line className="me-2" size={18} />
            Excel
          </div>
        </div>
      </div>
      <div className="mt-2 col-12 d-flex">
        <div className="col-6 d-flex">
          {/* <div className="col-6 d-flex align-items-center">
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
          </div> */}
        </div>
        <div className="col-6 d-flex">
          <Form.Group className="col-6 pe-4 ps-0 mx-0 d-flex align-items-center mt-1">
            <Form.Label className="col-3 purchase-input-label pb-1">
              Item
            </Form.Label>
            <Dropdown
                      clearable
                      selection
                      search={search}
                      // onKeyDown={handleKeyDown1}
                      onChange={(e, val) =>
                        handleDropdownChangeItem(e, val)
                      }
                      className="purchase-input-text table-drop form-control d-flex align-items-center"
                      name="searchItem"
                      placeholder="Select"
                      value={searchItem || ""}
                      options={items}
                    />
          </Form.Group>
          <Form.Group className="col-6 ps-0 mx-0 d-flex align-items-center mt-1">
            <Form.Label className="col-3 purchase-input-label pb-1">
              Type
            </Form.Label>
            <Dropdown
                      clearable
                      selection
                      search={search}
                      // onKeyDown={handleKeyDown1}
                      onChange={(e, val) =>
                        handleDropdownChangeType(e, val)
                      }
                      className="purchase-input-text table-drop form-control d-flex align-items-center"
                      name="searchType"
                      placeholder="Select"
                      value={searchType || ""}
                      options={types}
                    />
          </Form.Group>
        </div>
      </div>
    </div>
  );
}

export default ProductionReportEntry
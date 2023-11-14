import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { MdMovieEdit } from "react-icons/md";
import { TfiEmail, TfiPrinter } from "react-icons/tfi";
import { BsWhatsapp, BsFiletypePdf } from "react-icons/bs";
import { BiSolidTrashAlt } from "react-icons/bi";
import { RiFileExcel2Line } from "react-icons/ri";
import { AccJournalTable } from "./AccJournalTable";
import useOnKey from "../../../../hooks/onKeyFunct/onKeyFunct";

export const AccJournalDetails = () => {
  const [ref, setRef] = useState(null);
  const [accListAdd, setAccListAdd] = useState([]);
  const [accJnlAdd, setAccJnlAdd] = useState({
    voucher_number: null,
    date: null,
    narration: null,
  });

  const [accJnlTable, setAccJnlTable] = useState({
    name: null,
    code: null,
    desc: null,
    debit: null,
    credit: null,
  });

  const { handleKeyDown, formRef } = useOnKey(ref, setRef);
  return (
    <form
      ref={formRef}
      className="stock-jdetails-cont ps-4 p-2 rounded-1 mx-0 w-100 bg-light h-100 row"
    >
      <div className="mx-0 col-6 mt-2 justify-content-center">
        <div style={{ paddingLeft: "14rem" }}>Journal Details</div>
        <Form.Group className="col-9 pe-2 me-4 mx-0 d-flex align-items-start mt-2">
          <Form.Label className="col-3 purchase-input-label pb-1">
            Doc no.
          </Form.Label>
          <Form.Control
            // onChange={handleChange}
            onKeyDown={handleKeyDown}
            required
            name="voucher_number"
            value={accJnlAdd.voucher_number || ""}
            className="purchase-input-text"
            placeholder="Document number"
            type="text"
          />
        </Form.Group>
        <Form.Group className="col-9 pe-2 me-4 mx-0 d-flex align-items-start mt-2">
          <Form.Label className="col-3 purchase-input-label pb-1">
            Date
          </Form.Label>
          <Form.Control
            // onChange={handleChange}
            onKeyDown={handleKeyDown}
            required
            name="date"
            value={accJnlAdd.date || new Date().toISOString()?.slice(0, 10)}
            className="purchase-input-text"
            placeholder="Date"
            type="date"
          />
        </Form.Group>
      </div>
      <div className="col-2" />
      <div className="mx-0 col-4 mt-1 row d-flex justify-content-end">
        <div
          className="col-12 d-flex justify-content-end"
          style={{ paddingRight: "10rem" }}
        >
          Printing Details
        </div>
        <Form.Group className="col-12 pe-2 me-4 ps-0 mx-0 d-flex align-items-start mt-1">
          <Form.Label className="col-3 purchase-input-label pb-1">
            Style
          </Form.Label>
          <Form.Control
            // onChange={handleChange}
            onKeyDown={handleKeyDown}
            required
            // name="code"
            // value={accJnlAdd.code||''}
            className="purchase-input-text"
            type="text"
          />
        </Form.Group>
        <Form.Group className="col-12 pe-2 me-4 ps-0 mx-0 d-flex align-items-start mt-2">
          <Form.Label className="col-3 purchase-input-label pb-1">
            Printer
          </Form.Label>
          <Form.Control
            // onChange={handleChange}
            onKeyDown={handleKeyDown}
            required
            // name="code"
            // value={accJnlAdd.code||''}
            className="purchase-input-text"
            type="text"
          />
        </Form.Group>

        <div className="row col-10 mx-0 px-0 justify-content-star">
          <Form.Group className="col-5 pe-0 me-0 ps-0 mx-0 d-flex align-items-center mt-2">
            <input
              // onChange={handleChange}
              onKeyDown={handleKeyDown}
              required
              // name="code"
              // value={accJnlAdd.code||''}
              className="purchase-input-text"
              type="checkbox"
            />
            <Form.Label className="col-8 col purchase-input-label ps-2">
              Show preview
            </Form.Label>
          </Form.Group>
          <Form.Group className="col-2 ps-0 mx-0 d-flex align-items-center mt-1">
            <input
              // onChange={handleChange}
              onKeyDown={handleKeyDown}
              required
              // name="code"
              // value={accJnlAdd.code||''}
              className="purchase-input-text"
              type="checkbox"
            />
            <Form.Label className="col-2 purchase-input-label ps-2">
              Print
            </Form.Label>
          </Form.Group>
        </div>
      </div>

      <AccJournalTable {...{ handleKeyDown, accJnlTable, setAccJnlTable }} />

      <div className="row mx-0 acc-journal-footer">
        <Form.Group className="col-4 pe-2 me-4 ps-0 mx-0 d-flex align-items-start mt-1">
          <Form.Label className="col-3 purchase-input-label pb-1">
            Remark
          </Form.Label>
          <textarea
            rows={4}
            // onChange={handleChange}
            onKeyDown={handleKeyDown}
            required
            name="narration"
            value={accJnlAdd.narration || ""}
            className="purchase-input-text w-100"
            type=""
          />
        </Form.Group>
        <span className="col-3 col-4" />
        <div className="text-end col-4 d-flex align-items-end mx-0 justify-content-end">
          <div className="btn col-4 py-1 border-dark me-2">Cancel</div>
          <div className="btn col-4 py-1 btn-dark">Save</div>
        </div>
      </div>
    </form>
  );
};

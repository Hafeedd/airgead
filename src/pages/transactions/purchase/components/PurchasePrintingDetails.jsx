import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { FiEdit } from "react-icons/fi";
import useOnKey from "../../../../hooks/onKeyFunct/onKeyFunct";

const PurchasePrintingDetails = (props) => {
  const { handleEdit, purchaseAdd, handleChange } = props;
  const [ref, setRef] = useState(null);

  const { handleKeyDown, formRef } = useOnKey(ref, setRef);

  return (
    <div ref={formRef} className="row mx-0 mb-0">
      {/* Row 1 -------------------------------------------------------------------------------------------------------- */}
      <Form.Group className="col-3 mx-0 d-flex align-items-center my-1">
        <Form.Label className="col-3 purchase-input-label">Style</Form.Label>
        <Form.Control
          onKeyDown={handleKeyDown}
          className="purchase-input-text"
          placeholder="A4 (21x30)"
          type="text"
        />
      </Form.Group>
      <Form.Group className="col-3 ps-4 mx-0 d-flex align-items-center my-1">
        <Form.Label className="col-3 purchase-input-label">Printer</Form.Label>
        <Form.Control
          onKeyDown={handleKeyDown}
          className="purchase-input-text"
          placeholder="Epson LX454755"
          type="text"
        />
      </Form.Group>
      <span className="col-2 col-3" />
      <Form.Group className="col-3 col-4 mx-0 d-flex align-items-center my-1">
        <Form.Label className="col-3 col-4 purchase-input-label">
          Doc No
        </Form.Label>
        <Form.Control
          onKeyDown={handleKeyDown}
          name="documents_no"
          value={purchaseAdd.documents_no || ""}
          onChange={handleChange}
          className="purchase-input-text"
          type="text"
        />
      </Form.Group>
      {/* Row 2 -------------------------------------------------------------------------------------------------------- */}
      <Form.Group className="col-2 mx-0 d-flex align-items-center mt-1">
        <Form.Label className="col-6 purchase-input-label">
          Print Copies
        </Form.Label>
        <Form.Control
          onKeyDown={handleKeyDown}
          name="documents_no"
          value={purchaseAdd.documents_no || ""}
          onChange={handleChange}
          className="purchase-input-text"
          placeholder="02"
          type="number"
        />
      </Form.Group>
      <div className="col-4 d-flex align-items-center row mx-0 my-1">
        <div className="mx-0 px-0 col-4 d-flex align-items-center justify-content-end">
          <input
            onKeyDown={handleKeyDown}
            type="checkbox"
            name="Repeat"
            value="Repeat"
          />
          <label for="Repeat" className="ps-2">
            Preview
          </label>
        </div>
        <div className="mx-0 px-0 col-3 d-flex align-items-center justify-content-end">
          <input
            onKeyDown={handleKeyDown}
            type="checkbox"
            name="Blocked"
            value="Blocked"
          />
          <label for="Blocked" className="ps-2">
            Print
          </label>
        </div>
        <div className="mx-0 px-0 col-5 d-flex align-items-center justify-content-end">
          <input
            onKeyDown={handleKeyDown}
            type="checkbox"
            name="Blocked"
            value="Blocked"
          />
          <label for="Blocked" className="ps-2">
            Print Barcode
          </label>
        </div>
      </div>
      <span className="col-2 col-3" />
      <Form.Group className="col-3 col-4 mx-0 d-flex align-items-center my-1">
        <Form.Label className="col-3 col-4 purchase-input-label">
          Date
        </Form.Label>
        <Form.Control
          onKeyDown={handleKeyDown}
          name="bill_date"
          value={
            purchaseAdd?.created_at?.slice(0, 10) ||
            new Date().toISOString().slice(0, 10)
          }
          onChange={handleChange}
          className="purchase-input-text"
          type="date"
        />
      </Form.Group>
      {/* Row 3 -------------------------------------------------------------------------------------------------------- */}
      <div className="col-3 col-2 d-flex align-items-end justify-content-start ps-1 pe-0">
        <div className="px-1">
          <div className="btn btn-sm btn-secondary px-3">Purchase</div>
        </div>
        <div>
          <div className="btn btn-sm btn-secondary px-3">P.Return</div>
        </div>
        <div className="ps-1">
          <div className="btn btn-sm btn-secondary px-3">Other</div>
        </div>
        <div className="ps-1 col-3">
          <div
            onClick={handleEdit}
            className="btn btn-sm btn-dark px-1 justify-content-center d-flex align-items-center gap-1"
          >
            <FiEdit size={"1rem"} />
            Edit
          </div>
        </div>
      </div>
      <div className="col-1"></div>
      {/* <div className="col-1 d-flex align-items-end ps-0 "> */}
        {/* <div className="btn btn-dark btn-sm purchase-edit-btn" onClick={handleEdit}>
                    <FiEdit size={'1rem'} />Edit
                </div> */}
      {/* </div> */}
      <span className="col-5" />
      <Form.Group className="col-3 col-4 mx-0 d-flex align-items-center my-1">
        <Form.Label className="col-3 col-4 purchase-input-label">
          Order No
        </Form.Label>
        <Form.Control
          onKeyDown={handleKeyDown}
          name="order_no"
          value={purchaseAdd.order_no || ""}
          onChange={handleChange}
          className="purchase-input-text"
          type="text"
        />
      </Form.Group>
    </div>
  );
};

export default PurchasePrintingDetails;

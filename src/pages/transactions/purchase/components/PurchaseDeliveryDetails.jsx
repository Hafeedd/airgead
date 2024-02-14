import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { FiEdit } from "react-icons/fi";
import useOnKey from "../../../../hooks/onKeyFunct/onKeyFunct";

const PurchaseDeliveryDetails = (props) => {
  const { handleEdit, purchaseAdd , handleChange} = props;
  const [ref, setRef] = useState(null);

  const { handleKeyDown, formRef } = useOnKey(ref, setRef);

  return (
    <div ref={formRef} className="row mx-0 mb-0">
      {/* Row 1 -------------------------------------------------------------------------------------------------------- */}
      <Form.Group className="col-3 mx-0 d-flex align-items-center my-1">
        <Form.Label className="col-4 purchase-input-label">
          Vehicle No
        </Form.Label>
        <Form.Control
          onKeyDown={handleKeyDown}
          name="vehicle_no"
          value={purchaseAdd.vehicle_no || ""}
          onChange={handleChange}
          className="purchase-input-text"
          type="text"
        />
      </Form.Group>
      <Form.Group className="col-3 ps-4 mx-0 d-flex align-items-center my-1">
        <Form.Label className="col-4 purchase-input-label">Driver</Form.Label>
        <Form.Control
          onKeyDown={handleKeyDown}
          name="driver"
          value={purchaseAdd.driver || ""}
          onChange={handleChange}
          className="purchase-input-text"
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
      <Form.Group className="col-3 mx-0 d-flex align-items-center my-1">
        <Form.Label className="col-4 purchase-input-label">Project</Form.Label>
        <Form.Control
          onKeyDown={handleKeyDown}
          name="documents_no"
          value={purchaseAdd.documents_no || ""}
          onChange={handleChange}
          className="purchase-input-text"
          type="text"
        />
      </Form.Group>
      <span className="col-5 col-6" />
      <Form.Group className="col-3 col-4 mx-0 d-flex align-items-center my-1">
        <Form.Label className="col-3 col-4 purchase-input-label">
          Date
        </Form.Label>
        <Form.Control
          onKeyDown={handleKeyDown}
          name="bill_date"
          value={purchaseAdd?.created_at?.slice(0,10)||(new Date().toISOString().slice(0,10))}
          onChange={handleChange}
          className="purchase-input-text"
          type="date"
        />
      </Form.Group>
      {/* Row 3 -------------------------------------------------------------------------------------------------------- */}
      <div className="col-3 col-2 pe-0 d-flex align-items-end justify-content-start ps-1">
        <div className="px-1">
          <div className="btn btn-sm btn-secondary px-3">Purchase</div>
        </div>
        <div className="">
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
      {/* <div className="col-1 d-flex align-items-end ps-0"> */}
        {/* <div
          className="btn btn-dark btn-sm purchase-edit-btn"
          onClick={handleEdit}
        >
          <FiEdit size={"1rem"} />
          Edit
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

export default PurchaseDeliveryDetails;

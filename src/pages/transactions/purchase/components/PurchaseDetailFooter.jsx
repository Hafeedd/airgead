import React from "react";
import { Form } from "react-bootstrap";
import { Dropdown } from "semantic-ui-react";

const PurchaseDetailFooter = (props) => {
  const {
    handleEdit,
    purchaseAdd,
    bankList,
    handleChange,
    handleKeyDown,
    handlePurchaseAllReset,
    edit,
  } = props;

  return (
    <div className="row mx-2 my-1 me-0">
      <div className="col-2 col-3 purchase-supplier-container align-items-start row mx-0 mt-1 me-4">
        <div className="col-12 my-1 container-title">E Paymen</div>
        <Form.Group className="col-2 mx-0 px-0 col-10 mx-0 d-flex align-items-center mt-1 ms-2">
          <Form.Label className="col-4 col-5 purchase-input-label">
            Bank
          </Form.Label>
          <div className="mx-0 col-9 px-0">
            <Dropdown
              name="fk_bank"
              value={purchaseAdd.fk_bank}
              onChange={handleChange}
              className="purchase-bank-drop mx-0"
              placeholder="select"
              fluid
              search
              clearable
              selection
              options={bankList}
            />
          </div>
        </Form.Group>
        <Form.Group className="col-2 mx-0 px-0 col-10 mx-0 d-flex align-items-center mt-2 ms-2">
          <Form.Label className="col-4 col-5 purchase-input-label">
            Amount
          </Form.Label>
          <div className="mx-0 col-9 px-0">
            <Form.Control
              placeholder="Enter"
              name="bank_amount"
              value={purchaseAdd.bank_amount || ""}
              onKeyDown={handleKeyDown}
              onChange={handleChange}
              className="purchase-input-text"
              type="numeric"
            />
          </div>
        </Form.Group>
        {/* <span className="col-12 ms-1" style={{ height: "2rem" }}> */}
        {/* </span>  */}
      </div>
      <div className="col-3 purchase-supplier-container row mx-0 mt-1">
        <div className="col-12 my-1 container-title">Supplier Details</div>
        <div className="col-12 row mx-0 align-items-center">
          <div className="col-1">OB</div>
          <div className="col-1">:</div>
          <div className="col-10"></div>
        </div>
        <div className="col-12 row mx-0 align-items-center">
          <div className="col-1">CB</div>
          <div className="col-1">:</div>
        </div>
        <span className="col-12 ms-1" style={{ height: "3rem" }}>
          <Form.Group className="col-2 col-10 mx-0 d-flex align-items-center mt-1 ms-2">
            <Form.Label className="col-4 col-5 purchase-input-label">
              Cash/ Credit
            </Form.Label>
            <div className="mx-0 col-9 px-0">
              <select
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                value={purchaseAdd.payment_type || "CASH"}
                name="payment_type"
                className="customer-select bg-dark text-light w-100"
              >
                <option value="CASH">CASH</option>
                <option value="CREDIT">CREDIT</option>
              </select>
            </div>
          </Form.Group>
        </span>
      </div>
      <div className="col-3 col-4 row me-0">
        <Form.Group className="col-12 mx-0 d-flex align-items-center mt-1">
          <Form.Label className="col-5 purchase-input-label">
            Bill Amnt
          </Form.Label>
          <Form.Control
            disabled
            placeholder="Enter"
            name="discount"
            value={purchaseAdd.total_value || ""}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            className="purchase-input-text"
            type="numeric"
          />
        </Form.Group>
        <Form.Group className="col-12 mx-0 d-flex align-items-center mt-1">
          <Form.Label className="col-5 purchase-input-label">
            Discount
          </Form.Label>
          <Form.Control
            placeholder="Enter"
            name="discount"
            value={purchaseAdd.discount || ""}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            className="purchase-input-text"
            type="numeric"
          />
        </Form.Group>
        <Form.Group className="col-12 mx-0 d-flex align-items-center mt-1">
          <Form.Label className="col-5 purchase-input-label">
            Round Off
          </Form.Label>
          <Form.Control
            disabled
            name="roundoff"
            value={purchaseAdd.roundoff || ""}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            className="purchase-input-text"
            type="numeric"
          />
        </Form.Group>
        <Form.Group className="col-12 mx-0 d-flex align-items-center mt-1">
          <Form.Label className="col-5 purchase-input-label">
            Net Amount
          </Form.Label>
          <Form.Control
            disabled
            value={purchaseAdd.total_amount || ""}
            className="purchase-input-text text-danger fs-5 text-center"
            type="numeric"
          />
        </Form.Group>
      </div>
      <div className="col-3 row me-0" style={{ height: "fit-content" }}>
        <Form.Group className="col-12 mx-0 d-flex align-items-center mt-1 px-0">
          <Form.Label className="col-5 purchase-input-label">
            Paid Cash
          </Form.Label>
          <Form.Control
            placeholder="Enter"
            name="paid_cash"
            value={purchaseAdd.paid_cash || ""}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            // max={purchaseAdd?.total_amount}
            className="purchase-input-text"
            type="numeric"
          />
        </Form.Group>
        <Form.Group className="col-12 mx-0 d-flex align-items-center mt-1 px-0">
          <Form.Label className="col-5 purchase-input-label">
            Balance
          </Form.Label>
          <Form.Control
            disabled={true}
            name="change_due"
            value={purchaseAdd.change_due || ""}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            className="purchase-input-text"
            type="numeric"
          />
        </Form.Group>
        <span style={{ height: "1rem" }} />
        <div className="col-12 purchase-total-container px-0 mx-0">
          <div className="col-12 row px-0 mx-0 mt-3">
            <div className="mx-0 px-1 col-6">
              <button
                type="reset"
                onClick={handlePurchaseAllReset}
                className="btn btn-sm btn-outline-dark w-100"
              >
                Clear
              </button>
            </div>
            <div className="mx-0 px-1 pe-0 col-6">
              <button type="submit" className="btn btn-sm btn-dark w-100">
                {edit ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="col-2 purchase-total-container pe-0 me-0">
        <div className="col-12 row px-0 mx-0 mt-3">
          <div className="mx-0 px-0 col-4" />
          <div className="mx-0 px-1 col-4">
            <button
              type="reset"
              onClick={handlePurchaseAllReset}
              className="btn btn-sm btn-outline-dark w-100"
            >
              Clear
            </button>
          </div>
          <div className="mx-0 px-1 pe-0 col-4">
            <button type="submit" className="btn btn-sm btn-dark w-100">
              {edit ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default PurchaseDetailFooter;

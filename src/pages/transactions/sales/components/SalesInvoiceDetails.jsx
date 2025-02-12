import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import useOnKey from "../../../../hooks/onKeyFunct/onKeyFunct";
import { Dropdown } from "semantic-ui-react";

const SalesInvoiceDetails = (props) => {
  const {
    handlePurchOrderSelect,
    orderPage,
    returnPage,
    tableItemRef,
    salesAdd,
    billType,
    setSalesAdd,
    orderDocList,
    codeWithBillTypeList,
    handleChange,
    edit,
    setSalesEditModal,
  } = props;

  const [ref, setRef] = useState(null);

  const [handleKeyDown, formRef] = useOnKey(ref, setRef, tableItemRef);

  useEffect(() => {
    if (codeWithBillTypeList?.length > 0 && !returnPage && !orderPage)
      handleBillTypeSelection();
  }, [salesAdd?.fk_bill_type, codeWithBillTypeList]);

  const handleBillTypeSelection = () => {
    let tempCode;
    if (
      edit &&
      (edit?.fk_bill_type == salesAdd?.fk_bill_type ||
        (edit?.fk_bill_type && !salesAdd?.fk_bill_type))
    ) {
      setSalesAdd((data) => ({ ...data, documents_no: edit?.documents_no }));
    } else if (salesAdd?.fk_bill_type) {
      tempCode = codeWithBillTypeList?.filter(
        (x) => x.fk_bill_type == salesAdd?.fk_bill_type
      )[0];
      setSalesAdd((data) => ({
        ...data,
        documents_no: tempCode?.sub_id + tempCode?.next_value,
      }));
    } else {
      tempCode = codeWithBillTypeList[codeWithBillTypeList.length - 1];
      setSalesAdd((data) => ({
        ...data,
        documents_no: tempCode?.sub_id + tempCode?.next_value,
        fk_bill_type: tempCode.fk_bill_type,
      }));
    }
  };

  return (
    <div ref={formRef} className="12 mx-0 ps-4 pe-0 row pt-2">
      <Form.Group className="col-5 mx-0 d-flex align-items-center">
        <Form.Label className="col-3 purchase-input-label">
          Invoice No
        </Form.Label>
        <Form.Control
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          name="documents_no"
          className="purchase-input-text"
          type="text"
          value={
            salesAdd?.documents_no || ""
            // billTypeDocNo:''
          }
        />
      </Form.Group>
      <Form.Group className="col-5 mx-0 d-flex align-items-center">
        <Form.Label className="col-3 purchase-input-label">
          Bill Type
        </Form.Label>
        <div className="mx-0 col-9 px-0">
          <select
            className="customer-select w-100"
            onKeyDown={handleKeyDown}
            value={salesAdd?.fk_bill_type || ""}
            onChange={handleChange}
            name="fk_bill_type"
          >
            {billType?.length > 0 &&
              billType.map((item, i) => (
                <option key={i} value={item.value}>
                  {item.text}
                </option>
              ))}
          </select>
        </div>
      </Form.Group>
      <span className="col-2" />
      {/* Row 2 -------------------------------------------------------------------------------------------------------- */}
      <Form.Group className="col-5 mx-0 d-flex align-items-center mt-1">
        <Form.Label className="col-3 purchase-input-label">
          {!returnPage && !orderPage ? "Order No" : "Date"}
        </Form.Label>
        {returnPage || orderPage ? (
          <Form.Control
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            name="date"
            value={salesAdd?.date?.slice(0, 10) || ""}
            className="purchase-input-text"
            type={"date"}
          />
        ) : (
          <div className="d-flex align-items-center w-100 gap-2">
            <Dropdown
              clearable
              selection
              search={true}
              onKeyDown={handleKeyDown}
              onChange={handlePurchOrderSelect}
              className="purchase-select d-flex align-items-center py-0 form-control"
              name="order_no"
              value={salesAdd?.order_no || ""}
              placeholder="Select"
              options={orderDocList}
            />
            <div
              onClick={() => setSalesEditModal("order")}
              className="btn btn-sm btn-dark p-0 px-2 h-100"
            >
              O
            </div>
          </div>
        )}
      </Form.Group>
      <Form.Group className="col-5 mx-0 d-flex align-items-center mt-1">
        <Form.Label className="col-3 purchase-input-label">
          Rate Type
        </Form.Label>
        <div className="mx-0 col-9 px-0">
          <select
            className="customer-select w-100"
            name="rate_types"
            value={salesAdd?.rate_types || ""}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          >
            <option value="RETAIL_RATE">RETAIL RATE</option>
            <option value="MRP">MRP</option>
            <option value="WS_RATE">WS RATE</option>
            <option value="SUPER_WHOLESALE_RATE">SUPERWHOLESALE RATE</option>
            <option value="QUOTATION_RATE">QUOTATION RATE</option>
            <option value="RENT_RATE">RENT RATE</option>
          </select>
        </div>
      </Form.Group>
      <div className="mx-0 col-2 px-0 d-flex align-items-center mt-1">
        <input
          type="checkbox"
          name="interstate"
          id="interstate"
          checked={salesAdd?.interstate || false}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <label htmlFor="interstate" className="ps-2">
          Interstate
        </label>
      </div>
      {/* Row 3 -------------------------------------------------------------------------------------------------------- */}
      <Form.Group className="col-5 mx-0 d-flex align-items-center mt-1">
        {!returnPage && !orderPage && (
          <>
            <Form.Label className="col-3 purchase-input-label">Date</Form.Label>
            <Form.Control
              onChange={handleChange}
              onKeyDown={(e) => {
                e.preventDefault();
                handleKeyDown(e);
              }}
              className="purchase-input-text"
              name="date"
              type="date"
              value={salesAdd?.date?.slice(0, 10)}
            />
          </>
        )}
      </Form.Group>
      <Form.Group className="col-5 mx-0 d-flex align-items-center mt-1">
        <Form.Label className="col-3 purchase-input-label">Salesman</Form.Label>
        <div className="mx-0 col-9 px-0">
          <select
            onKeyDown={handleKeyDown}
            value={salesAdd?.salesman || ""}
            name="payment_type"
            className="customer-select w-100"
          >
            <option value="BOB">BOB</option>
            <option value="TOM">TOM</option>
          </select>
        </div>
      </Form.Group>
      <div className="mx-0 col-2 px-0 d-flex align-items-center mt-1">
        <input
          type="checkbox"
          checked={salesAdd?.reverse_charge || false}
          name="reverse_charge"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          id="reverse_charge"
        />
        <label htmlFor="reverse_charge" className="ps-2">
          Reverse Charge
        </label>
      </div>
      {/* <span className="col-12 mt-3" /> */}
    </div>
  );
};

export default SalesInvoiceDetails;

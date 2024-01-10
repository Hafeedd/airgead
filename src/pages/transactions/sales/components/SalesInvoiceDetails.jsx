import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import useItemServices from "../../../../services/master/itemServices";
import useSalesServices from "../../../../services/transactions/salesServices";
import useOnKey from "../../../../hooks/onKeyFunct/onKeyFunct";

const SalesInvoiceDetails = (props) => {
  const {
    salesAdd,
    setSalesAdd,
    billType,
    codeWithBillTypeList,
    handleChange,
    edit,
    getOfInvoiceData,
    setDocNoRecheck,
    currentEditBillType,
    setCurrentEditBillType,
    setBillType,
    billTypeDocNo,
    setBillTypeDocNo,
    getCodeWithBillType,
    setCodeWithBillTypeList,
  } = props;

  const [ref, setRef] = useState(null);

  const { formRef, handleKeyDown } = useOnKey(ref, setRef);

  useEffect(() => {
    if (codeWithBillTypeList?.length > 0) handleBillTypeSelection();
  }, [salesAdd.fk_bill_type, codeWithBillTypeList]);

  const handleBillTypeSelection = () => {
    console.log('edit:::::',edit.fk_bill_type)
    console.log('salesAdd:::::',salesAdd.fk_bill_type)
    let tempCode;
    if (
      edit &&
      (edit?.fk_bill_type == salesAdd?.fk_bill_type ||
        (edit?.fk_bill_type && !salesAdd?.fk_bill_type))
    ) {
      setSalesAdd((data) => ({ ...data, documents_no: edit?.documents_no }));
    } else if (salesAdd.fk_bill_type && codeWithBillTypeList?.length > 0) {
      console.log("first")
      tempCode = codeWithBillTypeList?.filter(
        (x) => x.fk_bill_type == salesAdd.fk_bill_type
      )[0];
      setSalesAdd((data) => ({
        ...data,
        documents_no: tempCode?.sub_id + tempCode?.next_value,
      }));
    } else {
      tempCode = codeWithBillTypeList[codeWithBillTypeList.length-1];
      setSalesAdd((data) => ({
        ...data,
        documents_no: tempCode?.sub_id + tempCode?.next_value,
        fk_bill_type:tempCode.fk_bill_type
      }));
    }
  };

  return (
    <div ref={formRef} className="col-8 col-9 mx-0 ps-4 pe-0 row pt-2">
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
            value={salesAdd.fk_bill_type || ""}
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
        <Form.Label className="col-3 purchase-input-label">Order No</Form.Label>
        <Form.Control
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          name="order_no"
          className="purchase-input-text"
          type="text"
        />
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
            <option value="RET_RATE">RET RATE</option>
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
        <Form.Label className="col-3 purchase-input-label">Date</Form.Label>
        <Form.Control
          onChange={handleChange}
          className="purchase-input-text"
          value={
            edit
              ? salesAdd.created_at?.slice(0, 10)
              : new Date().toISOString().slice(0, 10)
          }
        />
      </Form.Group>
      <Form.Group className="col-5 mx-0 d-flex align-items-center mt-1">
        <Form.Label className="col-3 purchase-input-label">Salesman</Form.Label>
        <div className="mx-0 col-9 px-0">
          <select
            value={salesAdd.salesman || ""}
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
      <span className="col-12 mt-3" />
    </div>
  );
};

export default SalesInvoiceDetails;

import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Dropdown } from "semantic-ui-react";
import useAccountServices from "../../../../services/master/accountServices";
import useOnKey from "../../../../hooks/onKeyFunct/onKeyFunct";

const SalesDetailFooter = (props) => {
  const {
    bankSelect,
    salesAdd,
    handleChange,
    handleGetSalesReturnCode,
    edit,
    handleSalesAllReset,
  } = props;

  const [bankList, setBankList] = useState([]);

  const [ref, setRef] = useState(null);
  const [ handleKeyDown, formRef ] = useOnKey(ref, setRef);

  useEffect(() => {
    getListOfBank();
  }, []);

  const { getAccountList } = useAccountServices();

  const getListOfBank = async () => {
    try {
      let response3 = await getAccountList();
      if (response3.success) {
        let bankAcc = [];
        response3.data.forEach((item) => {
          if (item.bank_account) {
            bankAcc.push({
              key: item.code,
              value: item.id,
              text: item.name,
              description: item.code,
            });
          }
        });
        setBankList([...bankAcc]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleReset = () =>{
    handleSalesAllReset()
    handleGetSalesReturnCode()
  }

  return (
    <div className="row mx-0 my-1 me-1 justify-content-between" ref={formRef}>
      <div className="col-3 ms-2 purchase-supplier-container row mx-0 mt-1 p-2">
        <div className="col-12 sales-value-container px-0 row mx-0 my-0 align-items-center d-flex pb-3">
          <div className="col-12 my-1 container-title">E Paymen</div>
          <Form.Group className="col-2 mx-0 px-0 col-10 mx-0 d-flex align-items-center mt-1 ms-2 position-relative">
            <Form.Label className="col-4 col-5 purchase-input-label">
              Bank
            </Form.Label>
            <div className="mx-0 col-9 px-0">
              <Dropdown
                onKeyDown={handleKeyDown}
                id="bank"
                name="fk_bank"
                value={salesAdd.fk_bank || ""}
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
            {!bankSelect && (
              <div
                className="position-absolute bg-secondary text-light rounded-2 p-1"
                style={{ right: "-30px", bottom: "-29px" }}
              >
                This field is required
              </div>
            )}
          </Form.Group> 
          <Form.Group className="col-2 mx-0 px-0 col-10 mx-0 d-flex align-items-center mt-1 ms-2">
            <Form.Label className="col-4 col-5 purchase-input-label">
              Amount
            </Form.Label>
            <div className="mx-0 col-9 px-0">
              <Form.Control
                placeholder="Enter"
                name="bank_amount"
                required={salesAdd.fk_bank}
                value={salesAdd.bank_amount || ""}
                onKeyDown={handleKeyDown}
                onChange={handleChange}
                className="purchase-input-text"
                type="number"
              />
            </div>
          </Form.Group>
        </div>
      </div>
      <div className="col-3 ms-2 purchase-supplier-container row mx-0 mt-1 p-2">
        <div className={`"col-12 p-0 pe-1`}>
          <div className="col-12 sales-value-container px-0 row mx-0 my-0 align-items-center d-flex py-3">
            <Form.Group className="col-12 mx-0 d-flex align-items-center">
              <Form.Label className="col-4 purchase-input-label">
                Sales Value
              </Form.Label>
              <Form.Control
                disabled
                value={salesAdd?.total_value || ""}
                className="sales-input-text"
                type="text"
              />
            </Form.Group>
            <Form.Group className="col-12 mx-0 d-flex align-items-center mt-1">
              <Form.Label className="col-4 purchase-input-label">
                CGST
              </Form.Label>
              <Form.Control
                disabled
                value={salesAdd?.total_sgst || ""}
                className="sales-input-text"
                type="text"
              />
            </Form.Group>
            <Form.Group className="col-12 mx-0 d-flex align-items-center mt-1">
              <Form.Label className="col-4 purchase-input-label">
                SGST
              </Form.Label>
              <Form.Control
                disabled
                value={salesAdd?.total_sgst || ""}
                className="sales-input-text"
                type="text"
              />
            </Form.Group>
          </div>
        </div>
        {/* {salseReturn&&<div className="col-6 p-0 ps-1">
                <div className="col-12 sales-value-container px-0 row mx-0 my-0">
                    <Form.Group className='col-12 mx-0 d-flex align-items-center mt-1'>
                        <Form.Label className='col-4 purchase-input-label'>Return Value</Form.Label>
                        <Form.Control
                            disabled
                            value={salesAdd.return_value||''}
                            className='sales-input-text'
                            type='text'
                        />
                    </Form.Group>
                    <Form.Group className='col-12 mx-0 d-flex align-items-center mt-1'>
                        <Form.Label className='col-4 purchase-input-label'>CGST</Form.Label>
                        <Form.Control
                            disabled
                            value={salesAdd.return_cgst_sgst||''}
                            className='sales-input-text'
                            type='text'
                        />
                    </Form.Group>
                    <Form.Group className='col-12 mx-0 d-flex align-items-center mt-1'>
                        <Form.Label className='col-4 purchase-input-label'>SGST</Form.Label>
                        <Form.Control
                            disabled
                            value={salesAdd.return_cgst_sgst||''}
                            className='sales-input-text'
                            type='text'
                        />
                    </Form.Group>
                    <span className="col-12 mt-3" />
                </div>
            </div>} */}
      </div>
      <div className="col-3 row me-0 ps-5">
        <Form.Group className="col-12 mx-0 d-flex align-items-center mt-1">
          <Form.Label className="col-5 purchase-input-label">
            Discount
          </Form.Label>
          <Form.Control
            onKeyDown={handleKeyDown}
            name="discount"
            value={salesAdd.discount || ""}
            onChange={handleChange}
            className="purchase-input-text"
            type="number"
          />
        </Form.Group>
        <Form.Group className="col-12 mx-0 d-flex align-items-center mt-1">
          <Form.Label className="col-5 purchase-input-label">
            Round Off
          </Form.Label>
          <Form.Control
            disabled
            onKeyDown={handleKeyDown}
            name="roundoff"
            value={salesAdd.roundoff || ""}
            onChange={handleChange}
            className="purchase-input-text"
            type="text"
          />
        </Form.Group>
        <Form.Group className="col-12 mx-0 d-flex align-items-center mt-1">
          <Form.Label className="col-5 purchase-input-label">
            Cash Recieved
          </Form.Label>
          <Form.Control
            onKeyDown={handleKeyDown}
            name="paid_cash"
            value={salesAdd.paid_cash || ""}
            onChange={handleChange}
            className="purchase-input-text"
            type="number"
          />
        </Form.Group>
        <Form.Group className="col-12 mx-0 d-flex align-items-center mt-1">
          <Form.Label className="col-5 purchase-input-label">
            Balance
          </Form.Label>
          <Form.Control
            disabled
            onKeyDown={handleKeyDown}
            name="change_due"
            value={salesAdd.change_due || ""}
            onChange={handleChange}
            className="purchase-input-text"
            type="text"
          />
        </Form.Group>
      </div>
      <div className="col-2 col-3 purchase-total-container ps-3 pe-1 me-0">
        <div className="col-12 purchase-supplier-container row mx-0 mt-1 py-3">
          <div className="col-12 row mx-0 align-items-center py-3">
            <div className="col-1 px-0">Net</div>
            <div className="col-1 ">:</div>
            <div className="col-10 col-9 fs-3 px-0 text-danger">
              {salesAdd.total_amount || ""}
            </div>
          </div>
        </div>
        <div className="col-12 row px-0 mx-0 mt-3">
          <div className="mx-0 px-1 col-6">
            <div
              type="reset"
              onClick={handleReset}
              className="btn btn-sm btn-outline-dark w-100"
            >
              Clear
            </div>
          </div>
          <div className="mx-0 px-1 pe-0 col-6">
            <button
              disabled={!bankSelect}
              type="submit"
              className="btn btn-sm btn-dark w-100"
            >
              {edit ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesDetailFooter;

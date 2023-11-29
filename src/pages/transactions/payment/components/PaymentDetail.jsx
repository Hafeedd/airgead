import React, { useEffect, useRef, useState } from "react";
import PaymentChequeDetails from "./PaymentChequeDetails";
import PaymentSalesmanDetails from "./PaymentSalesmanDetails";
import PaymentDiscountDetails from "./PaymentDiscountDetails";
import PaymentTaxDetails from "./PaymentTaxDetails";
import PaymentPrintDetails from "./PaymentPrintDetails";
import { Dropdown } from "semantic-ui-react";
import { useLocation } from "react-router";

const PaymentDetail = ({
  edit,
  setPaymentAdd,
  paymentAdd,
  handleChange,
  handleNumber,
  handleReset,
  handleSubmit,
  accountList,
  accountPayList,
  handleChangePaymentCash,
}) => {
  const [paymentNav, setPaymentNav] = useState(paymentAdd.cash_bank_account_name == "CASH IN BANK"?1:2);
  const location = useLocation().pathname
  const [paymentContent, setPaymentContent] = useState("");
  const formRef = useRef(null);

  // const cash_type_list = [
  //     {text:"Cash Inhand",value:"INHAND"},
  //     {text:"UPI",value:"UPI"},
  //     {text:"Cheque",value:"CHEQUE"},
  //     {text:"Bank Transfer",value:"TRANSFER"},
  // ]

  useEffect(()=>{
    if(paymentAdd?.cash_bank_account_name !== "CASH IN BANK"){
      setPaymentNav(2)
    }
  },[paymentAdd.cash_bank_account_name])

  useEffect(() => {
    switch (paymentNav) {
      case 1:
        setPaymentContent(
          <PaymentChequeDetails {...{ handleChange, paymentAdd }} />
        );
        break;
      case 2:
        setPaymentContent(
          <PaymentSalesmanDetails {...{ handleChange, paymentAdd }} />
        );
        break;
      case 3:
        setPaymentContent(
          <PaymentDiscountDetails {...{ handleChange, paymentAdd }} />
        );
        break;
      case 4:
        setPaymentContent(
          <PaymentTaxDetails {...{ handleChange, paymentAdd, setPaymentAdd }} />
        );
        break;
      case 5:
        setPaymentContent(
          <PaymentPrintDetails {...{ handleChange, paymentAdd }} />
        );
        break;
      default:
        break;
    }
  }, [paymentNav, paymentAdd]);

  const search = (options, searchValue) => {
    searchValue = searchValue.toUpperCase();
    return options.filter((option) => {
      console.log(option)
      return (
        option?.value?.includes(searchValue) ||
        option?.text?.includes(searchValue)
      );
    });
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="item_add_form pt-1 row mt-1"
    >
      {/* left column --------------------------------------------------------------------------------------- */}

      <div className="item_add_form_part1 col-6 row mx-0 px-0">
        <div className="d-flex align-items-center px-0 row mx-0 my-2">
          <div className="col-5 col-6 row mx-0 px-0 pe-4">
            <div className="mx-0 px-0 col-5">Type</div>
            <div className="mx-0 px-0 col-7">
              <select
                onChange={handleChange}
                value={location.match('/pay')?'Payment':'Receipt'}
                name="method"
                className="account-select-dropdown ms-0 pe-0"
              >
                <option value="Payment">Payment</option>
                <option value="Receipt">Receipt</option>
              </select>
            </div>
          </div>
          <div className="col-6 col-7 row ps-4 mx-0 px-0">
            <div className="mx-0 px-0 col-5">Voucher No</div>
            <div className="mx-0 px-0 col-7">
              <input
                required
                onChange={handleChange}
                name="voucher_number"
                value={
                  paymentAdd.voucher_number ? paymentAdd.voucher_number : ""
                }
                type="text"
                className="item_input names"
              />
            </div>
          </div>
        </div>

        <div className="d-flex align-items-center px-0 row mx-0 my-2">
          <div className="mx-0 px-0 col-3">A/C Details</div>
          <div className="mx-0 px-0 col-9 payment-select">
            <Dropdown
              disabled={edit}
              clearable
              selection
              search={search}
              onChange={(e, data) => handleChange(e, data)}
              className="payment-select item d-flex align-items-center py-0 form-control"
              name="supplier_detail"
              placeholder="select Account Details"
              value={paymentAdd.account_code || ""}
              options={accountList}
            />
          </div>
        </div>
        <div className="d-flex align-items-center px-0 row mx-0 my-2">
          <div className="mx-0 px-0 col-3">A/C Code</div>
          <div className="mx-0 px-0 col-6">
            <input
              disabled
              required
              onChange={handleChange}
              name="account_code"
              value={paymentAdd.account_code ? paymentAdd.account_code : ""}
              type="text"
              className="item_input names"
            />
          </div>
          <span className="col-3" />
        </div>
        <div className="d-flex align-items-center px-0 row mx-0 my-2">
          <div className="mx-0 px-0 col-3">Narration</div>
          <div className="mx-0 px-0 col-9">
            <input
              onChange={handleChange}
              required={true}
              name="narration"
              value={paymentAdd.narration ? paymentAdd.narration : ""}
              type="text"
              className="item_input names"
            />
          </div>
        </div>
        <div className="d-flex align-items-center px-0 row mx-0 my-2">
          <div className="mx-0 px-0 col-3">Cash/Bank A/c</div>
          <div className="mx-0 px-0 col-9">
            <Dropdown
              disabled={edit}
              selection
              search={search}
              onChange={(e, data) => handleChangePaymentCash(e, data)}
              className="payment-select item d-flex align-items-center py-0 form-control"
              name="cash_bank_account_name"
              placeholder="select"
              value={paymentAdd.cash_bank_account || ""}
              options={accountPayList}
            />
          </div>
        </div>
      </div>

      {/* right column ----------------------------------------------------------------------------------------------------------- */}

      <div className="item_add_form_part2 row mx-0 ps-4 pe-0 me-0 col-6 border-0">
        <div className="d-flex align-items-center px-0 ps-1 row mx-0 my-2">
          <div className="col-6 row mx-0 px-0 pe-4">
            <div className="mx-0 px-3 col-5 text-end">Date</div>
            <div className="mx-0 px-0 col-7">
              <input
                onChange={handleChange}
                name="date"
                value={paymentAdd.date ? paymentAdd.date.slice(0, 10) : !edit && (new Date().toISOString().slice(0,10))}
                type="date"
                className="item_input names"
              />
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center px-0 ps-2 row mx-0 mt-3">
          <div className="col-12 row mx-0 px-0">
            <div className="mx-0 px-0 ps-0 col-2 col-3">
              {paymentAdd.cash_bank_account_name == "CASH IN BANK" && <div
                className={`btn btn-sm btn-secondary payment-nav-btn ${
                  paymentNav === 1 && paymentAdd.cash_bank_account_name == "CASH IN BANK" && "active"
                }`}
                onClick={() => setPaymentNav(1)}
              >
                Cheque Details
              </div>}
            </div>
            <div className="mx-0 px-0 ps-1 col-2 col-3">
              <div
                className={`btn btn-sm btn-secondary payment-nav-btn ${
                  paymentNav === 2 && "active"
                }`}
                onClick={() => setPaymentNav(2)}
              >
                Salesman
              </div>
            </div>
            <div className="mx-0 px-0 ps-1 col-2 col-3">
              <div
                className={`btn btn-sm btn-secondary payment-nav-btn ${
                  paymentNav === 3 && "active"
                }`}
                onClick={() => setPaymentNav(3)}
              >
                Discount
              </div>
            </div>
            <div className="mx-0 px-0 ps-1 col-2">
              <div
                className={`btn btn-sm btn-secondary payment-nav-btn ${
                  paymentNav === 4 && "active"
                }`}
                onClick={() => setPaymentNav(4)}
              >
                Tax
              </div>
            </div>
            <div className="mx-0 px-0 ps-1 col-2 col-3">
              <div
                className={`btn btn-sm btn-secondary payment-nav-btn ${
                  paymentNav === 5 && "active"
                }`}
                onClick={() => setPaymentNav(5)}
              >
                Printing
              </div>
            </div>
          </div>
          {/* {paymentContent} */}
          {/* ----------------------------------- */}
          {(paymentNav == 1 && paymentAdd?.cash_bank_account_name == "CASH IN BANK")?
            <PaymentChequeDetails {...{ handleChange, paymentAdd }} />
          :paymentNav == 2 ?
            <PaymentSalesmanDetails {...{ handleChange, paymentAdd }} />
          :paymentNav == 3 ?
            <PaymentDiscountDetails {...{ handleChange, paymentAdd }} />
          :paymentNav == 4 ?
            <PaymentTaxDetails {...{ handleChange, paymentAdd, setPaymentAdd }} />
          :paymentNav == 5 && <PaymentPrintDetails {...{ handleChange, paymentAdd }} />
          }
          {/* ----------------------------------- */}
        </div>
      </div>
      <div className="col-12 row my-1 px-0 mx-1">
        <div className="col-4 col-5 row mx-0 px-0">
          <div className="col-12 row mx-0 px-0 align-items-center">
            <div className="mx-0 px-0 col-2">Amount</div>
            <div className="mx-0 px-0 col-7">
              <input
                onKeyDown={handleNumber}
                onChange={(e) => handleChange(e)}
                name="amount"
                placeholder="Enter Amount"
                value={paymentAdd.amount ? paymentAdd.amount : ""}
                type="number"
                min={0}
                max={999999999999999}
                className="form-control border border-secondary mb-2"
              />
            </div>
          </div>
          <div className="col-12 row mx-0 px-0 align-items-center mt-1">
            <div className="mx-0 px-0 col-9">
              <input
                disabled
                defaultValue={
                  paymentAdd.amount_word ? paymentAdd.amount_word : ""
                }
                type="text"
                className="form-control words"
              />
            </div>
            <div className="mx-0 px-0 ps-3 col-3">Rupees Only</div>
          </div>
        </div>
        <span className="col-3" />
        <div className="col-4 col-5 row mx-0 px-0">
          <div className="col-12 row mx-0 p-3 payment-balance-container">
            <div className="mx-0 px-0 col-12 row align-items-center">
              <div className="col-1">OB</div>
              <div className="col-1">:</div>
              <div className="col-10">{paymentAdd?.op_balance}</div>
            </div>
            <div className="mx-0 px-0 col-12 row align-items-center">
              <div className="col-1">CB</div>
              <div className="col-1">:</div>
              <div className="col-10">{paymentAdd?.cl_balance}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 row mt-2 px-0 mx-1">
        <div className="mx-0 px-0 col-9" />
        <div className="mx-0 px-1 col-1 col-2">
          <button
            onClick={handleReset}
            type="reset"
            className="btn btn-sm btn-outline-dark w-100"
          >
            Clear
          </button>
        </div>
        <div className="mx-0 ps-1 pe-0 col-1 col-2">
          <button type="submit" className="btn btn-sm btn-dark w-100">
            {edit ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PaymentDetail;

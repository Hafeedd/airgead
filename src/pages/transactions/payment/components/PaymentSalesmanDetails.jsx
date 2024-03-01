import React from "react";

const PaymentSalesmanDetails = ({ handleChange, paymentAdd }) => {
  return (
    <div className="col-12 row mx-0 p-5 pt-3 payment-detail-container">
      <div className="col-12 row mx-0 mb-1 px-0">
        <div className="mx-0 px-0 col-3">Sales Staff</div>
        <div className="mx-0 px-0 col-9">
          <input
            onChange={handleChange}
            name="salesman"
            value={paymentAdd.salesman ? paymentAdd.salesman : ""}
            type="text"
            className="item_input names"
          />
        </div>
      </div>
      <div className="col-12 row mx-0 my-1 px-0">
        <div className="mx-0 px-0 col-3">Commision</div>
        <div className="mx-0 px-0 col-5 col-6">
          <input
            style={{ border: "transparent" }}
            onChange={handleChange}
            name="commision"
            value={paymentAdd.commision ? paymentAdd.commision : ""}
            type="number"
            className="item_input names bg-dark text-light"
          />
        </div>
        <span className="col-3 col-4" />
      </div>
    </div>
  );
};

export default PaymentSalesmanDetails;

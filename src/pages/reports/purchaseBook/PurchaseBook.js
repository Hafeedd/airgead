import React, { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import PurchaseBookEntry from "./components/PurchaseBookEntry";
import PurchaseBookTable from "./components/PurchaseBookTable";
import PurchaseRegisterTable from "./components/PurchaseRegisterTable";

const PurchaseBook = () => {
  const [show, setShow] = useState(false);
  const [colshow, setColShow] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="item_add">
      <div className="itemList_header row mx-0">
        <div className="page_head ps-4 d-flex justify-content-between">
          <div>
            <div className="fs-5 fw-600">
              {location.pathname == "/purchase-register" && "active"
                ? "Purchase Register"
                : "Purchase Book"}
            </div>
            <div className="page_head_items mb-2 mt-2">
              <div
                onClick={() => {
                  navigate("/purchase-book");
                }}
                className={`page_head_item ${
                  location.pathname == "/purchase-book" && "active"
                }`}
              >
                Purchase Book
              </div>
              <div
                onClick={() => {
                  navigate("/purchase-register");
                }}
                className={`page_head_item ${
                  location.pathname == "/purchase-register" && "active"
                }`}
              >
                Purchase Register
              </div>
            </div>
          </div>

          <div className="d-flex align-items-center h-100 me-2">
            <div
              className="p-2 me-2 choose-acc-btn rounded-2 text-light cursor"
              onClick={() => setShow(true)}
            >
              Filter Account
            </div>
            <div
              className="p-2 choose-acc-btn rounded-2 text-light cursor "
              onClick={() => setColShow(true)}
            >
              Column Settings
            </div>
          </div>
        </div>
      </div>
      <div className="p-3 mt-3">
        <div className="p-2 bg-light rounded-1">
          {location.pathname == "/purchase-register" && "active" ? (
            <>
              <PurchaseBookEntry />
              <PurchaseRegisterTable />
            </>
          ) : (
            <>
              <PurchaseBookEntry />
              <PurchaseBookTable />
            </>
          )}
          <div className="row mt-2">
            <div className="w-100 d-flex justify-content-end mb-2 ">
              <div className="btn btn-dark col-1 col-2 py-0 me-2">Exit</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseBook;

import React, { useState } from "react";
import { BarcodeRegDet } from "./components/BarcodeRegDet";
import { BarcodeRegTable } from "./components/BarcodeRegTable";

export const BarcodeRegister = () => {
  const [params, setParams] = useState({
    from_date: new Date().toISOString().slice(0, 10),
    to_date: new Date().toISOString().slice(0, 10),
  });

  return (
    <div className="item_add">
      <div className="itemList_header row mx-0">
        <div className="page_head ps-4 d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <div>
              <div className="fw-600 fs-5">Barcode Register Report</div>
              <div className="page_head_items mb-2 mt-2">
                <div className={`page_head_customer active`}>Report List</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-3">
        <div className=" col-12 p-2 px-3 rounded-1 w-100 bg-light pb-1">
          <div className="w-100 mb-3">
            <BarcodeRegDet {...{ params, setParams }} />
            <BarcodeRegTable {...{ params }} />
            {/*
             */}
          </div>
        </div>
      </div>
    </div>
  );
};

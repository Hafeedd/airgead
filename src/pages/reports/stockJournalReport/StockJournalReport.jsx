import React, { useState } from "react";
import "./stockJournalReport.css";
import { useLocation } from "react-router";
import { StockJournalReportDetails } from "./components/StockJournalReportDetails";
import { StockJournalReportTable } from "./components/StockJournalReportTable";

export const StockJournalReport = () => {
  const [params, setParams] = useState({
    from_date:new Date().toISOString().slice(0, 10),
    to_date:new Date().toISOString().slice(0, 10),
  })

  const location = useLocation();
  return (
    <div className="item_add">
      <div className="itemList_header row mx-0">
        <div className="page_head ps-4 d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <div>
              <div className="fw-600 fs-5">Stock Journal Report</div>
              <div className="page_head_items mb-2 mt-2">
                <div className={`page_head_customer active`}>Details</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-3">
        <div className=" col-12 p-2 px-3 rounded-1 w-100 bg-light pb-1">
          <div className="w-100 mb-3">
            <StockJournalReportDetails {...{params, setParams}}/>
            <StockJournalReportTable {...{ params }} />
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import "./accJournal.css";
import { AccJournalDetails } from "./components/AccJournalDetails";

export const AccJournal = () => {
  return (
    <div className="item_add">
      <div className="itemList_header row mx-0 mb-3">
        <div className="page_head ps-4 d-flex justify-content-between">
          <div>
            <div className="fw-600 fs-5">Account Journal</div>
            <div className="page_head_items mb-1">
              <div className={`page_head_item active`}>Journal</div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4">
        <AccJournalDetails />
      </div>
    </div>
  );
};

import React, { useState } from "react";
import './accJournal.css'
import { AccJournalDetails } from "./components/AccJournalDetails";

export const AccJournal = () => {

  return (
    <div className="item_add">
      <div className="itemList_header row mx-0">
        <div className="page_head my-1 ps-4 d-flex justify-content-between">
          <div>
            <div className="fw-600 fs-5">Account Journal</div>
            <div className="page_head_items mb-3">
              <div
                className={`page_head_item active`}
              >
                Journal
              </div>
            </div>
          </div>
        </div>
        <div className="p-2 px-3">
            <AccJournalDetails/>
        </div>
      </div>
    </div>
  );
};

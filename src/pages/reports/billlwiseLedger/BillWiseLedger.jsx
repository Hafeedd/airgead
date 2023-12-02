import React from 'react'
import BillWiseLedgerEntry from './components/BillWiseLedgerEntry';
import BillWiseLedgerTable from './components/BillWiseLedgerTable';

const BillWiseLedger = () => {
  return (
    <div className="item_add">
      <div className="itemList_header row mx-0">
        <div className="page_head ps-4 d-flex justify-content-between">
          <div>
            <div className="fw-600 fs-5">Bill Wise Ledger</div>
            <div className="page_head_items mb-2 mt-2">
              <div className={`page_head_customer active`}>
                Bill Wise Ledger
              </div>
            </div>
          </div>
          <div className="d-flex px-0 align-items-center customer-add-btn">
          </div>
        </div>
      </div>
      <div className="p-3">
        <div className="p-2 bg-light rounded-1 px-3">
            <BillWiseLedgerEntry />
            <BillWiseLedgerTable/>
        </div>
      </div>
    </div>
  );
}

export default BillWiseLedger
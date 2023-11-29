import React from 'react'
import PayrollTransactionDetails from './components/PayrollTransactionDetails'

const PayrollTransaction = () => {
  return (
        <div className="item_add">
            <div className="itemList_header row mx-0">
                <div className="page_head ps-4 d-flex justify-content-between">
                    <div className="d-flex align-items-center">
                        <div>
                            <div className="fw-600 fs-5">Pay Roll</div>
                            <div className="page_head_items mb-2 mt-2">
                                <div className={`page_head_customer active`}>
                                    Pay Roll
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-3 py-0">
                <div className="stock-jdetails-cont col-12 p-1 pt-0 ps-2 rounded-1 w-100 bg-light h-100 pe-2">
                <div className="row mt-3 mx-0">
                    <div className="w-100 mb-3 mt-2">
                        <PayrollTransactionDetails/>
                    </div>
                </div>
                </div>
            </div>
        </div>
  )
}

export default PayrollTransaction
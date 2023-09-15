import React, { useEffect, useState } from 'react'
import './PurchaseTransaction.css'
import { useNavigate } from 'react-router'
import { Form } from 'react-bootstrap'
import PurchaseInvoiceDetails from './components/PurchaseInvoiceDetails'
import PurchaseTable from './components/PurchaseTable'
import PurchaseDetailFooter from './components/PurchaseDetailFooter'
import PurchasePrintingDetails from './components/PurchasePrintingDetails'
import PurchaseDeliveryDetails from './components/PurchaseDeliveryDetails'

const PurchaseTransaction = () => {
    const [pageHeadItem, setPageHeadItem] = useState(1)
    const [purchaseHeader, setPurchaseHeader] = useState(1)
    const navigate = useNavigate()
    useEffect(()=>{
        switch(pageHeadItem){
            case 1: setPurchaseHeader(<PurchaseInvoiceDetails />)
                break
            case 2: setPurchaseHeader(<PurchasePrintingDetails />)
                break
            case 3: setPurchaseHeader(<PurchaseDeliveryDetails />)
                break
            case 4: setPurchaseHeader(<PurchaseInvoiceDetails />)
                break
            default: break;
        }
    },[pageHeadItem])
    return (
        <div className='item_add'>
            <div className="itemList_header row mx-0">
                <div className="page_head ps-4 d-flex pe-0">
                    <div className='col-6'>
                        <div className='fw-600 fs-5'>Purchase</div>
                        <div className='page_head_items mb-3'>
                            <div onClick={() => { navigate('/purchase-transaction') }} className={`page_head_item active`}>Purchase Details</div>
                        </div>
                    </div>
                    <div className='col-6 d-flex align-items-center justify-content-end'>
                        <div className="col-3 d-flex pe-0 align-items-center">
                            <div 
                                onClick={() => setPageHeadItem(2)} 
                                className="btn btn-secondary purchase-nav-btn px-3"
                            >Printing details</div>
                        </div>
                        <div className="col-3 d-flex pe-0 align-items-center">
                            <div 
                                // onClick={() => setPageHeadItem(4)} 
                                className="btn btn-secondary purchase-nav-btn px-3"
                            >E-Payment</div>
                        </div>
                        <div className="col-3 d-flex pe-0 align-items-center">
                            <div 
                                onClick={() => setPageHeadItem(3)} 
                                className="btn btn-secondary purchase-nav-btn px-3"
                            >Delivery details</div>
                        </div>
                        <div className="col-3 d-flex px-0 align-items-center">
                            <div 
                                onClick={() => setPageHeadItem(1)} 
                                className="btn btn-secondary purchase-nav-btn px-3"
                            >Invoice details</div>
                        </div>
                    </div>
                </div>
            </div>
            <form className='item_add_cont px-3 pb-1'>
                {purchaseHeader}
                <PurchaseTable />
                <PurchaseDetailFooter />
            </form>
        </div>
    )
}

export default PurchaseTransaction

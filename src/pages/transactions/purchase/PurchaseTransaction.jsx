import React, { useEffect, useState } from 'react'
import './PurchaseTransaction.css'
import { useNavigate } from 'react-router'
import { Form, Modal } from 'react-bootstrap'
import PurchaseInvoiceDetails from './components/PurchaseInvoiceDetails'
import PurchaseTable from './components/PurchaseTable'
import PurchaseDetailFooter from './components/PurchaseDetailFooter'
import PurchasePrintingDetails from './components/PurchasePrintingDetails'
import PurchaseDeliveryDetails from './components/PurchaseDeliveryDetails'
import PurchaseTableItemList from './components/PurchaseTableItemList'
import PurchaseEditList from './components/PurchaseEditList'

const PurchaseTransaction = () => {
    const [purchaseItemModal, setPurchaseItemModal] = useState(false)
    const [purchaseEditModal, setPurchaseEditModal] = useState(false)
    const [pageHeadItem, setPageHeadItem] = useState(1)
    const [purchaseHeader, setPurchaseHeader] = useState(1)
    const navigate = useNavigate()
    useEffect(() => {
        switch (pageHeadItem) {
            case 1: setPurchaseHeader(<PurchaseInvoiceDetails {...{handleEdit}} />)
                break
            case 2: setPurchaseHeader(<PurchasePrintingDetails {...{handleEdit}} />)
                break
            case 3: setPurchaseHeader(<PurchaseDeliveryDetails {...{handleEdit}} />)
                break
            case 4: setPurchaseHeader(<PurchaseInvoiceDetails {...{handleEdit}} />)
                break
            default: break;
        }
    }, [pageHeadItem])

    const handleEdit = ()=>{
        setPurchaseEditModal(true)
    }

    return (
        <div className='item_add'>
            <div className="itemList_header row mx-0">
                <div className="page_head ps-4 d-flex pe-0">
                    <div className='col-6 col-7'>
                        <div className='fw-600 fs-5'>Purchase</div>
                        <div className='page_head_items mb-3'>
                            <div onClick={() => { navigate('/purchase-transaction') }} className={`page_head_item active`}>Purchase Details</div>
                        </div>
                    </div>
                    <div className='col-5 col-6 pe-4 d-flex align-items-center justify-content-end'>
                        <div className="col-3 d-flex px-0 align-items-center justify-content-end">
                            <div
                                onClick={() => setPageHeadItem(2)}
                                className={`btn btn-secondary purchase-nav-btn px-2 ${pageHeadItem === 2 && 'select'}`}
                            >Printing details</div>
                        </div>
                        <div className="col-3 d-flex px-0 align-items-center justify-content-end">
                            <div
                                // onClick={() => setPageHeadItem(4)} 
                                className={`btn btn-secondary purchase-nav-btn px-3 ${pageHeadItem === 4 && 'select'}`}
                            >E-Payment</div>
                        </div>
                        <div className="col-3 d-flex px-0 align-items-center justify-content-end">
                            <div
                                onClick={() => setPageHeadItem(3)}
                                className={`btn btn-secondary purchase-nav-btn px-2 ${pageHeadItem === 3 && 'select'}`}
                            >Delivery details</div>
                        </div>
                        <div className="col-3 d-flex px-0 align-items-center justify-content-end">
                            <div
                                onClick={() => setPageHeadItem(1)}
                                className={`btn btn-secondary purchase-nav-btn px-2 ${pageHeadItem === 1 && 'select'}`}
                            >Invoice details</div>
                        </div>
                    </div>
                </div>
            </div>
            <form className='item_add_cont px-3 pb-1 pt-0'>
                {purchaseHeader}
                <PurchaseTable 
                    {...{
                        setPurchaseItemModal
                    }}
                />
                <PurchaseDetailFooter />
            </form>
            <Modal
                show={purchaseItemModal}
                size='lg'
                centered
                onHide={()=>setPurchaseItemModal(false)}
            >
                <PurchaseTableItemList />
            </Modal>
            <Modal
                show={purchaseEditModal}
                size='lg'
                centered
                onHide={()=>setPurchaseEditModal(false)}
            >
                <PurchaseEditList />
            </Modal>
        </div>
    )
}

export default PurchaseTransaction

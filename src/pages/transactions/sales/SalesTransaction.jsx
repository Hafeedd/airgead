import React, { useEffect, useState } from 'react'
import './SalesTransaction.css'
import { useNavigate } from 'react-router'
import { Form, Modal } from 'react-bootstrap'
import { FiEdit } from 'react-icons/fi'
import PurchaseTableItemList from '../purchase/components/PurchaseTableItemList'
import PurchaseEditList from '../purchase/components/PurchaseEditList'
import SalesInvoiceDetails from './components/SalesInvoiceDetails'
import SalesCustomerDetails from './components/SalesCustomerDetails'
import SalesDeliveryDetails from './components/SalesDeliveryDetails'
import SalesPrintingDetails from './components/SalesPrintingDetails'
import SalesTable from './components/SalesTable'
import SalesDetailFooter from './components/SalesDetailFooter'

const SalesTransaction = () => {
    const [salesItemModal, setSalesItemModal] = useState(false)
    const [salesEditModal, setSalesEditModal] = useState(false)
    const [pageHeadItem, setPageHeadItem] = useState(1)
    const [salesHeader, setSalesHeader] = useState(1)
    const navigate = useNavigate()
    useEffect(() => {
        switch (pageHeadItem) {
            case 1: setSalesHeader(<SalesInvoiceDetails />)
                break
            case 2: setSalesHeader(<SalesCustomerDetails />)
                break
            case 3: setSalesHeader(<SalesDeliveryDetails />)
                break
            case 4: setSalesHeader(<SalesInvoiceDetails />)
                break
            case 5: setSalesHeader(<SalesPrintingDetails />)
                break
            default: break;
        }
    }, [pageHeadItem])

    const handleEdit = ()=>{
        setSalesEditModal(true)
    }

    return (
        <div className='item_add'>
            <div className="itemList_header row mx-0">
                <div className="page_head ps-4 d-flex pe-0">
                    <div className='col-5 col-6'>
                        <div className='fw-600 fs-5'>Sales</div>
                        <div className='page_head_items mb-3'>
                            <div onClick={() => { navigate('/sales-transaction') }} className={`page_head_item active`}>Sales Details</div>
                        </div>
                    </div>
                    <div className='col-6 col-7 pe-4 d-flex align-items-center justify-content-end'>
                        <div className="col-2 col-3 d-flex px-0 align-items-center justify-content-end">
                            <div
                                onClick={() => setPageHeadItem(5)}
                                className={`btn btn-secondary purchase-nav-btn px-2 ${pageHeadItem === 5 && 'select'}`}
                            >Printing details</div>
                        </div>
                        <div className="col-2 d-flex px-0 align-items-center justify-content-end">
                            <div 
                                className={`btn btn-secondary purchase-nav-btn px-3 ${pageHeadItem === 4 && 'select'}`}
                            >E-Payment</div>
                        </div>
                        <div className="col-2 col-3 d-flex px-0 align-items-center justify-content-end">
                            <div
                                onClick={() => setPageHeadItem(3)}
                                className={`btn btn-secondary purchase-nav-btn px-2 ${pageHeadItem === 3 && 'select'}`}
                            >Delivery details</div>
                        </div>
                        <div className="col-2 col-3 d-flex px-0 align-items-center justify-content-end">
                            <div
                                onClick={() => setPageHeadItem(2)}
                                className={`btn btn-secondary purchase-nav-btn px-2 ${pageHeadItem === 2 && 'select'}`}
                            >Customer details</div>
                        </div>
                        <div className="col-2 col-3 d-flex px-0 align-items-center justify-content-end">
                            <div
                                onClick={() => setPageHeadItem(1)}
                                className={`btn btn-secondary purchase-nav-btn px-2 ${pageHeadItem === 1 && 'select'}`}
                            >Invoice details</div>
                        </div>
                    </div>
                </div>
            </div>
            <form className='item_add_cont px-3 pb-1 pt-0'>
                <div className='row mx-0 mb-0'>
                    <div className="col-3 col-4 mx-0 ps-2 px-0 row">
                        <div className="col-12 sales-supplier-container row mx-0 mt-1">
                            <div className="col-12 row mx-0 mb-1 align-items-center">
                                <div className="col-6">Opening Balance</div>
                                <div className="col-1">:</div>
                                <div className="col-5">300.0 Db</div>
                            </div>
                            <div className="col-12 row mx-0 align-items-center">
                                <div className="col-6">Closing Balance</div>
                                <div className="col-1">:</div>
                                <div className="col-5">515.0 Cr</div>
                            </div>
                        </div>
                        <div className='col-9 d-flex align-items-end justify-content-start px-0 mx-0 mt-1'>
                            <div className="pe-1">
                                <div className="btn btn-sm btn-secondary px-3">Sales</div>
                            </div>
                            <div className="">
                                <div className="btn btn-sm btn-secondary px-3">S.Return</div>
                            </div>
                            <div className="ps-1">
                                <div className="btn btn-sm btn-secondary px-3">Other</div>
                            </div>
                        </div>
                        <div className="col-3 pe-0 d-flex justify-content-end align-items-end mt-1">
                            <div className="btn btn-dark btn-sm purchase-edit-btn" onClick={handleEdit}>
                                <FiEdit size={'1rem'} />Edit
                            </div>
                        </div>
                    </div>
                    {salesHeader}
                </div>
                <SalesTable
                    {...{
                        setSalesItemModal
                    }}
                />
                <SalesDetailFooter />
            </form>
            <Modal
                show={salesItemModal}
                size='lg'
                centered
                onHide={() => setSalesItemModal(false)}
            >
                <PurchaseTableItemList />
            </Modal>
            <Modal
                show={salesEditModal}
                size='lg'
                centered
                onHide={() => setSalesEditModal(false)}
            >
                <PurchaseEditList />
            </Modal>
        </div>
    )
}

export default SalesTransaction

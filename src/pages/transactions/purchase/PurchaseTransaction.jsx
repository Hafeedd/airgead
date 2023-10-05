import React, { useEffect, useRef, useState } from 'react'
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
import { PurchaseItemBatchAdd } from './components/PurchaseItemSerielAdd'
// import useCustomerServices from '../../../services/master/customerServices'

const PurchaseTransaction = () => {
    const [purchaseItemModal, setPurchaseItemModal] = useState(false)
    const [cstm_id, setCstm_id] = useState(1)
    const [purchaseEditModal, setPurchaseEditModal] = useState(false)
    const [purchaseItemSerielModal, setPurchaseItemSerielModal] = useState(false)
    const [pageHeadItem, setPageHeadItem] = useState(1)
    const [purchaseHeader, setPurchaseHeader] = useState(1)
    const [itemBatchStore, setItemBatchStore] = useState()
    const invoiceDetailsRef = useRef()
    const printDetailsRef = useRef()
    const deliveryDetailsRef = useRef()
    const navigate = useNavigate({})
    
    const [tableItemList, setTableItemList] = useState([])
    const [tableItemBatchList, setTableItemBatchList] = useState([])

    const [purchaseAdd, setPurchaseAdd] = useState({
        cstm_id:null,
        supplier_code:null,
        supplier_name:null,
        documents_no:null,
        order_no:null,
        bill_no:null,
        date:null,
        bill_date:null,
        interstate:null,
        reverse_charge:null,
        tax_bill:null,
        total_item:null,
        item:null,
        discount:null,
        roundoff:null,
        paid_cash:null,
        change_due:null,
        fk_supplier:null,
        vehicle_no:null,
        driver:null,
        poject:null,
        address:null,
        bank:null,
        transfer_account:null,
    })

    const [tableItem, setTableItem] = useState({
        cstm_id:null,
        name:null,
        open_stock:0.0,
        unit:null,
        transaction_unit:null,
        purchase_rate:0.0,
        retail_rate:0.0,
        margin:0.0,
        cost:0.0,
        total:0.0,
        sgst:0.0,
        cgst_igst:0.0,
        tax_gst:0.0,
        value:0.0,
        sale_discount:0.0,
        disc_amnt:0.0
    })

    const [tableItemBatch, setTableItemBatch] = useState({
        cstm_id:null,
        batch:null,
        c_barcode:null,
        qty:null,
        company:null,
        size:null,
        color:null,
    })

    const handlePurchaseAddReset = () =>{
        let tempItem = {...purchaseAdd}
        const keys =  Object.keys(purchaseAdd)
        keys.map(data=>tempItem = {...tempItem,[data]:null})
        setPurchaseAdd(tempItem)
    }
    const handleTableItemReset = () =>{
        let tempItem = {...tableItem}
        const keys =  Object.keys(tableItem)
        keys.map(data=>{
            if(data.match(/^name|^unit|^transaction_unit|^cstm_id/)){
                tempItem = {...tempItem,[data]:null}
            }else
            tempItem = {...tempItem,[data]:0}
        })
        setTableItem(tempItem)
    }

    const handleChange = (e,data) =>{
        if(data){
            let supplier_data = data.options.filter(x=>x.value===data.value)[0]
            setPurchaseAdd(data=>({...data,['supplier_code']:supplier_data.value,['supplier_name']:supplier_data.name,['fk_supplier']:supplier_data.id}))
        }
        else if(e.target.value == "")
            setPurchaseAdd(data=>({...data,[e.target.name]:null}))
        else
            setPurchaseAdd(data=>({...data,[e.target.name]:e.target.value}))
    }

    useEffect(() => {
        switch (pageHeadItem) {
            case 1: setPurchaseHeader(<PurchaseInvoiceDetails {...{handleEdit,purchaseAdd,handleChange,invoiceDetailsRef}} />)
                break
            case 2: setPurchaseHeader(<PurchasePrintingDetails {...{handleEdit,purchaseAdd,handleChange,printDetailsRef}} />)
                break
            case 3: setPurchaseHeader(<PurchaseDeliveryDetails {...{handleEdit,purchaseAdd,handleChange,deliveryDetailsRef}} />)
                break
            case 4: setPurchaseHeader(<PurchaseInvoiceDetails {...{handleEdit,purchaseAdd,handleChange,invoiceDetailsRef}} />)
                break
            default: break;
        }
    }, [pageHeadItem,purchaseAdd])

    const handleEdit = ()=>{
        setPurchaseEditModal(true)
    }

    const handleChangeTableItem = (e) =>{
        console.log(e.target.value)
        if(e.target.value == "")
            setTableItem(data=>({...data,[e.target.name]:''}))
        else
            setTableItem(data=>({...data,[e.target.name]:e.target.value}))
    }

    console.log(tableItem)

    const handleChangeTableItemBatch = (e) =>{
        if(e.target.value == "")
            setTableItemBatch(data=>({...data,[e.target.name]:null}))
        else
            e.target.value = e.target.value.toUpperCase()
            setTableItemBatch(data=>({...data,[e.target.name]:e.target.value}))
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
                        handleChange,
                        cstm_id, setCstm_id,
                        setPurchaseItemModal,
                        tableItem,setTableItem,
                        handleChangeTableItem,
                        setPurchaseItemSerielModal,
                        tableItemList,setTableItemList
                    }}
                />
                <PurchaseDetailFooter {...{handleEdit,purchaseAdd,handleChange}} />
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
            <Modal
            show={purchaseItemSerielModal}
            size='lg'
            centered
            contentClassName='purchase-batch-modal'
            onHide={()=>setPurchaseItemSerielModal(false)}
            >
                <PurchaseItemBatchAdd 
                {...{tableItemBatch, setTableItemBatch,purchaseItemSerielModal,
                    handleChangeTableItemBatch,setPurchaseItemSerielModal,
                    itemBatchStore, setItemBatchStore,handleTableItemReset,
                    tableItemBatchList, setTableItemBatchList,
                    tableItemList,setTableItemList,
                    }}/>
            </Modal>
        </div>
    )
}

export default PurchaseTransaction

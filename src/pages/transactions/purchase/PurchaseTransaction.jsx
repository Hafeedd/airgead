import React, { useEffect, useRef, useState } from 'react'
import './PurchaseTransaction.css'
import { useNavigate } from 'react-router'
import { Modal } from 'react-bootstrap'
import PurchaseInvoiceDetails from './components/PurchaseInvoiceDetails'
import PurchaseTable from './components/PurchaseTable'
import PurchaseDetailFooter from './components/PurchaseDetailFooter'
import PurchasePrintingDetails from './components/PurchasePrintingDetails'
import PurchaseDeliveryDetails from './components/PurchaseDeliveryDetails'
import PurchaseTableItemList from './components/PurchaseTableItemList'
import PurchaseEditList from './components/PurchaseEditList'
import { PurchaseItemBatchAdd } from './components/PurchaseItemSerielAdd'
import Swal from 'sweetalert2'
import usePurchaseServices from '../../../services/transactions/purchcaseServices'
import useOnKey from '../../../onKeyFunct/onKeyFunct'
import {formValidation} from '../../../formValidation/formValidation'

const PurchaseTransaction = () => {
    const [purchaseItemModal, setPurchaseItemModal] = useState(false)
    const [cstm_id, setCstm_id] = useState(1)
    const [purchaseEditModal, setPurchaseEditModal] = useState(false)
    const [purchaseItemSerielModal, setPurchaseItemSerielModal] = useState(false)
    const [pageHeadItem, setPageHeadItem] = useState(1)
    const [tebleItemKeys, setTableItemKeys] = useState([])
    const [purchaseHeader, setPurchaseHeader] = useState(1)
    const [purchaseList, setPurchaseList] = useState(1)
    const [itemBatchStore, setItemBatchStore] = useState()
    const [ref, setRef] = useState(null)
    const [calcChange, setCalcChange] = useState(true)
    const navigate = useNavigate({})
    
    const [tableItemList, setTableItemList] = useState([])
    const [tableItemBatchList, setTableItemBatchList] = useState([])
    
    const {handleKeyDown,  formRef } = useOnKey(ref, setRef);
    const [purchaseAdd, setPurchaseAdd] = useState({
        cstm_id:null,
        supplier_code:null,
        supplier_name:null,
        documents_no:null,
        patyment_type:null,
        order_no:null,
        bill_no:null,
        date:null,
        bill_date:null,
        interstate:false,
        reverse_charge:false,
        tax_bill:false,
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
        code:null,
        open_stock:0.0,
        unit:null,
        transaction_unit:null,
        purchase_rate:0.0,
        retail_rate:0.0,
        margin:0.0,
        cost:0.0,
        total:0.0,
        sgst:0.0,
        cgst_or_igst:0.0,
        tax_gst:0.0,
        value:0.0,
        sale_discount:0.0,
        discount_1_percentage:0.0,
        discount_1_amount:0.0
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

    useEffect(()=>{
        getData()
    },[])
    
    useEffect(() => {
        switch (pageHeadItem) {
            case 1: setPurchaseHeader(<PurchaseInvoiceDetails {...{handleEdit,purchaseAdd,
                handleKeyDown,handleChange}} />)
            break
            case 2: setPurchaseHeader(<PurchasePrintingDetails {...{handleEdit,purchaseAdd,
                handleKeyDown,handleChange}} />)
            break
            case 3: setPurchaseHeader(<PurchaseDeliveryDetails {...{handleEdit,purchaseAdd,
                handleKeyDown,handleChange}} />)
            break
            case 4: setPurchaseHeader(<PurchaseInvoiceDetails {...{handleEdit,purchaseAdd,
                handleKeyDown,handleChange}} />)
                break
            default: break;
        }
    }, [pageHeadItem,purchaseAdd])

    const {postPurchase,getPurchase,deletePurchase,
        deletePurchaseItem,deletePurchaseItemBatch} = usePurchaseServices()

    const getData = async () => {
        try{
            const response = await getPurchase()
            if(response?.success){
                console.log(response.data)
                setPurchaseList(response.data)
            }
        }catch(err){

        }
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
    
    const handleEdit = ()=>{
        setPurchaseEditModal(true)
    }

    const handlePurchaseAllReset = () =>{
        setPurchaseAdd({
            cstm_id:null,
            supplier_code:null,
            supplier_name:null,
            documents_no:null,
            order_no:null,
            bill_no:null,
            date:null,
            bill_date:null,
            interstate:false,
            reverse_charge:false,
            tax_bill:false,
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
        setTableItemList([])
        setTableItemBatchList([])
    }
    
    const handleChange = (e,data) =>{
        if(data){
            let supplier_data = data.options.filter(x=>x.value===data.value)[0]
            setPurchaseAdd(data=>({...data,['supplier_code']:supplier_data?.value,
            ['supplier_name']:supplier_data?.name,['fk_supplier']:supplier_data?.id}))
        }
        else if(e.target.type === "checkbox"){
            setPurchaseAdd(data=>({...data,[e.target.name]:!e.target.value}))
        }
        else if(e.target.value == "")
            setPurchaseAdd(data=>({...data,[e.target.name]:null}))
        else
            setPurchaseAdd(data=>({...data,[e.target.name]:e.target.value}))
    }
    
    const handleAmountCalculation = (tempItem,e) =>{
        let name = e.target.name
        let value = {}
        if((tempItem.purchase_rate)&&tableItem.open_stock){
                value = {['value']:(tempItem.open_stock*tempItem.purchase_rate)}
                if(name=='discount_1_percentage'  && tempItem.discount_1_percentage){
                    value = {...value,['discount_1_amount']:value.value-(value.value-(tempItem.discount_1_percentage*(value.value/100)))}
                }
                else if(name=='discount_1_percentage'){
                    value = {...value,['discount_1_amount']:0}
                }
                if(name=='discount_1_amount' && tempItem.discount_1_amount){
                    value = {...value,['discount_1_percentage']:(tempItem.discount_1_amount/value.value)*100}
                }else if(name=='discount_1_amount'){
                    value = {...value,['discount_1_percentage']:0}
                }
                
                
                tempItem = {...tempItem,...value}
                if(value.value && tempItem.discount_1_amount){
                    tempItem.discount_1_amount = parseFloat(tempItem.discount_1_amount)
                    value = {...value,['value']:(parseFloat(tempItem.open_stock*tempItem.purchase_rate)-parseFloat(tempItem.discount_1_amount))}
                }else{
                    value = {...value,['value']:(tempItem.open_stock*tempItem.purchase_rate)}
            }
            if(name=='tax_gst'){
                    value = {...value,['total']:(value.value+(tempItem.tax_gst*(value.value/100))),
                    ['cost']:(value.value+(tempItem.tax_gst*(value.value/100))),
                    ['cgst_or_igst']:tempItem.tax_gst/2,['sgst']:tempItem.tax_gst/2}
                }
            if(name=='margin' && tempItem.margin){
                value = {...value,['retail_rate']:parseFloat(tempItem.total)+parseFloat(tempItem.total*(tempItem.margin/100))}
            }else{
                value = {...value,['retail_rate']:0}
            }
            }
            tempItem = {...tempItem,...value}
            let tempItemKeys = Object.keys(tempItem)
            tempItemKeys?.map(key=>{
                let number = parseFloat(tempItem[key])
                if(number?.toFixed(2) && !Number.isInteger(number)  && number){
                tempItem = {...tempItem,[key]:number?.toFixed(2)}
                }
            })
        tempItem = {...tempItem}
        setTableItem(tempItem)
    }
    
    const handleChangeTableItem = (e,data) =>{
        let tempItem = {...tableItem}
        if(data){
            let Item_data = data.options.filter(x=>x.value===data.value)[0]
            tempItem = {...tempItem,name:Item_data.value,code:Item_data.description}
        }
        if(e.target.value === ""){
            tempItem = {...tempItem,[e.target.name]:''}
        }else{
            tempItem = {...tempItem,[e.target.name]:e.target.value}
        }
        handleAmountCalculation(tempItem,e)
        setCalcChange(!calcChange)
    }

    const handleChangeTableItemBatch = (e) =>{
        if(e.target.value == "")
            setTableItemBatch(data=>({...data,[e.target.name]:null}))
        else
            e.target.value = e.target.value.toUpperCase()
        setTableItemBatch(data=>({...data,[e.target.name]:e.target.value}))
    }
    
    const handleClose = () =>{
        let tempList = [...tableItemList]
        let index = tempList.indexOf((data)=>data.cstm_id === purchaseItemSerielModal)
        if(index){
        tempList.splice(index,1)
        }
        setTableItemList(tempList)
        setPurchaseItemSerielModal(false)
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        try{
            let submitData = {...purchaseAdd,items:tebleItemKeys}
            formValidation(formRef)
            const response = await postPurchase(submitData)
            if(response?.success){
                handlePurchaseAllReset()
                Swal.fire('Purchase added successfully','','success')
            }else{
                Swal.fire('Failed to create purchase','','error')
            }
        }catch(err){
            let data = err?.response?.data?.data
            let index = Object.keys(data)[0]
            let error = data[index][0]
            Swal.fire({
                title:index.toUpperCase(),
                text:error,
                icon:'error',
                timer:1000,
                showConfirmButton:false
            })
        }
    }

    return (
        <div className='item_add'>
            <div className="itemList_header row mx-0">
                <div className="page_head ps-4 d-flex pe-0">
                    <div className='col-6 col-7'>
                        <div className='fw-600 fs-5'>Purchase</div>
                        <div className='page_head_items mb-3'>
                            <div onClick={() => { navigate('/purchase-transaction') }} 
                            className={`page_head_item active`}>Purchase Details</div>
                        </div>
                    </div>
                    <div className='col-5 col-6 pe-4 d-flex align-items-center justify-content-end'>
                        <div className="col-3 d-flex px-0 align-items-center justify-content-end">
                            <div
                                onClick={() => setPageHeadItem(2)}
                                className={`btn btn-secondary purchase-nav-btn px-2 
                                ${pageHeadItem === 2 && 'select'}`}
                            >Printing details</div>
                        </div>
                        <div className="col-3 d-flex px-0 align-items-center justify-content-end">
                            <div
                                // onClick={() => setPageHeadItem(4)} 
                                className={`btn btn-secondary purchase-nav-btn px-3 
                                ${pageHeadItem === 4 && 'select'}`}
                            >E-Payment</div>
                        </div>
                        <div className="col-3 d-flex px-0 align-items-center justify-content-end">
                            <div
                                onClick={() => setPageHeadItem(3)}
                                className={`btn btn-secondary purchase-nav-btn px-2 
                                ${pageHeadItem === 3 && 'select'}`}
                            >Delivery details</div>
                        </div>
                        <div className="col-3 d-flex px-0 align-items-center justify-content-end">
                            <div
                                onClick={() => setPageHeadItem(1)}
                                className={`btn btn-secondary purchase-nav-btn px-2 
                                ${pageHeadItem === 1 && 'select'}`}
                            >Invoice details</div>
                        </div>
                    </div>
                </div>
            </div>
            <form ref={formRef} onSubmit={handleSubmit} className='item_add_cont px-3 pb-1 pt-0'>
                {purchaseHeader}
                <PurchaseTable 
                    {...{
                        setPurchaseItemModal,
                        tableItem,setTableItem,
                        handleChangeTableItem,
                        setPurchaseItemSerielModal,
                        handleChange,cstm_id, setCstm_id,
                        tableItemList,setTableItemList
                    }}
                />
                <PurchaseDetailFooter {...{handleEdit,purchaseAdd,handleChange,handleKeyDown}} />
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
            onHide={()=>handleClose()}
            >
                <PurchaseItemBatchAdd 
                {...{tableItemBatch, setTableItemBatch,
                    purchaseItemSerielModal,handleChangeTableItemBatch,
                    setPurchaseItemSerielModal,itemBatchStore,
                    setItemBatchStore,handleTableItemReset,
                    tebleItemKeys,setTableItemKeys,
                    tableItemBatchList, setTableItemBatchList,
                    tableItemList,setTableItemList,purchaseAdd,
                    tableItem
                    }}/>
            </Modal>
        </div>
    )
}

export default PurchaseTransaction

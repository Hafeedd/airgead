import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import useItemServices from '../../../../services/master/itemServices'
import useSalesServices from '../../../../services/transactions/salesServices'
import useOnKey from '../../../../hooks/onKeyFunct/onKeyFunct'

const SalesInvoiceDetails = (props) => {
    const {salesAdd,setSalesAdd, handleChange,
        setDocNoRecheck, edit,currentEditBillType,
        setCurrentEditBillType,billType, setBillType,
        billTypeDocNo, setBillTypeDocNo,getCodeWithBillType,
        codeWithBillTypeList, setCodeWithBillTypeList,
        getOfInvoiceData} = props

    const [ref, setRef] = useState(null)

    const {formRef , handleKeyDown} = useOnKey(ref, setRef)

    useEffect(()=>{
        getOfInvoiceData()
    },[])
    
    useEffect(()=>{
        handleBillTypeSelection()
    },[salesAdd.fk_bill_type,codeWithBillTypeList, ])

    const handleBillTypeSelection = () =>{
        if(edit?.fk_bill_type && salesAdd.fk_bill_type)
            if((edit?.fk_bill_type == salesAdd.fk_bill_type)){
                let tempBillType = billType?.filter(x=>x.value == salesAdd.fk_bill_type)
                setDocNoRecheck(edit?.documents_no)
                setBillTypeDocNo(tempBillType[0]?.text.trim() + edit?.documents_no)
                return 0
        }
        if(codeWithBillTypeList?.length>0){
            let bill_type
            let cod = codeWithBillTypeList?.filter(x=>{
                // filtering bill type name from bill type id
                let fk_bill_type_temp
                if(salesAdd.fk_bill_type)
                fk_bill_type_temp = salesAdd?.fk_bill_type
                else
                fk_bill_type_temp = billType[0].value
                billType?.map(y=>{
                        if(y.value == fk_bill_type_temp){
                            bill_type = y.text
                        }
                    })
                    // ---------------------------------------
                return x.sub_id == bill_type
                })

                let tempBillType = bill_type?.split(' ').join('')
                if(cod?.length>0){
                    let tempDocNo = tempBillType+cod[0]?.next_value
                    setSalesAdd(data=>({...data,documents_no:cod[0]?.next_value,
                    fk_bill_type:cod[0]?.fk_bill_type}))
                    setDocNoRecheck(cod[0]?.next_value)
                    setBillTypeDocNo(tempDocNo)
                    setCurrentEditBillType(cod[0].fk_bill_type)
                    }
        }else if(edit){
            let tempBillType = billType?.filter(x=>x.value == salesAdd.fk_bill_type)
            setDocNoRecheck(edit?.documents_no)
            setBillTypeDocNo(tempBillType[0]?.text.trim() + edit?.documents_no)
        }
    }


    return (
        < div ref={formRef} className="col-8 col-9 mx-0 ps-4 pe-0 row" >
            <Form.Group className='col-5 mx-0 d-flex align-items-center'>
                <Form.Label className='col-3 purchase-input-label'>Invoice No</Form.Label>
                <Form.Control
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    name="documents_no"
                    className='purchase-input-text'
                    type='text'
                    value={salesAdd?.documents_no?billTypeDocNo:''}
                />
            </Form.Group>
            <Form.Group className='col-5 mx-0 d-flex align-items-center'>
                <Form.Label className='col-3 purchase-input-label'>Bill Type</Form.Label>
                <div className='mx-0 col-9 px-0'>
                    <select className='customer-select w-100'
                    onKeyDown={handleKeyDown}
                    value={salesAdd.fk_bill_type||''}
                    onChange={handleChange}
                    name="fk_bill_type">
                    {billType?.length>0&&
                        billType.map((item,i)=>
                        <option key={i} value={item.value}>{item.text}</option>)}
                    </select>
                </div>
            </Form.Group>
            <span className="col-2" />
    {/* Row 2 -------------------------------------------------------------------------------------------------------- */ }
            <Form.Group className='col-5 mx-0 d-flex align-items-center mt-1'>
                <Form.Label className='col-3 purchase-input-label'>Order No</Form.Label>
                <Form.Control
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    name="order_no"
                    className='purchase-input-text'
                    type='text'
                />
            </Form.Group>
            <Form.Group className='col-5 mx-0 d-flex align-items-center mt-1'>
                <Form.Label className='col-3 purchase-input-label'>Rate Type</Form.Label>
                <div className='mx-0 col-9 px-0'>
                    <select className='customer-select w-100'
                    name="rate_type"
                    value={salesAdd?.rate_types||''}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}>
                        <option value="MRP">MRP</option>
                        <option value="RET_RATE">RET RATE</option>
                        <option value="WS_RATE">WS RATE</option>
                        <option value="SUPER_WHOLESALE_RATE">SUPERWHOLESALE RATE</option>
                        <option value="QUOTATION_RATE">QUOTATION RATE</option>
                        <option value="RENT_RATE">RENT RATE</option>
                    </select>
                </div>
            </Form.Group>
            <div className='mx-0 col-2 px-0 d-flex align-items-center mt-1'>
                <input type='checkbox' name='interstate' id="interstate"
                checked={salesAdd?.interstate||false}
                onChange={handleChange} 
                onKeyDown={handleKeyDown}/>
                <label htmlFor='interstate' className='ps-2'>Interstate</label>
            </div>
    {/* Row 3 -------------------------------------------------------------------------------------------------------- */ }
            <Form.Group className='col-5 mx-0 d-flex align-items-center mt-1'>
                <Form.Label className='col-3 purchase-input-label'>Date</Form.Label>
                <Form.Control
                    onChange={handleChange}
                    className='purchase-input-text'
                    value={edit?salesAdd.created_at?.slice(0,10):(new Date().toISOString().slice(0,10))}
                />
            </Form.Group>
            <Form.Group className='col-5 mx-0 d-flex align-items-center mt-1'>
                <Form.Label className='col-3 purchase-input-label'>Salesman</Form.Label>
                <div className='mx-0 col-9 px-0'>
                    <select value={salesAdd.salesman||''} name='payment_type' className='customer-select w-100'>
                        <option value="BOB">BOB</option>
                        <option value="TOM">TOM</option>
                    </select>
                </div>
            </Form.Group>
            <div className='mx-0 col-2 px-0 d-flex align-items-center mt-1'>
                <input type='checkbox' checked={salesAdd?.reverse_charge||false} name="reverse_charge"
                onChange={handleChange} onKeyDown={handleKeyDown} id='reverse_charge'/>
                <label htmlFor='reverse_charge' className='ps-2'>Reverse Charge</label>
            </div>
            <span className="col-12 mt-3" />
        </div >
  )
}

export default SalesInvoiceDetails

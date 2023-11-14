import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { FiEdit } from 'react-icons/fi'
import useCustomerServices from '../../../../services/master/customerServices'
import { Dropdown } from 'semantic-ui-react'
import { useNavigate } from 'react-router'
import useOnKey from '../../../../hooks/onKeyFunct/onKeyFunct'

const PurchaseInvoiceDetails = (props) => {
    const {handleEdit,purchaseAdd,handleChange,
        supplierList, setSupplierList} = props

    const [ref, setRef] = useState(null)
    const {getSupplier} = useCustomerServices()
    
    const navigate = useNavigate()

    useEffect(()=>{
        getData()
    },[])

    const {handleKeyDown,  formRef } = useOnKey(ref, setRef);
    
    const getData = async () =>{
        let res = await getSupplier()
        if(!res?.success) return 0
        let tempList = []
        res.data.map(item=>{
            let a = {value:item.id,text:item.code,name:item.name,description:item.name}
            tempList.push(a)
        })
        setSupplierList(tempList)
    }

    const supplierNameFilter = () =>{
        if(purchaseAdd.fk_supplier && supplierList?.length>0){
            for (let i of supplierList){
                if(i.value==purchaseAdd.fk_supplier){
                    return i.name
                }
            }
        }else{
            return null
        }
    }
    
    const search = (options, searchValue) => {
        searchValue = searchValue.toUpperCase()
        return options.filter((option) => 
        {return(
            option?.value?.toString().includes(searchValue)||
            option.description?.toString()?.includes(searchValue))});
      };
      
    return (
        <div ref={formRef} className='row mx-0 mb-0'>
{/* Row 1 -------------------------------------------------------------------------------------------------------- */}
            <Form.Group className='col-2 col-3 mx-0 d-flex align-items-center mt-1 position-relative'>
                <Form.Label className='col-3 purchase-input-label'>S.Code</Form.Label>
                <Dropdown
                    clearable
                    selection
                    required
                    search={search}
                    onKeyDown={handleKeyDown}
                    onChange={handleChange}
                    className='pruchase-select d-flex align-items-center py-0 form-control'
                    name="fk_supplier"
                    placeholder='select'
                    value={purchaseAdd?.fk_supplier||''}
                    options={supplierList}
                    />
            </Form.Group>
            <Form.Group className='col-3 ps-4 mx-0 d-flex align-items-center mt-1'>
                <Form.Label className='col-3 purchase-input-label'>Supplier</Form.Label>
                <Form.Control
                    required
                    disabled
                    name="fk_supplier" value={supplierNameFilter()||''}
                    onKeyDown={handleKeyDown}
                    className='purchase-input-text'
                    placeholder='Name'
                    type='text'
                />
            </Form.Group>
            <Form.Group className='col-3 ps-5 mx-0 d-flex align-items-center mt-1'>
                <Form.Label className='col-3 purchase-input-label'>Bill No</Form.Label>
                <Form.Control
                    required
                    name="bill_no" value={purchaseAdd.bill_no||''}
                    onKeyDown={handleKeyDown}
                    onChange={handleChange}
                    className='purchase-input-text'
                    type='text'
                />
            </Form.Group>
            <Form.Group className='col-3 col-4 mx-0 d-flex align-items-center mt-1'>
                <Form.Label className='col-3 col-4 purchase-input-label'>Doc No</Form.Label>
                <Form.Control
                    name="documents_no" value={purchaseAdd.documents_no||''}
                    onKeyDown={handleKeyDown}
                    onChange={handleChange}
                    className='purchase-input-text'
                    type='text'
                />
            </Form.Group>
{/* Row 2 -------------------------------------------------------------------------------------------------------- */}
            {/* <Form.Group className='col-2 col-3 mx-0 d-flex align-items-center mt-1'>
                <Form.Label className='col-3 purchase-input-label'>Cash/ Credit</Form.Label>
                <div className='mx-0 col-9 px-0'>
                    <select onChange={handleChange} onKeyDown={handleKeyDown}
                    value={purchaseAdd.payment_type||'CASH'}
                    name='payment_type' className='customer-select w-100'>
                        <option value="CASH">CASH</option>
                        <option value="BANK">BANK</option>
                    </select>
                </div>
            </Form.Group> */}
            <div className='col-3 col-2' onClick={()=>navigate("/supplier-add")}>
            <div className='btn btn-sm btn-dark rounded-2 w-100 p-0 mt-2'>Add Supplier</div>
            </div>
            <span className='col-3'/>
            {/* <Form.Group className='col-3 ps-4 mx-0 d-flex align-items-center mt-1'>
                <Form.Label className='col-3 purchase-input-label'>Due Date</Form.Label>
                <Form.Control
                    name="change_due" value={purchaseAdd.change_due||''}
                    onKeyDown={handleKeyDown}
                    onChange={handleChange}
                    className='purchase-input-date'
                    type='date'
                />
            </Form.Group> */}
            <Form.Group className='col-3 ps-5 mx-0 d-flex align-items-center mt-1'>
                <Form.Label className='col-3 purchase-input-label'>Bill Date</Form.Label>
                <Form.Control
                    name="bill_date" value={purchaseAdd.bill_date?.slice(0,10)||''}
                    onKeyDown={handleKeyDown}
                    onChange={handleChange}
                    className='purchase-input-text'
                    type='date'
                />
            </Form.Group>
            <Form.Group className='col-3 col-4 mx-0 d-flex align-items-center my-1'>
                <Form.Label className='col-3 col-4 purchase-input-label'>Date</Form.Label>
                <Form.Control
                    name="created_at" value={purchaseAdd?.created_at?.slice(0,10)||(new Date().toISOString().slice(0,10))}
                    onKeyDown={handleKeyDown}
                    onChange={handleChange}
                    className='purchase-input-text'
                    type='date'
                />
            </Form.Group>
{/* Row 3 -------------------------------------------------------------------------------------------------------- */}
            <div className='col-3 d-flex align-items-end justify-content-start ps-1'>
                <div className='px-1'>
                    <div className='btn btn-sm btn-secondary px-3'>Purchase</div>
                </div>
                <div className=''>
                    <div className='btn btn-sm btn-secondary px-3'>P.Return</div>
                </div>
                <div className='ps-1'>
                    <div className='btn btn-sm btn-secondary px-3'>Other</div>
                </div>
            </div>
            <div className='col-1 d-flex align-items-end'>
                <div className='btn btn-dark btn-sm purchase-edit-btn' onClick={handleEdit}>
                    <FiEdit size={'1rem'} />Edit
                </div>
            </div>
            <div className='col-4 col-5 d-flex align-items-center row mx-0 my-0 justify-content-end'>
                <div className='mx-0 px-0 col-4 d-flex align-items-center justify-content-end'>
                    <input type='checkbox' name="interstate" id="interstate" checked={purchaseAdd?.interstate||''}
                    onKeyDown={handleKeyDown} onChange={handleChange}/>
                    <label htmlFor='interstate' className='ps-2'>Interstate</label>
                </div>
                <div className='mx-0 px-0 col-5 d-flex align-items-center justify-content-end'>
                    <input type='checkbox' name="reverse_charge" id="reverse_charge" checked={purchaseAdd.reverse_charge||''}
                    onKeyDown={handleKeyDown} onChange={handleChange} />
                    <label htmlFor='reverse_charge' className='ps-2'>Reverse Charge</label>
                </div>
                <div className='mx-0 px-0 col-3 d-flex align-items-center justify-content-end'>
                    <input type='checkbox' name="tax_bill" id="tax_bill" checked={purchaseAdd.tax_bill||''}
                    onKeyDown={handleKeyDown} onChange={handleChange} />
                    <label htmlFor='tax_bill' className='ps-2'>Tax Bill</label>
                </div>
            </div>
            <Form.Group className='col-3 col-4 mx-0 d-flex align-items-center my-1'>
                <Form.Label className='col-3 col-4 purchase-input-label'>Order No</Form.Label>
                <Form.Control
                    name="order_no" value={purchaseAdd.order_no||''}
                    onKeyDown={handleKeyDown}
                    onChange={handleChange}
                    className='purchase-input-text'
                    type='text'
                />
            </Form.Group>
        </div>
    )
}

export default PurchaseInvoiceDetails

import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { FiEdit } from 'react-icons/fi'
import useCustomerServices from '../../../../services/master/customerServices'
import { Dropdown } from 'semantic-ui-react'

const PurchaseInvoiceDetails = (props) => {
    const {handleEdit,purchaseAdd,handleChange,invoiceDetailsRef} = props

    const [supplierList, setSupplierList] = useState(null)
    const {getSupplier} = useCustomerServices()

    useEffect(()=>{
        getData()
    },[])
    
    const getData = async () =>{
        let res = await getSupplier()
        if(!res?.success) return 0

        let tempList = []
        res.data.map(item=>{
            let a = {value:item.code,text:item.code,key:item.id,name:item.name,description:item.name}
            tempList.push(a)
        })
        setSupplierList(tempList)
    }
    
    const search = (options, searchValue) => {
        searchValue = searchValue.toUpperCase()
        return options.filter((option) => {return(option.value.includes(searchValue)||option.description.includes(searchValue))});
      };
      
    return (
        <div ref={invoiceDetailsRef} className='row mx-0 mb-0'>
{/* Row 1 -------------------------------------------------------------------------------------------------------- */}
            <Form.Group className='col-2 col-3 mx-0 d-flex align-items-center mt-1 position-relative'>
                <Form.Label className='col-3 purchase-input-label'>S.Code</Form.Label>
                <Dropdown
                    clearable
                    selection
                    search={search}
                    onChange={handleChange}
                    className='pruchase-select d-flex align-items-center py-0 form-control'
                    name="supplier_code"
                    placeholder='select'
                    value={purchaseAdd.supplier_code||''}
                    options={supplierList}
                    />
            </Form.Group>
            <Form.Group className='col-3 ps-4 mx-0 d-flex align-items-center mt-1'>
                <Form.Label className='col-3 purchase-input-label'>Supplier</Form.Label>
                <Form.Control
                    name="fk_supplier" value={purchaseAdd.supplier_name||''}
                    onChange={handleChange}
                    className='purchase-input-text'
                    placeholder='Name'
                    type='text'
                />
            </Form.Group>
            <Form.Group className='col-3 ps-5 mx-0 d-flex align-items-center mt-1'>
                <Form.Label className='col-3 purchase-input-label'>Bill No</Form.Label>
                <Form.Control
                    name="bill_no" value={purchaseAdd.bill_no||''}
                    onChange={handleChange}
                    className='purchase-input-text'
                    type='text'
                />
            </Form.Group>
            <Form.Group className='col-3 col-4 mx-0 d-flex align-items-center mt-1'>
                <Form.Label className='col-3 col-4 purchase-input-label'>Doc No</Form.Label>
                <Form.Control
                    name="documents_no" value={purchaseAdd.documents_no||''}
                    onChange={handleChange}
                    className='purchase-input-text'
                    type='text'
                />
            </Form.Group>
{/* Row 2 -------------------------------------------------------------------------------------------------------- */}
            <Form.Group className='col-2 col-3 mx-0 d-flex align-items-center mt-1'>
                <Form.Label className='col-3 purchase-input-label'>Cash/ Credit</Form.Label>
                <div className='mx-0 col-9 px-0'>
                    <select name='payment_type' className='customer-select w-100'>
                        <option value="CASH">Cash</option>
                        <option value="CREDIT">Credit</option>
                    </select>
                </div>
            </Form.Group>
            <Form.Group className='col-3 ps-4 mx-0 d-flex align-items-center mt-1'>
                <Form.Label className='col-3 purchase-input-label'>Due Date</Form.Label>
                <Form.Control
                    name="change_due" value={purchaseAdd.change_due||''}
                    onChange={handleChange}
                    className='purchase-input-date'
                    type='date'
                />
            </Form.Group>
            <Form.Group className='col-3 ps-5 mx-0 d-flex align-items-center mt-1'>
                <Form.Label className='col-3 purchase-input-label'>Bill Date</Form.Label>
                <Form.Control
                    name="bill_date" value={purchaseAdd.bill_date||''}
                    onChange={handleChange}
                    className='purchase-input-text'
                    type='date'
                />
            </Form.Group>
            <Form.Group className='col-3 col-4 mx-0 d-flex align-items-center my-1'>
                <Form.Label className='col-3 col-4 purchase-input-label'>Date</Form.Label>
                <Form.Control
                    name="date" value={purchaseAdd.date||''}
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
                    <input type='checkbox' name="interstate" value={purchaseAdd.interstate||''}
                    onChange={handleChange} />
                    <label for='Repeat' className='ps-2'>Interstate</label>
                </div>
                <div className='mx-0 px-0 col-5 d-flex align-items-center justify-content-end'>
                    <input type='checkbox' name="reverse_charge" value={purchaseAdd.reverse_charge||''}
                    onChange={handleChange} />
                    <label for='Blocked' className='ps-2'>Reverse Charge</label>
                </div>
                <div className='mx-0 px-0 col-3 d-flex align-items-center justify-content-end'>
                    <input type='checkbox' name="tax_bill" value={purchaseAdd.tax_bill||''}
                    onChange={handleChange} />
                    <label for='Blocked' className='ps-2'>Tax Bill</label>
                </div>
            </div>
            <Form.Group className='col-3 col-4 mx-0 d-flex align-items-center my-1'>
                <Form.Label className='col-3 col-4 purchase-input-label'>Order No</Form.Label>
                <Form.Control
                    name="order_no" value={purchaseAdd.order_no||''}
                    onChange={handleChange}
                    className='purchase-input-text'
                    type='text'
                />
            </Form.Group>
        </div>
    )
}

export default PurchaseInvoiceDetails

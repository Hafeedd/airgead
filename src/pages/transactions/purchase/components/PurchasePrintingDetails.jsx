import React from 'react'
import { Form } from 'react-bootstrap'
import { FiEdit } from 'react-icons/fi'

const PurchasePrintingDetails = (props) => {
    const {handleEdit,purchaseAdd,handleChange} = props

    return (
        <div className='row mx-0 mb-0'>
{/* Row 1 -------------------------------------------------------------------------------------------------------- */}
            <Form.Group className='col-3 mx-0 d-flex align-items-center my-1'>
                <Form.Label className='col-3 purchase-input-label'>Style</Form.Label>
                <Form.Control
                    className='purchase-input-text'
                    placeholder='A4 (21x30)'
                    type='text'
                />
            </Form.Group>
            <Form.Group className='col-3 ps-4 mx-0 d-flex align-items-center my-1'>
                <Form.Label className='col-3 purchase-input-label'>Printer</Form.Label>
                <Form.Control
                    className='purchase-input-text'
                    placeholder='Epson LX454755'
                    type='text'
                />
            </Form.Group>
            <span className='col-2 col-3' />
            <Form.Group className='col-3 col-4 mx-0 d-flex align-items-center my-1'>
                <Form.Label className='col-3 col-4 purchase-input-label'>Doc No</Form.Label>
                <Form.Control
                    name="documents_no" value={purchaseAdd.documents_no||''}
                    onChange={handleChange}
                    className='purchase-input-text'
                    type='text'
                />
            </Form.Group>
{/* Row 2 -------------------------------------------------------------------------------------------------------- */}
            <Form.Group className='col-2 mx-0 d-flex align-items-center mt-1'>
                <Form.Label className='col-6 purchase-input-label'>Print Copies</Form.Label>
                <Form.Control
                    name="documents_no" value={purchaseAdd.documents_no||''}
                    onChange={handleChange}
                    className='purchase-input-text'
                    placeholder='02'
                    type='number'
                />
            </Form.Group>
            <div className="col-4 d-flex align-items-center row mx-0 my-1">
                <div className='mx-0 px-0 col-4 d-flex align-items-center justify-content-end'>
                    <input type='checkbox' name='Repeat' value='Repeat' />
                    <label for='Repeat' className='ps-2'>Preview</label>
                </div>
                <div className='mx-0 px-0 col-3 d-flex align-items-center justify-content-end'>
                    <input type='checkbox' name='Blocked' value='Blocked' />
                    <label for='Blocked' className='ps-2'>Print</label>
                </div>
                <div className='mx-0 px-0 col-5 d-flex align-items-center justify-content-end'>
                    <input type='checkbox' name='Blocked' value='Blocked' />
                    <label for='Blocked' className='ps-2'>Print Barcode</label>
                </div>
            </div>
            <span className='col-2 col-3' />
            <Form.Group className='col-3 col-4 mx-0 d-flex align-items-center my-1'>
                <Form.Label className='col-3 col-4 purchase-input-label'>Date</Form.Label>
                <Form.Control
                    name="bill_date" value={purchaseAdd.bill_date||''}
                    onChange={handleChange}
                    className='purchase-input-text'
                    type='text'
                />
            </Form.Group>
{/* Row 3 -------------------------------------------------------------------------------------------------------- */}
            <div className='col-3 d-flex align-items-end justify-content-start ps-1'>
                <div className="px-1">
                    <div className="btn btn-sm btn-secondary px-3">Purchase</div>
                </div>
                <div className="">
                    <div className="btn btn-sm btn-secondary px-3">P.Return</div>
                </div>
                <div className="ps-1">
                    <div className="btn btn-sm btn-secondary px-3">Other</div>
                </div>
            </div>
            <div className="col-1 d-flex align-items-end">
                <div className="btn btn-dark btn-sm purchase-edit-btn" onClick={handleEdit}>
                    <FiEdit size={'1rem'} />Edit
                </div>
            </div>
            <span className="col-4 col-5" />
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

export default PurchasePrintingDetails

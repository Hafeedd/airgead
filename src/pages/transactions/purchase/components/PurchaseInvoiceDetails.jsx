import React from 'react'
import { Form } from 'react-bootstrap'
import { FiEdit } from 'react-icons/fi'

const PurchaseInvoiceDetails = ({handleEdit}) => {
    return (
        <div className='row mx-0 mb-0'>
{/* Row 1 -------------------------------------------------------------------------------------------------------- */}
            <Form.Group className='col-2 col-3 mx-0 d-flex align-items-center mt-1'>
                <Form.Label className='col-3 purchase-input-label'>S.Code</Form.Label>
                <Form.Control
                    className='purchase-input-text'
                    placeholder='Code'
                    type='text'
                />
            </Form.Group>
            <Form.Group className='col-3 ps-4 mx-0 d-flex align-items-center mt-1'>
                <Form.Label className='col-3 purchase-input-label'>Supplier</Form.Label>
                <Form.Control
                    className='purchase-input-text'
                    placeholder='Name'
                    type='text'
                />
            </Form.Group>
            <Form.Group className='col-3 ps-5 mx-0 d-flex align-items-center mt-1'>
                <Form.Label className='col-3 purchase-input-label'>Bill No</Form.Label>
                <Form.Control
                    className='purchase-input-text'
                    type='text'
                />
            </Form.Group>
            <Form.Group className='col-3 col-4 mx-0 d-flex align-items-center mt-1'>
                <Form.Label className='col-3 col-4 purchase-input-label'>Doc No</Form.Label>
                <Form.Control
                    className='purchase-input-text'
                    type='text'
                />
            </Form.Group>
{/* Row 2 -------------------------------------------------------------------------------------------------------- */}
            <Form.Group className='col-2 col-3 mx-0 d-flex align-items-center mt-1'>
                <Form.Label className='col-3 purchase-input-label'>Cash/ Credit</Form.Label>
                <div className='mx-0 col-9 px-0'>
                    <select name='payment_type' className='customer-select'>
                        <option value="CASH">Cash</option>
                        <option value="CASH">Cash</option>
                    </select>
                </div>
            </Form.Group>
            <Form.Group className='col-3 ps-4 mx-0 d-flex align-items-center mt-1'>
                <Form.Label className='col-3 purchase-input-label'>Due Date</Form.Label>
                <Form.Control
                    className='purchase-input-date'
                    type='date'
                />
            </Form.Group>
            <Form.Group className='col-3 ps-5 mx-0 d-flex align-items-center mt-1'>
                <Form.Label className='col-3 purchase-input-label'>Bill Date</Form.Label>
                <Form.Control
                    className='purchase-input-text'
                    type='text'
                />
            </Form.Group>
            <Form.Group className='col-3 col-4 mx-0 d-flex align-items-center my-1'>
                <Form.Label className='col-3 col-4 purchase-input-label'>Date</Form.Label>
                <Form.Control
                    className='purchase-input-text'
                    type='text'
                />
            </Form.Group>
{/* Row 3 -------------------------------------------------------------------------------------------------------- */}
            <div className='col-2 col-3 d-flex align-items-end justify-content-start ps-1'>
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
            <div className="col-5 d-flex align-items-center row mx-0 my-0 justify-content-end">
                <div className='mx-0 px-0 col-4 d-flex align-items-center justify-content-end'>
                    <input type='checkbox' name='Repeat' value='Repeat' />
                    <label for='Repeat' className='ps-2'>Interstate</label>
                </div>
                <div className='mx-0 px-0 col-5 d-flex align-items-center justify-content-end'>
                    <input type='checkbox' name='Blocked' value='Blocked' />
                    <label for='Blocked' className='ps-2'>Reverse Charge</label>
                </div>
                <div className='mx-0 px-0 col-3 d-flex align-items-center justify-content-end'>
                    <input type='checkbox' name='Blocked' value='Blocked' />
                    <label for='Blocked' className='ps-2'>Tax Bill</label>
                </div>
            </div>
            <Form.Group className='col-3 col-4 mx-0 d-flex align-items-center my-1'>
                <Form.Label className='col-3 col-4 purchase-input-label'>Order No</Form.Label>
                <Form.Control
                    className='purchase-input-text'
                    type='text'
                />
            </Form.Group>
        </div>
    )
}

export default PurchaseInvoiceDetails

import React from 'react'
import { Form } from 'react-bootstrap'

const SalesInvoiceDetails = () => {
    return (
        < div className="col-8 col-9 mx-0 ps-4 pe-0 row" >
            <Form.Group className='col-5 mx-0 d-flex align-items-center'>
                <Form.Label className='col-3 purchase-input-label'>Code No</Form.Label>
                <Form.Control
                    className='purchase-input-text'
                    type='text'
                />
            </Form.Group>
            <Form.Group className='col-5 mx-0 d-flex align-items-center'>
                <Form.Label className='col-3 purchase-input-label'>Bill Type</Form.Label>
                <div className='mx-0 col-9 px-0'>
                    <select name='payment_type' className='customer-select w-100'>
                        <option value="CASH">Cash</option>
                        <option value="CASH">Cash</option>
                    </select>
                </div>
            </Form.Group>
            <span className="col-2" />
    {/* Row 2 -------------------------------------------------------------------------------------------------------- */ }
            <Form.Group className='col-5 mx-0 d-flex align-items-center mt-1'>
                <Form.Label className='col-3 purchase-input-label'>Order No</Form.Label>
                <Form.Control
                    className='purchase-input-text'
                    type='text'
                />
            </Form.Group>
            <Form.Group className='col-5 mx-0 d-flex align-items-center mt-1'>
                <Form.Label className='col-3 purchase-input-label'>Rate Type</Form.Label>
                <div className='mx-0 col-9 px-0'>
                    <select name='payment_type' className='customer-select w-100'>
                        <option value="CASH">Cash</option>
                        <option value="CASH">Cash</option>
                    </select>
                </div>
            </Form.Group>
            <div className='mx-0 col-2 px-0 d-flex align-items-center mt-1'>
                <input type='checkbox' name='Repeat' value='Repeat' />
                <label for='Repeat' className='ps-2'>Interstate</label>
            </div>
    {/* Row 3 -------------------------------------------------------------------------------------------------------- */ }
            <Form.Group className='col-5 mx-0 d-flex align-items-center mt-1'>
                <Form.Label className='col-3 purchase-input-label'>Date</Form.Label>
                <Form.Control
                    className='purchase-input-text'
                    type='date'
                />
            </Form.Group>
            <Form.Group className='col-5 mx-0 d-flex align-items-center mt-1'>
                <Form.Label className='col-3 purchase-input-label'>Salesman</Form.Label>
                <div className='mx-0 col-9 px-0'>
                    <select name='payment_type' className='customer-select w-100'>
                        <option value="CASH">Cash</option>
                        <option value="CASH">Cash</option>
                    </select>
                </div>
            </Form.Group>
            <div className='mx-0 col-2 px-0 d-flex align-items-center mt-1'>
                <input type='checkbox' name='Repeat' value='Repeat' />
                <label for='Repeat' className='ps-2'>Reverse Charge</label>
            </div>
            <span className="col-12 mt-3" />
        </div >
  )
}

export default SalesInvoiceDetails

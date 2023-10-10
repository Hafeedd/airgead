import React from 'react'
import { Form } from 'react-bootstrap'

const SalesCustomerDetails = () => {
    return (
        < div className="col-8 col-9 mx-0 ps-4 pe-0 row" >
            <div className="col-7 mx-0 pe-0 row">
                <Form.Group className='col-5 mx-0 d-flex align-items-center ps-0'>
                    <Form.Label className='col-3 purchase-input-label'>Code</Form.Label>
                    <Form.Control
                        className='purchase-input-text'
                        placeholder='#######'
                        type='text'

                    />
                </Form.Group>
                <Form.Group className='col-7 mx-0 d-flex align-items-center pe-0'>
                    <Form.Label className='col-3 purchase-input-label'>Customer</Form.Label>
                    <Form.Control
                        className='purchase-input-text'
                        placeholder='Agencies'
                        type='text'
                    />
                </Form.Group>
                <div className="col-12 sales-customer-container row mx-0 my-1 py-3">
                    <p>
                        {`Bypass Road vizhinjanm, Thiruvanandapuram,
venjaramood.
Kerala 557896`}
                    </p>
                </div>

            </div>
            {/* Row 2 -------------------------------------------------------------------------------------------------------- */}
            <div className="col-5 ps-5 mx-0 pe-2 row">
                <Form.Group className='col-12 mx-0 d-flex align-items-center px-0 mt-1'>
                    <Form.Label className='col-3 purchase-input-label'>Mobile</Form.Label>
                    <Form.Control
                        className='purchase-input-text mobile'
                        type='number'

                    />
                </Form.Group>
                <Form.Group className='col-12 mx-0 d-flex align-items-center px-0 mt-1 mb-0'>
                    <Form.Label className='col-3 purchase-input-label'>GSTin</Form.Label>
                    <Form.Control
                        className='purchase-input-text'
                        type='text'
                    />
                </Form.Group>
                <Form.Group className='col-12 mx-0 d-flex align-items-center px-0 mt-1 mb-0'>
                    <Form.Label className='col-3 purchase-input-label'>C/O A/C</Form.Label>
                    <Form.Control
                        className='purchase-input-text'
                        type='text'
                    />
                </Form.Group>
                <Form.Group className='col-5 mx-0 d-flex align-items-center px-0 mt-1'>
                    <Form.Label className='col-5 purchase-input-label'>Cash/ Credit</Form.Label>
                    <div className='mx-0 col px-0'>
                        <select name='payment_type' className='customer-select w-100'>
                            <option value="CASH">Cash</option>
                            <option value="CASH">Cash</option>
                        </select>
                    </div>
                </Form.Group>
                <Form.Group className='col-7 mx-0 d-flex align-items-center mt-1 pe-0'>
                    <Form.Label className='col-3 purchase-input-label'>Due Date</Form.Label>
                    <Form.Control
                        className='purchase-input-date'
                        type='date'
                    />
                </Form.Group>
            </div>
        </div >
    )
}

export default SalesCustomerDetails

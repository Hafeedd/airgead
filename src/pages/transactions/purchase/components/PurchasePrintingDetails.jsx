import React from 'react'
import { Form } from 'react-bootstrap'

const PurchasePrintingDetails = () => {
    return (
        <div className='row mx-0 mb-1'>
            <Form.Group className='col-3 mx-0 d-flex align-items-center my-1'>
                <Form.Label className='col-3 col-4 purchase-input-label'>Doc No</Form.Label>
                <Form.Control
                    className='purchase-input-text'
                    type='text'
                />
            </Form.Group>
            <span className='col-2 col-3' />
            <Form.Group className='col-3 ps-4 mx-0 d-flex align-items-center my-1'>
                <Form.Label className='col-3 purchase-input-label'>Style</Form.Label>
                <Form.Control
                    className='purchase-input-text'
                    placeholder='A4 (21x30)'
                    type='text'
                />
            </Form.Group>
            <Form.Group className='col-3 col-4 mx-0 d-flex align-items-center my-1'>
                <Form.Label className='col-3 purchase-input-label'>Printer</Form.Label>
                <Form.Control
                    className='purchase-input-text'
                    placeholder='Epson LX454755'
                    type='text'
                />
            </Form.Group>
            <Form.Group className='col-3 mx-0 d-flex align-items-center my-1'>
                <Form.Label className='col-3 col-4 purchase-input-label'>Date</Form.Label>
                <Form.Control
                    className='purchase-input-text'
                    type='text'
                />
            </Form.Group>
            <span className='col-2 col-3' />
            <Form.Group className='col-2 ps-4 mx-0 d-flex align-items-center mt-1'>
                <Form.Label className='col-6 purchase-input-label'>Print Copies</Form.Label>
                <Form.Control
                    className='purchase-input-text'
                    placeholder='02'
                    type='number'
                />
            </Form.Group>
            <div className="col-4 col-5 d-flex align-items-center row mx-0 my-1">
                <div className='mx-0 px-0 col-3 col-4 d-flex align-items-center justify-content-start'>
                    <input type='checkbox' name='Repeat' value='Repeat' />
                    <label for='Repeat' className='px-2'>Preview</label>
                </div>
                <div className='mx-0 px-0 col-3 col-4 d-flex align-items-center justify-content-center'>
                    <input type='checkbox' name='Blocked' value='Blocked' />
                    <label for='Blocked' className='px-2'>Print</label>
                </div>
                <div className='mx-0 px-0 col-5 d-flex align-items-center justify-content-end'>
                    <input type='checkbox' name='Blocked' value='Blocked' />
                    <label for='Blocked' className='px-2'>Print Barcode</label>
                </div>
            </div>
            <Form.Group className='col-3 mx-0 d-flex align-items-center mt-1'>
                <Form.Label className='col-3 col-4 purchase-input-label'>Order No</Form.Label>
                <Form.Control
                    className='purchase-input-text'
                    type='text'
                />
            </Form.Group>
            <span className="col-6" />
            <div className='col-3 d-flex align-items-end justify-content-end'>
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
        </div>
    )
}

export default PurchasePrintingDetails

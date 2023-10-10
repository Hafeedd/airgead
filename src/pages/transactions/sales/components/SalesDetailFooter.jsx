import React from 'react'
import { Form } from 'react-bootstrap'

const SalesDetailFooter = () => {
  return (
    <div className='row mx-0 my-1 me-0'>
        <div className="col-5 col-6 ms-2 purchase-supplier-container row mx-0 mt-1 p-2">
            <div className="col-6 p-0 pe-1">
                <div className="col-12 sales-value-container px-0 row mx-0 my-0">
                    <Form.Group className='col-12 mx-0 d-flex align-items-center mt-1'>
                        <Form.Label className='col-4 purchase-input-label'>Sales Value</Form.Label>
                        <Form.Control
                            className='sales-input-text'
                            type='text'
                        />
                    </Form.Group>
                    <Form.Group className='col-12 mx-0 d-flex align-items-center mt-1'>
                        <Form.Label className='col-4 purchase-input-label'>CGST</Form.Label>
                        <Form.Control
                            className='sales-input-text'
                            type='text'
                        />
                    </Form.Group>
                    <Form.Group className='col-12 mx-0 d-flex align-items-center mt-1'>
                        <Form.Label className='col-4 purchase-input-label'>SGST</Form.Label>
                        <Form.Control
                            className='sales-input-text'
                            type='text'
                        />
                    </Form.Group>
                    <span className="col-12 mt-3" />
                </div>
            </div>
            <div className="col-6 p-0 ps-1">
                <div className="col-12 sales-value-container px-0 row mx-0 my-0">
                    <Form.Group className='col-12 mx-0 d-flex align-items-center mt-1'>
                        <Form.Label className='col-4 purchase-input-label'>Sales Value</Form.Label>
                        <Form.Control
                            className='sales-input-text'
                            type='text'
                        />
                    </Form.Group>
                    <Form.Group className='col-12 mx-0 d-flex align-items-center mt-1'>
                        <Form.Label className='col-4 purchase-input-label'>CGST</Form.Label>
                        <Form.Control
                            className='sales-input-text'
                            type='text'
                        />
                    </Form.Group>
                    <Form.Group className='col-12 mx-0 d-flex align-items-center mt-1'>
                        <Form.Label className='col-4 purchase-input-label'>SGST</Form.Label>
                        <Form.Control
                            className='sales-input-text'
                            type='text'
                        />
                    </Form.Group>
                    <span className="col-12 mt-3" />
                </div>
            </div>
        </div>
        <div className="col-3 row me-0 ps-5">
            <Form.Group className='col-12 mx-0 d-flex align-items-center mt-1'>
                <Form.Label className='col-5 purchase-input-label'>Discount</Form.Label>
                <Form.Control
                    className='purchase-input-text'
                    type='text'
                />
            </Form.Group>
            <Form.Group className='col-12 mx-0 d-flex align-items-center mt-1'>
                <Form.Label className='col-5 purchase-input-label'>Round Off</Form.Label>
                <Form.Control
                    className='purchase-input-text'
                    type='text'
                />
            </Form.Group>
            <Form.Group className='col-12 mx-0 d-flex align-items-center mt-1'>
                <Form.Label className='col-5 purchase-input-label'>Paid Cash</Form.Label>
                <Form.Control
                    className='purchase-input-text'
                    type='text'
                />
            </Form.Group>
            <Form.Group className='col-12 mx-0 d-flex align-items-center mt-1'>
                <Form.Label className='col-5 purchase-input-label'>Change Due</Form.Label>
                <Form.Control
                    className='purchase-input-text'
                    type='text'
                />
            </Form.Group>
        </div>
        <div className="col-3 col-4 purchase-total-container ps-3 pe-1 me-0">
            <div className="col-12 purchase-supplier-container row mx-0 mt-1 py-3">
                <div className="col-12 row mx-0 align-items-center">
                    <div className="col-1">Net</div>
                    <div className="col-1">:</div>
                    <div className="col-10"></div>
                </div>
                <div className="col-12 row mx-0 align-items-center">
                    <div className="col-1">Bal</div>
                    <div className="col-1">:</div>
                    <div className="col-10"></div>
                </div>
            </div>
            <div className="col-12 row px-0 mx-0 mt-3">
                <div className='mx-0 ps-0 pe-1 col-6'>
                    <button type='reset' className='btn btn-sm btn-outline-dark w-100'>Clear</button>
                </div>
                <div className='mx-0 ps-1 pe-0 col-6'>
                    <button type='submit' className='btn btn-sm btn-dark w-100'>Save</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SalesDetailFooter

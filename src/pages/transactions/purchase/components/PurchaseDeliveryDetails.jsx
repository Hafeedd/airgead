import React from 'react'
import { Form } from 'react-bootstrap'

const PurchaseDeliveryDetails = () => {
    return (
        <div className='row mx-0 mb-1'>
            <Form.Group className='col-3 mx-0 d-flex align-items-center my-1'>
                <Form.Label className='col-3 col-4 purchase-input-label'>Doc No</Form.Label>
                <Form.Control
                    className='purchase-input-text'
                    type='text'
                />
            </Form.Group>
            <span className='col-3' />
            <Form.Group className='col-3 ps-4 mx-0 d-flex align-items-center my-1'>
                <Form.Label className='col-4 purchase-input-label'>Vehicle No</Form.Label>
                <Form.Control
                    className='purchase-input-text'
                    type='text'
                />
            </Form.Group>
            <Form.Group className='col-3 mx-0 d-flex align-items-center my-1'>
                <Form.Label className='col-4 purchase-input-label'>Driver</Form.Label>
                <Form.Control
                    className='purchase-input-text'
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
            <span className='col-3' />
            <Form.Group className='col-3 ps-4 mx-0 d-flex align-items-center my-1'>
                <Form.Label className='col-4 purchase-input-label'>Project</Form.Label>
                <Form.Control
                    className='purchase-input-text'
                    type='text'
                />
            </Form.Group>
            <span className="col-3" />
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

export default PurchaseDeliveryDetails

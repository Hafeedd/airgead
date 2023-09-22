import React from 'react'
import { Form } from 'react-bootstrap'
import { FiEdit } from 'react-icons/fi'

const PurchaseDeliveryDetails = ({handleEdit}) => {
    return (
        <div className='row mx-0 mb-0'>
{/* Row 1 -------------------------------------------------------------------------------------------------------- */}
            <Form.Group className='col-3 mx-0 d-flex align-items-center my-1'>
                <Form.Label className='col-4 purchase-input-label'>Vehicle No</Form.Label>
                <Form.Control
                    className='purchase-input-text'
                    type='text'
                />
            </Form.Group>
            <Form.Group className='col-3 ps-4 mx-0 d-flex align-items-center my-1'>
                <Form.Label className='col-4 purchase-input-label'>Driver</Form.Label>
                <Form.Control
                    className='purchase-input-text'
                    type='text'
                />
            </Form.Group>
            <span className='col-2 col-3' />
            <Form.Group className='col-3 col-4 mx-0 d-flex align-items-center my-1'>
                <Form.Label className='col-3 col-4 purchase-input-label'>Doc No</Form.Label>
                <Form.Control
                    className='purchase-input-text'
                    type='text'
                />
            </Form.Group>
{/* Row 2 -------------------------------------------------------------------------------------------------------- */}
            <Form.Group className='col-3 mx-0 d-flex align-items-center my-1'>
                <Form.Label className='col-4 purchase-input-label'>Project</Form.Label>
                <Form.Control
                    className='purchase-input-text'
                    type='text'
                />
            </Form.Group>
            <span className='col-5 col-6' />
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
            <span className="col-5" />
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

export default PurchaseDeliveryDetails

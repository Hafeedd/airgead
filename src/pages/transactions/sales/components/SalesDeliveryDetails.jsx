import React from 'react'
import { Form } from 'react-bootstrap'

const SalesDeliveryDetails = () => {
  return (
    < div className="col-8 col-9 mx-0 ps-4 pe-0 row" >
        <div className="col-5 ps-3 mx-0 pe-2 row">
            <Form.Group className='col-12 mx-0 d-flex align-items-center px-0'>
                <Form.Label className='col-3 purchase-input-label'>Vehicle No</Form.Label>
                <Form.Control
                    className='purchase-input-text'
                    placeholder='KL 87 M <<<< '
                    type='text'

                />
            </Form.Group>
            <Form.Group className='col-12 mx-0 d-flex align-items-center px-0'>
                <Form.Label className='col-3 purchase-input-label'>Driver</Form.Label>
                <Form.Control
                    className='purchase-input-text'
                    placeholder='Name'
                    type='text'
                />
            </Form.Group>
            <span className="col-12 mt-5" />
        </div>
{/* Row 2 -------------------------------------------------------------------------------------------------------- */}

        <div className="col-7 mx-0 pe-2 ps-5 row mb-3">
            <div className="col-12 sales-delivery-container row mx-0 my-1 py-3">
                <div className="col-12 title">Address</div>
                <div className="col-12 py-0 px-1"><hr className='m-0' /></div>
                <p>
                    {`Bypass Road vizhinjanm, Thiruvanandapuram,
venjaramood.
Kerala 557896`}
                </p>
            </div>

        </div>
    </div>
  )
}

export default SalesDeliveryDetails

import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import useOnKey from '../../../../hooks/onKeyFunct/onKeyFunct'

const SalesDeliveryDetails = (props) => {
    const {salesAdd,setSalesAdd,handleChange} = props
    const [ref, setRef] = useState(null)

    const {handleKeyDown,formRef} = useOnKey(ref, setRef)

  return (
    < div ref={formRef} className="col-8 col-9 mx-0 ps-4 pe-0 row pt-1" >
        <div className="col-5 ps-3 mx-0 pe-2 row">
            <Form.Group className='col-12 mx-0 d-flex align-items-center px-0'>
                <Form.Label className='col-3 purchase-input-label'>Vehicle No</Form.Label>
                <Form.Control
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    className='purchase-input-text'
                    placeholder='KL 87 M <<<<'
                    type='text'
                    name='vehicle_no'
                    value={salesAdd?.vehicle_no||''}
                />
            </Form.Group>
            <Form.Group className='col-12 mx-0 d-flex align-items-center px-0'>
                <Form.Label className='col-3 purchase-input-label'>Driver</Form.Label>
                <Form.Control
                    className='purchase-input-text'
                    placeholder='Name'
                    type='text'
                    name='driver'
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    value={salesAdd?.driver||''}
                />
            </Form.Group>
            <span className="col-12 mt-5" />
        </div>
        
{/* Row 2 -------------------------------------------------------------------------------------------------------- */}

        <div className="col-7 mx-0 pe-2 ps-5 row mb-2">
            <div className="col-12 sales-delivery-container row mx-0 my-1 py-3">
                <div className="col-12 title">Address</div>
                <div className="col-12 py-0 px-1"><hr className='m-0'/></div>
                <textarea className='purchase-input-label textarea border-0' rows={3}
                onKeyDown={handleKeyDown}
                onChange={handleChange} name='delivery_address'
                value={salesAdd?.delivery_address||''}/>
            </div>

        </div>
    </div>
  )
}

export default SalesDeliveryDetails

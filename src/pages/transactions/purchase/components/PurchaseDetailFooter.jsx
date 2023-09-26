import React from 'react'
import { Form } from 'react-bootstrap'

const PurchaseDetailFooter = (props) => {
    const {handleEdit,purchaseAdd,handleChange} = props
    
    return (
        <div className='row mx-0 my-1 me-0'>
            <div className="col-3 col-4 row me-0">
                <Form.Group className='col-12 mx-0 d-flex align-items-center mt-1'>
                    <Form.Label className='col-5 purchase-input-label'>Discount</Form.Label>
                    <Form.Control
                    name="discount" value={purchaseAdd.discount||''}
                    onChange={handleChange}
                        className='purchase-input-text'
                        type='text'
                    />
                </Form.Group>
                <Form.Group className='col-12 mx-0 d-flex align-items-center mt-1'>
                    <Form.Label className='col-5 purchase-input-label'>Round Off</Form.Label>
                    <Form.Control
                    name="roundoff" value={purchaseAdd.roundoff||''}
                    onChange={handleChange}
                        className='purchase-input-text'
                        type='text'
                    />
                </Form.Group>
                <Form.Group className='col-12 mx-0 d-flex align-items-center mt-1'>
                    <Form.Label className='col-5 purchase-input-label'>Paid Cash</Form.Label>
                    <Form.Control
                    name="paid_cash" value={purchaseAdd.paid_cash||''}
                    onChange={handleChange}
                        className='purchase-input-text'
                        type='text'
                    />
                </Form.Group>
                <Form.Group className='col-12 mx-0 d-flex align-items-center mt-1'>
                    <Form.Label className='col-5 purchase-input-label'>Change Due</Form.Label>
                    <Form.Control
                    name="change_due" value={purchaseAdd.change_due||''}
                    onChange={handleChange}
                        className='purchase-input-text'
                        type='text'
                    />
                </Form.Group>
            </div>
            <div className="col-4 col-5 purchase-supplier-container row mx-0 mt-1">
                <div className="col-12 my-1 container-title">Supplier Details</div>
                <div className="col-12 row mx-0 align-items-center">
                    <div className="col-1">OB</div>
                    <div className="col-1">:</div>
                    <div className="col-10"></div>
                </div>
                <div className="col-12 row mx-0 align-items-center">
                    <div className="col-1">CB</div>
                    <div className="col-1">:</div>
                    <div className="col-10"></div>
                </div>
                <span className="col-12" style={{ height: "3rem" }} />
            </div>
            <div className="col-4 purchase-total-container pe-0 me-0">
                <div className="col-12 purchase-supplier-container row mx-0 mt-1 ">
                    <div className="col-12 row mx-0 align-items-center py-4">
                        <div className="col-1">Net</div>
                        <div className="col-1">:</div>
                        <div className="col-10"></div>
                    </div>
                </div>
                <div className="col-12 row px-0 mx-0 mt-3">
                    <div className='mx-0 px-0 col-4' />
                    <div className='mx-0 px-1 col-4'>
                        <button type='reset' className='btn btn-sm btn-outline-dark w-100'>Clear</button>
                    </div>
                    <div className='mx-0 px-1 pe-0 col-4'>
                        <button type='submit' className='btn btn-sm btn-dark w-100'>Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PurchaseDetailFooter

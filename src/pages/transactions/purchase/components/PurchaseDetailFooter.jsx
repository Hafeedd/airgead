import React from 'react'
import { Form } from 'react-bootstrap'

const PurchaseDetailFooter = (props) => {
    const {handleEdit,purchaseAdd,handleChange,
        handleKeyDown,handlePurchaseAllReset,edit} = props
    
    return (
        <div className='row mx-0 my-1 me-0'>
            <div className="col-3 col-4 row me-0">
                <Form.Group className='col-12 mx-0 d-flex align-items-center mt-1'>
                    <Form.Label className='col-5 purchase-input-label'>Discount</Form.Label>
                    <Form.Control
                    name="discount" value={purchaseAdd.discount||''}
                    onKeyDown={handleKeyDown}
                    onChange={handleChange}
                        className='purchase-input-text'
                        type='number'
                    />
                </Form.Group>
                <Form.Group className='col-12 mx-0 d-flex align-items-center mt-1'>
                    <Form.Label className='col-5 purchase-input-label'>Round Off</Form.Label>
                    <Form.Control
                    name="roundoff" value={purchaseAdd.roundoff||''}
                    onKeyDown={handleKeyDown}
                    onChange={handleChange}
                        className='purchase-input-text'
                        type='number'
                    />
                </Form.Group>
                <Form.Group className='col-12 mx-0 d-flex align-items-center mt-1'>
                    <Form.Label className='col-5 purchase-input-label'>Paid Cash</Form.Label>
                    <Form.Control
                    name="paid_cash" value={purchaseAdd.paid_cash||''}
                    onKeyDown={handleKeyDown}
                    onChange={handleChange}
                        className='purchase-input-text'
                        type='number'
                    />
                </Form.Group>
                <Form.Group className='col-12 mx-0 d-flex align-items-center mt-1'>
                    <Form.Label className='col-5 purchase-input-label'>Balance</Form.Label>
                    <Form.Control
                    name="change_due" value={purchaseAdd.change_due||''}
                    onKeyDown={handleKeyDown}
                    onChange={handleChange}
                        className='purchase-input-text'
                        type='number'
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
                </div>
                <span className="col-12 ms-1" style={{ height: "3rem" }}>
                <Form.Group className='col-2 col-10 mx-0 d-flex align-items-center mt-1 ms-2'>
                <Form.Label className='col-3 purchase-input-label'>Cash/ Credit</Form.Label>
                <div className='mx-0 col-9 px-0'>
                    <select onChange={handleChange} onKeyDown={handleKeyDown}
                    value={purchaseAdd.payment_type||'CASH'}
                    name='payment_type' className='customer-select bg-dark text-light w-100'>
                        <option value="CASH">CASH</option>
                        <option value="CREDIT">CREDIT</option>
                    </select>
                </div>
            </Form.Group>
                </span>
            </div>
            <div className="col-4 purchase-total-container pe-0 me-0">
                <div className="col-12 purchase-supplier-container row mx-0 mt-1 ">
                    <div className="col-12 row mx-0 align-items-center py-4">
                        <div className="row col-12">Net:
                        <span className='col-11 text-danger fs-3 align-items-center text-center'>
                            {purchaseAdd.total_amount||"0.00"}</span></div>
                        {/* <div className="col-1">:</div>
                        <div className="col-10"></div> */}
                    </div>
                </div>
                <div className="col-12 row px-0 mx-0 mt-3">
                    <div className='mx-0 px-0 col-4' />
                    <div className='mx-0 px-1 col-4'>
                        <button type='reset' onClick={handlePurchaseAllReset}
                        className='btn btn-sm btn-outline-dark w-100'>Clear</button>
                    </div>
                    <div className='mx-0 px-1 pe-0 col-4'>
                        <button type='submit' className='btn btn-sm btn-dark w-100'>
                            {edit?"Update":"Save"}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PurchaseDetailFooter

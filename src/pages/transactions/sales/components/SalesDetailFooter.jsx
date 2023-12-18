import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import useOnKey from '../../../../hooks/onKeyFunct/onKeyFunct'

const SalesDetailFooter = (props) => {
    const {salesAdd, setSalesAdd, 
        handleKeyDown,handleChange,edit,
        handleSubmit,handleSalesAllReset} = props

    const salseReturn = false

  return (
    <div className='row mx-0 my-1 me-0'>
        <div className="col-5 col-6 ms-2 purchase-supplier-container row mx-0 mt-1 p-2">
            <div className={`${salseReturn?"col-5 col-6":"col-12"} col-6 p-0 pe-1`}>
                <div className="col-12 sales-value-container px-0 row mx-0 my-0 align-items-center d-flex py-3">
                    <Form.Group className='col-12 mx-0 d-flex align-items-center'>
                        <Form.Label className='col-4 purchase-input-label'>Sales Value</Form.Label>
                        <Form.Control
                            disabled
                            value={salesAdd?.total_value||''}
                            className='sales-input-text'
                            type='text'
                        />
                    </Form.Group>
                    <Form.Group className='col-12 mx-0 d-flex align-items-center mt-1'>
                        <Form.Label className='col-4 purchase-input-label'>CGST</Form.Label>
                        <Form.Control
                            disabled
                            value={salesAdd?.total_sgst||''}
                            className='sales-input-text'
                            type='text'
                        />
                    </Form.Group>
                    <Form.Group className='col-12 mx-0 d-flex align-items-center mt-1'>
                        <Form.Label className='col-4 purchase-input-label'>SGST</Form.Label>
                        <Form.Control
                            disabled
                            value={salesAdd?.total_sgst||''}
                            className='sales-input-text'
                            type='text'
                        />
                    </Form.Group>
                </div>
            </div>
            {salseReturn&&<div className="col-6 p-0 ps-1">
                <div className="col-12 sales-value-container px-0 row mx-0 my-0">
                    <Form.Group className='col-12 mx-0 d-flex align-items-center mt-1'>
                        <Form.Label className='col-4 purchase-input-label'>Return Value</Form.Label>
                        <Form.Control
                            disabled
                            value={salesAdd.return_value||''}
                            className='sales-input-text'
                            type='text'
                        />
                    </Form.Group>
                    <Form.Group className='col-12 mx-0 d-flex align-items-center mt-1'>
                        <Form.Label className='col-4 purchase-input-label'>CGST</Form.Label>
                        <Form.Control
                            disabled
                            value={salesAdd.return_cgst_sgst||''}
                            className='sales-input-text'
                            type='text'
                        />
                    </Form.Group>
                    <Form.Group className='col-12 mx-0 d-flex align-items-center mt-1'>
                        <Form.Label className='col-4 purchase-input-label'>SGST</Form.Label>
                        <Form.Control
                            disabled
                            value={salesAdd.return_cgst_sgst||''}
                            className='sales-input-text'
                            type='text'
                        />
                    </Form.Group>
                    <span className="col-12 mt-3" />
                </div>
            </div>}
        </div>
        <div className="col-3 row me-0 ps-5">
            <Form.Group className='col-12 mx-0 d-flex align-items-center mt-1'>
                <Form.Label className='col-5 purchase-input-label'>Discount</Form.Label>
                <Form.Control
                    onKeyDown={handleKeyDown}
                    name="discount"
                    value={salesAdd.discount||''}
                    onChange={handleChange}
                    className='purchase-input-text'
                    type='text'
                />
            </Form.Group>
            <Form.Group className='col-12 mx-0 d-flex align-items-center mt-1'>
                <Form.Label className='col-5 purchase-input-label'>Round Off</Form.Label>
                <Form.Control
                    onKeyDown={handleKeyDown}
                    name="roundoff"
                    value={salesAdd.roundoff||''}
                    onChange={handleChange}
                    className='purchase-input-text'
                    type='text'
                />
            </Form.Group>
            <Form.Group className='col-12 mx-0 d-flex align-items-center mt-1'>
                <Form.Label className='col-5 purchase-input-label'>Paid Cash</Form.Label>
                <Form.Control
                    onKeyDown={handleKeyDown}
                    name="paid_cash"
                    value={salesAdd.paid_cash||''}
                    onChange={handleChange}
                    className='purchase-input-text'
                    type='text'
                />
            </Form.Group>
            <Form.Group className='col-12 mx-0 d-flex align-items-center mt-1'>
                <Form.Label className='col-5 purchase-input-label'>Change Due</Form.Label>
                <Form.Control
                    onKeyDown={handleKeyDown}
                    name="change_due"
                    value={salesAdd.change_due||''}
                    onChange={handleChange}
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
                    <div className="col-10 fs-4 text-danger">{salesAdd.total_amount||''}</div>
                </div>
                <div className="col-12 row mx-0 align-items-center">
                    <div className="col-1">Bal</div>
                    <div className="col-1">:</div>
                    <div className="col-10"></div>
                </div>
            </div>
            <div className="col-12 row px-0 mx-0 mt-3">
                <div className='mx-0 ps-0 pe-1 col-6'>
                    <button type='reset' onClick={handleSalesAllReset} 
                    className='btn btn-sm btn-outline-dark w-100'>Clear</button>
                </div>
                <div className='mx-0 ps-1 pe-0 col-6'>
                    <button onClick={handleSubmit} type='submit' 
                    className='btn btn-sm btn-dark w-100'>{edit?"Update":"Save"}</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SalesDetailFooter

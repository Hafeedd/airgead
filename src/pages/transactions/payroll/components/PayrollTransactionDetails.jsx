import React from 'react'
import { Form } from 'react-bootstrap';

import { MdMovieEdit } from "react-icons/md";
const PayrollTransactionDetails = () => {
  return (
    <div>
        <div>Payroll</div>
        <div className='col-12 d-flex justify-content-between align-items-center px-0 mx-0'>
            <Form.Group className="col-4 col-3 pe-4 ps-0 mx-0 d-flex align-items-start mt-1">
            <Form.Label className="col-2 purchase-input-label pb-1">
                Doc no.
            </Form.Label>
            <Form.Control
                // onChange={handleChange}
                required
                name="code"
                // value={stockJAdd.code || ""}
                className="purchase-input-text me-2"
                placeholder="Document number"
                type="text"
            />
            <div
                // onClick={() => setShowJournalFilter(true)}
                className="col-1 col-2 p-1 bg-dark rounded-1 btn py-0 text-light "
            >
                <MdMovieEdit size={18} className="mb-1" />
            </div>
            </Form.Group>
            <Form.Group className="col-4 col-3 pe-4 ps-0 mx-0 d-flex align-items-start mt-1">
            <Form.Label className="col-2 purchase-input-label pb-1">
                Date
            </Form.Label>
            <Form.Control
                // onChange={handleChange}
                required
                name="date"
                // value={
                //   stockJAdd.date || !edit
                //     ? new Date().toISOString().slice(0, 10)
                //     : ""
                // }
                className="purchase-input-text me-2"
                placeholder="Document number"
                type="date"
            />
            </Form.Group>
            <Form.Group className="col-4 col-3 pe-4 ps-0 mx-0 d-flex align-items-start mt-1">
            <Form.Label className="col-2 purchase-input-label pb-1">
                Staff
            </Form.Label>
            <Form.Control
                // onChange={handleChange}
                required
                name="salesman"
                // value={stockJAdd.salesman || ""}
                className="purchase-input-text me-2"
                placeholder="staff"
                type="text"
            />
            </Form.Group>
        </div>
        <div className='mt-3'>Salary Date Allocation</div>
        <div>
            
        </div>

    </div>
    

  )
}

export default PayrollTransactionDetails
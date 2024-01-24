import React, { useState } from 'react'
import { Form } from 'react-bootstrap'

const SalesPrintingDetails = () => {
    const [printStyles, setPrintStyles] = useState(localStorage.getItem('printType')||'A4_normal')

    const handlePrintStyleChange = (e) =>{
        localStorage.setItem('printType',e.target.value)
        setPrintStyles(e.target.value)
    }
    return (
        < div className="col-12 mx-0 ps-5 pe-0 row" >
            <Form.Group className='col-5 mx-0 d-flex align-items-center my-1'>
                <Form.Label className='col-3 purchase-input-label'>Style</Form.Label>
                <Form.Select
                    className='purchase-input-text'
                    placeholder='A4 (21x30)'
                    onChange={handlePrintStyleChange}
                    type='text'
                    value={printStyles}
                >
                    <option value={"A4_normal"}>A4 Normal</option>
                    <option value={"A4_normal_2"}>A4 Normal 2</option>
                    <option value={"thermal"}>Thermal</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className='col-7 ps-4 mx-0 d-flex align-items-center my-1'>
                <Form.Label className='col-3 purchase-input-label'>Printer</Form.Label>
                <Form.Control
                    className='purchase-input-text'
                    placeholder='Epson LX454755'
                    type='text'
                />
            </Form.Group>
            {/* Row 2 -------------------------------------------------------------------------------------------------------- */}

            <Form.Group className='col-5 mx-0 d-flex align-items-center mt-1'>
                <Form.Label className='col-4 purchase-input-label'>Print Copies</Form.Label>
                <Form.Control
                    className='purchase-input-text'
                    placeholder='02'
                    type='number'
                />
                <span className="col-2" />
            </Form.Group>
            <div className="col-7 d-flex align-items-center row mx-0 my-1">
                <div className='mx-0 pe-0 col-4 d-flex align-items-center justify-content-start'>
                    <input type='checkbox' name='Repeat' value='Repeat' />
                    <label for='Repeat' className='ps-2'>Preview</label>
                </div>
                <div className='mx-0 px-0 col-3 d-flex align-items-center justify-content-end'>
                    <input type='checkbox' name='Blocked' value='Blocked' />
                    <label for='Blocked' className='ps-2'>Print</label>
                </div>
                <div className='mx-0 px-0 col-5 d-flex align-items-center justify-content-end'>
                    <input type='checkbox' name='Blocked' value='Blocked' />
                    <label for='Blocked' className='ps-2'>Print Barcode</label>
                </div>
            </div>
            <span className="col-12 mt-3" />
        </div>
    )
}

export default SalesPrintingDetails

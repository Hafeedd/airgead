import React from 'react'
import '../cashbook.css'
import { TfiEmail, TfiPrinter } from "react-icons/tfi";
import {BsWhatsapp, BsFiletypePdf } from 'react-icons/bs'
import { RiFileExcel2Line } from "react-icons/ri";
import { Form } from 'react-bootstrap';

const CashBookEntry = () => {
  return (
    <div>
        <div className='row mt-3 ms-1'>
            <div className='reports-btn btn bg-secondary col-1 ms-3 me-3 py-0 text-white  '>
                <BsFiletypePdf className='me-2 ' size={18} />
                PDF
            </div>

            <div className='reports-btn btn bg-secondary col-1 ms-3 me-3 text-white  '>
                <RiFileExcel2Line  className='me-2 ' size={18}/>
                Excel
            </div>

            <div className='reports-btn btn bg-secondary col-1 ms-3 me-3 text-white  '>
                <TfiPrinter className='me-2 ' size={18}/>
                Print
            </div>

            <div className='reports-btn btn bg-secondary col-1 ms-3 me-3 text-white  '>
                <TfiEmail className='me-2 ' size={18}/>
                Email
            </div>

            <div className='reports-btn btn bg-secondary col-1 ms-3 me-3 text-white  '>
                <BsWhatsapp className='me-2 ' size={18}/>
                Whatsapp
            </div>
        </div>

        <div className='row mt-3 ms-3'>
            <div className=' d-flex col-3'>
                <Form.Group className='row  ' >
                    <Form.Label className='col-1 me-1 mt-1 ' >
                        From
                    </Form.Label>
                    <Form.Control
                        className='cashbook-input col-5 ms-5'
                        type="date">
                    </Form.Control>
                </Form.Group>
                
            </div>
            <div className='row d-flex col-4 '>
                <Form.Group className='row ' >
                    <Form.Label className='col-1 me-1 mt-1 ' >
                        To
                    </Form.Label>
                    <Form.Control
                        className='cashbook-input col-5 ms-4 '
                        type="date">
                    </Form.Control>
                </Form.Group>
            </div>
        </div>
    </div>
  )
}

export default CashBookEntry
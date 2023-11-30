import React from 'react'
import { Form } from 'react-bootstrap'
import { TfiEmail, TfiPrinter } from "react-icons/tfi";
import { BsWhatsapp, BsFiletypePdf } from 'react-icons/bs'
import { RiFileExcel2Line } from "react-icons/ri";

const ProfitWiseEntry = (props) => {

    const { params, setParams } = props

    const handleChange = (e) => {
        if (e.target.value === "") {
            setParams({ ...params, [e.target.name]: null })
        }
        else {
            setParams({ ...params, [e.target.name]: e.target.value })
        }
    }
    return (
        <div>
            <div className="col-12 mt-2 ms-3 d-flex justify-content-start">
                <div
                    style={{ background: "#4B4B4B" }}
                    className="reports-btn btn rounded-1 col-1 col-2 py-0 me-3"
                >
                    <BsFiletypePdf className="me-2 text-" size={18} />
                    PDF
                </div>
                <div
                    style={{ background: "#4B4B4B" }}
                    className="reports-btn btn rounded-1 col-1 col-2 py-0 me-3"
                >
                    <RiFileExcel2Line className="me-2" size={18} />
                    Excel
                </div>
                <div
                    style={{ background: "#4B4B4B" }}
                    className="reports-btn btn rounded-1 col-1 col-2 py-0 me-3"
                >
                    <TfiPrinter size={18} className="me-2 h-100" />
                    Print
                </div>
                <div
                    style={{ background: "#4B4B4B" }}
                    className="reports-btn btn rounded-1 col-1 col-2 py-0 me-3"
                >
                    <TfiEmail size={18} className="me-2 h-100" />
                    Email
                </div>
                <div
                    style={{ background: "#4B4B4B" }}
                    className="reports-btn btn rounded-1 col-1 col-2 py-0"
                >
                    <BsWhatsapp size={18} className="me-2 h-100" />
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
                            name="from_date"
                            onChange={handleChange}
                            value={params.from_date || new Date().toISOString(0, 10)}
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
                            name="to_date"
                            onChange={handleChange}
                            value={params.to_date || new Date().toISOString(0, 10)}
                            className='cashbook-input col-5 ms-4 '
                            type="date">
                        </Form.Control>
                    </Form.Group>
                </div>
            </div>
        </div>
    )
}

export default ProfitWiseEntry
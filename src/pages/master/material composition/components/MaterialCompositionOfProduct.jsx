import React from 'react'
import { Form } from 'react-bootstrap';
import { BsFiletypePdf, BsWhatsapp } from "react-icons/bs";
import { RiFileExcel2Line } from "react-icons/ri";
import { TfiEmail, TfiPrinter } from "react-icons/tfi";
import SearchDropDown from '../../../../components/searchDropDown/SearchDropDown';
const MaterialCompositionOfProduct = () => {
    return (
        <div className="px-0">
            <div className="d-flex row mx-0 justify-content-start align-items-center">
                <div className="col-12 mt-1 d-flex justify-content-start px-0">
                    <div
                        style={{ background: "#4B4B4B" }}
                        className="reports-btn btn rounded-1 col-1 col-2 py-0 me-3 mx-0"
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
            </div>
            <div>

                <div className="col-6 col-7 border-2 pe-5 mt-3">
                    <Form.Group className="col-11 pe-4 ps-0 mx-0 d-flex align-items-start mt-1">
                        <Form.Label className="col-2 purchase-input-label pb-1">
                            Type
                        </Form.Label>
                        {/* <div className="purchase-input-text op-stock-dropdown me-1 w-100">
                            <SearchDropDown
                                // id="company"
                                // noAdd={true}
                                options={'propertyList'}
                                // {...{ showDropdown, setShowDropdown, handleKeyDown }}
                                // setDataValue={setFilter}
                                 selectedValue={'filter'}
                            />
                        </div> */}
                        <div>
                            <input type="text" className='rounded  mx-2 border w-100 '/>
                        </div>
                    </Form.Group>
                </div>
                <div className='col-12 d-flex'>
                <div className="col-6 col-7  border-2 pe-5">
                    <Form.Group className="col-11 pe-4 ps-0 mx-0 d-flex align-items-start mt-2">
                        <Form.Label className="col-2 purchase-input-label pb-1">
                            Item
                        </Form.Label>
                        {/* <div className="purchase-input-text op-stock-dropdown a b c me-1 w-100">
                            <SearchDropDown
                                // id="category"
                                // noAdd={true}
                                options={'n'}
                                // {...{ showDropdown, setShowDropdown, handleKeyDown }}
                                // setDataValue={setFilter}
                                selectedValue={'filter'}
                            />
                        </div> */}
                        <div>
                            <input type="text" className='rounded  mx-2 border w-100 '/>
                        </div>
                    </Form.Group>
                </div>
                <div className='col-5 col-6 '>
                    <Form.Group className="col-6 pe-4 ps-0 mx-0 d-flex align-items-start mt-2">
                        <Form.Label className="col-2 purchase-input-label pb-1">
                            Qty 
                        </Form.Label>
                        <div>
                            <input type="text" className='rounded  mx-2 border'/>
                        </div>  
                     </Form.Group>
                </div>
                </div>
                <div className='col-12 d-flex mt-2'>
                        <div className='col-6 px-1 '>
                            <div className='mx-0 TabHead border-bottom py-3  text-center rounded-top'>Quantity of a material used</div>
                            <table className='materials w-100'>
                                <thead className='text-light'>
                                    <tr>
                                        <th>Raw material</th>
                                        <th>Qty</th>
                                        <th>Unit</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                <tr>
                                        <td>Item Name</td>
                                        <td>Qty</td>
                                        <td>kg</td>
                                        <td>del</td>
                                    </tr>
                                    <tr>
                                        <td>Item Name</td>
                                        <td>Qty</td>
                                        <td>kg</td>
                                        <td>del</td>
                                    </tr>
                                    <tr>
                                        <td>Item Name</td>
                                        <td>Qty</td>
                                        <td>kg</td>
                                        <td>del</td>
                                    </tr>
                                    <tr>
                                        <td>Item Name</td>
                                        <td>Qty</td>
                                        <td>kg</td>
                                        <td>del</td>
                                    </tr>
                                </tbody>
                                    
                            </table>
                        </div>
                        <div className='col-6'>
                            <div className='mx-0 TabHead text-center border-bottom  py-3 w-100 rounded-top'>By product in the production</div>
                        <table className='materials w-100'>
                                <thead className='text-light'>
                                    <tr>
                                        <th>Raw material</th>
                                        <th>Qty</th>
                                        <th>Unit</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                <tr>
                                        <td>Item Name</td>
                                        <td>Qty</td>
                                        <td>kg</td>
                                        <td>del</td>
                                    </tr>
                                    <tr>
                                        <td>Item Name</td>
                                        <td>Qty</td>
                                        <td>kg</td>
                                        <td>del</td>
                                    </tr>
                                    <tr>
                                        <td>Item Name</td>
                                        <td>Qty</td>
                                        <td>kg</td>
                                        <td>del</td>
                                    </tr>
                                    <tr>
                                        <td>Item Name</td>
                                        <td>Qty</td>
                                        <td>kg</td>
                                        <td>del</td>
                                    </tr>
                                </tbody>
                                    
                            </table>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default MaterialCompositionOfProduct
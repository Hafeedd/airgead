import React, { useState } from 'react'

const SupplierAdd = () => {
    const [pageHeadItem, setPageHeadItem] = useState(1)

    return (
        <div className='item_add'>
            <div className="page_head ps-4 mt-1 mb-3">
                <div className='fw-600 fs-5'>Master Supplier</div>
                <div className='page_head_items mb-3'>
                    <div onClick={() => setPageHeadItem(1)} className={`page_head_item ${pageHeadItem === 1 && "active"}`}>Add Supplier</div>
                </div>
            </div>
            <div className='item_add_cont'>
                Add New Supplier
                <div className='item_add_form pt-1 d-flex mt-1'>

                    {/* item details --------------------------------------------------------------------------------------- */}

                    <div className='item_add_form_part1 col-6 row mx-0 px-0'>

                        <div className="d-flex align-items-center ps-0 row mx-0 pe-5 my-2">
                            <div className='mx-0 px-0 col-5 col-6'>
                                Code
                            </div>
                            <div className='mx-0 px-0 col-6 col-7'>
                                <input type='text' className='item_input names' />
                            </div>
                        </div>
                        <div className="d-flex align-items-center ps-0 row mx-0 pe-5 my-2">
                            <div className='mx-0 px-0 col-5 col-6'>
                                Name
                            </div>
                            <div className='mx-0 px-0 col-6 col-7'>
                                <input type='text' className='item_input names' />
                            </div>
                        </div>
                        <div className="d-flex align-items-center ps-0 row mx-0 pe-5 my-2">
                            <div className='mx-0 px-0 col-5 col-6'>
                                Address
                            </div>
                            <div className='mx-0 px-0 col-6 col-7'>
                                <textarea rows={4} className='item_input names' />
                            </div>
                        </div>
                        <div className="d-flex align-items-center ps-0 row mx-0 pe-5 my-2">
                            <div className="col-5 col-6 row mx-0 px-0">
                                <div className='mx-0 px-0 col-5'>
                                    Post
                                </div>
                                <div className='mx-0 px-0 col-7'>
                                    <input type='text' className='item_input names' />
                                </div>
                            </div>
                            <div className="col-6 col-7 row ps-5 mx-0 px-0">
                                <div className='mx-0 px-0 col-5'>
                                    Pin
                                </div>
                                <div className='mx-0 px-0 col-7'>
                                    <input type='text' className='item_input names' />
                                </div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center ps-0 row mx-0 pe-5 my-2">
                            <div className="col-5 col-6 row mx-0 px-0">
                                <div className='mx-0 px-0 col-5'>
                                    Contact Person
                                </div>
                                <div className='mx-0 px-0 col-7'>
                                    <input type='text' className='item_input names' />
                                </div>
                            </div>
                            <div className="col-6 col-7 row ps-5 mx-0 px-0">
                                <div className='mx-0 px-0 col-5'>
                                    PIN Distance
                                </div>
                                <div className='mx-0 px-0 col-7'>
                                    <input type='text' className='item_input names' />
                                </div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center ps-0 row mx-0 pe-5 my-2">
                            <div className='mx-0 px-0 col-5 col-6'>
                                Email
                            </div>
                            <div className='mx-0 px-0 col-6 col-7'>
                                <input type='text' className='item_input names' />
                            </div>
                        </div>
                        <div className="d-flex align-items-center ps-0 row mx-0 pe-5 my-2">
                            <div className='mx-0 px-0 col-5 col-6'>
                                Mob
                            </div>
                            <div className='mx-0 px-0 col-6 col-7'>
                                <input type='text' className='item_input names' />
                            </div>
                        </div>
                        <div className="d-flex align-items-center ps-0 row mx-0 pe-5 my-2">
                            <div className='mx-0 px-0 col-5 col-6'>
                                GSTin
                            </div>
                            <div className='mx-0 px-0 col-6 col-7'>
                                <input type='text' className='item_input names' />
                            </div>
                        </div>
                        <div className="d-flex align-items-center ps-0 row mx-0 pe-5 my-2">
                            <div className='mx-0 px-0 col-5 col-6'>
                                GSTin
                            </div>
                            <div className='mx-0 px-0 col-6 col-7'>
                                <input type='text' className='item_input names' />
                            </div>
                        </div>
                        <div className="d-flex align-items-center ps-0 row mx-0 pe-5 my-2">
                            <div className="col-5 col-6 row mx-0 px-0">
                                <div className='mx-0 px-0 col-5'>
                                    Disc %
                                </div>
                                <div className='mx-0 px-0 col-7'>
                                    <input type='text' className='item_input names' />
                                </div>
                            </div>
                            <div className="col-6 col-7 row ps-5 mx-0 px-0">
                                <div className='mx-0 px-0 col-5'>
                                    Op Balance
                                </div>
                                <div className='mx-0 px-0 col-7'>
                                    <input type='text' className='item_input names' />
                                </div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center ps-0 row mx-0 pe-4 my-2">
                            <div className='mx-0 px-0 col-9' />
                            <div className='mx-0 col-3 px-0'>
                                <select placeholder='To Give' className='customer-select'>
                                    <option value="">OPTION1</option>
                                    <option value="">OPTION2</option>
                                    <option value="">OPTION3</option>
                                    <option value="">OPTION4</option>
                                    <option value="">OPTION5</option>
                                </select>
                            </div>
                            {/* <div className='mx-0 px-0 col-3'>
                                <div className='btn btn-sm btn-dark px-4 w-100 rates-btn'>Set Rates</div>
                            </div> */}
                        </div>

                    </div>

                    {/* item rate ----------------------------------------------------------------------------------------------------------- */}

                    <div className='item_add_form_part2 row mx-0 px-0 me-0 col-6 border-0'>

                        {/* <div className="d-flex align-items-center row mx-0 ps-4 pe-3 my-2">
                            <div className='mx-0 px-0 col-4'>
                                Route
                            </div>
                            <div className='mx-0 px-0 col-8'>
                                <input type='text' className='item_input names' />
                            </div>
                        </div>
                        <div className="d-flex align-items-center row mx-0 ps-4 pe-3 my-2">
                            <div className='mx-0 px-0 col-4'>
                                City
                            </div>
                            <div className='mx-0 px-0 col-8'>
                                <input type='text' className='item_input names' />
                            </div>
                        </div>
                        <div className="d-flex align-items-center row mx-0 ps-4 pe-3 my-2">
                            <div className='mx-0 px-0 col-4'>
                                Town
                            </div>
                            <div className='mx-0 px-0 col-8'>
                                <input type='text' className='item_input names' />
                            </div>
                        </div> */}
                        <div className="d-flex align-items-center row mx-0 ps-4 pe-3 my-2">
                            <div className='mx-0 px-0 col-4'>
                                District
                            </div>
                            <div className='mx-0 px-0 col-8'>
                                <input type='text' className='item_input names' />
                            </div>
                        </div>
                        <div className="d-flex align-items-center row mx-0 ps-4 pe-3 my-2">
                            <div className='mx-0 px-0 col-4'>
                                Company
                            </div>
                            <div className='mx-0 px-0 col-8'>
                                <input type='text' className='item_input names' />
                            </div>
                        </div>
                        {/* <div className="d-flex align-items-center row mx-0 ps-4 pe-3 my-2">
                            <div className='mx-0 px-0 col-4'>
                                Rate Type
                            </div>
                            <div className='mx-0 px-0 col-8'>
                                <input type='text' className='item_input names' />
                            </div>
                        </div>
                        <div className="d-flex align-items-center row mx-0 ps-4 pe-3 my-2">
                            <div className='mx-0 px-0 col-4'>
                                Bill Type
                            </div>
                            <div className='mx-0 px-0 col-8'>
                                <input type='text' className='item_input names' />
                            </div>
                        </div> */}
                        <div className="d-flex align-items-center row mx-0 ps-4 pe-3 my-2">
                            <div className='mx-0 px-0 col-4'>
                                Remarks
                            </div>
                            <div className='mx-0 px-0 col-8'>
                                <textarea rows={3} className='item_input names' />
                            </div>
                        </div>
                        <div className="d-flex align-items-center row mx-0 ps-4 pe-3 my-2">
                            <div className='mx-0 px-0 col-4 d-flex align-items-center'>
                                <input type='checkbox' name='Repeat' value='Repeat' />
                                <label for='Repeat' className='px-2'>Repeat</label>
                            </div>
                            <div className='mx-0 px-0 ps-4 col-8 d-flex align-items-center'>
                                <input type='checkbox' name='Blocked' value='Blocked' />
                                <label for='Blocked' className='px-2'>Blocked</label>
                            </div>
                        </div>
                        <div className="bottom-btn-section-2 row px-0 ms-3 mx-0 my-2">
                            <div className='mx-0 px-0 col-4' />
                            <div className='mx-0 px-1 col-4'>
                                <div className='btn btn-sm btn-outline-dark w-100'>Clear</div>
                            </div>
                            <div className='mx-0 px-1 col-4'>
                                <div className='btn btn-sm btn-dark w-100'>Save</div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default SupplierAdd

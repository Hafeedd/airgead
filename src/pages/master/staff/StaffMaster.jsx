import React, { useState } from 'react'
import './StaffMaster.css'
import { useNavigate } from 'react-router'


const StaffMaster = () => {
    // const [pageHeadItem, setPageHeadItem] = useState(1)
    const navigate = useNavigate()
    return (
        <div className='item_add'>
            <div className="itemList_header row mx-0">
                <div className="page_head ps-4 d-flex pe-0">
                    <div className='col-6'>
                        <div className='fw-50 fs-6'>Add New Staff</div>
                        <div className='page_head_items mb-3'>
                            <div onClick={() => { navigate('/staff-master') }} className={`page_head_item active`}>General</div>
                            <div onClick={() => { navigate('/staff-master') }} className={`page_head_item`}>Educational</div>
                            <div onClick={() => { navigate('/staff-master') }} className={`page_head_item`}>Professional</div>
                            <div onClick={() => { navigate('/staff-master') }} className={`page_head_item`}>Detail Pay-Scale</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='item_add_cont'>
                <form onSubmit={''} className='item_add_form pt-1 d-flex mt-1'>
                    <div className='item_add_form_part1 col-6 col-7 row mx-0 px-0'>

                        <div className="d-flex align-items-center ps-0 row mx-0 my-2">
                            <div className="col-6 row mx-0 ps-0 pe-1">
                                <div className='mx-0 px-0 col-3 col-4'>
                                    Code
                                </div>
                                <div className='mx-0 px-0 col-8 col-9'>
                                    <input onChange={''} name='code' value={''} type='text' className='item_input ms-0' />
                                </div>
                            </div>
                            <div className="col-6 row mx-0 px-2">
                                <div className='mx-0 px-0 col-4'>
                                    Gender
                                </div>
                                <div className='mx-0 px-0 col-8'>
                                    <input onChange={''} name='pin' value={''} type='text' className='item_input ms-0' />
                                </div>
                            </div>
                        </div>

                        <div className="d-flex align-items-center ps-0 row mx-0 my-2">
                            <div className="col-6 row mx-0 ps-0 pe-1">
                                <div className='mx-0 px-0 col-3 col-4'>
                                    Name
                                </div>
                                <div className='mx-0 px-0 col-8 col-9'>
                                    <input onChange={''} name='code' value={''} type='text' className='item_input ms-0' />
                                </div>
                            </div>
                            <div className="col-6 row mx-0 px-2">
                                <div className='mx-0 px-0 col-4'>
                                    Phone
                                </div>
                                <div className='mx-0 px-0 col-8'>
                                    <input onChange={''} name='pin' value={''} type='text' className='item_input ms-0' />
                                </div>
                            </div>
                        </div>

                        <div className="d-flex align-items-center ps-0 row mx-0 my-2">
                            <div className="col-6 d-flex align-items-center px-0 row pe-1 mx-0 my-2">
                                <div className="col-12 row mx-0 px-0 align-items-center">
                                    <div className='mx-0 px-0 col-3 col-4'>
                                        Address
                                    </div>
                                    <div className='mx-0 px-0 col-8 col-9'>
                                        <textarea onChange={''} name='code' value={''} className='item_input ms-0' rows={3} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 d-flex align-items-center px-2 row mx-0 my-2">
                                <div className="col-12 row mx-0 px-0 my-1">
                                    <div className='mx-0 px-0 col-4'>
                                        Join Date
                                    </div>
                                    <div className='mx-0 px-0 col-8'>
                                        <input onChange={''} name='code' value={''} type='date' className='item_input ms-0' />
                                    </div>
                                </div>
                                <div className="col-12 row mx-0 px-0 my-1">
                                    <div className='mx-0 px-0 col-4'>
                                        Dob
                                    </div>
                                    <div className='mx-0 px-0 col-8'>
                                        <input onChange={''} name='code' value={''} type='date' className='item_input ms-0' />
                                    </div>
                                </div>
                            </div>
                        </div> 

                        <div className="d-flex align-items-center ps-0 row mx-0 my-2">
                            <div className="col-6 row mx-0 ps-0 pe-1">
                                <div className='mx-0 px-0 col-3 col-4'>
                                    Email
                                </div>
                                <div className='mx-0 px-0 col-8 col-9'>
                                    <input onChange={''} name='code' value={''} type='text' className='item_input ms-0' />
                                </div>
                            </div>
                            <div className="col-6 row mx-0 px-2">
                                <span className="col-4" />
                                <div className='mx-0 px-0 col-8'>
                                    <div onChange={''} name='pin' value={''} type='text' placeholder='Upload Image' className='btn btn-outline-dark btn-sm upload-btn px-4 py-0'>
                                        Upload Image
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="d-flex align-items-center ps-0 row mx-0 my-2">
                            <div className="col-6 row mx-0 ps-0 pe-1">
                                <div className='mx-0 px-0 col-3 col-4'>
                                    Blood
                                </div>
                                <div className='mx-0 px-0 col-8 col-9'>
                                    <input onChange={''} name='code' value={''} type='text' className='item_input ms-0' />
                                </div>
                            </div>
                        </div>

                        <div className="d-flex align-items-center ps-0 row mx-0 my-2">
                            <div className="col-6 row mx-0 ps-0 pe-1">
                                <div className='mx-0 px-0 col-3 col-4'>
                                    Op.Bal
                                </div>
                                <div className='mx-0 px-0 col-8 col-9'>
                                    <input onChange={''} name='code' value={''} type='text' className='item_input ms-0' />
                                </div>
                            </div>
                        </div>
                        
                        <div className="d-flex align-items-center ps-0 row mx-0 my-1">
                            <div className="col-6 row mx-0 ps-0 pe-1">
                                <div className='mx-0 px-0 col-3 col-4'/>
                                <div className='mx-0 px-0 col-8 col-9'>
                                    <select onChange={''} name='payment_type' value={''} className='customer-select'>
                                        <option value="TO_GIVE">To Receive</option>
                                        <option value="TO_RECEIVE">To Receive</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                    </div>
{/* ----------------------------------------Right Side ----------------------------------- */}
                    <div className='item_add_form_part2 row mx-0 px-0 ps-3 me-0 col-6 border-0'>

                        <div className="d-flex align-items-center ps-0 row mx-0 my-2">
                            <div className="col-12 row mx-0 ps-0">
                                <div className='mx-0 px-0 col-3'>
                                    Op.Bal
                                </div>
                                <div className='mx-0 px-0 col-8'>
                                    <input onChange={''} name='code' value={''} type='text' className='item_input ms-0' />
                                </div>
                            </div>
                        </div>

                    </div>

                    
                </form>
            </div>
            </div>
    )
}

export default StaffMaster
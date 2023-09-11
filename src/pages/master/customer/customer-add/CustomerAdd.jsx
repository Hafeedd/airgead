import React, { useState } from 'react'
import SearchDropDown from '../../../../components/searchDropDown/SearchDropDown'

const CustomerAdd = () => {
    const [pageHeadItem, setPageHeadItem] = useState(1)
    const [showDropdown, setShowDropdown ] = useState(1)
    const [listItem, setLisItem] = useState({
        fk_district:[],
        fk_route:[],
        fk_city:[],
        fk_town:[],
        fk_types:[],
        fk_rate_types:[],
        fk_bill_type:[],
    })

    const [customerAdd, setCustomerAdd] = useState({
        code:null,
        name:null,
        address:null,
        post:null,
        pin:null,
        pin_distance:null,
        contact_person:null,
        email:null,
        mobile:null,
        gst_in:null,
        disc:null,
        remark:null,
        opening_balance:null,
        payment_type:null,
        fk_district:null,
        fk_route:null,
        fk_city:null,
        fk_town:null,
        fk_types:null,
        fk_rate_types:null,
        fk_bill_type:null,
        credit_limit_in_amt:null,
        credit_limit_in_days:null,
    })

    const addNewOption = () =>{

    }

    let options = {}
    options.fk_route = [{label:"new",value:1},{label:"hellow",value:2},{label:"hi",value:3}]

    return (
        <div className='item_add'>
            <div className="page_head ps-4 mt-1 mb-3">
                <div className='fw-600 fs-5'>Master Customer</div>
                <div className='page_head_items mb-3'>
                    <div onClick={() => setPageHeadItem(1)} className={`page_head_item ${pageHeadItem === 1 && "active"}`}>Add Customer</div>
                </div>
            </div>
            <div className='item_add_cont'>
                Add New Customer
                <div className='item_add_form pt-1 d-flex mt-1'>

                    {/* item details --------------------------------------------------------------------------------------- */}

                    <div className='item_add_form_part1 col-6 row mx-0 px-0'>

                        <div className="d-flex align-items-center ps-0 row mx-0 pe-5 my-2">
                            <div className='mx-0 px-0 col-5 col-6'>
                                Code
                            </div>
                            <div className='mx-0 px-0 col-6 col-7'>
                                <input name="code"type='text' className='item_input names' />
                            </div>
                        </div>
                        <div className="d-flex align-items-center ps-0 row mx-0 pe-5 my-2">
                            <div className='mx-0 px-0 col-5 col-6'>
                                Name
                            </div>
                            <div className='mx-0 px-0 col-6 col-7'>
                                <input name="name"type='text' className='item_input names' />
                            </div>
                        </div>
                        <div className="d-flex align-items-center ps-0 row mx-0 pe-5 my-2">
                            <div className='mx-0 px-0 col-5 col-6'>
                                Address
                            </div>
                            <div className='mx-0 px-0 col-6 col-7'>
                                <textarea name='address' rows={4} className='item_input names' />
                            </div>
                        </div>
                        <div className="d-flex align-items-center ps-0 row mx-0 pe-5 my-2">
                            <div className="col-5 col-6 row mx-0 px-0">
                                <div className='mx-0 px-0 col-5'>
                                    Post
                                </div>
                                <div className='mx-0 px-0 col-7'>
                                    <input name="post"type='text' className='item_input names' />
                                </div>
                            </div>
                            <div className="col-6 col-7 row ps-5 mx-0 px-0">
                                <div className='mx-0 px-0 col-5'>
                                    Pin
                                </div>
                                <div className='mx-0 px-0 col-7'>
                                    <input name="pin"type='text' className='item_input names' />
                                </div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center ps-0 row mx-0 pe-5 my-2">
                            <div className="col-5 col-6 row mx-0 px-0">
                                <div className='mx-0 px-0 col-5'>
                                    Contact Person
                                </div>
                                <div className='mx-0 px-0 col-7'>
                                    <input name="contact_person"type='text' className='item_input names' />
                                </div>
                            </div>
                            <div className="col-6 col-7 row ps-5 mx-0 px-0">
                                <div className='mx-0 px-0 col-5'>
                                    PIN Distance
                                </div>
                                <div className='mx-0 px-0 col-7'>
                                    <input name="pin_distance"type='text' className='item_input names' />
                                </div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center ps-0 row mx-0 pe-5 my-2">
                            <div className='mx-0 px-0 col-5 col-6'>
                                Email
                            </div>
                            <div className='mx-0 px-0 col-6 col-7'>
                                <input name="email"type='text' className='item_input names' />
                            </div>
                        </div>
                        <div className="d-flex align-items-center ps-0 row mx-0 pe-5 my-2">
                            <div className='mx-0 px-0 col-5 col-6'>
                                Mob
                            </div>
                            <div className='mx-0 px-0 col-6 col-7'>
                                <input name="mobile"type='text' className='item_input names' />
                            </div>
                        </div>
                        <div className="d-flex align-items-center ps-0 row mx-0 pe-5 my-2">
                            <div className='mx-0 px-0 col-5 col-6'>
                                GSTin
                            </div>
                            <div className='mx-0 px-0 col-6 col-7'>
                                <input name="gst_in"type='text' className='item_input names' />
                            </div>
                        </div>
                        {/* <div className="d-flex align-items-center ps-0 row mx-0 pe-5 my-2">
                            <div className='mx-0 px-0 col-5 col-6'>
                                GSTin
                            </div>
                            <div className='mx-0 px-0 col-6 col-7'>
                                <input name=""type='text' className='item_input names' />
                            </div>
                        </div> */}
                        <div className="d-flex align-items-center ps-0 row mx-0 pe-5 my-2">
                            <div className="col-5 col-6 row mx-0 px-0">
                                <div className='mx-0 px-0 col-5'>
                                    Disc %
                                </div>
                                <div className='mx-0 px-0 col-7'>
                                    <input name="disc"type='text' className='item_input names' />
                                </div>
                            </div>
                            <div className="col-6 col-7 row ps-5 mx-0 px-0">
                                <div className='mx-0 px-0 col-5'>
                                    Op Balance
                                </div>
                                <div className='mx-0 px-0 col-7'>
                                    <input name="opening_balance"type='text' className='item_input names' />
                                </div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center ps-0 row mx-0 pe-4 my-2">
                            <div className='mx-0 px-0 col-5'>
                                Credit Limit
                            </div>
                            <div className='mx-0 px-0 col-3 col-4 pe-2'>
                                <input name="credit_limit_in_amt" type='text' placeholder='In Amnt' className='item_input names credit' />
                            </div>
                            <div className='mx-0 col-3 col-4 pe-4 ps-0'>
                                <input name="credit_limit_in_days" type='text' placeholder='In Days' className='item_input names credit' />
                            </div>
                        </div>
                        <div className="d-flex align-items-center ps-0 row mx-0 pe-4 my-2">
                            <div className='mx-0 px-0 col-6' />
                            <div className='mx-0 col-3 ps-2 pe-2'>
                                <select name='payment_type' placeholder='To Recieve' className='customer-select'>
                                    <option value="TO_GIVE">To Give</option>
                                    <option value="TO_RECEIVE">To Receive</option>
                                </select>
                            </div>
                            <div className='mx-0 px-0 col-3'>
                                <div className='btn btn-sm btn-dark px-4 w-100 rates-btn'>Set Rates</div>
                            </div>
                        </div>

                    </div>

                    {/* item rate ----------------------------------------------------------------------------------------------------------- */}

                    <div className='item_add_form_part2 row mx-0 px-0 me-0 col-6 border-0'>

                        <div className="d-flex align-items-start justify-content-between mx-0 ps-4 pe-0">
                            <div className='mx-0 px-0 '>
                                Route
                            </div>
                            <div className='mx-0 px-0 '>
                            <SearchDropDown containerClass="large" id="fk_route" addNew={true}  setNew={addNewOption} options={listItem}
                            {... { showDropdown, setShowDropdown }} setDataValue={setCustomerAdd} selectedValue={customerAdd}/>
                            </div>
                        </div>
                        <div className="d-flex align-items-start justify-content-between mx-0 ps-4 pe-0 my-2">
                            <div className='mx-0 px-0 '>
                                City
                            </div>
                            <div className='mx-0 px-0 '>
                            <SearchDropDown containerClass="large" id="fk_city" addNew={true}  setNew={addNewOption} options={listItem}
                            {... { showDropdown, setShowDropdown }} setDataValue={setCustomerAdd} selectedValue={customerAdd}/>
                            </div>
                        </div>
                        <div className="d-flex align-items-start justify-content-between mx-0 ps-4 pe-0 my-2">
                            <div className='mx-0 px-0 '>
                                Town
                            </div>
                            <div className='mx-0 px-0 '>
                                <SearchDropDown containerClass="large" id="fk_town" addNew={true}  setNew={addNewOption} options={listItem}
                            {... { showDropdown, setShowDropdown }} setDataValue={setCustomerAdd} selectedValue={customerAdd}/>
                            </div>
                        </div>
                        <div className="d-flex align-items-start justify-content-between mx-0 ps-4 pe-0 my-2">
                            <div className='mx-0 px-0 '>
                                District
                            </div>
                            <div className='mx-0 px-0 '>
                                <SearchDropDown containerClass="large" id="fk_district" addNew={true}  setNew={addNewOption} options={listItem}
                            {... { showDropdown, setShowDropdown }} setDataValue={setCustomerAdd} selectedValue={customerAdd}/>
                            </div>
                        </div>
                        <div className="d-flex align-items-start justify-content-between mx-0 ps-4 pe-0 my-2">
                            <div className='mx-0 px-0 '>
                                Type
                            </div>
                            <div className='mx-0 px-0 '>
                                <SearchDropDown containerClass="large" id="fk_types" addNew={true}  setNew={addNewOption} options={listItem}
                            {... { showDropdown, setShowDropdown }} setDataValue={setCustomerAdd} selectedValue={customerAdd}/>
                            </div>
                        </div>
                        <div className="d-flex align-items-start justify-content-between mx-0 ps-4 pe-0 my-2">
                            <div className='mx-0 px-0 '>
                                Rate Type
                            </div>
                            <div className='mx-0 px-0 '>
                                <SearchDropDown containerClass="large" id="fk_rate_types" addNew={true}  setNew={addNewOption} options={listItem}
                            {... { showDropdown, setShowDropdown }} setDataValue={setCustomerAdd} selectedValue={customerAdd}/>
                            </div>
                        </div>
                        <div className="d-flex align-items-start justify-content-between mx-0 ps-4 pe-0 my-2">
                            <div className='mx-0 px-0 '>
                                Bill Type
                            </div>
                            <div className='mx-0 px-0 '>
                                <SearchDropDown containerClass="large" id="fk_bill_type"  setNew={addNewOption} options={listItem}
                            {... { showDropdown, setShowDropdown }} setDataValue={setCustomerAdd} selectedValue={customerAdd}/>
                            </div>
                        </div>
                        <div className="d-flex align-items-center row mx-0 ps-4 pe-3 my-2">
                            <div className='mx-0 px-0  col-3 me-2'>
                                Remarks
                            </div>
                            <div className='ps-2 ms-4 px-0 col-8'>
                                <textarea name='remark' rows={3} className='item_input names' />
                            </div>
                        </div>
                        <div className="d-flex align-items-center row mx-0 ps-4 pe-3 my-2">
                            <div className='mx-0 px-0 col-4 d-flex align-items-center'>
                                <input name="repeat" type='checkbox' value='Repeat' />
                                <label for='Repeat' className='px-2'>Repeat</label>
                            </div>
                            <div className='mx-0 px-0 ps-4 col-8 d-flex align-items-center'>
                                <input name="blocked" type='checkbox' value='Blocked' />
                                <label for='Blocked' className='px-2'>Blocked</label>
                            </div>
                        </div>
                        <div className="bottom-btn-section row px-0 ms-2 mx-0 my-2">
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

export default CustomerAdd

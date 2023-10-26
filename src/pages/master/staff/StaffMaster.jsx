import React, { useState } from 'react'
import './StaffMaster.css'
import { useNavigate } from 'react-router'
import SearchDropDown from '../../../components/searchDropDown/SearchDropDown'
import useOnKey from '../../../onKeyFunct/onKeyFunct'


const StaffMaster = () => {
    // const [pageHeadItem, setPageHeadItem] = useState(1)
    const navigate = useNavigate()
    const [showDropdown, setShowDropdown] = useState()
    const [staffTableTab, setStaffTableTab] = useState(1)
    const [ref, setRef] = useState(null)
    const [listItem, setListItem] = useState({
        designation:[]
    })
    const bloodOptions = [{label:'A+',value:'A+'},{label:'A-',value:'A-'},{label:'B+',value:'B-'},
    {label:'AB+',value:'AB-'},{label:'O+',value:'O-'},{label:'OTHER',value:'OTHER'},]
    const [staffAdd, setStaffAdd] = useState({
        code:null,
        name:null,
        address:null,
        mobile:null,
        email:null,
        gender:"MALE",
        op_balance:null,
        type:"TO_RECEIVE",
        blood_gp:"A+",
        join_date:null,
        dob:null,
        remarks:null,
        blocked:null,
        image:null,
    })

    const addNewOption = () => {}

    const handleChange = (e) => {
        if(e.target.type === 'checkbox'){
            setStaffAdd({...staffAdd,[e.target.name]:!e.target.value})
        }else
        if(e.target.value === ''){
            setStaffAdd({...staffAdd,[e.target.name]:null})
        }else {
            setStaffAdd({...staffAdd,[e.target.name]:e.target.value})
        }
    }

    const getData = async () =>{

    }

    const {handleKeyDown, formRef} = useOnKey(ref, setRef)

    return (
        <div className='item_add'>
            <div className="itemList_header row mx-0">
                <div className="page_head ps-4 pe-0 mb-3">
                    <div className='fs-5 py-2'>Add New Staff</div>
                    <div className='page_head_items'>
                        <div onClick={() => { navigate('/staff-master') }} className={`page_head_item active`}>General</div>
                        {/* <div onClick={() => { navigate('/staff-master') }} className={`page_head_item`}>Detail Pay-Scale</div> */}
                    </div>
                </div>
            </div>

            <div className='supplier-add-cont'>
                    Add New Staff
                <form onSubmit={''} ref={formRef} className='item_add_form pt-1 d-flex mt-1'>
                    <div className='supplier-add-form-part1 col-7 row mx-0 px-0 pb-4'>
                        <div className="d-flex align-items-center ps-0 row mx-0 sup-input-cont">
                            <div className="col-6 row mx-0 ps-0 pe-1">
                                <div className='mx-0 px-0 col-3 col-3'>
                                    Code
                                </div>
                                <div className='mx-0 px-0 col-8 col-9'>
                                    <input onChange={handleChange} onKeyDown={handleKeyDown} name='code' value={staffAdd.code||''} type='text' className='item_input ms-0' />
                                </div>
                            </div>
                            <div className="col-6 row mx-0 px-2">
                                <div className='mx-0 px-0 col-3'>
                                    Gender
                                </div>
                                <div className='mx-0 px-0 col-8'>
                                    <input onChange={handleChange} onKeyDown={handleKeyDown} name='gender' value={staffAdd.gender||''} type='text' className='item_input ms-0' />
                                </div>
                            </div>
                        </div>

                        <div className="d-flex align-items-center ps-0 row mx-0 sup-input-cont">
                            <div className="col-6 row mx-0 ps-0 pe-1">
                                <div className='mx-0 px-0 col-3 col-3'>
                                    Name
                                </div>
                                <div className='mx-0 px-0 col-8 col-9'>
                                    <input onChange={handleChange} onKeyDown={handleKeyDown} name='name' value={staffAdd.name||''} type='text' className='item_input ms-0' />
                                </div>
                            </div>
                            <div className="col-6 row mx-0 px-2">
                                <div className='mx-0 px-0 col-3'>
                                    Phone
                                </div>
                                <div className='mx-0 px-0 col-8'>
                                    <input onChange={handleChange} onKeyDown={handleKeyDown} name='mobile' value={staffAdd.mobile||''} type='text' className='item_input ms-0' />
                                </div>
                            </div>
                        </div>

                        <div className="d-flex align-items-center ps-0 row mx-0 px-0">
                            <div className="col-6 d-flex align-items-center px-0 row pe-1 mx-0 h-100">
                                <div className="col-12 row mx-0 px-0 align-items-center h-100">
                                    <div className='mx-0 px-0 col-3 col-3'>
                                        Address
                                    </div>
                                    <div className='mx-0 px-0 col-8 col-9 h-100 py-1'>
                                        <textarea onChange={handleChange} onKeyDown={handleKeyDown} name='address' value={staffAdd.address||''} className='item_input ms-0 h-100' rows={3} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 d-flex align-items-center px-2 row mx-0">
                                <div className="col-12 row mx-0 px-0 my-1">
                                    <div className='mx-0 px-0 col-3'>
                                        Join Date
                                    </div>
                                    <div className='mx-0 px-0 col-8'>
                                        <input onChange={handleChange} onKeyDown={handleKeyDown} name='join_date' value={staffAdd.join_date||''} type='date' className='item_input ms-0' />
                                    </div>
                                </div>
                                <div className="col-12 row mx-0 px-0 my-1">
                                    <div className='mx-0 px-0 col-3'>
                                        Dob
                                    </div>
                                    <div className='mx-0 px-0 col-8'>
                                        <input onChange={handleChange} onKeyDown={handleKeyDown} name='dob' value={staffAdd.dob||''} type='date' className='item_input ms-0' />
                                    </div>
                                </div>
                            </div>
                        </div> 

                        <div className="d-flex align-items-center ps-0 row mx-0 sup-input-cont">
                            <div className="col-6 row mx-0 ps-0 pe-1">
                                <div className='mx-0 px-0 col-3 col-3'>
                                    Email
                                </div>
                                <div className='mx-0 px-0 col-8 col-9'>
                                    <input onChange={handleChange} onKeyDown={handleKeyDown} name='email' value={staffAdd.email||''} type='text' className='item_input ms-0' />
                                </div>
                            </div>
                            <div className="col-6 row mx-0 px-2">
                                <span className="col-3" />
                                <div className='mx-0 px-0 col-8'>
                                    <div onChange={handleChange} onKeyDown={handleKeyDown} name='image' value={staffAdd.image||''} type='text' placeholder='Upload Image' className='btn btn-outline-dark btn-sm upload-btn px-4 py-1'>
                                        Upload Image
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="d-flex align-items-center ps-0 row mx-0 sup-input-cont">
                            <div className="col-6 row mx-0 ps-0 pe-1">
                                <div className='mx-0 px-0 col-3 col-3'>
                                    Blood
                                </div>
                                <div className='mx-0 px-0 col-8 col-9'>
                                    <select onChange={handleChange} onKeyDown={handleKeyDown} name='blood_gp' value={staffAdd.blood_gp||''} type='text' className='item_input ms-0'>
                                    {bloodOptions.map((data)=>
                                    <option value={data.value}>{data?.label}</option>
                                    )}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="d-flex align-items-center ps-0 row mx-0 sup-input-cont">
                            <div className="col-6 row mx-0 ps-0 pe-1">
                                <div className='mx-0 px-0 col-3'>
                                    Op.Bal
                                </div>
                                <div className='mx-0 px-0 col-8 col-9'>
                                    <input onChange={handleChange} onKeyDown={handleKeyDown} name='op_balance' value={staffAdd.op_balance||''} type='text' className='item_input ms-0 me-0 pe-0' />
                                </div>
                                </div>
                                <div className='mx-0 px-0 col-2'>
                                    <select onChange={handleChange} onKeyDown={handleKeyDown} name='type' value={staffAdd.type||''} 
                                    className='staff-select bg-dark border-0 rounded-2 py-1 text-light px-2'>
                                        <option value="TO_RECIEVE">TO RECIEVE</option>
                                        <option value="TO_SEND">TO SEND</option>
                                    </select>
                                </div>
                        </div>
                    </div>
{/* ----------------------------------------Right Side ----------------------------------- */}
                    <div className='supplier-add-form-part2 row mx-0 px-0 ps-3 me-0 col-5 border-0 ps-4'>

                        <div className="d-flex align-items-center ps-0 row mx-0 sup-input-cont">
                            <span className='col-4'/>
                            <div className="col-2 col-3 d-flex align-items-center">
                            <input type="checkbox" onChange={handleChange} onKeyDown={handleKeyDown} id="repeat" name="repeat" className='me-2'/>
                            <label className='pb-1' htmlFor='repeat'>Repeat</label>
                            </div>
                            <div className="col-2 d-flex align-items-center">
                            <input type="checkbox" onChange={handleChange} onKeyDown={handleKeyDown} id="blocked" name="blocked" className='me-2'/>
                            <label className='pb-1' htmlFor='blocked'>Blocked</label>
                            </div>
                        </div>
                        <div className="d-flex align-items-center ps-0 row mx-0 sup-input-cont">
                            <div className="col-12 row mx-0 px-0 ps-0 align-items-center">
                                <div className='mx-0 px-0 col-3 col-2 staff-text'>
                                    Designation
                                </div>
                                <div className='mx-0 px-0 col-9 col-10'>
                                <SearchDropDown containerClass="large" id="designation" addNew={true}  setNew={addNewOption} options={listItem}
                                {... { showDropdown, setShowDropdown, handleKeyDown }} setDataValue={setStaffAdd} selectedValue={staffAdd||''}/>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center ps-0 row mx-0 sup-input-cont">
                            <div className="col-12 row mx-0 px-0 ps-0 align-items-center">
                                <div className='mx-0 col-2 px-0 col-3 staff-text'>
                                    Salary
                                </div>
                                <div className='mx-0 px-0 col-3 col-4 me-3'>
                                <input type="text" name="salary" className='item_input'/>
                                </div>
                                <div className='mx-0 px-0 col-2 staff-text me-1'>
                                    Leave Cut
                                </div>
                                <div className='mx-0 px-0 col-3 col-4'>
                                <input type="text" name="salary" className='item_input'/>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center ps-0 row mx-0 sup-input-cont">
                            <div className="col-12 row mx-0 px-0 ps-0 align-items-center">
                                <div className='mx-0 col-2 px-0 col-3 staff-text'>
                                    Alwd Leave
                                </div>
                                <div className='mx-0 px-0 col-3 col-4 me-3'>
                                <input type="text" name="salary" className='item_input'/>
                                </div>
                                <div className='mx-0 px-0 col-2 staff-text me-1'>
                                    LIC Cut
                                </div>
                                <div className='mx-0 px-0 col-3 col-4'>
                                <input type="text" name="salary" className='item_input'/>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center ps-0 row mx-0 sup-input-cont">
                            <div className="col-12 row mx-0 px-0 ps-0 align-items-center">
                                <div className='mx-0 col-2 px-0 col-3 staff-text'>
                                    PF Cut
                                </div>
                                <div className='mx-0 px-0 col-3 col-4 me-3'>
                                <input type="text" name="salary" className='item_input'/>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center ps-0 row mx-0 sup-input-cont">
                            <div className="col-12 row mx-0 px-0 ps-0 align-items-center">
                                <div className='mx-0 px-0 col-2 col-3 staff-text'>
                                    Remark
                                </div>
                                <div className='mx-0 px-0 col-9 col-10 h-100'>
                                    <textarea onChange={handleChange} onKeyDown={handleKeyDown} name='code' value={''} className='item_input ms-0 h-100' rows={3} />
                                </div>
                            </div>
                        </div>
                    </div>

                    
                </form>
                        <div className='staff-table-cont d-flex justify-content-between rounded-top-3 px-3 pb-0'>
                        <div className='d-flex'>
                            <div onClick={()=>setStaffTableTab(1)} className={`${staffTableTab==1?"px-3 bg-dark text-light pb-2 rounded-top-3 pt-2":"d-flex align-items-end pb-1 px-3"}`}>Education</div>
                            <div onClick={()=>setStaffTableTab(2)} className={`${staffTableTab==2?"px-3 bg-dark text-light pb-2 rounded-top-3 pt-2":"d-flex align-items-end pb-1 px-3"}`}>Profession</div>
                        </div>
                        <button className='bg-dark text-light px-3 rounded-2 py-1 border-0 mb-3'>Add</button>
                        </div>
                        <table className='staff-table table'>
                            <thead className='bg-dark text-light'>
                                <th className='text-center'>Course</th>
                                <th className='text-center'>conducted</th>
                                <th className='text-center'>institution</th>
                                <th className='text-center'>Score</th>
                                <th className='text-center'>Yr/Pass</th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className='text-center'><div className='tbodytd'>fdsdfg</div></td>
                                    <td className='text-center'><div className='tbodytd'>fdsdfg</div></td>
                                    <td className='text-center'><div className='tbodytd'>fdsdfg</div></td>
                                    <td className='text-center'><div className='tbodytd'>fdsdfg</div></td>
                                    <td className='text-center'><div className='tbodytd'>fdsdfg</div></td>
                                </tr>
                                <tr>
                                    <td className='text-center'><div className='tbodytd'>fdsdfg</div></td>
                                    <td className='text-center'><div className='tbodytd'>fdsdfg</div></td>
                                    <td className='text-center'><div className='tbodytd'>fdsdfg</div></td>
                                    <td className='text-center'><div className='tbodytd'>fdsdfg</div></td>
                                    <td className='text-center'><div className='tbodytd'>fdsdfg</div></td>
                                </tr>
                            </tbody>
                        </table>
            </div>
            </div>
    )
}

export default StaffMaster
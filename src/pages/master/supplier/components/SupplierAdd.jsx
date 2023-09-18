import React, { useEffect, useState } from 'react'
import useCustomerServices from '../../../../services/master/customerServices'
import useItemServices from '../../../../services/master/itemServices'
import SearchDropDown from '../../../../components/searchDropDown/SearchDropDown'
import Swal from 'sweetalert2'

const SupplierAdd = ({edit,refresh}) => {
    const [showDropdown, setShowDropdown] = useState(false)
    const [listItem, setListItem] = useState({
        company:[],
        district:[]
    })
    const [pageHeadItem, setPageHeadItem] = useState(1)
    const [supplierAdd, setSupplierAdd] = useState({
        district:null,
        company:null,
        code:null,
        name:null,
        address:null,
        pin:null,
        pin_distance:null,
        contact_person:null,
        email:null,
        mobile:null,
        gst_in:null,
        disc:null,
        opening_balance:null,
        payment_type:'TO_GIVE',
        post:null,
        remark:null,
    })

    const {postDistrict,getDistrict,postSupplier,putSupplier} = useCustomerServices()
    const {postCompany,getCompany} = useItemServices()

    useEffect(()=>{
        getData()
        if (!edit){
            handleReset()
        }
    },[])

    useEffect(()=>{
        let keys = Object.keys(supplierAdd)
        if(edit){
            keys.map((key)=>{
                // if(key==='rate_types') 
                if(key.match(/^district|^company/)){
                let a = "fk_"+key
                if(edit[a]){
                    setSupplierAdd(data=>({...data,[key]:edit[a]}))}
            }
            else
            setSupplierAdd(data=>({...data,[key]:edit[key]}))
           })
        }else
        handleReset()
    },[edit])

    // console.log(supplierAdd)

    const getData = async () =>{
        let list = {}
        const miniFunct = (data,name) =>{
            // if(name.match(/^fk_/))
            // name = name.split("").slice(3,).join("")
            list[name] = []
            data.map((x)=>{
                list[name].push({value:x['id'],label:x[name]})
            })
        }
        try{
        let res
        res = await getCompany()
        if(res.success) miniFunct(res.data,'company')
        res = await getDistrict()
        if(res.success) miniFunct(res.data,'district')

        setListItem(list)
        }catch(err){
            // console.log(err)
        }
    }

    const addNewOption = async (e,data,state) =>{
        e.preventDefault()
        let value = data.value
        let res
        try{
            let submitData = {[state]:value}
            switch(state){
                case 'company':
                    res = await postCompany(submitData);
                    setSupplierAdd(data=>({...data,[state]:res.data.id}));break;
                case 'district':
                    res = await postDistrict(submitData);
                    setSupplierAdd(data=>({...data,[state]:res.data.id}));break;
            }
            if(res.success){
                Swal.fire('Options created successfully','','success')
                getData()
            }else{
                Swal.fire('Failed to created options','','error')
            }
        }catch(err){

        }
    }

    const handleChange = (e) => {
        if(typeof e.target.value === 'string')
            e.target.value = e.target.value.toUpperCase()
        if(e.target.value === '')
            setSupplierAdd(data => ( {...data,[e.target.name] : null} ))
        else
            setSupplierAdd(data => ( {...data,[e.target.name] : e.target.value} ))
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        try{
            let x = Object.keys(supplierAdd)
            let submitData = supplierAdd
            x.map(data=>{
                if(data=='district'||data=='company'){
                    submitData['fk_'+data] = submitData[data]
                    delete submitData[data]
                }
            })
            let res
            if(edit){
                res = await putSupplier(edit.id,submitData)
            }else{
                res = await postSupplier(submitData)
            }
            if(res?.success){
                Swal.fire('Supplier Added Successfully','','success')
                handleReset()
                refresh()
            }else{
                Swal.fire(res?.message,'','error')
            }
        }catch(err){
            Swal.fire('Something went wrong Pls try again','','error')
        }
    }

    const handleReset = () =>{
        let key = Object.keys(supplierAdd)
        key.map((data)=>{
                setSupplierAdd(val=>({...val,[data]:''}))
            })
    }
    
    return (
        <div className='item_add'>
            {/* <div className="page_head ps-4 mt-1 mb-3">
                <div className='fw-600 fs-5'>Master Supplier</div>
                <div className='page_head_items mb-3'>
                    <div onClick={() => setPageHeadItem(1)} className={`page_head_item ${pageHeadItem === 1 && "active"}`}>Add Supplier</div>
                </div>
            </div> */}
            <div className='item_add_cont'>
                {edit?"Edit Supplier":"Add New Supplier"}
                <form onSubmit={handleSubmit} className='item_add_form pt-1 d-flex mt-1'>

                    {/* item details --------------------------------------------------------------------------------------- */}

                    <div className='item_add_form_part1 col-6 row mx-0 px-0'>

                        <div className="d-flex align-items-center ps-0 row mx-0 pe-5 my-2">
                            <div className='mx-0 px-0 col-5 col-6'>
                                Code
                            </div>
                            <div className='mx-0 px-0 col-6 col-7'>
                                <input onChange={handleChange} name='code' value={supplierAdd.code?supplierAdd.code:''} type='text' className='item_input names' />
                            </div>
                        </div>
                        <div className="d-flex align-items-center ps-0 row mx-0 pe-5 my-2">
                            <div className='mx-0 px-0 col-5 col-6'>
                                Name
                            </div>
                            <div className='mx-0 px-0 col-6 col-7'>
                                <input onChange={handleChange} name='name' value={supplierAdd.name?supplierAdd.name:''} type='text' className='item_input names' />
                            </div>
                        </div>
                        <div className="d-flex align-items-center ps-0 row mx-0 pe-5 my-2">
                            <div className='mx-0 px-0 col-5 col-6'>
                                Address
                            </div>
                            <div className='mx-0 px-0 col-6 col-7'>
                                <textarea onChange={handleChange} name='address' value={supplierAdd.address?supplierAdd.address:''} rows={4} className='item_input names' />
                            </div>
                        </div>
                        <div className="d-flex align-items-center ps-0 row mx-0 pe-5 my-2">
                            <div className="col-5 col-6 row mx-0 px-0">
                                <div className='mx-0 px-0 col-5'>
                                    Post
                                </div>
                                <div className='mx-0 px-0 col-7'>
                                    <input onChange={handleChange} name='post' value={supplierAdd.post?supplierAdd.post:''} type='text' className='item_input names' />
                                </div>
                            </div>
                            <div className="col-6 col-7 row ps-5 mx-0 px-0">
                                <div className='mx-0 px-0 col-5'>
                                    Pin
                                </div>
                                <div className='mx-0 px-0 col-7'>
                                    <input onChange={handleChange} name='pin' value={supplierAdd.pin?supplierAdd.pin:''} type='text' className='item_input names' />
                                </div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center ps-0 row mx-0 pe-5 my-2">
                            <div className="col-5 col-6 row mx-0 px-0">
                                <div className='mx-0 px-0 col-5'>
                                    Contact Person
                                </div>
                                <div className='mx-0 px-0 col-7'>
                                    <input onChange={handleChange} name='contact_person' value={supplierAdd.contact_person?supplierAdd.contact_person:''} type='text' className='item_input names' />
                                </div>
                            </div>
                            <div className="col-6 col-7 row ps-5 mx-0 px-0">
                                <div className='mx-0 px-0 col-5'>
                                    PIN Distance
                                </div>
                                <div className='mx-0 px-0 col-7'>
                                    <input onChange={handleChange} name='pin_distance' value={supplierAdd.pin_distance?supplierAdd.pin_distance:''} type='text' className='item_input names' />
                                </div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center ps-0 row mx-0 pe-5 my-2">
                            <div className='mx-0 px-0 col-5 col-6'>
                                Email
                            </div>
                            <div className='mx-0 px-0 col-6 col-7'>
                                <input onChange={handleChange} name='email' value={supplierAdd.email?supplierAdd.email:''} type='text' className='item_input names' />
                            </div>
                        </div>
                        <div className="d-flex align-items-center ps-0 row mx-0 pe-5 my-2">
                            <div className='mx-0 px-0 col-5 col-6'>
                                Mob
                            </div>
                            <div className='mx-0 px-0 col-6 col-7'>
                                <input onChange={handleChange} name='mobile' value={supplierAdd.mobile?supplierAdd.mobile:''} type='text' className='item_input names' />
                            </div>
                        </div>
                        {/* <div className="d-flex align-items-center ps-0 row mx-0 pe-5 my-2">
                            <div className='mx-0 px-0 col-5 col-6'>
                                GSTin
                            </div>
                            <div className='mx-0 px-0 col-6 col-7'>
                                <input onChange={handleChange} name='gst_in' value={supplierAdd.gst_in?supplierAdd.gst_in:''} type='text' className='item_input names' />
                            </div>
                        </div> */}
                        <div className="d-flex align-items-center ps-0 row mx-0 pe-5 my-2">
                            <div className='mx-0 px-0 col-5 col-6'>
                            GSTin/VAT Reg No
                            </div>
                            <div className='mx-0 px-0 col-6 col-7'>
                                <input onChange={handleChange} name='gst_in' value={supplierAdd.gst_in?supplierAdd.gst_in:''} type='text' className='item_input names' />
                            </div>
                        </div>
                            {/* ------------------------------ */}
                            <div className="d-flex align-items-center ps-0 row mx-0 pe-5 my-2">
                                <div className='mx-0 px-0 col-5 col-6'>
                                Op Balance
                                </div>
                                    <div className='mx-0 px-0 col-6 col-7'>
                                        <div className='item_input row justify-content-between  rounded-2 ms-4 p-0'>
                                            <div className='col-6 col-7 mx-0 ps-0 me-0'>
                                            <input onChange={handleChange} name='opening_balance' value={supplierAdd.opening_balance?supplierAdd.opening_balance:''} type='text' className='item_input ms-0 border-0 names' />
                                            </div>
                                            <div className='col-6 col-5 mx-0 px-0'>
                                            <select onChange={handleChange} name='payment_type' value={supplierAdd.payment_type?supplierAdd.payment_type:''} className='customer-select ms-0 pe-0'>
                                                <option value="TO_GIVE">To Give</option>
                                                <option value="TO_RECEIVE">To Receive</option>
                                            </select>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                            {/* ------------------------------ */}
                            <div className="d-flex align-items-center ps-0 row mx-0 pe-5 my-2">
                                <div className='mx-0 px-0 col-5 col-6'>
                                        Disc %
                                    </div>
                                    <div className='mx-0 px-0 col-3 col-4'>
                                        <input onChange={handleChange} name='disc' value={supplierAdd.disc?supplierAdd.disc:''} type='text' className='item_input names' />
                                    </div>
                            </div>
                            {/* <div className="col-6 col-7 row ps-5 mx-0 px-0">
                                <div className='mx-0 px-0 col-5'>
                                    Op.Balance
                                </div>
                                <div className='mx-0 px-0 col-7'>
                                    <input onChange={handleChange} name='opening_balance' value={supplierAdd.opening_balance?supplierAdd.opening_balance:''} type='text' className='item_input names' />
                                </div>
                            </div> */}
                        {/* <div className="d-flex align-items-center ps-0 row mx-0 pe-4 my-2">
                            <div className='mx-0 px-0 col-9' />
                            <div className='mx-0 col-3 px-0'>
                                <select onChange={handleChange} name='payment_type' value={supplierAdd.payment_type?supplierAdd.payment_type:''} className='customer-select ms-1 supplier'>
                                    <option value="TO_GIVE">To Give</option>
                                    <option value="TO_RECEIVE">To Receive</option>
                                </select>
                            </div>
                        </div> */}

                    </div>

                    {/* item rate ----------------------------------------------------------------------------------------------------------- */}

                    <div className='item_add_form_part2 row mx-0 px-0 me-0 col-6 border-0'>

                        <div className="d-flex align-items-center mx-0 ps-4 pe-3 row my-2">
                            <div className='mx-0 px-0 col-4 me-0 '>
                                District
                            </div>
                            <div className='px-0 ps-2 col-8'>
                                {/* <input type='text' className='item_input names' /> */}
                            <SearchDropDown containerClass="large w-100" id="district" addNew={true}  setNew={addNewOption} options={listItem}
                            {... { showDropdown, setShowDropdown }} setDataValue={setSupplierAdd} selectedValue={supplierAdd}/>
                            </div>
                        </div>
                        <div className="d-flex align-items-center mx-0 ps-4 pe-3 row my-2">
                            <div className='mx-0 px-0 col-4 me-0'>
                                Company
                            </div>
                            <div className='px-0 ps-2 col-8'>
                                {/* <input type='text' className='item_input names' /> */}
                            <SearchDropDown containerClass="large w-100" id="company" addNew={true}  setNew={addNewOption} options={listItem}
                            {... { showDropdown, setShowDropdown }} setDataValue={setSupplierAdd} selectedValue={supplierAdd}/>
                            {/* </div> */}
                            </div>
                        </div>
                        <div className="d-flex align-items-center row mx-0 ps-4 pe-3 my-2">
                            <div className='mx-0 px-0 col-4 me-0'>
                                Remarks
                            </div>
                            <div className='px-0 ps-2 col-8'>
                                <textarea onChange={handleChange} name='remark' value={supplierAdd.remark?supplierAdd.remark:''} rows={3} className='item_input names ms-0' />
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
                                <button onClick={handleReset} type='reset' className='btn btn-sm btn-outline-dark w-100'>Clear</button>
                            </div>
                            <div className='mx-0 px-1 col-4'>
                                <button type='submit' className='btn btn-sm btn-dark w-100'>{edit?"Edit":"Save"}</button>
                            </div>
                        </div>

                    </div>

                </form>
            </div>
        </div>
    )
}

export default SupplierAdd

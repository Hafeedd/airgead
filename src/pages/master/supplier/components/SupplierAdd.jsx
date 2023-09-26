import React, { useEffect, useRef, useState } from 'react'
import useCustomerServices from '../../../../services/master/customerServices'
import useItemServices from '../../../../services/master/itemServices'
import SearchDropDown from '../../../../components/searchDropDown/SearchDropDown'
import Swal from 'sweetalert2'

const SupplierAdd = ({edit,refresh}) => {
    const [showDropdown, setShowDropdown] = useState(false)
    const [code, setCode] = useState(null)
    const [ref, setRef] = useState()
    const formRef = useRef(null)
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
    const {postCompany,getCompany,getProperty,putProperty,postProperty,getCode} = useItemServices()

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

    useEffect(()=>{
        if(formRef.current) getRefValue(formRef,setRef)
        }
    ,[formRef])

    const getRefValue = (ref,set) =>{
        const data = [...ref.current.children]
        const newList = [...data[0].querySelectorAll('input, select, textarea')]
        newList[0].focus()
            set(newList)
    }

    const handleKeyDown = (e) => {
        console.log(ref)
        if (e.key === "Enter") {
            e.preventDefault();
            if (e.target && ref.length>0) {
                let a = ref.indexOf(e.target)
                if(a===ref.length-1){
                    ref[0].focus()
                }else{
                ref[a].blur()
                ref[a+1].focus();
            }
            }
        }
    };

    const getData = async () =>{
        let list = {}
        const miniFunct = (data) =>{
            const keys = Object.keys(listItem)
            data.map((x)=>{
                if(keys.indexOf(x.property_type)>-1){
                        if(!list[x.property_type]?.length>0)
                            list[x.property_type] = []
                        list[x?.property_type].push({value:x['id'],text:x['property_value']})}
                })
        }
        try{
        let res = await getProperty()
            if(res.success)
                miniFunct(res?.data)
        if(!edit){
            let res2 = await getCode() 
            if(res2?.success){
                let cod = res2?.data?.filter(x=>x.sub_id === "SUP")
                setSupplierAdd(data=>({...data,['code']:cod[0]?.next_value}))
            }
        }
        // let res
        // res = await getCompany()
        // if(res.success) miniFunct(res.data,'company')
        // res = await getDistrict()
        // if(res.success) miniFunct(res.data,'district')
        setListItem(list)
        }catch(err){
            // console.log(err)
        }
    }

    const addNewOption = async (e,data,state,editId) =>{
        e.preventDefault()
        let value = data.value
        try{
            let res 
            if(editId){
                let submitData = {property_value:data}
                res = await putProperty(submitData,editId)
            }else{
                let submitData = {property_value:value,property_type:state}
                res = await postProperty(submitData)
            }
            if(res.success)
                setSupplierAdd(data=>({...data,[state]:res.data.id}))

            if(res.success){
                Swal.fire('Option Added Successfylly','','success')
            }
            getData()
        }catch(err){
                Swal.fire('Failed to add option','','error')
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
                getData()
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
                setSupplierAdd(val=>({...val,[data]:null}))
            })
    }
    
    return (
        <div ref={formRef} className='item_add'>
            <div className='item_add_cont'>
                {edit?"Edit Supplier":"Add New Supplier"}
                <form onSubmit={handleSubmit} className='item_add_form pt-1 d-flex mt-1'>

                    {/* item details --------------------------------------------------------------------------------------- */}

                    <div className='item_add_form_part1 col-6 row mx-0 px-0'>

                        <div className="d-flex align-items-center px-0 row mx-0 my-2">
                            <div className='mx-0 px-0 col-5 col-6'>
                                Code
                            </div>
                            <div className='mx-0 px-0 col-6 col-7'>
                                <input onKeyDown={handleKeyDown} onChange={handleChange} name='code' value={supplierAdd.code||''} type='text' className='item_input names' />
                            </div>
                        </div>
                        <div className="d-flex align-items-center px-0 row mx-0 my-2">
                            <div className='mx-0 px-0 col-5 col-6'>
                                Name
                            </div>
                            <div className='mx-0 px-0 col-6 col-7'>
                                <input onKeyDown={handleKeyDown} onChange={handleChange} name='name' value={supplierAdd.name?supplierAdd.name:''} type='text' className='item_input names' />
                            </div>
                        </div>
                        <div className="d-flex align-items-center px-0 row mx-0 my-2">
                            <div className='mx-0 px-0 col-5 col-6'>
                                Address
                            </div>
                            <div className='mx-0 px-0 col-6 col-7'>
                                <textarea onKeyDown={handleKeyDown} onChange={handleChange} name='address' value={supplierAdd.address?supplierAdd.address:''} rows={4} className='item_input names text-area  ms-0' />
                            </div>
                        </div>
                        <div className="d-flex align-items-center px-0 row mx-0 my-2">
                            <div className="col-5 col-6 row mx-0 px-0">
                                <div className='mx-0 px-0 col-5'>
                                    Post
                                </div>
                                <div className='mx-0 px-0 col-7'>
                                    <input onKeyDown={handleKeyDown} onChange={handleChange} name='post' value={supplierAdd.post?supplierAdd.post:''} type='text' className='item_input names' />
                                </div>
                            </div>
                            <div className="col-6 col-7 row ps-4 mx-0 px-0">
                                <div className='mx-0 px-0 col-5'>
                                    Pin
                                </div>
                                <div className='mx-0 px-0 col-7'>
                                    <input onKeyDown={handleKeyDown} onChange={handleChange} name='pin' value={supplierAdd.pin?supplierAdd.pin:''} type='text' className='item_input names' />
                                </div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center px-0 row mx-0 my-2">
                            <div className="col-5 col-6 row mx-0 px-0">
                                <div className='mx-0 px-0 col-5'>
                                    Contact Person
                                </div>
                                <div className='mx-0 px-0 col-7'>
                                    <input onKeyDown={handleKeyDown} onChange={handleChange} name='contact_person' value={supplierAdd.contact_person?supplierAdd.contact_person:''} type='text' className='item_input names' />
                                </div>
                            </div>
                            <div className="col-6 col-7 row ps-4 mx-0 px-0">
                                <div className='mx-0 px-0 col-5'>
                                    PIN Distance
                                </div>
                                <div className='mx-0 px-0 col-7'>
                                    <input onKeyDown={handleKeyDown} onChange={handleChange} name='pin_distance' value={supplierAdd.pin_distance?supplierAdd.pin_distance:''} type='text' className='item_input names' />
                                </div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center px-0 row mx-0 my-2">
                            <div className='mx-0 px-0 col-5 col-6'>
                                Email
                            </div>
                            <div className='mx-0 px-0 col-6 col-7'>
                                <input onKeyDown={handleKeyDown} onChange={handleChange} name='email' value={supplierAdd.email?supplierAdd.email:''} type='text' className='item_input names' />
                            </div>
                        </div>
                        <div className="d-flex align-items-center px-0 row mx-0 my-2">
                            <div className='mx-0 px-0 col-5 col-6'>
                                Mob
                            </div>
                            <div className='mx-0 px-0 col-6 col-7'>
                                <input onKeyDown={handleKeyDown} onChange={handleChange} name='mobile' value={supplierAdd.mobile?supplierAdd.mobile:''} type='text' className='item_input names' />
                            </div>
                        </div>
                        <div className="d-flex align-items-center px-0 row mx-0 my-2">
                            <div className='mx-0 px-0 col-5 col-6'>
                            GSTin/VAT Reg No
                            </div>
                            <div className='mx-0 px-0 col-6 col-7'>
                                <input onKeyDown={handleKeyDown} onChange={handleChange} name='gst_in' value={supplierAdd.gst_in?supplierAdd.gst_in:''} type='text' className='item_input names' />
                            </div>
                        </div>
                            {/* ------------------------------ */}
                            <div className="d-flex align-items-center px-0 row mx-0 my-2">
                                <div className='mx-0 px-0 col-5 col-6'>
                                Op Balance
                                </div>
                                    <div className='mx-0 px-0 col-6 col-7'>
                                        <div className='item_input_with_drop row rounded-2 p-0 mx-0 align-items-center'>
                                            <div className='col-6 col-7 mx-0 px-0 me-0'>
                                            <input onKeyDown={handleKeyDown} onChange={handleChange} name='opening_balance' value={supplierAdd.opening_balance?supplierAdd.opening_balance:''} type='text' className='item_input names border-0' />
                                            </div>
                                            <div className='col-6 col-5 m-0 p-0 d-flex '>
                                            <select onKeyDown={handleKeyDown} onChange={handleChange} name='payment_type' value={supplierAdd.payment_type?supplierAdd.payment_type:''} className='pay-type-select ms-0 pe-0'>
                                                <option value="TO_GIVE">To Give</option>
                                                <option value="TO_RECEIVE">To Receive</option>
                                            </select>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                            {/* ------------------------------ */}
                            <div className="d-flex align-items-center px-0 row mx-0 my-2">
                                <div className='mx-0 px-0 col-5 col-6'>
                                        Disc %
                                    </div>
                                    <div className='mx-0 px-0 col-3 col-4'>
                                        <input onKeyDown={handleKeyDown} onChange={handleChange} name='disc' value={supplierAdd.disc?supplierAdd.disc:''} type='text' className='item_input names' />
                                    </div>
                            </div>
                            {/* <div className="col-6 col-7 row ps-5 mx-0 px-0">
                                <div className='mx-0 px-0 col-5'>
                                    Op.Balance
                                </div>
                                <div className='mx-0 px-0 col-7'>
                                    <input onKeyDown={handleKeyDown} onChange={handleChange} name='opening_balance' value={supplierAdd.opening_balance?supplierAdd.opening_balance:''} type='text' className='item_input names' />
                                </div>
                            </div> */}
                        {/* <div className="d-flex align-items-center px-0 row mx-0 pe-4 my-2">
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
                                {/* <input onKeyDown={handleKeyDown} type='text' className='item_input names' /> */}
                            <SearchDropDown containerClass="large w-100" id="district" addNew={true}  setNew={addNewOption} options={listItem}
                            {... { showDropdown, setShowDropdown, handleKeyDown}} setDataValue={setSupplierAdd} selectedValue={supplierAdd}/>
                            </div>
                        </div>
                        <div className="d-flex align-items-center mx-0 ps-4 pe-3 row my-2">
                            <div className='mx-0 px-0 col-4 me-0'>
                                Company
                            </div>
                            <div className='px-0 ps-2 col-8'>
                                {/* <input onKeyDown={handleKeyDown} type='text' className='item_input names' /> */}
                            <SearchDropDown containerClass="large w-100" id="company" addNew={true}  setNew={addNewOption} options={listItem}
                            {... { showDropdown, setShowDropdown, handleKeyDown}} setDataValue={setSupplierAdd} selectedValue={supplierAdd}/>
                            {/* </div> */}
                            </div>
                        </div>
                        <div className="d-flex align-items-center row mx-0 ps-4 pe-3 my-2">
                            <div className='mx-0 px-0 col-4 me-0'>
                                Remarks
                            </div>
                            <div className='px-0 ps-2 col-8'>
                                <textarea onKeyDown={handleKeyDown} onChange={handleChange} name='remark' value={supplierAdd.remark?supplierAdd.remark:''} rows={3} className='item_input names text-area  ms-0' />
                            </div>
                        </div>
                        <div className="d-flex align-items-center row mx-0 ps-4 pe-3 my-2">
                            <div className='mx-0 px-0 col-4 d-flex align-items-center'>
                                <input onKeyDown={handleKeyDown} type='checkbox' name='Repeat' value='Repeat' />
                                <label className='px-2'>Repeat</label>
                            </div>
                            <div className='mx-0 px-0 ps-4 col-8 d-flex align-items-center'>
                                <input onKeyDown={handleKeyDown} type='checkbox' name='Blocked' value='Blocked' />
                                <label className='px-2'>Blocked</label>
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

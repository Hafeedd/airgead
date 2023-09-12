import React, { useEffect, useState } from 'react'
import SearchDropDown from '../../../../components/searchDropDown/SearchDropDown'
import useCustomerServices from '../../../../services/master/customerServices'
import Swal from 'sweetalert2'

const CustomerAdd = () => {
    const [pageHeadItem, setPageHeadItem] = useState(1)
    const [showDropdown, setShowDropdown ] = useState(1)
    const [listItem, setLisItem] = useState({
        district:[],
        route:[],
        city:[],
        town:[],
        types:[],
        rate_types:[],
        bill_type:[],
    })

    console.log(listItem)

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
        district:null,
        route:null,
        city:null,
        town:null,
        types:null,
        rate_types:null,
        bill_type:null,
        credit_limit_in_amt:null,
        credit_limit_in_days:null,
    })

    const {
        postRoute,
        postCity,
        postTown,
        postDistrict,
        postRateType,
        postTypes,
        postCustomer,
        getRoute,
        getCity,
        getTown,
        getDistrict,
        getRateType,
        getTypes,
    } = useCustomerServices()

    useEffect(()=>{
        getData()
    },[])

    const getData =async () =>{
        let list = {}
        const miniFunct = (data,name) =>{
            // if(name.match(/^/))
            // name = name.split("").slice(3,).join("")
            list[name] = []
            data.map((x)=>{
                list[name].push({value:x['id'],label:x[name]})
            })
        }
        try{
        let res
        res = await getDistrict()
        if(res.success) miniFunct(res.data,'district')
        res = await getRoute()
        if(res.success) miniFunct(res.data,'route')
        res = await getCity()
        if(res.success) miniFunct(res.data,'city')
        res = await getTown()
        if(res.success) miniFunct(res.data,'town')
        res = await getTypes()
        if(res.success) miniFunct(res.data,'types')
        res = await getRateType()
        if(res.success) miniFunct(res.data,'rate_types')
        // res = await getbilltypes()
        // if(res.success) miniFunct(res.data,'bill_type')

        setLisItem(list)
        }catch(err){
            // console.log(err)
        }
    }

    const addNewOption = async (e,data,state) =>{
        e.preventDefault()
        // if(state.match(/^/)){
        //     let x = state.split("")
        //     x.splice(0,3)
        //     state = x.join("")}
            console.log(state)
        let value = data.value
        let res
        try{
            let submitData = {[state]:value}
            switch(state){
                case 'route':
                    res = await postRoute(submitData);break;
                case 'city':
                    res = await postCity(submitData);break;
                case 'town':
                    res = await postTown(submitData);break;
                case 'district':
                    res = await postDistrict(submitData);break;
                case 'types':
                    res = await postTypes(submitData);break;
                case 'rate_types':
                    res = await postRateType(submitData);break;
                case 'bill_type':
                    // res = await postBill(submitData);break;
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

    const handleSubmit = async (e) =>{
        e.preventDefault()
        try{
            console.log(customerAdd)
        }catch(err){

        }
    }

    const handleChange = (e) =>{
        if(e.target.value === '') 
            setCustomerAdd(data => ( {...data,[e.target.name] : null} ))
        else 
            setCustomerAdd(data => ( {...data,[e.target.name] : e.target.value} ))
    }

    let options = {}
    options.route = [{label:"new",value:1},{label:"hellow",value:2},{label:"hi",value:3}]

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
                                <input onChange={handleChange} name="code"type='text' className='item_input names' />
                            </div>
                        </div>
                        <div className="d-flex align-items-center ps-0 row mx-0 pe-5 my-2">
                            <div className='mx-0 px-0 col-5 col-6'>
                                Name
                            </div>
                            <div className='mx-0 px-0 col-6 col-7'>
                                <input onChange={handleChange} name="name"type='text' className='item_input names' />
                            </div>
                        </div>
                        <div className="d-flex align-items-center ps-0 row mx-0 pe-5 my-2">
                            <div className='mx-0 px-0 col-5 col-6'>
                                Address
                            </div>
                            <div className='mx-0 px-0 col-6 col-7'>
                                <textarea onChange={handleChange} name='address' rows={4} className='item_input names' />
                            </div>
                        </div>
                        <div className="d-flex align-items-center ps-0 row mx-0 pe-5 my-2">
                            <div className="col-5 col-6 row mx-0 px-0">
                                <div className='mx-0 px-0 col-5'>
                                    Post
                                </div>
                                <div className='mx-0 px-0 col-7'>
                                    <input onChange={handleChange} name="post"type='text' className='item_input names' />
                                </div>
                            </div>
                            <div className="col-6 col-7 row ps-5 mx-0 px-0">
                                <div className='mx-0 px-0 col-5'>
                                    Pin
                                </div>
                                <div className='mx-0 px-0 col-7'>
                                    <input onChange={handleChange} name="pin"type='text' className='item_input names' />
                                </div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center ps-0 row mx-0 pe-5 my-2">
                            <div className="col-5 col-6 row mx-0 px-0">
                                <div className='mx-0 px-0 col-5'>
                                    Contact Person
                                </div>
                                <div className='mx-0 px-0 col-7'>
                                    <input onChange={handleChange} name="contact_person"type='text' className='item_input names' />
                                </div>
                            </div>
                            <div className="col-6 col-7 row ps-5 mx-0 px-0">
                                <div className='mx-0 px-0 col-5'>
                                    PIN Distance
                                </div>
                                <div className='mx-0 px-0 col-7'>
                                    <input onChange={handleChange} name="pin_distance"type='text' className='item_input names' />
                                </div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center ps-0 row mx-0 pe-5 my-2">
                            <div className='mx-0 px-0 col-5 col-6'>
                                Email
                            </div>
                            <div className='mx-0 px-0 col-6 col-7'>
                                <input onChange={handleChange} name="email"type='text' className='item_input names' />
                            </div>
                        </div>
                        <div className="d-flex align-items-center ps-0 row mx-0 pe-5 my-2">
                            <div className='mx-0 px-0 col-5 col-6'>
                                Mob
                            </div>
                            <div className='mx-0 px-0 col-6 col-7'>
                                <input onChange={handleChange} name="mobile"type='text' className='item_input names' />
                            </div>
                        </div>
                        <div className="d-flex align-items-center ps-0 row mx-0 pe-5 my-2">
                            <div className='mx-0 px-0 col-5 col-6'>
                                GSTin
                            </div>
                            <div className='mx-0 px-0 col-6 col-7'>
                                <input onChange={handleChange} name="gst_in"type='text' className='item_input names' />
                            </div>
                        </div>
                        {/* <div className="d-flex align-items-center ps-0 row mx-0 pe-5 my-2">
                            <div className='mx-0 px-0 col-5 col-6'>
                                GSTin
                            </div>
                            <div className='mx-0 px-0 col-6 col-7'>
                                <input onChange={handleChange} name=""type='text' className='item_input names' />
                            </div>
                        </div> */}
                        <div className="d-flex align-items-center ps-0 row mx-0 pe-5 my-2">
                            <div className="col-5 col-6 row mx-0 px-0">
                                <div className='mx-0 px-0 col-5'>
                                    Disc %
                                </div>
                                <div className='mx-0 px-0 col-7'>
                                    <input onChange={handleChange} name="disc"type='text' className='item_input names' />
                                </div>
                            </div>
                            <div className="col-6 col-7 row ps-5 mx-0 px-0">
                                <div className='mx-0 px-0 col-5'>
                                    Op Balance
                                </div>
                                <div className='mx-0 px-0 col-7'>
                                    <input onChange={handleChange} name="opening_balance"type='text' className='item_input names' />
                                </div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center ps-0 row mx-0 pe-4 my-2">
                            <div className='mx-0 px-0 col-5'>
                                Credit Limit
                            </div>
                            <div className='mx-0 px-0 col-3 col-4 pe-2'>
                                <input onChange={handleChange} name="credit_limit_in_amt" type='text' placeholder='In Amnt' className='item_input names credit' />
                            </div>
                            <div className='mx-0 col-3 col-4 pe-4 ps-0'>
                                <input onChange={handleChange} name="credit_limit_in_days" type='text' placeholder='In Days' className='item_input names credit' />
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

                    <form onSubmit={handleSubmit} className='item_add_form_part2 row mx-0 px-0 me-0 col-6 border-0'>

                        <div className="d-flex align-items-start justify-content-between mx-0 ps-4 pe-0">
                            <div className='mx-0 px-0 '>
                                Route
                            </div>
                            <div className='mx-0 px-0 '>
                            <SearchDropDown containerClass="large" id="route" addNew={true}  setNew={addNewOption} options={listItem}
                            {... { showDropdown, setShowDropdown }} setDataValue={setCustomerAdd} selectedValue={customerAdd}/>
                            </div>
                        </div>
                        <div className="d-flex align-items-start justify-content-between mx-0 ps-4 pe-0 my-2">
                            <div className='mx-0 px-0 '>
                                City
                            </div>
                            <div className='mx-0 px-0 '>
                            <SearchDropDown containerClass="large" id="city" addNew={true}  setNew={addNewOption} options={listItem}
                            {... { showDropdown, setShowDropdown }} setDataValue={setCustomerAdd} selectedValue={customerAdd}/>
                            </div>
                        </div>
                        <div className="d-flex align-items-start justify-content-between mx-0 ps-4 pe-0 my-2">
                            <div className='mx-0 px-0 '>
                                Town
                            </div>
                            <div className='mx-0 px-0 '>
                                <SearchDropDown containerClass="large" id="town" addNew={true}  setNew={addNewOption} options={listItem}
                            {... { showDropdown, setShowDropdown }} setDataValue={setCustomerAdd} selectedValue={customerAdd}/>
                            </div>
                        </div>
                        <div className="d-flex align-items-start justify-content-between mx-0 ps-4 pe-0 my-2">
                            <div className='mx-0 px-0 '>
                                District
                            </div>
                            <div className='mx-0 px-0 '>
                                <SearchDropDown containerClass="large" id="district" addNew={true}  setNew={addNewOption} options={listItem}
                            {... { showDropdown, setShowDropdown }} setDataValue={setCustomerAdd} selectedValue={customerAdd}/>
                            </div>
                        </div>
                        <div className="d-flex align-items-start justify-content-between mx-0 ps-4 pe-0 my-2">
                            <div className='mx-0 px-0 '>
                                Type
                            </div>
                            <div className='mx-0 px-0 '>
                                <SearchDropDown containerClass="large" id="types" addNew={true}  setNew={addNewOption} options={listItem}
                            {... { showDropdown, setShowDropdown }} setDataValue={setCustomerAdd} selectedValue={customerAdd}/>
                            </div>
                        </div>
                        <div className="d-flex align-items-start justify-content-between mx-0 ps-4 pe-0 my-2">
                            <div className='mx-0 px-0 '>
                                Rate Type
                            </div>
                            <div className='mx-0 px-0 '>
                                <SearchDropDown containerClass="large" id="rate_types" setNew={addNewOption} options={listItem}
                            {... { showDropdown, setShowDropdown }} setDataValue={setCustomerAdd} selectedValue={customerAdd}/>
                            </div>
                        </div>
                        <div className="d-flex align-items-start justify-content-between mx-0 ps-4 pe-0 my-2">
                            <div className='mx-0 px-0 '>
                                Bill Type
                            </div>
                            <div className='mx-0 px-0 '>
                                <SearchDropDown containerClass="large" id="bill_type" addNew={true}  setNew={addNewOption} options={listItem}
                            {... { showDropdown, setShowDropdown }} setDataValue={setCustomerAdd} selectedValue={customerAdd}/>
                            </div>
                        </div>
                        <div className="d-flex align-items-center row mx-0 ps-4 pe-3 my-2">
                            <div className='mx-0 px-0  col-3 me-2'>
                                Remarks
                            </div>
                            <div className='ps-2 ms-4 px-0 col-8'>
                                <textarea onChange={handleChange} name='remark' rows={3} className='item_input names' />
                            </div>
                        </div>
                        <div className="d-flex align-items-center row mx-0 ps-4 pe-3 my-2">
                            <div className='mx-0 px-0 col-4 d-flex align-items-center'>
                                <input onChange={handleChange} name="repeat" type='checkbox' value='Repeat' />
                                <label className='px-2'>Repeat</label>
                            </div>
                            <div className='mx-0 px-0 ps-4 col-8 d-flex align-items-center'>
                                <input onChange={handleChange} name="blocked" type='checkbox' value='Blocked' />
                                <label className='px-2'>Blocked</label>
                            </div>
                        </div>
                        <div className="bottom-btn-section row px-0 ms-2 mx-0 my-2">
                            <div className='mx-0 px-0 col-4' />
                            <div className='mx-0 px-1 col-4'>
                                <button type='reset' className='btn btn-sm btn-outline-dark w-100'>Clear</button>
                            </div>
                            <div className='mx-0 px-1 col-4'>
                                <button type className='btn btn-sm btn-dark w-100'>Save</button>
                            </div>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    )
}

export default CustomerAdd

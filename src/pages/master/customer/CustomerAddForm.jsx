import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import useCustomerServices from '../../../services/master/customerServices'
import SearchDropDown from '../../../components/searchDropDown/SearchDropDown'

const CustomerAddForm = ({edit,refresh}) =>{

    const [showDropdown, setShowDropdown ] = useState(1)
    const [listItem, setLisItem] = useState({
        district:[],
        route:[],
        city:[],
        town:[],
        types:[],
        rate_types:[{label:"MRP",value:"MRP"},{label:"RET_RATE",value:"RET_RATE"},{label:"WS_RATE",value:"WS_RATE"},{label:"SWS_RATE",value:"SWS_RATE"},{label:"QTN_RATE",value:"QTN_RATE"},{label:"RENT_RATE",value:"RENT_RATE"}],
        bill_types:[],
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
        payment_type:'TO_GIVE',
        district:null,
        route:null,
        city:null,
        town:null,
        types:null,
        rate_types:null,
        bill_types:null,
        creadit_limit_in_amt:null,
        creadit_limit_in_days:null,
    })

    const {
        postRoute,
        postCity,
        postTown,
        postDistrict,
        postRateType,
        postTypes,
        postBillType,
        postCustomer,
        getBillType,
        getRoute,
        getCity,
        getTown,
        getDistrict,
        getRateType,
        getTypes,
        putCustomer,
    } = useCustomerServices()

    useEffect(()=>{
        getData()
    },[])

    useEffect(()=>{
        let keys = Object.keys(customerAdd)
        if(edit){
            // console.log(keys)
            keys.map((key)=>{
                // if(key==='rate_types') 
                if(key.match(/^district|^route|^city|^town|^types|^bill_types/)){
                let a = "fk_"+key
                if(edit[a]){
                    setCustomerAdd(data=>({...data,[key]:edit[a]}))}
            }
            else
            setCustomerAdd(data=>({...data,[key]:edit[key]}))
           })
        }
    },[edit, ])

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
        res = await getBillType()
        if(res.success) miniFunct(res.data,'bill_types')
        setLisItem(list)
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
                case 'route':
                    res = await postRoute(submitData);
                    setCustomerAdd(data=>({...data,[state]:res.data.id}));break;
                case 'city':
                    res = await postCity(submitData);
                    setCustomerAdd(data=>({...data,[state]:res.data.id}));break;
                case 'town':
                    res = await postTown(submitData);
                    setCustomerAdd(data=>({...data,[state]:res.data.id}));break;
                case 'district':
                    res = await postDistrict(submitData);
                    setCustomerAdd(data=>({...data,[state]:res.data.id}));break;
                case 'types':
                    res = await postTypes(submitData);
                    setCustomerAdd(data=>({...data,[state]:res.data.id}));break;
                case 'rate_types':
                    res = await postRateType(submitData);
                    setCustomerAdd(data=>({...data,[state]:res.data.id}));break;
                case 'bill_types':
                    res = await postBillType(submitData);
                    setCustomerAdd(data=>({...data,[state]:res.data.id}));break;
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
            let submitData = customerAdd
            const names = ['district','route','city','town','bill_types','types']
            let data = handleChangeFk(names,submitData)
            let res 
            if(edit){
                res = await putCustomer(edit.id,data)
            }else{
                res = await postCustomer(data)
            }
            if(res.success){
                Swal.fire(res.message,'','success')
                handleReset()
                refresh()
            }else{
                Swal.fire(res.message,'','error')
            }
        }catch(err){
            Swal.fire('Something went wrong pls try again','','error')
        }
    }

    const handleChangeFk = (name,submitData)=>{
        name.map(x=>{
            submitData['fk_'+x] = submitData[x]
            delete submitData[x]
        })
        console.log(submitData)
        return submitData
    }

    const handleReset = () =>{
        let key = Object.keys(customerAdd)
        key.map((data)=>{
                setCustomerAdd(val=>({...val,[data]:''}))
            })
    }

    const handleChange = (e) =>{
        if(typeof e.target.value === 'string')
            e.target.value = e.target.value.toUpperCase()
        if(e.target.value === '') 
            setCustomerAdd(data => ( {...data,[e.target.name] : null} ))
        else 
            setCustomerAdd(data => ( {...data,[e.target.name] : e.target.value} ))
    }

    return(
        <form onSubmit={handleSubmit} className='item_add_cont'>
            Add New Customer
            <div className='item_add_form pt-1 d-flex mt-1'>

                {/* item details --------------------------------------------------------------------------------------- */}

                <div className='item_add_form_part1 col-6 row mx-0 px-0'>

                    <div className="d-flex align-items-center ps-0 row mx-0 pe-5 my-2">
                        <div className='mx-0 px-0 col-5 col-6'>
                            Code
                        </div>
                        <div className='mx-0 px-0 col-6 col-7'>
                            <input onChange={handleChange} name="code" value={customerAdd.code} type='text' className='item_input names' />
                        </div>
                    </div>
                    <div className="d-flex align-items-center ps-0 row mx-0 pe-5 my-2">
                        <div className='mx-0 px-0 col-5 col-6'>
                            Name
                        </div>
                        <div className='mx-0 px-0 col-6 col-7'>
                            <input onChange={handleChange} name="name" value={customerAdd.name} type='text' className='item_input names' />
                        </div>
                    </div>
                    <div className="d-flex align-items-center ps-0 row mx-0 pe-5 my-2">
                        <div className='mx-0 px-0 col-5 col-6'>
                            Address
                        </div>
                        <div className='mx-0 px-0 col-6 col-7'>
                            <textarea onChange={handleChange} name='address' value={customerAdd.address}  rows={4} className='item_input names' />
                        </div>
                    </div>
                    <div className="d-flex align-items-center ps-0 row mx-0 pe-5 my-2">
                        <div className="col-5 col-6 row mx-0 px-0">
                            <div className='mx-0 px-0 col-5'>
                                Post
                            </div>
                            <div className='mx-0 px-0 col-7'>
                                <input onChange={handleChange} name="post" value={customerAdd.post} type='text' className='item_input names' />
                            </div>
                        </div>
                        <div className="col-6 col-7 row ps-5 mx-0 px-0">
                            <div className='mx-0 px-0 col-5'>
                                Pin
                            </div>
                            <div className='mx-0 px-0 col-7'>
                                <input onChange={handleChange} name="pin" value={customerAdd.pin} type='text' className='item_input names' />
                            </div>
                        </div>
                    </div>
                    <div className="d-flex align-items-center ps-0 row mx-0 pe-5 my-2">
                        <div className="col-5 col-6 row mx-0 px-0">
                            <div className='mx-0 px-0 col-5'>
                                Contact Person
                            </div>
                            <div className='mx-0 px-0 col-7'>
                                <input onChange={handleChange} name="contact_person" value={customerAdd.contact_person} type='text' className='item_input names' />
                            </div>
                        </div>
                        <div className="col-6 col-7 row ps-5 mx-0 px-0">
                            <div className='mx-0 px-0 col-5'>
                                PIN Distance
                            </div>
                            <div className='mx-0 px-0 col-7'>
                                <input onChange={handleChange} name="pin_distance" value={customerAdd.pin_distance} type='text' className='item_input names' />
                            </div>
                        </div>
                    </div>
                    <div className="d-flex align-items-center ps-0 row mx-0 pe-5 my-2">
                        <div className='mx-0 px-0 col-5 col-6'>
                            Email
                        </div>
                        <div className='mx-0 px-0 col-6 col-7'>
                            <input onChange={handleChange} name="email" value={customerAdd.email} type='text' className='item_input names' />
                        </div>
                    </div>
                    <div className="d-flex align-items-center ps-0 row mx-0 pe-5 my-2">
                        <div className='mx-0 px-0 col-5 col-6'>
                            Mob
                        </div>
                        <div className='mx-0 px-0 col-6 col-7'>
                            <input onChange={handleChange} name="mobile" value={customerAdd.mobile} type='text' className='item_input names' />
                        </div>
                    </div>
                    <div className="d-flex align-items-center ps-0 row mx-0 pe-5 my-2">
                        <div className='mx-0 px-0 col-5 col-6'>
                            GSTin
                        </div>
                        <div className='mx-0 px-0 col-6 col-7'>
                            <input onChange={handleChange} name="gst_in" value={customerAdd.gst_in} type='text' className='item_input names' />
                        </div>
                    </div>
                    {/* <div className="d-flex align-items-center ps-0 row mx-0 pe-5 my-2">
                        <div className='mx-0 px-0 col-5 col-6'>
                            GSTin
                        </div>
                        <div className='mx-0 px-0 col-6 col-7'>
                            <input onChange={handleChange} name=""type= value={customerAdd.type} 'text' className='item_input names' />
                        </div>
                    </div> */}
                    <div className="d-flex align-items-center ps-0 row mx-0 pe-5 my-2">
                        <div className="col-5 col-6 row mx-0 px-0">
                            <div className='mx-0 px-0 col-5'>
                                Disc %
                            </div>
                            <div className='mx-0 px-0 col-7'>
                                <input onChange={handleChange} name="disc" value={customerAdd.disc} type='text' className='item_input names' />
                            </div>
                        </div>
                        <div className="col-6 col-7 row ps-5 mx-0 px-0">
                            <div className='mx-0 px-0 col-5'>
                                Op Balance
                            </div>
                            <div className='mx-0 px-0 col-7'>
                                <input onChange={handleChange} name="opening_balance" value={customerAdd.opening_balance} type='text' className='item_input names' />
                            </div>
                        </div>
                    </div>
                    <div className="d-flex align-items-center ps-0 row mx-0 pe-4 my-2">
                        <div className='mx-0 px-0 col-5'>
                            Credit Limit
                        </div>
                        <div className='mx-0 px-0 col-3 col-4 pe-2'>
                            <input onChange={handleChange} name="creadit_limit_in_amt" value={customerAdd.creadit_limit_in_amt}  type='text' placeholder='In Amnt' className='item_input names credit' />
                        </div>
                        <div className='mx-0 col-3 col-4 pe-4 ps-0'>
                            <input onChange={handleChange} name="creadit_limit_in_days" value={customerAdd.creadit_limit_in_days}  type='text' placeholder='In Days' className='item_input names credit' />
                        </div>
                    </div>
                    <div className="d-flex align-items-center ps-0 row mx-0 pe-4 my-2">
                        <div className='mx-0 px-0 col-6' />
                        <div className='mx-0 col-3 ps-2 pe-2'>
                            <select onChange={handleChange} name='payment_type' value={customerAdd.payment_type}  placeholder='To Recieve' className='customer-select'>
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
                            <SearchDropDown containerClass="large" id="bill_types" addNew={true}  setNew={addNewOption} options={listItem}
                        {... { showDropdown, setShowDropdown }} setDataValue={setCustomerAdd} selectedValue={customerAdd}/>
                        </div>
                    </div>
                    <div className="d-flex align-items-center row mx-0 ps-4 pe-3 my-2">
                        <div className='mx-0 px-0  col-3 me-2'>
                            Remarks
                        </div>
                        <div className='ps-2 ms-4 px-0 col-8'>
                            <textarea onChange={handleChange} name='remark' value={customerAdd.remark}  rows={3} className='item_input names' />
                        </div>
                    </div>
                    <div className="d-flex align-items-center row mx-0 ps-4 pe-3 my-2">
                        <div className='mx-0 px-0 col-4 d-flex align-items-center'>
                            <input onChange={handleChange} name="repeat" value={customerAdd.repeat}  type='checkbox' />
                            <label className='px-2'>Repeat</label>
                        </div>
                        <div className='mx-0 px-0 ps-4 col-8 d-flex align-items-center'>
                            <input onChange={handleChange} name="blocked" value={customerAdd.blocked}  type='checkbox'/>
                            <label className='px-2'>Blocked</label>
                        </div>
                    </div>
                    <div className="bottom-btn-section row px-0 ms-2 mx-0 my-2">
                        <div className='mx-0 px-0 col-4' />
                        <div className='mx-0 px-1 col-4'>
                            <button onClick={handleReset} type='reset' className='btn btn-sm btn-outline-dark w-100'>Clear</button>
                        </div>
                        <div className='mx-0 px-1 col-4'>
                            <button type='submit' className='btn btn-sm btn-dark w-100'>Save</button>
                        </div>
                    </div>

                </div>

            </div>
        </form>
    )
}

export default CustomerAddForm
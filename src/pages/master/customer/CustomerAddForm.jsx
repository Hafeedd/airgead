import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import deleteBtn from "../../../assets/icons/delete-white.svg"
import useCustomerServices from '../../../services/master/customerServices'
import SearchDropDown from '../../../components/searchDropDown/SearchDropDown'
import { Modal } from 'react-bootstrap'
import useItemServices from '../../../services/master/itemServices'

const CustomerAddForm = ({edit,refresh}) =>{

    const [showDropdown, setShowDropdown ] = useState(1)
    const [showRates, setShowRates] = useState(false)
    const [customer, setCustomer] = useState([])
    const [ratesEdit, setRatesEdit] = useState(false)
    const [ratesTempList, setRatesTempList] = useState([])
    const [itemNameList, setItemNameList] = useState([])
    const [rates, setRates] = useState({
        R_item:null,
        R_wsRate:null,
        R_rtRate:null,
        R_mrp:null,
        R_id:null,
    })
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
        alt_mobile:null,
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
        deleteSetRate,
        putSetRate,
        postSetRate,
        getSetRate,
        deleteCustomer,
    } = useCustomerServices()

    const {getProperty,postProperty} = useItemServices()

    const {
        getItemNameList,
    } = useItemServices()

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
        }else{
            handleReset()
        }
    },[edit, ])

    const handleRatesClear = () =>{
        let x = Object.keys(rates)
        x.map(key=>{
            setRates(data=>({...data,[key]:null}))
        })
    }

    const addToList = async () =>{
        console.log(rates)
        let valuesOfRates = Object.values(rates)
        let valueCheck = valuesOfRates.filter(x=>x!==null&&x!=='')
        // console.log(valueCheck)
        if(ratesEdit && valuesOfRates.length>3){
            try{
                const data = {fk_item:rates.R_id,wholesale_rate:rates.R_wsRate,retail_rate:rates.R_rtRate,mrp:rates.R_mrp}
                let res = await putSetRate(ratesEdit,data)
                if(res.success){
                    refresh()
                    handleRatesClear()
                    // unitConvShow(false)
                    // setUnitEdit(false)
                }else{
                    
                }
            }catch (err){

            }
        }
        else{
            if(valueCheck.length>4){
            let g = ratesTempList
            g.push(rates)
            setRatesTempList(g)
            let r = {}
            valuesOfRates.map(data=> r = {...r,[data]:''})
            handleRatesClear()}
        }
    }

    const setItemNameListState = (data) => {
        let tempList = []
        data.map(item=>{
            item['value'] = item.id
            delete item.id
            item['label'] = item.name
            delete item.name
            tempList.push(item)
        })
        setItemNameList(tempList)
    }

    const getData =async () =>{
        let list = {}
        const miniFunct = (data) =>{
            const keys = Object.keys(listItem)
            data.map((x)=>{
                if(keys.indexOf(x.property_type)>-1){
                    list[x.property_type] = []
                list[x?.property_type].push({value:x['id'],label:x['property_value']})}
                })
        }
        try{
            let res = await getProperty()
            if(res.success)
                miniFunct(res?.data)
        // res = await getItemNameList()
        // if(res.success) setItemNameListState(res.data)
        // res = await getDistrict()
        // if(res.success) miniFunct(res.data,'district')
        // res = await getRoute()
        // if(res.success) miniFunct(res.data,'route')
        // res = await getCity()
        // if(res.success) miniFunct(res.data,'city')
        // res = await getTown()
        // if(res.success) miniFunct(res.data,'town')
        // res = await getTypes()
        // if(res.success) miniFunct(res.data,'types')
        // res = await getRateType()
        // if(res.success) miniFunct(res.data,'rate_types')
        // res = await getBillType()
        // if(res.success) miniFunct(res.data,'bill_types')
        if(Object.keys(list).length !==0)
            setLisItem(list)
        }catch(err){
            // console.log(err)
        }
    }

    const addNewOption = async (e,data,state) =>{
        e.preventDefault()
        let value = data.value
        try{
            let submitData = {property_value:value,property_type:state}
            let res = await postProperty(submitData)
            if(res.success)
                setCustomerAdd(data=>({...data,[state]:res.data.id}))
                if(res.success){
                    Swal.fire('Option Added Successfylly','','success')
                }
                getData()
        }catch(err){
                Swal.fire('Failed to add option','','error')
        }
        }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        try{
            let submitData = customerAdd
            const names = ['district','route','city','town','bill_types','types']
            let data = handleChangeFk(names,submitData)
            let res , res2 = 1
            if(edit){
                res = await putCustomer(edit.id,data)
            }else{
                res = await postCustomer(data)
            }
            if(res.success && !edit){
                if(ratesTempList.length>0){
                    ratesTempList.map(async x=>{
                        const data = {fk_item:x.R_id,wholesale_rate:x.R_wsRate,retail_rate:x.R_rtRate,mrp:x.R_mrp}
                 res2 = await postSetRate(res?.data?.id,data)
                    })
                }
                if(res2 !==1 && res2.success){
                    Swal.fire(res?.message,'','success')
                    handleReset()
                    refresh()
                }else if(res2 !=1 && !res2.success){
                    Swal.fire(res2?.message,'','error')
                    await deleteCustomer(res?.data?.id)
                }
            }else if(res?.success && !edit){
                Swal.fire(res?.message,'','error')
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
                setCustomerAdd(val=>({...val,[data]:null}))
            })
    }

    const handleChange = (e) =>{
        if(typeof e.target.value === 'string' && (e.target.name !== 'email' && e.target.name != "R_item")){
                e.target.value = e.target.value.toUpperCase()}
        if(e.target.name.match(/^R_/)){
            if(e.target.value === '' || (e.target.name === 'R_item' && e.target.value.length<0)){ 
                setRates(data => ( {...data,  [e.target.name] : null} ))}
                else{
                        if(e.target.name === 'R_item' && e.target.value !== null){
                            itemNameList.forEach(obj=>{
                                console.log(obj)
                                console.log(e.target.value)
                                if(obj.value==e.target.value){
                                    setRates(data => ( {...data,  [e.target.name] : obj.label , ['R_id']:e.target.value} ))
                                }
                            })
                        }
                //     let a = JSON.parse(e.target.value)
                //     setRates(data => ( {...data,[e.target.name] : a.label,['R_id']:a.value} ))
                //     // setRates(data => ( {...data,  [e.target.name] :a[0]} ))
                //     // setRates(data => ( {...data,  ['R_id'] : a[1]} ))
                    else{
                        setRates(data => ( {...data,  [e.target.name] : e.target.value} ))
                    }
                }
            }
        else{
            if(e.target.value === '') 
                setCustomerAdd(data => ( {...data,  [e.target.name] : null} ))
            else
                setCustomerAdd(data => ( {...data,[e.target.name] : e.target.value} ))
        }
    }

    return(
        <form onSubmit={handleSubmit} className='item_add_cont'>
            Add New Customer
            <div className='item_add_form pt-1 d-flex mt-1'>

                {/* item details --------------------------------------------------------------------------------------- */}

                <div className='item_add_form_part1 col-6 row mx-0 px-0'>

                    <div className="d-flex align-items-center ps-0 row mx-0 my-2">
                        <div className='mx-0 px-0 col-5 col-6'>
                            Code
                        </div>
                        <div className='mx-0 px-0 col-6 col-7'>
                            <input onChange={handleChange} name="code" value={customerAdd.code||''} type='text' required className='item_input names' />
                        </div>
                    </div>
                    <div className="d-flex align-items-center ps-0 row mx-0 my-2">
                        <div className='mx-0 px-0 col-5 col-6'>
                            Name
                        </div>
                        <div className='mx-0 px-0 col-6 col-7'>
                            <input onChange={handleChange} name="name" value={customerAdd.name||''} type='text' required className='item_input names' />
                        </div>
                    </div>
                    <div className="d-flex align-items-center ps-0 row mx-0 my-2">
                        <div className='mx-0 px-0 col-5 col-6'>
                            Address
                        </div>
                        <div className='mx-0 px-0 col-6 col-7'>
                            <textarea onChange={handleChange} name='address' value={customerAdd.address||''}  rows={4} className='item_input names' />
                        </div>
                    </div>
                    <div className="d-flex align-items-center ps-0 row mx-0 my-2">
                        <div className="col-5 col-6 row mx-0 px-0">
                            <div className='mx-0 px-0 col-5'>
                                Post
                            </div>
                            <div className='mx-0 px-0 col-7'>
                                <input onChange={handleChange} name="post" value={customerAdd.post||''} type='text' className='item_input names' />
                            </div>
                        </div>
                        <div className="col-6 col-7 row ps-5 mx-0 px-0">
                            <div className='mx-0 px-0 col-5'>
                                Pin
                            </div>
                            <div className='mx-0 px-0 col-7'>
                                <input onChange={handleChange} name="pin" value={customerAdd.pin||''} type='text' className='item_input names' />
                            </div>
                        </div>
                    </div>
                    <div className="d-flex align-items-center ps-0 row mx-0 my-2">
                        <div className="col-5 col-6 row mx-0 px-0">
                            <div className='mx-0 px-0 col-5'>
                                Contact Person
                            </div>
                            <div className='mx-0 px-0 col-7'>
                                <input onChange={handleChange} name="contact_person" value={customerAdd.contact_person||''} type='text' className='item_input names' />
                            </div>
                        </div>
                        <div className="col-6 col-7 row ps-5 mx-0 px-0">
                            <div className='mx-0 px-0 col-5'>
                                PIN Distance
                            </div>
                            <div className='mx-0 px-0 col-7'>
                                <input onChange={handleChange} name="pin_distance" value={customerAdd.pin_distance||''} type='text' className='item_input names' />
                            </div>
                        </div>
                    </div>
                    <div className="d-flex align-items-center ps-0 row mx-0 my-2">
                        <div className='mx-0 px-0 col-5 col-6'>
                            Email
                        </div>
                        <div className='mx-0 px-0 col-6 col-7'>
                            <input onChange={handleChange} name="email" value={customerAdd.email||''} type='text' className='text-lowercase item_input names' />
                        </div>
                    </div>
                    <div className="d-flex align-items-center ps-0 row mx-0 my-2">
                        <div className='mx-0 px-0 col-5 col-6'>
                            Mob
                        </div>
                        <div className='mx-0 px-0 col-6 col-7'>
                            <input onChange={handleChange} name="mobile" value={customerAdd.mobile||''} type='number' className='item_input names' />
                        </div>
                    </div>
                    <div className="d-flex align-items-center ps-0 row mx-0 my-2">
                        <div className='mx-0 px-0 col-5 col-6'>
                            Alt Mob
                        </div>
                        <div className='mx-0 px-0 col-6 col-7'>
                            <input onChange={handleChange} name="alt_mobile" value={customerAdd.alt_mobile||''} type='number' className='item_input names' />
                        </div>
                    </div>
                    <div className="d-flex align-items-center ps-0 row mx-0 my-2">
                        <div className='mx-0 px-0 col-5 col-6'>
                            GSTin
                        </div>
                        <div className='mx-0 px-0 col-6 col-7'>
                            <input onChange={handleChange} name="gst_in" value={customerAdd.gst_in||''} type='text' className='item_input names' />
                        </div>
                    </div>
                    {/* <div className="d-flex align-items-center ps-0 row mx-0 my-2">
                        <div className='mx-0 px-0 col-5 col-6'>
                            GSTin
                        </div>
                        <div className='mx-0 px-0 col-6 col-7'>
                            <input onChange={handleChange} name=""type= value={customerAdd.type||''} 'text' className='item_input names' />
                        </div>
                    </div> */}
                    {/* <div className="d-flex align-items-center ps-0 row mx-0 my-2">
                        <div className="col-5 col-6 row mx-0 px-0">
                            <div className='mx-0 px-0 col-5'>
                                Disc %
                            </div>
                            <div className='mx-0 px-0 col-7'>
                                <input onChange={handleChange} name="disc" value={customerAdd.disc||''} type='text' className='item_input names' />
                            </div>
                        </div>
                        <div className="col-6 col-7 row ps-5 mx-0 px-0">
                            <div className='mx-0 px-0 col-5'>
                                Op Balance
                            </div>
                            <div className='mx-0 px-0 col-7'>
                                <input onChange={handleChange} name="opening_balance" value={customerAdd.opening_balance||''} type='text' className='item_input names' />
                            </div>
                        </div>
                    </div> */}
                    <div className="d-flex align-items-center ps-0 row mx-0 my-2">
                        <div className='mx-0 px-0 col-5 col-6'>
                            Credit Limit
                        </div>
                        <div className='mx-0 px-0 col-6 col-7 d-flex gap-2'>
                            <input onChange={handleChange} name="creadit_limit_in_amt" value={customerAdd.creadit_limit_in_amt||''}  type='text' placeholder='In Amnt' className='item_input names credit' />
                            <input onChange={handleChange} name="creadit_limit_in_days" value={customerAdd.creadit_limit_in_days||''}  type='text' placeholder='In Days' className='item_input names credit' />
                        </div>
                    </div>

                    <div className="d-flex align-items-center ps-0 row mx-0 my-2">
                                <div className='mx-0 px-0 col-5 col-6'>
                                    Op Balance
                                </div>
                                <div className='mx-0 px-0 col-6 col-7'>
                                    <div className='item_input row rounded-2 align-items-center p-0 mx-0'>
                                        <div className='col-6 col-7 mx-0 px-0 me-0'>
                                        <input onChange={handleChange} name="opening_balance" value={customerAdd.opening_balance||''} type='text' className='item_input names border-0' />
                                        </div>
                                        <div className='col-6 col-5 mx-0 px-0 pe-1 d-flex'>
                                        <select onChange={handleChange} name='payment_type' value={customerAdd.payment_type||''}  placeholder='To Recieve' className='customer-select ms-0 pe-0'>
                                            <option value="TO_GIVE">To Give</option>
                                            <option value="TO_RECEIVE">To Receive</option>
                                        </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* ------------------------------ */}
                            <div className="d-flex align-items-center ps-0 row mx-0 my-2">
                                <div className='mx-0 px-0 col-5 col-6'>
                                    Disc %
                                </div>
                                <div className='mx-0 px-0 col-3 col-4'>
                                <input onChange={handleChange} name="disc" value={customerAdd.disc||''} type='text' className='item_input names' />
                                </div>
                                <div className='mx-0 px-0 col-3 d-flex ps-1'>
                                    <div onClick={()=>setShowRates(true)} className='btn btn-sm btn-dark py-0 w-100 rates-btn'>Set Rates</div>
                                </div>      
                            </div>
                </div>

                {/* item rate ----------------------------------------------------------------------------------------------------------- */}

                <div className='item_add_form_part2 row mx-0 px-0 me-0 col-6 border-0'>

                    <div className="d-flex align-items-start justify-content-between mx-0 ps-4 pe-0">
                        <div className='col-3 col-4'>
                            Route
                        </div>
                        <div className='mx-0 px-0 col-7 col-8'>
                        <SearchDropDown containerClass="large" id="route" addNew={true}  setNew={addNewOption} options={listItem}
                        {... { showDropdown, setShowDropdown }} setDataValue={setCustomerAdd} selectedValue={customerAdd||''}/>
                        </div>
                    </div>
                    <div className="d-flex align-items-start justify-content-between mx-0 ps-4 pe-0 my-2">
                        <div className='col-3 col-4'>
                            City
                        </div>
                        <div className='mx-0 px-0 col-7 col-8'>
                        <SearchDropDown containerClass="large" id="city" addNew={true}  setNew={addNewOption} options={listItem}
                        {... { showDropdown, setShowDropdown }} setDataValue={setCustomerAdd} selectedValue={customerAdd||''}/>
                        </div>
                    </div>
                    <div className="d-flex align-items-start justify-content-between mx-0 ps-4 pe-0 my-2">
                        <div className='col-3 col-4'>
                            Town
                        </div>
                        <div className='mx-0 px-0 col-7 col-8'>
                            <SearchDropDown containerClass="large" id="town" addNew={true}  setNew={addNewOption} options={listItem}
                        {... { showDropdown, setShowDropdown }} setDataValue={setCustomerAdd} selectedValue={customerAdd||''}/>
                        </div>
                    </div>
                    <div className="d-flex align-items-start justify-content-between mx-0 ps-4 pe-0 my-2">
                        <div className='col-3 col-4'>
                            District
                        </div>
                        <div className='mx-0 px-0 col-7 col-8'>
                            <SearchDropDown containerClass="large" id="district" addNew={true}  setNew={addNewOption} options={listItem}
                        {... { showDropdown, setShowDropdown }} setDataValue={setCustomerAdd} selectedValue={customerAdd||''}/>
                        </div>
                    </div>
                    <div className="d-flex align-items-start justify-content-between mx-0 ps-4 pe-0 my-2">
                        <div className='col-3 col-4'>
                            Type
                        </div>
                        <div className='mx-0 px-0 col-7 col-8'>
                            <SearchDropDown containerClass="large" id="types" addNew={true}  setNew={addNewOption} options={listItem}
                        {... { showDropdown, setShowDropdown }} setDataValue={setCustomerAdd} selectedValue={customerAdd||''}/>
                        </div>
                    </div>
                    <div className="d-flex align-items-start justify-content-between mx-0 ps-4 pe-0 my-2">
                        <div className='col-3 col-4'>
                            Rate Type
                        </div>
                        <div className='mx-0 px-0 col-7 col-8'>
                            <SearchDropDown containerClass="large" id="rate_types" noAdd={true} noSearch={true} setNew={addNewOption} options={listItem}
                        {... { showDropdown, setShowDropdown }} setDataValue={setCustomerAdd} selectedValue={customerAdd||''}/>
                        </div>
                    </div>
                    <div className="d-flex align-items-start justify-content-between mx-0 ps-4 pe-0 my-2">
                        <div className='col-3 col-4'>
                            Bill Type
                        </div>
                        <div className='mx-0 px-0 col-7 col-8'>
                            <SearchDropDown containerClass="large" id="bill_types" addNew={true}  setNew={addNewOption} options={listItem}
                        {... { showDropdown, setShowDropdown }} setDataValue={setCustomerAdd} selectedValue={customerAdd||''}/>
                        </div>
                    </div>
                    <div className="d-flex align-items-start justify-content-between mx-0 ps-4 pe-0 my-2">
                        <div className='col-3 col-4'>
                            Remarks
                        </div>
                        <div className='mx-0 px-0 col-7 col-8'>
                            <textarea onChange={handleChange} name='remark' value={customerAdd.remark||''}  rows={3} className='item_input names' />
                        </div>
                    </div>
                    <div className="d-flex align-items-center row mx-0 ps-4 pe-3 my-2">
                        <div className='mx-0 px-0 col-4 d-flex align-items-center'>
                            <input onChange={handleChange} name="repeat" value={customerAdd.repeat||''}  type='checkbox' />
                            <label className='px-2'>Repeat</label>
                        </div>
                        <div className='mx-0 px-0 ps-4 col-8 d-flex align-items-center'>
                            <input onChange={handleChange} name="blocked" value={customerAdd.blocked||''}  type='checkbox'/>
                            <label className='px-2'>Blocked</label>
                        </div>
                    </div>
                    <div className="bottom-btn-section row px-0 ms-2 mx-0 my-2">
                        <div className='mx-0 px-0 col-4' />
                        <div className='mx-0 px-1 col-4'>
                            <button onClick={handleReset} type='reset' className='btn btn-sm btn-outline-dark w-100'>Clear</button>
                        </div>
                        <div className='mx-0 px-1 col-4'>
                            <button type='submit' className='btn btn-sm btn-dark w-100'>{edit?"Update":"Save"}</button>
                        </div>
                    </div>

                </div>

            </div>
            <Modal
            show={showRates}
            contentClassName="unit_modal px-3 bg-dark"
            dialogClassName='d-flex justify-content-center'
            size='lg'
            centered
            onHide={()=>setShowRates(false)}
            >
                <Modal.Body>
                <div className='text-light pb-2'>
                            <div className='unit_modal_body mt-2 px-3 pb-2'>
                                <table className='custom-table-2 names ms-2 position-relative'>
                                    <thead className='tabel-head'>
                                        <tr>
                                            <th>Item</th>
                                            <th>Ws.Rate</th>
                                            <th>Rt.Rate</th>
                                            <th>MRP</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody className='rounded-3 '>
                                        <tr className='table-head-input'>
                                            <td>
                                                <select onChange={handleChange} type='select' value={rates.R_id||''} className='unit_select py-2 text-light w-100' name='R_item'>
                                                    <option value={null}>Select</option>
                                                    {itemNameList?.length>0&&
                                                    itemNameList.map((data,index)=><option key={index} value={data.value}>{data.label}</option>)}
                                                </select>
                                            </td>
                                            <td><input onChange={handleChange} type='number' name='R_wsRate' value={rates.R_wsRate||''} className='w-100 text-light'/></td>                                
                                            <td><input onChange={handleChange} type='number' name='R_rtRate' value={rates.R_rtRate||''} className='w-100 text-light'/></td>
                                            <td><input onChange={handleChange} type='number' name='R_mrp' value={rates.R_mrp||''} className='w-100 text-light'/></td>
                                            <th className='col col-1 cursor text-center'>
                                                <img src={deleteBtn} alt="deletebtn"/>
                                            </th>
                                            <th className='btn-td'>
                                                <div onClick={addToList} className='add_unit_btn btn'>{"Add rate"}</div>
                                            </th>
                                        </tr>
                                        {(ratesTempList?.length>0)&&
                                        ratesTempList.map(data=>(
                                        <tr>
                                            <td><input disabled value={data.R_item} type='text' className='w-100 text-light'/></td>
                                            <td>
                                                <input disabled value={data.R_wsRate} type='text' className='w-100 text-light'/>
                                            </td>
                                            <td><input disabled value={data.R_rtRate} type='number' className='w-100 text-light'/></td>
                                            <td><input disabled value={data.R_mrp} type='number' className='w-100 text-light'/></td>
                                        </tr>))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                </Modal.Body>        
            </Modal>
        </form>
    )
}

export default CustomerAddForm
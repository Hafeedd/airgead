import { useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2'
import useItemServices from '../../../../../services/master/itemServices'
import deleteBtn from "../../../../../assets/icons/delete-white.svg"
import SearchDropDown from '../../../../../components/searchDropDown/SearchDropDown'
import { Modal } from 'react-bootstrap'
import { ListItem } from '@mui/material'

export const ItemAddForm = ({edit}) =>{

    const [showDropdown, setShowDropdown] = useState('')
    const typesOptions = [{label:"PRODUCT",value:"PRODUCT"},{label:"RAW MATERIAL",value:"RAW MATERIAL"},{label:"SERVICE",value:"SERVICE"}]
    const [unitConvShow, setUnitConvShow] = useState(false)
    const [barcodeShow, setBarcodeShow] = useState(false)
    const [unitConv, setUnitConv] = useState({
        unit:null,
        qty:null,
    })
    const [barcode, setBarcode] = useState({
        code:null,
        expiry:null,
    })
    const [listItem,setListItem] = useState({
        second_name:[],
        types:typesOptions,
        rent_type:[{label:"HOUR",value:"HOUR"},{label:"MONTH",value:"MONTH"}],
        category:[],
        sub_category:[],
        company:[],
        size:[],
        color:[],
        group:[],
        tax_group:[],
        rack:[],
        unit:[],
        transaction_unit:[],
    })
    const [itemadd,setItemAdd] = useState({
        code:null,
        hsn:null,
        name:null,
        second_name:null,
        types:null,
        category:null,
        sub_category:null,
        company:null,
        size:null,
        color:null,
        group:null,
        tax_group:null,
        rack:null,
        unit:null,
        transaction_unit:null,
        mrp_rate:null,
        retail_rate:null,
        wholesale_rate:null,
        super_wholesale_rate:null,
        quotation_rate:null,
        rent:null,
        rent_type:null,
        purchase_rate:null,
        cost:null,
        margin:null,
        tax_gst:null,
        cess_1:null,
        cess_2:null,
        purchase_discount:null,
        sale_discount:null,
        unload_charge:null,
        load_charge:null,
        point:null,
        commission:null,
        damage:null,
        qty_in_bc:null,
        open_stock:null,
        role:null,
        damge_cost:null,
        blocked:false,
        tax_inclusive:false,
        manuel_qty_in_bc:false,
        rent_item:false,
        gate_pass:false,
        barcode:null,
    })

    const formRef = useRef(null)

    useEffect(()=>{
        getData();
    },[])
    useEffect(()=>{
        let keys = Object.keys(itemadd)
        if(edit){
            keys.map((key)=>{
                if(key==='types') setItemAdd(data=>({...data,['types']:edit.type}))
                else if(key.match(/second_name|category|sub_category|company|size|color|group|tax_group/)){
                let a = "fk_"+key
                if(edit[a]){
                    setItemAdd(data=>({...data,[key]:edit[a]}))}
            }
            else setItemAdd(data=>({...data,[key]:edit[key]}))
           })
        }
    },[edit, ])

    // console.log(itemadd)

    const {
        postBarcode,postUnit,
        postRack,postTaxGroup,
        postGroup,postColor,
        postSize,postCompany,
        postSubCategory,postCategory,
        postSecondName,
        getBarcode,getUnit,
        getRack,getTaxGroup,
        getGroup,getColor,
        getSize,getCompany,
        getSubCategory,getCategory,
        getSecondName,deleteItem,
        postItemAdd,postUnitConvertion} = useItemServices()

    const getData = async () => {
        let list = {}
        const miniFunct = (data,name) =>{
            list[name] = []
            data.map((x)=>{
                list[name].push({value:x['id'],label:x[name]})
            })
        }
        try{
        let res
        res = await getSecondName()
        if(res.success) miniFunct(res.data,'second_name')
        // res = await getType()
        // if(res.success) miniFunct(res.data,'types')
        res = await getCategory()
        if(res.success) miniFunct(res.data,'category')
        res = await getSubCategory()
        if(res.success) miniFunct(res.data,'sub_category')
        res = await getCompany()
        if(res.success) miniFunct(res.data,'company')
        res = await getSize()
        if(res.success) miniFunct(res.data,'size')
        res = await getColor()
        if(res.success) miniFunct(res.data,'color')
        res = await getGroup()
        if(res.success) miniFunct(res.data,'group')
        res = await getTaxGroup()
        if(res.success) miniFunct(res.data,'tax_group')
        res = await getRack()
        if(res.success) miniFunct(res.data,'rack')
        res = await getUnit()
        if(res.success) miniFunct(res.data,'unit')
        res = await getBarcode()
        if(res.success) miniFunct(res.data,'transaction_unit')
        list.types=typesOptions
        setListItem(list)
        }catch(err){
            // console.log(err)
        }
    }

    const addOption = async (e,data,state) =>{
        e.preventDefault()
        let value = data.value
        let res
        try{
            let submitData = {[state]:value}
            switch(state){
                case 'second_name': 
                    res = await postSecondName(submitData);break;
                // case 'types':
                //     res = await postType(submitData);break;
                case 'category':
                    res = await postCategory(submitData);break;
                case 'sub_category':
                    res = await postSubCategory(submitData);break;
                case 'company':
                    res = await postCompany(submitData);break;
                case 'size':
                    res = await postSize(submitData);break;
                case 'color':
                    res = await postColor(submitData);break;
                case 'group':
                    res = await postGroup(submitData);break;
                case 'tax_group':
                    res = await postTaxGroup(submitData);break;
                case 'rack':
                    res = await postRack(submitData);break;
                case 'unit':
                    res = await postUnit(submitData);break;
                case 'transaction_unit':
                    res = await postBarcode(submitData);break;
            }
            if(res.success){
                Swal.fire('Option Added Successfylly','','success')
            }
            getData()
    }catch(err){
            Swal.fire('Failed to add option','','error')
    }
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        try{
            let res, res2, res3
            res = await postItemAdd(itemadd)
            if(res?.success){
                if(barcode){
                    const data = {code:barcode.code,mrp:itemadd.mrp_rate,retail_rate:itemadd.retail_rate}
                    res3 = await postBarcode(res.data.id,data)
                }
                if(unitConv){
                    const data = {qty:unitConv.qty,unit:unitConv.unit,rate:itemadd.retail_rate,mrp:itemadd.mrp_rate}
                    res2 = await postUnitConvertion(res.data.id,data)
                }
                
                if(!res2?.success)
                    Swal.fire(res2?.message,'','error')
                if(!res3?.success)
                    Swal.fire(res3?.message,'','error')
                if(!res3?.success||!res2?.success)
                    await deleteItem(res?.data?.id)
                
                Swal.fire('Item Added Successfully','','success')
            }
            else
            Swal.fire(res?.message,'','error')
        }catch(err){
            Swal.fire('Failed to add item pls try again','','error')
        }
    }

    const handleChange = (e) =>{
        if(e.target.name === 'code' || e.target.name === 'expiry')
            setBarcode(data=>({...data,[e.target.name]:e.target.value}))
        if(e.target.name === 'qty')
            setUnitConv(data=>({...data,[e.target.name]:e.target.value}))
        else if(e.target.name === 'unit_conv')
            setUnitConv(data=>({...data,['unit']:e.target.value}))
        else if(e.target.value ===''){
            setItemAdd(data=>({...data,[e.target.name]:null}))
        }else
        setItemAdd(data=>({...data,[e.target.name]:e.target.value}))
    }
    console.log(barcode)

    const handleCheck = (e) =>{
        setItemAdd(data=>({...data,[e.target.name]:!data[e.target.name]}))
    }

    const handleReset = () =>{
        let key = Object.keys(itemadd)
        key.map((data)=>{
                setItemAdd(val=>({...val,[data]:null}))
            })
    }

    const handleUnitHide = () =>{
        setUnitConvShow(false)
        setBarcodeShow(false)
    }

    return(
        <form onSubmit={handleSubmit} ref={formRef} className='item_add_cont'>
                {edit?"Edit Items":"Add New Item"}
                <div className='item_add_form pt-1 d-flex mt-1'>

            {/* item details --------------------------------------------------------------------------------------- */}

                <div className='item_add_form_part1 row mx-0 px-0 col-6 '>
                    
                    <div className="item_add_first_row px-0 row mx-0 ">
                    <div className='item_inputs d-flex mx-0 px-0 col-6'>Code*
                    <input required type='number' className='item_input'
                        value={itemadd.code} name='code' onChange={handleChange}/>
                    </div>
                    <div className='item_inputs d-flex px-0 col-6 align-itmes-end'>HSN*
                    <input required type='number' className='item_input'
                        value={itemadd.hsn} name='hsn' onChange={handleChange}/>
                    </div>
                    </div>

                    <div className='item_inputs d-flex justify-content-between px-0 mx-0 col-12 pt-2'>Name*
                    <input type='text' required className='item_input names'
                        value={itemadd.name} name='name' onChange={handleChange}/>
                    </div>
                    <div className='item_inputs d-flex justify-content-between px-0 mx-0 col-12 pt-2'>Second Name
                    <SearchDropDown id="second_name" addNew={true} setNew={addOption} options={listItem}
                        {... { showDropdown, setShowDropdown }} setDataValue={setItemAdd} selectedValue={itemadd}/>
                    </div>
                    <div className='item_inputs d-flex justify-content-between px-0 mx-0 col-12 pt-2'>Type
                    <SearchDropDown id="types" setNew={addOption} options={listItem}
                        {... { showDropdown, setShowDropdown }} setDataValue={setItemAdd} selectedValue={itemadd}/>
                        {/* <select type='select' className='item_input col-6 col-7'
                            name='rent_type'>
                            <option value='PRODUCT'>PRODUCT</option>
                            <option value='RAW MATERIAL'>RAW MATERIAL</option>
                            <option value='SERVICE'>SERVICE</option>
                        </select> */}
                    </div>
                    <div className='item_inputs d-flex justify-content-between px-0 mx-0 col-12 pt-2'>Category
                    <SearchDropDown id="category" addNew={true} setNew={addOption} options={listItem}
                        {... { showDropdown, setShowDropdown }} setDataValue={setItemAdd} selectedValue={itemadd}/>
                    </div>
                    <div className='item_inputs d-flex justify-content-between px-0 mx-0 col-12 pt-2'>Sub Category
                    <SearchDropDown id="sub_category" addNew={true} setNew={addOption} options={listItem}
                        {... { showDropdown, setShowDropdown }} setDataValue={setItemAdd} selectedValue={itemadd}/>
                    </div>
                    <div className='item_inputs d-flex justify-content-between px-0 mx-0 col-12 pt-2'>Company*
                    <SearchDropDown required id="company" addNew={true} setNew={addOption} options={listItem}
                        {... { showDropdown, setShowDropdown }} setDataValue={setItemAdd} selectedValue={itemadd}/>
                    </div>

                    <div className="item_add_first_row px-0 row mx-0 pt-2">
                    <div className='item_inputs d-flex mx-0 px-0 col-6'>Size
                    <SearchDropDown id="size" addNew={true} setNew={addOption} options={listItem} containerClass="small"
                        {... { showDropdown, setShowDropdown }} setDataValue={setItemAdd} selectedValue={itemadd}/>
                    </div>
                    <div className='item_inputs d-flex px-0 col-6 align-itmes-end'>Color
                    <SearchDropDown id="color" addNew={true} setNew={addOption} options={listItem} containerClass="small"
                        {... { showDropdown, setShowDropdown }} setDataValue={setItemAdd} selectedValue={itemadd}/>
                    </div>
                    </div>
                    
                    <div className="item_add_first_row px-0 row mx-0 pt-2">
                    <div className='item_inputs d-flex mx-0 px-0 col-6'>Group
                    <SearchDropDown id="group" addNew={true} setNew={addOption} options={listItem} containerClass="small"
                        {... { showDropdown, setShowDropdown }} setDataValue={setItemAdd} selectedValue={itemadd}/>
                    </div>
                    <div className='item_inputs d-flex px-0 col-6 align-itmes-end'>Tax Group
                    <SearchDropDown id="tax_group" addNew={true} setNew={addOption} options={listItem} containerClass="small"
                        {... { showDropdown, setShowDropdown }} setDataValue={setItemAdd} selectedValue={itemadd}/>
                    </div>
                    </div>

                    <div className='item_inputs d-flex justify-content-between px-0 mx-0 col-12 pt-2'>Godown/Rack
                    <SearchDropDown id="rack" addNew={true} setNew={addOption} options={listItem}
                        {... { showDropdown, setShowDropdown }} setDataValue={setItemAdd} selectedValue={itemadd}/>
                    </div>
                    <div className='item_inputs d-flex justify-content-between px-0 mx-0 col-12 pt-2'>Stock Unit*
                    <SearchDropDown required id="unit" addNew={true} setNew={addOption} options={listItem}
                        {... { showDropdown, setShowDropdown }} setDataValue={setItemAdd} selectedValue={itemadd}/>
                    </div>
                    <div className='item_inputs d-flex justify-content-between px-0 mx-0 col-12 pt-2'>Transaction Unit*
                    <SearchDropDown required id="transaction_unit" addNew={true} setNew={addOption} options={listItem}
                        {... { showDropdown, setShowDropdown }} setDataValue={setItemAdd} selectedValue={itemadd}/>
                    </div>
                </div>

            {/* item rate ----------------------------------------------------------------------------------------------------------- */}

                <div className='item_add_form_part2 row mx-0 px-0 me-0 col-6 border-0'>

                <div className="item_add_first_row d-flex justify-content-between px-0 row mx-0 pt-2">
                    <div className='item_inputs right d-flex mx-0 px-0 col-6'>MRP*
                    <input value={itemadd.mrp_rate} required type='number' className='item_input col-6 col-7'
                    name='mrp_rate' onChange={handleChange}/>
                    </div>
                    <div className='item_inputs right d-flex px-0 col-6 '>Ret. Rate*
                    <input value={itemadd.retail_rate} required type='number' className='item_input col-6 col-7'
                    name='retail_rate' onChange={handleChange}/>
                    </div>
                    </div>
                <div className="item_add_first_row px-0 row mx-0 pt-2">
                    <div className='item_inputs right d-flex mx-0 px-0 col-6'>WS*
                    <input value={itemadd.wholesale_rate} required type='number' className='item_input col-6 col-7'
                    name='wholesale_rate' onChange={handleChange}/>
                    </div>
                    <div className='item_inputs right d-flex px-0 col-6 '>SWS. Rate*
                    <input value={itemadd.super_wholesale_rate} required type='number' className='item_input col-6 col-7'
                    name='super_wholesale_rate' onChange={handleChange}/>
                    </div>
                    </div>
                <div className="item_add_first_row px-0 row mx-0 pt-2">
                    <div className='item_inputs right d-flex mx-0 px-0 col-6'>QTN
                    <input value={itemadd.quotation_rate} type='number' className='item_input col-6 col-7'
                    name='quotation_rate' onChange={handleChange}/>
                    </div>
                    <div className='item_inputs right d-flex px-0 col-6 '>Rent
                    <input value={itemadd.rent} type='number' className='item_input col-6 col-7'
                    name='rent' onChange={handleChange}/>
                    </div>
                    </div>
                <div className="item_add_first_row px-0 row mx-0 pt-2">
                    <div className='item_inputs right d-flex mx-0 px-0 col-6'>P.Rate*
                    <input value={itemadd.purchase_rate} required type='number' className='item_input col-6 col-7'
                    name='purchase_rate' onChange={handleChange}/>
                    </div>
                    <div className='item_inputs right d-flex px-0 col-6 '>Cost*
                    <input value={itemadd.cost} required type='number' className='item_input col-6 col-7'
                    name='cost' onChange={handleChange}/>
                    </div>
                    </div>
                <div className="item_add_first_row px-0 row mx-0 pt-2">
                    <div className='item_inputs right d-flex mx-0 px-0 col-6'>Margin %*
                    <input value={itemadd.margin} required type='number' className='item_input col-6 col-7'
                    name='margin' onChange={handleChange}/>
                    </div>
                    <div className='item_inputs right d-flex px-0 col-6 '>Tax/ GST*
                    <input value={itemadd.tax_gst} required type='number' className='item_input col-6 col-7'
                    name='tax_gst' onChange={handleChange}/>
                    </div>
                    </div>
                <div className="item_add_first_row px-0 row mx-0 pt-2">
                    <div className='item_inputs right d-flex mx-0 px-0 col-6'>Cess1
                    <input value={itemadd.cess_1} type='number' className='item_input col-6 col-7'
                    name='cess_1' onChange={handleChange}/>
                    </div>
                    <div className='item_inputs right d-flex px-0 col-6 '>Cess2
                    <input value={itemadd.cess_2} type='number' className='item_input col-6 col-7'
                    name='cess_2' onChange={handleChange}/>
                    </div>
                    </div>
                <div className="item_add_first_row px-0 row mx-0 pt-2">
                    <div className='item_inputs right d-flex mx-0 px-0 col-6'>P.Disc
                    <input value={itemadd.purchase_discount} type='number' className='item_input col-6 col-7'
                    name='purchase_discount' onChange={handleChange}/>
                    </div>
                    <div className='item_inputs right d-flex px-0 col-6 '>S.Disc
                    <input value={itemadd.sale_discount} type='number' className='item_input col-6 col-7'
                    name='sale_discount' onChange={handleChange}/>
                    </div>
                    </div>
                <div className="item_add_first_row px-0 row mx-0 pt-2">
                    <div className='item_inputs right d-flex mx-0 px-0 col-6'>UnLd. Charge
                    <input value={itemadd.unload_charge} type='number' className='item_input col-6 col-7'
                    name='unload_charge' onChange={handleChange}/>
                    </div>
                    <div className='item_inputs right d-flex px-0 col-6 '>Point
                    <input value={itemadd.point} type='number' className='item_input col-6 col-7'
                    name='point' onChange={handleChange}/>
                    </div>
                    </div>
                <div className="item_add_first_row px-0 row mx-0 pt-2">
                    <div className='item_inputs right d-flex mx-0 px-0 col-6'>Ld. Charge
                    <input value={itemadd.load_charge} type='number' className='item_input col-6 col-7'
                    name='load_charge' onChange={handleChange}/>
                    </div>
                    <div className='item_inputs right d-flex px-0 col-6 '>Cmsn %
                    <input value={itemadd.commission} type='number' className='item_input col-6 col-7'
                    name='commission' onChange={handleChange}/>
                    </div>
                    </div>
                <div className="item_add_first_row px-0 row mx-0 pt-2">
                    <div className='item_inputs right d-flex mx-0 px-0 col-6'>Qty in Box
                    <input value={itemadd.qty_in_bc} type='number' className='item_input col-6 col-7'
                    name='qty_in_bc' onChange={handleChange}/>
                    </div>
                    <div className='item_inputs right d-flex px-0 col-6 '>Op. Stock*
                    <input value={itemadd.open_stock} required type='number' className='item_input col-6 col-7'
                    name='open_stock' onChange={handleChange}/>
                    </div>
                    </div>
                <div className="item_add_first_row px-0 row mx-0 pt-2">
                    <div className='item_inputs right d-flex mx-0 px-0 col-6'>Dmge
                    <input value={itemadd.damage} type='number' className='item_input col-6 col-7'
                    name='damage' onChange={handleChange}/>
                    </div>
                    <div className='item_inputs right d-flex px-0 col-6 '>Dmg. Cost
                    <input value={itemadd.damge_cost} type='number' className='item_input col-6 col-7'
                    name='damge_cost' onChange={handleChange}/>
                    </div>
                    </div>
                <div className="item_add_first_row px-0 row mx-0 pt-2">
                    <div className='item_inputs right d-flex mx-0 px-0 col-6'>Role
                    <input value={itemadd.role} type='number' className='item_input col-6 col-7'
                    name='role' onChange={handleChange}/>
                    </div>
                    <div className='item_inputs right d-flex px-0 col-6 '>Rent Type
                    <select select={itemadd.rent_type} type='select' className='item_input col-6 col-7 py-1'
                    name='rent_type' onChange={handleChange}>
                    <option value=''>SELECT</option>
                    <option value='HOUR'>HOUR</option>
                    <option value='MONTH'>MONTH</option>
                    </select>
                    </div>
                    </div>

                </div>

                </div>
            <div className="pt-2 d-flex justify-content-between w-100 ">
                <div className='d-flex row col-6 gap-4'>
                    <div onClick={()=>setUnitConvShow(true)} className='btn bg-black text-light col-5 text-start px-3 py-1'>Unit Conversion</div>
                    <div onClick={()=>setBarcodeShow(true)} className='btn bg-black text-light col-5 text-start px-3 py-1'>BarCode</div>
                </div>
                <div className='checkbox col-6'>
                    <div className='checkbox_container'>
                        <div className="item_add_check  d-flex align-item-center">
                            <input onChange={handleCheck} type='checkbox' checked={itemadd.blocked} name='blocked' value={itemadd.blocked}/>
                            <label>Blocked</label>
                        </div>
                        <div className="item_add_check  d-flex align-item-center">
                            <input onChange={handleCheck} type='checkbox' checked={itemadd.manuel_qty_in_bc} name='manuel_qty_in_bc' value={itemadd.manuel_qty_in_bc}/>
                            <label>Manual Qty in Box</label>
                        </div>
                    </div>
                    <div className='checkbox_container'>
                        <div className="item_add_check  d-flex align-item-center">
                            <input onChange={handleCheck} type='checkbox' checked={itemadd.gate_pass} name='gate_pass' value={itemadd.gate_pass}/>
                            <label>Gate Pass</label>
                        </div>
                        <div className="item_add_check  d-flex align-item-center">
                            <input onChange={handleCheck} type='checkbox' checked={itemadd.tax_inclusive} name='tax_inclusive' value={itemadd.tax_inclusive}/>
                            <label>Tax Inclusive</label>
                        </div>
                    </div>
                    <div className='checkbox_container'>
                        <div className="item_add_check  d-flex align-item-center">
                            <input onChange={handleCheck} type='checkbox' checked={itemadd.rent_item} name='rent_item' value={itemadd.rent_item}/>
                            <label>Rent Item</label>
                        </div>
                        <div className="item_add_check  d-flex align-item-center">
                            <input onChange={handleCheck} type='checkbox' checked={itemadd.blocked} name='blocked' value={itemadd.blocked}/>
                            <label>Repeat</label>
                        </div>
                    </div>
                </div>
            </div>
                <div className='d-flex gap-2 justify-content-end pt-2'>
                    <button type='reset' onClick={handleReset} className='clear_btn btn'>Clear</button>
                    <button type='submit' className='save_btn btn'>Submit</button>
                </div>
                <Modal
                contentClassName="unit_modal px-3 bg-dark"
                dialogClassName='d-flex justify-content-center'
                show={unitConvShow || barcodeShow}
                size='lg'
                centered
                onHide={handleUnitHide}
                >
                    <Modal.Body>
                        <div className='text-light pb-2'>
                           { barcodeShow?"Barcode":"Unit Conversion"}
                            <div className='unit_modal_body mt-2 px-3 pb-2'>
                                <table className='custom-table-2 names ms-2'>
                                    <thead>
                                        <tr>
                                            <th>{barcodeShow?"C.Barcode":"Qty"}</th>
                                            <th>{barcodeShow?"MRP":"Unit"}</th>
                                            <th>{barcodeShow?"S.Rate":"Rate"}</th>
                                            <th>{barcodeShow?"Expiry":"Mrp"}</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody className='rounded-3'>
                                        <tr>
                                            <td><input onChange={handleChange} name='code' value={barcode.code} type='text' className='w-100 text-light'/></td>
                                            {/* <td><input onChange={handleChange} name='unit' value={unitConv.unit} type='text' className='w-100'/></td> */}
                                            <td>
                                                {!barcodeShow?<select type='select' onChange={handleChange} className='unit_select text-light w-100' name='unit_conv'>
                                                    <option value={null}>Select</option>
                                                    {listItem?.unit?.length>0&&
                                                    listItem.unit.map(data=><option value={data.label}>{data.label}</option>)}
                                                </select>:
                                                <input onChange={handleChange} name='mrp_rate' value={itemadd.mrp_rate} type='number' className='w-100 text-light'/>}
                                            </td>
                                            <td><input onChange={handleChange} name='retail_rate' value={itemadd.retail_rate} type='number' className='w-100 text-light'/></td>
                                            <td><input onChange={handleChange} name='expiry' value={barcode.expiry} type={barcodeShow?'date':'number'} className='w-100 text-light'/></td>
                                            <th className='col col-1 cursor text-center'>
                                                <img src={deleteBtn} alt="deletebtn"/>
                                            </th>
                                            <th className='btn-td'>
                                                <div onClick={handleUnitHide} className='add_unit_btn btn'>Add Unit</div>
                                            </th>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
        </form>
    )

}            
import { useEffect, useRef, useState } from 'react'
import './itemAdd.css'
import search from "../../../../assets/icons/search.png"
import SearchDropDown from '../../../../components/searchDropDown/SearchDropDown'
import useItemServices from '../../../../services/master/itemServices'
import Swal from 'sweetalert2'
// import { List } from '@mui/material'

const ItemAdd = () =>{
    const [pageHeadItem,setPageHeadItem] = useState(1)
    const [showDropdown, setShowDropdown] = useState('')
    const formRef = useRef(null)
    const typesOptions = [{label:"PRODUCT",value:"PRODUCT"},{label:"RAW MATERIAL",value:"RAW MATERIAL"},{label:"SERVICE",value:"SERVICE"}]
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

    useEffect(()=>{
        getData();
    },[ ])

    const {
        postBarcode,postUnit,
        postRack,postTaxGroup,
        postGroup,postColor,
        postSize,postCompany,
        postSubCategory,postCategory,
        postType,postSecondName,
        getBarcode,getUnit,
        getRack,getTaxGroup,
        getGroup,getColor,
        getSize,getCompany,
        getSubCategory,getCategory,
        getType,getSecondName,
        postItemAdd} = useItemServices()

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

            setListItem(list)
            }catch(err){
                
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
                case 'types':
                    res = await postType(submitData);break;
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

    const handleChange = (e) =>{
        if(e.target.value==''){
            setItemAdd(data=>({...data,[e.target.name]:null}))
        }else
        setItemAdd(data=>({...data,[e.target.name]:e.target.value}))
    }
    
    const handleSubmit = async (e)=>{
        e.preventDefault()
        console.log(itemadd.rent)
        try{
            let res = await postItemAdd(itemadd)
            if(res.success)
                Swal.fire('Item Added Successfully','','success')
            else
                Swal.fire(res.message,'','error')
        }catch(err){
            Swal.fire('Failed to add item pls try again','','error')
        }
    }

    const handleReset = () =>{
        let key = Object.keys(itemadd)
        key.map((data)=>setItemAdd(val=>({...val,[data]:null})))
        // const inputData = [...formRef?.current?.querySelectorAll('input')]
        // console.log(inputData)
        // inputData?.map((data)=>data.set(''))
    }

    return(
        <div className='item_add'>
            <div className="page_head ps-4 mt-1 mb-3">
                <div className='fw-600 fs-5'>Master Item</div>
                <div className='page_head_items mb-3'>
                    <div onClick={()=>setPageHeadItem(1)} className={`page_head_item ${pageHeadItem === 1 && "active"}`}>Item List</div>
                    <div onClick={()=>setPageHeadItem(2)} className={`page_head_item ${pageHeadItem === 2 && "active"}`}>Change Item Code</div>
                    <div onClick={()=>setPageHeadItem(3)} className={`page_head_item ${pageHeadItem === 3 && "active"}`}>Raw Meterial Settins</div>
                    <div onClick={()=>setPageHeadItem(4)} className={`page_head_item ${pageHeadItem === 4 && "active"}`}>Update Details</div>
                    <div onClick={()=>setPageHeadItem(5)} className={`page_head_item ${pageHeadItem === 5 && "active"}`}>Merge Items</div>
                </div>
            </div>
            <form onSubmit={handleSubmit} ref={formRef} className='item_add_cont'>
                 Add New Item
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
                         {... { showDropdown, setShowDropdown }} setDataValue={setItemAdd} selectedValue={setItemAdd.name}/>
                        </div>
                        <div className='item_inputs d-flex justify-content-between px-0 mx-0 col-12 pt-2'>Type
                        <SearchDropDown id="types" setNew={addOption} options={listItem}
                         {... { showDropdown, setShowDropdown }} setDataValue={setItemAdd} selectedValue={setItemAdd.name}/>
                            {/* <select type='select' className='item_input col-6 col-7'
                                name='rent_type'>
                                <option value='PRODUCT'>PRODUCT</option>
                                <option value='RAW MATERIAL'>RAW MATERIAL</option>
                                <option value='SERVICE'>SERVICE</option>
                            </select> */}
                        </div>
                        <div className='item_inputs d-flex justify-content-between px-0 mx-0 col-12 pt-2'>Category
                        <SearchDropDown id="category" addNew={true} setNew={addOption} options={listItem}
                         {... { showDropdown, setShowDropdown }} setDataValue={setItemAdd} selectedValue={setItemAdd.name}/>
                        </div>
                        <div className='item_inputs d-flex justify-content-between px-0 mx-0 col-12 pt-2'>Sub Category
                        <SearchDropDown id="sub_category" addNew={true} setNew={addOption} options={listItem}
                         {... { showDropdown, setShowDropdown }} setDataValue={setItemAdd} selectedValue={setItemAdd.name}/>
                        </div>
                        <div className='item_inputs d-flex justify-content-between px-0 mx-0 col-12 pt-2'>Company*
                        <SearchDropDown required id="company" addNew={true} setNew={addOption} options={listItem}
                         {... { showDropdown, setShowDropdown }} setDataValue={setItemAdd} selectedValue={setItemAdd.name}/>
                        </div>

                        <div className="item_add_first_row px-0 row mx-0 pt-2">
                        <div className='item_inputs d-flex mx-0 px-0 col-6'>Size
                        <SearchDropDown id="size" addNew={true} setNew={addOption} options={listItem} containerClass="small"
                         {... { showDropdown, setShowDropdown }} setDataValue={setItemAdd} selectedValue={setItemAdd.name}/>
                        </div>
                        <div className='item_inputs d-flex px-0 col-6 align-itmes-end'>Color
                        <SearchDropDown id="color" addNew={true} setNew={addOption} options={listItem} containerClass="small"
                         {... { showDropdown, setShowDropdown }} setDataValue={setItemAdd} selectedValue={setItemAdd.name}/>
                        </div>
                        </div>
                        
                        <div className="item_add_first_row px-0 row mx-0 pt-2">
                        <div className='item_inputs d-flex mx-0 px-0 col-6'>Group
                        <SearchDropDown id="group" addNew={true} setNew={addOption} options={listItem} containerClass="small"
                         {... { showDropdown, setShowDropdown }} setDataValue={setItemAdd} selectedValue={setItemAdd.name}/>
                        </div>
                        <div className='item_inputs d-flex px-0 col-6 align-itmes-end'>Tax Group
                        <SearchDropDown id="tax_group" addNew={true} setNew={addOption} options={listItem} containerClass="small"
                         {... { showDropdown, setShowDropdown }} setDataValue={setItemAdd} selectedValue={setItemAdd.name}/>
                        </div>
                        </div>

                        <div className='item_inputs d-flex justify-content-between px-0 mx-0 col-12 pt-2'>Godown/Rack
                        <SearchDropDown id="rack" addNew={true} setNew={addOption} options={listItem}
                         {... { showDropdown, setShowDropdown }} setDataValue={setItemAdd} selectedValue={setItemAdd.name}/>
                        </div>
                        <div className='item_inputs d-flex justify-content-between px-0 mx-0 col-12 pt-2'>Stock Unit*
                        <SearchDropDown required id="unit" addNew={true} setNew={addOption} options={listItem}
                         {... { showDropdown, setShowDropdown }} setDataValue={setItemAdd} selectedValue={setItemAdd.name}/>
                        </div>
                        <div className='item_inputs d-flex justify-content-between px-0 mx-0 col-12 pt-2'>Transaction Unit*
                        <SearchDropDown required id="transaction_unit" addNew={true} setNew={addOption} options={listItem}
                         {... { showDropdown, setShowDropdown }} setDataValue={setItemAdd} selectedValue={setItemAdd.name}/>
                        </div>
                    </div>

                {/* item rate ----------------------------------------------------------------------------------------------------------- */}

                    <div className='item_add_form_part2 row mx-0 px-0 me-0 col-6 border-0'>

                    <div className="item_add_first_row d-flex justify-content-between px-0 row mx-0 pt-2">
                        <div className='item_inputs right d-flex mx-0 px-0 col-6'>MRP*
                        <input required type='number' className='item_input col-6 col-7'
                        name='mrp_rate' onChange={handleChange}/>
                        </div>
                        <div className='item_inputs right d-flex px-0 col-6 '>Ret. Rate*
                        <input required type='number' className='item_input col-6 col-7'
                        name='retail_rate' onChange={handleChange}/>
                        </div>
                        </div>
                    <div className="item_add_first_row px-0 row mx-0 pt-2">
                        <div className='item_inputs right d-flex mx-0 px-0 col-6'>WS*
                        <input required type='number' className='item_input col-6 col-7'
                        name='wholesale_rate' onChange={handleChange}/>
                        </div>
                        <div className='item_inputs right d-flex px-0 col-6 '>SWS. Rate*
                        <input required type='number' className='item_input col-6 col-7'
                        name='super_wholesale_rate' onChange={handleChange}/>
                        </div>
                        </div>
                    <div className="item_add_first_row px-0 row mx-0 pt-2">
                        <div className='item_inputs right d-flex mx-0 px-0 col-6'>QTN
                        <input type='number' className='item_input col-6 col-7'
                        name='quotation_rate' onChange={handleChange}/>
                        </div>
                        <div className='item_inputs right d-flex px-0 col-6 '>Rent
                        <input type='number' className='item_input col-6 col-7'
                        name='rent' onChange={handleChange}/>
                        </div>
                        </div>
                    <div className="item_add_first_row px-0 row mx-0 pt-2">
                        <div className='item_inputs right d-flex mx-0 px-0 col-6'>P.Rate*
                        <input required type='number' className='item_input col-6 col-7'
                        name='purchase_rate' onChange={handleChange}/>
                        </div>
                        <div className='item_inputs right d-flex px-0 col-6 '>Cost*
                        <input required type='number' className='item_input col-6 col-7'
                        name='cost' onChange={handleChange}/>
                        </div>
                        </div>
                    <div className="item_add_first_row px-0 row mx-0 pt-2">
                        <div className='item_inputs right d-flex mx-0 px-0 col-6'>Margin %*
                        <input required type='number' className='item_input col-6 col-7'
                        name='margin' onChange={handleChange}/>
                        </div>
                        <div className='item_inputs right d-flex px-0 col-6 '>Tax/ GST*
                        <input required type='number' className='item_input col-6 col-7'
                        name='tax_gst' onChange={handleChange}/>
                        </div>
                        </div>
                    <div className="item_add_first_row px-0 row mx-0 pt-2">
                        <div className='item_inputs right d-flex mx-0 px-0 col-6'>Cess1
                        <input type='number' className='item_input col-6 col-7'
                        name='cess_1' onChange={handleChange}/>
                        </div>
                        <div className='item_inputs right d-flex px-0 col-6 '>Cess2
                        <input type='number' className='item_input col-6 col-7'
                        name='cess_2' onChange={handleChange}/>
                        </div>
                        </div>
                    <div className="item_add_first_row px-0 row mx-0 pt-2">
                        <div className='item_inputs right d-flex mx-0 px-0 col-6'>P.Disc
                        <input type='number' className='item_input col-6 col-7'
                        name='purchase_discount' onChange={handleChange}/>
                        </div>
                        <div className='item_inputs right d-flex px-0 col-6 '>S.Disc
                        <input type='number' className='item_input col-6 col-7'
                        name='sale_discount' onChange={handleChange}/>
                        </div>
                        </div>
                    <div className="item_add_first_row px-0 row mx-0 pt-2">
                        <div className='item_inputs right d-flex mx-0 px-0 col-6'>UnLd. Charge
                        <input type='number' className='item_input col-6 col-7'
                        name='unload_charge' onChange={handleChange}/>
                        </div>
                        <div className='item_inputs right d-flex px-0 col-6 '>Point
                        <input type='number' className='item_input col-6 col-7'
                        name='point' onChange={handleChange}/>
                        </div>
                        </div>
                    <div className="item_add_first_row px-0 row mx-0 pt-2">
                        <div className='item_inputs right d-flex mx-0 px-0 col-6'>Ld. Charge
                        <input type='number' className='item_input col-6 col-7'
                        name='load_charge' onChange={handleChange}/>
                        </div>
                        <div className='item_inputs right d-flex px-0 col-6 '>Cmsn %
                        <input type='number' className='item_input col-6 col-7'
                        name='commission' onChange={handleChange}/>
                        </div>
                        </div>
                    <div className="item_add_first_row px-0 row mx-0 pt-2">
                        <div className='item_inputs right d-flex mx-0 px-0 col-6'>Qty in Box
                        <input type='number' className='item_input col-6 col-7'
                        name='qty_in_bc' onChange={handleChange}/>
                        </div>
                        <div className='item_inputs right d-flex px-0 col-6 '>Op. Stock*
                        <input required type='number' className='item_input col-6 col-7'
                        name='open_stock' onChange={handleChange}/>
                        </div>
                        </div>
                    <div className="item_add_first_row px-0 row mx-0 pt-2">
                        <div className='item_inputs right d-flex mx-0 px-0 col-6'>Dmge
                        <input type='number' className='item_input col-6 col-7'
                        name='damage' onChange={handleChange}/>
                        </div>
                        <div className='item_inputs right d-flex px-0 col-6 '>Dmg. Cost
                        <input type='number' className='item_input col-6 col-7'
                        name='damge_cost' onChange={handleChange}/>
                        </div>
                        </div>
                    <div className="item_add_first_row px-0 row mx-0 pt-2">
                        <div className='item_inputs right d-flex mx-0 px-0 col-6'>Role
                        <input type='number' className='item_input col-6 col-7'
                        name='role' onChange={handleChange}/>
                        </div>
                        <div className='item_inputs right d-flex px-0 col-6 '>Rent Type
                        <select type='select' className='item_input col-6 col-7'
                        name='rent_type'>
                        <option value='HOUR'>hour</option>
                        <option value='MONTH'>Month</option>
                        </select>
                        </div>
                        </div>

                    </div>

                 </div>
                <div className="pt-2 d-flex justify-content-between w-100 ">
                    <div className='d-flex row col-6 gap-4'>
                        <div className='btn bg-black text-light col-5 text-start px-3 py-1'>Unit Conversion</div>
                        <div className='btn bg-black text-light col-5 text-start px-3 py-1'>BarCode</div>
                    </div>
                    <div className='checkbox col-6'>
                        <div className='checkbox_container'>
                            <div className="item_add_check  d-flex align-item-center">
                                <input type='checkbox' name='Blocked' value='Blocked'/>
                                <label>Blocked</label>
                            </div>
                            <div className="item_add_check  d-flex align-item-center">
                                <input type='checkbox' name='Blocked' value='Blocked'/>
                                <label>Manual Qty in Box</label>
                            </div>
                        </div>
                        <div className='checkbox_container'>
                            <div className="item_add_check  d-flex align-item-center">
                                <input type='checkbox' className='checkbox' name='Blocked' value='Blocked'/>
                                <label>Gate Pass</label>
                            </div>
                            <div className="item_add_check  d-flex align-item-center">
                                <input type='checkbox' name='Blocked' value='Blocked'/>
                                <label>Tax Inclusive</label>
                            </div>
                        </div>
                        <div className='checkbox_container'>
                            <div className="item_add_check  d-flex align-item-center">
                                <input type='checkbox' name='Blocked' value='Blocked'/>
                                <label>Rent Item</label>
                            </div>
                            <div className="item_add_check  d-flex align-item-center">
                                <input type='checkbox' className='checkbox' name='Blocked' value='Blocked'/>
                                <label>Repeat</label>
                            </div>
                        </div>
                    </div>
                </div>
                    <div className='d-flex gap-2 justify-content-end pt-2'>
                        <button type='reset' onClick={handleReset} className='clear_btn btn'>Clear</button>
                        <button type='submit' className='save_btn btn'>Submit</button>
                    </div>
            </form>
        </div>
    )
}

export default ItemAdd
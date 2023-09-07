import { useEffect, useState } from 'react'
import './itemAdd.css'
import search from "../../../../assets/icons/search.png"
import SearchDropDown from '../../../../components/searchDropDown/SearchDropDown'
import useItemServices from '../../../../services/master/itemServices'
import Swal from 'sweetalert2'
import { List } from '@mui/material'

const ItemAdd = () =>{
    const [pageHeadItem,setPageHeadItem] = useState(1)
    const [showDropdown, setShowDropdown] = useState('')
    const [listItem,setListItem] = useState({
        second_name:[],
        type:[],
        category:[],
        sub_category:[],
        company:[],
        size:[],
        color:[],
        group:[],
        tax_group:[],
        godown_rack:[],
        stock_unit:[],
        transaction_unit:[],
    })
    const [itemadd,setItemAdd] = useState({
        code:'',
        hsn:'',
        name:'',
        second_name:'',
        type:'',
        category:'',
        sub_category:'',
        company:'',
        size:'',
        color:'',
        group:'',
        tax_group:'',
        godown_rack:'',
        stock_unit:'',
        transaction_unit:'',
        mrp_rate:'',
        retail_rate:'',
        wholesale_rate:'',
        super_wholesale_rate:'',
        quotation_rate:'',
        rent:'',
        rent_type:'',
        purchase_rate:'',
        cost:'',
        margin:'',
        tax_gst:'',
        cess_1:'',
        cess_2:'',
        purchase_discount:'',
        sale_discount:'',
        unload_charge:'',
        load_charge:'',
        point:'',
        commission:'',
        damage:'',
        damge_cost:'',
        blocked:false,
        tax_inclusive:false,
        manuel_qty_in_bc:false,
        rent_item:false,
        gate_pass:false,
        barcode:'',
    })

    useEffect(()=>{
        getData();
    },[ItemAdd, ])

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
        getType,getSecondName,} = useItemServices()

        const getData = async () => {
            let list = {}
            const miniFunct = (data,name) =>{
                list[name] = []
                data.map((x)=>{
                    list[name].push({value:x[name],label:x[name]})
                })
            }
            let res
            res = await getSecondName()
            if(res.success) miniFunct(res.data,'second_name')
            res = await getType()
            if(res.success) miniFunct(res.data,'type')
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
            if(res.success) miniFunct(res.data,'godown_rack')
            res = await getUnit()
            if(res.success) miniFunct(res.data,'stock_unit')
            res = await getBarcode()
            if(res.success) miniFunct(res.data,'transaction_unit')

            setListItem(list)
            console.log(list)
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
                case 'type':
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
                case 'godown_rack':
                    res = await postRack(submitData);break;
                case 'stock_unit':
                    res = await postUnit(submitData);break;
                case 'transaction_unit':
                    res = await postBarcode(submitData);break;
            }
            if(res.success){
                Swal.fire('Option Added Successfylly','','success')
            }
    }catch(err){
            Swal.fire('Failed to add option','','error')
    }
    }

    return(
        <div className='item_add'>
            <div className="page_head">
                <div className='fw-600 fs-5'>Master Item</div>
                <div className='page_head_items mb-3'>
                    <div onClick={()=>setPageHeadItem(1)} className={`page_head_item ${pageHeadItem === 1 && "active"}`}>Item List</div>
                    <div onClick={()=>setPageHeadItem(2)} className={`page_head_item ${pageHeadItem === 2 && "active"}`}>Change Item Code</div>
                    <div onClick={()=>setPageHeadItem(3)} className={`page_head_item ${pageHeadItem === 3 && "active"}`}>Raw Meterial Settins</div>
                    <div onClick={()=>setPageHeadItem(4)} className={`page_head_item ${pageHeadItem === 4 && "active"}`}>Update Details</div>
                    <div onClick={()=>setPageHeadItem(5)} className={`page_head_item ${pageHeadItem === 5 && "active"}`}>Merge Items</div>
                </div>
            </div>
            <div className='item_add_cont'>
                 Add New Item
                 <div className='item_add_form pt-1 d-flex'>

                {/* item details --------------------------------------------------------------------------------------- */}

                    <div className='item_add_form_part1 row mx-0 px-0 col-6 '>
                        
                        <div className="item_add_first_row px-0 row mx-0 ">
                        <div className='item_inputs d-flex mx-0 px-0 col-6'>Code
                        <input type='text' className='item_input '/>
                        </div>
                        <div className='item_inputs d-flex px-0 col-6 align-itmes-end'>HSN
                        <input type='text' className='item_input'/>
                        </div>
                        </div>

                        <div className='item_inputs d-flex justify-content-between px-0 mx-0 col-12 pt-2'>Name
                        <input type='text' className='item_input names'/>
                        </div>
                        <div className='item_inputs d-flex justify-content-between px-0 mx-0 col-12 pt-2'>Second Name
                        <SearchDropDown id="second_name" addNew={true} setNew={addOption} options={listItem}
                         {... { showDropdown, setShowDropdown }} setDataValue={setItemAdd} selectedValue={setItemAdd.name}/>
                        </div>
                        <div className='item_inputs d-flex justify-content-between px-0 mx-0 col-12 pt-2'>Type
                        <SearchDropDown id="type" addNew={true} setNew={addOption} options={listItem}
                         {... { showDropdown, setShowDropdown }} setDataValue={setItemAdd} selectedValue={setItemAdd.name}/>
                        </div>
                        <div className='item_inputs d-flex justify-content-between px-0 mx-0 col-12 pt-2'>Category
                        <SearchDropDown id="category" addNew={true} setNew={addOption} options={listItem}
                         {... { showDropdown, setShowDropdown }} setDataValue={setItemAdd} selectedValue={setItemAdd.name}/>
                        </div>
                        <div className='item_inputs d-flex justify-content-between px-0 mx-0 col-12 pt-2'>Sub Category
                        <SearchDropDown id="sub_category" addNew={true} setNew={addOption} options={listItem}
                         {... { showDropdown, setShowDropdown }} setDataValue={setItemAdd} selectedValue={setItemAdd.name}/>
                        </div>
                        <div className='item_inputs d-flex justify-content-between px-0 mx-0 col-12 pt-2'>Company
                        <SearchDropDown id="company" addNew={true} setNew={addOption} options={listItem}
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
                        <SearchDropDown id="godown_rack" addNew={true} setNew={addOption} options={listItem}
                         {... { showDropdown, setShowDropdown }} setDataValue={setItemAdd} selectedValue={setItemAdd.name}/>
                        </div>
                        <div className='item_inputs d-flex justify-content-between px-0 mx-0 col-12 pt-2'>Stock Unit
                        <SearchDropDown id="stock_unit" addNew={true} setNew={addOption} options={listItem}
                         {... { showDropdown, setShowDropdown }} setDataValue={setItemAdd} selectedValue={setItemAdd.name}/>
                        </div>
                        <div className='item_inputs d-flex justify-content-between px-0 mx-0 col-12 pt-2'>Transaction Unit
                        <SearchDropDown id="transaction_unit" addNew={true} setNew={addOption} options={listItem}
                         {... { showDropdown, setShowDropdown }} setDataValue={setItemAdd} selectedValue={setItemAdd.name}/>
                        </div>
                    </div>

                {/* item rate ----------------------------------------------------------------------------------------------------------- */}

                    <div className='item_add_form_part2 row mx-0 px-0 me-0 col-6 border-0'>

                    <div className="item_add_first_row d-flex justify-content-between px-0 row mx-0 pt-2">
                        <div className='item_inputs right d-flex mx-0 px-0 col-6'>MRP
                        <input type='text' className='item_input col-6 col-7'/>
                        </div>
                        <div className='item_inputs right d-flex px-0 col-6 '>Ret. Rate
                        <input type='text' className='item_input col-6 col-7'/>
                        </div>
                        </div>
                    <div className="item_add_first_row px-0 row mx-0 pt-2">
                        <div className='item_inputs right d-flex mx-0 px-0 col-6'>WS
                        <input type='text' className='item_input col-6 col-7'/>
                        </div>
                        <div className='item_inputs right d-flex px-0 col-6 '>SWS. Rate
                        <input type='text' className='item_input col-6 col-7'/>
                        </div>
                        </div>
                    <div className="item_add_first_row px-0 row mx-0 pt-2">
                        <div className='item_inputs right d-flex mx-0 px-0 col-6'>QTN
                        <input type='text' className='item_input col-6 col-7'/>
                        </div>
                        <div className='item_inputs right d-flex px-0 col-6 '>Rent
                        <input type='text' className='item_input col-6 col-7'/>
                        </div>
                        </div>
                    <div className="item_add_first_row px-0 row mx-0 pt-2">
                        <div className='item_inputs right d-flex mx-0 px-0 col-6'>P.Rate
                        <input type='text' className='item_input col-6 col-7'/>
                        </div>
                        <div className='item_inputs right d-flex px-0 col-6 '>Cost
                        <input type='text' className='item_input col-6 col-7'/>
                        </div>
                        </div>
                    <div className="item_add_first_row px-0 row mx-0 pt-2">
                        <div className='item_inputs right d-flex mx-0 px-0 col-6'>Margin %
                        <input type='text' className='item_input col-6 col-7'/>
                        </div>
                        <div className='item_inputs right d-flex px-0 col-6 '>Tax/ GST 
                        <input type='text' className='item_input col-6 col-7'/>
                        </div>
                        </div>
                    <div className="item_add_first_row px-0 row mx-0 pt-2">
                        <div className='item_inputs right d-flex mx-0 px-0 col-6'>Cess1
                        <input type='text' className='item_input col-6 col-7'/>
                        </div>
                        <div className='item_inputs right d-flex px-0 col-6 '>Cess2
                        <input type='text' className='item_input col-6 col-7'/>
                        </div>
                        </div>
                    <div className="item_add_first_row px-0 row mx-0 pt-2">
                        <div className='item_inputs right d-flex mx-0 px-0 col-6'>P.Disc
                        <input type='text' className='item_input col-6 col-7'/>
                        </div>
                        <div className='item_inputs right d-flex px-0 col-6 '>S.Disc
                        <input type='text' className='item_input col-6 col-7'/>
                        </div>
                        </div>
                    <div className="item_add_first_row px-0 row mx-0 pt-2">
                        <div className='item_inputs right d-flex mx-0 px-0 col-6'>UnLd. Charge
                        <input type='text' className='item_input col-6 col-7'/>
                        </div>
                        <div className='item_inputs right d-flex px-0 col-6 '>Point
                        <input type='text' className='item_input col-6 col-7'/>
                        </div>
                        </div>
                    <div className="item_add_first_row px-0 row mx-0 pt-2">
                        <div className='item_inputs right d-flex mx-0 px-0 col-6'>Ld. Charge
                        <input type='text' className='item_input col-6 col-7'/>
                        </div>
                        <div className='item_inputs right d-flex px-0 col-6 '>Cmsn %
                        <input type='text' className='item_input col-6 col-7'/>
                        </div>
                        </div>
                    <div className="item_add_first_row px-0 row mx-0 pt-2">
                        <div className='item_inputs right d-flex mx-0 px-0 col-6'>Qty in Box
                        <input type='text' className='item_input col-6 col-7'/>
                        </div>
                        <div className='item_inputs right d-flex px-0 col-6 '>Op. Stock
                        <input type='text' className='item_input col-6 col-7'/>
                        </div>
                        </div>
                    <div className="item_add_first_row px-0 row mx-0 pt-2">
                        <div className='item_inputs right d-flex mx-0 px-0 col-6'>Dmge
                        <input type='text' className='item_input col-6 col-7'/>
                        </div>
                        <div className='item_inputs right d-flex px-0 col-6 '>Dmg. Cost
                        <input type='text' className='item_input col-6 col-7'/>
                        </div>
                        </div>
                    <div className="item_add_first_row px-0 row mx-0 pt-2">
                        <div className='item_inputs right d-flex mx-0 px-0 col-6'>Role
                        <input type='text' className='item_input col-6 col-7'/>
                        </div>
                        <div className='item_inputs right d-flex px-0 col-6 '>Mcv
                        <input type='text' className='item_input col-6 col-7'/>
                        </div>
                        </div>

                    </div>

                 </div>
                <div className="pt-2 d-flex justify-content-between w-100 ">
                    <div className='d-flex row col-6 gap-4'>
                        <div className='btn bg-black text-light col-5 text-start px-3 py-1'>Unit Conversion</div>
                        <div className='btn bg-black text-light col-5 text-start px-3 py-1'>BarCode</div>
                    </div>
                    <div className=''>
                        <div className='checkbox_container d-flex'>
                            <div className="item_add_check  d-flex align-item-center">
                                <input type='checkbox' name='Blocked' value='Blocked'/>
                                <label for='Blocked'>Blocked</label>
                            </div>
                            <div className="item_add_check  d-flex align-item-center">
                                <input type='checkbox' name='Blocked' value='Blocked'/>
                                <label for='Blocked'>Blocked</label>
                            </div>
                            <div className="item_add_check  d-flex align-item-center">
                                <input type='checkbox' className='checkbox' name='Blocked' value='Blocked'/>
                                <label for='Blocked'>Blocked</label>
                            </div>
                        </div>
                        <div className='checkbox_container d-flex'>
                            <div className="item_add_check  d-flex align-item-center">
                                <input type='checkbox' name='Blocked' value='Blocked'/>
                                <label for='Blocked'>Blocked</label>
                            </div>
                            <div className="item_add_check  d-flex align-item-center">
                                <input type='checkbox' name='Blocked' value='Blocked'/>
                                <label for='Blocked'>Blocked</label>
                            </div>
                            <div className="item_add_check  d-flex align-item-center">
                                <input type='checkbox' className='checkbox' name='Blocked' value='Blocked'/>
                                <label for='Blocked'>Blocked</label>
                            </div>
                        </div>
                    </div>
                </div>
                    <div className='d-flex gap-2 justify-content-end pt-2'>
                        <div className='clear_btn btn'>Clear</div>
                        <div className='save_btn btn'>Save</div>
                    </div>
            </div>
        </div>
    )
}

export default ItemAdd
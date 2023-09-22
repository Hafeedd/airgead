import { useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2'
import deleteBtn from "../../../../assets/icons/delete-white.svg"
import { Modal } from 'react-bootstrap'
import SearchDropDown from '../../../../components/searchDropDown/SearchDropDown'
import useItemServices from '../../../../services/master/itemServices'

const editBtn = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M20.9521 3.04801C20.2811 2.37702 19.371 2.00006 18.4221 2.00006C17.4732 2.00006 16.5631 2.37702 15.8921 3.04801L3.94011 15C3.5339 15.4062 3.24832 15.9172 3.11511 16.476L2.02011 21.078C1.99046 21.2027 1.99324 21.3328 2.02819 21.4561C2.06313 21.5794 2.12907 21.6916 2.21972 21.7822C2.31037 21.8727 2.42271 21.9385 2.54601 21.9734C2.66932 22.0082 2.79949 22.0108 2.92411 21.981L7.52511 20.885C8.0843 20.752 8.5956 20.4664 9.00211 20.06L20.9521 8.11C21.6231 7.439 22.0001 6.52894 22.0001 5.58C22.0001 4.63107 21.6231 3.72101 20.9521 3.05V3.04801ZM16.9521 4.108C17.1452 3.91496 17.3743 3.76183 17.6266 3.65736C17.8788 3.55288 18.1491 3.49911 18.4221 3.49911C18.6951 3.49911 18.9654 3.55288 19.2177 3.65736C19.4699 3.76183 19.6991 3.91496 19.8921 4.108C20.0852 4.30105 20.2383 4.53022 20.3428 4.78245C20.4472 5.03467 20.501 5.305 20.501 5.57801C20.501 5.85101 20.4472 6.12134 20.3428 6.37356C20.2383 6.62579 20.0852 6.85496 19.8921 7.04801L19.0001 7.939L16.0601 5.00001L16.9521 4.10901V4.108ZM15.0001 6.06201L17.9401 9L7.94011 19C7.73011 19.21 7.46611 19.357 7.17711 19.426L3.76111 20.24L4.57411 16.824C4.64311 16.534 4.79111 16.27 5.00111 16.06L15.0001 6.06001V6.06201Z" fill="#4E4E4E" stroke="#4E4E4E" stroke-width="0.5"/>
    </svg>)

export const ItemAddForm = ({edit,refresh}) =>{

    const [showDropdown, setShowDropdown] = useState('')
    const typesOptions = [{label:"PRODUCT",value:"PRODUCT"},{label:"RAW MATERIAL",value:"RAW MATERIAL"},{label:"SERVICE",value:"SERVICE"}]
    const [unitConvShow, setUnitConvShow] = useState(false)
    const [unitEdit, setUnitEdit] = useState(false)
    const [loading, setLoading] = useState(false)
    const [barcodeShow, setBarcodeShow] = useState(false)
    const [unitConvTempList, setUnitConvTempList] = useState([])
    const [ref, setRef] = useState()
    const formRef = useRef(null)
    const [unitConv, setUnitConv] = useState({
        U_id:null,
        U_unit:null,
        U_qty:null,
        U_rate:null,
        U_mrp:null
    })
    const [barcode, setBarcode] = useState({
        B_id:null,
        B_code:null,
        B_expiry:null,
        B_rate:null,
        B_mrp:null
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
    })
    const [itemadd,setItemAdd] = useState({
        code:null,
        hsn:null,
        name:null,
        second_name:null,
        types:"PRODUCT",
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

    const {
        getProperty,postProperty,
        putProperty,
        postBarcode,postUnit,
        postRack,postTaxGroup,
        postGroup,postColor,
        postSize,postCompany,
        postSubCategory,postCategory,
        postSecondName,putItemAdd,
        /* getBarcode, */getUnit,
        getRack,getTaxGroup,
        getGroup,getColor,putBarcode,
        getSize,getCompany,putUnitConvertion,
        getSubCategory,getCategory,
        getSecondName,deleteItem,deleteUnitConvertion,
        postItemAdd,postUnitConvertion} = useItemServices()
        

    useEffect(()=>{
        if(formRef.current) getRefValue(formRef,setRef)
        }
      ,[formRef])

    const getRefValue = (ref,set) =>{
    const data = [...ref.current.children]
    const newList = [...data[0].querySelectorAll("input, select")]
    newList[0].focus()
        set(newList)
    }

    const handleKeyDown = (e,callback) => {
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

    useEffect(()=>{
        setLoading(true)
        getData();
        setTimeout(() => {
            setLoading(false)
        }, 100);
    },[])

    useEffect(()=>{
        let keys = Object.keys(itemadd)
        let keysUnit = Object.keys(unitConv)
        let keysBarc = Object.keys(barcode)
        if(edit){
            if(edit.units.length>0){
                let b = []
                edit.units.map((data)=>{
                    let c, a , r = {}
                    keysUnit.map(key=>{
                        c = key
                        a = key.slice(key.indexOf('_')+1,)
                        r[c] = data[a]
                })
                b.push(r)
            })
            setUnitConvTempList(b)
            }
            if(edit.barcode.length>0){
                let b = []
                edit.barcode.map((data)=>{
                    let c, a , r = {}
                    keysBarc.map(key=>{
                        c = key
                        if(c!=='B_rate'){
                            a = key.slice(key.indexOf('_')+1,)
                        }else{
                            a = "retail_rate"
                        }
                        r[c] = data[a]
                })
                b.push(r)
                })
                setBarcode(...b)
            }
            keys.map((key)=>{
                if(key==='types') setItemAdd(data=>({...data,['types']:edit.type}))
                else if(key.match(/^types|^second_name|^category|^sub_category|^company|^size|^color|^group|^tax_group|^unit|^rack/)){
                let a = "fk_"+key
                if(edit[a]){
                    // console.log(key)
                    setItemAdd(data=>({...data,[key]:edit[a]}))}
            }
            else setItemAdd(data=>({...data,[key]:edit[key]}))
        })
        // console.log("##############")
        }else{
            handleReset()
        }
    },[edit ])

    // console.log(listItem)

    const getData = async () => {
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
            
        // res = await getSecondName()
        // if(res.success) miniFunct(res.data,'second_name')
        // res = await getType()
        // if(res.success) miniFunct(res.data,'types')
        // res = await getCategory()
        // if(res.success) miniFunct(res.data,'category')
        // res = await getSubCategory()
        // if(res.success) miniFunct(res.data,'sub_category')
        // res = await getCompany()
        // if(res.success) miniFunct(res.data,'company')
        // res = await getSize()
        // if(res.success) miniFunct(res.data,'size')
        // res = await getColor()
        // if(res.success) miniFunct(res.data,'color')
        // res = await getGroup()
        // if(res.success) miniFunct(res.data,'group')
        // res = await getTaxGroup()
        // if(res.success) miniFunct(res.data,'tax_group')
        // res = await getRack()
        // if(res.success) miniFunct(res.data,'rack')
        // res = await getUnit()
        // if(res.success) miniFunct(res.data,'unit')
        // res = await getBarcode()
        // if(res.success) miniFunct(res.data,'transaction_unit')
        list.types=typesOptions
        console.log(list)
        setListItem(list)
        }catch(err){
            // console.log(err)
        }
    }

    const handleUnitClear = () =>{
        let x = Object.keys(unitConv)
        x.map(key=>{
            setUnitConv(data=>({...data,[key]:null}))
        })
    }

    const handleDeleteUnit = async (data) =>{
        try{
            console.log("dsfdfsdf")
            let res = await deleteUnitConvertion(data?.U_id)
            if(res.success){
                refresh()
            }else
            if(!res.success)
            Swal.fire(res.message,'','error')
        }catch(err){
            console.log(err)
            // Swal.fire("Something went wrong pls try again",'',"error")
        }
    }

    const addToList = async () =>{
        let x = Object.values(unitConv)
        if(unitEdit && x.length>3){
            try{
                const data = {qty:unitConv.U_qty,unit:unitConv.U_unit,rate:unitConv.U_rate,mrp:unitConv.U_mrp}
                let res = await putUnitConvertion(unitEdit,data)
                if(res.success){
                    refresh()
                    handleUnitClear()
                    unitConvShow(false)
                    setUnitEdit(false)
                }else{
                    
                }
            }catch (err){

            }
        }else if(edit && x.length>3){
            try{
                const data = {qty:unitConv.U_qty,unit:unitConv.U_unit,rate:unitConv.U_rate,mrp:unitConv.U_mrp}
                let res = await postUnitConvertion(edit.id,data)
                if(res.success){
                    handleUnitClear()
                    refresh()
                }else{
                    Swal.fire(res.message,'','error')
                }
            }catch(err){

            }
        }
        else if(unitConvShow && unitConv.U_unit && unitConv.U_mrp && unitConv.U_rate){
            let g = unitConvTempList
            g.push(unitConv)
            setUnitConvTempList(g)
            let x = Object.keys(unitConv)
            let r = {}
            x.map(data=> r = {...r,[data]:''})
            setUnitConv(r)
        }
        else if(barcodeShow){
            setBarcodeShow(false)
        }
    }

    const addOption = async (e,data,state,edit) =>{
        e.preventDefault()
        let value = data.value
        try{
            let res 
            if(edit){
                let submitData = {property_value:value}
                res = await putProperty(submitData,edit)
            }else{
                let submitData = {property_value:value,property_type:state}
                res = await postProperty(submitData)
            }
            if(res.success)
                setItemAdd(data=>({...data,[state]:res.data.id}))

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
            let submitData = itemadd
            console.log("first")
            let res, res2 = 1, res3 = 1
            const names = ['second_name','category','sub_category','company','size','color','group','tax_group','godown_rack','unit','purchase']
            let data = handleChangeFk(names,submitData)
            if(edit){
                res = await putItemAdd(edit?.id,data)
            }else{
                res = await postItemAdd(data)
            }
            if(res?.success){
                let barcodeCheck = Object.values(barcode)
                if(barcodeCheck?.length>4 && !edit && res.data.id){
                    const data = {code:barcode.B_code,mrp:barcode.B_mrp,retail_rate:barcode.B_rate,expiry:barcode.B_expiry}
                    res3 = await postBarcode(res.data.id,data)
                }else if(res?.success && edit && barcode.B_id){
                    const data = {code:barcode.B_code,mrp:barcode.B_mrp,retail_rate:barcode.B_rate,expiry:barcode.B_expiry}
                    res3 = await putBarcode(barcode.B_id,data)
                }
                if(unitConvTempList.length>0 && !edit){
                    unitConvTempList.map(async x=>{
                        const data = {qty:x.U_qty,unit:x.U_unit,rate:x.U_rate,mrp:x.U_mrp}
                        res2 = await postUnitConvertion(res.data.id,data)
                    })
                }
                
                if(!res2?.success)
                    Swal.fire(res2?.message,'','error')
                if(!res3?.success)
                    Swal.fire(res3?.message,'','error')
                if((res3!==1 && !res3?.success)||(res2!==1 && !res2?.success)){
                    await deleteItem(res?.data?.id)}

                Swal.fire('Item Added Successfully','','success')
                refresh()
                handleReset()
            }
            else
            Swal.fire(res?.data[0],'','error')
        }catch(err){
            let a = Object.keys(err?.response?.data.data)
            console.log(a)
            Swal.fire(a[0] +` ${err?.response?.data?.data[a[0]][0]}`,'','error')
        }
    }

    // console.log(itemadd)

    const handleChangeFk = (name,submitData)=>{
        name.map(x=>{
            submitData['fk_'+x] = submitData[x]
            delete submitData[x]
        })
        console.log(submitData)
        return submitData
    }


    const handleChange = (e) =>{
        if(typeof e.target.value === 'string' && !e.target.name.match(/^U_|^B_/))
            e.target.value = e.target.value.toUpperCase()
        if(e.target.name.match(/^B_/))
            setBarcode(data=>({...data,[e.target.name]:e.target.value}))
        if(e.target.name.match(/^U_/)){
            setUnitConv(data=>({...data,[e.target.name]:e.target.value}))}
        else if(e.target.name === 'unit_conv')
            setUnitConv(data=>({...data,['unit']:e.target.value}))
        else if(e.target.value === ''){
            setItemAdd(data=>({...data,[e.target.name]:null}))
        }else
        setItemAdd(data=>({...data,[e.target.name]:e.target.value}))
    }

    const handleCheck = (e) =>{
        setItemAdd(data=>({...data,[e.target.name]:!data[e.target.name]}))
    }

    const handleReset = () =>{
        let key = Object.keys(itemadd)
        key.map((data)=>{
            if(!data.match(/^blocked|^tax_inclusive|^manuel_qty_in_bc|^rent_item|^gate_pass|^types/))
                setItemAdd(val=>({...val,[data]:null}))
            })
    }

    const handleUnitHide = () =>{
        setUnitConvShow(false)
        setBarcodeShow(false)
    }

    const handleEditUnit = (e,data) =>{
        setUnitConv(data)
        setUnitEdit(data.U_id)
    }

    return(
        <form onSubmit={handleSubmit} ref={formRef} className={`item_add_cont`}>
                {edit?"Edit Items":"Add New Item"}
                <div className={`item_add_form pt-1 d-flex mt-1 ${loading && "d-none"}`}>

            {/* item details --------------------------------------------------------------------------------------- */}

                <div className='item_add_form_part1 row mx-0 px-0 col-6 '>
                    
                    <div className="item_add_first_row px-0 row mx-0 ">

                    <div className='item_inputs d-flex mx-0 px-0 col-6'>
                        <div className="col-4 px-0">Code*</div>
                        <div className="col-8 px-0">
                    <input onKeyDown={handleKeyDown} required type='number' className='item_input'
                        value={itemadd.code?itemadd.code:''} name='code' onChange={handleChange}/>
                    </div>
                        </div>
                    <div className='item_inputs d-flex px-0 col-6 align-itmes-end'>
                        <div className='col-4 px-0 ps-3'>HSN*</div>
                        <div className="col-8 px-0">
                    <input onKeyDown={handleKeyDown} required type='number' className='item_input'
                        value={itemadd.hsn?itemadd.hsn:''} name='hsn' onChange={handleChange}/>
                        </div>
                    </div>
                    </div>

                    <div className='item_inputs row px-0 mx-0 pt-2'>
                        <div className='col-6 px-0'>Name*</div>
                        <div className="col-6 px-0">
                            <input onKeyDown={handleKeyDown} type='text' required className='item_input ms-0 col-6'
                            value={itemadd.name?itemadd.name:''} name='name' onChange={handleChange}/>
                        </div>
                    </div>
                    <div className='item_inputs d-flex pt-2 px-0'>
                        <div className='col-6'>Second Name</div>
                    <SearchDropDown id="second_name" addNew={true} setNew={addOption} options={listItem}
                        {... { showDropdown, setShowDropdown, handleKeyDown }} setDataValue={setItemAdd} selectedValue={itemadd}/>
                    </div>
                    <div className='item_inputs d-flex pt-2 px-0'>
                        <div className='col-6'>Type</div>
                    <SearchDropDown id="types" setNew={addOption} options={listItem} noAdd={true}
                        {... { showDropdown, setShowDropdown, handleKeyDown }} setDataValue={setItemAdd} selectedValue={itemadd}/>
                        {/* <select type='select' className='item_input col-6 col-7'
                            name='rent_type'>
                            <option value='PRODUCT'>PRODUCT</option>
                            <option value='RAW MATERIAL'>RAW MATERIAL</option>
                            <option value='SERVICE'>SERVICE</option>
                        </select> */}
                    </div>
                    <div className='item_inputs d-flex pt-2 px-0'>
                        <div className='col-6'>Category</div>
                        <div className='col-6 px-0'>
                        <SearchDropDown id="category" addNew={true} setNew={addOption} options={listItem}
                            {... { showDropdown, setShowDropdown, handleKeyDown }} setDataValue={setItemAdd} selectedValue={itemadd}/>
                        </div>
                    </div>
                    <div className='item_inputs d-flex pt-2 px-0'>
                        <div className='col-6'>Sub Category</div>
                        <div className='col-6 px-0'>
                        <SearchDropDown id="sub_category" addNew={true} setNew={addOption} options={listItem}
                            {... { showDropdown, setShowDropdown, handleKeyDown }} setDataValue={setItemAdd} selectedValue={itemadd}/>
                        </div>
                    </div>
                    <div className='item_inputs d-flex pt-2 px-0'>
                        <div className='col-6'>Company*</div>
                        <div className='col-6 px-0'>
                        <SearchDropDown id="company" addNew={true} setNew={addOption} options={listItem}
                            {... { showDropdown, setShowDropdown, handleKeyDown }} setDataValue={setItemAdd} selectedValue={itemadd}/>
                        </div>
                    </div>

                    <div className='item_inputs row mx-0 px-0 col-12 pt-2'>
                        <div className="col-2 col-3 px-0">Size</div>
                        <div className="col-3 col-4 px-0">
                        <SearchDropDown id="size" addNew={true} setNew={addOption} options={listItem}
                            {... { showDropdown, setShowDropdown, handleKeyDown }} setDataValue={setItemAdd} selectedValue={itemadd}/>
                        </div>
                        <div className="col-2 col-3 px-0 ps-3">Color</div>
                        <div className="col-3 col-4 px-0">
                        <SearchDropDown id="color" addNew={true} setNew={addOption} options={listItem}
                            {... { showDropdown, setShowDropdown, handleKeyDown }} setDataValue={setItemAdd} selectedValue={itemadd}/>
                        </div>
                    </div>
                    {/* </div> */}
                    
                    <div className='item_inputs row mx-0 px-0 col-12 pt-2'>
                        <div className="col-2 col-3 px-0">Group</div> 
                        <div className="col-3 col-4 px-0">
                        <SearchDropDown id="group" addNew={true} setNew={addOption} options={listItem}
                            {... { showDropdown, setShowDropdown, handleKeyDown }} setDataValue={setItemAdd} selectedValue={itemadd}/>
                        </div>
                        <div className='col-2 col-3 px-0 ps-3'>Tax Group</div>
                        <div className='col-3 col-4 px-0'>
                            
                        <SearchDropDown id="tax_group" addNew={true} setNew={addOption} options={listItem}
                            {... { showDropdown, setShowDropdown, handleKeyDown }} setDataValue={setItemAdd} selectedValue={itemadd}/>
                        </div>
                    </div>

                    <div className='item_inputs d-flex pt-2 px-0'>
                        <div className='col-6'>Godown/Rack</div>
                        <div className='col-6 px-0'>
                        <SearchDropDown id="rack" addNew={true} setNew={addOption} options={listItem}
                            {... { showDropdown, setShowDropdown, handleKeyDown }} setDataValue={setItemAdd} selectedValue={itemadd}/>
                        </div>
                    </div>
                    <div className='item_inputs d-flex pt-2 px-0'>
                        <div className='col-6'>Stock Unit*</div>
                        <div className='col-6 px-0'>
                        <SearchDropDown required id="unit" addNew={true} setNew={addOption} options={listItem}
                            {... { showDropdown, setShowDropdown, handleKeyDown }} setDataValue={setItemAdd} selectedValue={itemadd}/>
                        </div>
                    </div>
                    <div className='item_inputs d-flex pt-2 px-0'>
                        <div className='col-6'>Transaction Unit*</div>
                        <div className='col-6 px-0'>
                        <SearchDropDown required id="transaction_unit" noAdd={true}  setNew={addOption} options={listItem}
                            {... { showDropdown, setShowDropdown, handleKeyDown }} setDataValue={setItemAdd} selectedValue={itemadd}/>
                        </div>
                    </div>
                </div>

            {/* item rate ----------------------------------------------------------------------------------------------------------- */}

                <div className='item_add_form_part2 row mx-0 px-0 me-0 col-6 border-0'>

                <div className="item_add_first_row d-flex justify-content-between px-0 row mx-0 pt-2">
                    <div className='item_inputs right d-flex mx-0 px-0 col-6'>MRP*
                    <input onKeyDown={handleKeyDown} value={itemadd.mrp_rate?itemadd.mrp_rate:''} required type='number' className='item_input col-6 col-7'
                    name='mrp_rate' onChange={handleChange}/>
                    </div>
                    <div className='item_inputs right d-flex px-0 col-6 '>Ret. Rate*
                    <input onKeyDown={handleKeyDown} value={itemadd.retail_rate?itemadd.retail_rate:''} required type='number' className='item_input col-6 col-7'
                    name='retail_rate' onChange={handleChange}/>
                    </div>
                    </div>
                <div className="item_add_first_row px-0 row mx-0 pt-2">
                    <div className='item_inputs right d-flex mx-0 px-0 col-6'>WS*
                    <input onKeyDown={handleKeyDown} value={itemadd.wholesale_rate?itemadd.wholesale_rate:''} required type='number' className='item_input col-6 col-7'
                    name='wholesale_rate' onChange={handleChange}/>
                    </div>
                    <div className='item_inputs right d-flex px-0 col-6 '>SWS. Rate*
                    <input onKeyDown={handleKeyDown} value={itemadd.super_wholesale_rate?itemadd.super_wholesale_rate:''} required type='number' className='item_input col-6 col-7'
                    name='super_wholesale_rate' onChange={handleChange}/>
                    </div>
                    </div>
                <div className="item_add_first_row px-0 row mx-0 pt-2">
                    <div className='item_inputs right d-flex mx-0 px-0 col-6'>QTN
                    <input onKeyDown={handleKeyDown} value={itemadd.quotation_rate?itemadd.quotation_rate:''} type='number' className='item_input col-6 col-7'
                    name='quotation_rate' onChange={handleChange}/>
                    </div>
                    <div className='item_inputs right d-flex px-0 col-6 '>Rent
                    <input onKeyDown={handleKeyDown} value={itemadd.rent?itemadd.rent:''} type='number' className='item_input col-6 col-7'
                    name='rent' onChange={handleChange}/>
                    </div>
                    </div>
                <div className="item_add_first_row px-0 row mx-0 pt-2">
                    <div className='item_inputs right d-flex mx-0 px-0 col-6'>P.Rate*
                    <input onKeyDown={handleKeyDown} value={itemadd.purchase_rate?itemadd.purchase_rate:''} required type='number' className='item_input col-6 col-7'
                    name='purchase_rate' onChange={handleChange}/>
                    </div>
                    <div className='item_inputs right d-flex px-0 col-6 '>Cost*
                    <input value={itemadd.cost} required type='number' className='item_input col-6 col-7'
                    name='cost' onChange={handleChange}/>
                    </div>
                    </div>
                <div className="item_add_first_row px-0 row mx-0 pt-2">
                    <div className='item_inputs right d-flex mx-0 px-0 col-6'>Margin %*
                    <input onKeyDown={handleKeyDown} value={itemadd.margin?itemadd.margin:''} required type='number' className='item_input col-6 col-7'
                    name='margin' onChange={handleChange}/>
                    </div>
                    <div className='item_inputs right d-flex px-0 col-6 '>Tax/ GST*
                    <input onKeyDown={handleKeyDown} value={itemadd.tax_gst?itemadd.tax_gst:''} required type='number' className='item_input col-6 col-7'
                    name='tax_gst' onChange={handleChange}/>
                    </div>
                    </div>
                <div className="item_add_first_row px-0 row mx-0 pt-2">
                    <div className='item_inputs right d-flex mx-0 px-0 col-6'>Cess1
                    <input onKeyDown={handleKeyDown} value={itemadd.cess_1?itemadd.cess_1:''} type='number' className='item_input col-6 col-7'
                    name='cess_1' onChange={handleChange}/>
                    </div>
                    <div className='item_inputs right d-flex px-0 col-6 '>Cess2
                    <input onKeyDown={handleKeyDown} value={itemadd.cess_2?itemadd.cess_2:''} type='number' className='item_input col-6 col-7'
                    name='cess_2' onChange={handleChange}/>
                    </div>
                    </div>
                <div className="item_add_first_row px-0 row mx-0 pt-2">
                    <div className='item_inputs right d-flex mx-0 px-0 col-6'>P.Disc
                    <input onKeyDown={handleKeyDown} value={itemadd.purchase_discount?itemadd.purchase_discount:''} type='number' className='item_input col-6 col-7'
                    name='purchase_discount' onChange={handleChange}/>
                    </div>
                    <div className='item_inputs right d-flex px-0 col-6 '>S.Disc
                    <input onKeyDown={handleKeyDown} value={itemadd.sale_discount?itemadd.sale_discount:''} type='number' className='item_input col-6 col-7'
                    name='sale_discount' onChange={handleChange}/>
                    </div>
                    </div>
                <div className="item_add_first_row px-0 row mx-0 pt-2">
                    <div className='item_inputs right d-flex mx-0 px-0 col-6'>UnLd. Charge
                    <input onKeyDown={handleKeyDown} value={itemadd.unload_charge?itemadd.unload_charge:''} type='number' className='item_input col-6 col-7'
                    name='unload_charge' onChange={handleChange}/>
                    </div>
                    <div className='item_inputs right d-flex px-0 col-6 '>Point
                    <input onKeyDown={handleKeyDown} value={itemadd.point?itemadd.point:''} type='number' className='item_input col-6 col-7'
                    name='point' onChange={handleChange}/>
                    </div>
                    </div>
                <div className="item_add_first_row px-0 row mx-0 pt-2">
                    <div className='item_inputs right d-flex mx-0 px-0 col-6'>Ld. Charge
                    <input onKeyDown={handleKeyDown} value={itemadd.load_charge?itemadd.load_charge:''} type='number' className='item_input col-6 col-7'
                    name='load_charge' onChange={handleChange}/>
                    </div>
                    <div className='item_inputs right d-flex px-0 col-6 '>Cmsn %
                    <input onKeyDown={handleKeyDown} value={itemadd.commission?itemadd.commission:''} type='number' className='item_input col-6 col-7'
                    name='commission' onChange={handleChange}/>
                    </div>
                    </div>
                <div className="item_add_first_row px-0 row mx-0 pt-2">
                    <div className='item_inputs right d-flex mx-0 px-0 col-6'>Qty in Box
                    <input onKeyDown={handleKeyDown} value={itemadd.qty_in_bc?itemadd.qty_in_bc:''} type='number' className='item_input col-6 col-7'
                    name='qty_in_bc' onChange={handleChange}/>
                    </div>
                    <div className='item_inputs right d-flex px-0 col-6 '>Op. Stock*
                    <input onKeyDown={handleKeyDown} value={itemadd.open_stock?itemadd.open_stock:''} required type='number' className='item_input col-6 col-7'
                    name='open_stock' onChange={handleChange}/>
                    </div>
                    </div>
                <div className="item_add_first_row px-0 row mx-0 pt-2">
                    <div className='item_inputs right d-flex mx-0 px-0 col-6'>Dmge
                    <input onKeyDown={handleKeyDown} value={itemadd.damage?itemadd.damage:''} type='number' className='item_input col-6 col-7'
                    name='damage' onChange={handleChange}/>
                    </div>
                    <div className='item_inputs right d-flex px-0 col-6 '>Dmg. Cost
                    <input onKeyDown={handleKeyDown} value={itemadd.damge_cost?itemadd.damge_cost:''} type='number' className='item_input col-6 col-7'
                    name='damge_cost' onChange={handleChange}/>
                    </div>
                    </div>
                <div className="item_add_first_row px-0 row mx-0 pt-2">
                    <div className='item_inputs right d-flex mx-0 px-0 col-6'>Role
                    <input onKeyDown={handleKeyDown} value={itemadd.role?itemadd.role:''} type='number' className='item_input col-6 col-7'
                    name='role' onChange={handleChange}/>
                    </div>
                    <div className='item_inputs right d-flex px-0 col-6 '>Rent Type
                    <select onKeyDown={handleKeyDown} select={itemadd.rent_type} type='select' className='item_input col-6 col-7 py-1'
                    name='rent_type' onChange={handleChange}>
                    <option value=''>SELECT</option>
                    <option value='HOUR'>HOUR</option>
                    <option value='MONTH'>MONTH</option>
                    </select>
                    </div>
                    </div>

                </div>

                </div>
            <div className="pt-3 d-flex justify-content-between w-100">
                <div className='w-100'>
                    <div onClick={()=>setUnitConvShow(true)} className='btn bg-black text-light col-5 text-start px-3 py-1 me-4 ms-0'>Unit Conversion</div>
                    <div onClick={()=>setBarcodeShow(true)} className='btn bg-black text-light col-5 text-start px-3 py-1'>BarCode</div>
                </div>
                <div className='checkbox col-6'>
                    <div className='checkbox_container'>
                        <div className="item_add_check  d-flex align-item-center">
                            <input onKeyDown={handleKeyDown} onChange={handleCheck} type='checkbox' checked={itemadd.blocked} name='blocked' value={itemadd.blocked?itemadd.blocked:''}/>
                            <label>Blocked</label>
                        </div>
                        <div className="item_add_check  d-flex align-item-center">
                            <input onKeyDown={handleKeyDown} onChange={handleCheck} type='checkbox' checked={itemadd.manuel_qty_in_bc} name='manuel_qty_in_bc' value={itemadd.manuel_qty_in_bc?itemadd.manuel_qty_in_bc:''}/>
                            <label>Manual Qty in Box</label>
                        </div>
                    </div>
                    <div className='checkbox_container'>
                        <div className="item_add_check  d-flex align-item-center">
                            <input onKeyDown={handleKeyDown} onChange={handleCheck} type='checkbox' checked={itemadd.gate_pass} name='gate_pass' value={itemadd.gate_pass?itemadd.gate_pass:''}/>
                            <label>Gate Pass</label>
                        </div>
                        <div className="item_add_check  d-flex align-item-center">
                            <input onKeyDown={handleKeyDown} onChange={handleCheck} type='checkbox' checked={itemadd.tax_inclusive} name='tax_inclusive' value={itemadd.tax_inclusive?itemadd.tax_inclusive:''}/>
                            <label>Tax Inclusive</label>
                        </div>
                    </div>
                    <div className='checkbox_container'>
                        <div className="item_add_check  d-flex align-item-center">
                            <input onKeyDown={handleKeyDown} onChange={handleCheck} type='checkbox' checked={itemadd.rent_item} name='rent_item' value={itemadd.rent_item?itemadd.rent_item:''}/>
                            <label>Rent Item</label>
                        </div>
                        <div className="item_add_check  d-flex align-item-center">
                            <input onKeyDown={handleKeyDown} onChange={handleCheck} type='checkbox' checked={itemadd.blocked} name='blocked' value={itemadd.blocked?itemadd.blocked:''}/>
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
                                <table className='custom-table-2 names ms-2 position-relative'>
                                    <thead className='tabel-head'>
                                        <tr>
                                            <th>{barcodeShow?"C.Barcode":"Qty"}</th>
                                            <th>{barcodeShow?"MRP":"Unit"}</th>
                                            <th>{barcodeShow?"S.Rate":"Rate"}</th>
                                            <th>{barcodeShow?"Expiry":"Mrp"}</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody className='rounded-3 '>
                                        <tr className='table-head-input'>
                                            <td><input onKeyDown={handleKeyDown} onChange={handleChange} name={barcodeShow?'B_code':'U_qty'} value={barcodeShow?barcode.B_code:unitConv.U_qty||''} type='text' className='w-100 text-light'/></td>
                                            {/* <td><input onKeyDown={handleKeyDown} onChange={handleChange} name='unit' value={unitConv.unit} type='text' className='w-100'/></td> */}
                                            <td>
                                                {!barcodeShow?<select type='select' onChange={handleChange} value={unitConv?.U_unit||''} className='unit_select py-2 text-light w-100' name='U_unit'>
                                                    <option value={null}>Select</option>
                                                    {listItem?.unit?.length>0&&
                                                    listItem.unit.map((data,index)=><option key={index} value={data.label}>{data.label}</option>)}
                                                </select>:
                                                <input onKeyDown={handleKeyDown} onChange={handleChange} name='B_mrp' value={barcode.B_mrp} type='number' className='w-100 text-light'/>}
                                            </td>
                                            <td><input onKeyDown={handleKeyDown} onChange={handleChange} name={barcodeShow?'B_rate':'U_rate'} value={barcodeShow?barcode.B_rate:unitConv.U_rate||''} type='number' className='w-100 text-light'/></td>
                                            <td><input onKeyDown={handleKeyDown} onChange={handleChange} name={barcodeShow?'B_expiry':'U_mrp'}value={barcodeShow?barcode.B_expiry:unitConv.U_mrp||''} type={barcodeShow?'date':'number'} className='w-100 text-light'/></td>
                                            <th className='col col-1 cursor text-center'>
                                                <img src={deleteBtn} alt="deletebtn"/>
                                            </th>
                                            <th className='btn-td text-center'>
                                                <div onClick={addToList} className='add_unit_btn btn'>{barcodeShow?"+ Add":unitEdit?"Edit Unit":"Add Unit"}</div>
                                            </th>
                                        </tr>
                                        {(unitConvShow&&unitConvTempList.length>0)&&
                                        unitConvTempList.map(data=>(
                                        <tr>
                                            <td><input value={data.U_qty} type='text' className='w-100 text-light'/></td>
                                            <td>
                                                <input value={data.U_unit} type='text' className='w-100 text-light'/>
                                            </td>
                                            <td><input value={data.U_rate} type='number' className='w-100 text-light'/></td>
                                            <td><input value={data.U_mrp} type='number' className='w-100 text-light'/></td>
                                            <td style={{background:"#464646"}}><div onClick={e=>handleDeleteUnit(data)} className='text-center'><img src={deleteBtn} alt='delete btn'/></div></td>
                                            <td style={{background:"#464646"}} className='btn-td text-center'>
                                                <div onClick={(e)=>handleEditUnit(e,data)} className='add_unit_btn btn'>{"Edit"}</div>
                                            </td>
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
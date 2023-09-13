import React, { useEffect, useState } from 'react'
import useItemServices from '../../../../services/master/itemServices'
import './ItemList.css'
import { useLocation, useNavigate} from 'react-router'
import Swal from 'sweetalert2'
import { ItemAddForm } from '../itemAdd/components/AddForm'
import Table from '../../../../components/listTable.js/Table'

const ItemList = () => {
    const options = [{code:"1001",name:"laptop",hsn:"1",item_image:null,type:'PRODUCT',transaction_unit:'KG',
    mrp_rate:1000,retail_rate:990,wholesale_rate:900,super_wholesale_rate:850,quotation_rate:875,
    rent:1000,rent_type:"DAY",purchase_rate:500,cost:600,margin:'100',tax_gst:18,cess_1:2,cess_2:null,
    purchase_discount:6,sale_discount:5,unload_charge:25,load_charge:25,point:1,commission:10,
    qty_in_box:null,open_stock:null,role:null,damage:70,damage_cost:102,reorder_level:null,
    blocked:false,tax_inclusive:false,manuel_qty_in_bc:false,rent_item:false,gate_pass: false,
    fk_second_name:{id:1,second_name:'demo second name'},fk_category:{id:1,category:'demo category'},
    fk_sub_category:null,fk_company:{id:1,company:"demo company"},fk_size:{id:1,size:'XL size'},
    fk_color:{id:1,color:'Black'},fk_group:{id:1,group:'dem group'},fk_tax_group:{id:1,tax_group:'VAT'},
    fk_stock_unit:{id:1,unit:'KG'},fk_barcode:{id:1,code:10001,mrp:500}}]
    const [pageHeadItem,setPageHeadItem] = useState(1)
    const [toEdit, setToEdit] = useState(false)
    const [listItem,setListItem] = useState()
    const navigate = useNavigate()
    const {getItemList,deleteItemList} = useItemServices()
    const listHead = ['Code','Item Name','Contractor','HSN','S.Rate','P.Rate','Tax/GST','Rate']
    

    useEffect(()=>{
        getData()
    },[])

    const handleDelete = async (id,e) =>{
        e.preventDefault()
        try{
            let res = await deleteItemList(id)
            if(res.success) Swal.fire('Item deleted Successfully','','success')
            else Swal.fire(res.message,'','error')
        getData()
        }catch(err){
            Swal.fire('Failed to delete item please try again','','error')
        }
    }

    const getData = async () =>{
        try{
            const res = await getItemList()
            if(res.success){
                let tempList = res.data
                const listhead = ['code','name','fk_company.company','hsn','retail_rate','purchase_rate','tax_gst','mrp_rate']
                const newList = handleList(tempList,listhead)
                setListItem(newList)
            }
        }catch(err){

        }
    }

    const handleList = (data,listItem) =>{
        let r = []
        if(data.length>0){
            listItem.map(x=>{
                r.push(data[x])
            }
            )
        }
            return r
    }

    const handleEdit = (data) => {
        setToEdit(data)
    }

    return(
        <div className='item_add'>
                <div className="itemList_header row mx-0">
                    <div className="page_head ps-4 d-flex justify-content-between">
                        <div>
                        <div className='fw-600 fs-5'>Master Item</div>
                        <div className='page_head_items mb-3'>
                            <div onClick={()=>setPageHeadItem(1)} className={`page_head_item ${pageHeadItem === 1 && "active"}`}>Item List</div>
                            <div onClick={()=>setPageHeadItem(2)} className={`page_head_item ${pageHeadItem === 2 && "active"}`}>Change Item Code</div>
                            <div onClick={()=>setPageHeadItem(3)} className={`page_head_item ${pageHeadItem === 3 && "active"}`}>Raw Meterial Settins</div>
                            <div onClick={()=>setPageHeadItem(4)} className={`page_head_item ${pageHeadItem === 4 && "active"}`}>Update Details</div>
                            <div onClick={()=>setPageHeadItem(5)} className={`page_head_item ${pageHeadItem === 5 && "active"}`}>Merge Items</div>
                        </div>
                        </div>
                        <div className="col-1 col-2 d-flex px-1 align-items-center">
                            <div onClick={()=>navigate("/")} className="btn btn-primary add-btn px-0">+ &nbsp; Add Item</div>
                        </div>
                    </div>
                </div>
                {<Table list={listItem} {...{handleEdit,handleDelete,toEdit,listHead}}/>}
                
                {toEdit&&<div className={`${!toEdit && "d-none"}`}>
                <ItemAddForm edit={toEdit}/>
            </div>}
        </div>
    )
}

export default ItemList

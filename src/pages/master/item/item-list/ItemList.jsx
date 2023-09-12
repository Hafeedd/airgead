import React, { useEffect, useState } from 'react'
import useItemServices from '../../../../services/master/itemServices'
import './ItemList.css'
import { useLocation, useNavigate} from 'react-router'
import Swal from 'sweetalert2'
import { ItemAddForm } from '../itemAdd/components/AddForm'
import Table from '../../../../components/listTable.js/Table'

const ItemList = () => {
    const [pageHeadItem,setPageHeadItem] = useState(1)
    const [toEdit, setToEdit] = useState(false)
    const [listItem,setListItem] = useState()
    const navigate = useNavigate()
    const {getItemList,deleteItemList} = useItemServices()

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
                setListItem(res.data)
            }
        }catch(err){

        }
    }

    const location = useLocation().pathname

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
                {<Table list={listItem} {...{handleEdit,handleDelete,toEdit}}/>}
                
                {toEdit&&<div className={`${!toEdit && "d-none"}`}>
                <ItemAddForm edit={toEdit}/>
            </div>}
        </div>
    )
}

export default ItemList

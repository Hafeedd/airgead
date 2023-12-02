import React, { useEffect, useState } from 'react'
import useItemServices from '../../../services/master/itemServices'
import './ItemMaster.css'
import { useNavigate , useLocation } from 'react-router'
import Swal from 'sweetalert2'
import 'semantic-ui-css/semantic.min.css'
import ItemList from './components/ItemList'
import { ItemAddForm } from './components/AddForm'

const ItemMaster = () => {
    const [pageHeadItem,setPageHeadItem] = useState(1)
    const [toEdit, setToEdit] = useState(false)
    const [listItem,setListItem] = useState()
    const [search, setSearch] = useState()
    // const [showAddItem, setShowAddItem] = useState(false)
    const {getItemList,deleteItemList} = useItemServices()
    const navigate = useNavigate()

    useEffect(()=>{
        getData()
    },[])

    useEffect(()=>{
        if(toEdit){
         listItem.map(x=>{
             if(x.id === toEdit.id){
                 setToEdit(x)
             }
         })
        }else{
            setToEdit(false)
        }
     },[listItem])

    const location = useLocation()

    const handleDelete = (id,e)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                handleDeleteConfirm(id,e)
            }
          })
    }

    const handleDeleteConfirm = async (id,e) =>{
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
            let params
            if(search){
                params={'code':search,'name':search}
            }
            const res = await getItemList()
            if(res.success){
                setListItem(res.data)
            }
        }catch(err){

        }
    }

    const handleEdit = (data) => {
        navigate("/add")
        setToEdit(data)
    }

    return(
        <div className='item_add'>
                <div className="itemList_header row mx-0">
                    <div className="page_head ps-4 d-flex justify-content-between my-1">
                        <div>
                        <div className='fw-600 fs-5'>Master Item</div>
                        <div className='page_head_items mb-2'>
                            <div onClick={()=>{navigate('/')}} className={`page_head_item ${pageHeadItem === 1 && "active"}`}>Item List</div>
                            {/* <div onClick={()=>setPageHeadItem(2)} className={`page_head_item ${pageHeadItem === 2 && "active"}`}>Change Item Code</div>
                            <div onClick={()=>setPageHeadItem(3)} className={`page_head_item ${pageHeadItem === 3 && "active"}`}>Raw Meterial Settins</div>
                            <div onClick={()=>setPageHeadItem(4)} className={`page_head_item ${pageHeadItem === 4 && "active"}`}>Update Details</div>
                            <div onClick={()=>setPageHeadItem(5)} className={`page_head_item ${pageHeadItem === 5 && "active"}`}>Merge Items</div> */}
                        </div>
                        </div>
                        {location.pathname !== '/add'&&<div className="col-1 col-2 d-flex px-1 align-items-center">
                            <div onClick={()=>{navigate("/add");setToEdit(false)}} className="btn btn-primary add-btn px-0">+ &nbsp; Add Item</div>
                        </div>}
                    </div>
                </div>  
                {
                    /* toEdit||showAddItem */ location.pathname === '/add'?
                    <ItemAddForm refresh={getData} edit={toEdit} setToEdit={setToEdit}/>:
                    <ItemList list={listItem} {...{search,setSearch,getData,handleEdit,handleDelete,toEdit}}/>
                }
        </div>
    )
}

export default ItemMaster

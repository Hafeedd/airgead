import React, { useEffect, useState } from 'react'
import SupplierAdd from './components/SupplierAdd'
import SupplierList from './components/SupplierList'
import { useNavigate , useLocation } from 'react-router'
import useItemServices from '../../../services/master/itemServices'
import Swal from 'sweetalert2'
import useCustomerServices from '../../../services/master/customerServices'

const SupplierMaster = () => {
    const [pageHeadItem,setPageHeadItem] = useState(1)
    const [toEdit, setToEdit] = useState(false)
    const [listItem,setListItem] = useState()
    const [showAddItem, setShowAddItem] = useState(false)
    const navigate = useNavigate()
    const {getSupplier,deleteSupplier} = useCustomerServices()

    const location = useLocation()

    useEffect(()=>{
        getData()
    },[])

    // useEffect(()=>{
    //     if(location.pathname==='/supplier-master')
    //         setToEdit(false)
    // },[toEdit])

    const handleDelete = async (id,e) =>{
        e.preventDefault()
        try{
            let res = await deleteSupplier(id)
            if(res.success) Swal.fire('Item deleted Successfully','','success')
            else Swal.fire(res.message,'','error')
        getData()
        }catch(err){
            Swal.fire('Failed to delete item please try again','','error')
        }
    }

    const getData = async () =>{
        try{
            const res = await getSupplier()
            if(res.success){
                // const listhead = ['code','name','fk_company.company','hsn','retail_rate','purchase_rate','tax_gst','mrp_rate']
                // const newList = handleList(tempList,listhead)
                setListItem(res.data)
            }
        }catch(err){
            console.log(err)
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
        navigate('/supplier-add')
        setToEdit(data)
    }

    return(
        <div className='item_add'>
                <div className="itemList_header row mx-0">
                    <div className="page_head my-1 ps-4 d-flex justify-content-between">
                        <div>
                        <div className='fw-600 fs-5'>Master Supplier</div>
                        <div className='page_head_items mb-3'>
                            <div onClick={()=>navigate('/supplier-master')} className={`page_head_item ${pageHeadItem === 1 && "active"}`}>Supplier List</div>
                        </div>
                        </div>
                        <div className="col-1 col-2 d-flex px-1 align-items-center">
                            <div onClick={()=>{setToEdit(false);navigate('/supplier-add')}} className="btn btn-primary add-btn px-0">+ &nbsp; Add Item</div>
                        </div>
                    </div>
                </div>
                
                {
                    /* toEdit||showAddItem */ location.pathname === "/supplier-add"?
                    <SupplierAdd refresh={getData} edit={toEdit}/>:
                    <SupplierList list={listItem} {...{handleEdit,handleDelete,toEdit}}/>
                }
        </div>
    )
}

export default SupplierMaster

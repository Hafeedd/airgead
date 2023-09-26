import React, { useEffect, useState } from 'react'
import '../item/item-list/ItemList.css'
import { useNavigate , useLocation} from 'react-router'
import Swal from 'sweetalert2'
import CustomerTable from './components/CustomerTable'
import CustomerAddForm from './CustomerAddForm'
import useCustomerServices from '../../../services/master/customerServices'

const CustomerList = () => {
    const [pageHeadCustomer,setPageHeadCustomer] = useState(1)
    const [toEdit, setToEdit] = useState(false)
    const [listCustomer,setListCustomer] = useState([])
    const [showCustomerAdd,setShowCustomerAdd] = useState(false)
    const {getCustomer,deleteCustomer} = useCustomerServices()

    const location = useLocation()
    const navigate = useNavigate()

    useEffect(()=>{
        getData()
    },[])

    useEffect(()=>{
       if(toEdit){
        listCustomer.map(x=>{
            if(x.id === toEdit.id){
                setToEdit(x)
            }
        })
       }else{
        setToEdit(null)
       }
    },[listCustomer])

    const refreshToEdit = () =>{

    }

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
            let res = await deleteCustomer(id)    
            if(res.success) Swal.fire('Customer deleted Successfully','','success')
            else Swal.fire(res.message,'','error')
        getData()
        }catch(err){
            Swal.fire('Failed to delete Customer please try again','','error')
        }
    }

    const getData = async () =>{
        try{
            const res = await getCustomer()
            if(res?.success){
                setListCustomer(res?.data)
            }
        }catch(err){

        }
    }

    const handleEdit = (data) => {
        navigate("/customer-add")
        setToEdit(data)
    }

    const handleClose = () =>{
        setToEdit(false);
        setShowCustomerAdd(false)
    }

    return(
        <div className='item_add'>
                <div className="itemList_header row mx-0">
                    <div className="page_head ps-4 d-flex justify-content-between">
                        <div>
                        <div className='fw-600 fs-5'>Master List</div>
                        <div className='page_head_items mb-3'>
                            <div onClick={()=>navigate("/customer-master")} className={`page_head_customer ${pageHeadCustomer === 1 && "active"}`}>Customer List</div>
                           
                        </div>
                        </div>
                        <div className="d-flex px-0 align-items-center customer-add-btn">
                            <div onClick={()=>{navigate("/customer-add");setToEdit(false)}} className="btn btn-primary add-btn px-0">+ &nbsp; Add Customer</div>
                        </div>
                    </div>
                </div> 
                {/* toEdit||showCustomerAdd */ location.pathname === '/customer-add'?
                <CustomerAddForm refresh={getData} edit={toEdit} setToEdit={setToEdit}/>:
                    <CustomerTable list={listCustomer} {...{navigate,handleEdit,handleDelete,toEdit}}/>
                }
        </div>
    )
}

export default CustomerList

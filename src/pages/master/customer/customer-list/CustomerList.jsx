import React, { useEffect, useState } from 'react'
import '../../item/item-list/ItemList.css'
import { useNavigate} from 'react-router'
import Swal from 'sweetalert2'
import CustomerAddForm from '../customer-add/components/CustomerAddForm'
import useCustomerServices from '../../../../services/master/customerServices'
import CustomerTable from '../customer-add/components/CustomerTable'

const CustomerList = () => {
    const [pageHeadCustomer,setPageHeadCustomer] = useState(1)
    const [toEdit, setToEdit] = useState(false)
    const [listCustomer,setListCustomer] = useState([])
    const navigate = useNavigate()
    const {getCustomer,deleteCustomerList} = useCustomerServices()
    const listHead = ['Code', 'Name', 'Mob', 'Contract Person', 'Op.Balance', 'Credit Limite', 'Remark']

    useEffect(()=>{
        getData()
    },[])

    const handleDelete = async (id,e) =>{
        e.preventDefault()
        try{
            let res = await deleteCustomerList(id)
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

    // const location = useLocation().pathname

    const handleEdit = (data) => {
        setToEdit(data)
    }

    return(
        <div className='item_add'>
                <div className="itemList_header row mx-0">
                    <div className="page_head ps-4 d-flex justify-content-between">
                        <div>
                        <div className='fw-600 fs-5'>Master List</div>
                        <div className='page_head_items mb-3'>
                            <div onClick={()=>setPageHeadCustomer(1)} className={`page_head_Customer ${pageHeadCustomer === 1 && "active"}`}>Customer List</div>
                           
                        </div>
                        </div>
                        <div className="d-flex px-0 align-items-center customer-add-btn">
                            <div onClick={()=>navigate("/")} className="btn btn-primary add-btn px-0">+ &nbsp; Add Customer</div>
                        </div>
                    </div>
                </div>
                {<CustomerTable list={listCustomer} {...{handleEdit,handleDelete,toEdit,listHead}}/>}
                
                
                {toEdit&&<div className={`${!toEdit && "d-none"}`}>
                <CustomerAddForm edit={toEdit}/>
            </div>}
        </div>
    )
}

export default CustomerList

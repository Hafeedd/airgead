import React, { useEffect, useState } from 'react'
import CustomerAddForm from '../components/Cusotmer-addForm'
import Table from '../../item/components/ItemList'
import useCustomerServices from '../../../../services/master/customerServices'

const CustomerAdd = () => {
    const [pageHeadItem, setPageHeadItem] = useState(1)
    const [addCustomer, setAddCustomer] = useState(false)
    const [list, setList] = useState([])
    const listHead = ["Code","Name","Mobile","Contract Person","Op.Balance","Credit Limite","Remark"]

    const {getCustomer} = useCustomerServices()

    useEffect(()=>{
        getData()
    },[])

    const getData = async () =>{
        try{
            let res = await getCustomer()
            let newList = []
            if(res.success){
                let tempList = res.data
                tempList.map((data)=>{
                    let listhead = ['code','name','fk_company.company','hsn','retail_rate','purchase_rate','tax_gst','mrp_rate']
                    newList.push(handleList(data,listhead))
                })
                setList(newList)
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

    console.log(list)

    return (
        <div className='item_add'>
            <div className="page_head d-flex justify-content-between border ps-4 mt-1 mb-3">
                <div>
                <div className='fw-600 fs-5'>Master Customer</div>
                <div className='page_head_items mb-3'>
                    <div onClick={() => setPageHeadItem(1)} className={`page_head_item ${pageHeadItem === 1 && "active"}`}>Add Customer</div>
                </div>
                </div>
                <div className="col-2  d-flex px-1 align-items-center">
                    <div onClick={()=>setAddCustomer(true)} className="btn btn-primary add-btn px-0">+ &nbsp; Add Customer</div>
                </div>
            </div>
            {addCustomer?
            <CustomerAddForm {...{}}/>:
            <Table {...{listHead,list}}/>}
        </div>
    )
}

export default CustomerAdd

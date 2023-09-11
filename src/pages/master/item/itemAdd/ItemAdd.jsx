import { useState } from 'react'
import './itemAdd.css'
import { ItemAddForm } from './components/AddForm'
// import { List } from '@mui/material'

const ItemAdd = () =>{
    const [pageHeadItem,setPageHeadItem] = useState(1)

    return(
        <div className='item_add'>
            <div className="page_head ps-4 mt-1 mb-3">
                <div className='fw-600 fs-5'>Master Item</div>
                <div className='page_head_items mb-1'>
                    <div onClick={()=>setPageHeadItem(1)} className={`page_head_item ${pageHeadItem === 1 && "active"}`}>Item List</div>
                    <div onClick={()=>setPageHeadItem(2)} className={`page_head_item ${pageHeadItem === 2 && "active"}`}>Change Item Code</div>
                    <div onClick={()=>setPageHeadItem(3)} className={`page_head_item ${pageHeadItem === 3 && "active"}`}>Raw Meterial Settins</div>
                    <div onClick={()=>setPageHeadItem(4)} className={`page_head_item ${pageHeadItem === 4 && "active"}`}>Update Details</div>
                    <div onClick={()=>setPageHeadItem(5)} className={`page_head_item ${pageHeadItem === 5 && "active"}`}>Merge Items</div>
                </div>
            </div>
            <ItemAddForm/>
        </div>
    )
}

export default ItemAdd
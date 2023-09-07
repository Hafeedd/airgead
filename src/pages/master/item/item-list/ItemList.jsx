import React, { useEffect, useState } from 'react'
import search from "../../../../assets/icons/search.png"
import useItemServices from '../../../../services/master/itemServices'
import './ItemList.css'
import { useNavigate } from 'react-router'
import Swal from 'sweetalert2'

const ItemList = () => {
    const [pageHeadItem,setPageHeadItem] = useState(1)
    const [listItem,setListItem] = useState(null)

    const navigate = useNavigate()
    const {getItemList,deleteItemList} = useItemServices()

    useEffect(()=>{
        getData()
    },[])

    const deleteBtn = (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M10.5288 4.875V5.25H14.4712V4.875C14.4712 4.37772 14.2635 3.90081 13.8938 3.54917C13.5242 3.19754 13.0228 3 12.5 3C11.9772 3 11.4758 3.19754 11.1062 3.54917C10.7365 3.90081 10.5288 4.37772 10.5288 4.875ZM8.95192 5.25V4.875C8.95192 3.97989 9.32574 3.12145 9.99113 2.48851C10.6565 1.85558 11.559 1.5 12.5 1.5C13.441 1.5 14.3435 1.85558 15.0089 2.48851C15.6743 3.12145 16.0481 3.97989 16.0481 4.875V5.25H21.9615C22.1707 5.25 22.3712 5.32902 22.5191 5.46967C22.6669 5.61032 22.75 5.80109 22.75 6C22.75 6.19891 22.6669 6.38968 22.5191 6.53033C22.3712 6.67098 22.1707 6.75 21.9615 6.75H20.7725L19.2808 19.176C19.1708 20.0911 18.7105 20.9358 17.9878 21.5488C17.2651 22.1618 16.3305 22.5004 15.3621 22.5H9.63788C8.66955 22.5004 7.73491 22.1618 7.01219 21.5488C6.28947 20.9358 5.82923 20.0911 5.71923 19.176L4.22746 6.75H3.03846C2.82935 6.75 2.6288 6.67098 2.48094 6.53033C2.33307 6.38968 2.25 6.19891 2.25 6C2.25 5.80109 2.33307 5.61032 2.48094 5.46967C2.6288 5.32902 2.82935 5.25 3.03846 5.25H8.95192ZM7.28669 19.005C7.35252 19.5539 7.62838 20.0606 8.06169 20.4286C8.495 20.7965 9.05548 20.9999 9.63631 21H15.3629C15.9437 20.9999 16.5042 20.7965 16.9375 20.4286C17.3708 20.0606 17.6467 19.5539 17.7125 19.005L19.1862 6.75H5.81463L7.28669 19.005ZM10.1346 9.375C10.3437 9.375 10.5443 9.45402 10.6921 9.59467C10.84 9.73532 10.9231 9.92609 10.9231 10.125V17.625C10.9231 17.8239 10.84 18.0147 10.6921 18.1553C10.5443 18.296 10.3437 18.375 10.1346 18.375C9.9255 18.375 9.72495 18.296 9.57709 18.1553C9.42922 18.0147 9.34615 17.8239 9.34615 17.625V10.125C9.34615 9.92609 9.42922 9.73532 9.57709 9.59467C9.72495 9.45402 9.9255 9.375 10.1346 9.375ZM15.6538 10.125C15.6538 9.92609 15.5708 9.73532 15.4229 9.59467C15.275 9.45402 15.0745 9.375 14.8654 9.375C14.6563 9.375 14.4557 9.45402 14.3079 9.59467C14.16 9.73532 14.0769 9.92609 14.0769 10.125V17.625C14.0769 17.8239 14.16 18.0147 14.3079 18.1553C14.4557 18.296 14.6563 18.375 14.8654 18.375C15.0745 18.375 15.275 18.296 15.4229 18.1553C15.5708 18.0147 15.6538 17.8239 15.6538 17.625V10.125Z" fill="#C36060"/>
        </svg>
    )
    const editBtn = (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M20.9521 3.04801C20.2811 2.37702 19.371 2.00006 18.4221 2.00006C17.4732 2.00006 16.5631 2.37702 15.8921 3.04801L3.94011 15C3.5339 15.4062 3.24832 15.9172 3.11511 16.476L2.02011 21.078C1.99046 21.2027 1.99324 21.3328 2.02819 21.4561C2.06313 21.5794 2.12907 21.6916 2.21972 21.7822C2.31037 21.8727 2.42271 21.9385 2.54601 21.9734C2.66932 22.0082 2.79949 22.0108 2.92411 21.981L7.52511 20.885C8.0843 20.752 8.5956 20.4664 9.00211 20.06L20.9521 8.11C21.6231 7.439 22.0001 6.52894 22.0001 5.58C22.0001 4.63107 21.6231 3.72101 20.9521 3.05V3.04801ZM16.9521 4.108C17.1452 3.91496 17.3743 3.76183 17.6266 3.65736C17.8788 3.55288 18.1491 3.49911 18.4221 3.49911C18.6951 3.49911 18.9654 3.55288 19.2177 3.65736C19.4699 3.76183 19.6991 3.91496 19.8921 4.108C20.0852 4.30105 20.2383 4.53022 20.3428 4.78245C20.4472 5.03467 20.501 5.305 20.501 5.57801C20.501 5.85101 20.4472 6.12134 20.3428 6.37356C20.2383 6.62579 20.0852 6.85496 19.8921 7.04801L19.0001 7.939L16.0601 5.00001L16.9521 4.10901V4.108ZM15.0001 6.06201L17.9401 9L7.94011 19C7.73011 19.21 7.46611 19.357 7.17711 19.426L3.76111 20.24L4.57411 16.824C4.64311 16.534 4.79111 16.27 5.00111 16.06L15.0001 6.06001V6.06201Z" fill="#4E4E4E" stroke="#4E4E4E" stroke-width="0.5"/>
        </svg>
    )

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
                console.log(res.data)
            }
        }catch(err){

        }
    }

    return(
        <div className='item_add'>
            <div className="row mx-0">
                <div className="page_head ps-4 mt-1 mb-3 col-10 col-11">
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
            <div className="row mx-0 px-4 my-2">
                <div className="col-2 col-3 px-0">
                    <div className='item_seach_bar_cont rounded-2'>
                        <img src={search} className='search_img me-3 ms-2 py-2'/>
                        <input 
                            className='item_search_bar rounded-2 border-0 py-1' 
                            placeholder='Search' 
                            type='text'
                        />
                    </div>
                </div>
                <div className="col-2">
                    <div className="btn btn-sm btn-dark filter-btn">
                        Filter Here
                    </div>
                </div>
            </div>
            <div className='item_add_cont p-0 table-scroller' style={{borderRadius: "0.3125rem 0.3125rem 0rem 0rem"}}>
                <table className='table table-light custom-table'>
                    <thead>
                        <tr>
                            <th style={{borderTopLeftRadius: "0.3125rem"}}>No</th>
                            <th>Code</th>
                            <th className='text-start'>Item Name</th>
                            <th>Contractor</th>
                            <th>HSN</th>
                            <th>S.Rate</th>
                            <th>P.Rate</th>
                            <th>Tax/GST</th>
                            <th>Rate</th>
                            <th></th>
                            <th style={{borderTopRightRadius: "0.3125rem"}}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {listItem &&
                        listItem.map((data,i)=>{
                        return(<tr>
                            <td>{i+1}</td>
                            <td>{data.code}</td>
                            <td className='text-start'>{data.name}</td>
                            <td>{data.fk_company?.company}</td>
                            <td>{data.hsn}</td>
                            <td>{data.retail_rate}</td>
                            <td>{data.purchase_rate}</td>
                            <td>{data.tax_gst}</td>
                            <td>{data.mrp_rate}</td>
                            <td>
                                <div className='button' onClick={(e)=>handleDelete(data.id,e)}>
                                    {deleteBtn}
                                </div>
                            </td>
                            <td>
                                <div>
                                    {editBtn}
                                </div>
                            </td>
                        </tr>
                        )})}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ItemList

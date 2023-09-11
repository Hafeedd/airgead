import React, { useEffect, useState } from 'react'
import search from "../../../../assets/icons/search.png"
import deleteBtn from "../../../../assets/icons/delete.svg"
import useItemServices from '../../../../services/master/itemServices'
import './ItemList.css'
import { useNavigate } from 'react-router'
import Swal from 'sweetalert2'
import { ItemAddForm } from '../itemAdd/components/AddForm'

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
    const [listItem,setListItem] = useState(options)

    const navigate = useNavigate()
    const {getItemList,deleteItemList} = useItemServices()

    useEffect(()=>{
        getData()
    },[])

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
            }
        }catch(err){

        }
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
                <div className={`${toEdit && "d-none"}`}>
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
                                {listItem ?
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
                                            <img src={deleteBtn}  alt='deletebtn'/>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='button' onClick={e=>handleEdit(data)}>
                                            {editBtn}
                                        </div>
                                    </td>
                                </tr>
                                )}):
                                <tr className='fs-5 ' colspan={3}>
                                    No Item Added Yet</tr>}
                            </tbody>
                        </table>
                    </div>
                </div>
            {toEdit&&<div className={`${!toEdit && "d-none"}`}>
                <ItemAddForm edit={toEdit}/>
            </div>}
        </div>
    )
}

export default ItemList

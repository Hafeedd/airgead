import { useState } from 'react'
import './itemAdd.css'
import search from "../../assets/icons/search.png"

const ItemAdd = () =>{
    const [pageHeadItem,setPageHeadItem] = useState(1)


    return(
        <div className='item_add'>
            <div className="page_head">
                <div className='fw-600 fs-5'>Master Item</div>
                <div className='page_head_items mb-3'>
                    <div onClick={()=>setPageHeadItem(1)} className={`page_head_item ${pageHeadItem === 1 && "active"}`}>Item List</div>
                    <div onClick={()=>setPageHeadItem(2)} className={`page_head_item ${pageHeadItem === 2 && "active"}`}>Change Item Code</div>
                    <div onClick={()=>setPageHeadItem(3)} className={`page_head_item ${pageHeadItem === 3 && "active"}`}>Raw Meterial Settins</div>
                    <div onClick={()=>setPageHeadItem(4)} className={`page_head_item ${pageHeadItem === 4 && "active"}`}>Update Details</div>
                    <div onClick={()=>setPageHeadItem(5)} className={`page_head_item ${pageHeadItem === 5 && "active"}`}>Merge Items</div>
                </div>
            </div>
            <div className='item_add_cont'>
                 Add New Item
                 <div className='item_add_form pt-1 d-flex'>

                {/* item details --------------------------------------------------------------------------------------- */}

                    <div className='item_add_form_part1 row mx-0 px-0 col-6 '>
                        
                        <div className="item_add_first_row px-0 row mx-0 ">
                        <div className='item_inputs d-flex mx-0 px-0 col-6'>Code
                        <input type='text' className='item_input '/>
                        </div>
                        <div className='item_inputs d-flex px-0 col-6 align-itmes-end'>HSN
                        <input type='text' className='item_input'/>
                        </div>
                        </div>

                        <div className='item_inputs d-flex justify-content-between px-0 mx-0 col-12 pt-2'>Name
                        <input type='text' className='item_input names'/>
                        </div>
                        <div className='item_inputs d-flex justify-content-between px-0 mx-0 col-12 pt-2'>Second Name
                        <input type='text' className='item_input names'/>
                        </div>
                        <div className='item_inputs d-flex justify-content-between px-0 mx-0 col-12 pt-2'>Type
                        <input type='text' className='item_input names'/>
                        </div>
                        <div className='item_inputs d-flex justify-content-between px-0 mx-0 col-12 pt-2'>Category
                        <input type='text' className='item_input names'/>
                        </div>
                        <div className='item_inputs d-flex justify-content-between px-0 mx-0 col-12 pt-2'>Sub Category
                        <input type='text' className='item_input names'/>
                        </div>
                        <div className='item_inputs d-flex justify-content-between px-0 mx-0 col-12 pt-2'>Company
                        <input type='text' className='item_input names'/>
                        </div>

                        <div className="item_add_first_row px-0 row mx-0 pt-2">
                        <div className='item_inputs d-flex mx-0 px-0 col-6'>Size
                        <input type='text' className='item_input col-7 col-8'/>
                        </div>
                        <div className='item_inputs d-flex px-0 col-6 align-itmes-end'>Color
                        <input type='text' className='item_input col-7 col-8'/>
                        </div>
                        </div>
                        
                        <div className="item_add_first_row px-0 row mx-0 pt-2">
                        <div className='item_inputs d-flex mx-0 px-0 col-6'>Group
                        <input type='text' className='item_input col-7 col-8'/>
                        </div>
                        <div className='item_inputs d-flex px-0 col-6 align-itmes-end'>Tax Group
                        <input type='text' className='item_input col-7 col-8'/>
                        </div>
                        </div>

                        <div className='item_inputs d-flex justify-content-between px-0 mx-0 col-12 pt-2'>Godown/Rack
                        <input type='text' className='item_input names'/>
                        </div>
                        <div className='item_inputs d-flex justify-content-between px-0 mx-0 col-12 pt-2'>Stock Unit
                        <input type='text' className='item_input names'/>
                        </div>
                        <div className='item_inputs d-flex justify-content-between px-0 mx-0 col-12 pt-2'>Transaction Unit
                        <input type='text' className='item_input names'/>
                        </div>

                    </div>

                {/* item rate ----------------------------------------------------------------------------------------------------------- */}

                    <div className='item_add_form_part2 row mx-0 px-0 me-0 col-6 border-0'>

                    <div className="item_add_first_row d-flex justify-content-between px-0 row mx-0 pt-2">
                        <div className='item_inputs right d-flex mx-0 px-0 col-6'>MRP
                        <input type='text' className='item_input col-6 col-7'/>
                        </div>
                        <div className='item_inputs right d-flex px-0 col-6 '>Ret. Rate
                        <input type='text' className='item_input col-6 col-7'/>
                        </div>
                        </div>
                    <div className="item_add_first_row px-0 row mx-0 pt-2">
                        <div className='item_inputs right d-flex mx-0 px-0 col-6'>WS
                        <input type='text' className='item_input col-6 col-7'/>
                        </div>
                        <div className='item_inputs right d-flex px-0 col-6 '>SWS. Rate
                        <input type='text' className='item_input col-6 col-7'/>
                        </div>
                        </div>
                    <div className="item_add_first_row px-0 row mx-0 pt-2">
                        <div className='item_inputs right d-flex mx-0 px-0 col-6'>QTN
                        <input type='text' className='item_input col-6 col-7'/>
                        </div>
                        <div className='item_inputs right d-flex px-0 col-6 '>Rent
                        <input type='text' className='item_input col-6 col-7'/>
                        </div>
                        </div>
                    <div className="item_add_first_row px-0 row mx-0 pt-2">
                        <div className='item_inputs right d-flex mx-0 px-0 col-6'>P.Rate
                        <input type='text' className='item_input col-6 col-7'/>
                        </div>
                        <div className='item_inputs right d-flex px-0 col-6 '>Cost
                        <input type='text' className='item_input col-6 col-7'/>
                        </div>
                        </div>
                    <div className="item_add_first_row px-0 row mx-0 pt-2">
                        <div className='item_inputs right d-flex mx-0 px-0 col-6'>Margin %
                        <input type='text' className='item_input col-6 col-7'/>
                        </div>
                        <div className='item_inputs right d-flex px-0 col-6 '>Tax/ GST 
                        <input type='text' className='item_input col-6 col-7'/>
                        </div>
                        </div>
                    <div className="item_add_first_row px-0 row mx-0 pt-2">
                        <div className='item_inputs right d-flex mx-0 px-0 col-6'>Cess1
                        <input type='text' className='item_input col-6 col-7'/>
                        </div>
                        <div className='item_inputs right d-flex px-0 col-6 '>Cess2
                        <input type='text' className='item_input col-6 col-7'/>
                        </div>
                        </div>
                    <div className="item_add_first_row px-0 row mx-0 pt-2">
                        <div className='item_inputs right d-flex mx-0 px-0 col-6'>P.Disc
                        <input type='text' className='item_input col-6 col-7'/>
                        </div>
                        <div className='item_inputs right d-flex px-0 col-6 '>S.Disc
                        <input type='text' className='item_input col-6 col-7'/>
                        </div>
                        </div>
                    <div className="item_add_first_row px-0 row mx-0 pt-2">
                        <div className='item_inputs right d-flex mx-0 px-0 col-6'>UnLd. Charge
                        <input type='text' className='item_input col-6 col-7'/>
                        </div>
                        <div className='item_inputs right d-flex px-0 col-6 '>Point
                        <input type='text' className='item_input col-6 col-7'/>
                        </div>
                        </div>
                    <div className="item_add_first_row px-0 row mx-0 pt-2">
                        <div className='item_inputs right d-flex mx-0 px-0 col-6'>Ld. Charge
                        <input type='text' className='item_input col-6 col-7'/>
                        </div>
                        <div className='item_inputs right d-flex px-0 col-6 '>Cmsn %
                        <input type='text' className='item_input col-6 col-7'/>
                        </div>
                        </div>
                    <div className="item_add_first_row px-0 row mx-0 pt-2">
                        <div className='item_inputs right d-flex mx-0 px-0 col-6'>Qty in Box
                        <input type='text' className='item_input col-6 col-7'/>
                        </div>
                        <div className='item_inputs right d-flex px-0 col-6 '>Op. Stock
                        <input type='text' className='item_input col-6 col-7'/>
                        </div>
                        </div>
                    <div className="item_add_first_row px-0 row mx-0 pt-2">
                        <div className='item_inputs right d-flex mx-0 px-0 col-6'>Dmge
                        <input type='text' className='item_input col-6 col-7'/>
                        </div>
                        <div className='item_inputs right d-flex px-0 col-6 '>Dmg. Cost
                        <input type='text' className='item_input col-6 col-7'/>
                        </div>
                        </div>
                    <div className="item_add_first_row px-0 row mx-0 pt-2">
                        <div className='item_inputs right d-flex mx-0 px-0 col-6'>Role
                        <input type='text' className='item_input col-6 col-7'/>
                        </div>
                        <div className='item_inputs right d-flex px-0 col-6 '>Mcv
                        <input type='text' className='item_input col-6 col-7'/>
                        </div>
                        </div>

                    </div>

                 </div>
                <div className="pt-2 d-flex justify-content-between w-100 ">
                    <div className='d-flex row col-6 gap-4'>
                        <div className='btn bg-black text-light col-5 text-start px-3 py-0'>Unit Conversion</div>
                        <div className='btn bg-black text-light col-5 text-start px-3 py-0'>BarCode</div>
                    </div>
                    <div className=''>
                        <div className='d-flex gap-4'>
                            <div className="item_add_check form-check-input d-flex align-item-center">
                                <input type='checkbox' name='Blocked' value='Blocked'/>
                                <label for='Blocked'>Blocked</label>
                            </div>
                            <div className="item_add_check form-check-input d-flex align-item-center">
                                <input type='checkbox' name='Blocked' value='Blocked'/>
                                <label for='Blocked'>Blocked</label>
                            </div>
                            <div className="item_add_check form-check-input d-flex align-item-center">
                                {/* <input type='checkbox' className='checkbox' name='Blocked' value='Blocked'/> */}
                                
                                <label for='Blocked'>Blocked</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemAdd
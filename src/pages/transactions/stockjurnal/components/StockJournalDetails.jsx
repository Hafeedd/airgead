import { Form } from "react-bootstrap"
import {MdMovieEdit} from 'react-icons/md'
import { TfiEmail, TfiPrinter } from "react-icons/tfi";
import { BsWhatsapp, BsFiletypePdf } from "react-icons/bs";
import { BiSolidTrashAlt } from "react-icons/bi";
import { RiFileExcel2Line } from "react-icons/ri";
import { Dropdown } from "semantic-ui-react"
import { useState } from "react"
import Swal from "sweetalert2"
import useOnKey from "../../../../hooks/onKeyFunct/onKeyFunct"

export const StockJournalDetails = (props) => {
    const {setShowJournalFilter,stockJAdd,setStockJAdd,edit,
        itemNameList,stockTableItem,setStockTableItem,handleSubmit,
        handleResetStockTabe,stockTableItemList,handleClearAll,
        setStockTableItemList,unitList,handleAddToTableList,
        tableEdit,setTableEdit,deleteStockJ,stockJList,setEdit} = props

    const [ref, setRef] = useState(null)

    const {handleKeyDown, formRef} = useOnKey(ref, setRef)

    const AdjustTableHeight = () =>{
        let a = []
        for(let i=0; i<5 - stockTableItemList.length ; i++){
            a.push(<tr><th colSpan={10} className="stockJadj-table"></th></tr>)
        }
        return a
    }

    const handleKeyWithSubmit = (e) =>{
        e.preventDefault()
        if(e.type == 'keydown')
            if(e.key == 'Enter')
            handleAddToTableList()

        handleKeyDown(e)
    }

    const handleTrashButton = async () =>{
        // try{
        //     if(edit){
        //         const response = await deleteStockJ(edit?.id)
        //         if(!response.success)
        //         Swal.fire('Error',response.data,'error')
        //     }
        // }catch(err){}
        handleResetStockTabe()
    }

    const handleEditTableItem = (data,i) =>{
        setTableEdit(stockTableItem)
        let tempTable = stockTableItemList
        tempTable.splice(i,1)
        setStockTableItem(data)
    }

    const handleChangeTableItem = (e,data) =>{
        if(data && data?.name == "code"){
            let item_data = data.options.filter(x=>x.value===data.value)[0]
            setStockTableItem(data=>({...data,['code']:item_data?.value,
            unit:item_data?.unit,name:item_data?.name}))
        }
        else if(e.target.value === '')
            setStockTableItem(data=>({...data,[e.target.name]:null}))
        else
            setStockTableItem(data=>({...data,[e.target.name]:e.target.value}))
    }

    const handleChange = (e,data) =>{
        if(data && data?.name == "code"){
            let item_data = data.options.filter(x=>x.value===data.value)[0]
            setStockJAdd(data=>({...data,['code']:item_data?.value,
            unit:item_data?.unit}))
        }
        if(e.target.value === '')
            setStockJAdd({...stockJAdd,[e.target.name]:null})
        else
            setStockJAdd(data=>({...data,[e.target.name]:e.target.value}))
    }

    const search = (options, searchValue) => {
        searchValue = searchValue.toUpperCase()
        return options.filter((option) => 
        {return(
            option?.value?.toString().includes(searchValue)||
            option.description?.toString()?.includes(searchValue))});
      };

      const handlePrev = () => {
        if(stockJList){
        if(!edit){
            setEdit(stockJList[0])
        }else{
            let ind = stockJList?.findIndex((x)=>edit.id == x.id)
            if(ind !== stockJList?.length-1){
                handleClearAll()
                setStockTableItem()
                setEdit(stockJList[ind+1])
            }else{
                Swal.fire("No more stock to edit",'go for next','warning')
            }
        }}
    }

      const handleNext = () => {
        let i = stockJList?.length -1
        if(!edit){
            Swal.fire("No more stock to edit",'go for prev','warning')
        }else if(edit?.id == stockJList[0].id){
            handleClearAll()
        }else{
            handleClearAll()
            let ind = stockJList?.findIndex((x)=>edit.id == x.id)
            if(ind !== stockJList[0]){
                setEdit(stockJList[ind-1])
            }else{
                Swal.fire("No more stock to edit",'go for prev','warning')
            }
        }
    }
    
  return (
    <div className="stock-jdetails-cont p-1 ps-4 rounded-1 w-100 bg-light h-100">
        Stock Journal
        <div className="stock-entry row mx-0 px-0 pt-1">
            <Form.Group className='col-4 pe-4 ps-0 mx-0 d-flex align-items-start mt-1'>
                <Form.Label className='col-2 purchase-input-label pb-1'>Doc no.</Form.Label>
                <Form.Control
                    onChange={handleChange}
                    required
                    name="code"
                    value={stockJAdd.code||""}
                    className='purchase-input-text me-2'
                    placeholder='Document number'
                    type='text'
                />
                <div onClick={()=>setShowJournalFilter(true)} 
                className="col-1 col-2 p-1 bg-dark rounded-1 btn py-0 text-light ">
                    <MdMovieEdit size={18} className="mb-1"/></div>
            </Form.Group>
            <Form.Group className='col-4 pe-4 ps-0 mx-0 d-flex align-items-start mt-1'>
                <Form.Label className='col-2 purchase-input-label pb-1'>Date</Form.Label>
                <Form.Control
                    onChange={handleChange}
                    required
                    name="date"
                    value={stockJAdd.date||!edit?(new Date().toISOString().slice(0,10)):''}
                    className='purchase-input-text me-2'
                    placeholder='Document number'
                    type='date'
                />
            </Form.Group>
            <Form.Group className='col-3 col-4 pe-4 ps-0 mx-0 d-flex align-items-start mt-1'>
                <Form.Label className='col-2 purchase-input-label pb-1'>Staff</Form.Label>
                <Form.Control
                    onChange={handleChange}
                    required
                    name="salesman"
                    value={stockJAdd.salesman||""}
                    className='purchase-input-text me-2'
                    placeholder='staff'
                    type='text'
                />
            </Form.Group>
            <div style={{background:'#4B4B4B'}} 
            className="btn rounded-1 text-light col-1 col-2 py-0 mt-3 me-4">
                <BsFiletypePdf className="me-2 mb-1" size={18}/>PDF</div>
            <div style={{background:'#4B4B4B'}} 
            className="btn rounded-1 text-light col-1 col-2 py-0 mt-3 me-4">
                <TfiEmail size={18} className="me-2 mb-1"/>Email</div>
            <div style={{background:'#4B4B4B'}} 
            className="btn rounded-1 text-light col-1 col-2 py-0 mt-3 me-4">
                <RiFileExcel2Line size={18} className="me-2 mb-1"/>Excel</div>
            <div style={{background:'#4B4B4B'}} 
            className="btn rounded-1 text-light col-1 col-2 py-0 mt-3 me-4">
                <BsWhatsapp size={18} className="me-2 mb-1"/>Whatsapp</div>
            <div style={{background:'#4B4B4B'}} 
            className="btn rounded-1 text-light col-1 col-2 py-0 mt-3">
                <TfiPrinter size={18} className="me-2 mb-1"/>Print</div>
            <div className="col-3 mx-0 col-4 text-small text-end mt-3 px-0">
                <div onClick={handleAddToTableList} style={{background:'#4A00A8'}} className="btn text-small text-light py-1 me-3">
                    + Add Stock
                </div>
            </div>
        </div>
        <div className="pe-4 stock-journal-table-cont mt-3">
            <table className=" table stock-journal-table w-100">
                <thead>
                    <th colSpan={2} className="ps-4">Item Name</th>
                    <th width={'120'} className="">Qty</th>
                    <th width={'120'} className="">Ut</th>
                    <th width={'120'} className="">Cost</th>
                    <th width={'110'} className="">Value</th>
                    <th width={'130'} className="">Godown</th>
                    <th width={'180'} className="">Stock in/ Stock Less</th>
                    <th width={'40'}></th>
                </thead>
                <tbody>
                    <tr ref={formRef}>
                        <td colSpan={2}>
                            <div className="item-search-drop">
                            <Dropdown
                            clearable
                            selection
                            required
                            search={search}
                            onKeyDown={handleKeyDown}
                            onChange={handleChangeTableItem}
                            className='purchase-input-text table-drop d-flex align-items-center py-0 form-control'
                            name="code"
                            placeholder='select'
                            value={stockTableItem?.code||''}
                            options={itemNameList}
                            />
                        </div></td>
                        <td className="align-middle">
                            <input
                                onChange={handleChangeTableItem}
                                onKeyDown={handleKeyDown}
                                required
                                name="qty"
                                value={stockTableItem?.qty||''}
                                className='col-7 py-2 rounded-2 border-0 text-center '
                                placeholder="Enter"
                                type='text'
                            />
                        </td>
                        <td className="align-middle">
                        <select disabled
                            style={{"WebkitAppearance":"none",fontSize:'10px',padding:'3.5px 1px'}} 
                            className='purchase_input border-0 w-100 text-center' value={stockTableItem?.unit||''}>
                            {unitList&&unitList.map((x,i)=>
                            <option key={i} value={x.value}>{x.text}</option>)}
                        </select>
                        </td>
                        <td className="align-middle">{stockTableItem?.cost||'0.00'}</td>
                        <td className="align-middle">{stockTableItem?.value||'0.00'}</td>
                        <td className="align-middle">{stockTableItem?.godown||'0.00'}</td>
                        <td className="align-middle">
                            <select className="add-less-btn" onChange={handleChangeTableItem}
                            onKeyDown={handleKeyWithSubmit} name="qty_type" 
                            value={stockTableItem?.qty_type||"add"}>
                                <option value="add">Add</option>
                                <option value="less">Less</option>
                            </select>
                        </td>
                        <td className="align-middle ps-0 text-start">
                            {(tableEdit&&!edit)&&<BiSolidTrashAlt size={20} 
                            onClick={()=>handleTrashButton()}/>}
                        </td>
                    </tr>
                    {stockTableItemList?.length>0&&
                    stockTableItemList?.map((data,i)=>
                    (
                        <tr key={i}>
                            <td colSpan={2}>
                                <div className="item-search-drop">
                                    <input
                                    required
                                    disabled
                                    style={{border:"1px solid #4d4d4d"}}
                                    className='py-2 w-100 rounded-2 border-1 ps-3 text-dark'
                                    value={data?.name+"    "+data?.code||''}
                                    />
                                </div>
                            </td>
                            <td className="align-middle">
                                <input
                                    value={data.qty||''}
                                    className='col-7 py-2 rounded-2 border-0 text-center '
                                    type='text'
                                />
                            </td>
                            <td className="align-middle">
                            <select
                                style={{"WebkitAppearance":"none",fontSize:'10px',padding:'3.5px 1px'}} 
                                className='purchase_input border-0 w-100 text-center' value={data.unit||''}>
                                {unitList&&unitList.map((x,i)=>
                                <option key={i} value={x.value}>{x.text}</option>)}
                            </select>
                            </td>
                            <td className="align-middle">{data.cost||'0.00'}</td>
                            <td className="align-middle">{data.value||'0.00'}</td>
                            <td className="align-middle">{data.godown||'0.00'}</td>
                            <td className="align-middle">
                                <select className="add-less-btn"
                                value={data.qty_type||"add"}>
                                    <option value="add">Add</option>
                                    <option value="less">Less</option>
                                </select>
                            </td>
                            <td className="align-middle ps-0 text-start">
                            <div className='btn p-0 text-start' onClick={()=>handleEditTableItem(data)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M20.9524 3.04801C20.2814 2.37702 19.3713 2.00006 18.4224 2.00006C17.4734 2.00006 16.5634 2.37702 15.8924 3.04801L3.94036 15C3.53415 15.4062 3.24856 15.9172 3.11536 16.476L2.02036 21.078C1.99071 21.2027 1.99349 21.3328 2.02843 21.4561C2.06337 21.5794 2.12931 21.6916 2.21996 21.7822C2.31061 21.8727 2.42295 21.9385 2.54626 21.9734C2.66957 22.0082 2.79974 22.0108 2.92436 21.981L7.52536 20.885C8.08454 20.752 8.59584 20.4664 9.00236 20.06L20.9524 8.11C21.6233 7.439 22.0003 6.52894 22.0003 5.58C22.0003 4.63107 21.6233 3.72101 20.9524 3.05V3.04801ZM16.9524 4.108C17.1454 3.91496 17.3746 3.76183 17.6268 3.65736C17.879 3.55288 18.1494 3.49911 18.4224 3.49911C18.6954 3.49911 18.9657 3.55288 19.2179 3.65736C19.4701 3.76183 19.6993 3.91496 19.8924 4.108C20.0854 4.30105 20.2385 4.53022 20.343 4.78245C20.4475 5.03467 20.5012 5.305 20.5012 5.57801C20.5012 5.85101 20.4475 6.12134 20.343 6.37356C20.2385 6.62579 20.0854 6.85496 19.8924 7.04801L19.0004 7.939L16.0604 5.00001L16.9524 4.10901V4.108ZM15.0004 6.06201L17.9404 9L7.94036 19C7.73036 19.21 7.46636 19.357 7.17736 19.426L3.76136 20.24L4.57436 16.824C4.64336 16.534 4.79136 16.27 5.00136 16.06L15.0004 6.06001V6.06201Z" fill="#4E4E4E" stroke="#4E4E4E" strokeWidth="0.5"/>
                                </svg>
                            </div>  
                            </td>
                        </tr>
                    )
                    )
                    }
                    <AdjustTableHeight/>
                    <tr>
                        <th className="p-2">
                            <div onClick={handlePrev} className="btn stock-next-prev-btn me-2">{"< Previous"}</div>
                            <div onClick={handleNext} className="btn stock-next-prev-btn">{"Next >"}</div>
                        </th>
                        <th className="p-2 text-center align-middle">Total</th>
                        <th>
                            <div className="purchase-input-text drop shadows text-center">
                                {stockJAdd?.total_qty||''}
                            </div>
                        </th>
                        <th></th>
                        <th></th>
                        <th>
                            <div className="purchase-input-text drop shadows text-center">
                                {stockJAdd?.total_value||''}
                            </div>
                        </th>
                        <th colSpan={3}>
                            <div className="row">
                            <div onClick={handleClearAll} className="col-5 col-6 stock-jsave-btn btn mx-2">Clear</div>
                            <div onClick={handleSubmit} className="col-5 col-6 stock-jsave-btn btn">{edit?"Update":"Save"}</div>
                            </div>
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
            <Form.Group className='col-3 col-4 pe-4 ps-0 mx-0 d-flex align-items-start mt-3 pb-5'>
                <Form.Label className='col-3 purchase-input-label pb-1'>Narration</Form.Label>
                <Form.Control
                    onChange={handleChange}
                    required
                    name="narration"
                    value={stockJAdd.narration||""}
                    className='purchase-input-text me-2'
                    placeholder='Narration'
                    type='text'
                />
            </Form.Group>
    </div>
  )
}

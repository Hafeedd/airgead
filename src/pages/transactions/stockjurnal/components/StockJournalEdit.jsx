import { Form } from "react-bootstrap"
import searchIcon from "../../../../assets/icons/search.png"
import { useEffect, useState } from "react"

export const StockJournalEdit = (props) => {
    const {list,setShow,from,
        edit,setEdit,handleClearAll} = props

    const [tempStockJList, setTempStockJList] = useState([])
    const [search, setSearch] = useState('')
    const [date, setDate] = useState({
        start:null,
        end:null,
    })

    const handleEditClick = (data) =>{
        handleClearAll()
        setEdit(data)
        setShow(false)
    }

    useEffect(()=>{
        let tempList
        let filterList
        // if(tempStockJList?.length>0){
        //     filterList = tempStockJList
        // }else{
            filterList = list
        // }
        if(date.start && date.end){
        let startDate = new Date(date.start.slice(0,10))
        let endDate = new Date(date.end.slice(0,10))
            tempList = filterList?.filter(x=>{
                let dateOfItem = new Date(x.date)
                if(dateOfItem>=startDate && dateOfItem<=endDate){
                    return true
                }
            })
            setTempStockJList(tempList)
        }
        // else{
        //     setDate({end:null,start:null})
        // }
    },[date,])

    useEffect(()=>{
        setDate({start:'',end:''})
        let tempList
        let filterList
        // if(tempStockJList?.length>0){
        //     filterList = tempStockJList
        // }else{
            filterList = list
        // }
        if(list?.length>0){
             tempList = filterList?.filter(x=>{
                let a = 'code'
                if(from == 'acc') a = 'voucher_number'
                if(x?.[a]?.toLowerCase().toString()?.includes(search?.toLowerCase())){
                    return true
                }
            })
            setTempStockJList(tempList)
        }
        // else{
        //     setSearch('')
        // }
    },[search,])

  return (
    <div className="p-0">
        <div className="stockJ-edit rounded-top-2 py-2 ps-3">Journal Details</div>
        <div className="row mx-0 p-2 px-3">
            <Form.Group className='col-4 col-3 pe-4 ps-0 mx-0 d-flex align-items-start mt-1'>
                <Form.Label className='col-2 purchase-input-label align-middle'>To</Form.Label>
                <Form.Control
                    required
                    onChange={(e)=>setDate({...date,start:e.target.value})}
                    name="fk_supplier"
                    className='purchase-input-text me-2'
                    placeholder='Document number'
                    type='date'
                    value={date.start}
                    />
            </Form.Group>
            <Form.Group className='col-4 col-3 pe-4 ps-0 mx-0 d-flex align-items-start mt-1'>
                <Form.Label className='col-2 purchase-input-label align-middle'>From</Form.Label>
                <Form.Control
                    required
                    onChange={(e)=>setDate({...date,end:e.target.value})}
                    name="fk_supplier"
                    className='purchase-input-text me-2'
                    placeholder='Document number'
                    type='date'
                    value={date.end}
                    />
            </Form.Group>
        </div>
        <div className="p-2 px-3 row mx-0">
            <div className="bg-dark py-2 ps-4 rounded-top-1">
                <div className='item_seach_bar_cont rounded-2 col-3'>
                    <img src={searchIcon} className='search_img me-3 ms-2 py-2' />
                    <input
                        onChange={(e)=>setSearch(e.target.value)}
                        value={search}
                        className='item_search_bar rounded-2 border-0 py-1'
                        placeholder='Search'
                        type='text'
                    />
                </div>
            </div>
        <div className="stockJ-edit-table-cont px-0">
            <table className="stockJ-edit-table table">
                <thead>
                    <th width="150" className="ps-4">Date</th>
                    <th width="150" className="ps-4">Doc No.</th>
                    {!from&&<th className="text-center">Items</th>}
                    <th className="text-center">Narration</th>
                    <th width="60" className="text-end pe-4"></th>
                </thead>
                <tbody>
                    {tempStockJList?.length>0&&
                    tempStockJList?.map((data,i)=>
                    (<tr key={i?i:0}>
                        <td width="150" className="text-start ps-2">{!from?data?.date?.slice(0,10):data?.created_at.slice(0,10)}</td>
                        <td width="150" className="text-start ps-3">{from?data?.voucher_number:data?.code}</td>
                        {!from&&<td className="text-center">{data?.total_items}</td>}
                        <td className="text-center">{data?.narration}</td>
                        <td className="ps-2">
                            <div className='btn p-0' onClick={()=>handleEditClick(data)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M20.9524 3.04801C20.2814 2.37702 19.3713 2.00006 18.4224 2.00006C17.4734 2.00006 16.5634 2.37702 15.8924 3.04801L3.94036 15C3.53415 15.4062 3.24856 15.9172 3.11536 16.476L2.02036 21.078C1.99071 21.2027 1.99349 21.3328 2.02843 21.4561C2.06337 21.5794 2.12931 21.6916 2.21996 21.7822C2.31061 21.8727 2.42295 21.9385 2.54626 21.9734C2.66957 22.0082 2.79974 22.0108 2.92436 21.981L7.52536 20.885C8.08454 20.752 8.59584 20.4664 9.00236 20.06L20.9524 8.11C21.6233 7.439 22.0003 6.52894 22.0003 5.58C22.0003 4.63107 21.6233 3.72101 20.9524 3.05V3.04801ZM16.9524 4.108C17.1454 3.91496 17.3746 3.76183 17.6268 3.65736C17.879 3.55288 18.1494 3.49911 18.4224 3.49911C18.6954 3.49911 18.9657 3.55288 19.2179 3.65736C19.4701 3.76183 19.6993 3.91496 19.8924 4.108C20.0854 4.30105 20.2385 4.53022 20.343 4.78245C20.4475 5.03467 20.5012 5.305 20.5012 5.57801C20.5012 5.85101 20.4475 6.12134 20.343 6.37356C20.2385 6.62579 20.0854 6.85496 19.8924 7.04801L19.0004 7.939L16.0604 5.00001L16.9524 4.10901V4.108ZM15.0004 6.06201L17.9404 9L7.94036 19C7.73036 19.21 7.46636 19.357 7.17736 19.426L3.76136 20.24L4.57436 16.824C4.64336 16.534 4.79136 16.27 5.00136 16.06L15.0004 6.06001V6.06201Z" fill="#4E4E4E" stroke="#4E4E4E" strokeWidth="0.5"/>
                                </svg>
                            </div>    
                        </td>
                    </tr>))}
                </tbody>
            </table>
        </div>
        <span className="col-10"/><div onClick={()=>setShow(false)} 
        className="btn col-2 btn-dark py-1 px-5">Close</div>
        </div>
    </div>
  )
}

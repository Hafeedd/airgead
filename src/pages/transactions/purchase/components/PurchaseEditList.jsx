import React from 'react'
import search from "../../../../assets/icons/search.png"

const PurchaseEditList = (props) => {
  const {purchaseList,setPurchaseList,from,
    closeEditModal,setEdit,edit,getData} = props
  
  const handleSearch = async (e) =>{
    let tempData
    if(purchaseList){
      let value = e.target.value
        if(value != ""){
        const tempList = await getData()
      if(tempList.length > 0){
        tempData = tempList.filter(x=>{
          let searchInString = `${x.documents_no+' '+x.bill_date+' '+x.supplier_name+' '+x.total_amount}` 
          let search = searchInString?.includes(value)
          if(search){
            return true
          }
        })
        setPurchaseList(tempData)
      }
    }else{
      getData()
    }
    }
  }

  const handleEditClick = (data) => {
    setEdit(data)
    closeEditModal(false)
  }

  return (
    <div style={{height:"100%"}} className='p-0 row mx-0'>
      <table className="table table-hover purchase-item-table mb-0" style={{height:"0%"}}>
        <thead>
          <tr>
            <th className='text-start ps-3 start'>Doc Number</th>
            <th>Date</th>
            <th>{from==='sales'?"Customer Name":"Supplier Name"}</th>
            <th style={{borderRight:'0px'}}>NET Amount</th>
            <th style={{borderRight:'0px', width:"23%"}} className='ps-1 pe-0'>
                <div className='item_seach_bar_cont rounded-2 px-0 pe-1 mx-0' style={{height: "2.0625rem",width:"fit-content"}}>
                    <img src={search} className='search_img ms-3 py-2'/>
                    <input 
                        className='item_search_bar rounded-2 border-0 py-1 px-1' 
                        style={{height: "2rem",}}
                        placeholder='Search' 
                        type='text'
                        onChange={handleSearch}
                    />
                </div>
            </th>
            <th style={{borderRight:'0px'}} className='end'>
                <div className="btn btn-sm btn-dark filter-btn px-0">
                    Filter Here
                </div>
            </th>
          </tr>
        </thead>
        <tbody className='purchase-item-body'>
          {purchaseList?.length>0 ?
          purchaseList?.map((data,i)=>(
          <tr key={i}>
            <td className='text-start ps-3'>{data?.documents_no}</td>
            <td className=''>{new Date(data?.created_at)?.toISOString()
            .slice(0,10).split('-').reverse().join('-')}</td>
            <td className=''>{from==='sales'?data?.customer_name:data?.supplier_name}</td>
            <td className=''>{data?.total_amount}</td>
            <td className=''></td>
            <td className=''>
              <div className='btn p-0' onClick={()=>handleEditClick(data)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M20.9524 3.04801C20.2814 2.37702 19.3713 2.00006 18.4224 2.00006C17.4734 2.00006 16.5634 2.37702 15.8924 3.04801L3.94036 15C3.53415 15.4062 3.24856 15.9172 3.11536 16.476L2.02036 21.078C1.99071 21.2027 1.99349 21.3328 2.02843 21.4561C2.06337 21.5794 2.12931 21.6916 2.21996 21.7822C2.31061 21.8727 2.42295 21.9385 2.54626 21.9734C2.66957 22.0082 2.79974 22.0108 2.92436 21.981L7.52536 20.885C8.08454 20.752 8.59584 20.4664 9.00236 20.06L20.9524 8.11C21.6233 7.439 22.0003 6.52894 22.0003 5.58C22.0003 4.63107 21.6233 3.72101 20.9524 3.05V3.04801ZM16.9524 4.108C17.1454 3.91496 17.3746 3.76183 17.6268 3.65736C17.879 3.55288 18.1494 3.49911 18.4224 3.49911C18.6954 3.49911 18.9657 3.55288 19.2179 3.65736C19.4701 3.76183 19.6993 3.91496 19.8924 4.108C20.0854 4.30105 20.2385 4.53022 20.343 4.78245C20.4475 5.03467 20.5012 5.305 20.5012 5.57801C20.5012 5.85101 20.4475 6.12134 20.343 6.37356C20.2385 6.62579 20.0854 6.85496 19.8924 7.04801L19.0004 7.939L16.0604 5.00001L16.9524 4.10901V4.108ZM15.0004 6.06201L17.9404 9L7.94036 19C7.73036 19.21 7.46636 19.357 7.17736 19.426L3.76136 20.24L4.57436 16.824C4.64336 16.534 4.79136 16.27 5.00136 16.06L15.0004 6.06001V6.06201Z" fill="#4E4E4E" stroke="#4E4E4E" strokeWidth="0.5"/>
                </svg>
              </div>
            </td>
          </tr>
          ))
          :<tr>
            <td colSpan={6} className='text-center py-3 fs-4 ps-3'>No Items</td>
          </tr>
          }
        </tbody>
      </table>
      <div className="col-12 row pe-3 my-0 mt-3 w-100 justify-content-end position-relative pb-2 mx-0 align-items-end"
      style={{MinHeight:"inherit"}}>
          <div className='mx-0 px-1 pe-0 col-1 col-2 pb-0 position-sticky' style={{bottom:"5px"}}>
            <button onClick={()=>closeEditModal(false)} className='btn btn-sm btn-dark w-100'>close</button>
          </div>
      </div>
    </div>
  )
}

export default PurchaseEditList

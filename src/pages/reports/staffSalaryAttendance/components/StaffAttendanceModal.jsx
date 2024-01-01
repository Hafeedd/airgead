import React, { useEffect, useState } from 'react'
import searchIcon from "../../../../assets/icons/search.png";
const StaffAttendanceModal = ({show}) => {
    let [arr,setArr] =useState()
    useEffect(()=>{
        let afterNoonArr = show?.leave?.After_Noon?.entries||[]
        let beforeNoonArr = show?.leave?.Before_Noon?.entries||[]
        let fullDayArr = show?.leave?.Full_Day?.entries||[]
        setArr([...afterNoonArr,
            ...beforeNoonArr,
            ...fullDayArr].sort((a,b)=>a.leave_date>b.leave_date))    
    },[show,])

    useEffect(()=>{
        if(arr?.length > 0)
            setSearchedArrayList(arr)
    },[arr])

    const [searchedArrayList,setSearchedArrayList]=useState([])

    const handleSearch = async (e) => {
        try {
          let tempData,
            tempList = arr;
          if (arr) {
            let value = e.target.value.toLocaleLowerCase();
            if (value != "") {
              if (arr.length > 0) {
                tempData = tempList?.filter((x) => {
                  let searchInString = `${
                    x.leave_type?.toLocaleLowerCase() +
                    " " +
                    x.leave_date?.toLocaleLowerCase()
                  }`;
                  let search = searchInString?.includes(value);
                  if (search) {
                    return true;
                  }
                });
                setSearchedArrayList(tempData);
              }
            } else {
                setSearchedArrayList(arr);
            }
          }
        } catch {}
      };

  return (
    <div>
        <div className='rounded-end-2 rounded-bottom-0 rounded-top col-12 d-flex border-bottom' style={{backgroundColor:'black'}} >
            <div className='col-7'>
            <div className='p-2 px-3 text-light  rounded-top' style={{backgroundColor:'black'}}> STAFF ATTENDANCE
            <br/>
            Name : {show?.staff_name}</div>
            </div>
            <div className='col-5 '>
            <div className='d-flex justify-content-end'>
                <div className="p-2 mt-2 stock-ledger-search d-flex align-items-center me-1">
                    <div className="item_seach_bar_cont rounded-2 col-12">
                        <img src={searchIcon} className="search_img me-3 ms-2 py-2" />
                        <input
                            onChange={handleSearch}
                            className="item_search_bar rounded-2 border-0 py-1"
                            placeholder="Search"
                            type="text"
                        />
                    </div>
                </div>
            </div>
            </div>
          
        </div>
        <table className='StaffTables w-100'>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Leave Type</th>
                    <th>Narration</th>
                </tr>
            </thead>
            <tbody>
                {                
                searchedArrayList?.length>0&&
                searchedArrayList?.map((data, i) =>{
                    return(
                    <tr key={i}>
                    <td>{data?.leave_date}</td>
                    <td>{data?.leave_type}</td>
                    <td>{data?.narration||'Nil'}</td>
                    </tr>
                )}
                )}
            </tbody>
        </table>
    </div>
  )
}

export default StaffAttendanceModal
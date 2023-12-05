import React, { useEffect, useState } from 'react'
import { ItemHistoryEntry } from './components/ItemHistoryEntry'
import './itemHistory.css'
import { ItemHistoryTable } from './components/ItemHistoryTable'
import useItemServices from '../../../services/master/itemServices'

export const ItemHistory = () => {
    const [itemId, setItemId] = useState(null)
    const [itemNameList, setItemNameList] = useState([])
    const [params, setParams] = useState({
        from_date: new Date().toISOString().slice(0, 10),
        to_date: new Date().toISOString().slice(0, 10),
    })

    const { getItemNameList } = useItemServices();

    useEffect(()=>{
        getData()
    },[])

    const getData = async () =>{
        try{
            const response = await getItemNameList()
            if (response.success) {
                let tempList = [];
                response.data.map((item) => {
                  let a = {
                    ...item,
                    value: item.id,
                    text: item.name,
                    name: item.name,
                    description: item.code,
                    unit: item.fk_unit,
                  };
                  tempList.push(a);
                });
                setItemNameList(tempList);
              }
        }catch(err){}
    }

  return (
    <div className="item_add">
      <div className="itemList_header row mx-0">
        <div className="page_head ps-4 d-flex justify-content-between">
          <div>
            <div className="fw-600 fs-5">Item History</div>
            <div className="page_head_items mb-2 mt-2">
              <div
                /* onClick={()=>navigate("/stock-reports")}  */ className={`page_head_customer active`}
              >
                Details
              </div>
            </div>
          </div>
          <div className="d-flex px-0 align-items-center customer-add-btn">
            {/* <div onClick={()=>{navigate("/customer-add");setToEdit(false)}} className="btn btn-primary add-btn px-0">+ &nbsp; Add Customer</div> */}
          </div>
        </div>
      </div>
      <div className="p-3">
        <div className="p-2 bg-light rounded-1 px-3">
            <ItemHistoryEntry {...{params,setParams, itemId, setItemId, itemNameList}}/>
            <ItemHistoryTable {...{params,setParams, itemId}}/>
        </div>
      </div>
    </div>
  )
}

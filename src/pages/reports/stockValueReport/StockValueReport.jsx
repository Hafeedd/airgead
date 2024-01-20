import React, { useEffect, useState } from 'react'
import StockValueEntry from './components/StockValueEntry'
import './stockValueReport.css'
import StockValueTable from './components/StockValueTable'
import { useReportsServices } from '../../../services/reports/reports'
import { Item } from 'semantic-ui-react'
const StockValueReport = () => {

  const { getStockValueReport } = useReportsServices()
  const [stockValueList, setStockValueList] = useState([])
  const [rateType, setRateType] = useState()
  const [stockType, setStockType] = useState("ALL")
  const [params, setParams] = useState({})

  useEffect(() => {
    getData()

  }, [params,])

  const getData = async () => {
    try {
      const tempParams = { ...params, to_date: params.to_date?.split('-').reverse().join('-') }
      const response = await getStockValueReport(tempParams)
      if (response.success) {
        setStockValueList([...response.data])
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  const selectionChange = (e) => {
    
  }


  return (
    <div className="item_add">
      <div className="itemList_header row mx-0">
        <div className="page_head ps-4 d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <div>
              <div className="fw-600 fs-5">Stock Value Report</div>
              <div className="page_head_items mb-2 mt-2">
                <div className={`page_head_customer active`}>Stock Value Report</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-3">
        <div className=" col-12 p-2 px-3 rounded-1 w-100 bg-light pb-1">
          <div className="w-100 mb-3">
            <StockValueEntry {...{ params, setParams, selectionChange, rateType, setRateType, stockType, setStockType}} />
            <StockValueTable {...{ setStockValueList, stockValueList, rateType, setRateType,params,stockType }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default StockValueReport
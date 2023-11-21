import React, { useEffect, useState } from 'react'
import SupplierOutstandingDetails from './components/SupplierOutstandingDetails'
import { Modal } from 'react-bootstrap'
import { useReportsServices } from '../../../services/reports/reports'
import FilterAccounts from '../customerOutstanding/components/FilterAccounts'
import ColumnSettings from '../customerOutstanding/components/ColumnSettings'
const SupplierOutstanding = () => {
  const [supOutstanding, setSupOutstanding] = useState([])
  const [show, setShow] = useState(false)
  const [colshow, setColShow] = useState(false)
  const [paramsToReport, setParamsToReport] = useState({
    from_date: (new Date().toISOString().slice(0, 10)),
    to_date: (new Date().toISOString().slice(0, 10)),
    type: "SUPPLIER", payment_type: null
  })

  const { getOutstanding } = useReportsServices()

  const getData = async () => {
    try {
      const response = await getOutstanding(paramsToReport)
      if (response?.success) {
        setSupOutstanding(response.data)
      }
    } catch (err) {
      console.log(err)
    }
  }


  const [columnVisibility, setColumnVisibility] = useState({
    code: true,
    customer: true,
    address: true,
    mobile: true,
    opbal: true,
    debit: true,
    credit: true,
    clbal: true,
  })

  const handleToggleCol = (column) => {
    setColumnVisibility((visible) => ({
      ...visible,
      [column]: !visible[column],
    }));
  };


  useEffect(() => {
    getData()
  }, [paramsToReport,])

  return (
    <div className="item_add">
      <div className="itemList_header row mx-0">
        <div className="page_head ps-4 d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <div>
              <div className="fw-600 fs-5">Supplier Outstanding</div>
              <div className="page_head_items mb-2 mt-2">
                <div className={`page_head_customer active`}>
                  Outstanding Balance
                </div>
              </div>
            </div>

          </div>
          <div className='d-flex align-items-center h-100 me-2'>
            <div className="p-2 me-2 choose-acc-btn rounded-2 text-light cursor" onClick={() => setShow(true)}>Filter Account</div>
            <div className="p-2 choose-acc-btn rounded-2 text-light cursor" onClick={() => setColShow(true)}>Column Settings</div>
          </div>

        </div>
      </div>
      <div className="p-3 py-0">
        <div className="stock-jdetails-cont col-12 p-1 pt-0 ps-2 rounded-1 w-100 bg-light h-100 pe-2">
          <div className="row mt-3 mx-0">
            <div className="w-100 mb-3">
              <SupplierOutstandingDetails {
                ...{ supOutstanding, setSupOutstanding, paramsToReport, setParamsToReport, columnVisibility }
              } />
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} centered size='md' onHide={() => setShow(false)}>
        <FilterAccounts />
      </Modal>
      <Modal show={colshow} centered size='md' onHide={() => setColShow(false)}>
        <ColumnSettings handleToggleCol={handleToggleCol} columnVisibility={columnVisibility} />
      </Modal>
    </div>
  )
}

export default SupplierOutstanding
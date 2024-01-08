import React from 'react'
import { useNavigate } from 'react-router';
import './productionreport.css'
import ProductionReportEntry from './components/ProductionReportEntry';
import ProductionRegisterTable from './components/ProductionRegisterTable';

const ProductionReport = () => {

    const navigate = useNavigate()
  return (
    <div className="item_add">
      <div className="itemList_header row mx-0">
        <div className="page_head ps-4 d-flex justify-content-between">
          <div>
            <div className="fs-5 fw-600">Production Register</div>
            <div className="page_head_items mb-2 mt-2">
              <div
                // onClick={() => {
                //   navigate("/purchase-book");
                // }}
                className={`page_head_item active`}
              >
                Prdct.Register
              </div>
              {/* <div
                onClick={() => {
                  navigate("/purchase-register");
                }}
                className={`page_head_item ${
                  location.pathname === "/purchase-register" && "active"
                }`}
              >
                Purchase Register
              </div> */}
            </div>
          </div>

          <div className="d-flex align-items-center h-100 me-2"></div>
        </div>
      </div>
      <div className="p-3 mt-1">
        <div className="p-2 bg-light rounded-1">
          <ProductionReportEntry />
          <ProductionRegisterTable />
          <div className="row mt-2">
            <div className="w-100 d-flex justify-content-end mb-2 ">
              <div
                // onClick={() => navigate(-1)}
                className="rounded col-1 col-2 py-1 me-2 text-center pur-s-btn"
              >
                Show
              </div>
              <div
                // onClick={() => navigate(-1)}
                className="rounded col-1 col-2 py-1 me-2 text-center pur-p-btn"
              >
                Print
              </div>
              <div
                // onClick={() => navigate(-1)}
                className="border border-dark rounded col-1 col-2 py-1 me-2 text-center"
              >
                Exit
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductionReport 
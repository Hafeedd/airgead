import React, { useEffect, useState } from "react";
import { TaxDetails } from "./compontents/TaxDetails";
import { TaxTable } from "./compontents/TaxTable";
import "./taxReport.css";
import { useReportsServices } from "../../../services/reports/reports";

export const TaxReport = () => {
  const [reportList, setReportList] = useState([]);
  const [params, setParams] = useState({
    from_date: new Date().toISOString().slice(0, 8) + "01",
    to_date: new Date().toISOString().slice(0, 10),
    category: "purchase",
    report_type: "item_wise",
  });

  const { getTaxReport } = useReportsServices();

  useEffect(() => {
    getData();
  }, [params,]);

  const getData = async () => {
    try {
      const response = await getTaxReport(params);
      if (response.success) {
        setReportList(response.success);
      }
    } catch (err) {}
  };

  return (
    <div className="item_add">
      <div className="itemList_header row mx-0">
        <div className="page_head ps-4 d-flex justify-content-between">
          <div>
            <div className="fw-600 fs-5">Tax Report</div>
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
        <div className="p-3 pt-2 bg-light rounded-1">
          <TaxDetails {...{ params, setParams }} />
          <TaxTable {...{params}}/>
        </div>
      </div>
    </div>
  );
};

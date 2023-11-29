import React, { useEffect, useState } from "react";
import SupplierOutstandingDetails from "./components/SupplierOutstandingDetails";
import { Modal } from "react-bootstrap";
import { useReportsServices } from "../../../services/reports/reports";
import FilterAccounts from "../customerOutstanding/components/FilterAccounts";
import ColumnSettings from "../customerOutstanding/components/ColumnSettings";
import { useLocation } from "react-router";
const SupplierOutstanding = () => {
  const [supOutstanding, setSupOutstanding] = useState([]);
  const [staffOutstanding, setStaffOutstanding] = useState([]);
  const [show, setShow] = useState(false);
  const [colshow, setColShow] = useState(false);

  const location = useLocation().pathname;

  const [paramsToReport, setParamsToReport] = useState({
    from_date: new Date().toISOString().slice(0, 10),
    to_date: new Date().toISOString().slice(0, 10),
    payment_type: null,
  });

  const { getOutstanding } = useReportsServices();

  const getData = async () => {
    try {
      let tempType = location === "/staff-outstandings" ? "STAFF" : "SUPPLIER";
      const response = await getOutstanding({
        ...paramsToReport,
        type: tempType,
      });
      if (response?.success) {
        if (tempType === "STAFF") setStaffOutstanding(response.data);
        else setSupOutstanding(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [columnVisibility, setColumnVisibility] = useState({
    code: true,
    customer: true,
    address: true,
    mobile: true,
    opbal: true,
    debit: true,
    credit: true,
    clbal: true,
  });

  const handleToggleCol = (column) => {
    setColumnVisibility((visible) => ({
      ...visible,
      [column]: !visible[column],
    }));
  };

  useEffect(() => {
    getData();
  }, [paramsToReport, location]);

  return (
    <div className="item_add">
      <div className="itemList_header row mx-0">
        <div className="page_head ps-4 d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <div>
              {location === "/supplier-outstandings" ? (
                <div className="fw-600 fs-5">Supplier Outstanding</div>
              ) : (
                <div className="fw-600 fs-5">Staff Outstanding</div>
              )}

              <div className="page_head_items mb-2 mt-2">
                <div className={`page_head_customer active`}>
                  Outstanding Balance
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center h-100 me-2">
            <div
              className="p-2 me-2 choose-acc-btn rounded-2 text-light cursor"
              onClick={() => setShow(true)}
            >
              Filter Account
            </div>
            <div
              className="p-2 choose-acc-btn rounded-2 text-light cursor"
              onClick={() => setColShow(true)}
            >
              Column Settings
            </div>
          </div>
        </div>
      </div>
      <div className="p-3">
        <div className=" col-12 p-2 px-3 rounded-1 w-100 bg-light">
          <div className="w-100 mb-3">
            <SupplierOutstandingDetails
              {...{
                supOutstanding,
                setSupOutstanding,
                paramsToReport,
                setParamsToReport,
                columnVisibility,
                staffOutstanding,
                setStaffOutstanding,
                location,
              }}
            />
          </div>
        </div>
      </div>
      <Modal show={show} centered size="md" onHide={() => setShow(false)}>
        <FilterAccounts />
      </Modal>
      <Modal show={colshow} centered size="md" onHide={() => setColShow(false)}>
        <ColumnSettings
          handleToggleCol={handleToggleCol}
          columnVisibility={columnVisibility}
        />
      </Modal>
    </div>
  );
};

export default SupplierOutstanding;

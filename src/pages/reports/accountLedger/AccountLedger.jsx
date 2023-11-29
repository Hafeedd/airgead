import "./accountLedger.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useReportsServices } from "../../../services/reports/reports";
import { ReportDetails } from "../stockLedger/components/ReportDetails";
import { AccountsTable } from "./components/AccountsTable";
import { Modal } from "react-bootstrap";
import { AccountChooseTable } from "./components/AccountChooseTable";
import useAccountServices from "../../../services/master/accountServices";

export const AccountLedger = () => {
  const [accList, setAccList] = useState([]);
  const [reportList, setReportList] = useState([])
  const [accChooseList, setaccChooseList] = useState([]);
  const [selectAllAcc, setSelectAllAcc] = useState(false)
  const [chooseAccountModalShow, setChooseAccountModalShow] = useState(false);

  const [paramsToReport, setParamsToReport] = useState({
    from_date: new Date().toISOString().slice(0, 8) + "01",
    to_date: new Date().toISOString().slice(0, 10),
  });

  const { getAccLedger } = useReportsServices();
  const { getAccountList } = useAccountServices();

  useEffect(() => {
    getData();
  }, [paramsToReport]);

  const getData = async () => {
    try {
      const response2 = await getAccountList()
        if(response2.success){
          setAccList(response2.data)
        }
        let code = {code:[response2.data[0].code]}
        if(accChooseList?.length>0){
           code = {code:accChooseList}
        }
        if(selectAllAcc){
          code = {code:[]}
        }
      const response = await getAccLedger(paramsToReport,code);
        if (response.success) {
          setReportList([...response?.data]);
        }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAccountChooseSearch = () =>{
    getData()
    setChooseAccountModalShow(false)
    setAccList([])
  }

  const handleSelectAll = () => {
    const staffListLength = accList.length;
    if (accChooseList.length < 0 || accChooseList.length !== staffListLength) {
      setaccChooseList(accList.map((x) => x.code));
      setSelectAllAcc(true)
    } else {
      setSelectAllAcc(false)
      setaccChooseList([]);
    }
  };

  const handleAccChoose = (code, e) => {
    let tempList = accChooseList;
    let check = tempList.findIndex((x) => x == code);
    if (check >= 0) {
      setSelectAllAcc(false)
      tempList.splice(check, 1);
    } else {
      tempList.push(code);
    }
    setaccChooseList([...tempList]);
  };

  const navigate = useNavigate();

  return (
    <div className="item_add">
      <div className="itemList_header row mx-0">
        <div className="page_head ps-4 d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <div>
              <div className="fw-600 fs-5">Account Ledger</div>
              <div className="page_head_items mb-2 mt-2">
                <div
                  onClick={() => navigate("/stock-reports")}
                  className={`page_head_customer active`}
                >
                  Details
                </div>
              </div>
            </div>
            <div onClick={()=>setChooseAccountModalShow(true)}
            className="choose-acc-btn py-2 px-2 rounded-2 text-light ms-5 cursor">
              Choose Account</div>
          </div>
          <div className="d-flex px-0 align-items-center customer-add-btn">
            {/* <div onClick={()=>{navigate("/customer-add");setToEdit(false)}} className="btn btn-primary add-btn px-0">+ &nbsp; Add Customer</div> */}
          </div>
        </div>
      </div>
      <div className="p-3">
        <div className="stock-jdetails-cont col-12 p-1 ps-3 rounded-1 w-100 bg-light h-100 pe-4">
          <ReportDetails
            {...{
              paramsToReport,
              setParamsToReport,
            }}
          />
          <AccountsTable
            list = {reportList}
          />
          <div className="row mt-3">
            <div className="w-100 d-flex justify-content-end mb-3">
              <div className="btn btn-dark col-1 col-2 py-0">Exit</div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={chooseAccountModalShow}
        centered
        size="md"
        contentClassName="p-0 m-0"
        onHide={() => setChooseAccountModalShow(false)}
      >
        <Modal.Body className="p-0 m-0">
          <AccountChooseTable {...{ setChooseAccountModalShow,accList,
            handleAccChoose,handleSelectAll,accChooseList,
            handleAccountChooseSearch, }} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

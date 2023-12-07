import React, { useEffect, useState } from 'react'
import BillWiseLedgerEntry from './components/BillWiseLedgerEntry';
import BillWiseLedgerTable from './components/BillWiseLedgerTable';
import { useReportsServices } from '../../../services/reports/reports';
import useAccountServices from '../../../services/master/accountServices';

const BillWiseLedger = () => {

  const [billwiseledgerList, setBillWiseLedgerList] = useState({})
  const [accountList, setAccountList] = useState([])
  const [accountName, setAccountName] = useState()
  const [accountCode, setAccountCode] = useState()
  const [params, setParams] = useState({
    from_date: new Date().toISOString().slice(0, 10),
    to_date: new Date().toISOString().slice(0, 10),
    account_code: "10002",
  });

  const {getBillWiseLedger} = useReportsServices()
  const {getAccountList} = useAccountServices()

  useEffect(()=>{
    if(accountCode)
    getData()
  },[params,accountCode])

  useEffect(()=>{
    getAccount()
  },[])

  const getAccount = async () =>{
    try{
      const response1 = await getAccountList();
      if (response1.success) {
        let tempList = [];
        response1.data.map((item) => {
          let a;
          if (item.name && item.code) {
            a = {
              key: item.id,
              value: item.code,
              text: item.name,
              description: item.code,
            };
            tempList.push(a);
          }
        });
        setAccountCode(tempList[0].value);
        setAccountList(tempList);
      }
    }catch(err){}
  }



  const getData = async()=>{
    try{
      let tempParams = {
        ...params,account_code:accountCode
      }
      const response = await getBillWiseLedger(tempParams);
      if(response.success){
        setBillWiseLedgerList(response.data)
      }
    }catch(err){
      console.log(err)
    }
  }

  console.log(billwiseledgerList)
  console.log(billwiseledgerList?.ledger_data)


  
  return (
    <div className="item_add">
      <div className="itemList_header row mx-0">
        <div className="page_head ps-4 d-flex justify-content-between">
          <div>
            <div className="fw-600 fs-5">Bill Wise Ledger</div>
            <div className="page_head_items mb-2 mt-2">
              <div className={`page_head_customer active`}>
                Bill Wise Ledger
              </div>
            </div>
          </div>
          <div className="d-flex px-0 align-items-center customer-add-btn">
            <div className="p-2 choose-acc-btn rounded-2 text-light cursor ">
              Column Settings
            </div>
          </div>
        </div>
      </div>
      <div className="p-3">
        <div className="p-2 bg-light rounded-1 px-3">
          <BillWiseLedgerEntry
            {...{
              params,
              setParams,
              accountList,
              accountCode,
              setAccountCode,
              setAccountName,
            }}
          />
          <BillWiseLedgerTable
            {...{
              billwiseledgerList,
              setBillWiseLedgerList,
              params,
              setParams,
              accountList,
              setAccountList,
              accountCode,
              setAccountCode,
              accountName,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default BillWiseLedger
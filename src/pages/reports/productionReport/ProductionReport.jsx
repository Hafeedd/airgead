import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router';
import './productionreport.css'
import ProductionReportEntry from './components/ProductionReportEntry';
import ProductionRegisterTable from './components/ProductionRegisterTable';
import { useReportsServices } from '../../../services/reports/reports';
import useAccountServices from "../../../services/master/accountServices";
import useItemServices from '../../../services/master/itemServices';

const ProductionReport = () => {
  const [prodDetailData,setProdDetailData]=useState([])
  const [paramsToReport,setParamsToReport] = useState({
    from_date:(new Date().toISOString().slice(0,10)),
    to_date:(new Date().toISOString().slice(0,10)),
  })
  const [accDetails, setAccDetails] = useState();
  const [filteredProductList,setFilteredProductList] = useState([])
  const [searchItem,setSearchItem] =useState('')
  const [searchType,setSearchType] = useState('')
  const [items, setItems] = useState();
  const [types, setTypes] = useState();
  const {getProductionRegister}=useReportsServices()
  const { getAccountList } = useAccountServices();
  const { getItemList, getProperty } = useItemServices();

  useEffect(()=>{
    searchedProdDetails()
  },[paramsToReport,searchItem,searchType,prodDetailData])
  
  useEffect(() => {
    getProductionData();
    getAccountDetails();
    getCompleteItems();
    getCompletePtypes();
  }, [paramsToReport]);

 

  const getCompleteItems = async()=>{
    try{
      const response = await getItemList();
      if (response.success){
        let tempList = [];
        response?.data?.map((item) => {
          let a = {
            text: item.name,
            value: item.id,
          };
          tempList.push(a);
        });
        setItems(tempList)
      }
    }catch(err){
      console.log(err)
    }
  }

  const getCompletePtypes = async()=>{
    try{
      const response = await getProperty();
      if (response.success){
        let tempList = [];
        response?.data?.map((item) => {
          if (item.property_type == 'composition_type') {
            let a = {
              text: item.property_value,
              value: item.id,
            };
            tempList.push(a);
          }
        });
        setTypes(tempList)
      }
    }catch(err){
      console.log(err)
    }
  }
  // const location = useLocation();
  // const navigate = useNavigate()
  const getAccountDetails = async () => {
    try{
        const response = await getAccountList();
        let tempList = [];
        if (response?.success) {
          response?.data?.map((item) => {
            let a;
            if (item.name && item.code) {
              // && item.bank_account === true
              a = {
                value: item.id,
                text: item.name,
              };
              tempList.push(a);
            }
          });
          setAccDetails(tempList);
        }
      }catch(err){
          console.log(err)
        }
      }
  
  const getProductionData=async()=>{
    try{
      const response=await getProductionRegister(paramsToReport)
      if (response?.success){
        setProdDetailData(response.data)
      }
    }catch(err){
      console.log(err);
    }
  }

const searchedProdDetails = () => {
  let tempList = prodDetailData;
  
  if (searchItem !== '') {
      tempList = tempList.filter(product => {
          return product.produced_items.some(item => {
              return item.fk_item == searchItem;
          });
      });
  }

  if (searchType !== '') {
      tempList = tempList.filter(product => {
          return product.produced_items.some(item => {
              return item.fk_type == searchType;
          });
      });
  }
  
  setFilteredProductList(tempList);
};
console.log(filteredProductList,'filterd')
console.log(prodDetailData,'complete')

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
                Product Register
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
          <ProductionReportEntry 
          {...{
            paramsToReport,
            setParamsToReport,
            items,
            types,
            searchItem,
            setSearchItem,
            searchType,
            setSearchType,
          }} />

          <ProductionRegisterTable 
          {...{
            filteredProductList,
            accDetails,
            searchItem,
            searchType
          }} />
          <div className="row mt-2">
            <div className="w-100 d-flex justify-content-end mb-2 ">
              {/* <div
                // onClick={() => navigate(-1)}
                className="rounded col-1 col-2 py-1 me-2 text-center pur-s-btn"
              >
                Show
              </div> */}
              <div
                // onClick={() => navigate(-1)}
                className="rounded col-1 col-2 py-1 me-2 text-center pur-p-btn"
              >
                Print
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductionReport 
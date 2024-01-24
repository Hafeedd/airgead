import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import MaterialCompositionOfProduct from "./components/MaterialCompositionOfProduct";
import MaterialCompositionList from "./components/MaterialCompositionList";
import "./MaterialComposition.css"
import useItemServices from "../../../services/master/itemServices";
import useAccountServices from "../../../services/master/accountServices";
import useProductionServices from "../../../services/master/productionSerivices";

const MaterialComposition = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {getItemList,getProperty} =useItemServices();
  const { getAccountList } = useAccountServices();
  const [allItem,setAllItem] =useState([]);
  const [allRaw,setAllRaw] = useState([]);
  const [typeList,setTypeList] = useState([])
  const [unitList,setUnitList]=useState([])
  const [bankAccList,setBankAccList]=useState([]);
  const [materialList,setMaterialList]=useState()
  const [editComposition,setEditComposition] = useState(false);

  const allItemProducts = async()=>{
    const response= await getItemList()
    //console.log("items :",response.data)
    let data=response.data.filter(property => property.types === 'PRODUCT')
    let tempList = [];
    data.map((item) => {
      let a = {
        ...item,
        key:item.types,
        text: item.name,
        value:item.id,
      };
      tempList.push(a);
    });
    setAllItem(tempList)
  }

  const allRawMaterials = async()=>{
    const response= await getItemList()
    //console.log("items :",response.data)
    let data=response.data.filter(property => property.types === 'RAW_MATERIAL')
    let tempList = [];
    data.map((item) => {
      let a = {
        ...item,
        key:item.types,
        text: item.name,
        value:item.id,
      };
      tempList.push(a);
    });
    setAllRaw(tempList)
  }
  const allPropertiesTypes = async()=>{
    const response= await getProperty()
    // console.log("properties :",response.data.filter(property => property.property_type === 'types'))
    let data=response.data.filter(property => property.property_type === 'composition_type')
    let tempList = [];
    data.map((item) => {
      let a = {
        ...item,
        key:item.property_type,
        text: item.property_value,
        value:item.id,
      };
      tempList.push(a);
    });
    setTypeList(tempList);
  }

  const allPropertiesUnit = async()=>{
    const response= await getProperty()
    // console.log("properties :",response.data.filter(property => property.property_type === 'types'))
    let data=response.data.filter(property => property.property_type === 'unit')
    let tempList = [];
    data.map((item) => {
      let a = {
        ...item,
        key:item.property_type,
        text: item.property_value,
        value:item.id,
      };
      tempList.push(a);
    });
    setUnitList(tempList);
  }

  const allAcctData = async () => {
		const response = await getAccountList()
		let tempList = []
		if (response?.success) {
			response.data.map(item => {
				let a
				if (item.name && item.code) {
          // && item.bank_account === true
					a = { key: item.code, value: item.id, text: item.name, description: item.code }
					tempList.push(a)
				}
			})
			setBankAccList(tempList)
		}
		return response.data
	}
  const {getMaterialComposition} = useProductionServices()
 
  const allMaterialComposition = async()=>{
    const response= await getMaterialComposition()
    setMaterialList(response.data)
  }
  useEffect(()=>{
    allItemProducts()
    allPropertiesTypes()
    allRawMaterials()
    allPropertiesUnit()
    allAcctData()
    allMaterialComposition()
  },[location,])

  return (
    <div className="item_add">
      <div className="itemList_header row mx-0">
        <div className="page_head ps-4 d-flex justify-content-between">
          <div>
            <div className="fs-5 py-2">Material Composition of Product</div>
            <div className="page_head_items">
              <div
                onClick={() => {
                  navigate("/material-composition-product");
                }}
                className={`page_head_item ${
                  location.pathname == "/material-composition-product" &&
                  "active"
                }`}
              >
                Material Composition of Product
              </div>
              <div
                onClick={() => {
                  navigate("/material-composition-list");
                }}
                className={`page_head_item ${
                  location.pathname == "/material-composition-list" && "active"
                }`}
              >
                Material Composition List
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-3 mt-3">
        <div className="p-2 bg-light rounded-1">
        { location.pathname == "/material-composition-product" && "active" ? 
          <MaterialCompositionOfProduct {...{typeList,allItem,allRaw,unitList,bankAccList,allPropertiesTypes,editComposition,setEditComposition}}/> :
          <MaterialCompositionList {...{materialList,allMaterialComposition,setEditComposition}} /> }
        </div>
      </div>
    </div>
  )
};

export default MaterialComposition;

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import "./ProductionTransaction.css";
import ItemProduce from "./components/ItemProduce";
import ByProductDetails from "./components/ByProductDetails";
import RawMaterials from "./components/RawMaterials";
import LabourAndExpense from "./components/LabourAndExpense";
import useProductionServices from "../../../services/master/productionServices";
import useItemServices from "../../../services/master/itemServices";
import useAccountServices from "../../../services/master/accountServices";
import useStaffServices from "../../../services/master/staffServices";
import { Dropdown } from "semantic-ui-react";
import { LuClipboardEdit } from "react-icons/lu";
import Swal from "sweetalert2";
import { Modal } from "react-bootstrap";
import useProductionTransactionServices from "../../../services/transactions/productionTransaction";
import { StockJournalEdit } from "../stockjurnal/components/StockJournalEdit";
const Initial_data =
  {qty: null,
  fk_item: null,
  fk_type: null,
  fk_unit: null,
  cost: null,
  value: null,
  margin: null,
  mrp_rate: null,
  retail_rate: null,
  wholesale_rate: null,
  super_wholesale_rate: null,
  quotation_rate: null,
  godown: null,
  batch_no: null,}

const raw_data = {
  qty: null,
  fk_item: null,
  fk_unit: null,
  cost: null,
  value: null,
  margin: null,
  mrp_rate: null,
  item_produced_name: null,
  item_name: null,
  godown_rate: null,
};

const by_prod_data = {
  qty: null,
  fk_item: null,
  fk_unit: null,
  cost: null,
  value: null,
  margin: null,
  mrp_rate: null,
  p_type: null,
  s_rate: null,
  item_name: null,
  item_produced_name: null,
};

const labour_data = {
  fk_debit_account: null, // MFEXPNSE ACC
  fk_credit_account: null, // TRANSPORTATION
  amount: null,
  item_produced_name: null,
};
const ProductionTransaction = () => {

  const location = useLocation();
  const [materialList, setMaterialList] = useState();
  const [items, setItems] = useState();
  const [units, setUnits] = useState();
  const [types, setTypes] = useState();
  const [accDetails, setAccDetails] = useState();
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [narration, setNarration] = useState("Production");
  const [staffDetails, setStaffDetails] = useState();
  const [code, setCode] = useState();
  const [fullProdData, setFullProdData] = useState([]);
  const [produceData, setProduceData] = useState(Initial_data);
  const [fullRawData, setFullRawData] = useState([]);
  const [rawItems, setRawItems] = useState(raw_data);
  const [fullByprodData, setFullByprodData] = useState([]);
  const [byProductItems, setByProductItems] = useState(by_prod_data);
  const [fullLabourData, setFullLabourData] = useState([]);
  const [labourDetails, setLabourDetails] = useState(labour_data);
  const [show, setShow] = useState(false);
  const [listProduction, setListProduction] = useState([]);
  const [selectedStaffAccount, setSelectedStaffAccount] = useState("");
  const [edit,setEdit]=useState()
  const { getMaterialComposition } = useProductionServices();
  const { getStaff } = useStaffServices();
  const { getItemList, getProperty, getCode } = useItemServices();
  const { getAccountList } = useAccountServices();
  const { postProductionData, getProductionDaybookPart ,getProductionDetails} =useProductionTransactionServices();
  const [productionList, setProductionList] = useState();
  const [isByOpen, setIsByOpen] = useState(false);
  const [isLabOpen, setIsLabOpen] = useState(true);

  const getProductData = async () => {
    const response = await getProductionDaybookPart();
    setProductionList(response.data);
  };
  
  const getDocNumber = async () => {
    const response = await getCode();
    let data = response.data.filter((code) => code.types === "PRODUCTION_CODE");
    setCode(data[0].next_code);
  };
  
  const getAllMaterialCompositions = async () => {
    const response = await getMaterialComposition();
    setMaterialList(response.data);
  };

  const getAllStaffDetails = async () => {
    const response = await getStaff();
    const data = response.data;
    let tempList = [];
    data.map((item) => {
      let a = {
        key: item.types,
        text: item.name,
        value: item.id,
      };
      tempList.push(a);
    });
    setStaffDetails(tempList);
  };

  const getItems = async () => {
    const response = await getItemList();
    let data = response.data.filter((property) => property.types === "PRODUCT");
    let tempList = [];
    data.map((item) => {
      let a = {
        key: item.types,
        text: item.name,
        value: item.id,
      };
      tempList.push(a);
    });
    setItems(tempList);
  };

  const getTypes = async () => {
    const response = await getProperty();
    let data = response.data.filter(
      (property) => property.property_type === "composition_type"
    );
    let tempList = [];
    data.map((item) => {
      let a = {
        ...item,
        key: item.property_type,
        text: item.property_value,
        value: item.id,
      };
      tempList.push(a);
    });
    setTypes(tempList);
  };

  const getUnits = async () => {
    const response = await getProperty();
    let data = response.data.filter(
      (property) => property.property_type === "unit"
    );
    let tempList = [];
    data.map((item) => {
      let a = {
        ...item,
        key: item.property_type,
        text: item.property_value,
        value: item.id,
      };
      tempList.push(a);
    });
    setUnits(tempList);
  };

  const getAllAccount = async () => {
    const response = await getAccountList();
    let tempList = [];
    if (response?.success) {
      response.data.map((item) => {
        let a;
        if (item.name && item.code) {
          // && item.bank_account === true
          a = {
            key: item.code,
            value: item.id,
            text: item.name,
            description: item.code,
          };
          tempList.push(a);
        }
      });
      setAccDetails(tempList);
    }
    return response.data;
  };

  const search = (options, searchValue) => {
    searchValue = searchValue.toUpperCase();
    return options.filter((option) => {
      return (
        option?.value?.toString()?.includes(searchValue) ||
        option?.text?.toString()?.includes(searchValue)
      );
    });
  };

  const getSelectedData = async (id) =>{
    const response = await getProductionDetails(id=edit?.id)
    let d=response?.data
    console.log(d,"selected")
    if (response?.success) {
      setDate(d.date)
      setCode(d.code)
      setNarration(d.narration)
      setSelectedStaffAccount(d.checked_by)
      let tempList =[]
      tempList=d.produced_items
      const tempRawOnly = tempList.flatMap((data) => data.raw_materials);
      const tempByproductOnly = tempList.flatMap((data) => data.by_products);
      const tempLabourOnly = tempList.flatMap((data) => data.expense_accounts);
      const tempProductionItem =[]
      tempList.map((data)=>{
        tempProductionItem.push({
          id:data.id,
          initial_qty: data.qty,
          fk_item: data.fk_item,
          fk_unit: data.fk_unit,
          cost: data.item_details.cost,
          value:data.value,
          margin: data.item_details.margin,
          mrp_rate: data.item_details.mrp_rate,
          item_produced_name: data.item_details.name,
          item_name: data.item_details.name,
          godown_rate: null,
          qty:data.qty,
          retail_rate:data.retail_rate,
          wholesale_rate:data.wholesale_rate,
          batch_no:data.batch_no,
          fk_type:data.fk_type
        })
      })
      const tempRaw = []
      const tempByproduct = []
      const tempLabour =[]

      tempRawOnly.map((data)=>{
        let choosenItem = tempList.filter(item=> item.id === data.fk_production_item)
        let itemName=choosenItem[0].item_details.name
        tempRaw.push({
          initial_qty: data.qty,
            fk_item: data.fk_item,
            fk_unit: data.fk_unit,
            cost: data.item_details.cost,
            value:data.value,
            margin: data.item_details.margin,
            mrp_rate: data.item_details.mrp_rate,
            item_produced_name:itemName,
            item_name: data.item_details.name,
            godown_rate: null,
            qty:data.qty
        })
      })

      tempByproductOnly.map((data)=>{
        let choosenItem = tempList.filter(item=> item.id === data.fk_production_item)
        let itemName=choosenItem[0].item_details.name
        tempByproduct.push({
          qty: data.qty,
          fk_item: data.fk_item,
          fk_unit: data.fk_unit,
          cost: data.item_details.cost,
          value: data.value,
          margin: data.item_details.margin,
          mrp_rate: data.item_details.mrp_rate,
          p_type: null,
          s_rate: data.item_details.retail_rate,
          item_name: data.item_details.name,
          item_produced_name: itemName,
        })
      })

      tempLabourOnly.map((data)=>{
        let choosenItem = tempList.filter(item=> item.id === data.fk_production_item)
        let itemName=choosenItem[0].item_details.name
        tempLabour.push({
          fk_debit_account: data.fk_debit_account,
          debit_name:data.debit_name,
          fk_credit_account: data.fk_credit_account,
          credit_name:data.credit_name,
          amount: data.amount,
          item_produced_name: itemName,
          initial_amount:data.amount,
        })
      })

      setRawItems(tempRaw)
      setFullProdData(tempProductionItem)
      setFullByprodData(tempByproduct)
      setFullLabourData(tempLabour)
    }
  }

  useEffect(()=>{
    if (edit) {
      getSelectedData();
    }
  },[edit])


  const handleDropdownStaffAccount = (event, data) => {
    setSelectedStaffAccount(data.value);
  };

  const handleResetAll = () => {
    setDate(new Date().toISOString().slice(0, 10))
    setCode('')
    setNarration('')
    setSelectedStaffAccount('')
    setRawItems([])
    setByProductItems([])
    setLabourDetails('')
    setProduceData('')
    setFullRawData([])
    setFullByprodData([])
    setFullLabourData([])
    setFullProdData([])
  };

  const handleFinalSubmit = async () => {
    let tempItemList = []
    if(listProduction?.length<0 && Object.values(produceData).filter(x=>x).length>4)
      tempItemList = [produceData]
    else if(listProduction?.length>0)
      tempItemList = [...listProduction]
    else {
      Swal.fire('No Item Added . Please Add An Item','','error')
    }
    let submitData = {
      voucher_number: code,
      date: date,
      checked_by: selectedStaffAccount,
      narration: narration,
      total_sales_value: 0,
      total_cost: 0,
      total_margin: 0,
      produced_items: listProduction,
    };
    let response = await postProductionData(submitData);
    if (!response?.success) {
      Swal.fire("Error", "Oops Something went wrong");
    } else {
      handleResetAll();
      Swal.fire("Success", "Successfully submitted");
    }
  };

  useEffect(() => {
    getDocNumber();
    getItems();
    getUnits();
    getTypes();
    getAllAccount();
    getAllMaterialCompositions();
    getAllStaffDetails();
    getProductData();
  }, []);

  return (
    <div className="item_add">
      <div className="itemList_header row mx-0">
        <div className="page_head ps-4 d-flex justify-content-between">
          <div>
            <div className="fs-5 py-2">Production</div>
            <div className="page_head_items">
              <div
                className={`page_head_item ${
                  location.pathname == "/production-transaction" && "active"
                }`}
              >
                Production
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-3 mt-3">
        <div className="p-2 bg-light rounded-1">
          <div className="col-12 pt-2 d-flex mb-2">
            <div className="col-2 col-3 d-flex mx-0">
              <div className="col-3 mx-0">Doc.No :</div>
              <input
                type="text"
                className="rounded border col-8 ps-3"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
            <div className="col-1 d-flex mx-0">
              <button
              onClick={() => setShow(true)}
               className="bg-dark text-light border border-dark rounded w-25">
                <LuClipboardEdit
                  className="my-1"                  
                />
              </button>
            </div>
            <div className="col-2 col-3 d-flex mx-0">
              <div className="col-3 mx-0 ps-4">Date :</div>
              <input
                type="date"
                className="rounded border col-7 ms-1"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>
          <ItemProduce
            {...{
              materialList,
              items,
              types,
              units,
              produceData,
              setProduceData,
              setRawItems,
              setByProductItems,
              setLabourDetails,
              fullProdData,
              setFullProdData,
              fullRawData,
              setFullRawData,
              fullByprodData,
              setFullByprodData,
              fullLabourData,
              setFullLabourData,
              rawItems,
              byProductItems,
              labourDetails,
              listProduction,
              setListProduction,
            }}
          />
         
            <RawMaterials
              {...{
                rawItems,
                setRawItems,
                fullProdData,
                produceData,
                setFullProdData,
                units,
                fullRawData,
                setFullRawData,
                setProduceData,
              }}
            />
            <LabourAndExpense
            {...{
              labourDetails,
              setLabourDetails,
              accDetails,
              fullLabourData,
              setFullLabourData,
              setProduceData,
              isLabOpen, 
              setIsLabOpen,
              setIsByOpen
            }}
          />
            <ByProductDetails
              {...{
                byProductItems,
                setByProductItems,
                units,
                fullByprodData,
                setFullByprodData,
                isByOpen,
                setIsByOpen,
                setIsLabOpen
              }}
            />
          
          

          <div className="col-12 d-flex justify-content-end mb-1 mt-2">
            <div className="col-4 d-flex pe-3">
              <div className="col-3">Checked by </div>
              <Dropdown
                clearable
                selection
                required
                search={search}
                // onKeyDown={handleKeyDown1}
                onChange={handleDropdownStaffAccount}
                className="purchase-input-text table-drop d-flex align-items-center py-0 form-control w-100"
                name="fk_type"
                placeholder="Select"
                value={selectedStaffAccount}
                options={staffDetails}
              />
            </div>
            <div className="col-4 d-flex pe-3">
              <div className="col-3">Narration</div>
              <input
                type="text"
                className="col-9 rounded border ms-2 ps-3"
                value={narration}
                onChange={(e) => setNarration(e.target.value)}
              />
            </div>
            <div className="col-4 d-flex justify-content-end">
              <button onClick={handleResetAll} className="col-4 col-5 mx-1 rounded border border-dark bg-dark text-light py-1">
                Clear
              </button>
              <button
                className="col-4  col-5 rounded border border-dark bg-dark text-light py-1"
                onClick={handleFinalSubmit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} centered size="lg" onHide={() => setShow(false)}>
        <Modal.Body className="p-0 rounded-3">
          <StockJournalEdit
            title={"Production List"}
            list = {productionList}
            setShow = {setShow}
            from={"production"}
            handleClearAll ={handleResetAll}
            getData={getProductData}
            {
              ...{
                edit,
                setEdit,
              }
            }
            productionPage={true}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProductionTransaction;

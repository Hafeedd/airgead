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
const Initial_data = {
  qty: null,
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
  batch_no: null,
};

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

  // const [listProduction,setListProduction] = useState([])

  // const [selectedStaffAccount, setSelectedStaffAccount] = useState("");
  // const [show, setShow] = useState(false);

  // const [listProduction,setListProduction] = useState([])

  // const [selectedStaffAccount, setSelectedStaffAccount] = useState("");
  const [show, setShow] = useState(false);

  const [listProduction, setListProduction] = useState([]);

  const [selectedStaffAccount, setSelectedStaffAccount] = useState("");
  const [showProductionEdit, setShowProductionEdit] = useState(false);
  const { getMaterialComposition } = useProductionServices();
  const { getStaff } = useStaffServices();
  const { getItemList, getProperty, getCode } = useItemServices();
  const { getAccountList } = useAccountServices();
  const { postProductionData, getProductionDaybookPart } =
    useProductionTransactionServices();

  const [getProductList, setGetProductList] = useState();
  const getProductData = async () => {
    const response = await getProductionDaybookPart();
    setGetProductList(response.data);
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

  console.log("doc", date, narration, selectedStaffAccount, code);
  console.log("1.raw", rawItems);
  console.log("2.bypro", byProductItems);
  console.log("3.labour", labourDetails);
  console.log("4.product", produceData);

  console.log("full", fullProdData);
  console.log("full_raw", fullRawData);
  console.log("full_bypro", fullByprodData);
  console.log("full_labourData", fullLabourData);
  console.log("product_data", getProductList);
  const handleDropdownStaffAccount = (event, data) => {
    setSelectedStaffAccount(data.value);
  };
  const handleResetAll = () => {
    // setDate('')
    // setCode('')
    // setNarration('')
    // setSelectedStaffAccount('')
    // setRawItems('')
    // setByProductItems('')
    // setLabourDetails('')
    // setProduceData('')
    // setFullRawData([])
    // setFullByprodData([])
    // setFullLabourData([])
    // setFullProdData([])
  };

  const handleFinalSubmit = async () => {
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
              <button className="bg-dark text-light border border-dark rounded w-25">
                <LuClipboardEdit
                  className="my-1"
                  onClick={() => setShow(true)}
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
          <div className="col-12 mt-1 d-flex">
            <RawMaterials
              {...{
                rawItems,
                setRawItems,
                units,
                fullRawData,
                setFullRawData,
                setProduceData,
              }}
            />
            <ByProductDetails
              {...{
                byProductItems,
                setByProductItems,
                units,
                fullByprodData,
                setFullByprodData,
              }}
            />
          </div>
          <LabourAndExpense
            {...{
              labourDetails,
              setLabourDetails,
              accDetails,
              fullLabourData,
              setFullLabourData,
              setProduceData,
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
              <button className="col-4 col-5 mx-1 rounded border border-dark bg-dark text-light py-1">
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
            //list = {stockJList}
            // setShow = {setShowJournalFilter}
            {
              ...{
                // edit,
                // getData,
                // setEdit,
                // handleClearAll,
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

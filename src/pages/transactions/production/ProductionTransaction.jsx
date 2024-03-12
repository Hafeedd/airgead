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
  retail_rate: null,
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
  const [rawData, setRawData] = useState(raw_data);
  const [labourData, setLabourData] = useState(labour_data);
  const [byprodData, setByprodData] = useState(by_prod_data);
  const [rawItems, setRawItems] = useState([]);
  const [labourDetails, setLabourDetails] = useState([]);
  const [byProductItems, setByProductItems] = useState([]);


  const [show, setShow] = useState(false);
  const [listProduction, setListProduction] = useState([]);
  const [selectedStaffAccount, setSelectedStaffAccount] = useState("");
  const [edit, setEdit] = useState();
  const { getMaterialComposition } = useProductionServices();
  const { getStaff } = useStaffServices();
  const { getItemList, getProperty, getCode } = useItemServices();
  const { getAccountList } = useAccountServices();
  const { postProductionData, getProductionDaybookPart, getProductionDetails, putProductionData } = useProductionTransactionServices();
  const [productionList, setProductionList] = useState();
  const [isByOpen, setIsByOpen] = useState(false);
  const [isLabOpen, setIsLabOpen] = useState(true);
  const [proList,setProList]=useState([]);
  const [itemCompleteData,setItemCompleteData] = useState();

  // console.log('first',proList)
  // const [entryList, setEntryList] = useState([])

  // const getEntryList=(data)=>{
  //   let tempList = [];
  //   data?.map((item) => {
  //   let a = {
  //     text: item.item_details.name,
  //     value: item.fk_item,
  //   };
  //   tempList.push(a);
  //   })
  //   setEntryList(tempList)
  // } 

  const location = useLocation();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (edit) {
      getSelectedData();
    }
  }, [edit]);

  const getData = async () => {
    const filter1 = (data, setState) => {
      let tempList = [];
      data?.map((item) => {
        let a = {
          // key: item.types,
          text: item.name,
          value: item.id,
        };
        tempList.push(a);
      });
      setState(tempList);
    };
    const filter2 = (data, setState, filterProperty) => {
      let tempList = [];
      data.map((item) => {
        if (item.property_type == filterProperty) {
          let a = {
            ...item,
            // key: item.property_type,
            text: item.property_value,
            value: item.id,
          };
          tempList.push(a);
        }
      });
      setState(tempList);
    };
    try {
      let res1, res2, res3, res4, res5, res6, res7, data;
      res1 = await getProductionDaybookPart();
      if (res1.success) setProductionList(res1?.data);
      res2 = await getCode();
      if (res2?.success) {
        data = res2.data.filter((code) => code.types === "PRODUCTION_CODE");
        setCode(data[0].next_code);
      }
      res3 = await getStaff();
      if (res3?.success) {
        filter1(res3.data, setStaffDetails);
      }
      res4 = await getItemList();
      if (res4?.success) {
        setItemCompleteData(res4?.data)
        filter1(res4?.data, setItems);
      }
      res5 = await getProperty();
      if (res5?.success) {
        filter2(res5.data, setTypes, "composition_type");
        filter2(res5.data, setUnits, "unit");
      }
      res6 = await getAccountList();
      let tempList = [];
      if (res6?.success) {
        res6.data.map((item) => {
          let a;
          if (item.name && item.code) {
            // && item.bank_account === true
            a = {
              // key: item.code,
              value: item.id,
              text: item.name,
              description: item.code,
            };
            tempList.push(a);
          }
        });
        setAccDetails(tempList);
      }
      res7 = await getMaterialComposition();
      if (res7?.success) {
        setMaterialList(res7.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  //   const response = await getAccountList();
  //   let tempList = [];
  //   if (response?.success) {
  //     response.data.map((item) => {
  //       let a;
  //       if (item.name && item.code) {
  //         // && item.bank_account === true
  //         a = {
  //           key: item.code,
  //           value: item.id,
  //           text: item.name,
  //           description: item.code,
  //         };
  //         tempList.push(a);
  //       }
  //     });
  //     setAccDetails(tempList);
  //   }
  //   return response.data;
  // };
// console.log(items,'productionsssssssssssssssssssssss')
  const search = (options, searchValue) => {
    searchValue = searchValue.toUpperCase();
    return options.filter((option) => {
      return (
        option?.value?.toString()?.includes(searchValue) ||
        option?.text?.toString()?.includes(searchValue)
      );
    });
  };

  const getSelectedData = async () => {
    const response = await getProductionDetails(edit?.id);
    let d = response?.data;
    if (response?.success) {
      setDate(d.date);
      setCode(d.daybook_part.voucher_number);
      setNarration(d.daybook_part.narration);
      setSelectedStaffAccount(d.checked_by);
      let tempList = [];
      tempList = d.produced_items;
      const tempRawOnly = tempList.flatMap((data) => data.raw_materials);
      const tempByproductOnly = tempList.flatMap((data) => data.by_products);
      const tempLabourOnly = tempList.flatMap((data) => data.expense_accounts);
      const tempProductionItem = [];
      const tempProList = []
      tempList.map((data) => {
        tempProList.push(items.filter(item => item.value === data.fk_item)[0])
        tempProductionItem.push({
          id: data.id,
          initial_qty: data.qty,
          value: data.value,
          retail_rate: data.retail_rate,
          wholesale_rate: data.wholesale_rate,
          batch_no: data.batch_no,
          fk_type: data.fk_type,
          fk_item: data.fk_item,
          qty: data.qty,
          fk_unit: data.fk_unit,
          cost: data.item_details.cost,
          margin: data.item_details.margin,
          mrp_rate: data.item_details.mrp_rate,
          item_produced_name: data.item_details.name,
          item_name: data.item_details.name,
          godown_rate: null,
        });
      });
      const tempRaw = [];
      const tempByproduct = [];
      const tempLabour = [];

      
      tempRawOnly.map((data) => {
        let choosenItem = tempList.filter(
          (item) => item.id === data.fk_production_item
        );
        let itemName = choosenItem[0].item_details.name;
        tempRaw.push({
          id:data.id,
          initial_qty: data.qty,
          fk_item: data.fk_item,
          fk_unit: data.fk_unit,
          cost: data.cost,
          value: data.value,
          margin: data.item_details.margin,
          mrp_rate: data.item_details.mrp_rate,
          item_produced_name: itemName,
          item_name: data.item_details.name,
          godown_rate: null,
          qty: data.qty,
        });
      });

      tempByproductOnly.map((data) => {
        let choosenItem = tempList.filter(
          (item) => item.id === data.fk_production_item
        );
        let itemName = choosenItem[0].item_details.name;
        tempByproduct.push({
          id:data.id,
          qty: data.qty,
          fk_item: data.fk_item,
          fk_unit: data.fk_unit,
          cost: data.cost,
          value: data.value,
          margin: data.item_details.margin,
          mrp_rate: data.item_details.mrp_rate,
          p_type: null,
          retail_rate: data.item_details.retail_rate,
          item_name: data.item_details.name,
          item_produced_name: itemName,
        });
      });

      tempLabourOnly.map((data) => {
        let choosenItem = tempList.filter(
          (item) => item.id === data.fk_production_item
        );
        let itemName = choosenItem[0].item_details.name;
        tempLabour.push({
          id:data.id,
          fk_debit_account: data.fk_debit_account,
          debit_name: data.debit_name,
          fk_credit_account: data.fk_credit_account,
          credit_name: data.credit_name,
          amount: data.amount,
          item_produced_name: itemName,
          initial_amount: data.amount,
        });
      });
      setRawItems(tempRaw);
      setFullProdData(tempProductionItem);
      setByProductItems(tempByproduct);
      setLabourDetails(tempLabour);
      setProList(tempProList);
    }
  };

  const handleDropdownStaffAccount = (event, data) => {
    setSelectedStaffAccount(data.value);
  };

  const handleResetAll = () => {
    setDate(new Date().toISOString().slice(0, 10));
    setCode("");
    setNarration("Production");
    setSelectedStaffAccount("");
    setRawItems([]);
    setByProductItems([]);
    setLabourDetails("");
    setProduceData("");
    // setFullRawData([]);
    // setFullByprodData([]);
    // setFullLabourData([]);
    setFullProdData([]);
  };

  const handleFinalSubmit = async () => {
    let listProd = [];
    let tempFullProdData = [...fullProdData];
    if (fullProdData?.length > 0 || Object.values(produceData).filter(x=>x).length > 4) {
      // console.log(fullProdData,"fullProdData")
      // console.log(produceData,"produceData")
      if(fullProdData.length < 1){
        tempFullProdData = [produceData]
        console.log(fullProdData)
      }
      tempFullProdData.forEach((prodData) => {
        listProd.push({
          ...prodData,
          raw_materials: rawItems.filter(
            (rawData) =>
              rawData.item_produced_name === prodData.item_name
          ),
          expense_accounts: labourDetails.filter(
            (lobourData) =>
              lobourData.item_produced_name === prodData.item_name
          ),
          by_products: byProductItems.filter(
            (byProductData) =>
              byProductData.item_produced_name === prodData.item_name
          )
        })
      });
    
    // let tempProdList = [...listProduction];
    // if (
    //   listProduction?.length < 1 &&
    //   Object.values(produceData).filter((x) => x).length > 4
    // )
    //   tempProdList = [
    //     {
    //       ...produceData,
    //       raw_materials: [...rawItems],
    //       by_products: [...byProductItems],
    //       expense_accounts: [...labourDetails],
    //     },
    //   ];
    // else {
    //   Swal.fire("No Item Added . Please Add An Item", "", "error");
    // }
    let submitData = {
      voucher_number: code,
      date: date,
      checked_by: selectedStaffAccount,
      narration: narration,
      total_sales_value: 0,
      total_cost: 0,
      total_margin: 0,
      produced_items: listProd,
    };
    // console.log(submitData.produced_items);
    // return 0
    if (!edit){
      let response = await postProductionData(submitData);
      if (!response?.success) {
        Swal.fire("Error", "Oops Something went wrong");
      } else {
        handleResetAll();
        getData()
        Swal.fire("Success", "Successfully submitted");
      }
    }else{
      let response = await putProductionData(submitData,edit.id);
      if (!response?.success) {
        Swal.fire("Error", "Oops Something went wrong");
      } else {
        handleResetAll();
        getData()
        Swal.fire("Success", "Updated Successfully");
      }
    }
  }else {
    Swal.fire("No Item Added . Please Add An Item", "", "error");
  }
  };

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
          <div className="row pt-2 d-flex mb-2 px-2">
            <div className="col-4 d-flex mx-0">
              <div className="col-2 col-3 mx-0">Doc.No :</div>
              <input
                type="text"
                className="rounded border col-6 ps-3"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <div className="col-1 mx-1">
                <button
                onClick={() => setShow(true)}
                className="bg-dark text-light border border-dark rounded w-100"
              >
                <LuClipboardEdit className="my-1" />
              </button>
              </div>
            </div>
            {/* <div className="col-1 d-flex mx-0">
              
            </div> */}
            <div className="col-3 d-flex mx-0">
              <div className="col-3 mx-0 ps-3">Date :</div>
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
              // fullRawData,
              // setFullRawData,
              // fullByprodData,
              // setFullByprodData,
              // fullLabourData,
              // setFullLabourData,
              rawItems,
              byProductItems,
              labourDetails,
              listProduction,
              setListProduction,
              proList,
              setProList
              // getEntryList,
            }}
          />

          <RawMaterials
            {...{
              items,
              rawItems,
              setRawItems,
              fullProdData,
              produceData,
              setFullProdData,
              units,
              setProduceData,
              labourDetails,
              setLabourDetails,
              
              proList,
              itemCompleteData,
              rawData,
              setRawData,
            }}
          />
          <LabourAndExpense
            {...{
              setFullProdData,
              produceData,
              fullProdData,
              rawItems,
              labourDetails,
              setLabourDetails,
              accDetails,
              setProduceData,
              isLabOpen,
              setIsLabOpen,
              setIsByOpen,

              itemCompleteData,
              proList,
              labourData,
              setLabourData,
            }}
          />
          <ByProductDetails
            {...{
              byProductItems,
              setByProductItems,
              units,
              // fullByprodData,
              // setFullByprodData,
              items,
              isByOpen,
              setIsByOpen,
              setIsLabOpen,

              proList,
              itemCompleteData,
              byprodData,
              setByprodData
            }}
          />

          <div className="col-12 d-flex justify-content-end mb-1 mt-2 px-2">
            <div className="col-4 d-flex pe-3">
              <div className="col-3">Checked by :</div>
              <Dropdown
                clearable
                selection
                required
                search={search}
                // onKeyDown={handleKeyDown1}
                onChange={handleDropdownStaffAccount}
                className="purchase-input-text table-drop d-flex align-items-center py-0 form-control w-100 bordercolors"
                name="fk_type"
                placeholder="Select"
                value={selectedStaffAccount}
                options={staffDetails}
              />
            </div>
            <div className="col-4 d-flex pe-3">
              <div className="col-3">Narration :</div>
              <input
                type="text"
                className="col-9 rounded border ps-3"
                value={narration}
                onChange={(e) => setNarration(e.target.value)}
              />
            </div>
            <div className="col-4 d-flex justify-content-end">
              <button
                onClick={handleResetAll}
                className="col-4 col-5 mx-1 rounded border border-dark bg-dark text-light py-1"
              >
                Clear
              </button>
              <button
                className="col-4  col-5 rounded border border-dark bg-dark text-light py-1"
                onClick={handleFinalSubmit}
              >
                {edit?"Update":"Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} centered size="lg" onHide={() => setShow(false)}>
        <Modal.Body className="p-0 rounded-3">
          <StockJournalEdit
            title={"Production List"}
            list={productionList}
            setShow={setShow}
            from={"production"}
            handleClearAll={handleResetAll}
            getData={getData}
            {...{
              edit,
              setEdit,
            }}
            productionPage={true}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProductionTransaction;

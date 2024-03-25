import { useEffect, useState } from "react";
import { StockJournalDetails } from "./components/StockJournalDetails";
import "./StockJournal.css";
import { Modal } from "react-bootstrap";
import { StockJournalEdit } from "./components/StockJournalEdit";
import useItemServices from "../../../services/master/itemServices";
import useStockJournalServices from "../../../services/transactions/stockJournal";
import Swal from "sweetalert2";

export const StockJournal = () => {
  const [showJournalFilter, setShowJournalFilter] = useState(false);
  const [itemNameList, setItemNameList] = useState([]);
  const [unitList, setUnitList] = useState([]);
  const [stockTableItemList, setStockTableItemList] = useState([]);
  const [stockJList, setstockJList] = useState([]);
  const [edit, setEdit] = useState();
  const [tableEdit, setTableEdit] = useState();
  const [stockJAdd, setStockJAdd] = useState({
    id: null,
    code: null,
    narration: null,
    salesman: null,
    date: new Date().toISOString(),
    total_items: null,
    total_value: null,
    total_qty: null,
  });
  const [stockTableItem, setStockTableItem] = useState({
    name: null,
    code: null,
    qty: null,
    qty_type: "add",
    cost: null,
    unit: null,
    value: null,
    godown: null,
  });

  const { postStockJ, getStockJ, putStockJ, deleteStockJ } =
    useStockJournalServices();
  const { getCode, getItemNameList, getProperty } = useItemServices();

  useEffect(() => {
    getData();
    handleGetCode();
  },[]);

  useEffect(() => {
    if (edit) {
      const { items, ...others } = edit;
      setStockJAdd(others);
      setStockTableItemList(items);
    }
    handleGetCode();
  }, [edit]);

  const handleClearAll = () => {
    setStockJAdd({
      code: null,
      narration: null,
      salesman: null,
      date: null,
      total_items: null,
      total_value: null,
      total_qty: null,
    });
    handleResetStockTabe();
    setStockTableItemList([]);
    setEdit(false)
    handleGetCode()
  };

  const handleResetStockTabe = () => {
    setStockTableItem({
      name: null,
      code: null,
      unit: null,
      qty: null,
      qty_type: "add",
      cost: null,
      value: null,
      godown: null,
    });
  };

  useEffect(() => {
    if (stockTableItemList?.length > 0) {
      let totalValue = stockTableItemList?.reduce((a, b) => {
        return b.value ? parseFloat(a) + parseFloat(b.value) : 0;
      }, 0);
      let totalqty = stockTableItemList?.reduce((a, b) => {
        return b.qty ? parseFloat(a) + parseFloat(b.qty) : 0;
      }, 0);
      let totalItems = stockTableItemList?.reduce((a, b) => {
        return a + 1;
      }, 0);

      let tempStockJAdd = {
        ...stockJAdd,
        total_items: totalItems,
        total_value: totalValue,
        total_qty: totalqty,
      };
      setStockJAdd(tempStockJAdd);
    }
  }, [stockTableItemList, stockTableItem]);

  const handleAddToTableList = async () => {
    if (!stockTableItem.qty || !stockTableItem.code) {
      Swal.fire({
        title: "Warning !",
        text: "Please select an Item and enter quantity",
        showConfirmButton: false,
        timer: 1700,
      });
      return 0;
    }
    if (tableEdit && edit) {
      let submitData = { ...stockJAdd, item: [stockTableItem] };
      const response = await putStockJ(submitData, edit.id);
      if (!response.success) return 0;
    }
    const values = Object.values(stockTableItem).filter((x) => x !== null);
    if (values?.length > 1) {
      const tempList = stockTableItemList;
      tempList.unshift(stockTableItem);
      setStockTableItemList(tempList);
      handleResetStockTabe();
    }
  };

  const calcTotalVal = (data) => {
    if(edit)
      return data
    data.map((item) => {
      let totalValue = 0;
      if (item.items?.length > 0) {
        item.items.map((x) => {
          totalValue += x?.value || 0;
        });
      }
      item.totalValue = totalValue;
    });
    return data;
  };

  const minFunct = (data) => {
    let list = [];
    data.map((x) => {
      if (x.property_type === "unit") {
        list.push({ value: x["id"], text: x["property_value"] });
      }
    });
    setUnitList(list);
  };

  const handleGetCode = async () =>{
    try{
      let response = await getCode();
      if (response.success && !edit) {
        let code = response.data.filter((x) => x.types === "STOCK_JOURNAL_CODE")[0];
        setStockJAdd(data=>({ ...data, code: code?.next_code }));
      }
    }catch(err){}
  }

  const getData = async () => {
    try {
      let response2 = await getItemNameList();
      let response3 = await getProperty();
      let response4 = await getStockJ();

      if (response2.success) {
        let tempList = [];
        response2.data.map((item) => {
          let a = {
            ...item,
            value: item?.code,
            text: item?.name,
            name: item?.name,
            description: item?.code,
            unit: item?.fk_unit,
          };
          tempList.push(a);
        });
        setItemNameList(tempList);
      }
      if (response3.success) {
        minFunct(response3.data);
      }
      if (response4.success) {
        let tempList = [];
        // filtering stock according to document no
        response4?.data?.map((item) => {
          // if(!item) return 0
          let tempData = {};
          if (tempList?.length < 1) {
            tempData = {
              id: item?.journal_master?.id,
              code: item?.journal_master?.document_number,
              narration: item?.journal_master?.narration,
              salesman: item?.journal_master?.salesman,
              date: item?.journal_master?.date,
              total_items: parseInt(item?.count),
              items: [
                {
                  name: item?.item_add?.name,
                  code: item?.item_add?.code,
                  qty: item?.count,
                  qty_type: item?.add_qty ? "add" : "less",
                  cost: item?.cost,
                  unit: item?.unit,
                  value: item?.value,
                  godown: item?.godown,
                },
              ],
            };
            tempList.push(tempData);
          } else if (
            tempList.findIndex((x) => {
              return x.code == item?.journal_master?.document_number;
            }) == -1
          ) {
            tempList.push({
              id: item?.journal_master?.id,
              code: item?.journal_master?.document_number,
              narration: item?.journal_master?.narration,
              salesman: item?.journal_master?.salesman,
              date: item?.journal_master?.date,
              total_items: parseInt(item?.count),
              items: [
                {
                  name: item?.item_add?.name,
                  code: item?.item_add?.code,
                  qty: item?.count,
                  qty_type: item?.add_qty ? "add" : "less",
                  cost: item?.cost,
                  unit: item?.unit,
                  value: item?.value,
                  godown: item?.godown,
                },
              ],
            });
          } else {
            tempList.map((data) => {
              if (data.code == item?.journal_master?.document_number) {
                data.total_items =
                  parseInt(data.total_items) + parseInt(item?.count);
                data?.items.push({
                  name: item?.item_add?.name,
                  code: item?.item_add?.code,
                  qty: item?.count,
                  qty_type: item?.add_qty ? "add" : "less",
                  cost: item?.cost,
                  unit: item?.unit,
                  value: item?.value,
                  godown: item?.godown,
                });
              }
            });
          }
        });
        const tempListData = calcTotalVal(tempList);
        setstockJList(tempListData?.reverse());
      }
    } catch (err) {
      // console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response,
      submitData = { ...stockJAdd, item: stockTableItemList };
      console.log(submitData)
      // return 0
      if (!edit) {
        response = await postStockJ(submitData);
      } else {
        response = await putStockJ(submitData, edit?.id);
      }
      if (response.success) {
        Swal.fire(
          `Stock journal ${edit ? "edited" : "saved"} successfully`,
          "",
          "success"
        );
        getData();
        setEdit(false);
        handleClearAll();
      } else {
        Swal.fire(response.data, "", "error");
      }
    } catch (err) {
      Swal.fire(
        "Something went wrong",
        `Failed to ${edit ? "edit" : "add"} stock journal`,
        "error"
      );
    }
  };

  return (
    <div className="item_add">
      <div className="itemList_header row mx-0 mb-3">
        <div className="page_head ps-4 d-flex justify-content-between">
          <div>
            <div className="fw-600 fs-5">Stock Journal</div>
            <div className="page_head_items mb-1">
              <div className={`page_head_item active`}>Journal</div>
            </div>
          </div>
        </div>
        </div>
        <div className="px-4">
          <StockJournalDetails
            {...{
              setShowJournalFilter,
              stockJAdd,
              setStockJAdd,
              setStockTableItemList,
              edit,
              stockTableItem,
              setStockTableItem,
              handleAddToTableList,
              itemNameList,
              unitList,
              stockTableItemList,
              handleClearAll,
              setStockTableItemList,
              handleResetStockTabe,
              handleSubmit,
              tableEdit,
              setTableEdit,
              deleteStockJ,
              stockJList,
              setEdit,
            }}
          />
        </div>
        <Modal
          show={showJournalFilter}
          centered
          size="lg"
          onHide={() => setShowJournalFilter(false)}
        >
          <Modal.Body className="p-0 rounded-3">
            <StockJournalEdit
            list = {stockJList}
            title={"Stock Journal List"}
            setShow = {setShowJournalFilter}
              {...{
                edit,
                getData,
                setEdit,
                handleClearAll,
              }}
            />
          </Modal.Body>
        </Modal>
      {/* </div> */}
    </div>
  );
};

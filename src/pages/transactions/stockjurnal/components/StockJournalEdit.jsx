import { Form } from "react-bootstrap";
import searchIcon from "../../../../assets/icons/search.png";
import deleteBtn from "../../../../assets/icons/delete.svg";
import editBtn from "../../../../assets/icons/edit-black.svg";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Checkbox } from "semantic-ui-react";
import useAccJournalServices from "../../../../services/transactions/accJournalServices";
import useStockJournalServices from "../../../../services/transactions/stockJournal";

export const StockJournalEdit = (props) => {
  const {
    permissions,
    list,
    handleCalc,
    getData,
    setShow,
    from,
    title,
    setEdit,
    handleClearAll,
    setItemList,
    supplierCustomer,
  } = props;

  const [searchedList, setSearchedList] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedItemList, setSelectedItemList] = useState([]);
  const [date, setDate] = useState({
    start: new Date().toISOString().slice(0, 10),
    end: new Date().toISOString().slice(0, 10),
  });

  const { deleteAccJournal } = useAccJournalServices();
  const { deleteStockJ } = useStockJournalServices();

  const handleEditClick = (data) => {
    handleClearAll();
    setEdit(data);
    setShow(false);
  };

  useEffect(() => {
    handleDateFilter();
  }, [date, list]);

  const handleDateFilter = () => {
    let tempList;
    let filterList;
    if (date.start && date.end && list?.length > 0) {
      filterList = [...list];
      let startDate = new Date(date.start.slice(0, 10));
      let endDate = new Date(date.end.slice(0, 10));
      tempList = filterList?.filter((x) => {
        let dateOfItem = new Date(x.created_at || x.date);
        if (dateOfItem >= startDate && dateOfItem <= endDate) {          
          if (supplierCustomer) {
            if (
              x?.supplier_name === supplierCustomer ||
              x?.customer_name === supplierCustomer
            )
              return true;
          } else return true;
        }
        return false;
      });
      if (from == "acc") setSearchedList(tempList.reverse());
      else setSearchedList(tempList);
    }
  };

  useEffect(() => {
    let tempList;
    let filterList;
    if (searchedList?.length > 0 && search) {
      filterList = [...searchedList];
      tempList = filterList?.filter((x) => {
        let property = "code";
        if (from === "acc") property = "voucher_number";
        if (
          x?.[property]
            ?.toLowerCase()
            .toString()
            ?.includes(search?.toLowerCase())
        ) {
          let dateOfItem = new Date(x.date);
          let startDate = new Date(date?.start?.slice(0, 10));
          let endDate = new Date(date?.end?.slice(0, 10));
          if (date.end && date.start) {
            if (dateOfItem >= startDate && dateOfItem <= endDate) {
              return true;
            } else return false;
          }
          return true;
        }
        return false;
      });
      setSearchedList(tempList);
    } else {
      handleDateFilter();
    }
  }, [search, from, list]);

  const handleDeleteData = async (id) => {
    try {
      let response;
      if (from == "acc") response = await deleteAccJournal(id);
      else response = await deleteStockJ(id);
      if (response?.success) {
        Swal.fire({
          title: "Success",
          text: "Account deleted successfully",
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
        });
        getData();
      } else {
        Swal.fire({
          title: "Warning",
          text:
            response?.message ||
            "Failed to delete account. There may be transaction done with this account.",
          icon: "info",
          // timer: 1000,
          // showConfirmButton: false,
        });
      }
    } catch (err) {
      Swal.fire({
        title: "Warning",
        text:
          err?.response?.data?.message ||
          "Failed to delete account. There may be transaction done with this account.",
        icon: "info",
      });
    }
  };

  const handleDelete = async (data) => {
    Swal.fire({
      title: "Delete",
      text: `Are you sure, you want to delete ${
        from == "acc" ? "journal" : "stock"
      } ${data.documents_no || data.voucher_number}?`,
      icon: "question",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Yes",
      denyButtonText: "Cancel",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        await handleDeleteData(data?.id);
      },
      preDeny: () => {
        Swal.fire({
          title: "Cancelled",
          icon: "info",
          timer: 1000,
          showConfirmButton: false,
        });
      },
    });
  };

  const handePurchaseReturnSubmit = (e) => {
    e.preventDefault();
    setItemList([...selectedItemList]);
    handleCalc(selectedItemList,false,false)
    setShow(false);
  };

  return (
    <div className="p-0">
      <div className="stockJ-edit rounded-top-2 py-2 ps-3">{title}</div>
      <div className="row mx-0 p-2 px-3">
        <Form.Group className="col-4 col-3 pe-4 ps-0 mx-0 d-flex align-items-start mt-1">
          <Form.Label className="col-2 purchase-input-label align-middle">
            From
          </Form.Label>
          <Form.Control
            required
            onChange={(e) => setDate({ ...date, start: e.target.value })}
            name="fk_supplier"
            className="purchase-input-text me-2"
            type="date"
            value={date.start}
          />
        </Form.Group>
        
      <Form.Group className="col-4 col-3 pe-4 ps-0 mx-0 d-flex align-items-start mt-1">
          <Form.Label className="col-2 purchase-input-label align-middle">
            To
            To
          </Form.Label>
          <Form.Control
            required
            onChange={(e) => setDate({ ...date, end: e.target.value })}
            name="fk_supplier"
            className="purchase-input-text me-2"
            type="date"
            value={date.end}
          />
        </Form.Group>
      </div>
      <div className="p-2 px-3 row mx-0">
        <div className="bg-dark py-2 ps-4 rounded-top-1 d-flex justify-content-between">
          <div className="item_seach_bar_cont rounded-2 col-3">
            <img
              src={searchIcon}
              alt="search_icon"
              className="search_img me-3 ms-2 py-2"
            />
            <input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              className="item_search_bar rounded-2 border-0 py-1"
              placeholder="Search"
              type="text"
            />
          </div>
          {supplierCustomer && (
            <div className="text-light d-flex align-items-center">
              <div className="text-success">SUPPLIER &nbsp;:&emsp;</div>
              {supplierCustomer}
            </div>
          )}
        </div>
        <div
          className={`stockJ-edit-table-cont px-0 ${
            from?.includes('Rtn') && "p-return"
          } `}
        >
          <table className="stockJ-edit-table table ">
            <thead>
              {!from?.includes("Rtn") ? (
                <>
                  <th width="150" className="ps-4">
                    Date
                  </th>
                  <th width="150" className="ps-4">
                    Doc No.
                  </th>
                  {!from && <th className="text-center">Items</th>}
                  <th className="text-center">Narration</th>
                  <th width="60" className="text-end pe-4"></th>
                </>
              ) : (
                <>
                  <th width="100">Code</th>
                  <th width="300" className="text-start ps-4">
                    Name
                  </th>
                  <th>Qty</th>
                  <th>P. Rate</th>
                  <th>Value</th>
                  <th>Tax</th>
                  <th></th>
                </>
              )}
            </thead>
            <tbody>
              {!from?.includes('Rtn') && searchedList?.length > 0 ? (
                searchedList?.map((data, i) => {
                  return (
                    <>
                      <tr key={i ? i : 0}>
                        <td width="150" className="text-start ps-2">
                          {from !== "acc"
                            ? new Date(
                                data?.date
                              ).toLocaleDateString()
                            : new Date(
                                data?.created_at
                              ).toLocaleDateString()}
                        </td>
                        <td width="150" className="text-start ps-3">
                          {from ? data?.voucher_number : data?.code}
                        </td>
                        {!from && (
                          <td className="text-center">{data?.total_items}</td>
                        )}
                        <td className="text-center">{data?.narration}</td>
                        <td className="ps-2">
                          <div className="d-flex gap-4 p-0 pe-3">
                            {((from==='acc' && !permissions.include(1301)) || (from==='production' && !permissions.include(1393))) &&
                            <img
                              src={deleteBtn}
                              className="cursor"
                              onClick={() => handleDelete(data)}
                              alt="editBtn"
                            />
                            }
                            {((from==='acc' && !permissions.include(1300)) || (from==='production' && !permissions.include(1391))) &&
                            <img
                              src={editBtn}
                              className="cursor"
                              onClick={() => handleEditClick(data)}
                              alt="editBtn"
                            />
                            }
                          </div>
                        </td>
                      </tr>
                    </>
                  );
                })
              ) : !from?.includes('Rtn') ? (
                <tr>
                  <td colSpan={5} className="border-0">{`No ${
                    from === "acc" ? "Account Journal" :from =="production"?"Production":"Stock Journal"
                  } Transactions`}</td>
                </tr>
              ) : (
                from?.includes('Rtn') &&
                searchedList.length > 0 &&
                searchedList.map((data, i1) => {
                  return (
                    <>
                      <tr className="first-child" key={i1}>
                        <td>
                          {new Date(data?.date).toLocaleDateString()}
                        </td>
                        <td className="text-start ps-4" colSpan={6}>
                          {data.documents_no}
                        </td>
                      </tr>
                      {data[from == 'salesRtn'?'sales_item':'items']?.map((item, indexofItem) => {
                        const handleSelection = (checked) => {
                          let tempListItemSelected = [...selectedItemList];
                          if (checked) {
                            tempListItemSelected.push(item);
                            setSelectedItemList([...tempListItemSelected]);
                          } else {
                            let index = tempListItemSelected.findIndex(
                              (x) => x.id === item.id
                            );
                            tempListItemSelected.splice(index, 1);
                            setSelectedItemList([...tempListItemSelected]);
                          }
                        };
                        return (
                          <tr key={indexofItem}>
                            <td>{item.code}</td>
                            <td className="text-start">{item.item_name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.rate}</td>
                            <td>{item.value}</td>
                            <td>{item.tax_gst}</td>
                            <td>
                              <Checkbox
                                checked={
                                  selectedItemList?.filter(
                                    (x) => x.id === item.id
                                  ).length > 0
                                    ? true
                                    : false
                                }
                                onChange={(e, { checked }) =>
                                  handleSelection(checked)
                                }
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        <div className="gap-2 d-flex w-100 justify-content-end p-0">
          <div
            onClick={() => setShow(false)}
            className="btn col-2 btn-dark py-1 px-5 mt-3"
          >
            Close
          </div>
          {from?.includes('Rtn') && (
            <div
              onClick={handePurchaseReturnSubmit}
              className="btn col-2 btn-dark py-1 px-5 mt-3"
            >
              Submit
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

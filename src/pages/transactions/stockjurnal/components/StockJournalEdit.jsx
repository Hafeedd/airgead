import { Form } from "react-bootstrap";
import searchIcon from "../../../../assets/icons/search.png";
import deleteBtn from "../../../../assets/icons/delete.svg";
import editBtn from "../../../../assets/icons/edit-black.svg";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAccJournalServices from "../../../../services/transactions/accJournalServices";
import useStockJournalServices from "../../../../services/transactions/stockJournal";

export const StockJournalEdit = (props) => {
  const { list, getData, setShow, from, setEdit, handleClearAll,productionPage } = props;

  const [tempStockJList, setTempStockJList] = useState([]);
  const [search, setSearch] = useState("");
  const [date, setDate] = useState({
    start: new Date().toISOString().slice(0,10),
    end:  new Date().toISOString().slice(0,10),
  });

  const {deleteAccJournal} = useAccJournalServices()
  const {deleteStockJ} = useStockJournalServices()
 
  const handleEditClick = (data) => {
    handleClearAll();
    setEdit(data);
    setShow(false);
  };

  useEffect(() => {
    let tempList;
    let filterList;
    filterList = [...list];
    if (date.start && date.end) {
      let startDate = new Date(date.start.slice(0, 10));
      let endDate = new Date(date.end.slice(0, 10));
      tempList = filterList?.filter((x) => {
        console.log(x)
        let dateOfItem = new Date(x.created_at||x.date);
        if (dateOfItem >= startDate && dateOfItem <= endDate) {
          return true;
        }
        return false;
      });
      if(from=="acc")
        setTempStockJList(tempList.reverse());
      else
        setTempStockJList(tempList)
    }
  }, [date, list]);

  useEffect(() => {
    let tempList;
    let filterList;
    filterList = list;
    if (list?.length > 0) {
      tempList = filterList?.filter((x) => {
        let a = "code";
        if (from === "acc") a = "voucher_number";
        if (x?.[a]?.toLowerCase().toString()?.includes(search?.toLowerCase())) {
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
      setTempStockJList(tempList);
    }
  }, [search, from, list]);

  const handleDeleteData = async (id) => {
    try {
      let response;
      if (from == "acc") response = await deleteAccJournal(id);
      else response = await deleteStockJ(id)
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

  return (
    <div className="p-0">
      {productionPage!=true?<div className="stockJ-edit rounded-top-2 py-2 ps-3">Journal Details</div>:<div className="stockJ-edit rounded-top-2 py-2 ps-3">Productions List</div>}
      <div className="row mx-0 p-2 px-3">
      <Form.Group className="col-4 col-3 pe-4 ps-0 mx-0 d-flex align-items-start mt-1">
          <Form.Label className="col-2 purchase-input-label align-middle">
            From
          </Form.Label>
          <Form.Control
            required
            onChange={(e) => setDate({ ...date, end: e.target.value })}
            name="fk_supplier"
            className="purchase-input-text me-2"
            placeholder="Document number"
            type="date"
            value={date.end}
          />
        </Form.Group>
        <Form.Group className="col-4 col-3 pe-4 ps-0 mx-0 d-flex align-items-start mt-1">
          <Form.Label className="col-2 purchase-input-label align-middle">
            From
          </Form.Label>
          <Form.Control
            required
            onChange={(e) => setDate({ ...date, start: e.target.value })}
            name="fk_supplier"
            className="purchase-input-text me-2"
            placeholder="Document number"
            type="date"
            value={date.start}
          />
        </Form.Group>
        
      </div>
      <div className="p-2 px-3 row mx-0">
        <div className="bg-dark py-2 ps-4 rounded-top-1">
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
        </div>
        <div className="stockJ-edit-table-cont px-0">
          <table className="stockJ-edit-table table">
            <thead>
              <th width="150" className="ps-4">
                Date
              </th>
              <th width="150" className="ps-4">
                Doc No.
              </th>
              {!from && <th className="text-center">Items</th>}
              <th className="text-center">Narration</th>
              <th width="60" className="text-end pe-4"></th>
            </thead>
            <tbody>
              {tempStockJList?.length > 0 &&
                tempStockJList?.map((data, i) => {
                  const handleDelete = async (e) => {
                    Swal.fire({
                      title: "Delete",
                      text: `Are you sure, you want to delete ${
                        from == "acc" ? "journal" : "stock"
                      } ${data.documents_no|| data.voucher_number}?`,
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

                  return (
                    <tr key={i ? i : 0}>
                      <td width="150" className="text-start ps-2">
                        {!from
                          ? data?.date?.slice(0, 10)
                          : data?.created_at.slice(0, 10)}
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
                          <img
                            src={deleteBtn}
                            className="cursor"
                            onClick={() => handleDelete(data)}
                            alt="editBtn"
                          />
                          <img
                            src={editBtn}
                            className="cursor"
                            onClick={() => handleEditClick(data)}
                            alt="editBtn"
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <span className="col-10" />
        <div
          onClick={() => setShow(false)}
          className="btn col-2 btn-dark py-1 px-5"
        >
          Close
        </div>
      </div>
    </div>
  );
};

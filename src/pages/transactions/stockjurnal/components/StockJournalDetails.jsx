import { Form } from "react-bootstrap";
import { MdMovieEdit } from "react-icons/md";
import { TfiEmail, TfiPrinter } from "react-icons/tfi";
import { BsWhatsapp, BsFiletypePdf } from "react-icons/bs";
import { BiSolidTrashAlt } from "react-icons/bi";
import { RiFileExcel2Line } from "react-icons/ri";
import { Dropdown } from "semantic-ui-react";
import { useState } from "react";
import Swal from "sweetalert2";
import useOnKey from "../../../../hooks/onKeyFunct/onKeyFunct";
import delteIcon from "../../../../assets/icons/delete.svg";

export const StockJournalDetails = (props) => {
  const {
    setShowJournalFilter,
    stockJAdd,
    setStockJAdd,
    edit,
    itemNameList,
    stockTableItem,
    setStockTableItem,
    handleSubmit,
    handleResetStockTabe,
    stockTableItemList,
    setStockTableItemList,
    handleClearAll,
    unitList,
    handleAddToTableList,
    tableEdit,
    setTableEdit,
    stockJList,
    setEdit,
  } = props;

  const [ref, setRef] = useState(null);

  const [ handleKeyDown, formRef ] = useOnKey(ref, setRef);

  const AdjustTableHeight = () => {
    let a = [];
    for (let i = 0; i < 7 - stockTableItemList.length; i++) {
      a.push(
        <tr className="border-0">
          <th colSpan={10} className="stockJadj-table border-0"></th>
        </tr>
      );
    }
    return a;
  };

  const handleKeyWithSubmit = (e) => {
    if (e.type == "keydown") if (e.key == "Enter") {
    handleAddToTableList();
    e.preventDefault();
    handleKeyDown(e);
  }
  };

  // const handleTrashButton = async () => {
  //   handleResetStockTabe();
  // };

  const handleChangeTableItem = (e, data) => {
    if (data && data?.name == "code") {
      let item_data = data.options.filter((x) => x.value === data.value)[0];
      setStockTableItem((data) => ({
        ...data,
        ["code"]: item_data?.value,
        unit: item_data?.unit,
        name: item_data?.name,
        cost: item_data?.cost,
        value: item_data?.retail_rate,
      }));
    } else if (e.target.value === "")
      setStockTableItem((data) => ({ ...data, [e.target.name]: null }));
    else
      setStockTableItem((data) => ({
        ...data,
        [e.target.name]: e.target.value,
      }));
  };

  const handleChange = (e, data) => {
    if (data && data?.name == "code") {
      let item_data = data.options.filter((x) => x.value === data.value)[0];
      setStockJAdd((data) => ({
        ...data,
        ["code"]: item_data?.value,
        unit: item_data?.unit,
      }));
    } else if (e.target.value === "")
      setStockJAdd({ ...stockJAdd, [e.target.name]: null });
    else setStockJAdd((data) => ({ ...data, [e.target.name]: e.target.value }));
    if(e.target.name === "date"){
      setStockJAdd((data) => ({ ...data, date: new Date(e.target.value).toISOString() }));
    }
  };

  const search = (options, searchValue) => {
    searchValue = searchValue.toUpperCase();
    return options.filter((option) => {
      return (
        option?.name?.toString()?.includes(searchValue) ||
        option.description?.toString()?.includes(searchValue)
      );
    });
  };

  const handlePrev = () => {
    if (stockJList?.length > 0) {
      if (!edit) {
        setEdit(stockJList[0]);
      } else {
        let ind = stockJList?.findIndex((x) => edit.id == x.id);
        if (ind !== stockJList?.length - 1) {
          handleClearAll();
          // handleResetStockTabe();
          setEdit(stockJList[ind + 1]);
        } else {
          Swal.fire("No more stock to edit", "go for next", "warning");
        }
      }
    } else {
      setEdit(false);
      Swal.fire("No more stock to edit", "go for next", "warning");
    }
  };

  const handleNext = () => {
    if (!edit) {
      Swal.fire("No more stock to edit", "go for prev", "warning");
    } else if (edit?.id == stockJList[0].id) {
      setEdit(false);
      handleClearAll();
    } else {
      handleClearAll();
      let ind = stockJList?.findIndex((x) => edit.id == x.id);
      if (ind !== stockJList[0]) {
        setEdit(stockJList[ind - 1]);
      } else {
        setEdit(false);
        Swal.fire("No more stock to edit", "go for prev", "warning");
      }
    }
  };

  return (
    <div className="stock-jdetails-cont p-1 ps-4 rounded-1 w-100 bg-light h-100">
      Stock Journal
      <div className="stock-entry row mx-0 px-0 pt-1">
        <Form.Group className="col-4 col-3 pe-4 ps-0 mx-0 d-flex align-items-start mt-1">
          <Form.Label className="col-2 purchase-input-label pb-1">
            Doc no.
          </Form.Label>
          <Form.Control
            onChange={handleChange}
            required
            name="code"
            value={stockJAdd.code || ""}
            className="purchase-input-text me-2"
            placeholder="Document number"
            type="text"
          />
          <div
            onClick={() => setShowJournalFilter(true)}
            className="col-1 col-2 p-1 bg-dark rounded-1 btn py-0 text-light "
          >
            <MdMovieEdit size={18} className="mb-1" />
          </div>
        </Form.Group>
        <Form.Group className="col-4 col-3 pe-4 ps-0 mx-0 d-flex align-items-start mt-1">
          <Form.Label className="col-2 purchase-input-label pb-1">
            Date
          </Form.Label>
          <Form.Control
            onChange={handleChange}
            required
            name="date"
            value={stockJAdd.date?.slice(0,10)}
            className="purchase-input-text me-2"
            placeholder="Document number"
            type="date"
          />
        </Form.Group>
        <Form.Group className="col-3 col-4 col-3 pe-4 ps-0 mx-0 d-flex align-items-start mt-1">
          <Form.Label className="col-2 purchase-input-label pb-1">
            Staff
          </Form.Label>
          <Form.Control
            onChange={handleChange}
            required
            name="salesman"
            value={stockJAdd.salesman || ""}
            className="purchase-input-text me-2"
            placeholder="staff"
            type="text"
          />
        </Form.Group>
        <div
          style={{ background: "#4B4B4B" }}
          className="btn rounded-1 text-light col-1 col-2 py-0 mt-3 me-4"
        >
          <BsFiletypePdf className="me-2 mb-1" size={18} />
          PDF
        </div>
        <div
          style={{ background: "#4B4B4B" }}
          className="btn rounded-1 text-light col-1 col-2 py-0 mt-3 me-4"
        >
          <TfiEmail size={18} className="me-2 mb-1" />
          Email
        </div>
        <div
          style={{ background: "#4B4B4B" }}
          className="btn rounded-1 text-light col-1 col-2 py-0 mt-3 me-4"
        >
          <RiFileExcel2Line size={18} className="me-2 mb-1" />
          Excel
        </div>
        <div
          style={{ background: "#4B4B4B" }}
          className="btn rounded-1 text-light col-1 col-2 py-0 mt-3 me-4"
        >
          <BsWhatsapp size={18} className="me-2 mb-1" />
          Whatsapp
        </div>
        <div
          style={{ background: "#4B4B4B" }}
          className="btn rounded-1 text-light col-1 col-2 py-0 mt-3"
        >
          <TfiPrinter size={18} className="me-2 mb-1" />
          Print
        </div>
        <div className="col-3 mx-0 col-4 text-small text-end mt-3 px-0">
          {/* <div
            onClick={handleAddToTableList}
            style={{ background: "#4A00A8" }}
            className="btn text-small text-light py-1 me-3"
          >
            + Add Stock
          </div> */}
        </div>
      </div>
      <div className="pe-4 stock-journal-table-cont mt-2">
        <table className=" table mb-0 stock-journal-table w-100">
          <thead>
            <th colSpan={2} width="100" className="ps-4 text-start">
              Item Name
            </th>
            <th width={"120"} className="">
              Qty
            </th>
            <th width={"120"} className="">
              Ut
            </th>
            <th width={"120"} className="">
              Cost
            </th>
            <th width={"110"} className="">
              Value
            </th>
            {/* <th width={'130'} className="">Godown</th> */}
            {/* <th width={"180"} className="">
              Stock in/ Stock Less
            </th> */}
            <th width={"130"}></th>
            <th width={"80"}></th>
          </thead>
          <tbody>

            {/* list part ----------------------------------------------------------start */}
            {stockTableItemList?.length > 0 &&
              stockTableItemList?.map((data, i) => {

                const handleEdit = (e, dropDownData) => {
                  let tempData = { ...data };
                  if (dropDownData) {
                    let item_data = dropDownData.options.filter(
                      (x) => x.value === dropDownData.value
                    )[0];
                    tempData = {
                      ...tempData,
                      code: item_data?.value,
                      unit: item_data?.unit,
                    };
                  } else if (e.target.value == "")
                    tempData = { ...tempData, [e.target.name]: null };
                    else tempData = { ...data, [e.target.name]: e.target.value };                  
                  let tempTable = stockTableItemList || [];
                  tempTable.splice(i, 1, tempData);
                  setStockTableItemList([...tempTable]);
                };

                const handleRemove = () =>{
                  let tempList = stockTableItemList||[]
                  tempList.splice(i,1)
                  setStockTableItemList([...tempList])
                }

                return (
                  <tr key={i}>
                    <td colSpan={2}>
                      <div className="item-search-drop">
                        <Dropdown
                          clearable
                          selection
                          required
                          search={search}
                          onKeyDown={handleKeyDown}
                          onChange={handleEdit}
                          className="purchase-input-text table-drop d-flex align-items-center py-0 form-control"
                          name="code"
                          placeholder="select"
                          value={data?.code || ""}
                          options={itemNameList}
                        />
                      </div>
                    </td>
                    <td className="align-middle">
                      <input
                        onChange={handleEdit}
                        value={Math.abs(data.qty) || ""}
                        className="col-7 py-2 rounded-2 border-0 text-center "
                        name="qty"
                        type="text"
                      />
                    </td>
                    <td className="align-middle">
                      <select
                        disabled
                        name="unit"
                        style={{
                          WebkitAppearance: "none",
                          fontSize: "10px",
                          padding: "3.5px 1px",
                        }}
                        className="purchase_input border-0 w-100 text-center"
                        value={data.unit || ""}
                      >
                        {unitList &&
                          unitList.map((x, i) => (
                            <option key={i} value={x.value}>
                              {x.text}
                            </option>
                          ))}
                      </select>
                    </td>
                    <td className="align-middle">{data.cost || "0.00"}</td>
                    <td className="align-middle">{data.value || "0.00"}</td>
                    {/* <td className="align-middle">{data.godown||'0.00'}</td> */}
                    {/* <td className="align-middle">
                    {data.unit || ''}
                  </td> */}
                    <td className="align-middle">
                      <select
                        onChange={handleEdit}
                        className="add-less-btn"
                        value={data.qty_type || "add"}
                        name="qty_type"
                      >
                        <option value="add">Add</option>
                        <option value="less">Less</option>
                      </select>
                    </td>
                    <td className="align-middle ps-0 text-start">
                      <div
                        className="btn p-0 text-start"
                        onClick={() => handleRemove()}
                      >
                        <img src={delteIcon} alt="editbtn" />
                      </div>
                    </td>
                  </tr>
                );
              })}
            {/* list part ----------------------------------------------------------end */}

            {/* entry part ---------------------------------------------------------start */}
            <tr ref={formRef} className="stock-journal-entry">
              <td colSpan={2} className="bg-transparent">
                <div className="item-search-drop ">
                  <Dropdown
                    clearable
                    selection
                    required
                    search={search}
                    onKeyDown={handleKeyDown}
                    onChange={handleChangeTableItem}
                    className="purchase-input-text table-drop d-flex align-items-center py-0 form-control"
                    name="code"
                    placeholder="select"
                    value={stockTableItem?.code || ""}
                    options={itemNameList}
                  />
                </div>
              </td>
              <td className="align-middle">
                <input
                  onChange={handleChangeTableItem}
                  onKeyDown={handleKeyDown}
                  required
                  name="qty"
                  value={stockTableItem?.qty || ""}
                  className="col-7 py-2 rounded-2 border-0 text-center bg-transparent"
                  placeholder="Enter"
                  type="text"
                />
              </td>
              <td className="align-middle">
                <select
                  disabled
                  style={{
                    WebkitAppearance: "none",
                    fontSize: "10px",
                    padding: "3.5px 1px",
                  }}
                  className="purchase_input border-0 w-100 text-center"
                  value={stockTableItem?.unit || ""}
                  name="unit"
                >
                  {unitList &&
                    unitList.map((x, i) => (
                      <option key={i} value={x.value}>
                        {x.text}
                      </option>
                    ))}
                </select>
              </td>
              <td className="align-middle">{stockTableItem?.cost || "0.00"}</td>
              <td className="align-middle">
                {stockTableItem?.value || "0.00"}
              </td>
              <td className="align-middle">
                <select
                  // onFocus={(e)=>console.log(e.target)}
                  className="add-less-btn"
                  onChange={handleChangeTableItem}
                  onKeyDown={handleKeyDown}
                  name="qty_type"
                  value={stockTableItem?.qty_type || "add"}
                >
                  <option value="add">Add</option>
                  <option value="less">Less</option>
                </select>
              </td>
              {/* {tableEdit && !edit ? (
                <td className="align-middle ps-0 text-start">
                  <BiSolidTrashAlt
                    size={20}
                    onClick={() => handleTrashButton()}
                  />
                </td>
              ) : (
                tableEdit && <td></td>
              )}
              {!tableEdit && <td className="align-middle"></td>} */}
              <td className="text-center">
              <button
                className="btn-focus border-0 btn-sm rounded-1 bg-dark text-light fs-5"
                onClick={handleAddToTableList}
                onKeyDown={handleKeyWithSubmit}
              >
                +
              </button>
              </td>
            </tr>
            {/* entry part ---------------------------------------------------------end */}

           
            <AdjustTableHeight />
            <tr>
              <td className="p-2 text-start">
                <div
                  onClick={handlePrev}
                  className="btn stock-next-prev-btn me-2"
                >
                  {"< Previous"}
                </div>
                <div onClick={handleNext} className="btn stock-next-prev-btn">
                  {"Next >"}
                </div>
              </td>
              <td className="p-2 text-center align-middle">Total</td>
              <td className="align-middle">
                <div className="purchase-input-text drop shadows">
                  {stockJAdd?.total_qty || ""}
                </div>
              </td>
              <td></td>
              <td></td>
              <td className="align-middle">
                <div className="purchase-input-text drop shadows">
                  {stockJAdd?.total_value || ""}
                </div>
              </td>
              <td className="align-middle" colSpan={2}>
                <div className="row">
                  <div
                    onClick={handleClearAll}
                    className="col-5 col-6 stock-jsave-btn btn mx-2 d-flex justify-content-center"
                  >
                    Clear
                  </div>
                  <div
                    onClick={handleSubmit}
                    className="col-5 col-6 stock-jsave-btn btn d-flex justify-content-center"
                  >
                    {edit ? "Update" : "Save"}
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Form.Group className="col-3 col-4 col-3 pe-4 ps-0 mx-0 d-flex align-items-start mt-3 pb-2">
        <Form.Label className="col-3 purchase-input-label pb-1">
          Narration
        </Form.Label>
        <Form.Control
          onChange={handleChange}
          required
          from="stockJournal"
          name="narration"
          value={stockJAdd.narration || ""}
          className="purchase-input-text me-2"
          placeholder="Narration"
          type="text"
        />
      </Form.Group>
    </div>
  );
};

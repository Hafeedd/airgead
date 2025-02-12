import React, { useState } from "react";
import useOnKey from "../../../../hooks/onKeyFunct/onKeyFunct";
import { BsTrashFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { Dropdown } from "semantic-ui-react";
import Swal from "sweetalert2";

export const AccJournalTable = (props) => {
  const {
    edit,
    setEdit,
    accJnlList,
    handleClearAll,
    accJnlTable,
    setAccJnlTable,
    accNameList,
    tableList,
    setTableList,
    handleResetAccTable,
    accJnlAdd,
    tableEdit,
    setTableEdit,
  } = props;
  const [ref, setRef] = useState(null);

  const [handleKeyDown, formRef] = useOnKey(ref, setRef);

  const AdjustTableHeight = () => {
    let a = [];
    for (let i = 0; i < 8 - tableList?.length || 0; i++)
      a.push(
        <tr>
          <td
            colSpan={5}
            className="ps-4 border-0 text-start"
            style={{ height: "2.3rem", borderBottom: "0px" }}
          ></td>
        </tr>
      );
    return a;
  };

  const handleChangeTableItem = (e, data) => {
    if (
      (e.target.name == "debit" && accJnlTable.credit) ||
      (e.target.name == "credit" && accJnlTable.debit)
    ) {
      return 0;
    }
    if (data && data?.name == "code") {
      let acc_data = data.options.filter((x) => x.value === data.value)[0];
      setAccJnlTable((data) => ({
        ...data,
        ["code"]: acc_data?.value,
        name: acc_data?.text,
      }));
    } else if (e.target.value === "")
      setAccJnlTable((data) => ({ ...data, [e.target.name]: null }));
    else
      setAccJnlTable((data) => ({
        ...data,
        [e.target.name]: e.target.value,
      }));
  };

  const search = (options, searchValue) => {
    searchValue = searchValue.toUpperCase();
    let afterSearch = options.filter((option) => {
      return (
        option?.name?.toString()?.includes(searchValue) ||
        option.description?.toString()?.includes(searchValue)
      );
    });
    return afterSearch;
  };

  const handleAddToTableList = async () => {
    const values = Object.values(accJnlTable).filter((x) => x !== null);

    if (values.length < 3) {
      Swal.fire({
        title: "Warning !",
        text: "Please select an Account",
        showConfirmButton: false,
        timer: 1700,
      });
      return 0;
    }

    if (values?.length > 1) {
      const tempList = [...tableList];
      tempList.push(accJnlTable);
      setTableList([...tempList]);
      handleResetAccTable();
    }
  };

  const handleLastKeyDown = (e) => {
    if (e.type == "keydown" && e?.key == "Enter") {
      handleAddToTableList();
      handleKeyDown(e);
    }
  };

  const handlePrev = () => {
    if (accJnlList?.length > 0) {
      if (!edit) {
        setEdit(accJnlList[0]);
      } else {
        let ind = accJnlList?.findIndex((x) => edit.id == x.id);
        if (ind !== accJnlList?.length - 1) {
          handleClearAll();
          // handleResetStockTabe();
          setEdit(accJnlList[ind + 1]);
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
    } else if (edit?.id == accJnlList[0].id) {
      setEdit(false);
      handleClearAll();
    } else {
      handleClearAll();
      let ind = accJnlList?.findIndex((x) => edit.id == x.id);
      if (ind !== accJnlList[0]) {
        setEdit(accJnlList[ind - 1]);
      } else {
        setEdit(false);
        Swal.fire("No more stock to edit", "go for prev", "warning");
      }
    }
  };

  return (
    <div className="acc-journal-table-cont" style={{ paddingRight: "2.4rem" }}>
      <table className="table acc-journal mb-0">
        <thead>
          <tr>
            <th width="270" className="text-start ps-4">
              Item Name
            </th>
            <th width="300">Description</th>
            <th width="180">Debit</th>
            <th width="180">Credit</th>
            <th width="90">
              <div
                onClick={handleAddToTableList}
                className="btn btn-sm py-1 px-4 text-dark bg-light"
              >
                Add
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {/* table item list --------------------------------------------------start */}
          {tableList.length > 0 &&
            tableList.map((data, i) => {
              const handleEdit = (e, dropDownData) => {
                let tempList = [...tableList];
                let tempData = { ...data };
                if (dropDownData) {
                  let item_data = dropDownData.options.filter(
                    (x) => x.value === dropDownData.value
                  )[0];
                  console.log(item_data);
                  tempData = {
                    ...tempData,
                    edited: true,
                    name: item_data?.text || null,
                    code: item_data?.value || null,
                  };
                } else if (e.target.value == "")
                  tempData = { ...tempData, [e.target.name]: null };
                else
                  tempData = {
                    ...tempData,
                    edited: true,
                    [e.target.name]: e.target.value,
                  };

                tempList.splice(i, 1, tempData);
                setTableList([...tempList]);
              };

              const handleRemove = () => {
                let tempList = tableList || [];
                tempList.splice(i, 1);
                setTableList([...tempList]);
              };

              return (
                <tr key={i} className="acc-jnl-input-tr">
                  <td className="ps-3">
                    {/* <input onKeyDown={handleKeyDown} className="text-start ps-2" /> */}
                    <div className="item-search-drop">
                      <Dropdown
                        clearable
                        selection
                        required
                        search={search}
                        onKeyDown={handleKeyDown}
                        onChange={handleEdit}
                        className="acc-journal-search table-drop d-flex align-items-center py-0 form-control"
                        name="code"
                        placeholder="SELECT"
                        value={data.code || ""}
                        options={accNameList.length > 0 ? accNameList : []}
                      />
                    </div>
                  </td>
                  <td>
                    <input
                      name="desc"
                      value={data?.desc?.toUpperCase() || ""}
                      placeholder="..."
                      onChange={handleEdit}
                      onKeyDown={handleKeyDown}
                    />
                  </td>
                  <td>
                    <input
                      name="debit"
                      value={data?.debit || ""}
                      placeholder="0"
                      onChange={handleEdit}
                      onKeyDown={handleKeyDown}
                    />
                  </td>
                  <td>
                    <input
                      name="credit"
                      value={data?.credit || ""}
                      placeholder="0"
                      onChange={handleEdit}
                      onKeyDown={handleKeyDown}
                    />
                  </td>
                  <td>
                    <BsTrashFill
                      onClick={handleRemove}
                      size={21}
                      className="p-0 m-0 text-danger cursor"
                    />
                  </td>
                </tr>
              );
            })}

          {/* table item list --------------------------------------------------end */}

          {/* table item add ---------------------------------------------------start */}

          <tr ref={formRef} className="acc-jnl-input-tr entry-part">
            <td className="ps-3">
              {/* <input onKeyDown={handleKeyDown} className="text-start ps-2" /> */}
              <div className="item-search-drop">
                <Dropdown
                  clearable
                  selection
                  required
                  search={search}
                  onKeyDown={handleKeyDown}
                  onChange={handleChangeTableItem}
                  className="acc-journal-search table-drop d-flex align-items-center py-0 form-control"
                  name="code"
                  placeholder="SELECT"
                  value={accJnlTable?.code || ""}
                  options={accNameList.length > 0 ? accNameList : []}
                />
              </div>
            </td>
            <td>
              <input
                name="desc"
                value={accJnlTable?.desc || ""}
                placeholder="type here"
                onChange={handleChangeTableItem}
                onKeyDown={handleKeyDown}
              />
            </td>
            <td>
              <input
                name="debit"
                value={accJnlTable?.debit || ""}
                placeholder="type here"
                onChange={handleChangeTableItem}
                onKeyDown={handleKeyDown}
              />
            </td>
            <td>
              <input
                name="credit"
                value={accJnlTable?.credit || ""}
                placeholder="type here"
                onChange={handleChangeTableItem}
                onKeyDown={handleKeyDown}
              />
            </td>
            <td>
              <button
                className="btn-focus border-0 btn-sm rounded-1 bg-dark text-light fs-5"
                onClick={handleAddToTableList}
                onKeyDown={handleLastKeyDown}
              >
                +
              </button>
            </td>
          </tr>

          {/* table item add ---------------------------------------------------end */}
          <AdjustTableHeight />
          <tr>
            <td className="text-start p-1 ps-4 align-middle">
              <div
                style={{ background: "#4A00A8" }}
                className="col-4 col-3 text-light cursor text-center px-2 py-1"
                onClick={handlePrev}
              >
                {"< " + " Previous"}
              </div>
            </td>
            <td className="text-end align-middle">Total</td>
            <td className="py-1 align-middle">
              <input
                value={accJnlAdd?.total_debit || 0}
                disabled
                className="acc-journal-input text-center m-0"
              />
            </td>
            <td className="py-1 align-middle">
              <input
                value={accJnlAdd?.total_credit || 0}
                disabled
                className="acc-journal-input text-center m-0"
              />
            </td>
            <td className="py-1 align-middle">
              <div
                style={{ background: "#4A00A8" }}
                onClick={handleNext}
                className="col-10 text-light cursor text-center px-2 py-1"
              >
                {"Next " + " >"}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

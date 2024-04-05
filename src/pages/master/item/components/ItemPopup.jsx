import React, { useState } from "react";
import { initTableHeadList } from "../initialData/ItemData";
import deleteBtn from "../../../../assets/icons/delete-white.svg";
import useOnKey from "../../../../hooks/onKeyFunct/onKeyFunct";

export const ItemPopup = (props) => {
  const {
    popup,
    handleChange,
    popupInput,
    popupList,
    setPopupInput,
    setPopupList,
    setPopup,
  } = props;
  const [ref2, setRef2] = useState();

  const [handleTableKeyDown, tableFormRef] = useOnKey(ref2, setRef2);

  const handleaddToList = (e) => {
    if (e.key === "Enter") {
      let tempList = [...popupList];
      tempList.unshift(popupInput);
      setPopupInput({});
      setPopupList([...tempList]);
      handleTableKeyDown(e);
    }
  };

  return (
    <div className="text-light pb-1">
      <div className="text-capitalize">{popup}</div>
      <div className="unit_modal_body mt-2 px-3 pb-2 px-0">
        <table className="custom-table-2 position-relative">
          <thead className="tabel-head">
            <tr>
              {initTableHeadList[popup]?.map((data, i) => (
                <th key={i}>{data.title}</th>
              ))}
              <th></th>
            </tr>
          </thead>
          <tbody className="rounded-2">
            <tr ref={tableFormRef} className="table-head-input">
              {initTableHeadList[popup]?.map((data, i) => (
                <td key={i}>
                  <input
                    onKeyDown={handleTableKeyDown}
                    onChange={handleChange}
                    name={data.state}
                    value={popupInput[data.state] || ""}
                    type={data.type ? data.type : "number"}
                    className="w-100 text-light px-2"
                  />
                </td>
              ))}
              <th className="col col-1 cursor text-center">
                <img
                  onClick={() => setPopupInput({})}
                  src={deleteBtn}
                  alt="deletebtn"
                />
              </th>
              <th className="btn-td text-center">
                <button
                  onKeyDown={handleaddToList}
                  className="add_unit_btn btn"
                >
                  {popup == "unit" ? "Add Unit" : "+ Add"}
                </button>
              </th>
            </tr>
            {popupList?.map((data, i) => {
              const handleChangeTable = (e) => {
                let tempData = data,
                  tempList = [...popupList];
                let name = e.target.name;
                let value = e.target.value;
                tempData = { ...tempData, [name]: value };
                tempList.splice(i, 1, tempData);
                setPopupList([...tempList]);
              };
              const handleDelete = () => {
                let tempList = [...popupList];
                tempList.splice(i, 1);
                setPopupList(tempList);
              };
              //   console.log(data)
              return (
                <tr key={i}>
                  {initTableHeadList[popup]?.map((item, key) => {
                    return (
                      <td key={key}>
                        <input
                          onKeyDown={handleTableKeyDown}
                          onChange={handleChangeTable}
                          name={item.state}
                          value={data[item.state] || ""}
                          type={item.type ? item.type : "number"}
                          className="w-100 text-light px-2 py-2"
                        />
                      </td>
                    );
                  })}
                  <td className="col col-1 cursor bg-transparent text-center">
                    <img
                      onClick={handleDelete}
                      src={deleteBtn}
                      alt="deletebtn"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-3 text-end">
        <button
          onClick={()=>setPopup(false)}
          style={{ background: "#464646" }}
          className="btn text-light fs-6 px-3 btn-sm"
        >
          Done
        </button>
      </div>
    </div>
  );
};

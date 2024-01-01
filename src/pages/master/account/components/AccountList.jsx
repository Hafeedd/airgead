import React, { useEffect, useState } from "react";
import search from "../../../../assets/icons/search.png";
import editIcon from "../../../../assets/icons/edit-black.svg";

const AccountList = ({ listItem, handleEdit, handleDelete, toEdit }) => {
  const [searchedList, setSearchedList] = useState([]);

  useEffect(() => {
    setSearchedList(listItem);
  }, [listItem]);

  const handleSearch = async (e) => {
    console.log(listItem);
    try {
      let tempData,
        tempList = listItem;
      if (listItem) {
        let value = e.target.value.toLocaleLowerCase();
        if (value != "") {
          if (listItem.length > 0) {
            tempData = tempList?.filter((x) => {
              let searchInString = `${
                x.code?.toLocaleLowerCase() + " " + x.name?.toLocaleLowerCase()
              }`;
              let search = searchInString?.includes(value);
              if (search) {
                return true;
              }
            });
            setSearchedList(tempData);
          }
        } else {
          setSearchedList(listItem);
        }
      }
    } catch {}
  };

  return (
    <div>
      <div className="row mx-0 px-4 my-2">
        <div className="col-2 col-3 px-0">
          <div className="item_seach_bar_cont rounded-2">
            <img src={search} className="search_img me-3 ms-2 py-2" />
            <input
              onChange={handleSearch}
              className="item_search_bar rounded-2 border-0 py-1"
              placeholder="Search"
              type="text"
            />
          </div>
        </div>
        <div className="col-2 d-flex align-item-center">
          <div
            // onClick={getData}
            className="btn fs-6 btn-sm btn-dark filter-btn"
          >
            Filter Here
          </div>
        </div>
      </div>
      <div
        className="item_add_cont p-0 table-scroller"
        style={{ borderRadius: "0.3125rem 0.3125rem 0rem 0rem" }}
      >
        <table className="table table-light custom-table">
          <thead>
            <tr>
              <th style={{ borderTopLeftRadius: "0.3125rem", width: "4rem" }}>
                No
              </th>
              <th className="text-start" style={{ width: "25rem" }}>
                A/C Name
              </th>
              <th className="text-start ps-2">Code</th>
              <th className="text-start ps-2">A/C Type</th>
              <th style={{ width: "15rem" }}>Cl. Balance</th>
              {/* <th style={{ width: "15rem" }}>Op. Balance</th> */}
              <th
                style={{ borderTopRightRadius: "0.3125rem", width: "5rem" }}
              ></th>
            </tr>
          </thead>
          <tbody>
            {searchedList?.length > 0 ? (
              searchedList?.map((data, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td className="text-start">{data?.name}</td>
                    <td className="text-start">{data?.code}</td>
                    <td className="text-start">{data?.account_type_one}</td>
                    <td>{data?.closing_balance || 0}</td>
                    {/* <td>{data?.opening_balance}</td> */}
                    <td>
                      <div
                        className="button"
                        onClick={(e) => handleEdit(data && data)}
                      >
                        <img src={editIcon} alt={"editbtn"} />
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td className="fs-5 text-center" colSpan={5}>
                  No Item Added Yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountList;

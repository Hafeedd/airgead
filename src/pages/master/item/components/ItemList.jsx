import searchIcon from "../../../../assets/icons/search.png";
import deleteBtn from "../../../../assets/icons/delete.svg";
import editBtn from "../../../../assets/icons/edit-black.svg";
import { useEffect, useState } from "react";

const ItemList = (props) => {
  const { list, handleEdit, handleDelete, getData } = props;

  const [searchedList, setSearchedList] = useState([]);

  useEffect(() => {
    setSearchedList(list);
  }, [list]);

  const handleSearch = async (e) => {
    try {
      let tempData,
        tempList = list;
      if (list) {
        let value = e.target.value.toLocaleLowerCase();
        if (value != "") {
          if (list.length > 0) {
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
          setSearchedList(list);
        }
      }
    } catch {}
  };

  return (
    <div>
      <div className="row mx-0 px-4 my-2">
        <div className="col-2 col-3 px-0">
          <div className="item_seach_bar_cont rounded-2">
            <img src={searchIcon} className="search_img me-3 ms-2 py-2" />
            <input
              onChange={handleSearch}
              className="item_search_bar rounded-2 border-0 py-1"
              placeholder="Search"
              type="text"
            />
          </div>
        </div>
        <div className="col-2 d-flex">
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
              <th style={{ borderTopLeftRadius: "0.3125rem" }}>No</th>
              <th>Code</th>
              <th className="text-start">Item Name</th>
              <th>HSN</th>
              <th>P.Rate</th>
              <th>Cost</th>
              <th>S.Rate</th>
              <th>Tax/GST</th>
              <th>MRP</th>
              <th width="50"></th>
              <th width="50" style={{ borderTopRightRadius: "0.3125rem" }}></th>
            </tr>
          </thead>
          <tbody>
            {searchedList?.length > 0 ? (
              searchedList.map((data, i) => {
                return (
                  <tr>
                    <td>{i + 1}</td>
                    <td>{data?.code}</td>
                    <td className="text-start">{data?.name}</td>
                    <td>{data?.hsn}</td>
                    <td>{data?.purchase_rate}</td>
                    <td>{data?.cost}</td>
                    <td>{data?.retail_rate}</td>
                    <td>{data?.tax_gst}</td>
                    <td>{data?.mrp_rate}</td>
                    <td>
                      <div
                        className="button"
                        onClick={(e) => handleDelete(data?.id, e)}
                      >
                        <img src={deleteBtn} alt="deletebtn" />
                      </div>
                    </td>
                    <td>
                      <div className="button" onClick={(e) => handleEdit(data)}>
                        <img src={editBtn} alt="Edit button" />
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td className="fs-5 text-center" colSpan={11}>
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

export default ItemList;

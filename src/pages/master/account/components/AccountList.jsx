import React, { useEffect, useState } from "react";
import search from "../../../../assets/icons/search.png";
import editIcon from "../../../../assets/icons/edit-black.svg";
import { HiOutlineTrash } from "react-icons/hi2";
import Swal from "sweetalert2";
import useAccountServices from "../../../../services/master/accountServices";
import deleteBtn from "../../../../assets/icons/delete.svg";

const AccountList = (props) => {
  const {
    listItem,
    permissions,
    handleEdit,
    loading,
    toEdit,
    loadAccountList,
  } = props;
  const [searchedList, setSearchedList] = useState([]);

  useEffect(() => {
    setSearchedList(listItem);
  }, [listItem]);

  const { deleteAccount } = useAccountServices();

  const handleSearch = async (e) => {
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

  const handleDeleteAccount = async (id) => {
    try {
      const response = await deleteAccount(id);
      if (response?.success) {
        Swal.fire({
          title: "Success",
          text: "Account deleted successfully",
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
        });
        loadAccountList();
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
        className={`item_add_cont p-0 table-scroller position-relative`}
        style={{ borderRadius: "0.3125rem 0.3125rem 0rem 0rem" }}
      >
        {loading && (
        <div className="loader-container w-100">
          <div className="loader"></div>
        </div>
      )}
        <table className={`table table-light custom-table ${loading&& "loading-cont-par-blur"}`}>
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
              {/* <th style={{ width: "1rem" }}></th> */}
              {/* <th style={{ width: "15rem" }}>Op. Balance</th> */}
              <th 
                style={{ borderTopRightRadius: "0.3125rem", width: "5rem" }}
              ></th>
            </tr>
          </thead>
          <tbody>
            {searchedList?.length > 0 ? (
              searchedList?.map((data, i) => {
                const handleDelete = async (e) => {
                  Swal.fire({
                    title: "Delete",
                    text: `Are you sure, you want to delete ${data.name}?`,
                    icon: "question",
                    showDenyButton: true,
                    showCancelButton: false,
                    confirmButtonText: "Yes",
                    denyButtonText: "Cancel",
                    showLoaderOnConfirm: true,
                    preConfirm: async () => {
                      await handleDeleteAccount(data?.id);
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
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td className="text-start">{data?.name}</td>
                    <td className="text-start">{data?.code}</td>
                    <td className="text-start">{data?.account_type_one}</td>
                    <td>{data?.closing_balance || ""}</td>
                    {/* <td>{data?.opening_balance}</td> */}
                    {/* <td>
                    </td> */}
                    <td>
                      <div className="button pe-3 gap-4 d-flex">
                        {!permissions.includes(1085)&&<img
                          src={deleteBtn}
                          alt="delete_btn"
                          onClick={(e) => handleDelete(e)}
                        />}
                       {!permissions.includes(1084)&&<img
                          src={editIcon}
                          alt={"editbtn"}
                          onClick={(e) => handleEdit(data && data)}
                        />}
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td className="fs-5 text-center" colSpan={6}>
                  No Accounts Added Yet
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

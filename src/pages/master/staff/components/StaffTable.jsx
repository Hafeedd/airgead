import React, { useEffect, useState } from "react";
import deleteBtn from "../../../../assets/icons/delete.svg";
import searchIcon from "../../../../assets/icons/search.png";
import editBtn from "../../../../assets/icons/edit-black.svg";
import { OverlayTrigger, ButtonToolbar, Popover } from "react-bootstrap";
import { useLocation } from "react-router";
import useStaffServices from "../../../../services/master/staffServices";
import Swal from "sweetalert2";

export const StaffTable = (props) => {
  const {
    permissions,
    handleEdit,
    search,
    loading,
    getData,
    handleDelete,
    staffList,
    payscale,
    handleStaffSelection,
    searchList,
    setSearchList,
    handleSelectAll,
    staffPayList,
    filter,
  } = props;

  const location = useLocation();

  const { deleteStaff } = useStaffServices();

  useEffect(() => {
    setSearchList(staffList);
  }, [staffList]);

  useEffect(() => {
    handleSearchFilter(filter);
  }, [filter]);

  const handleSearchFilter = (data) => {
    let tempList = [];
    let value;
    if (data?.staff_grade || data?.designation) {
      if (data.designation) {
        tempList = staffList?.filter((x) => {
          return x.fk_designation == data.designation;
        });
      } else if (data.staff_grade && !data.designation) {
        tempList = staffList?.filter((x) => {
          return x.fk_staff_grade == data.staff_grade;
        });
      }
      if (data.designation && data.staff_grade) {
        tempList = tempList.filter((x) => {
          return x.fk_staff_grade == data.staff_grade;
        });
      }
      setSearchList(tempList);
      return 0;
    } else if (staffList?.length > 0) {
      setSearchList(staffList);
    }
  };

  const handleDeleteStaff = async (id) => {
    try {
      const response = await deleteStaff(id);
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
            "Failed to delete staff. There may be transaction done with this staff.",
          icon: "info",
        });
      }
    } catch (err) {
      console.log(err)
      Swal.fire({
        title: "Warning",
        text:
        err?.response?.data?.message ||
          "Failed to delete staff. There may be transaction done with this staff.",
        icon: "info",
      });
    }
  };

  const handleSearch = async (e) => {
    try {
      let tempList = [];
      let value;
      value = e?.target?.value?.toLocaleLowerCase();
      if (value != "" && value) {
        if (staffList.length > 0) {
          let list;
          if (
            searchList?.length > 0 &&
            (filter?.staff_grade || filter?.designation)
          ) {
            list = searchList;
          } else {
            list = staffList;
          }
          tempList = list?.filter((x) => {
            let searchInString = `${
              x.code?.toLocaleLowerCase() +
              " " +
              x.name?.toLocaleLowerCase() +
              " " +
              x.mobile?.toLocaleLowerCase()
            }`;
            let search = searchInString?.includes(value);
            if (search) {
              return true;
            }
          });
        }
        setSearchList(tempList);
      } else if (filter?.designation || filter?.staff_grade) {
        handleSearchFilter(filter);
      } else if (tempList.length < 1) {
        setSearchList(staffList);
      } else {
        setSearchList(tempList);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="row mx-0 my-2 w-100">
        <div className="col-2 col-3 px-0">
          <div className="item_seach_bar_cont rounded-2">
            <img src={searchIcon} className="search_img me-3 ms-2 py-2" />
            <input
              value={search}
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
        className={`item_add_cont p-0 table-scroller mx-0 position-relative ${
          location.pathname == "/staff-pay-scale" && "payscale"
        }`}
        style={{
          borderRadius: "0.3125rem 0.3125rem 0rem 0rem",
        }}
      >
        {loading && (
        <div className="loader-container w-100">
          <div className="loader"></div>
        </div>
      )}
        <table className={`table table-light custom-table  ${loading&& "loading-cont-par-blur"}`}>
          <thead>
            <tr>
              {/* <th style={{borderTopLeftRadius: "0.3125rem"}}>No</th> */}
              <th>SL</th>
              <th>Code</th>
              <th>Staff</th>
              <th>Address</th>
              <th width="170">Mob</th>
              {!payscale && <th width="50"></th>}
              <th
                width={payscale ? "100" : "40"}
                style={{ borderTopRightRadius: "0.3125rem" }}
                className="text-end"
              >
                {payscale && (
                  <div className="d-flex gap-2 justify-content-end pe-3">
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={
                        staffPayList?.length > 0 &&
                        staffPayList?.length == searchList?.length
                          ? true
                          : false
                      }
                    />
                    Select All
                  </div>
                )}
              </th>

              {/* <th style={{ borderTopRightRadius: "0.3125rem" }}></th> */}
            </tr>
          </thead>
          <tbody>
            {searchList?.length > 0 ? (
              searchList?.map((data, i) => {

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
                      await handleDeleteStaff(data?.id);
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

                const popoverHoverFocus = (
                  <Popover className="task-description-popover">
                    <div className="task-desc-pop-container">
                      {data?.address}
                    </div>
                  </Popover>
                );
                return (
                  <tr>
                    {/* <td>{i+1}</td> */}
                    <td>{i + 1}</td>
                    <td>{data.code}</td>
                    <td>{data.name}</td>
                    <td>
                      <ButtonToolbar>
                        <OverlayTrigger
                          trigger={["hover", "focus"]}
                          placement="bottom"
                          overlay={popoverHoverFocus}
                        >
                          <div className="btn btn-pill px-2 p-0 w-100">
                            {data?.address?.slice(0, 20)}
                          </div>
                        </OverlayTrigger>
                      </ButtonToolbar>
                    </td>
                    <td>{data.mobile}</td>
                    {/* <td>{data.alt_mobile}</td>
                                <td>{data.contact_person}</td> */}
                    {!payscale && (
                      <td>
                        <div
                          className="button"
                          
                        >
                        </div>
                      </td>
                    )}

                    {!payscale ? (
                      <td>
                        <div className="button text-start d-flex gap-4 pe-3">
                        {!permissions.includes(1319)&&<img src={deleteBtn} alt="deletebtn" onClick={(e) => handleDelete(data.id, e)}/>}
                          {!permissions.includes(1318)&&<img src={editBtn} alt="editBtn" onClick={() => handleEdit(data)}/>}
                        </div>
                      </td>
                    ) : (
                      <td>
                        <input
                          type="checkbox"
                          checked={
                            staffPayList.length > 0 &&
                            staffPayList?.findIndex((x) => x == data.id) >= 0
                              ? true
                              : false
                          }
                          onChange={(e) => handleStaffSelection(data.id, e)}
                        />
                      </td>
                    )}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td className="fs-5 text-center" colSpan={9}>
                  No Staff Added Yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {location.pathname == "/staff-pay-scale" && (
        <div className="row mt-3 justify-content-end">
          <button className="col-1 btn add-btn w-auto px-5">Add</button>
        </div>
      )}
    </div>
  );
};

import React, { useEffect, useState } from "react";
import searchIcon from "../../../../assets/icons/search.png";
import deleteBtn from "../../../../assets/icons/delete.svg";
import editBtn from "../../../../assets/icons/edit-black.svg";
import { Form } from "react-bootstrap";
import { OverlayTrigger, ButtonToolbar, Popover } from "react-bootstrap";
import Swal from "sweetalert2";
import useCustomerServices from "../../../../services/master/customerServices";

const SupplierList = (props) => {
  const { list, handleEdit, getData,loading,permissions } = props;

  const [searchedList, setSearchedList] = useState([]);

  const { deleteSupplier } = useCustomerServices();

  useEffect(() => {
    setSearchedList(list);
  }, [list]);

  const handleDeleteSupplier = async (id) => {
    try {
      const response = await deleteSupplier(id);
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
            "Failed to delete supplier. There may be transaction done with this supplier.",
          icon: "info",
        });
      }
    } catch (err) {
      Swal.fire({
        title: "Warning",
        text:
        err?.response?.data?.message ||
          "Failed to delete supplier. There may be transaction done with this supplier.",
        icon: "info",
      });
    }
  };

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
        className="item_add_cont p-0 table-scroller position-relative"
        style={{ borderRadius: "0.3125rem 0.3125rem 0rem 0rem" }}
      >
        {loading && (
        <div className="loader-container w-100">
          <div className="loader"></div>
        </div>
      )}
        <table className={`table table-light custom-table  ${loading&& "loading-cont-par-blur"}`}>
          <thead>
            <tr>
              <th style={{ borderTopLeftRadius: "0.3125rem", width: "4rem" }}>
                No
              </th>
              <th className="text-start" style={{ width: "12rem" }}>
                Supplier
              </th>
              <th>Code</th>
              <th style={{ width: "18rem" }}>Address</th>
              <th className="text-center">Mob</th>
              <th className="text-center">Remark</th>
              <th width="20" style={{ borderTopRightRadius: "0.3125rem" }}></th>
            </tr>
          </thead>
          <tbody>
            {searchedList?.length > 0 ? (
              searchedList.map((data, i) => {

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
                      await handleDeleteSupplier(data?.id);
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
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td className="text-start">{data?.name}</td>
                    <td>{data?.code}</td>
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
                    <td>{data?.mobile}</td>
                    <td>
                      <Form.Control
                        as="textarea"
                        value={data?.remark || ""}
                        disabled
                        rows={1}
                        className="resize-none text-center"
                      />
                    </td>
                    <td>
                      <div
                        className="button d-flex gap-4 pe-3"                        
                      >
                        {permissions.includes(1147)&&<img src={deleteBtn} alt="deletebtn" onClick={(e) => handleDelete(data.id, e)}/>}
                        {permissions.includes(1146)&&<img src={editBtn} alt="edit button" onClick={(e) => handleEdit(data && data)}/>}
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td className="fs-5 text-center" colSpan={6}>
                  No Supplier Added Yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupplierList;

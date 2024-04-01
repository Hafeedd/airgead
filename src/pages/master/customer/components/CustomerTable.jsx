import deleteBtn from "../../../../assets/icons/delete.svg";
import searchIcon from "../../../../assets/icons/search.png";
import editBtn from "../../../../assets/icons/edit-black.svg";
import { OverlayTrigger, ButtonToolbar, Popover } from "react-bootstrap";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useCustomerServices from "../../../../services/master/customerServices";

const CustomerTable = (props) => {
  const { list, handleEdit, loading, search, setSearch, getData } = props;

  const [searchedList, setSearchedList] = useState([]);

  const { deleteCustomer } = useCustomerServices();

  useEffect(() => {
    setSearchedList(list);
  }, [list]);

  const handleDeleteCustomer = async (id) => {
    try {
      const response = await deleteCustomer(id);
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
            onClick={getData}
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
              {/* <th style={{borderTopLeftRadius: "0.3125rem"}}>No</th> */}
              <th>SL</th>
              <th>Code</th>
              <th>Name</th>
              <th>Mob1</th>
              <th>Mob2</th>
              <th>Address</th>
              <th>Contract Person</th>
              {/* <th width="50"></th> */}
              <th width="50" style={{ borderTopRightRadius: "0.3125rem" }}></th>
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
                      await handleDeleteCustomer(data?.id);
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
                    <td>{data.mobile}</td>
                    <td>{data.alt_mobile}</td>
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
                    <td>{data.contact_person}</td>
                    {/* <td>
                                        <div className='button' >
                                        </div>
                                    </td> */}

                    <td>
                      <div className="button d-flex gap-4 pe-3">
                        <img
                          src={deleteBtn}
                          alt="deletebtn"
                          onClick={(e) => handleDelete(data.id, e)}
                        />
                        <img
                          src={editBtn}
                          alt="edit btn"
                          onClick={() => handleEdit(data)}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td className="fs-5 text-center" colSpan={9}>
                  No Customer Added Yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerTable;

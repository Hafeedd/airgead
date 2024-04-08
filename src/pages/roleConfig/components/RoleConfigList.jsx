import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { FaPlus } from "react-icons/fa6";
import { Checkbox } from "semantic-ui-react";
import { HiDotsVertical } from "react-icons/hi";
import pencilIcon from "../../../assets/icons/blue_pencil.png";
import deleteBtn from "../../../assets/icons/delete.svg";
import searchIcon from "../../../assets/icons/search.png";

export const RoleConfigList = () => {
    const [listShow, setListShow] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
  
    const handleDropDownList = (key) => {
      if (listShow === key) {
        setListShow(false);
      } else setListShow(key);
    };

  return (
    <>
      <div className="row mx-0 justify-content-between">
        <div className="col-3 px-0">
          <div className="item_seach_bar_cont admin rounded-2">
            <img src={searchIcon} className="search_img me-3 ms-2 py-2" />
            <input
              //   onChange={handleSearch}
              className="item_search_bar text-capitalize rounded-2 border-0 py-1"
              placeholder="Search..."
              type="text"
            />
          </div>
        </div>
        <div
            onClick={() =>navigate("/role-configuratoin-add")}
          className="company-add-btn btn  col-1 gap-2"
        >
          <FaPlus size={"1.5rem"} />
          Add Role
        </div>
      </div>
      <table className="table comp-view mt-2">
        <thead className="main-head">
          <tr>
            <th className="rounded-top-2 rounded-end-0">No</th>
            <th>Role Name</th>
            <th>Manager Role</th>
            <th>Total Modules</th>
            <th width="50" className="rounded-top-2 rounded-start-0"></th>
          </tr>
        </thead>
        <tbody>
          <>
            <tr className={`main-tr`}>
              <td>
                <div className="comp-view-td rounded-start-2">{""}</div>
              </td>
              <td>
                <div className="comp-view-td">{""}</div>
              </td>
              <td>
                <div className="comp-view-td">{""}</div>
              </td>
              <td>
                <div className="comp-view-td">{""}</div>
              </td>
              {/* </tr>
            <tr> */}
              <td>
                {/* <td className="d-flex align-items-center justify-content-between ps-2 pe-1"> */}
                <div className="comp-view-td position-relative rounded-end-2 d-flex align-items-center justify-content-between ps-2 pe-1">
                  <Checkbox toggle />
                  <button
                    className="border-0 btn p-0 m-0"
                    onClick={() => handleDropDownList(1)}
                    onBlur={() => handleDropDownList(false)}
                  >
                    <HiDotsVertical size={"1.5rem"} className="cursor" />
                  </button>
                  {listShow /*  === key */ && (
                    <div className="company-menue-dropdown">
                      <div
                        onClick={() =>
                          navigate(
                            location.pathname === "/user-list"
                              ? "/user-add"
                              : "company-add",
                            {
                              state: { company: "data" },
                            }
                          )
                        }
                        className="d-flex cursor gap-3"
                      >
                        <img src={pencilIcon} alt="edit" /> Edit
                      </div>
                      <div
                        // onClick={(e) => handleCheck(e, "delete")}
                        className="d-flex cursor gap-3"
                      >
                        <img src={deleteBtn} alt="del" /> Delete
                      </div>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          </>
        </tbody>
      </table>
    </>
  );
};

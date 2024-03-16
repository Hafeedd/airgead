import React from "react";
import searchIcon from "../../../assets/icons/search.png";
import { FaPlus } from "react-icons/fa6";
import { Checkbox } from "semantic-ui-react";
import { HiDotsVertical } from "react-icons/hi";
import { useNavigate } from "react-router";

export const CompanyList = (props) => {
  const {setEdit} = props
  const navigate = useNavigate();

  return (
    <div className="company-list-cont">
      <div className="row mx-0 justify-content-between">
        <div className="col-3 px-0">
          <div className="item_seach_bar_cont admin rounded-2">
            <img src={searchIcon} className="search_img me-3 ms-2 py-2" />
            <input
              className="item_search_bar text-capitalize rounded-2 border-0 py-1"
              placeholder="Search..."
              type="text"
            />
          </div>
        </div>
        <div
          onClick={() => navigate("/company-add")}
          className="company-add-btn btn col-1 col-2 gap-2"
        >
          <FaPlus size={"1.5rem"} />
          Add Company
        </div>
      </div>
      <div className="company-list-table-cont mx-0 mt-4">
        <table className="table company-list">
          <thead>
            <tr>
              <th width="40">
                SL.
                <br />
                no
              </th>
              <th>Company Name</th>
              <th>Owner Name</th>
              <th>Cum.ID</th>
              <th>Mobile</th>
              <th>Location</th>
              <th>Create Date</th>
              <th>Last Login</th>
              <th>Expiry Date</th>
              <th width="100">
                Active/
                <br /> Inactive
              </th>
            </tr>
          </thead>
          <tbody>
            <tr onClick={()=>setEdit(true)}>
              <td>1</td>
              <td>a</td>
              <td>b</td>
              <td>v</td>
              <td>c</td>
              <td>d</td>
              <td>g</td>
              <td>h</td>
              <td>j</td>
              <td className="d-flex align-items-center justify-content-between ps-2 pe-1">
                <Checkbox toggle />
                <HiDotsVertical size={"1.5rem"} />
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>a</td>
              <td>b</td>
              <td>v</td>
              <td>c</td>
              <td>d</td>
              <td>g</td>
              <td>h</td>
              <td>j</td>
              <td className="d-flex align-items-center justify-content-between ps-2 pe-1">
                <Checkbox toggle />
                <HiDotsVertical size={"1.5rem"} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

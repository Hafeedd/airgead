import React from 'react'
import searchIcon from "../../../assets/icons/search.png";
import { FaPlus } from "react-icons/fa6";

export const CompanyList = () => {
  return (
    <div>
      <div className='row mx-0 justify-content-between'>
        <div className='col-3'>
          <div className="item_seach_bar_cont admin rounded-2">
            <img src={searchIcon} className="search_img me-3 ms-2 py-2" />
            <input
              className="item_search_bar text-capitalize rounded-2 border-0 py-1"
              placeholder="Search.."
              type="text"
            />
          </div>
        </div>
        <div className='company-add-btn btn'><FaPlus size={'1.5rem'} />Add Company</div>
      </div>
      <div></div>
    </div>
  )
}
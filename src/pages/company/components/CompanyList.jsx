import React from 'react'
import searchIcon from "../../../assets/icons/search.png";

export const CompanyList = () =>{
    return(
        <div className='row mx-0'>
            <div className='col-3'>
            <div className="item_seach_bar_cont rounded-2">
            <img src={searchIcon} className="search_img me-3 ms-2 py-2" />
            <input
              className="item_search_bar rounded-2 border-0 py-1"
              placeholder="Search"
              type="text"
            />
          </div>
            </div>
        </div>
    )
}
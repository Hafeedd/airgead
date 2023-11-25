import React, { useEffect, useState } from 'react'
import searchIcon from "../../../../assets/icons/search.png"
import deleteBtn from "../../../../assets/icons/delete.svg"
import editBtn from "../../../../assets/icons/edit-black.svg"
import { Form } from 'react-bootstrap'
import { OverlayTrigger, ButtonToolbar, Popover } from "react-bootstrap"

const SupplierList = (props) => {
    const {list,handleEdit,handleDelete,getData} = props
    
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
                  x.code?.toLocaleLowerCase() +
                  " " +
                  x.name?.toLocaleLowerCase()
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
            <div className='item_seach_bar_cont rounded-2'>
                <img src={searchIcon} className='search_img me-3 ms-2 py-2'/>
                <input
                    onChange={handleSearch}
                    className='item_search_bar rounded-2 border-0 py-1' 
                    placeholder='Search' 
                    type='text'
                />
            </div>
        </div>
        <div className="col-2">
            <div onClick={getData} className="btn btn-sm btn-dark filter-btn">
                Filter Here
            </div>
        </div>
    </div>
    <div className='item_add_cont p-0 table-scroller' style={{borderRadius: "0.3125rem 0.3125rem 0rem 0rem"}}>
        <table className='table table-light custom-table'>
            <thead>
                <tr>
                    <th style={{borderTopLeftRadius: "0.3125rem", width: "4rem"}}>No</th>
                    <th className='text-start' style={{width:"12rem"}}>Supplier</th>
                    <th>Code</th>
                    <th style={{width:"18rem"}}>Address</th>
                    <th className='text-center'>Mob</th>
                    <th className='text-center'>Remark</th>
                    <th></th>
                    <th style={{borderTopRightRadius: "0.3125rem"}}></th>
                </tr>
            </thead>
            <tbody>
                {
                searchedList?.length>0 ?
                    searchedList.map((data,i)=>{
                        const popoverHoverFocus = (
                            <Popover
                                className="task-description-popover"
                            >
                                <div className="task-desc-pop-container">
                                    {data?.address}
                                </div>
                            </Popover>
                        );
                    return(<tr key={i}>
                        <td>{i+1}</td>
                        <td className='text-start'>{data?.name}</td>
                        <td>{data?.code}</td>
                        <td>
                        <ButtonToolbar >
                            <OverlayTrigger
                                trigger={["hover","focus"]}
                                placement="bottom"
                                overlay={popoverHoverFocus}
                            >
                                <div className="btn btn-pill px-2 p-0 w-100">{data?.address?.slice(0, 20)}</div>
                            </OverlayTrigger>
                        </ButtonToolbar>
                        </td>
                        <td>{data?.mobile}</td>
                        <td>
                            <Form.Control 
                                as='textarea'
                                value={data?.remark||''}
                                disabled
                                rows={1}
                                className='resize-none text-center'
                            />
                        </td>
                        <td>
                            <div className='button' onClick={(e) => handleDelete(data.id, e)}>
                                <img src={deleteBtn} alt='deletebtn' />
                            </div>
                        </td>
                        <td>
                            <div className='button' onClick={e=>handleEdit(data&&data)}>
                                <img src={editBtn} alt='edit button' />
                            </div>
                        </td>
                    </tr>
                    )}):
                    <tr>
                        <td className='fs-5 text-center' colSpan={5}>No Item Added Yet</td>
                    </tr>
                }
            </tbody>
        </table>
    </div>
</div>
  )
}

export default SupplierList

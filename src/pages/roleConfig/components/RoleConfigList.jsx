import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { FaPlus } from "react-icons/fa6";
import { Checkbox } from "semantic-ui-react";
import { HiDotsVertical } from "react-icons/hi";
import pencilIcon from "../../../assets/icons/blue_pencil.png";
import deleteBtn from "../../../assets/icons/delete.svg";
import searchIcon from "../../../assets/icons/search.png";
import { useCompanyServices } from "../../../services/controller/companyServices";
import Swal from 'sweetalert2'

export const RoleConfigList = (props) => {
  const {roleList,refresh} = props
  const [listShow, setListShow] = useState(false);
  const [searchedList, setSearchedList] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  const {putCompanyRole} = useCompanyServices()

  useEffect(() => {
    setSearchedList(roleList);
  }, [roleList]);

  const handleSearch = async (e) => {
    try {
      let tempData,
        tempList = roleList;
      if (roleList) {
        let value = e.target.value.toLocaleLowerCase();
        if (value != "") {
          if (roleList.length > 0) {
            tempData = tempList?.filter((x) => {
              let searchInString = `${
                x.role?.toLocaleLowerCase() 
                // + " " +
                // x.group_name?.toLocaleLowerCase()
              }`;
              let search = searchInString?.includes(value);
              if (search) {
                return true;
              }
            });
            setSearchedList(tempData);
          }
        } else {
          setSearchedList(roleList);
        }
      }
    } catch {}
  };

  const handleDropDownList = (key) => {
    if (listShow === key) {
      setListShow(false);
    } else setListShow(key);
  };
  
  const handleActivation = async (data) =>{
    try{
      let resp = await putCompanyRole(data.id,{is_active:!data.is_active})
      if(resp.success){
        Swal.fire("","","success")
        refresh()
      }
    }catch(err){
      Swal.fire("","","error")
    }
  }

  return (
    <>
      <div className="row mx-0 justify-content-between">
        <div className="col-3 px-0">
          <div className="item_seach_bar_cont admin rounded-2">
            <img src={searchIcon} className="search_img me-3 ms-2 py-2" />
            <input
                onChange={handleSearch}
              className="item_search_bar text-capitalize rounded-2 border-0 py-1"
              placeholder="Search..."
              type="text"
            />
          </div>
        </div>
        <div
          onClick={() => navigate("/role-configuration-add")}
          className="company-add-btn btn  col-1 col-2 gap-2"
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
            {/* <th>Total Modules</th> */}
            <th width="50" className="rounded-top-2 rounded-start-0"></th>
          </tr>
        </thead>
        <tbody>
          {searchedList?.length > 0 ?
            searchedList?.map((data,key) => {
              return (
                <tr className={`main-tr`}>
                  <td>
                    <div className="comp-view-td rounded-start-2">{key+1}</div>
                  </td>
                  <td>
                    <div className="comp-view-td">{data.role}</div>
                  </td>
                  <td>
                    <div className="comp-view-td">{roleList[roleList.findIndex(x=>x.id==data.fk_parent)]?.role}</div>
                  </td>
                  <td>
                    {/* <td className="d-flex align-items-center justify-content-between ps-2 pe-1"> */}
                    <div className="comp-view-td position-relative rounded-end-2 d-flex align-items-center justify-content-between ps-2 pe-1">
                      <Checkbox checked={data.is_active} onChange={()=>handleActivation(data)} toggle />
                      <button
                        className="border-0 btn p-0 m-0"
                        onClick={() => handleDropDownList(key)}
                        // onBlur={() => handleDropDownList(false)}
                      >
                        <HiDotsVertical size={"1.5rem"} className="cursor" />
                      </button>
                      {listShow  === key && (
                        <div className="company-menue-dropdown">
                          <div
                            onClick={() =>
                              navigate(
                                '/role-configuration-add',
                                {
                                  state: { role: data.id },
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
              );
            }):
            <tr>
              <td className="fs-3 py-4" colSpan={4}>
                No Roles Added Yet !
              </td>
            </tr>}
        </tbody>
      </table>
    </>
  );
};

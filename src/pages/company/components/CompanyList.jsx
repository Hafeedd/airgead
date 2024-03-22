import React, { useEffect, useState } from "react";
import searchIcon from "../../../assets/icons/search.png";
import { FaPlus } from "react-icons/fa6";
import { Checkbox } from "semantic-ui-react";
import { HiDotsVertical } from "react-icons/hi";
import { useNavigate } from "react-router";
import { useCompanyServices } from "../../../services/controller/companyServices";
import dayjs from "dayjs";
import pencilIcon from '../../../assets/icons/blue_pencil.png'
import deleteBtn from '../../../assets/icons/delete.svg'
import Swal from "sweetalert2";

export const CompanyList = (props) => {

  const [companyList, setCompanyList] = useState([])
  const [listShow, setListShow] = useState(false)

  const navigate = useNavigate();

  const { getCompanyList } = useCompanyServices()

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const resp = await getCompanyList()
      if (resp.success) {
        setCompanyList(resp.data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleDropDownList = (key) => {
    if (listShow === key) {
      setListShow(false)
    } else setListShow(key)
  }

  const deleteCompany = async (id) => {
    try {
      const response = await deleteCompany(id);
      if (response?.success) {
        Swal.fire({
          title: "Success",
          text: "Company deleted successfully",
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
            "Failed to delete Company. Something went wrong Pls try again.",
          icon: "info",
          // timer: 1000,
          // showConfirmButton: false,
        });
      }
    } catch (err) {
      console.log(err?.response?.data?.error);
    }
  };

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
              <th>Com.ID</th>
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

            {companyList?.length > 0 ?
              companyList.map((data, key) => {
                const handleDelete = async (e) => {
                  Swal.fire({
                    title: "Delete",
                    text: `Are you sure, you want to delete ${data.username}?`,
                    icon: "question",
                    showDenyButton: true,
                    showCancelButton: false,
                    confirmButtonText: "Yes",
                    denyButtonText: "Cancel",
                    showLoaderOnConfirm: true,
                    preConfirm: async () => {
                      // await deleteGroup(data?.id);
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

                const handleNavigate = () => {
                  navigate('/company-view', { state: { id: data.id } })
                }
                
                return (
                  <tr>
                    <td onClick={handleNavigate}>{key + 1}</td>
                    <td onClick={handleNavigate}>{data.group_name}</td>
                    <td onClick={handleNavigate}>{data?.admin_details?.full_name}</td>
                    <td onClick={handleNavigate}>{data.group_id}</td>
                    <td onClick={handleNavigate}>{data.admin_details?.mobile}</td>
                    <td onClick={handleNavigate}>{data.location}</td>
                    <td onClick={handleNavigate}>{dayjs(data.created_at).format("DD/MM/YYYY")}</td>
                    <td onClick={handleNavigate}>
                      {data.admin_details?.last_login ?
                        dayjs(data.admin_details?.last_login)
                          ?.format("DD/MM/YYYY") : "Not Logged in yet !"}
                    </td>
                    <td onClick={handleNavigate}>
                      {data.active_plan_details.renewal_date ?
                        dayjs(data.active_plan_details.renewal_date)
                          ?.format("DD/MM/YYYY")
                        : ""}
                    </td>
                    <td className="d-flex align-items-center justify-content-between ps-2 pe-1">
                      <Checkbox toggle />
                      <HiDotsVertical onClick={() => handleDropDownList(key)} size={"1.5rem"} />
                      {listShow === key && <div className="company-menue-dropdown">
                        <div onClick={() => navigate('/company-add', { state: { company: data } })} className="d-flex cursor gap-3"><img src={pencilIcon} alt="edit" /> Edit</div>
                        <div onClick={handleDelete} className="d-flex cursor gap-3"><img src={deleteBtn} alt="edit" /> Delete</div>
                      </div>}
                    </td>
                  </tr>)
              })
              : <tr><td className="fs-3 text-center py-4" colSpan={10}>No Company Added Yet !</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

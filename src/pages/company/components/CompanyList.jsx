import React, { useEffect, useState } from "react";
import searchIcon from "../../../assets/icons/search.png";
import { FaPlus } from "react-icons/fa6";
import { Checkbox } from "semantic-ui-react";
import { HiDotsVertical } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router";
import { useCompanyServices } from "../../../services/controller/companyServices";
import dayjs from "dayjs";
import pencilIcon from "../../../assets/icons/blue_pencil.png";
import deleteBtn from "../../../assets/icons/delete.svg";
import Swal from "sweetalert2";
import { useUserServices } from "../../../services/controller/userServices";

export const CompanyList = (props) => {
  const [companyList, setCompanyList] = useState([]);
  const [listShow, setListShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchedList, setSearchedList] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const { getCompanyList, companyActiveDeactive, deleteCompanyForController } =
    useCompanyServices();
  const { getUserList, userActiveDeactive, delUserAdd } = useUserServices();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setSearchedList(companyList);
  }, [companyList]);

  const handleSearch = async (e) => {
    try {
      let tempData,
        tempList = companyList;
      if (companyList) {
        let value = e.target.value.toLocaleLowerCase();
        if (value != "") {
          if (companyList.length > 0) {
            tempData = tempList?.filter((x) => {
              let searchInString = `${
                x.group_id?.toLocaleLowerCase() +
                " " +
                x.group_name?.toLocaleLowerCase()
              }`;
              let search = searchInString?.includes(value);
              if (search) {
                return true;
              }
            });
            setSearchedList(tempData);
          }
        } else {
          setSearchedList(companyList);
        }
      }
    } catch {}
  };
  const getData = async () => {
    if (location.pathname === "/user-list") {
      try {
        setLoading(true);
        const resp = await getUserList();
        if (resp.success) {
          console.log(resp)
          setCompanyList([...resp.data]);
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    } else {
      try {
        setLoading(true);
        const resp = await getCompanyList();
        if (resp.success) {
          setCompanyList(resp.data);
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    }
  };

  const handleDropDownList = (key) => {
    if (listShow === key) {
      setListShow(false);
    } else setListShow(key);
  };

  const handleDeleteUser = async (id) => {
    try {
      const res = await delUserAdd(id);
      if (res.success) {
        Swal.fire({
          title: "Success",
          text: "User deleted successfully",
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
        });
        getData();
      } else {
        Swal.fire({
          title: "Warning",
          text:
            res?.message ||
            "Failed to delete User. Something went wrong Pls try again.",
          icon: "info",
          // timer: 1000,
          // showConfirmButton: false,
        });
      }
    } catch (err) {
      console.log(err?.response?.data?.error);
    }
  };

  const deleteCompany = async (id, password) => {
    try {
      const response = await deleteCompanyForController(id, {
        password: password,
      });
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
              onChange={handleSearch}
              className="item_search_bar text-capitalize rounded-2 border-0 py-1"
              placeholder="Search..."
              type="text"
            />
          </div>
        </div>
        <div
          onClick={() =>
            location.pathname === "/user-list"
              ? navigate("/user-add")
              : navigate("/company-add")
          }
          className="company-add-btn btn  col-2 gap-2"
        >
          <FaPlus size={"1.5rem"} />
          {location.pathname === "/user-list" ? "Add User" : "Add Company"}
        </div>
      </div>
      <div className="company-list-table-cont mx-0 mt-4">
        <table className="table company-list">
          <thead>
            {location.pathname == "/user-list" ? (
              <tr>
                <th width="40">
                  SL.
                  <br />
                  no
                </th>
                <th>Name</th>
                <th>User Name</th>
                <th>User.ID</th>
                <th>Mobile</th>
                <th>Role</th>
                <th>Create Date</th>
                <th>Last Login</th>
                <th width="100">
                  Active/
                  <br /> Inactive
                </th>
              </tr>
            ) : (
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
            )}
          </thead>
          <tbody>
            {location.pathname == "/user-list" && searchedList?.length > 0 ? (
              searchedList.map((data, key) => {
                const handleCheck = async (e, type) => {
                  Swal.fire({
                    title: "Delete",
                    text: `Are you sure, you want to 
                    ${
                      type == "delete"
                        ? "delete"
                        : data?.is_active
                        ? "activated"
                        : "deactivated"
                    } ${data?.username}?`,
                    icon: "question",
                    showDenyButton: true,
                    showCancelButton: false,
                    confirmButtonText: "Yes",
                    denyButtonText: "Cancel",
                    showLoaderOnConfirm: true,
                    preConfirm: async () => {
                      if (type == "delete") {
                        handleDeleteUser(data.id);
                      } else handleActive();
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

                // const handleNavigate = () => {
                //   navigate("/company-view", { state: { id: data.id } });
                // };

                const handleActive = async () => {
                  try {
                    const resp = await userActiveDeactive(data.id);
                    if (resp.success) {
                      Swal.fire(
                        "Success",
                        `${data?.full_name} has been ${
                          resp?.message
                        } successfully`,
                        "success"
                      );
                      getData();
                    }
                  } catch (err) {
                    let message =
                      err?.response?.message ||
                      "Something went wrong. Please try again later.";
                    Swal.fire("Error", message, "error");
                  }
                };

                return (
                  <tr>
                    <td>{key + 1}</td>
                    <td>{data?.full_name}</td>
                    <td>{data?.username}</td>
                    <td>{data?.id}</td>
                    <td>{data?.mobile}</td>
                    <td>{data?.fk_role}</td>
                    <td>{dayjs(data.created_at).format("DD/MM/YYYY")}</td>
                    <td>
                      {data.last_login
                        ? dayjs(data.last_login)?.format(
                            "DD/MM/YYYY"
                          )
                        : "Not Logged in yet !"}
                    </td>
                    <td className="d-flex align-items-center justify-content-between ps-2 pe-1">
                      <Checkbox
                        onChange={handleActive}
                        toggle
                        checked={data?.is_active}
                      />
                      <HiDotsVertical
                        onClick={() => handleDropDownList(key)}
                        size={"1.5rem"}
                      />
                      {listShow === key && (
                        <div className="company-menue-dropdown">
                          <div
                            onClick={() =>
                              navigate(
                                location.pathname === "/user-list"
                                  ? "/user-add"
                                  : "company-add",
                                {
                                  state: { company: data.id },
                                }
                              )
                            }
                            className="d-flex cursor gap-3"
                          >
                            <img src={pencilIcon} alt="edit" /> Edit
                          </div>
                          <div
                            onClick={(e) => handleCheck(e, "delete")}
                            className="d-flex cursor gap-3"
                          >
                            <img src={deleteBtn} alt="del" /> Delete
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : searchedList?.length > 0 ? (
              searchedList.map((data, key) => {
                // const handleCheck = async () => {
                //   Swal.fire({
                //     title: "Delete",
                //     input: "text",
                //     text: `Are you sure, you want to
                //     ${data.is_active ? "activated" : "deactivated"} ${
                //       data.group_name
                //     }?`,
                //     icon: "question",
                //     showDenyButton: true,
                //     showCancelButton: false,
                //     confirmButtonText: "Yes",
                //     denyButtonText: "Cancel",
                //     showLoaderOnConfirm: true,
                //     preConfirm: async () => {
                //       handleActive();
                //     },
                //     preDeny: () => {
                //       Swal.fire({
                //         title: "Cancelled",
                //         icon: "info",
                //         timer: 1000,
                //         showConfirmButton: false,
                //       });
                //     },
                //   });
                // };

                const handleDeleteConfirm = async () => {
                  const { value: password } = await Swal.fire({
                    title: "Are you sure",
                    text: `To delete company ${data.group_name}, Please enter Your password.`,
                    input: "password",
                    inputLabel: "Password",
                    icon: "warning",
                    inputPlaceholder: "Enter your password",
                    inputAttributes: {
                      maxlength: "10",
                      autocapitalize: "off",
                      autocorrect: "off",
                    },
                  });
                  if (password) {
                    deleteCompany(data.id, password);
                  } else {
                    Swal.fire({
                      title: "Cancelled",
                      icon: "info",
                      timer: 1000,
                      showConfirmButton: false,
                    });
                  }
                };

                const handleNavigate = () => {
                  navigate("/company-view", { state: { id: data.id } });
                };

                const handleActive = async () => {
                  try {
                    const resp = await companyActiveDeactive(data.id);
                    if (resp.success) {
                      Swal.fire(
                        "Success",
                        `${data.full_name} has been ${
                          data.is_active ? "activated" : "deactivated"
                        } successfully`,
                        "success"
                      );
                      getData();
                    }
                  } catch (err) {
                    let message =
                      err?.response?.message ||
                      "Something went wrong. Please try again later.";
                    Swal.fire("Error", message, "error");
                  }
                };

                return (
                  <tr>
                    <td onClick={handleNavigate}>{key + 1}</td>
                    <td onClick={handleNavigate}>{data.group_name}</td>
                    <td onClick={handleNavigate}>
                      {data?.admin_details?.full_name}
                    </td>
                    <td onClick={handleNavigate}>{data.group_id}</td>
                    <td onClick={handleNavigate}>
                      {data.admin_details?.mobile}
                    </td>
                    <td onClick={handleNavigate}>{data.location}</td>
                    <td onClick={handleNavigate}>
                      {dayjs(data.created_at).format("DD/MM/YYYY")}
                    </td>
                    <td onClick={handleNavigate}>
                      {data.admin_details?.last_login
                        ? dayjs(data.admin_details?.last_login)?.format(
                            "DD/MM/YYYY"
                          )
                        : "Not Logged in yet !"}
                    </td>
                    <td onClick={handleNavigate}>
                      {data.active_plan_details.renewal_date
                        ? dayjs(data.active_plan_details.renewal_date)?.format(
                            "DD/MM/YYYY"
                          )
                        : ""}
                    </td>
                    <td className="d-flex align-items-center justify-content-between ps-2 pe-1">
                      <Checkbox
                        onChange={handleActive}
                        toggle
                        checked={data.is_active}
                      />
                      <button
                        className="border-0 btn p-0 m-0"
                        onClick={() => handleDropDownList(1)}
                        // onBlur={() => handleDropDownList(false)}
                      >
                        <HiDotsVertical
                          onClick={() => handleDropDownList(key)}
                          size={"1.5rem"}
                        />
                      </button>
                      {listShow === key && (
                        <div className="company-menue-dropdown">
                          <div
                            onClick={() =>
                              navigate("/company-add", {
                                state: { company: data.id },
                              })
                            }
                            className="d-flex cursor gap-3"
                          >
                            <img src={pencilIcon} alt="edit" /> Edit
                          </div>
                          <div
                            onClick={(e) => handleDeleteConfirm()}
                            className="d-flex cursor gap-3"
                          >
                            <img src={deleteBtn} alt="edit" /> Delete
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : location.pathname === "/user-list" ? (
              <tr>
                <td className="fs-3 text-center py-4" colSpan={9}>
                {loading ? "Loading..." : "No User Added Yet !"}
                </td>
              </tr>
            ) : (
              <tr>
                <td className="fs-3 text-center py-4" colSpan={10}>
                  {loading ? "Loading..." : "No Company Added Yet !"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

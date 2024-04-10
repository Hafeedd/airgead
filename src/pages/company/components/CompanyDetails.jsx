import React, { useEffect, useState } from "react";
import uploadImage from "../../../assets/icons/image-upload.png";
import { MdOutlineFileUpload } from "react-icons/md";
import TextField from "@mui/material/TextField";
import { useCompanyServices } from "../../../services/controller/companyServices";
import Swal from "sweetalert2";
import { Dropdown } from "semantic-ui-react";
import { useUserServices } from "../../../services/controller/userServices";
import { useNavigate } from "react-router";

export const CompanyDetails = (props) => {
  const {
    setActive,
    setCompanyId,
    setCompanyPlan,
    setModuleCodeList,
    edit,
    setEdit,
    location,
    company,
    setCompany,
  } = props;
  const [allRoles, setAllRoles] = useState([]);
  const [additionalFiled, setAdditionalFields] = useState(false);
  const [loginField, setLoginFiled] = useState(false);

  const { postUserAdd, getUserRoles, putUserAdd } = useUserServices();
  const { companyRegister, companyUpdate } = useCompanyServices();
  const navigate = useNavigate();

  const search = (options, searchValue) => {
    searchValue = searchValue.toUpperCase();
    return options.filter((option) => {
      return (
        option?.value?.toString()?.includes(searchValue) ||
        option?.text?.toString()?.includes(searchValue)
      );
    });
  };

  const fullRoles = async () => {
    try {
      const response = await getUserRoles();
      let tempList = [];
      response.data.map((item) => {
        let a = {     
          ...item,     
          text: item.role,
          value: item.id,
        };
        tempList.push(a);
      });
      setAllRoles(tempList);
    } catch (err) {}
  };

  useEffect(() => {
    if (location.pathname == "/user-add") fullRoles();
  }, [location.pathname]);

  const handleDropdownChangeRole = (event, data) => {  
    setCompany((c) => ({ ...c, fk_role: data.value }));
    let item_data = allRoles.filter(x=>x.value===data.value)[0]
    if(!edit){
      setModuleCodeList(data=>item_data?.module_permissions.map(x=>({code:x.code,parent:null,is_acitve:true})))
      setCompany(data=>({...data,activity_permissions:item_data?.activity_permissions}))
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const logoImage = location.pathname === "/user-add" ? "image" : "logo";
    const files = e.target?.files || null;
    if (name === logoImage && files?.length > 0) {
      const imageUrl = URL.createObjectURL(files[0]);
      location.pathname === "/user-add"
        ? setCompany((data) => ({
            ...data,
            image: files[0],
            image_url: imageUrl,
          }))
        : setCompany((data) => ({
            ...data,
            logo: files[0],
            logo_url: imageUrl,
          }));
      // setEdit(data=>({...data,logo:null}))
    } else if (value === "") setCompany((data) => ({ ...data, [name]: null }));
    else setCompany((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (location.pathname === "/user-add") {
      try {
        // let filteredData =  { key: value for (key, value) of Object.entries(myObject) if value !== null };
        let tempCompany = { ...company };
        for (const [key, value] of Object.entries(company)) {
          if (value === 0 || value === null || value === undefined) {
            delete tempCompany[key];
          }
        }
        const CompanyData = new FormData();
        Object.keys(tempCompany).map((data) =>
          CompanyData.append(data, company[data])
        );
        // console.log(CompanyData,'hello');
        // return 0;
        let resp;
        if (edit.id) resp = await putUserAdd(edit.id, CompanyData);
        else resp = await postUserAdd(CompanyData);
        if (resp.success) {
          setActive(3);
          setCompanyId(resp?.data?.user_profile?.id);
        } else {
          Swal.fire({
            title: "Error",
            text: resp?.message || "User Registration Failed.",
            icon: "error",
          });
        }
      } catch (err) {
        let message =
          err?.response?.data?.message || "User Registration Failed.";
        if (err?.response?.data?.errors?.length > 0) {
          message = Object.values(err.response?.data?.errors)[0];
        }
        Swal.fire({
          title: "Failed",
          text: message,
          icon: "error",
          showConfirmButton: true,
          timer: 3500,
        });
      }
    } else {
      try {
        // let filteredData =  { key: value for (key, value) of Object.entries(myObject) if value !== null };
        let tempCompany = { ...company };
        for (const [key, value] of Object.entries(company)) {
          if (value === 0 || value === null || value === undefined) {
            delete tempCompany[key];
          }
        }
        const CompanyData = new FormData();
        Object.keys(tempCompany).map((data) =>
          CompanyData.append(data, company[data])
        );
        // console.log(CompanyData);
        // return 0;
        let resp;
        if (edit.id) resp = await companyUpdate(edit.id, CompanyData);
        else resp = await companyRegister(CompanyData);
        if (resp.success) {
          setActive(2);
          setCompanyId(resp?.data?.company_profile?.id);
          setCompanyPlan(company.active_plan_details);
          if (company?.active_plan_details?.activated_modules?.length > 0)
            setModuleCodeList(
              company?.active_plan_details?.activated_modules[
                company?.active_plan_details?.activated_modules?.length - 1
              ]?.module_details?.map((data) => ({
                code: data.code,
                is_acitve: data.is_active,
                parent: data.fk_parent,
              }))
            );
          // if (edit?.id) navigate("/");
        } else {
          Swal.fire({
            title: "Error",
            text: resp?.message || "Company Registration failed.",
            icon: "error",
          });
        }
      } catch (err) {
        let message =
          err?.response?.data?.message || "Company Registration Failed.";
        if (err?.response?.data?.errors?.length > 0) {
          if (typeof err?.response?.data?.errors === "string") {
            message = err.response.data?.errors;
          } else message = Object.values(err.response.data?.errors);
        }
        Swal.fire({
          title: "Failed",
          text: message,
          icon: "error",
          showConfirmButton: true,
        });
      }
    }
  };

  // console.log(company)

  return (
    <form
      onSubmit={handleSubmit}
      className="company-details-cont row justify-content-between mx-0 my-2 p-0"
    >
      <div className="comp-details-cont-1 col-5 col-6 border rounded-2">
        <div className="image-cont">
          {location.pathname === "/user-add" ? (
            <img
              className="company-details-company-logo"
              src={
                // edit.id && company.image
                //   ? MEDIA_URL + company.image
                // :
                company.image_url ? company.image_url : uploadImage
              }
              alt="upload-image"
            />
          ) : (
            <img
              className="company-details-company-logo"
              src={
                // edit.id && edit.logo
                //   ? MEDIA_URL + company.logo
                //   : company.logo_url
                //   ? company.logo_url
                //   : uploadImage
                company.logo_url ? company.logo_url : uploadImage
              }
              alt="upload-image"
            />
          )}
        </div>
        <input
          onChange={handleChange}
          name={location.pathname === "/user-add" ? "image" : "logo"}
          type="file"
          className="d-none"
          id="company-logo"
        />
        {/* <div className="image-cont">
          <img
            className="company-details-company-logo"
            src={company.logo_url ? company.logo_url : uploadImage}
            alt="upload-image"
          />
        </div>
        <input
          onChange={handleChange}
          name="logo"
          type="file"
          className="d-none"
          id="company-logo"
        /> */}
        <label htmlFor="company-logo" className="image-upload-btn">
          <MdOutlineFileUpload className="me-2 p-0" size={"1.5rem"} />
          Upload Image
        </label>
        <div
          className={`comp-input-det row mx-0 rounded-2 col-10 p-2 ${
            additionalFiled && "active"
          }`}
        >
          <input
            checked={additionalFiled}
            onChange={() => setAdditionalFields(!additionalFiled)}
            id="addition-fields"
            className="checkbox-comp-details col-3"
            type="checkbox"
          />
          <label htmlFor="addition-fields" className="col-5">
            Additional Fields
          </label>

          <div
            className={`accordian-cont mt-2 col-12 px-0 pe-4 ${
              additionalFiled && "additional"
            }`}
          >
            <TextField
              value={company.address_line_1 || ""}
              onChange={handleChange}
              name="address_line_1"
              className="company-input-field my-2"
              size="small"
              id="outlined-basic"
              label="Address Line 1"
              variant="outlined"
            />
            <TextField
              name="address_line_2"
              value={company.address_line_2 || ""}
              onChange={handleChange}
              className="company-input-field my-2"
              size="small"
              id="outlined-basic"
              label="Address Line 2"
              variant="outlined"
            />
            <TextField
              name="country"
              value={company.country || ""}
              onChange={handleChange}
              className="company-input-field my-2"
              size="small"
              id="outlined-basic"
              label="Country"
              variant="outlined"
            />
            <TextField
              name="state"
              value={company.state || ""}
              onChange={handleChange}
              className="company-input-field my-2"
              size="small"
              id="outlined-basic"
              label="State"
              variant="outlined"
            />
            <TextField
              name="district"
              value={company.district || ""}
              onChange={handleChange}
              className="company-input-field my-2"
              size="small"
              id="outlined-basic"
              label="District"
              variant="outlined"
            />
            <TextField
              name="city"
              value={company.city || ""}
              onChange={handleChange}
              className="company-input-field my-2"
              size="small"
              id="outlined-basic"
              label="City"
              variant="outlined"
            />
            <TextField
              name="pincode"
              value={company.pincode || ""}
              type="number"
              onChange={handleChange}
              className="company-input-field my-2"
              size="small"
              id="outlined-basic"
              label="Pincode"
              variant="outlined"
            />
            <TextField
              name="location"
              value={company.location || ""}
              onChange={handleChange}
              className="company-input-field my-2"
              size="small"
              id="outlined-basic"
              label="Location"
              variant="outlined"
            />
          </div>
        </div>
        <div
          className={`comp-input-det row mx-0 rounded-2 col-10 p-2 ${
            loginField && "active"
          }`}
        >
          <input
            checked={loginField}
            onChange={() => setLoginFiled(!loginField)}
            id="login-credentials"
            className="checkbox-comp-details col-3"
            type="checkbox"
          />
          <label htmlFor="login-credentials" className="col-7">
            Custom Login Credentials
          </label>
          <div
            className={`accordian-cont mt-2 col-12 px-0 pe-4 ${
              loginField && "login"
            }`}
          >
            <TextField
              name="username"
              value={company.username || ""}
              onChange={handleChange}
              className="company-input-field my-2"
              size="small"
              id="outlined-basic"
              label="Username"
              variant="outlined"
            />
            <TextField
              name="password"
              value={company.password || ""}
              onChange={handleChange}
              className="company-input-field my-2"
              size="small"
              id="outlined-basic"
              label="Password"
              variant="outlined"
            />
          </div>
        </div>
      </div>
      <div
        style={{ height: "fit-content" }}
        className="comp-details-cont-1 col-5 col-6 border rounded-2"
      >
        {location.pathname != "/user-add" && (
          <TextField
            required
            name="group_name"
            value={company.group_name || ""}
            onChange={handleChange}
            className="company-input-field my-3"
            size="small"
            id="outlined-basic"
            label="Company Name"
            variant="outlined"
          />
        )}
        <TextField
          name="first_name"
          required
          value={company.first_name || ""}
          onChange={handleChange}
          className="company-input-field my-3"
          size="small"
          id="outlined-basic"
          label="First Name"
          variant="outlined"
        />
        <TextField
          name="last_name"
          value={company.last_name || ""}
          onChange={handleChange}
          className="company-input-field my-3"
          size="small"
          id="outlined-basic"
          label="Last Name"
          variant="outlined"
        />
        <TextField
          name="mobile"
          required
          value={company.mobile || ""}
          onChange={handleChange}
          className="company-input-field my-3"
          size="small"
          type="number"
          id="outlined-basic"
          label="Phone Number"
          variant="outlined"
        />
        <TextField
          name="email"
          required
          type="email"
          value={company.email || ""}
          onChange={handleChange}
          className="company-input-field my-3"
          size="small"
          id="outlined-basic"
          label="Email Address"
          variant="outlined"
        />
        {location.pathname === "/user-add" && (
          <div className="w-100 d-flex gap-3 align-items-center mx-0">
            <Dropdown
              clearable
              selection
              required
              search={search}
              // onKeyDown={handleKeyDown1}
              onChange={handleDropdownChangeRole}
              className="company-input-field dropdown text-uppercase mx-0 my-2 table-drop d-flex align-items-center py-2 my-2 custom-drop-wid text-secondary"
              name="role"
              placeholder="Select Role *"
              value={company.fk_role}
              options={allRoles}
            />
            <div className="company-add-btn next btn w-auto">Add</div>
          </div>
        )}
      </div>
      <div className="w-100 row mx-0 justify-content-end gap-3 pe-3 pt-2">
        {/* <div
          onClick={() => {
            setActive((data) => (data > 1 ? data - 1 : data));
          }}
          className="company-add-btn clear btn col-1 col-2"
        >
          Previous
        </div> */}
        <button
          // onClick={() => setActive((data) => (data < 3 ? data + 1 : data))}
          // onClick={handleSubmit}
          type="submit"
          className="company-add-btn next btn col-1 col-2"
        >
          {edit?.id ? "Update" : "Next   >"}
        </button>
      </div>
    </form>
  );
};

import React, { useEffect, useState } from "react";
import uploadImage from "../../../assets/icons/image-upload.png";
import { MdOutlineFileUpload } from "react-icons/md";
import TextField from "@mui/material/TextField";
import { useCompanyServices } from "../../../services/controller/companyServices";
import Swal from "sweetalert2";
import { Dropdown } from "semantic-ui-react";
import { useUserServices } from "../../../services/controller/userServices";
import { MEDIA_URL } from "../../../api/axios";

export const CompanyDetails = (props) => {
  const { setActive, setCompanyId, edit ,location} = props;
  const [allRoles,setAllRoles] =useState([])
  const [selectedRole,setSelectedRole] =useState()
  const [additionalFiled, setAdditionalFields] = useState(false);
  const [loginField, setLoginFiled] = useState(false);
  const [company, setCompany] = useState({
    first_name: null,
    last_name: null,
    mobile: null,
    email: null,
    group_name: null,
    logo: null,
    logo_url: null,
    address_line_1: null,
    address_line_2: null,
    country: null,
    location: null,
    state: null,
    district: null,
    city: null,
    pincode: null,
    username: null,
    password: null,
    image:null,
    image_url:null,
  });

  const {postUserAdd,getUserRoles,putUserAdd}=useUserServices()
  const { companyRegister,companyUpdate } = useCompanyServices();

  useEffect(()=>{
    if(edit.id){
      // setCompanyId(edit.id)
      const {admin_details,created_by_details,group_detials,group_profile_details,subscription_history,...others} = edit
      setCompany({
        ...others,
        ...admin_details,      
      })
      // setSelectedRole(edit.fk_role)
    }
  },[edit])

  const search = (options, searchValue) => {
    searchValue = searchValue.toUpperCase();
    return options.filter((option) => {
      return (
        option?.value?.toString()?.includes(searchValue) ||
        option?.text?.toString()?.includes(searchValue)
      );
    });
  };

  const fullRoles = async()=>{
    const response= await getUserRoles()
    // let data=response.data.filter(property => property.types === 'PRODUCT')
    let tempList = [];
    response.data.map((item) => {
      let a = {
        text: item.role,
        value:item.id,
      };
      tempList.push(a);
    });
    setAllRoles(tempList)
  }
// console.log('hoi',allRoles);
// console.log('role',selectedRole)

console.log('user',company)
  useEffect(()=>{
    fullRoles()
  },[])
 
  const handleDropdownChangeRole = (event, data) => {
    setSelectedRole(data.value)
    setCompany((c)=> ({...c,'fk_role':data.value}))
  };
 
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const logoImage = location.pathname==='/user-add'? "image" :"logo"
    const files = e.target?.files || null;
    if (name === logoImage && files?.length > 0) {
      const imageUrl = URL.createObjectURL(files[0]);
      location.pathname==='/user-add'?
      setCompany((data) => ({ ...data, image: files[0], image_url: imageUrl })): setCompany((data) => ({ ...data, logo: files[0], logo_url: imageUrl }))
    } else if (value === "") setCompany((data) => ({ ...data, [name]: null }));
    else setCompany((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(location.pathname ==='/user-add'){
      try {
        // let filteredData =  { key: value for (key, value) of Object.entries(myObject) if value !== null };
        let tempCompany = {...company}
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
        let resp
        if(edit.id) resp = await putUserAdd(edit.id,CompanyData)
        else resp = await postUserAdd(CompanyData)
        if (resp.success) {
          setActive(3);
          setCompanyId(resp?.data?.user_profile?.id)
          console.log('Success :',resp?.data?.user_profile?.id)
        } else {
          Swal.fire({
            title: "Error",
            text: resp?.message || "User Registration Failed.",
            icon: "error",
          });
        }
      } catch (err) {
        let message = err.response.data.message || "User Registration Failed."
        if(err.response.data?.errors){
          message = Object.values(err.response.data?.errors)[0]
        }
        Swal.fire({
          title: "Failed",
          text: message,
          icon: "error",
          showConfirmButton: true,
          timer: 3500,
        });
      }
    }else{
      try {
        // let filteredData =  { key: value for (key, value) of Object.entries(myObject) if value !== null };
        let tempCompany = {...company}
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
        let resp
        if(edit.id) resp = await companyUpdate(edit.id,CompanyData)
        else resp = await companyRegister(CompanyData);
        if (resp.success) {
          setActive(2);
          setCompanyId(resp?.data?.company_profile?.id)
        } else {
          Swal.fire({
            title: "Error",
            text: resp?.message || "Company Registration failed.",
            icon: "error",
          });
        }
      } catch (err) {
        let message = err.response.data.message || "Company Registration Failed."
        if(err.response.data?.errors){
          message = Object.values(err.response.data?.errors)[0]
        }
        Swal.fire({
          title: "Failed",
          text: message,
          icon: "error",
          showConfirmButton: true,
          timer: 3500,
        });
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="company-details-cont row justify-content-between mx-0 my-2 p-0"
    >
      <div className="comp-details-cont-1 col-5 col-6 border rounded-2">
      <div className="image-cont">
        {location.pathname==='/user-add'?
          <img
            className="company-details-company-logo"
            src={(edit.id&&company.image)?MEDIA_URL+company.image:company.image_url? company.image_url : uploadImage}
            alt="upload-image"
          />
        :
        <img
          className="company-details-company-logo"
          src={(edit.id&&company.logo)?MEDIA_URL+company.logo:company.logo_url? company.logo_url : uploadImage}
          alt="upload-image"
        />
      }
      </div>
        <input
          onChange={handleChange}
          name={location.pathname==='/user-add'?"image":"logo"}
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

            <div className={`accordian-cont mt-2 col-12 px-0 pe-4 ${additionalFiled&& "additional"}`}>
              <TextField
                value={company.address_line_1}
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
                value={company.address_line_2}
                onChange={handleChange}
                className="company-input-field my-2"
                size="small"
                id="outlined-basic"
                label="Address Line 2"
                variant="outlined"
              />
              <TextField
                name="country"
                value={company.country}
                onChange={handleChange}
                className="company-input-field my-2"
                size="small"
                id="outlined-basic"
                label="Country"
                variant="outlined"
              />
              <TextField
                name="state"
                value={company.state}
                onChange={handleChange}
                className="company-input-field my-2"
                size="small"
                id="outlined-basic"
                label="State"
                variant="outlined"
              />
              <TextField
                name="district"
                value={company.district}
                onChange={handleChange}
                className="company-input-field my-2"
                size="small"
                id="outlined-basic"
                label="District"
                variant="outlined"
              />
              <TextField
                name="city"
                value={company.city}
                onChange={handleChange}
                className="company-input-field my-2"
                size="small"
                id="outlined-basic"
                label="City"
                variant="outlined"
              />
              <TextField
                name="pincode"
                value={company.pincode}
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
                value={company.location}
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
            <div className={`accordian-cont mt-2 col-12 px-0 pe-4 ${loginField&& "login"}`}>
              <TextField
                name="username"
                value={company.username}
                onChange={handleChange}
                className="company-input-field my-2"
                size="small"
                id="outlined-basic"
                label="Username"
                variant="outlined"
              />
              <TextField
                name="password"
                value={company.password}
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
      <div style={{height:'fit-content'}} className="comp-details-cont-1 col-5 col-6 border rounded-2">
        {location.pathname != '/user-add' &&
       ( <TextField
        required
        name="group_name"
        value={company.group_name||''}
        onChange={handleChange}
        className="company-input-field my-3"
        size="small"
        id="outlined-basic"
        label="Company Name"
        variant="outlined"
      />)}
        <TextField
          name="first_name"
          required
          value={company.first_name||''}
          onChange={handleChange}
          className="company-input-field my-3"
          size="small"
          id="outlined-basic"
          label="First Name"
          variant="outlined"
        />
        <TextField
          name="last_name"
          required
          value={company.last_name||''}
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
          
          value={company.mobile||''}
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
          value={company.email||""}
          onChange={handleChange}
          className="company-input-field my-3"
          size="small"
          id="outlined-basic"
          label="Email Address"
          variant="outlined"
        />
        {location.pathname === '/user-add'&&(
          <div className="w-100 d-flex justify-content-between align-items-center row">
            <Dropdown
                  clearable
                  selection
                  required
                  search={search}
                  // onKeyDown={handleKeyDown1}
                  onChange={handleDropdownChangeRole}
                  className="purchase-input-text table-drop d-flex align-items-center py-2 my-2 custom-drop-wid text-secondary col-9"
                  name="role"
                  placeholder="Select Role *"
                  value={selectedRole}
                  options={allRoles}
                />
                <div
                className="company-add-btn next btn col-1 col-2"
              >
                Add
              </div>
          </div>
         )}
      </div>
      <div className="w-100 row mx-0 justify-content-end gap-3 pe-3 pt-2">
        <div
          onClick={() => {setActive((data) => (data > 1 ? data - 1 : data))}}
          className="company-add-btn clear btn col-1 col-2"
        >
          Previous
        </div>
        <button
          // onClick={() => setActive((data) => (data < 3 ? data + 1 : data))}
          // onClick={handleSubmit}
          type="submit"
          className="company-add-btn next btn col-1 col-2"
        >
          Next &nbsp;&nbsp;{">"}
        </button>
      </div>
      
    </form>
  );
};

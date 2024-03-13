import React, { useState } from "react";
import uploadImage from "../../../assets/icons/image-upload.png";
import { MdOutlineFileUpload } from "react-icons/md";
import TextField from "@mui/material/TextField";
import { useCompanyServices } from "../../../services/controller/companyServices";
import Swal from "sweetalert2";

export const CompanyDetails = (props) => {
  const { setActive, active } = props;

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
  });

  const { companyRegister } = useCompanyServices();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const files = e.target?.files || null;
    if (name === "logo" && files?.length > 0) {
      const imageUrl = URL.createObjectURL(files[0]);
      setCompany((data) => ({ ...data, logo: files[0], logo_url: imageUrl }));
    } else if (value === "") setCompany((data) => ({ ...data, [name]: null }));
    else setCompany((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const CompanyData = new FormData();
      Object.keys(company).map((data) =>
        CompanyData.append(data, company[data])
      );
      // console.log(CompanyData);
      // return 0;
      const resp = await companyRegister(CompanyData);
      if (resp.success) {
        setActive(2);
      } else {
        Swal.fire({
          title: "Error",
          text: resp?.message || "Company Registration failed.",
          icon: "error",
        });
      }
    } catch (err) {
      Swal.fire({
        title: "Failed",
        text: "Company Registration Failed.",
        icon: "error",
        showConfirmButton: true,
        timer: 3500,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="company-details-cont row justify-content-between mx-0 my-2 p-0"
    >
      <div className="comp-details-cont-1 col-5 col-6 border rounded-2">
        <div className="image-cont">
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
        />
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
          {additionalFiled && (
            <div className="accordian-cont mt-2 col-12 px-0 pe-4">
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
          )}
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
          {loginField && (
            <div className="accordian-cont mt-2 col-12 px-0 pe-4">
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
          )}
        </div>
      </div>
      <div className="comp-details-cont-1 col-5 col-6 border rounded-2">
        <TextField
          required
          name="group_name"
          value={company.group_name}
          onChange={handleChange}
          className="company-input-field my-3"
          size="small"
          id="outlined-basic"
          label="Company Name"
          variant="outlined"
        />
        <TextField
          name="first_name"
          required
          value={company.first_name}
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
          value={company.last_name}
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
          
          value={company.mobile}
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
          value={company.email}
          onChange={handleChange}
          className="company-input-field my-3"
          size="small"
          id="outlined-basic"
          label="Email Address"
          variant="outlined"
        />
      </div>
      <div className="w-100 row mx-0 justify-content-end gap-3 pe-3 pt-2">
        <div
          onClick={() => setActive((data) => (data > 1 ? data - 1 : data))}
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

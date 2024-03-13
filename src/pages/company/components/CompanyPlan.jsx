import { TextField } from "@mui/material";
import React, { useState } from "react";

export const CompanyPayment = (props) => {
  const { setActive } = props;
  const [companyPlan, setCompanyPlan] = useState({
    renewal_date: null,
    renewal_time: null,
    extended_date: null,
    staff_limit: null,
    modules: [],
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (value === "") setCompanyPlan((data) => ({ ...data, [name]: null }));
    else setCompanyPlan((data) => ({ ...data, [name]: value }));
  };

  return (
    <form className="company-details-cont row justify-content-between mx-0 my-2 p-0">
      <div className="comp-details-cont-1 col-5 col-6 border rounded-2">
        <TextField
          name="renewal_date"
          value={companyPlan.renewal_date}
          onChange={handleChange}
          className="company-input-field my-3"
          size="small"
          id="outlined-basic"
          label="Renewal Date"
          variant="outlined"
        />
        <TextField
          name="renewal_time"
          value={companyPlan.renewal_time}
          onChange={handleChange}
          className="company-input-field my-3"
          size="small"
          id="outlined-basic"
          label="Renewal Time"
          variant="outlined"
        />
        <TextField
          name="extended_date"
          value={companyPlan.extended_date}
          onChange={handleChange}
          className="company-input-field my-3"
          size="small"
          id="outlined-basic"
          label="Extension Date"
          variant="outlined"
        />
        <TextField
          name="staff_limit"
          value={companyPlan.staff_limit}
          onChange={handleChange}
          className="company-input-field my-3"
          size="small"
          id="outlined-basic"
          label="Staff Limit"
          variant="outlined"
        />
      </div>
      <div className="comp-details-cont-1 col-5 col-6 border rounded-2">
        <div className="d-flex align-items-center gap-3 fs-5">
          Modules{" "}
          <div className="company-plan-btn btn module">Choose Modules</div>{" "}
        </div>
        <div className="module-cont">No Module Selected</div>
      </div>
      <div className="w-100 row mx-0 justify-content-end gap-3 pe-3 pt-3">
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

import React from "react";
import { Form } from "react-bootstrap";
import { CompanyPermission } from "../../company/components/CompanyPermission";

export const RoleConfigAdd = () => {
  return (
    <div>
      <h4>Add Role Configuration</h4>
      <div className="row mx-0 px-3 align-items-end">
        <Form.Group className="code-conf-input-cont row mx-0 align-items-center col-4 col-5">
          <Form.Label>Role Name</Form.Label>
          <div className="col-12">
            <Form.Control
              required
              //   onChange={handleChange}
              type="number"
              name="next_value"
              //   value={codeId.next_value || ""}
              placeholder="#USER"
              className="purchase-select code-conf d-flex align-items-center py-0 form-control"
            />
          </div>
        </Form.Group>
        <Form.Group className="code-conf-input-cont row mx-0 align-items-center col-4 col-5">
          <Form.Label>Select Manager Role</Form.Label>
          <div className="col-12">
            <Form.Control
              required
              //   onChange={handleChange}
              type="number"
              name="next_value"
              //   value={codeId.next_value || ""}
              placeholder="#DC"
              className="purchase-select code-conf d-flex align-items-center py-0 form-control"
            />
          </div>
        </Form.Group>
        <div className="d-flex align-items-center gap-3 fs-5 col-2 mb-3">
          <div
            // onClick={() => setShowModules(true)}
            className="company-plan-btn btn module"
          >
            Choose Modules
          </div>{" "}
        </div>
      </div>
      <div>
        <h4 className="pb-3">Access Permission</h4>
      <CompanyPermission activityCodes={{}} {...{}}/>
      </div>
    </div>
  );
};

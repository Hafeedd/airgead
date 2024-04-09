import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Form, Modal } from "react-bootstrap";
import { CompanyPermission } from "../../company/components/CompanyPermission";
import { useCompanyServices } from "../../../services/controller/companyServices";
import { Dropdown } from "semantic-ui-react";
import { companyModules } from "../../company/data/initialData.js";
import Swal from "sweetalert2";

export const RoleConfigAdd = (props) => {
  const {roleList} = props
  const [moduleCodeList, setModuleCodeList] = useState([]);
  const [activityCodes, setActivityCodes] = useState({});
  const [roleDropList, setRoleDropList] = useState([]);
  const [showModules, setShowModules] = useState(false);
  const [roleConfig, setRoleConfig] = useState({
    role: null,
    fk_parent: null,
  });

  const navigate = useNavigate();

  const { postCompanyRole } = useCompanyServices();

  useEffect(()=>{
    if(roleList?.length>0){
      setRoleDropList(data=>roleList.map(x=>({text:x.role,value:x.id})))
    }
  },[roleList])

  const handleModuleSelection = (data) => {
    let tempList = [...moduleCodeList];
    let filteredList = [];
    companyModules.forEach((item) => {
      if (
        item.code === data.code ||
        item.code === data.parent ||
        data.code === item.parent
      ) {
        filteredList.push({ code: item.code, parent: item.parent });
      }
    });
    // console.log(filteredList.every(i=>tempList.findIndex(x=>x.code==i.code)>-1))
    if (
      filteredList.some(
        (i) => tempList.findIndex((x) => x.code == i.code) > -1
      ) &&
      !data?.parent
    ) {
      tempList = tempList.filter(
        (x) => filteredList.findIndex((i) => i.code === x.code) == -1
      );
    } else if (tempList.some((i) => i.code == data.code) && data?.parent) {
      tempList = tempList.filter((x) => x.code !== data.code);
    } else {
      tempList = [...tempList, ...filteredList];
    }

    setModuleCodeList([...tempList]);
  };

  const handleModuleSelectAll = () => {
    if (companyModules?.length == moduleCodeList?.length) {
      setModuleCodeList([]);
    } else {
      let tempList = companyModules?.map((data) => ({
        code: data.code,
        parent: data.parent,
      }));
      setModuleCodeList([...tempList]);
    }
  };

  const handleSubmitPermission = async (e) => {
    e.preventDefault();
    try {
      let resp;
      var companyPermissions = [];
      Object.keys(activityCodes).forEach((x) =>
        activityCodes[x]?.forEach((y) =>
          companyPermissions.push({ code: y, is_active: false })
        )
      );
      let tempCompanyModuleList = moduleCodeList.map((data) => ({
        code: data.code,
        is_active: true,
      }));
      const submitData = {
        ...roleConfig,
        activity_permissions: companyPermissions,
        module_permissions: tempCompanyModuleList,
      };
      //   return 0
      resp = await postCompanyRole(submitData);
      if (resp?.success) {
        Swal.fire("Success", "", "success");
        setRoleConfig({ fk_parent: null, role: null });
        setModuleCodeList([]);
        setActivityCodes([]);
        navigate("/role-configuration-list");
      }
    } catch (err) {
      console.log(err);
      var message =
        err?.response?.data?.message ||
        "Something went wrong pls try again later !";
      if (err?.response?.data?.errors) {
        message = Object.values(err.response.data?.errors)[0];
      }
      Swal.fire("Error", message, "error");
    }
  };

  const handleChange = (e, data) => {
    let name = data?.name || e.target.name;
    let value = e.target.value || null;
    let tempData = { ...roleConfig };
    if (data) {
      tempData = { ...tempData, [name]: data.value };
    } else tempData = { ...tempData, [name]: value };

    setRoleConfig({ ...tempData });
  };

  return (
    <form onSubmit={handleSubmitPermission}>
      <h4>Add Role Configuration</h4>
      <div className="row mx-0 px-3 align-items-end">
        <Form.Group className="code-conf-input-cont row mx-0 align-items-center col-4 col-5">
          <Form.Label>Role Name</Form.Label>
          <div className="col-12">
            <Form.Control
              required
              onChange={handleChange}
              type="text"
              name="role"
              value={roleConfig.role || ""}
              placeholder="#USER"
              className="purchase-select code-conf d-flex align-items-center py-0 form-control"
            />
          </div>
        </Form.Group>
        <Form.Group className="code-conf-input-cont row mx-0 align-items-center col-4 col-5">
          <Form.Label>Select Manager Role</Form.Label>
          <div className="col-12">
            <Dropdown
              clearable
              selection
              search
              onChange={handleChange}
              className="purchase-select code-conf d-flex align-items-center py-0 form-control"
              name="fk_parent"
              placeholder="select"
              value={roleConfig.fk_parent || ""}
              options={roleDropList}
            />
          </div>
        </Form.Group>
        <div className="d-flex align-items-center gap-3 fs-5 col-2 mb-3">
          <div
            onClick={() => setShowModules(true)}
            className="company-plan-btn btn module"
          >
            Choose Modules
          </div>{" "}
        </div>
      </div>
      <div className="position-relative">
        {moduleCodeList?.length < 1 && (
          <div className="role-perm-cover">
            <div className="d-flex align-items-center gap-3 fs-5 col-2 mb-3">
              <div
                onClick={() => setShowModules(true)}
                className="company-plan-btn btn module"
              >
                Choose Modules
              </div>{" "}
            </div>
          </div>
        )}
        <h4 className="pb-3">Access Permission</h4>
        <CompanyPermission
          activityCodes={{}}
          from="roleConfig"
          {...{
            moduleCodeList, 
            setModuleCodeList,
            activityCodes,
            setActivityCodes,
          }}
        />
      </div>

      <Modal
        show={showModules}
        centered
        size="lg"
        onHide={() => setShowModules(false)}
      >
        <div className="comp-plan-module-modal pt-4 px-5">
          <div
            onClick={handleModuleSelectAll}
            className={`module-select-all btn ${
              companyModules?.length == moduleCodeList?.length && "clear"
            }`}
          >
            {companyModules?.length == moduleCodeList?.length
              ? "Clear All"
              : "Select All"}
          </div>
          <div className="module-items">
            {companyModules?.map((data) => (
              <div
                onClick={() => handleModuleSelection(data)}
                className={`comp-module-item ${
                  moduleCodeList?.findIndex((item) => item.code === data.code) >
                    -1 && "active"
                }`}
              >
                <img src={data.icon} width={"25rem"} alt="" />
                <div className="text-center">{data.name}</div>
              </div>
            ))}
          </div>
          <div className="text-end">
            <div
              onClick={() => setShowModules(false)}
              className="btn comp-module-btn px-5 fs-5"
            >
              Done
            </div>
          </div>
        </div>
      </Modal>
    </form>
  );
};
